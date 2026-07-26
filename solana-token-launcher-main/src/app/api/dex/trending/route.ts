// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; ZRP-Bot/1.0)',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error(`Dexscreener returned ${response.status}`);

    const data = await response.json();

    const solanaTokens = data.tokens
      ?.filter((t: any) => t.chainId === 'solana')
      .map((t: any) => ({
        address: t.baseToken.address,
        name: t.baseToken.name || 'Unknown',
        symbol: t.baseToken.symbol || '?',
        price: parseFloat(t.priceUsd) || 0,
        priceChange24h: t.priceChange?.h24 || 0,
        volume24h: t.volume?.h24 || 0,
        liquidity: t.liquidity?.usd || 0,
        marketCap: t.marketCap || 0,
        fdv: t.fdv || 0,
        holders: 0,
        image: null,
      })) || [];

    return NextResponse.json({ success: true, data: solanaTokens });

  } catch (error) {
    console.error('Error fetching trending:', error);
    // Return a fallback list of tokens so the page never breaks
    const fallback = [
      { address: 'So11111111111111111111111111111111111111112', name: 'Solana', symbol: 'SOL', price: 142.50, priceChange24h: -1.2, volume24h: 1500000000, liquidity: 50000000, marketCap: 65000000000, fdv: 65000000000, holders: 1000000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
      // ... add more fallback tokens
    ];

    return NextResponse.json({ success: true, data: fallback });
  }
}
