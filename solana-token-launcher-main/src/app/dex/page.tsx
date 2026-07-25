// src/app/dex/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, TrendingDown, ExternalLink, Sparkles, Flame } from "lucide-react";
import Link from "next/link";
import type { DexToken } from "@/lib/dex/types";

export default function DexPage() {
  const [tokens, setTokens] = useState<DexToken[]>([]);
  const [trending, setTrending] = useState<DexToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalTxns, setTotalTxns] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch("/api/dex/trending");
        const data = await response.json();
        if (data.success) {
          setTrending(data.data);
          setTokens(data.data);
          // Calculate totals
          let vol = 0;
          let txns = 0;
          data.data.forEach((t: DexToken) => {
            vol += t.volume24h || 0;
            txns += t.txns24h || 0;
          });
          setTotalVolume(vol);
          setTotalTxns(txns);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const searchTokens = async () => {
    if (!query.trim()) {
      setTokens(trending);
      return;
    }
    setSearching(true);
    try {
      const response = await fetch(`/api/dex/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        setTokens(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSearching(false);
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

  const formatNumberShort = (num: number) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-[#BDDBDB]">Loading DEX data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            📊 ZRP DEX Screener
          </h1>
          <p className="text-[#BDDBDB] text-sm mt-1">
            Real-time Solana token prices, liquidity, and volume
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="bg-[#0D0D0D] rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <div className="text-[#BDDBDB] text-xs">24h Volume</div>
            <div className="text-white font-bold">{formatNumber(totalVolume)}</div>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <div className="text-[#BDDBDB] text-xs">24h Txns</div>
            <div className="text-white font-bold">{formatNumberShort(totalTxns)}</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
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
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-2 mb-6 text-sm text-[#BDDBDB]">
        <Flame className="h-4 w-4 text-[#FF2D2D]" />
        <span>Live data from DexScreener</span>
        <span className="w-px h-4 bg-[#1a1a1a]" />
        <span>{tokens.length} tokens</span>
        {query && (
          <>
            <span className="w-px h-4 bg-[#1a1a1a]" />
            <span className="text-[#FF2D2D]">Results for "{query}"</span>
          </>
        )}
      </div>

      {/* Token Table */}
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
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">Price</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">24h Change</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">Market Cap</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">Volume</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">Liquidity</th>
                  <th className="px-4 py-3 text-right text-[#BDDBDB] text-xs font-medium uppercase">DEX</th>
                </tr>
              </thead>
              <tbody>
                {tokens.slice(0, 50).map((token, index) => (
                  <tr key={token.pairAddress} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition">
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
                    <td className="px-4 py-3 text-right">
                      <a
                        href={token.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#BDDBDB] hover:text-[#FF2D2D] transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-[#BDDBDB] py-12">
          <p>No tokens found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
