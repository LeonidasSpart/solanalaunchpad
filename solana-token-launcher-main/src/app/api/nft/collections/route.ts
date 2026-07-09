// src/app/api/nft/collections/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createNftCollection } from '@/lib/metaplex';
import { uploadMetadata } from '@/lib/ipfs';
import { Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { isValidPublicKey } from '@/lib/validate';
import { ratelimit } from '@/lib/rate-limit';

const CREATION_FEE_SOL = 0.15;
const FEE_WALLET = process.env.NEXT_PUBLIC_FEE_REC;

// ─── Helper: extract SOL transfer amount to a specific wallet ──────
function extractFeePayment(
  tx: any,
  feeWallet: string
): { paid: boolean; amount: number } {
  let totalLamports = 0;
  try {
    // Use the meta approach to find transfers to fee wallet
    const accountKeys = tx.transaction.message.accountKeys.map((key: any) => key.toBase58());
    const feeIndex = accountKeys.indexOf(feeWallet);
    if (feeIndex !== -1 && tx.meta?.preBalances && tx.meta?.postBalances) {
      const preBalance = tx.meta.preBalances[feeIndex] || 0;
      const postBalance = tx.meta.postBalances[feeIndex] || 0;
      totalLamports = postBalance - preBalance;
    }
  } catch (e) {
    console.error('Error parsing fee payment:', e);
  }

  return {
    paid: totalLamports >= CREATION_FEE_SOL * LAMPORTS_PER_SOL,
    amount: totalLamports,
  };
}

export async function POST(req: NextRequest) {
  // ─── Rate limiting ──────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const {
      creator_wallet,
      name,
      symbol,
      description,
      royalty_basis_points,
      max_supply,
      price_sol,
      image,
      fee_tx_signature,
    } = body;

    if (!creator_wallet || !name || !symbol || !max_supply) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!fee_tx_signature) {
      return NextResponse.json({ error: 'Fee payment required' }, { status: 400 });
    }

    // ─── Validate wallet ──────────────────────────────────────────
    if (!isValidPublicKey(creator_wallet)) {
      return NextResponse.json({ error: 'Invalid creator wallet address' }, { status: 400 });
    }

    // ─── 1. Verify the fee transaction ────────────────────────────────
    const connection = new Connection(process.env.RPC_URL_DEVNET!);
    const tx = await connection.getTransaction(fee_tx_signature, {
      commitment: 'confirmed',
    });
    if (!tx || tx.meta?.err) {
      return NextResponse.json({ error: 'Fee transaction not found or failed' }, { status: 400 });
    }

    // ─── 2. Prevent replay attacks ──────────────────────────────────
    const existing = await query(
      'SELECT id FROM nft_collections WHERE fee_tx_signature = $1',
      [fee_tx_signature]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Fee transaction already used' }, { status: 409 });
    }

    // ─── 3. Verify fee payment amount ──────────────────────────────
    const feeCheck = extractFeePayment(tx, FEE_WALLET!);
    if (!feeCheck.paid) {
      return NextResponse.json(
        { error: `Insufficient fee paid. Required: ${CREATION_FEE_SOL} SOL` },
        { status: 400 }
      );
    }

    // ─── 4. Parse numeric values ──────────────────────────────────────
    const royaltyBasisPoints = parseInt(royalty_basis_points) || 0;
    const maxSupplyNum = parseInt(max_supply);
    if (isNaN(maxSupplyNum) || maxSupplyNum <= 0) {
      return NextResponse.json({ error: 'Max supply must be a positive integer' }, { status: 400 });
    }
    if (royaltyBasisPoints < 0 || royaltyBasisPoints > 10000) {
      return NextResponse.json({ error: 'Royalty must be between 0 and 10000 (0-100%)' }, { status: 400 });
    }

    // ─── 5. Upload metadata ──────────────────────────────────────────
    const metadata = {
      name,
      symbol,
      description,
      image,
      attributes: [],
    };
    const metadataUri = await uploadMetadata(metadata);

    // ─── 6. Create collection on-chain ────────────────────────────────
    let collectionNft;
    try {
      collectionNft = await createNftCollection(
        name,
        symbol,
        description,
        royaltyBasisPoints,
        maxSupplyNum,
        metadataUri
      );
    } catch (err: any) {
      console.error('❌ Metaplex creation error:', err);
      return NextResponse.json(
        { error: err.message || 'Metaplex creation failed' },
        { status: 500 }
      );
    }

    // ─── 7. Save to DB ────────────────────────────────────────────────
    // ✅ FIX: collectionNft.mintAddress is a UMI PublicKey (branded string) – use directly
    const result = await query(
      `INSERT INTO nft_collections (
        creator_wallet, name, symbol, description,
        royalty_basis_points, collection_mint, metadata_uri,
        max_supply, price_sol, network, fee_tx_signature
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        creator_wallet, name, symbol, description, royaltyBasisPoints,
        collectionNft.mintAddress,    // ← changed: removed .toBase58()
        metadataUri, maxSupplyNum,
        parseFloat(price_sol) || 0,
        process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet',
        fee_tx_signature,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('NFT collection creation error:', error);
    return NextResponse.json({ error: 'Failed to create NFT collection' }, { status: 500 });
  }
}

// GET – list collections (unchanged)
export async function GET(req: NextRequest) {
  try {
    const res = await query('SELECT * FROM nft_collections ORDER BY created_at DESC');
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
