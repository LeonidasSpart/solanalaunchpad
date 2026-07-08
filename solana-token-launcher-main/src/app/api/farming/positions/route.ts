import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const poolId = searchParams.get('pool');
  const wallet = searchParams.get('wallet');
  if (!poolId || !wallet) {
    return NextResponse.json({ error: 'Missing pool or wallet' }, { status: 400 });
  }
  try {
    const res = await query(
      `SELECT * FROM farming_positions 
       WHERE pool_id = $1 AND user_wallet = $2 AND status = 'active'`,
      [parseInt(poolId), wallet]
    );
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch positions' }, { status: 500 });
  }
}
