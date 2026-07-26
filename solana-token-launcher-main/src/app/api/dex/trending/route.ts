// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

// Fallback tokens (popular Solana tokens) – always available
const FALLBACK_TOKENS = [
  { address: 'So11111111111111111111111111111111111111112', name: 'Solana', symbol: 'SOL', price: 142.50, priceChange24h: -1.2, volume24h: 1500000000, liquidity: 50000000, marketCap: 65000000000, fdv: 65000000000, holders: 1000000 },
  { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', name: 'USDC', symbol: 'USDC', price: 1.00, priceChange24h: 0.01, volume24h: 50000000, liquidity: 10000000, marketCap: 25000000000, fdv: 25000000000, holders: 500000 },
  { address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', name: 'USDT', symbol: 'USDT', price: 1.00, priceChange24h: 0.00, volume24h: 40000000, liquidity: 8000000, marketCap: 10000000000, fdv: 10000000000, holders: 300000 },
  { address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', name: 'Marinade staked SOL', symbol: 'mSOL', price: 155.00, priceChange24h: -1.0, volume24h: 20000000, liquidity: 10000000, marketCap: 2000000000, fdv: 2000000000, holders: 100000 },
  { address: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', name: 'Jito Staked SOL', symbol: 'JitoSOL', price: 150.00, priceChange24h: -1.3, volume24h: 15000000, liquidity: 8000000, marketCap: 1500000000, fdv: 1500000000, holders: 80000 },
  { address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', name: 'Samoyed Coin', symbol: 'SAMO', price: 0.008, priceChange24h: 5.2, volume24h: 500000, liquidity: 200000, marketCap: 30000000, fdv: 30000000, holders: 20000 },
  { address: 'C98A4nkJX75V2b7q6XveMZgqP8KJZB6X5NvKjv8M9Zq', name: 'Coin98', symbol: 'C98', price: 0.15, priceChange24h: -2.0, volume24h: 1000000, liquidity: 500000, marketCap: 50000000, fdv: 50000000, holders: 25000 },
  { address: 'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3', name: 'Step Finance', symbol: 'STEP', price: 0.05, priceChange24h: 1.0, volume24h: 200000, liquidity: 100000, marketCap: 10000000, fdv: 10000000, holders: 15000 },
  { address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', name: 'Raydium', symbol: 'RAY', price: 0.80, priceChange24h: 0.5, volume24h: 2000000, liquidity: 1000000, marketCap: 80000000, fdv: 80000000, holders: 30000 },
  { address: '8iJ51LQc1uAJei9vyA1dCSAfx2VkKcN7Q1vK5Hw1C6eD', name: 'Orca', symbol: 'ORCA', price: 1.20, priceChange24h: 1.2, volume24h: 1500000, liquidity: 700000, marketCap: 60000000, fdv: 60000000, holders: 20000 },
];

async function fetchFromDexscreener() {
  // Use a CORS proxy to avoid browser restrictions
  const proxy = 'https://corsproxy.io/?';
  const url = 'https://api.dexscreener.com/latest/dex/tokens/trending';
  const response = await fetch(proxy + encodeURIComponent(url));
  if (!response.ok) throw new Error('Dexscreener API failed');
  const data = await response.json();
  return data;
}

async function fetchFromJupiter() {
  // Get token list from Jupiter
  const response = await fetch('https://tokens.jup.ag');
  if (!response.ok) throw new Error('Jupiter token list failed');
  const tokens = await response.json();
  // Get top 100 by market cap (approximated by volume or price)
  // For now, take first 100 (they are sorted by popularity)
  const top = tokens.slice(0, 100);
  // Get prices for these tokens
  const ids = top.map((t: any) => t.address).join(',');
  const priceResponse = await fetch(`https://quote-api.jup.ag/v6/price?ids=${ids}`);
  const priceData = await priceResponse.json();
  return top.map((t: any) => ({
    address: t.address,
    name: t.name,
    symbol: t.symbol,
    price: priceData.data?.[t.address]?.price || 0,
    priceChange24h: 0, // Jupiter doesn't provide change
    volume24h: 0,
    liquidity: 0,
    marketCap: 0,
    fdv: 0,
    holders: 0,
  }));
}

export async function GET() {
  try {
    // Try cache first
    const cached = await redis.get('dex:trending');
    if (cached) {
      const data = typeof cached === 'string' ? JSON.parse(cached) : cached;
      return NextResponse.json({ success: true, data, cached: true });
    }

    let tokens = [];
    let source = 'fallback';

    // Attempt 1: Dexscreener via proxy
    try {
      const dexData = await fetchFromDexscreener();
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
          }));
        source = 'dexscreener';
      }
    } catch (e) {
      console.warn('Dexscreener failed, trying Jupiter...');
    }

    // If Dexscreener failed, try Jupiter
    if (tokens.length === 0) {
      try {
        const jupiterTokens = await fetchFromJupiter();
        tokens = jupiterTokens;
        source = 'jupiter';
      } catch (e) {
        console.warn('Jupiter failed, using fallback');
      }
    }

    // If all else fails, use hardcoded fallback
    if (tokens.length === 0) {
      tokens = FALLBACK_TOKENS;
      source = 'fallback';
    }

    // Cache for 2 minutes
    await redis.set('dex:trending', JSON.stringify(tokens), { ex: 120 });

    return NextResponse.json({ success: true, data: tokens, source, cached: false });
  } catch (error) {
    console.error('Error in trending API:', error);
    // Return fallback tokens even on error
    return NextResponse.json({ success: true, data: FALLBACK_TOKENS, source: 'fallback' });
  }
}
