import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get('wallet');
  if (!wallet) {
    return NextResponse.json({ error: 'Wallet required' }, { status: 400 });
  }
  try {
    const res = await query(
      'SELECT * FROM nft_tokens WHERE owner_wallet = $1 ORDER BY minted_at DESC',
      [wallet]
    );

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
    console.error('Error fetching owned NFTs:', error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}
