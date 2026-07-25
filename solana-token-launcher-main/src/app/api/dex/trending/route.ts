// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';
import { getTrendingTokens } from '@/lib/dex/client';
import { redis } from '@/lib/redis';

export async function GET() {
  try {
    // Try cache first
    const cached = await redis.get('dex:trending');
    if (cached) {
      const data = typeof cached === 'string' ? JSON.parse(cached) : cached;
      return NextResponse.json({ success: true, data, cached: true });
    }

    const tokens = await getTrendingTokens();
    
    // Cache for 60 seconds
    await redis.set('dex:trending', JSON.stringify(tokens), { ex: 60 });
    
    return NextResponse.json({ success: true, data: tokens, cached: false });
  } catch (error) {
    console.error('Trending error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trending tokens' },
      { status: 500 }
    );
  }
}
