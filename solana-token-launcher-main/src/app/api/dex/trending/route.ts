// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const SOLANA_TOKEN_IDS = [
  'solana', 'usd-coin', 'tether', 'chainlink', 'raydium', 
  'orca', 'step-finance', 'jito-governance-token', 'marinade-staked-sol'
];

export async function GET() {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${SOLANA_TOKEN_IDS.join(',')}&order=market_cap_desc&per_page=20&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    const tokens = data.map((coin: any) => ({
      address: coin.id,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price || 0,
      priceChange24h: coin.price_change_percentage_24h || 0,
      volume24h: coin.total_volume || 0,
      liquidity: 0, // Not provided by CoinGecko
      marketCap: coin.market_cap || 0,
      fdv: coin.fully_diluted_valuation || 0,
      holders: 0, // Not provided by CoinGecko
      image: coin.image || null,
    }));
    
    return NextResponse.json({ success: true, data: tokens, count: tokens.length, source: 'coingecko' });
  } catch (error) {
    console.error('Error fetching from CoinGecko:', error);
    
    // Fallback: Use hardcoded data
    const fallback = [
      { address: 'solana', name: 'Solana', symbol: 'SOL', price: 142.50, priceChange24h: -1.2, volume24h: 1500000000, liquidity: 0, marketCap: 65000000000, fdv: 65000000000, holders: 0, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
      { address: 'usd-coin', name: 'USD Coin', symbol: 'USDC', price: 1.00, priceChange24h: 0.01, volume24h: 50000000, liquidity: 0, marketCap: 25000000000, fdv: 25000000000, holders: 0, image: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png' },
    ];
    
    return NextResponse.json({ success: true, data: fallback, count: fallback.length, source: 'fallback' });
  }
}
