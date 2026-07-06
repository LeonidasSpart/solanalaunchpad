import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');
  const mint = searchParams.get('mint');

  if (!wallet || !mint) {
    return NextResponse.json({ error: 'Wallet and mint are required' }, { status: 400 });
  }

  try {
    // 1. Find the pool by mint
    const poolRes = await query(
      'SELECT id FROM staking_pools WHERE token_mint = $1',
      [mint]
    );
    if (poolRes.rows.length === 0) {
      return NextResponse.json(null); // no pool → no position
    }
    const poolId = poolRes.rows[0].id;

    // 2. Get the user's active position (should be only one)
    const posRes = await query(
      `SELECT *
       FROM staking_positions
       WHERE pool_id = $1 AND user_wallet = $2 AND status = 'active'`,
      [poolId, wallet]
    );

    // Return the first (and only) position, or null
    return NextResponse.json(posRes.rows[0] || null);
  } catch (error) {
    console.error('Error fetching position:', error);
    return NextResponse.json({ error: 'Failed to fetch position' }, { status: 500 });
  }
}
