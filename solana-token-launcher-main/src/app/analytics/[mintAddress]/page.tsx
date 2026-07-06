'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Coins, 
  DollarSign, 
  Activity,
  ArrowLeft,
  RefreshCw,
  Clock,
  Wallet,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface TokenAnalytics {
  price: {
    current: number;
    change24h: number;
    high24h: number;
    low24h: number;
  };
  marketCap: number;
  volume24h: number;
  liquidity: number;
  holders: number;
  totalSupply: number;
  decimals: number;
  holderDistribution: { label: string; value: number; color: string }[];
  recentTransactions: { type: string; amount: number; from: string; to: string; time: string }[];
}

// ─── Helper: Format numbers ────────────────────────────────────────
const formatPrice = (num: number) => {
  if (num < 0.000001) return num.toExponential(6);
  if (num < 1) return num.toFixed(6);
  if (num < 1000) return num.toFixed(2);
  if (num < 1000000) return num.toFixed(0);
  return num.toFixed(0);
};

const formatCurrency = (num: number) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(2) + 'K';
  return num.toFixed(2);
};

export default function TokenAnalyticsPage() {
  const params = useParams();
  const mintAddress = params.mintAddress as string;

  const [data, setData] = useState<TokenAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/token-analytics/${mintAddress}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to fetch analytics');
      }
      const data = await res.json();
      setData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (mintAddress) {
      fetchData();
    }
  }, [mintAddress]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#BDDBDB]">Loading token analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-6">
          <p className="text-[#FF2D2D] font-bold">{error}</p>
          <Link href="/" className="text-[#BDDBDB] hover:text-white mt-4 inline-block transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-[#BDDBDB]">No data available for this token.</p>
        <Link href="/" className="text-[#FF2D2D] hover:text-[#B10000] mt-4 inline-block transition">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const { price, marketCap, volume24h, liquidity, holders, totalSupply, holderDistribution, recentTransactions } = data;

  const isPositive = price.change24h >= 0;

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/tokens"
              className="text-[#BDDBDB] hover:text-white transition p-2 rounded-lg hover:bg-[#1a1a1a]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Token Analytics</h1>
              <p className="text-[#BDDBDB] text-sm font-mono">
                {mintAddress.slice(0, 8)}...{mintAddress.slice(-8)}
              </p>
            </div>
          </div>
          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] transition disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0D0D0D] rounded-xl p-5 border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#BDDBDB] text-sm">Price</p>
                <p className="text-2xl font-bold text-white">${formatPrice(price.current)}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-[#FF2D2D]'}`}>
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {isPositive ? '+' : ''}{price.change24h.toFixed(2)}%
              </div>
            </div>
            <div className="flex justify-between text-xs text-[#BDDBDB] mt-2 opacity-50">
              <span>High: ${formatPrice(price.high24h)}</span>
              <span>Low: ${formatPrice(price.low24h)}</span>
            </div>
          </div>

          <div className="bg-[#0D0D0D] rounded-xl p-5 border border-[#1a1a1a]">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#FF2D2D]" />
              <div>
                <p className="text-[#BDDBDB] text-sm">Market Cap</p>
                <p className="text-xl font-bold text-white">${formatCurrency(marketCap)}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] rounded-xl p-5 border border-[#1a1a1a]">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#FF2D2D]" />
              <div>
                <p className="text-[#BDDBDB] text-sm">24h Volume</p>
                <p className="text-xl font-bold text-white">${formatCurrency(volume24h)}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0D0D0D] rounded-xl p-5 border border-[#1a1a1a]">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#FF2D2D]" />
              <div>
                <p className="text-[#BDDBDB] text-sm">Holders</p>
                <p className="text-xl font-bold text-white">{holders.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Liquidity, Supply, etc. */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0D0D0D]/50 rounded-xl p-4 border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-xs opacity-70">Liquidity</p>
            <p className="text-lg font-bold text-white">${formatCurrency(liquidity)}</p>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl p-4 border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-xs opacity-70">Total Supply</p>
            <p className="text-lg font-bold text-white">{formatCurrency(totalSupply)}</p>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl p-4 border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-xs opacity-70">Decimals</p>
            <p className="text-lg font-bold text-white">{data.decimals}</p>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl p-4 border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-xs opacity-70">Token Type</p>
            <p className="text-lg font-bold text-white">SPL</p>
          </div>
        </div>

        {/* Holder Distribution & Recent Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Holder Distribution */}
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-[#FF2D2D]" />
              <h3 className="text-white font-semibold">Holder Distribution</h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                {holderDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2 last:mb-0">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#BDDBDB] text-sm flex-1">{item.label}</span>
                    <span className="text-white text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
              <div className="w-24 h-24 rounded-full relative">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {holderDistribution.reduce((acc, item, index) => {
                    const startAngle = acc;
                    const endAngle = acc + (item.value / 100) * 360;
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                    const largeArc = item.value > 50 ? 1 : 0;
                    acc += (item.value / 100) * 360;
                    return acc;
                  }, 0)}
                  {holderDistribution.map((item, index) => {
                    const startAngle = holderDistribution.slice(0, index).reduce((sum, i) => sum + (i.value / 100) * 360, 0);
                    const endAngle = startAngle + (item.value / 100) * 360;
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                    const largeArc = item.value > 50 ? 1 : 0;
                    return (
                      <path
                        key={index}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="25" fill="#0D0D0D" />
                </svg>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-[#FF2D2D]" />
              <h3 className="text-white font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {recentTransactions.slice(0, 8).map((tx, index) => (
                <div key={index} className="flex items-center justify-between bg-[#050505]/50 rounded-lg p-3 border border-[#1a1a1a]">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${tx.type === 'Buy' ? 'bg-green-500/20' : tx.type === 'Sell' ? 'bg-[#FF2D2D]/20' : 'bg-blue-500/20'}`}>
                      {tx.type === 'Buy' ? <ArrowUpRight className="h-3.5 w-3.5 text-green-400" /> :
                       tx.type === 'Sell' ? <ArrowDownRight className="h-3.5 w-3.5 text-[#FF2D2D]" /> :
                       <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{tx.type}</p>
                      <p className="text-[#BDDBDB] text-xs font-mono truncate max-w-[100px]">
                        {tx.from === tx.to ? 'Self transfer' : `${tx.from.slice(0, 6)}...${tx.from.slice(-6)} → ${tx.to.slice(0, 6)}...${tx.to.slice(-6)}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">{tx.amount.toLocaleString()}</p>
                    <p className="text-[#BDDBDB] text-xs opacity-50">{tx.time}</p>
                  </div>
                </div>
              ))}
              {recentTransactions.length === 0 && (
                <p className="text-[#BDDBDB] text-sm text-center py-4">No recent transactions found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`https://solscan.io/token/${mintAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] transition text-sm"
          >
            View on Solscan →
          </a>
          <a
            href={`https://dexscreener.com/solana/${mintAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] transition text-sm"
          >
            View on DexScreener →
          </a>
          <Link
            href={`/tokens/${mintAddress}`}
            className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] transition text-sm"
          >
            View Token Details →
          </Link>
        </div>

        {/* Token Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/add-liquidity?mint=${mintAddress}`}
            className="px-4 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl text-sm font-medium transition"
          >
            Add Liquidity
          </Link>
          <Link
            href={`/airdrop?mint=${mintAddress}`}
            className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] text-sm transition"
          >
            Airdrop Tokens
          </Link>
          <Link
            href={`/revoke?mint=${mintAddress}`}
            className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] text-sm transition"
          >
            Revoke Authority
          </Link>
          <Link
            href={`/burn-lp?mint=${mintAddress}`}
            className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] text-sm transition"
          >
            Burn LP
          </Link>
        </div>

        <div className="mt-12 text-center text-[#BDDBDB] text-xs opacity-50">
          Data updates every 30 seconds. Powered by Jupiter, Helius, and Raydium.
        </div>
      </div>
    </div>
  );
}
