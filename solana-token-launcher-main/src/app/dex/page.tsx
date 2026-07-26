"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Flame, ExternalLink, RefreshCw, AlertCircle } from "lucide-react";

interface DexToken {
  address: string;
  name: string;
  symbol: string;
  chain: string;
  dex: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  marketCap: number;
  fdv: number;
  holders: number;
  image?: string | null;
  url?: string;
  pairAddress?: string;
}

export default function DexPage() {
  const router = useRouter();
  const [tokens, setTokens] = useState<DexToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [totalVolume, setTotalVolume] = useState(0);

  const fetchTrending = async () => {
    setLoading(true);
    setError(null);
    try {
      // ✅ Use your server-side API route (no CORS issues)
      const response = await fetch("/api/dex/trending");
      if (!response.ok) throw new Error("API failed");
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setTokens(data.data);
        const vol = data.data.reduce((sum: number, t: DexToken) => sum + (t.volume24h || 0), 0);
        setTotalVolume(vol);
      } else {
        throw new Error("No data returned");
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load data. Please try again.");
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  const searchTokens = async () => {
    if (!query.trim()) {
      fetchTrending();
      return;
    }
    setSearching(true);
    setError(null);
    try {
      const response = await fetch(`/api/dex/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        setTokens(data.data);
        const vol = data.data.reduce((sum: number, t: DexToken) => sum + (t.volume24h || 0), 0);
        setTotalVolume(vol);
      }
    } catch (err: any) {
      setError(err.message || "Search failed");
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  const formatNumber = (num: number) => {
    if (!num) return "$0.00";
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (!price) return "$0.00";
    if (price < 0.000001) return price.toExponential(6);
    if (price < 0.0001) return price.toFixed(8);
    if (price < 0.01) return price.toFixed(6);
    return price.toFixed(4);
  };

  const formatNumberShort = (num: number) => {
    if (!num) return "0";
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const getChainColor = (chain: string) => {
    const colors: Record<string, string> = {
      solana: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      ethereum: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      bsc: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      polygon: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      arbitrum: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      avalanche: "bg-red-500/20 text-red-400 border-red-500/30",
      base: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    };
    return colors[chain.toLowerCase()] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const goToCoin = (token: DexToken) => {
    const address = token.pairAddress || token.address;
    if (!token.chain || !address) return;
    router.push(`/dex/${token.chain}/${address}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse text-[#BDDBDB]">Loading DEX data...</div>
      </div>
    );
  }

  if (error && tokens.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 max-w-lg mx-auto">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-400 font-medium">{error}</p>
          <button
            onClick={fetchTrending}
            className="mt-4 px-6 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            📊 ZRP DEX Screener
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">LIVE</span>
          </h1>
          <p className="text-[#BDDBDB] text-sm mt-1">
            Multi-chain data from Dexscreener & GeckoTerminal
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="bg-[#0D0D0D] rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <div className="text-[#BDDBDB] text-xs">24h Volume</div>
            <div className="text-white font-bold">{formatNumber(totalVolume)}</div>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <div className="text-[#BDDBDB] text-xs">Tokens</div>
            <div className="text-white font-bold">{tokens.length}</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && searchTokens()}
          placeholder="Search by name, symbol, or address..."
          className="flex-1 p-3 bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#FF2D2D] focus:border-transparent"
        />
        <button
          onClick={searchTokens}
          disabled={searching}
          className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition disabled:opacity-50 flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
        <button
          onClick={fetchTrending}
          className="px-4 py-3 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] transition"
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 mb-6 text-sm text-[#BDDBDB]">
        <Flame className="h-4 w-4 text-[#FF2D2D]" />
        <span>Live data</span>
        <span className="w-px h-4 bg-[#1a1a1a]" />
        <span>{tokens.length} tokens</span>
        {query && (
          <>
            <span className="w-px h-4 bg-[#1a1a1a]" />
            <span className="text-[#FF2D2D]">Results for "{query}"</span>
          </>
        )}
      </div>

      {/* Table */}
      {tokens.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-[#BDDBDB] text-xs font-medium uppercase">#</th>
                  <th className="px-4 py-3 text-left text-[#BDDBDB] text-xs font-medium uppercase">Token</th>
                  <th className="px-4 py-3 text-left text-[#BDDBDB] text-xs font-medium uppercase">Chain</th>
                  <th className="px-4 py-3 text-left text-[#BDDBDB] text-xs font-medium uppercase">DEX</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">Price</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">24h</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">Market Cap</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">Volume</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">Liquidity</th>
                </tr>
              </thead>
              <tbody>
                {tokens.slice(0, 100).map((token, index) => (
                  <tr
                    key={token.pairAddress || token.address}
                    onClick={() => goToCoin(token)}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") goToCoin(token);
                    }}
                    className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition cursor-pointer"
                  >
                    <td className="px-4 py-3 text-[#BDDBDB] text-sm">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {token.image ? (
                          <img src={token.image} alt={token.symbol} className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#FF2D2D]/20 flex items-center justify-center text-[#FF2D2D] font-bold text-xs">
                            {token.symbol.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="text-white font-medium text-sm">{token.name}</div>
                          <div className="text-[#BDDBDB] text-xs font-mono">${token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${getChainColor(token.chain)}`}>
                        {token.chain || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#BDDBDB] text-sm">
                      {token.dex || 'Unknown'}
                    </td>
                    <td className="px-4 py-3 text-right text-white font-mono text-sm">
                      ${formatPrice(token.price)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                        {token.priceChange24h >= 0 ? "+" : ""}{token.priceChange24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#BDDBDB] text-sm">
                      {formatNumber(token.marketCap)}
                    </td>
                    <td className="px-4 py-3 text-right text-[#BDDBDB] text-sm">
                      {formatNumber(token.volume24h)}
                    </td>
                    <td className="px-4 py-3 text-right text-[#BDDBDB] text-sm">
                      {formatNumber(token.liquidity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-[#BDDBDB] py-12">
          <p>No tokens found. Try refreshing or searching.</p>
        </div>
      )}
    </div>
  );
}
