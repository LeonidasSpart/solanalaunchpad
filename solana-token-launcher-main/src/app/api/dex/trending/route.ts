// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

// Cache for 2 minutes
const CACHE_TTL = 120;

// Fetch token logos from Jupiter token list
async function fetchTokenLogos() {
  const response = await fetch('https://tokens.jup.ag/tokens?tags=verified');
  if (!response.ok) throw new Error('Failed to fetch token list');
  const tokens = await response.json();
  const logoMap: Record<string, string> = {};
  tokens.forEach((t: any) => {
    if (t.logoURI) logoMap[t.address] = t.logoURI;
  });
  return logoMap;
}

// Fetch trending tokens from Dexscreener
async function fetchTrendingFromDexscreener() {
  const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending');
  if (!response.ok) throw new Error('Dexscreener API failed');
  const data = await response.json();
  return data;
}

// Fetch prices from Jupiter
async function fetchPrices(addresses: string[]) {
  const ids = addresses.join(',');
  const response = await fetch(`https://quote-api.jup.ag/v6/price?ids=${ids}`);
  if (!response.ok) throw new Error('Jupiter price API failed');
  const data = await response.json();
  return data.data || {};
}

export async function GET() {
  try {
    // Try cache first
    const cached = await redis.get('dex:trending');
    if (cached) {
      const data = typeof cached === 'string' ? JSON.parse(cached) : cached;
      return NextResponse.json({ success: true, data, cached: true });
    }

    // Fetch token logos
    const logos = await fetchTokenLogos();

    let tokens = [];
    let source = 'fallback';

    // 1. Try Dexscreener
    try {
      const dexData = await fetchTrendingFromDexscreener();
      if (dexData.tokens && dexData.tokens.length > 0) {
        tokens = dexData.tokens
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
            image: logos[t.baseToken.address] || null,
          }));
        source = 'dexscreener';
      }
    } catch (e) {
      console.warn('Dexscreener failed:', e);
    }

    // 2. If Dexscreener gave no results, try Jupiter top tokens
    if (tokens.length === 0) {
      try {
        const tokenList = await fetch('https://tokens.jup.ag/tokens?tags=verified');
        const list = await tokenList.json();
        // Take top 50 by volume or market cap (approximate)
        const top = list.slice(0, 50);
        const addresses = top.map((t: any) => t.address);
        const prices = await fetchPrices(addresses);

        tokens = top.map((t: any) => ({
          address: t.address,
          name: t.name,
          symbol: t.symbol,
          price: parseFloat(prices[t.address]?.price) || 0,
          priceChange24h: 0,
          volume24h: 0,
          liquidity: 0,
          marketCap: 0,
          fdv: 0,
          holders: 0,
          image: t.logoURI || null,
        }));
        source = 'jupiter';
      } catch (e) {
        console.warn('Jupiter tokens failed:', e);
      }
    }

    // 3. Fallback to hardcoded if all else fails
    if (tokens.length === 0) {
      tokens = [
        { address: 'So11111111111111111111111111111111111111112', name: 'Solana', symbol: 'SOL', price: 142.50, priceChange24h: -1.2, volume24h: 1500000000, liquidity: 50000000, marketCap: 65000000000, fdv: 65000000000, holders: 1000000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
        { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', name: 'USDC', symbol: 'USDC', price: 1.00, priceChange24h: 0.01, volume24h: 50000000, liquidity: 10000000, marketCap: 25000000000, fdv: 25000000000, holders: 500000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png' },
        { address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', name: 'USDT', symbol: 'USDT', price: 1.00, priceChange24h: 0.00, volume24h: 40000000, liquidity: 8000000, marketCap: 10000000000, fdv: 10000000000, holders: 300000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png' },
        { address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', name: 'Marinade staked SOL', symbol: 'mSOL', price: 155.00, priceChange24h: -1.0, volume24h: 20000000, liquidity: 10000000, marketCap: 2000000000, fdv: 2000000000, holders: 100000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png' },
        { address: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', name: 'Jito Staked SOL', symbol: 'JitoSOL', price: 150.00, priceChange24h: -1.3, volume24h: 15000000, liquidity: 8000000, marketCap: 1500000000, fdv: 1500000000, holders: 80000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn/logo.png' },
      ];
      source = 'fallback';
    }

    // Cache results
    await redis.set('dex:trending', JSON.stringify(tokens), { ex: CACHE_TTL });

    return NextResponse.json({ success: true, data: tokens, source, cached: false });
  } catch (error) {
    console.error('Error in trending API:', error);
    // Return fallback tokens even on error
    const fallback = [
      { address: 'So11111111111111111111111111111111111111112', name: 'Solana', symbol: 'SOL', price: 142.50, priceChange24h: -1.2, volume24h: 1500000000, liquidity: 50000000, marketCap: 65000000000, fdv: 65000000000, holders: 1000000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
    ];
    return NextResponse.json({ success: true, data: fallback, source: 'fallback' });
  }
}
