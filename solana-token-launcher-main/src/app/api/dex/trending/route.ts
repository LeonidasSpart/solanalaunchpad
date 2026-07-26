// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

const CACHE_TTL = 60; // 1 minute

export async function GET() {
  try {
    // Clear cache to force fresh data
    await redis.del('dex:trending');

    // Use CORS proxy to fetch real data
    const proxy = 'https://corsproxy.io/?';
    const url = 'https://api.dexscreener.com/latest/dex/tokens/trending';
    
    const response = await fetch(proxy + encodeURIComponent(url), {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Dexscreener returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.tokens || data.tokens.length === 0) {
      throw new Error('No tokens from Dexscreener');
    }

    // Process Solana tokens
    const tokens = data.tokens
      .filter((t: any) => t.chainId === 'solana')
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
      }));

    // Cache fresh data
    await redis.set('dex:trending', JSON.stringify(tokens), { ex: CACHE_TTL });

    return NextResponse.json({ 
      success: true, 
      data: tokens, 
      source: 'dexscreener-real',
      count: tokens.length 
    });

  } catch (error) {
    console.error('Error fetching real data:', error);
    
    // Try Jupiter as backup
    try {
      const jupiterRes = await fetch('https://tokens.jup.ag/tokens?tags=verified');
      const list = await jupiterRes.json();
      const top = list.slice(0, 20);
      const ids = top.map((t: any) => t.address).join(',');
      const priceRes = await fetch(`https://quote-api.jup.ag/v6/price?ids=${ids}`);
      const prices = await priceRes.json();

      const tokens = top.map((t: any) => ({
        address: t.address,
        name: t.name,
        symbol: t.symbol,
        price: parseFloat(prices.data?.[t.address]?.price) || 0,
        priceChange24h: 0,
        volume24h: 0,
        liquidity: 0,
        marketCap: 0,
        fdv: 0,
        holders: 0,
        image: t.logoURI || null,
      }));

      await redis.set('dex:trending', JSON.stringify(tokens), { ex: CACHE_TTL });

      return NextResponse.json({ 
        success: true, 
        data: tokens, 
        source: 'jupiter-real',
        count: tokens.length 
      });
    } catch (jupError) {
      console.error('Jupiter backup also failed:', jupError);
    }

    // If all fails, return fallback
    const fallback = [
      { address: 'So11111111111111111111111111111111111111112', name: 'Solana', symbol: 'SOL', price: 142.50, priceChange24h: -1.2, volume24h: 1500000000, liquidity: 50000000, marketCap: 65000000000, fdv: 65000000000, holders: 1000000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
      { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', name: 'USDC', symbol: 'USDC', price: 1.00, priceChange24h: 0.01, volume24h: 50000000, liquidity: 10000000, marketCap: 25000000000, fdv: 25000000000, holders: 500000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png' },
    ];
    
    return NextResponse.json({ 
      success: true, 
      data: fallback, 
      source: 'fallback',
      count: fallback.length 
    });
  }
}
