'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { ExternalLink, Lock, Unlock, Loader2, Coins } from 'lucide-react';

interface LPPool {
  id: number;
  token_mint: string;
  pool_address: string;
  lp_mint: string;
  sol_amount: string;
  token_amount: string;
  lock_start: string;
  lock_end: string;
  locked: boolean;
  created_at: string;
}

export default function LiquidityDashboard() {
  const { publicKey, connected } = useWallet();
  const [pools, setPools] = useState<LPPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) {
      setLoading(false);
      return;
    }
    const fetchPools = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/lp/pools?wallet=${publicKey.toBase58()}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPools(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPools();
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a]">
          <Coins className="h-16 w-16 text-[#FF2D2D] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to view your liquidity positions.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="h-8 w-8 text-[#FF2D2D] animate-spin mx-auto" />
        <p className="text-[#BDDBDB] mt-4">Loading your liquidity positions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">💧 My Liquidity</h1>
      <p className="text-[#BDDBDB] mb-8">Your liquidity positions across all pools.</p>

      {error && (
        <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4 text-[#FF2D2D] text-sm">
          {error}
        </div>
      )}

      {pools.length === 0 ? (
        <div className="bg-[#0D0D0D] rounded-xl p-12 border border-[#1a1a1a] text-center">
          <p className="text-[#BDDBDB] text-lg">You haven't created any liquidity pools yet.</p>
          <Link href="/add-liquidity" className="text-[#FF2D2D] hover:text-[#B10000] mt-4 inline-block transition">
            Create your first pool →
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {pools.map((pool) => {
            const isLocked = pool.locked && pool.lock_end && new Date(pool.lock_end) > new Date();
            return (
              <div key={pool.id} className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-white font-medium">
                      <span className="text-[#BDDBDB]">Token:</span> {pool.token_mint.slice(0, 8)}...
                    </p>
                    <p className="text-[#BDDBDB] text-sm">
                      SOL: <span className="text-white">{pool.sol_amount}</span> &nbsp;|&nbsp; Token: <span className="text-white">{pool.token_amount}</span>
                    </p>
                    <p className="text-[#BDDBDB] text-sm">
                      LP Mint: <span className="text-white font-mono">{pool.lp_mint.slice(0, 8)}...</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      {isLocked ? (
                        <Lock className="h-4 w-4 text-[#FF2D2D]" />
                      ) : pool.locked ? (
                        <Unlock className="h-4 w-4 text-green-400" />
                      ) : (
                        <span className="text-[#BDDBDB] text-xs">No lock</span>
                      )}
                      <span className="text-xs font-medium text-[#BDDBDB]">
                        {isLocked
                          ? `Locked until ${new Date(pool.lock_end!).toLocaleDateString()}`
                          : pool.locked
                          ? 'Unlocked'
                          : 'Not locked'}
                      </span>
                    </div>
                    <a
                      href={`https://solscan.io/address/${pool.pool_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF2D2D] hover:text-[#B10000] text-sm inline-flex items-center gap-1 transition"
                    >
                      View Pool <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="text-[#BDDBDB] text-xs">
                      Created: {new Date(pool.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
