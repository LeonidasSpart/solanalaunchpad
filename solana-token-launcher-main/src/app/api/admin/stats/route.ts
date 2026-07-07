import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Verify admin token
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Total tokens
    const tokenCountRes = await query('SELECT COUNT(*) as count FROM tokens');
    const totalTokens = parseInt(tokenCountRes.rows[0]?.count || '0');

    // 2. Total users (distinct creator_wallet from tokens)
    const userCountRes = await query('SELECT COUNT(DISTINCT creator_wallet) as count FROM tokens');
    const totalUsers = parseInt(userCountRes.rows[0]?.count || '0');

    // 3. Total revenue – you can add a 'platform_fees' table later
    const totalRevenue = 0;

    // 4. Active users (created a token in last 30 days)
    const activeRes = await query(
      `SELECT COUNT(DISTINCT creator_wallet) as count 
       FROM tokens 
       WHERE created_at > NOW() - INTERVAL '30 days'`
    );
    const activeUsers = parseInt(activeRes.rows[0]?.count || '0');

    // 5. Recent tokens (last 10)
    const recentRes = await query(
      `SELECT name, symbol, network, created_at 
       FROM tokens 
       ORDER BY created_at DESC 
       LIMIT 10`
    );
    const recentTokens = recentRes.rows.map((row: any) => ({
      name: row.name || 'Unnamed',
      symbol: row.symbol || 'N/A',
      network: row.network || 'devnet',
      created: new Date(row.created_at).toLocaleDateString(),
    }));

    return NextResponse.json({
      totalTokens,
      totalUsers,
      totalRevenue,
      activeUsers,
      recentTokens,
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
