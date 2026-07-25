// src/lib/dex/types.ts
export interface DexToken {
  address: string;
  name: string;
  symbol: string;
  price: number;
  priceChange1h: number;
  priceChange6h: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  holders: number;
  image?: string;
}

export interface DexTokenDetail extends DexToken {
  priceChange7d: number;
  priceChange30d: number;
  trades24h: number;
  buys24h: number;
  sells24h: number;
  topHolders: {
    address: string;
    percentage: number;
  }[];
  socials?: {
    website?: string;
    twitter?: string;
    telegram?: string;
  };
}
