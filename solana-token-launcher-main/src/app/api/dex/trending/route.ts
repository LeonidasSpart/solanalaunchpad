// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // GeckoTerminal trending pools endpoint (free, no API key)
    const response = await fetch(
      'https://api.geckoterminal.com/api/v2/networks/trending_pools',
      {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) throw new Error(`GeckoTerminal returned ${response.status}`);

    const data = await response.json();

    const tokens = data.data.map((pool: any) => ({
      address: pool.attributes.address || 'Unknown',
      name: pool.attributes.name || 'Unknown',
      symbol: pool.attributes.symbol || '?',
      chain: pool.relationships?.network?.data?.id || 'Unknown',
      dex: pool.attributes.dex || 'Unknown',
      price: parseFloat(pool.attributes.price_usd) || 0,
      priceChange24h: pool.attributes.price_change_percentage_24h || 0,
      volume24h: pool.attributes.volume_usd_24h || 0,
      liquidity: pool.attributes.reserve_in_usd || 0,
      marketCap: pool.attributes.market_cap_usd || 0,
      fdv: pool.attributes.fully_diluted_valuation_usd || 0,
      image: null,
      pairAddress: pool.attributes.address || '',
      url: `https://www.geckoterminal.com/${pool.relationships?.network?.data?.id}/pools/${pool.attributes.address}`,
    }));

    return NextResponse.json({ success: true, data: tokens, count: tokens.length });
  } catch (error) {
    console.error('Error fetching from GeckoTerminal:', error);
    return NextResponse.json({ success: false, error: 'Failed to load data' }, { status: 500 });
  }
}
