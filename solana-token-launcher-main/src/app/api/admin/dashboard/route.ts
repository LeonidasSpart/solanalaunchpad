import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET() {
  try {
    // 1. Verify admin token – await cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
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

    // 2. Fetch real data from database (replace mock with real queries)
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
