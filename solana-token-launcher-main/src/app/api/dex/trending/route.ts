// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch trending tokens from Dexscreener (all chains)
    const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ZRP-DEX/1.0',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Dexscreener returned ${response.status}`);
    }

    const data = await response.json();

    // Map all tokens (no chain filter)
    const tokens = data.tokens?.map((t: any) => ({
      address: t.baseToken?.address || 'Unknown',
      name: t.baseToken?.name || 'Unknown',
      symbol: t.baseToken?.symbol || '?',
      chain: t.chainId || 'Unknown',
      dex: t.dexId || 'Unknown',
      price: parseFloat(t.priceUsd) || 0,
      priceChange24h: t.priceChange?.h24 || 0,
      volume24h: t.volume?.h24 || 0,
      liquidity: t.liquidity?.usd || 0,
      marketCap: t.marketCap || 0,
      fdv: t.fdv || 0,
      image: null, // Dexscreener doesn't provide images
      pairAddress: t.pairAddress,
      url: t.url || '',
    })) || [];

    return NextResponse.json({
      success: true,
      data: tokens,
      count: tokens.length,
      source: 'dexscreener',
    });

  } catch (error) {
    console.error('Error fetching trending:', error);

    // Fallback: Return a sample of multi-chain tokens
    const fallback = [
      { address: '0x...', name: 'Ethereum', symbol: 'ETH', chain: 'ethereum', dex: 'Uniswap', price: 3200, priceChange24h: 0.5, volume24h: 1000000000, liquidity: 50000000, marketCap: 380000000000, fdv: 380000000000, image: null },
      { address: 'So...', name: 'Solana', symbol: 'SOL', chain: 'solana', dex: 'Raydium', price: 142.50, priceChange24h: -1.2, volume24h: 1500000000, liquidity: 50000000, marketCap: 65000000000, fdv: 65000000000, image: null },
      { address: '0x...', name: 'BNB', symbol: 'BNB', chain: 'bsc', dex: 'PancakeSwap', price: 580, priceChange24h: 0.8, volume24h: 800000000, liquidity: 40000000, marketCap: 85000000000, fdv: 85000000000, image: null },
      { address: '0x...', name: 'MATIC', symbol: 'MATIC', chain: 'polygon', dex: 'QuickSwap', price: 0.52, priceChange24h: -0.3, volume24h: 200000000, liquidity: 10000000, marketCap: 5000000000, fdv: 5000000000, image: null },
    ];

    return NextResponse.json({
      success: true,
      data: fallback,
      count: fallback.length,
      source: 'fallback',
    });
  }
}
