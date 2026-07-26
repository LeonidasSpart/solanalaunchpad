// src/app/api/dex/pool/[chain]/[address]/route.ts
import { NextResponse } from 'next/server';

async function safeFetchJson(url: string) {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ chain: string; address: string }> }
) {
  const { chain, address } = await params;

  if (!chain || !address) {
    return NextResponse.json({ success: false, error: 'Missing chain or address' }, { status: 400 });
  }

  try {
    // 1. Pool detail (price, market cap, volume, liquidity, transactions, dex/tokens)
    const poolData = await safeFetchJson(
      `https://api.geckoterminal.com/api/v2/networks/${chain}/pools/${address}?include=base_token,quote_token,dex`
    );

    if (!poolData?.data) {
      return NextResponse.json({ success: false, error: 'Pool not found' }, { status: 404 });
    }

    const attr = poolData.data.attributes || {};
    const rel = poolData.data.relationships || {};
    const included: any[] = poolData.included || [];
    const findIncluded = (type: string, id: string) =>
      included.find((r) => r.type === type && r.id === id);

    const dexId = rel?.dex?.data?.id;
    const dexResource = dexId ? findIncluded('dex', dexId) : null;
    const dexName = dexResource?.attributes?.name || dexId || 'Unknown';

    const baseTokenId = rel?.base_token?.data?.id;
    const baseTokenResource = baseTokenId ? findIncluded('token', baseTokenId) : null;
    const baseTokenAddress = baseTokenResource?.attributes?.address;

    const quoteTokenId = rel?.quote_token?.data?.id;
    const quoteTokenResource = quoteTokenId ? findIncluded('token', quoteTokenId) : null;

    // 2. Token metadata (description, socials, links) - needs the token's own address, run in parallel with OHLCV
    const [tokenInfoData, ohlcvData] = await Promise.all([
      baseTokenAddress
        ? safeFetchJson(`https://api.geckoterminal.com/api/v2/networks/${chain}/tokens/${baseTokenAddress}/info`)
        : Promise.resolve(null),
      safeFetchJson(
        `https://api.geckoterminal.com/api/v2/networks/${chain}/pools/${address}/ohlcv/day?aggregate=1&limit=30&currency=usd&token=base`
      ),
    ]);

    const tokenInfo = tokenInfoData?.data?.attributes || null;

    // OHLCV comes back as [timestamp, open, high, low, close, volume][]
    const ohlcvList: number[][] = ohlcvData?.data?.attributes?.ohlcv_list || [];
    const chart = ohlcvList
      .map(([timestamp, open, high, low, close, volume]) => ({
        timestamp: timestamp * 1000,
        open,
        high,
        low,
        close,
        volume,
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    const result = {
      address: attr.address,
      pairName: attr.name || 'Unknown',
      symbol: baseTokenResource?.attributes?.symbol || '?',
      name: baseTokenResource?.attributes?.name || tokenInfo?.name || 'Unknown',
      image: tokenInfo?.image_url || baseTokenResource?.attributes?.image_url || null,
      chain,
      dex: dexName,
      quoteSymbol: quoteTokenResource?.attributes?.symbol || '?',

      price: parseFloat(attr.base_token_price_usd) || 0,
      priceNative: parseFloat(attr.base_token_price_native_currency) || 0,
      priceChange: {
        m5: parseFloat(attr.price_change_percentage?.m5) || 0,
        h1: parseFloat(attr.price_change_percentage?.h1) || 0,
        h6: parseFloat(attr.price_change_percentage?.h6) || 0,
        h24: parseFloat(attr.price_change_percentage?.h24) || 0,
      },
      volume: {
        m5: parseFloat(attr.volume_usd?.m5) || 0,
        h1: parseFloat(attr.volume_usd?.h1) || 0,
        h6: parseFloat(attr.volume_usd?.h6) || 0,
        h24: parseFloat(attr.volume_usd?.h24) || 0,
      },
      transactions: {
        h24: attr.transactions?.h24 || { buys: 0, sells: 0, buyers: 0, sellers: 0 },
        h1: attr.transactions?.h1 || { buys: 0, sells: 0, buyers: 0, sellers: 0 },
      },
      marketCap: parseFloat(attr.market_cap_usd) || parseFloat(attr.fdv_usd) || 0,
      fdv: parseFloat(attr.fdv_usd) || 0,
      liquidity: parseFloat(attr.reserve_in_usd) || 0,
      poolCreatedAt: attr.pool_created_at || null,

      description: tokenInfo?.description || null,
      websites: tokenInfo?.websites || [],
      twitter: tokenInfo?.twitter_handle || null,
      telegram: tokenInfo?.telegram_handle || null,
      discord: tokenInfo?.discord_url || null,
      gtScore: tokenInfo?.gt_score || null,
      coingeckoId: tokenInfo?.coingecko_coin_id || null,

      chart,
      geckoTerminalUrl: `https://www.geckoterminal.com/${chain}/pools/${address}`,
    };

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error fetching pool detail:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch pool detail' }, { status: 500 });
  }
}
