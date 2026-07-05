import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { query } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET() {
  try {
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

    // Fetch real data with all columns
    const [
      totalTokensResult,
      totalUsersResult,
      totalRevenueResult,
      activeUsersResult,
      recentTokensResult,
    ] = await Promise.all([
      query('SELECT COUNT(*) FROM tokens'),
      query('SELECT COUNT(DISTINCT creator) FROM tokens WHERE creator IS NOT NULL'),
      query('SELECT COALESCE(SUM(fee), 0) FROM tokens'),
      query("SELECT COUNT(DISTINCT creator) FROM tokens WHERE creator IS NOT NULL AND created_at > NOW() - INTERVAL '30 days'"),
      query('SELECT name, symbol, network, created_at FROM tokens ORDER BY created_at DESC LIMIT 10'),
    ]);

    const totalTokens = parseInt(totalTokensResult.rows[0].count, 10);
    const totalUsers = parseInt(totalUsersResult.rows[0].count, 10);
    const totalRevenue = parseFloat(totalRevenueResult.rows[0].sum);
    const activeUsers = parseInt(activeUsersResult.rows[0].count, 10);

    const recentTokens = recentTokensResult.rows.map((row: any) => ({
      name: row.name,
      symbol: row.symbol,
      network: row.network || 'Devnet',
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
    console.error('Dashboard DB error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
