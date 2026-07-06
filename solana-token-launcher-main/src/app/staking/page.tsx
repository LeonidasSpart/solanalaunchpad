'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Gift, ArrowRight, Lock, Unlock, Plus, Clock, DollarSign } from 'lucide-react';

interface StakingPool {
  id: number;
  token_mint: string;
  token_symbol: string;
  token_name: string;
  apy: number;
  lock_duration: number;
  min_stake: number;
  max_stake: number;
  total_staked: number;
  total_rewards_paid: number;
  is_active: boolean;
}

interface StakingPosition {
  id: number;
  pool_id: number;
  user_wallet: string;
  amount: number;
  reward_earned: number;
  reward_claimed: number;
  staked_at: string;
  last_reward_calc: string;
  unlocked_at: string | null;
  status: string;
  token_symbol: string;
  token_name: string;
  apy: number;
  lock_duration: number;
}

export default function StakingPage() {
  const { publicKey, connected } = useWallet();
  const [pools, setPools] = useState<StakingPool[]>([]);
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch pools
      const poolsRes = await fetch('/api/staking/pools');
      if (!poolsRes.ok) throw new Error('Failed to fetch pools');
      const poolsData = await poolsRes.json();
      setPools(poolsData);

      // Fetch user positions
      if (connected && publicKey) {
        const posRes = await fetch(`/api/staking/positions?wallet=${publicKey.toBase58()}`);
        if (posRes.ok) {
          const posData = await posRes.json();
          setPositions(posData);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [connected, publicKey]);

  const totalStaked = positions.reduce((sum, p) => sum + p.amount, 0);
  const totalRewards = positions.reduce((sum, p) => sum + (p.reward_earned - p.reward_claimed), 0);

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a] text-center">
          <Lock className="h-16 w-16 text-[#FF2D2D] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to stake tokens and earn rewards.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5 text-[#FF2D2D]" />
          <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Staking</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Stake Tokens, Earn Rewards</h1>
        <p className="text-[#BDDBDB] mt-1">Lock your tokens and earn passive income.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
          <p className="text-[#BDDBDB] text-sm">Total Staked</p>
          <p className="text-2xl font-bold text-white">{totalStaked.toFixed(2)}</p>
        </div>
        <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
          <p className="text-[#BDDBDB] text-sm">Available Rewards</p>
          <p className="text-2xl font-bold text-[#FF2D2D]">{totalRewards.toFixed(4)}</p>
        </div>
        <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
          <p className="text-[#BDDBDB] text-sm">Active Positions</p>
          <p className="text-2xl font-bold text-white">{positions.length}</p>
        </div>
        <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
          <p className="text-[#BDDBDB] text-sm">Avg. APY</p>
          <p className="text-2xl font-bold text-white">
            {pools.length > 0 ? (pools.reduce((sum, p) => sum + p.apy, 0) / pools.length).toFixed(1) : 0}%
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-10 h-10 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto" />
          <p className="text-[#BDDBDB] mt-4">Loading staking pools...</p>
        </div>
      ) : error ? (
        <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
          <p className="text-[#FF2D2D]">{error}</p>
        </div>
      ) : pools.length === 0 ? (
        <div className="bg-[#0D0D0D] rounded-xl p-12 border border-[#1a1a1a] text-center">
          <Coins className="h-12 w-12 text-[#BDDBDB] opacity-30 mx-auto mb-4" />
          <p className="text-[#BDDBDB] text-lg">No staking pools available yet.</p>
          <p className="text-[#BDDBDB] text-sm mt-2">Check back soon for new staking opportunities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pools.map((pool) => {
            const userPosition = positions.find(p => p.pool_id === pool.id);
            const isStaked = userPosition && userPosition.amount > 0;

            return (
              <motion.div
                key={pool.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">{pool.token_name || pool.token_symbol}</h3>
                    <p className="text-[#BDDBDB] text-xs font-mono">{pool.token_mint.slice(0, 8)}...</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[#FF2D2D] font-bold text-lg">{pool.apy}% APY</span>
                      {pool.lock_duration > 0 && (
                        <span className="text-[#BDDBDB] text-xs opacity-50">🔒 {pool.lock_duration / 86400}d lock</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#BDDBDB] text-sm">Staked</p>
                    <p className="text-white font-medium">{pool.total_staked.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-[#BDDBDB]">
                  <span>Min: {pool.min_stake}</span>
                  <span>•</span>
                  <span>Max: {pool.max_stake}</span>
                </div>

                {isStaked && userPosition && (
                  <div className="mt-4 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#BDDBDB]">Your Stake</span>
                      <span className="text-white font-medium">{userPosition.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-[#BDDBDB]">Rewards</span>
                      <span className="text-[#FF2D2D] font-medium">
                        {(userPosition.reward_earned - userPosition.reward_claimed).toFixed(4)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  <Link
                    href={`/staking/${pool.token_mint}`}
                    className="flex-1 text-center px-4 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition text-sm font-medium"
                  >
                    {isStaked ? 'Manage Stake' : 'Stake Now'}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
