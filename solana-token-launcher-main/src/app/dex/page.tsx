// src/app/dex/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { DexToken } from "@/lib/dex/types";

export default function DexPage() {
  const [query, setQuery] = useState("");
  const [tokens, setTokens] = useState<DexToken[]>([]);
  const [trending, setTrending] = useState<DexToken[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch trending tokens on load
    const fetchTrending = async () => {
      const response = await fetch("/api/dex/trending");
      const data = await response.json();
      if (data.success) {
        setTrending(data.data);
      }
    };
    fetchTrending();
  }, []);

  const searchTokens = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/dex?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        setTokens(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price < 0.000001) return price.toExponential(6);
    if (price < 0.0001) return price.toFixed(8);
    if (price < 0.01) return price.toFixed(6);
    return price.toFixed(4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🚀 ZRP DEX Screener
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Track Solana token prices, liquidity, and volume in real-time.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchTokens()}
            placeholder="Search token by name or address..."
            className="flex-1 p-3 bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#FF2D2D] focus:border-transparent transition"
          />
          <button
            onClick={searchTokens}
            disabled={loading}
            className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition disabled:opacity-50 flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      {tokens.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] overflow-hidden mb-12"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-[#BDDBDB] text-xs font-medium uppercase tracking-wider">Token</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase tracking-wider">24h Change</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase tracking-wider">Volume</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase tracking-wider">Liquidity</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase tracking-wider">Market Cap</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token) => (
                  <tr key={token.address} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {token.image ? (
                          <img src={token.image} alt={token.symbol} className="w-8 h-8 rounded-full" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#FF2D2D]/20 flex items-center justify-center text-[#FF2D2D] font-bold text-xs">
                            {token.symbol.slice(0, 2)}
                          </div>
                        )}
                        <div>
                          <div className="text-white font-medium">{token.name}</div>
                          <div className="text-[#BDDBDB] text-xs font-mono">${token.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-white font-mono">
                      {formatPrice(token.price)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                        {token.priceChange24h >= 0 ? "+" : ""}{token.priceChange24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#BDDBDB]">
                      {formatNumber(token.volume24h)}
                    </td>
                    <td className="px-4 py-3 text-right text-[#BDDBDB]">
                      {formatNumber(token.liquidity)}
                    </td>
                    <td className="px-4 py-3 text-right text-[#BDDBDB]">
                      {formatNumber(token.marketCap)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dex/${token.address}`}
                        className="text-[#FF2D2D] hover:text-white transition flex items-center justify-end gap-1"
                      >
                        View <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Trending Section */}
      {trending.length > 0 && !tokens.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-[#FF2D2D]" />
            <h2 className="text-xl font-bold text-white">🔥 Trending Tokens</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.slice(0, 6).map((token) => (
              <div
                key={token.address}
                className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] p-4 hover:border-[#FF2D2D]/30 transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  {token.image ? (
                    <img src={token.image} alt={token.symbol} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#FF2D2D]/20 flex items-center justify-center text-[#FF2D2D] font-bold text-sm">
                      {token.symbol.slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <div className="text-white font-medium text-sm">{token.name}</div>
                    <div className="text-[#BDDBDB] text-xs font-mono">${token.symbol}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-mono">{formatPrice(token.price)}</span>
                  <span className={token.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                    {token.priceChange24h >= 0 ? "↑" : "↓"} {Math.abs(token.priceChange24h).toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-[#BDDBDB]">
                  <span>Vol: {formatNumber(token.volume24h)}</span>
                  <span>MCap: {formatNumber(token.marketCap)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
