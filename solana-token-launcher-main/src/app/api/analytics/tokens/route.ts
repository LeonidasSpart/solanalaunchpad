import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const auth = req.headers.get('authorization');
  const token = auth?.split(' ')[1];
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const isAdmin = await verifyAdmin(req);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get the latest snapshot for each token
    const result = await query(`
      SELECT DISTINCT ON (t.id)
        t.id,
        t.name,
        t.symbol,
        t.mint_address,
        s.price_usd,
        s.market_cap,
        s.volume_24h,
        s.holder_count,
        s.timestamp
      FROM tokens t
      LEFT JOIN token_snapshots s ON t.id = s.token_id
      ORDER BY t.id, s.timestamp DESC
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
