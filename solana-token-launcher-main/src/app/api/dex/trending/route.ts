import { NextResponse } from 'next/server';
import { getTrendingTokens } from '@/lib/dex/client';

export async function GET() {
  try {
    const tokens = await getTrendingTokens();
    return NextResponse.json({ success: true, data: tokens });
  } catch (error) {
    console.error('Trending error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trending' },
      { status: 500 }
    );
  }
}
