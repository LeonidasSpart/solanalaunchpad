// src/app/token-check/page.tsx
"use client";

import { useState } from "react";
import type { TokenCheckResult } from "@/types/token-check";

export default function TokenCheckPage() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<TokenCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkToken = async () => {
    if (!address || address.length < 32) {
      setError("Please enter a valid Solana token address");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/token-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to check token");
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check token");
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "safe": return "text-green-500 border-green-500/30 bg-green-500/10";
      case "medium": return "text-yellow-500 border-yellow-500/30 bg-yellow-500/10";
      case "high": return "text-orange-500 border-orange-500/30 bg-orange-500/10";
      case "critical": return "text-red-500 border-red-500/30 bg-red-500/10";
      default: return "text-gray-500 border-gray-500/30 bg-gray-500/10";
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case "safe": return "✅ Safe";
      case "medium": return "⚠️ Medium Risk";
      case "high": return "🔴 High Risk";
      case "critical": return "🚨 Critical Risk";
      default: return "Unknown";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🛡️ ZRP Token Checker
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Enter a Solana token address to analyze its risk level.
          <br />
          <span className="text-sm opacity-60">
            Free. Fast. On-chain. Transparent.
          </span>
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter token mint address..."
            className="flex-1 p-3 bg-[#050505] border border-[#1a1a1a] rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#FF2D2D] focus:border-transparent transition"
            disabled={loading}
          />
          <button
            onClick={checkToken}
            disabled={loading}
            className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Checking..." : "Check Token"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="mt-8 bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-[#1a1a1a]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {result.name} ({result.symbol})
                </h2>
                <p className="text-[#BDDBDB] text-sm font-mono break-all">
                  {result.address}
                </p>
              </div>
              <div className="text-right">
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border ${getRiskColor(result.riskLevel)}`}>
                  {getRiskLabel(result.riskLevel)}
                </div>
                <div className="text-[#BDDBDB] text-xs mt-1">
                  Score: {result.riskScore}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-[#1a1a1a]">
            <div className="text-center">
              <div className="text-[#BDDBDB] text-xs">Supply</div>
              <div className="text-white font-semibold">{result.supply.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-[#BDDBDB] text-xs">Decimals</div>
              <div className="text-white font-semibold">{result.decimals}</div>
            </div>
            <div className="text-center">
              <div className="text-[#BDDBDB] text-xs">Holders</div>
              <div className="text-white font-semibold">{result.topHolders.length}</div>
            </div>
            <div className="text-center">
              <div className="text-[#BDDBDB] text-xs">Top 10 Concentration</div>
              <div className={`font-semibold ${
                result.holderDistribution > 70 ? "text-red-500" : "text-green-500"
              }`}>
                {result.holderDistribution.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Authorities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-b border-[#1a1a1a]">
            <div className="bg-[#050505] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-[#BDDBDB] text-sm">Mint Authority</span>
                <span className={result.mintAuthorityRevoked ? "text-green-500" : "text-red-500"}>
                  {result.mintAuthorityRevoked ? "✅ Revoked" : "❌ Active"}
                </span>
              </div>
              {result.mintAuthority && (
                <p className="text-[#BDDBDB] text-xs font-mono mt-1 truncate">
                  {result.mintAuthority}
                </p>
              )}
            </div>
            <div className="bg-[#050505] rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-[#BDDBDB] text-sm">Freeze Authority</span>
                <span className={result.freezeAuthorityRevoked ? "text-green-500" : "text-red-500"}>
                  {result.freezeAuthorityRevoked ? "✅ Revoked" : "❌ Active"}
                </span>
              </div>
              {result.freezeAuthority && (
                <p className="text-[#BDDBDB] text-xs font-mono mt-1 truncate">
                  {result.freezeAuthority}
                </p>
              )}
            </div>
          </div>

          {/* Risks */}
          {result.risks.length > 0 && (
            <div className="p-6">
              <h3 className="text-white font-semibold mb-4">⚠️ Detected Risks</h3>
              <div className="space-y-3">
                {result.risks.map((risk, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      risk.level === "critical" ? "bg-red-900/20 border-red-500/30" :
                      risk.level === "danger" ? "bg-orange-900/20 border-orange-500/30" :
                      risk.level === "warning" ? "bg-yellow-900/20 border-yellow-500/30" :
                      "bg-blue-900/20 border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-white font-medium text-sm">{risk.title}</div>
                        <div className="text-[#BDDBDB] text-sm opacity-70">{risk.description}</div>
                      </div>
                      <div className="text-[#BDDBDB] text-xs whitespace-nowrap">
                        Score: {risk.score}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
