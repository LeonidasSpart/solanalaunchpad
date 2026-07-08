import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest, context: { params: Promise<{ mint: string }> }) {
  try {
    const { mint } = await context.params;
    const res = await query(
      'SELECT * FROM farming_pools WHERE lp_mint = $1 AND is_active = true',
      [mint]
    );
    if (res.rows.length === 0) {
      return NextResponse.json({ error: 'Pool not found' }, { status: 404 });
    }
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch pool' }, { status: 500 });
  }
}
