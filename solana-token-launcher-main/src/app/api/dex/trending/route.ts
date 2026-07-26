// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // include=base_token,dex,network resolves symbol/name/image and dex/network
    // names via the top-level "included" array (JSON:API side-loading).
    const response = await fetch(
      'https://api.geckoterminal.com/api/v2/networks/trending_pools?include=base_token,dex,network',
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: 60 },
      }
    );
    if (!response.ok) throw new Error(`GeckoTerminal returned ${response.status}`);

    const data = await response.json();
    const included: any[] = data.included || [];

    // Build lookup maps from the "included" side-loaded resources
    const findIncluded = (type: string, id: string) =>
      included.find((r) => r.type === type && r.id === id);

    const tokens =
      data.data?.map((pool: any) => {
        const attr = pool.attributes || {};
        const rel = pool.relationships || {};

        const networkId = rel?.network?.data?.id || 'unknown';
        const dexId = rel?.dex?.data?.id;
        const dexResource = dexId ? findIncluded('dex', dexId) : null;
        const dexName = dexResource?.attributes?.name || dexId || 'Unknown';

        const baseTokenId = rel?.base_token?.data?.id;
        const baseTokenResource = baseTokenId ? findIncluded('token', baseTokenId) : null;
        const symbol = baseTokenResource?.attributes?.symbol || '?';
        const tokenName = baseTokenResource?.attributes?.name || attr.name || 'Unknown';
        const image = baseTokenResource?.attributes?.image_url || null;

        const volume24h = parseFloat(attr.volume_usd?.h24) || 0;
        const priceChange24h = parseFloat(attr.price_change_percentage?.h24) || 0;
        const marketCap = parseFloat(attr.market_cap_usd) || parseFloat(attr.fdv_usd) || 0;

        return {
          address: attr.address || 'Unknown',
          name: tokenName,
          pairName: attr.name || 'Unknown', // e.g. "$WIF / SOL"
          symbol,
          chain: networkId,
          dex: dexName,
          price: parseFloat(attr.base_token_price_usd) || 0,
          priceChange24h,
          volume24h,
          liquidity: parseFloat(attr.reserve_in_usd) || 0,
          marketCap,
          fdv: parseFloat(attr.fdv_usd) || 0,
          image,
          pairAddress: attr.address || '',
          url: `https://www.geckoterminal.com/${networkId}/pools/${attr.address}`,
        };
      }) || [];

    if (tokens.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No data returned from GeckoTerminal' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: tokens,
      count: tokens.length,
      source: 'geckoterminal',
    });
  } catch (error) {
    console.error('Error fetching from GeckoTerminal:', error);

    const fallback = [
      {
        address: 'So11111111111111111111111111111111111111112',
        name: 'Solana',
        pairName: 'SOL / USDC',
        symbol: 'SOL',
        chain: 'solana',
        dex: 'Raydium',
        price: 142.5,
        priceChange24h: -1.2,
        volume24h: 1500000000,
        liquidity: 50000000,
        marketCap: 65000000000,
        fdv: 65000000000,
        image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
        pairAddress: 'So111...',
        url: 'https://dexscreener.com/solana/sol',
      },
      {
        address: '0x...',
        name: 'Ethereum',
        pairName: 'ETH / USDC',
        symbol: 'ETH',
        chain: 'ethereum',
        dex: 'Uniswap',
        price: 3200,
        priceChange24h: 0.5,
        volume24h: 1000000000,
        liquidity: 50000000,
        marketCap: 380000000000,
        fdv: 380000000000,
        image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
        pairAddress: '0x...',
        url: 'https://dexscreener.com/ethereum/eth',
      },
    ];

    return NextResponse.json({
      success: true,
      data: fallback,
      count: fallback.length,
      source: 'fallback',
    });
  }
}
