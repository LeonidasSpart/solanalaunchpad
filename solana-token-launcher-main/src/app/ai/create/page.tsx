// src/app/ai/create/page.tsx
"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";

interface TokenConfig {
  name: string;
  symbol: string;
  supply: number;
  decimals: number;
  description: string;
  logoPrompt: string;
  imageUrl?: string; // ✅ Added for DALL‑E generated logo
  website?: string;
  twitter?: string;
  telegram?: string;
}

export default function AICreatePage() {
  const { connected, publicKey } = useWallet();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<TokenConfig | null>(null);
  const [step, setStep] = useState<"input" | "review" | "minting">("input");

  const generateToken = async () => {
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (prompt.length < 3) {
      toast.error("Please describe your token idea in detail");
      return;
    }

    setLoading(true);
    setStep("input");

    try {
      const response = await fetch("/api/ai/generate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate token");
      }

      setConfig(data.config);
      setStep("review");
      toast.success("Token configuration generated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate token");
      setStep("input");
    } finally {
      setLoading(false);
    }
  };

  const mintToken = async () => {
    if (!config) return;

    setStep("minting");
    setLoading(true);

    try {
      // Call existing ZRP token creation API
      const response = await fetch("/api/token/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: config.name,
          symbol: config.symbol,
          supply: config.supply,
          decimals: config.decimals,
          description: config.description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to mint token");
      }

      toast.success(`Token ${config.symbol} minted successfully!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to mint token");
      setStep("review");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setConfig(null);
    setPrompt("");
    setStep("input");
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">🤖 AI Token Generator</h1>
      <p className="text-gray-400 mb-8">
        Describe your token idea, and AI will generate everything – name, symbol, supply, and more.
      </p>

      {step === "input" && (
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your token idea... e.g., 'Create a meme coin about a space cat with a 5% burn and reflections to holders'"
            className="w-full h-32 p-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            disabled={loading}
          />
          <button
            onClick={generateToken}
            disabled={loading || !connected}
            className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition"
          >
            {loading ? "Generating..." : "Generate Token with AI"}
          </button>
          {!connected && (
            <p className="text-center text-yellow-500 text-sm">Connect your wallet to start</p>
          )}
        </div>
      )}

      {step === "review" && config && (
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">📋 Review Configuration</h2>

            {/* ✅ Display generated logo if available */}
            {config.imageUrl && (
              <div className="mt-4">
                <label className="text-sm text-gray-400">Generated Logo</label>
                <div className="mt-2 border border-gray-700 rounded-lg overflow-hidden bg-gray-800 p-4">
                  <img
                    src={config.imageUrl}
                    alt="Token Logo"
                    className="w-full max-w-xs h-auto mx-auto rounded-lg"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Token Name</label>
                <input
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Symbol</label>
                <input
                  value={config.symbol}
                  onChange={(e) => setConfig({ ...config, symbol: e.target.value.toUpperCase() })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white uppercase"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Supply</label>
                <input
                  type="number"
                  value={config.supply}
                  onChange={(e) => setConfig({ ...config, supply: Number(e.target.value) })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Decimals</label>
                <input
                  type="number"
                  value={config.decimals}
                  onChange={(e) => setConfig({ ...config, decimals: Number(e.target.value) })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">Description</label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Logo Prompt (for image generation)</label>
              <input
                value={config.logoPrompt}
                onChange={(e) => setConfig({ ...config, logoPrompt: e.target.value })}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-400">Website</label>
                <input
                  value={config.website || ""}
                  onChange={(e) => setConfig({ ...config, website: e.target.value })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Twitter</label>
                <input
                  value={config.twitter || ""}
                  onChange={(e) => setConfig({ ...config, twitter: e.target.value })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  placeholder="@handle"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400">Telegram</label>
                <input
                  value={config.telegram || ""}
                  onChange={(e) => setConfig({ ...config, telegram: e.target.value })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  placeholder="t.me/..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={mintToken}
              disabled={loading}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition"
            >
              {loading ? "Minting..." : "✅ Confirm & Mint Token"}
            </button>
            <button
              onClick={reset}
              disabled={loading}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-semibold transition"
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      {step === "minting" && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-red-500 border-solid mx-auto mb-4"></div>
          <p className="text-xl">Minting your token...</p>
          <p className="text-gray-400">Please confirm the transaction in your wallet</p>
        </div>
      )}
    </div>
  );
}
