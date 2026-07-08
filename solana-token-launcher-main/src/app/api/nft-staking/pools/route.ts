import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const res = await query('SELECT * FROM nft_staking_pools WHERE is_active = true ORDER BY id DESC');
    return NextResponse.json(res.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch pools' }, { status: 500 });
  }
}
