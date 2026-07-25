// src/lib/dex/client.ts
import type { DexToken, DexTokenDetail } from './types'; // ✅ Added

export async function searchTokens(query: string): Promise<DexToken[]> {
  // Use Birdeye or Jupiter API
  const response = await fetch(
    `https://public-api.birdeye.so/defi/v3/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to search tokens');
  }

  const data = await response.json();
  return data.data.map((item: any) => ({
    address: item.address,
    name: item.name,
    symbol: item.symbol,
    price: item.price || 0,
    priceChange1h: item.priceChange1h || 0,
    priceChange6h: item.priceChange6h || 0,
    priceChange24h: item.priceChange24h || 0,
    volume24h: item.volume24h || 0,
    liquidity: item.liquidity || 0,
    marketCap: item.marketCap || 0,
    fdv: item.fdv || 0,
    holders: item.holders || 0,
    image: item.image || null,
  }));
}

export async function getTokenDetail(address: string): Promise<DexTokenDetail> {
  const response = await fetch(
    `https://public-api.birdeye.so/defi/v3/token/detail?address=${address}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch token details');
  }

  const data = await response.json();
  return {
    ...data.data,
    price: data.data.price || 0,
    // ... map fields
  };
}
