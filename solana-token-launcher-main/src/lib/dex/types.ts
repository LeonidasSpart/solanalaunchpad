// src/lib/dex/types.ts
export interface DexToken {
  address: string;
  name: string;
  symbol: string;
  pairAddress: string;
  dexId: string;
  price: number;
  priceChange1h: number;
  priceChange6h: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  image: string | null;
  url?: string;
}

export interface DexTokenDetail extends DexToken {
  priceChange7d: number;
  priceChange30d: number;
  trades24h: number;
  buys24h: number;
  sells24h: number;
  socials: {
    website: string | null;
    twitter: string | null;
    telegram: string | null;
  };
}
