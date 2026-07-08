import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const collectionId = parseInt(id);
    if (isNaN(collectionId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }
    const res = await query(
      'SELECT * FROM nft_tokens WHERE collection_id = $1 ORDER BY minted_at DESC',
      [collectionId]
    );

    // Fetch metadata for each NFT
    const nftsWithMetadata = await Promise.all(
      res.rows.map(async (nft) => {
        let imageUrl = null;
        let metadata = null;
        try {
          const metaRes = await fetch(nft.metadata_uri);
          if (metaRes.ok) {
            metadata = await metaRes.json();
            imageUrl = metadata.image || null;
          }
        } catch {
          // ignore
        }
        return {
          ...nft,
          metadata,
          image_url: imageUrl,
        };
      })
    );

    return NextResponse.json(nftsWithMetadata);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}
