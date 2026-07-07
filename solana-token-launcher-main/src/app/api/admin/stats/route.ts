import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // 1. Verify admin token
    const authHeader = req.headers.get('authorization');
    const expectedToken = process.env.ADMIN_TOKEN;
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      console.error('Auth failed: expected token', expectedToken, 'received', authHeader);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch stats
    const tokenCountRes = await query('SELECT COUNT(*) as count FROM tokens');
    const totalTokens = parseInt(tokenCountRes.rows[0]?.count || '0');

    const userCountRes = await query('SELECT COUNT(DISTINCT creator_wallet) as count FROM tokens');
    const totalUsers = parseInt(userCountRes.rows[0]?.count || '0');

    const totalRevenue = 0; // can be extended later

    const activeRes = await query(
      `SELECT COUNT(DISTINCT creator_wallet) as count 
       FROM tokens 
       WHERE created_at > NOW() - INTERVAL '30 days'`
    );
    const activeUsers = parseInt(activeRes.rows[0]?.count || '0');

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
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error.message },
      { status: 500 }
    );
  }
}
