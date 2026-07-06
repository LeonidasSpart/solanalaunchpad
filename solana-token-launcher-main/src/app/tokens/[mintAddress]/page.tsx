'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Coins,
  Users,
  Wallet,
  ArrowLeft,
  ExternalLink,
  Loader2,
  Copy,
  Check,
  Globe,
  Shield,
  ShieldCheck,
  BarChart3, // ✅ Added for analytics icon
} from 'lucide-react';

interface TokenData {
  id: number;
  mint_address: string;
  name: string;
  symbol: string;
  description: string;
  image_url: string;
  network: string;
  creator_wallet: string;
  supply: number;
  decimals: number;
  revoke_mint: boolean;
  revoke_freeze: boolean;
  revoke_update: boolean;
  created_at: string;
}

export default function TokenDetailPage() {
  const params = useParams();
  const mintAddress = params.mintAddress as string;

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<TokenData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (!mintAddress) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/tokens/${mintAddress}`);

        if (!response.ok) {
          throw new Error('Token not found');
        }

        const data = await response.json();
        setToken(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load token');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [mintAddress]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mintAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Loader2 className="h-8 w-8 text-[#FF2D2D] animate-spin mx-auto mb-4" />
        <p className="text-[#BDDBDB]">Loading token details...</p>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Token Not Found</h2>
        <p className="text-[#BDDBDB] mb-6">{error || 'This token could not be found'}</p>
        <Link
          href="/tokens"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tokens
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Link & Header Actions */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <Link
          href="/tokens"
          className="text-[#BDDBDB] hover:text-white transition p-2 rounded-lg hover:bg-[#1a1a1a]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-white">{token.name}</h1>
          <div className="flex items-center gap-3 text-[#BDDBDB] text-sm flex-wrap">
            <span className="font-semibold text-[#FF2D2D]">${token.symbol}</span>
            <span>•</span>
            <span className="font-mono text-xs">{token.mint_address.slice(0, 8)}...{token.mint_address.slice(-8)}</span>
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-[#1a1a1a] rounded transition"
              title="Copy mint address"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5 text-[#BDDBDB]" />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/analytics/${mintAddress}`}
            className="px-3 py-1.5 bg-[#FF2D2D]/10 hover:bg-[#FF2D2D]/20 text-[#FF2D2D] rounded-xl transition border border-[#FF2D2D]/30 text-xs flex items-center gap-1.5 font-medium"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            Analytics
          </Link>
          <a
            href={`https://solscan.io/address/${token.mint_address}?cluster=${token.network === 'mainnet' ? '' : 'devnet'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] rounded-xl transition border border-[#1a1a1a] text-xs flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            Solscan
          </a>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
            token.network === 'mainnet'
              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
          }`}>
            {token.network === 'mainnet' ? '⚡ Mainnet' : '🧪 Devnet'}
          </span>
        </div>
      </div>

      {/* Token Image & Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {token.image_url && (
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a] flex items-center justify-center">
            <img
              src={token.image_url.startsWith('http') ? token.image_url : `https://${token.image_url}`}
              alt={token.name}
              className="w-32 h-32 rounded-xl object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg?height=128&width=128';
              }}
            />
          </div>
        )}

        <div className={`${token.image_url ? 'md:col-span-2' : 'md:col-span-3'} bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]`}>
          <h3 className="text-white font-semibold mb-4">Token Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#BDDBDB]">Name</span>
              <span className="text-white">{token.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#BDDBDB]">Symbol</span>
              <span className="text-white">${token.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#BDDBDB]">Mint Address</span>
              <span className="text-white font-mono text-xs break-all max-w-[200px] text-right">{token.mint_address}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#BDDBDB]">Total Supply</span>
              <span className="text-white">{Number(token.supply).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#BDDBDB]">Decimals</span>
              <span className="text-white">{token.decimals}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#BDDBDB]">Network</span>
              <span className="text-white">{token.network}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#BDDBDB]">Creator</span>
              <span className="text-white font-mono text-xs break-all max-w-[200px] text-right">{token.creator_wallet}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#BDDBDB]">Created</span>
              <span className="text-white">{new Date(token.created_at).toLocaleDateString()}</span>
            </div>
            {token.description && (
              <div className="flex justify-between text-sm border-t border-[#1a1a1a] pt-3">
                <span className="text-[#BDDBDB]">Description</span>
                <span className="text-white max-w-[200px] text-right">{token.description}</span>
              </div>
            )}
          </div>

          {/* Security Status */}
          <div className="mt-6 border-t border-[#1a1a1a] pt-4">
            <h4 className="text-sm font-semibold text-[#BDDBDB] mb-3">Security Status</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className={`p-2 rounded-lg text-center text-xs ${token.revoke_mint ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                {token.revoke_mint ? (
                  <><ShieldCheck className="h-3 w-3 inline mr-1" /> Mint Revoked</>
                ) : (
                  <><Shield className="h-3 w-3 inline mr-1" /> Mint Active</>
                )}
              </div>
              <div className={`p-2 rounded-lg text-center text-xs ${token.revoke_freeze ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                {token.revoke_freeze ? (
                  <><ShieldCheck className="h-3 w-3 inline mr-1" /> Freeze Revoked</>
                ) : (
                  <><Shield className="h-3 w-3 inline mr-1" /> Freeze Active</>
                )}
              </div>
              <div className={`p-2 rounded-lg text-center text-xs ${token.revoke_update ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                {token.revoke_update ? (
                  <><ShieldCheck className="h-3 w-3 inline mr-1" /> Update Revoked</>
                ) : (
                  <><Shield className="h-3 w-3 inline mr-1" /> Update Active</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/analytics/${mintAddress}`}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl text-sm font-medium transition"
        >
          <BarChart3 className="h-4 w-4" />
          View Analytics
        </Link>
        <Link
          href={`/add-liquidity?mint=${mintAddress}`}
          className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] text-sm transition"
        >
          Add Liquidity
        </Link>
        <Link
          href={`/airdrop?mint=${mintAddress}`}
          className="px-4 py-2 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] text-sm transition"
        >
          Airdrop
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

      <div className="mt-8 text-center">
        <Link
          href="/tokens"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-xl transition border border-[#1a1a1a]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tokens
        </Link>
      </div>
    </div>
  );
}
