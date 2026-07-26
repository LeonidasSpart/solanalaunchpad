// src/app/dex/[chain]/[address]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PriceChart from './PriceChart';

interface PoolDetail {
  address: string;
  pairName: string;
  symbol: string;
  name: string;
  image: string | null;
  chain: string;
  dex: string;
  quoteSymbol: string;
  price: number;
  priceNative: number;
  priceChange: { m5: number; h1: number; h6: number; h24: number };
  volume: { m5: number; h1: number; h6: number; h24: number };
  transactions: {
    h24: { buys: number; sells: number; buyers: number; sellers: number };
    h1: { buys: number; sells: number; buyers: number; sellers: number };
  };
  marketCap: number;
  fdv: number;
  liquidity: number;
  poolCreatedAt: string | null;
  description: string | null;
  websites: string[];
  twitter: string | null;
  telegram: string | null;
  discord: string | null;
  gtScore: number | null;
  coingeckoId: string | null;
  chart: { timestamp: number; open: number; high: number; low: number; close: number; volume: number }[];
  geckoTerminalUrl: string;
}

async function getPoolDetail(chain: string, address: string): Promise<PoolDetail | null> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zrp.one';
  try {
    const res = await fetch(`${baseUrl}/api/dex/pool/${chain}/${address}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

function formatPrice(price: number): string {
  if (!price) return '$0.00';
  if (price >= 1) return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  const match = price.toFixed(12).match(/^0\.(0*)([1-9]\d*)/);
  if (match) {
    const leadingZeros = match[1].length;
    const sigDigits = match[2].slice(0, 4);
    return `$0.${'0'.repeat(leadingZeros)}${sigDigits}`;
  }
  return `$${price}`;
}

function formatCompact(value: number): string {
  if (!value) return '$0.00';
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

function ChangeBadge({ value }: { value: number }) {
  const positive = value >= 0;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-mono font-semibold ${
        positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
      }`}
    >
      {positive ? '+' : ''}
      {value.toFixed(2)}%
    </span>
  );
}

export default async function PoolDetailPage({
  params,
}: {
  params: Promise<{ chain: string; address: string }>;
}) {
  const { chain, address } = await params;
  const pool = await getPoolDetail(chain, address);

  if (!pool) notFound();

  const timeframes: { label: string; key: keyof PoolDetail['priceChange'] }[] = [
    { label: '5m', key: 'm5' },
    { label: '1h', key: 'h1' },
    { label: '6h', key: 'h6' },
    { label: '24h', key: 'h24' },
  ];

  return (
    <main className="min-h-screen bg-[#0B0E14] text-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/dex" className="mb-6 inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/80">
          ← Back to screener
        </Link>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {pool.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pool.image} alt={pool.symbol} className="h-14 w-14 rounded-full bg-white/5" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-lg text-white/40">
                ?
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{pool.name}</h1>
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-xs font-medium text-purple-300">
                  {pool.chain}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/60">
                  {pool.dex}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/50">
                ${pool.symbol} · {pool.pairName}
              </p>
            </div>
          </div>

        </div>

        {/* Price block */}
        <div className="mb-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs uppercase tracking-wide text-white/40">Live price</span>
              </div>
              <p className="mt-1 font-mono text-4xl font-bold">{formatPrice(pool.price)}</p>
            </div>
            <div className="flex gap-4">
              {timeframes.map((tf) => (
                <div key={tf.key} className="text-center">
                  <p className="mb-1 text-xs text-white/40">{tf.label}</p>
                  <ChangeBadge value={pool.priceChange[tf.key]} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <PriceChart data={pool.chart} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: 'Market Cap', value: formatCompact(pool.marketCap) },
            { label: 'FDV', value: formatCompact(pool.fdv) },
            { label: 'Liquidity', value: formatCompact(pool.liquidity) },
            { label: '24h Volume', value: formatCompact(pool.volume.h24) },
            { label: '24h Buys', value: pool.transactions.h24.buys.toLocaleString() },
            { label: '24h Sells', value: pool.transactions.h24.sells.toLocaleString() },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="text-xs text-white/40">{stat.label}</p>
              <p className="mt-1 font-mono text-lg font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* About + links */}
        {(pool.description || pool.websites.length > 0 || pool.twitter || pool.telegram) && (
          <div className="mb-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h2 className="mb-3 text-lg font-semibold">About {pool.name}</h2>
            {pool.description && (
              <p className="mb-4 text-sm leading-relaxed text-white/60">{pool.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {pool.websites.map((site) => (
                <a
                  key={site}
                  href={site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
                >
                  Website ↗
                </a>
              ))}
              {pool.twitter && (
                <a
                  href={`https://x.com/${pool.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
                >
                  X / Twitter ↗
                </a>
              )}
              {pool.telegram && (
                <a
                  href={`https://t.me/${pool.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/5"
                >
                  Telegram ↗
                </a>
              )}
            </div>
          </div>
        )}

        {/* Contract address */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <p className="mb-2 text-xs text-white/40">Pool address ({pool.chain})</p>
          <p className="break-all font-mono text-sm text-white/70">{pool.address}</p>
        </div>
      </div>
    </main>
  );
}
