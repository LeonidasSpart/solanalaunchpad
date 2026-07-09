// src/app/api/nft/collections/[id]/mint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { mintNftFromCollection } from '@/lib/metaplex';
import { uploadMetadata } from '@/lib/ipfs';
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getConnection } from '@/lib/solana';
import { isValidPublicKey } from '@/lib/validate';
import { ratelimit } from '@/lib/rate-limit';

const MINTING_FEE_PERCENT = parseFloat(process.env.NFT_MINTING_FEE_PERCENT || '3') / 100;
const FEE_WALLET = process.env.NEXT_PUBLIC_FEE_REC;

function extractFeePayment(tx: any, feeWallet: string): { paid: boolean; amount: number } {
  let totalLamports = 0;
  try {
    const accountKeys = tx.transaction.message.accountKeys.map((key: any) => key.toBase58());
    const feeIndex = accountKeys.indexOf(feeWallet);
    if (feeIndex !== -1 && tx.meta?.preBalances && tx.meta?.postBalances) {
      totalLamports = tx.meta.postBalances[feeIndex] - tx.meta.preBalances[feeIndex];
    }
  } catch (e) {
    console.error('Error parsing fee payment:', e);
  }
  return { paid: totalLamports > 0, amount: totalLamports };
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  // ─── Rate limiting ──────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const { id } = await context.params;
    const collectionId = parseInt(id);
    if (isNaN(collectionId)) {
      return NextResponse.json({ error: 'Invalid collection ID' }, { status: 400 });
    }

    const body = await req.json();
    const {
      owner_wallet,
      name,
      description,
      image,
      attributes,
      fee_tx_signature,
    } = body;

    if (!owner_wallet || !fee_tx_signature) {
      return NextResponse.json({ error: 'Missing required fields (owner_wallet, fee_tx_signature)' }, { status: 400 });
    }

    if (!isValidPublicKey(owner_wallet)) {
      return NextResponse.json({ error: 'Invalid owner wallet address' }, { status: 400 });
    }

    // ─── 1. Get collection ──────────────────────────────────────────
    const collRes = await query('SELECT * FROM nft_collections WHERE id = $1', [collectionId]);
    if (collRes.rows.length === 0) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }
    const collection = collRes.rows[0];

    // ─── 2. Check supply ────────────────────────────────────────────
    const countRes = await query('SELECT COUNT(*) as count FROM nft_tokens WHERE collection_id = $1', [collectionId]);
    const minted = parseInt(countRes.rows[0].count);
    if (minted >= collection.max_supply) {
      return NextResponse.json({ error: 'Max supply reached' }, { status: 400 });
    }

    // ─── 3. Verify fee transaction ──────────────────────────────────
    const connection = getConnection();
    const tx = await connection.getTransaction(fee_tx_signature, { commitment: 'confirmed' });
    if (!tx || tx.meta?.err) {
      return NextResponse.json({ error: 'Fee transaction not found or failed' }, { status: 400 });
    }

    // ─── 4. Prevent replay attacks ──────────────────────────────────
    const existing = await query(
      'SELECT id FROM nft_tokens WHERE fee_tx_signature = $1',
      [fee_tx_signature]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Fee transaction already used' }, { status: 409 });
    }

    // ─── 5. Verify fee amount ──────────────────────────────────────
    const mintPrice = parseFloat(collection.price_sol) || 0;
    const requiredFee = mintPrice * MINTING_FEE_PERCENT;
    const feeCheck = extractFeePayment(tx, FEE_WALLET!);
    if (!feeCheck.paid || feeCheck.amount < requiredFee * LAMPORTS_PER_SOL) {
      return NextResponse.json(
        { error: `Insufficient fee. Required: ${requiredFee.toFixed(6)} SOL` },
        { status: 400 }
      );
    }

    // ─── 6. Upload metadata ──────────────────────────────────────────
    const nftMetadata = {
      name: name || `${collection.name} #${minted + 1}`,
      symbol: collection.symbol,
      description: description || collection.description,
      image,
      attributes: attributes || [],
    };
    const metadataUri = await uploadMetadata(nftMetadata);

    // ─── 7. Mint on-chain ────────────────────────────────────────────
    const collectionMint = new PublicKey(collection.collection_mint);
    const owner = new PublicKey(owner_wallet);
    const nft = await mintNftFromCollection(
      collectionMint,
      owner,
      metadataUri,
      nftMetadata.name,
      collection.symbol
    );

    // ─── 8. Save to DB ──────────────────────────────────────────────
    const result = await query(
      `INSERT INTO nft_tokens (
        collection_id, mint_address, metadata_uri, owner_wallet, fee_tx_signature
       ) VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        collectionId,
        nft.mintAddress.toBase58(),
        metadataUri,
        owner_wallet,
        fee_tx_signature,
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Mint error:', error);
    return NextResponse.json({ error: 'Failed to mint NFT' }, { status: 500 });
  }
}
