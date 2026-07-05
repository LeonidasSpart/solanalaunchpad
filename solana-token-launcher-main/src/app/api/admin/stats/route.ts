import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET() {
  try {
    // 1. Verify admin token
    const token = cookies().get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 2. Fetch real data from your database
    // ⚠️ REPLACE THESE with actual database queries
    // Example using Prisma:
    // const totalTokens = await prisma.token.count();
    // const totalUsers = await prisma.token.groupBy({ by: ['creator'], _count: true }).then(...);
    // const totalRevenue = await prisma.token.aggregate({ _sum: { fee: true } });
    // const activeUsers = await prisma.token.count({ where: { createdAt: { gte: new Date(Date.now() - 30*24*60*60*1000) } } });

    // Mock data – replace with real queries!
    const stats = {
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

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
