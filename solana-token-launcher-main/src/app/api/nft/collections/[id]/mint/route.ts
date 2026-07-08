import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { mintNftFromCollection } from '@/lib/metaplex';
import { PublicKey } from '@solana/web3.js';
import { uploadMetadata } from '@/lib/ipfs';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const collectionId = parseInt(id);
    const { owner_wallet, name, description, image, attributes } = await req.json();
    if (!owner_wallet) {
      return NextResponse.json({ error: 'Missing owner wallet' }, { status: 400 });
    }

    // 1. Get collection
    const collRes = await query('SELECT * FROM nft_collections WHERE id = $1', [collectionId]);
    if (collRes.rows.length === 0) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }
    const collection = collRes.rows[0];

    // 2. Check supply
    const countRes = await query('SELECT COUNT(*) as count FROM nft_tokens WHERE collection_id = $1', [collectionId]);
    const minted = parseInt(countRes.rows[0].count);
    if (minted >= collection.max_supply) {
      return NextResponse.json({ error: 'Max supply reached' }, { status: 400 });
    }

    // 3. Upload NFT metadata
    const nftMetadata = {
      name: name || `${collection.name} #${minted + 1}`,
      symbol: collection.symbol,
      description: description || collection.description,
      image,
      attributes: attributes || [],
    };
    const metadataUri = await uploadMetadata(nftMetadata);

    // 4. Mint on-chain
    const collectionMint = new PublicKey(collection.collection_mint);
    const owner = new PublicKey(owner_wallet);
    const nft = await mintNftFromCollection(
      collectionMint,
      owner,
      metadataUri,
      nftMetadata.name,
      collection.symbol
    );

    // 5. Save to DB
    const result = await query(
      `INSERT INTO nft_tokens (collection_id, mint_address, metadata_uri, owner_wallet)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [collectionId, nft.mintAddress.toBase58(), metadataUri, owner_wallet]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to mint NFT' }, { status: 500 });
  }
}
