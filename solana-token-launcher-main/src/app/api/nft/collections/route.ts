import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createNftCollection } from '@/lib/metaplex';
import { uploadMetadata } from '@/lib/ipfs'; // reuse your Pinata helper

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { creator_wallet, name, symbol, description, royalty_basis_points, max_supply, price_sol, image } = body;

    if (!creator_wallet || !name || !symbol || !max_supply) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Upload metadata to IPFS
    const metadata = {
      name,
      symbol,
      description,
      image,
      attributes: [],
    };
    const metadataUri = await uploadMetadata(metadata);

    // 2. Create the collection on-chain
    const collectionNft = await createNftCollection(
      name,
      symbol,
      description,
      royalty_basis_points || 0,
      max_supply,
      metadataUri
    );

    // 3. Save to DB
    const result = await query(
      `INSERT INTO nft_collections (creator_wallet, name, symbol, description, royalty_basis_points, collection_mint, metadata_uri, max_supply, price_sol, network)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        creator_wallet, name, symbol, description, royalty_basis_points || 0,
        collectionNft.mintAddress.toBase58(), metadataUri, max_supply, price_sol || 0,
        process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
      ]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create NFT collection' }, { status: 500 });
  }
}

// GET – list collections
export async function GET(req: NextRequest) {
  try {
    const res = await query('SELECT * FROM nft_collections ORDER BY created_at DESC');
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}
