// src/lib/dex/client.ts
import type { DexToken, DexTokenDetail } from './types';

const DEXSCREENER_API = 'https://api.dexscreener.com/latest/dex';

// ... (searchTokens and getTrendingTokens functions already exist)

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
