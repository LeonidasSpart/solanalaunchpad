import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { query } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET() {
  try {
    // 1. Verify admin token
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Fetch REAL data from PostgreSQL
    const [
      totalTokensResult,
      recentTokensResult,
    ] = await Promise.all([
      query('SELECT COUNT(*) FROM tokens'),
      query('SELECT name, symbol, created_at FROM tokens ORDER BY created_at DESC LIMIT 10'),
    ]);

    const totalTokens = parseInt(totalTokensResult.rows[0].count, 10);

    // Note: Your tokens table doesn't have creator/fee/network yet.
    // These will show as 0 until you add the columns.
    const totalUsers = 0;      // Add a 'creator' column to tokens
    const totalRevenue = 0;    // Add a 'fee' column to tokens
    const activeUsers = 0;     // Add a 'creator' column and track activity

    const recentTokens = recentTokensResult.rows.map((row: any) => ({
      name: row.name,
      symbol: row.symbol,
      network: 'Unknown',      // You can add a 'network' column later
      created: row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : 'N/A',
    }));

    return NextResponse.json({
      totalTokens,
      totalUsers,
      totalRevenue,
      activeUsers,
      recentTokens,
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
