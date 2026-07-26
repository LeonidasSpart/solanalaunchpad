// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // DexPaprika trending pools endpoint (no API key needed)
    const response = await fetch(
      'https://api.dexpaprika.com/trending/pools',
      {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 }, // Cache 60 seconds
      }
    );

    if (!response.ok) throw new Error(`DexPaprika returned ${response.status}`);

    const data = await response.json();

    const tokens = data.map((pool: any) => ({
      address: pool.token?.address || 'Unknown',
      name: pool.token?.name || 'Unknown',
      symbol: pool.token?.symbol || '?',
      chain: pool.network || 'Unknown',
      dex: pool.dex || 'Unknown',
      price: pool.price_usd || 0,
      priceChange24h: pool.price_change_24h || 0,
      volume24h: pool.volume_24h || 0,
      liquidity: pool.liquidity_usd || 0,
      marketCap: pool.market_cap || 0,
      fdv: pool.fdv || 0,
      image: null,
      pairAddress: pool.pair_address || '',
      url: pool.url || '',
    }));

    return NextResponse.json({ success: true, data: tokens, count: tokens.length });
  } catch (error) {
    console.error('Error fetching from DexPaprika:', error);
    return NextResponse.json({ success: false, error: 'Failed to load data' }, { status: 500 });
  }
}
