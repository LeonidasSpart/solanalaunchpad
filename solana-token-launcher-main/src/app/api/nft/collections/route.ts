// src/app/api/nft/collections/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createNftCollection } from '@/lib/metaplex';
import { uploadMetadata } from '@/lib/ipfs';
import { Connection, PublicKey } from '@solana/web3.js';

const CREATION_FEE_SOL = 0.15;
const FEE_WALLET = process.env.NEXT_PUBLIC_FEE_REC;

export async function POST(req: NextRequest) {
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

    // ─── 1. Verify the fee transaction ────────────────────────────────
    const connection = new Connection(process.env.RPC_URL_DEVNET!);
    const tx = await connection.getTransaction(fee_tx_signature, {
      commitment: 'confirmed',
    });
    if (!tx) {
      return NextResponse.json({ error: 'Fee transaction not found' }, { status: 400 });
    }

    const feeWalletPubkey = new PublicKey(FEE_WALLET!);
    const accountPubkeys = tx.transaction.message.accountKeys.map(key => key.toBase58());
    if (!accountPubkeys.includes(FEE_WALLET!)) {
      return NextResponse.json({ error: 'Fee wallet not involved in transaction' }, { status: 400 });
    }

    // ─── 2. Parse numeric values ──────────────────────────────────────
    const royaltyBasisPoints = parseInt(royalty_basis_points) || 0;
    const maxSupplyNum = parseInt(max_supply);
    if (isNaN(maxSupplyNum) || maxSupplyNum <= 0) {
      return NextResponse.json({ error: 'Max supply must be a positive integer' }, { status: 400 });
    }
    if (royaltyBasisPoints < 0 || royaltyBasisPoints > 10000) {
      return NextResponse.json({ error: 'Royalty must be between 0 and 10000 (0-100%)' }, { status: 400 });
    }

    // ─── 3. Upload metadata ──────────────────────────────────────────
    const metadata = {
      name,
      symbol,
      description,
      image,
      attributes: [],
    };
    const metadataUri = await uploadMetadata(metadata);

    // ─── 4. Create collection on-chain ────────────────────────────────
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

    // ─── 5. Save to DB ────────────────────────────────────────────────
    // ✅ FIX: use .toString() instead of .toBase58()
    const result = await query(
      `INSERT INTO nft_collections (creator_wallet, name, symbol, description, royalty_basis_points, collection_mint, metadata_uri, max_supply, price_sol, network)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        creator_wallet, name, symbol, description, royaltyBasisPoints,
        collectionNft.mintAddress.toString(), metadataUri, maxSupplyNum,
        parseFloat(price_sol) || 0,
        process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
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
