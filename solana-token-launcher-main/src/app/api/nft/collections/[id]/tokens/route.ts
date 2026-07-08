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
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}
