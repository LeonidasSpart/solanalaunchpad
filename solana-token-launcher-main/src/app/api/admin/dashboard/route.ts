import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// ⚠️ Import your database client here
// Example with Prisma:
// import { prisma } from '@/lib/prisma';
// Example with Drizzle:
// import { db } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET() {
  try {
    // 1. Verify admin token
    const token = cookies().get('admin_token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // 2. Fetch real data from your database
    // Replace the mock queries with your actual database calls.

    // --- Example with Prisma ---
    /*
    const [totalTokens, totalUsers, totalRevenue, activeUsers, recentTokens] = await Promise.all([
      prisma.token.count(),
      prisma.token.groupBy({ by: ['creator'], _count: true }).then(groups => groups.length),
      prisma.token.aggregate({ _sum: { fee: true } }).then(res => res._sum.fee || 0),
      prisma.token.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } }),
      prisma.token.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { name: true, symbol: true, network: true, createdAt: true },
      }),
    ]);

    const formattedTokens = recentTokens.map(t => ({
      name: t.name,
      symbol: t.symbol,
      network: t.network,
      created: t.createdAt.toISOString().split('T')[0],
    }));
    */

    // --- Example with raw SQL (PostgreSQL) ---
    /*
    const [totalTokens, totalUsers, totalRevenue, activeUsers, recentTokens] = await Promise.all([
      db.query('SELECT COUNT(*) FROM tokens'),
      db.query('SELECT COUNT(DISTINCT creator) FROM tokens'),
      db.query('SELECT SUM(fee) FROM tokens'),
      db.query('SELECT COUNT(DISTINCT creator) FROM tokens WHERE created_at > NOW() - INTERVAL \'30 days\''),
      db.query('SELECT name, symbol, network, created_at FROM tokens ORDER BY created_at DESC LIMIT 10'),
    ]);
    */

    // ⚠️ Remove this mock data block and uncomment the real queries above.
    // For demonstration, we return mock data.
    const mockData = {
      totalTokens: 1427,
      totalUsers: 856,
      totalRevenue: 214.5,
      activeUsers: 234,
      recentTokens: [
        { name: 'ZRPDEEPSEEK', symbol: 'ZDP', network: 'Devnet', created: '2026-06-29' },
        { name: 'SolToken', symbol: 'SOLT', network: 'Devnet', created: '2026-06-29' },
        { name: 'Memecoin', symbol: 'MEME', network: 'Devnet', created: '2026-06-28' },
      ],
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
