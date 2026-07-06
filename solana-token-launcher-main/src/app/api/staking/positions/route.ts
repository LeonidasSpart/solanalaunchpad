import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');

  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }

  try {
    const res = await query(
      `SELECT sp.*, p.token_symbol, p.token_name, p.apy, p.lock_duration
       FROM staking_positions sp
       JOIN staking_pools p ON sp.pool_id = p.id
       WHERE sp.user_wallet = $1 AND sp.status = 'active'`,
      [wallet]
    );
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error('Error fetching positions:', error);
    return NextResponse.json({ error: 'Failed to fetch positions' }, { status: 500 });
  }
}
