import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const collectionId = parseInt(id);
    const res = await query(
      'SELECT * FROM nft_tokens WHERE collection_id = $1 ORDER BY minted_at DESC',
      [collectionId]
    );
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 });
  }
}
