// src/app/messenger/login/page.tsx
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import bs58 from "bs58";
import { useState } from "react";

// Set this in your frontend's env vars once the chat service is deployed on Railway,
// e.g. NEXT_PUBLIC_CHAT_API_URL=https://zrp-chat-service-production.up.railway.app
const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || "";

export default function MessengerLogin() {
  const { publicKey, signMessage } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    if (!publicKey || !signMessage) {
      setError("Please connect your wallet first.");
      return;
    }

    if (!CHAT_API_URL) {
      setError("Chat service is not configured yet (missing NEXT_PUBLIC_CHAT_API_URL).");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const message = `Login to ZRP Messenger at ${Date.now()}`;
      const signature = await signMessage(new TextEncoder().encode(message));

      const response = await fetch(`${CHAT_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicKey: publicKey.toBase58(),
          signature: bs58.encode(signature),
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Login failed.");
      }

      localStorage.setItem("zrp_chat_token", data.accessToken);
      localStorage.setItem("zrp_chat_user", JSON.stringify(data.user));

      router.push("/messenger");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-white mb-4">🔐 Sign In</h1>
      <p className="text-[#BDDBDB] mb-8">
        Connect your wallet to access ZRP Messenger.
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={login}
        disabled={loading}
        className="w-full py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Signing..." : "🔐 Sign in with Wallet"}
      </button>

      {!publicKey && (
        <p className="mt-4 text-yellow-500 text-sm">
          Please connect your wallet first.
        </p>
      )}
    </div>
  );
}
