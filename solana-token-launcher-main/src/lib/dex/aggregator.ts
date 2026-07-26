// src/lib/dex/aggregator.ts
import { Connection, PublicKey } from "@solana/web3.js";

const JUPITER_API = "https://quote-api.jup.ag/v6";
const BIRDEYE_API = "https://public-api.birdeye.so/defi/v3";

export interface DexToken {
  address: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  holders: number;
  image?: string;
  riskScore?: number;
  isZRPLaunched?: boolean;
}

export async function getTokenData(address: string): Promise<DexToken | null> {
  try {
    // 1. Get price from Jupiter
    const priceRes = await fetch(`${JUPITER_API}/price?ids=${address}`);
    const priceData = await priceRes.json();
    const price = priceData.data?.[address]?.price || 0;

    // 2. Get token info from Birdeye
    const infoRes = await fetch(`${BIRDEYE_API}/token/detail?address=${address}`);
    const infoData = await infoRes.json();

    return {
      address,
      name: infoData.data?.name || "Unknown",
      symbol: infoData.data?.symbol || "Unknown",
      price: parseFloat(price) || 0,
      priceChange24h: infoData.data?.priceChange24h || 0,
      volume24h: infoData.data?.volume24h || 0,
      liquidity: infoData.data?.liquidity || 0,
      marketCap: infoData.data?.marketCap || 0,
      fdv: infoData.data?.fdv || 0,
      holders: infoData.data?.holders || 0,
      image: infoData.data?.image || null,
    };
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
}

export async function getTrendingTokens(): Promise<DexToken[]> {
  try {
    const response = await fetch(`${BIRDEYE_API}/token/trending`);
    const data = await response.json();
    
    if (!data.data) return [];
    
    return data.data.map((item: any) => ({
      address: item.address,
      name: item.name || "Unknown",
      symbol: item.symbol || "Unknown",
      price: item.price || 0,
      priceChange24h: item.priceChange24h || 0,
      volume24h: item.volume24h || 0,
      liquidity: item.liquidity || 0,
      marketCap: item.marketCap || 0,
      fdv: item.fdv || 0,
      holders: item.holders || 0,
      image: item.image || null,
    }));
  } catch (error) {
    console.error("Error fetching trending:", error);
    return [];
  }
}
