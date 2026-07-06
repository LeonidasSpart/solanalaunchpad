import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mintAddress: string }> }
) {
  try {
    const { mintAddress } = await params;
    const res = await query(
      'SELECT * FROM staking_pools WHERE token_mint = $1',  // ← removed is_active filter
      [mintAddress]
    );
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Pool not found' }, { status: 404 });
    }
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error('Error fetching pool:', error);
    return NextResponse.json({ error: 'Failed to fetch pool' }, { status: 500 });
  }
}
