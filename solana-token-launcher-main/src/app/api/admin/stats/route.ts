import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      console.error('No token provided');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Verify JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
      jwt.verify(token, secret);
    } catch (err) {
      console.error('Invalid token:', err);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 3. Fetch stats
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
