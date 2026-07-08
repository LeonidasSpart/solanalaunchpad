import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get('wallet');
  if (!wallet) {
    return NextResponse.json({ error: 'Missing wallet' }, { status: 400 });
  }

  try {
    const result = await query(
      `SELECT 
        id,
        token_mint,
        pool_address,
        lp_mint,
        sol_amount,
        token_amount,
        lock_start,
        lock_end,
        locked,
        created_at
       FROM lp_pools
       WHERE creator_wallet = $1
       ORDER BY created_at DESC`,
      [wallet]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching LP pools:', error);
    return NextResponse.json({ error: 'Failed to fetch LP pools' }, { status: 500 });
  }
}
