// src/app/api/dex/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();

    const tokens = data.pairs
      ?.filter((p: any) => p.chainId === 'solana')
      .map((p: any) => ({
        address: p.baseToken.address,
        name: p.baseToken.name || 'Unknown',
        symbol: p.baseToken.symbol || '?',
        price: parseFloat(p.priceUsd) || 0,
        priceChange24h: p.priceChange?.h24 || 0,
        volume24h: p.volume?.h24 || 0,
        liquidity: p.liquidity?.usd || 0,
        marketCap: p.marketCap || 0,
        fdv: p.fdv || 0,
        holders: 0,
        image: null,
      })) || [];

    return NextResponse.json({ success: true, data: tokens });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
