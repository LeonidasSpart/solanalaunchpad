// src/app/api/dex/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchTokens } from '@/lib/dex/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const tokens = await searchTokens(query);
    return NextResponse.json({ success: true, data: tokens });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search tokens' },
      { status: 500 }
    );
  }
}
