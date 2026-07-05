import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
// import { prisma } from '@/lib/prisma'; // Uncomment for Prisma

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

    // 2. Fetch real data from database
    // ⚠️ REPLACE THIS WITH YOUR ACTUAL DATABASE QUERIES

    // Example with Prisma (uncomment and use):
    /*
    const [totalTokens, totalUsers, totalRevenue, activeUsers, recentTokens] = await Promise.all([
      prisma.token.count(),
      prisma.token.groupBy({ by: ['creator'], _count: true }).then(groups => groups.length),
      prisma.token.aggregate({ _sum: { fee: true } }).then(res => res._sum.fee || 0),
      prisma.token.count({ 
        where: { 
          createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } 
        } 
      }),
      prisma.token.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { name: true, symbol: true, network: true, createdAt: true },
      }),
    ]);

    const formattedRecent = recentTokens.map(t => ({
      name: t.name,
      symbol: t.symbol,
      network: t.network,
      created: t.createdAt.toISOString().split('T')[0],
    }));

    return NextResponse.json({
      totalTokens,
      totalUsers,
      totalRevenue,
      activeUsers,
      recentTokens: formattedRecent,
    });
    */

    // ⚠️ TEMPORARY MOCK DATA – REMOVE WHEN USING REAL DB
    const mockData = {
      totalTokens: 1427,
      totalUsers: 856,
      totalRevenue: 214.5,
      activeUsers: 234,
      recentTokens: [
        { name: 'ZRPDEEPSEEK', symbol: 'ZDP', network: 'Devnet', created: '2026-06-29' },
        { name: 'SolToken', symbol: 'SOLT', network: 'Devnet', created: '2026-06-29' },
        { name: 'Memecoin', symbol: 'MEME', network: 'Devnet', created: '2026-06-28' },
        { name: 'TestToken', symbol: 'TEST', network: 'Devnet', created: '2026-06-27' },
        { name: 'MyToken', symbol: 'MYT', network: 'Mainnet', created: '2026-06-26' },
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
