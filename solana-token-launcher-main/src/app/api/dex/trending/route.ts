// src/app/api/dex/trending/route.ts
import { NextResponse } from 'next/server';

const GT_PAGE_SIZE = 20; // GeckoTerminal returns max 20 pools per page
const GT_MAX_PAGES = 10; // Free-tier pagination cap (paid plans go further)
const MAX_ITEMS = GT_PAGE_SIZE * GT_MAX_PAGES; // 200 pools is the ceiling on free tier

async function fetchGtPage(page: number) {
  const response = await fetch(
    `https://api.geckoterminal.com/api/v2/networks/trending_pools?include=base_token,dex,network&page=${page}`,
    {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    }
  );
  if (!response.ok) {
    throw new Error(`GeckoTerminal returned ${response.status} (page ${page})`);
  }
  return response.json();
}

function mapPool(pool: any, findIncluded: (type: string, id: string) => any) {
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
    pairName: attr.name || 'Unknown',
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
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
  const limit = Math.min(200, Math.max(1, parseInt(searchParams.get('limit') || '100', 10) || 100));

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Past what the free-tier API can ever return
    if (startIndex >= MAX_ITEMS) {
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
        page,
        limit,
        totalAvailable: MAX_ITEMS,
        totalPages: Math.ceil(MAX_ITEMS / limit),
        source: 'geckoterminal',
      });
    }

    // Figure out which upstream GeckoTerminal pages (20/each) cover this window
    const firstGtPage = Math.floor(startIndex / GT_PAGE_SIZE) + 1;
    const lastGtPage = Math.min(GT_MAX_PAGES, Math.ceil(endIndex / GT_PAGE_SIZE));
    const gtPageNumbers = Array.from(
      { length: lastGtPage - firstGtPage + 1 },
      (_, i) => firstGtPage + i
    );

    const gtResponses = await Promise.all(gtPageNumbers.map(fetchGtPage));

    const allPools: any[] = [];
    const includedMap = new Map<string, any>();
    for (const data of gtResponses) {
      (data.data || []).forEach((p: any) => allPools.push(p));
      (data.included || []).forEach((r: any) => includedMap.set(`${r.type}:${r.id}`, r));
    }
    const findIncluded = (type: string, id: string) => includedMap.get(`${type}:${id}`);

    const mapped = allPools.map((pool) => mapPool(pool, findIncluded));

    // De-dupe (overlapping GT pages can occasionally repeat a pool)
    const seen = new Set<string>();
    const deduped = mapped.filter((t) => {
      if (seen.has(t.pairAddress)) return false;
      seen.add(t.pairAddress);
      return true;
    });

    const windowStart = startIndex - (firstGtPage - 1) * GT_PAGE_SIZE;
    const pageItems = deduped.slice(windowStart, windowStart + limit);

    if (pageItems.length === 0 && page === 1) {
      return NextResponse.json(
        { success: false, error: 'No data returned from GeckoTerminal' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pageItems,
      count: pageItems.length,
      page,
      limit,
      totalAvailable: MAX_ITEMS,
      totalPages: Math.ceil(MAX_ITEMS / limit),
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
      page,
      limit,
      totalAvailable: fallback.length,
      totalPages: 1,
      source: 'fallback',
    });
  }
}
