// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch trending tokens from Dexscreener via server (no CORS issues)
    const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; ZRP-Bot/1.0)',
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Dexscreener returned ${response.status}`);
    }

    const data = await response.json();

    // Filter only Solana tokens
    const solanaTokens = data.tokens
      ?.filter((t: any) => t.chainId === 'solana')
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
      })) || [];

    return NextResponse.json({ 
      success: true, 
      data: solanaTokens,
      count: solanaTokens.length,
      source: 'dexscreener',
    });

  } catch (error) {
    console.error('Error fetching trending:', error);

    // Fallback: Return popular Solana tokens with hardcoded data
    const fallback = [
      { address: 'So11111111111111111111111111111111111111112', name: 'Solana', symbol: 'SOL', price: 142.50, priceChange24h: -1.2, volume24h: 1500000000, liquidity: 50000000, marketCap: 65000000000, fdv: 65000000000, holders: 1000000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png' },
      { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', name: 'USDC', symbol: 'USDC', price: 1.00, priceChange24h: 0.01, volume24h: 50000000, liquidity: 10000000, marketCap: 25000000000, fdv: 25000000000, holders: 500000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png' },
      { address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', name: 'USDT', symbol: 'USDT', price: 1.00, priceChange24h: 0.00, volume24h: 40000000, liquidity: 8000000, marketCap: 10000000000, fdv: 10000000000, holders: 300000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png' },
      { address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', name: 'Marinade staked SOL', symbol: 'mSOL', price: 155.00, priceChange24h: -1.0, volume24h: 20000000, liquidity: 10000000, marketCap: 2000000000, fdv: 2000000000, holders: 100000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png' },
      { address: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn', name: 'Jito Staked SOL', symbol: 'JitoSOL', price: 150.00, priceChange24h: -1.3, volume24h: 15000000, liquidity: 8000000, marketCap: 1500000000, fdv: 1500000000, holders: 80000, image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn/logo.png' },
    ];

    return NextResponse.json({
      success: true,
      data: fallback,
      count: fallback.length,
      source: 'fallback',
    });
  }
}
