// src/lib/dex/client.ts
import type { DexToken, DexTokenDetail } from './types';

const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex';

/**
 * Search for tokens by name, symbol, or address
 */
export async function searchTokens(query: string): Promise<DexToken[]> {
  const response = await fetch(`${DEXSCREENER_API}/search?q=${encodeURIComponent(query)}`);
  
  if (!response.ok) throw new Error('Failed to search tokens');
  
  const data = await response.json();
  
  if (!data.pairs) return [];
  
  return data.pairs
    .filter((pair: any) => pair.chainId === 'solana')
    .map((pair: any) => ({
      address: pair.baseToken.address,
      name: pair.baseToken.name || 'Unknown',
      symbol: pair.baseToken.symbol || '?',
      pairAddress: pair.pairAddress,
      dexId: pair.dexId || 'Unknown',
      price: parseFloat(pair.priceUsd) || 0,
      priceChange1h: pair.priceChange?.h1 || 0,
      priceChange6h: pair.priceChange?.h6 || 0,
      priceChange24h: pair.priceChange?.h24 || 0,
      volume24h: pair.volume?.h24 || 0,
      liquidity: pair.liquidity?.usd || 0,
      marketCap: pair.marketCap || 0,
      fdv: pair.fdv || 0,
      image: pair.info?.imageUrl || null,
      url: pair.url || '',
    }));
}

/**
 * Get trending Solana tokens
 */
export async function getTrendingTokens(): Promise<DexToken[]> {
  const response = await fetch(`${DEXSCREENER_API}/tokens/trending`);
  
  if (!response.ok) throw new Error('Failed to fetch trending tokens');
  
  const data = await response.json();
  
  if (!data.tokens) return [];
  
  return data.tokens
    .filter((token: any) => token.chainId === 'solana')
    .map((token: any) => ({
      address: token.baseToken.address,
      name: token.baseToken.name || 'Unknown',
      symbol: token.baseToken.symbol || '?',
      pairAddress: token.pairAddress,
      dexId: token.dexId || 'Unknown',
      price: parseFloat(token.priceUsd) || 0,
      priceChange1h: token.priceChange?.h1 || 0,
      priceChange6h: token.priceChange?.h6 || 0,
      priceChange24h: token.priceChange?.h24 || 0,
      volume24h: token.volume?.h24 || 0,
      liquidity: token.liquidity?.usd || 0,
      marketCap: token.marketCap || 0,
      fdv: token.fdv || 0,
      image: token.info?.imageUrl || null,
      url: token.url || '',
      age: token.createdAt || 'Unknown',
      txns24h: (token.txns?.h24?.buys || 0) + (token.txns?.h24?.sells || 0),
      traders24h: token.traders?.h24 || 0,
    }));
}

/**
 * Get detailed information for a specific token
 */
export async function getTokenDetail(address: string): Promise<DexTokenDetail | null> {
  const response = await fetch(`${DEXSCREENER_API}/tokens/${address}`);
  
  if (!response.ok) throw new Error('Failed to fetch token details');
  
  const data = await response.json();
  
  if (!data.pairs || data.pairs.length === 0) return null;
  
  const pair = data.pairs[0];
  
  return {
    address: pair.baseToken.address,
    name: pair.baseToken.name,
    symbol: pair.baseToken.symbol,
    pairAddress: pair.pairAddress,
    dexId: pair.dexId,
    price: parseFloat(pair.priceUsd) || 0,
    priceChange1h: pair.priceChange?.h1 || 0,
    priceChange6h: pair.priceChange?.h6 || 0,
    priceChange24h: pair.priceChange?.h24 || 0,
    priceChange7d: pair.priceChange?.d7 || 0,
    priceChange30d: pair.priceChange?.d30 || 0,
    volume24h: pair.volume?.h24 || 0,
    liquidity: pair.liquidity?.usd || 0,
    marketCap: pair.marketCap || 0,
    fdv: pair.fdv || 0,
    image: pair.info?.imageUrl || null,
    url: pair.url,
    trades24h: pair.txns?.h24?.buys + pair.txns?.h24?.sells || 0,
    buys24h: pair.txns?.h24?.buys || 0,
    sells24h: pair.txns?.h24?.sells || 0,
    socials: {
      website: pair.info?.website || null,
      twitter: pair.info?.twitter || null,
      telegram: pair.info?.telegram || null,
    },
  };
}
