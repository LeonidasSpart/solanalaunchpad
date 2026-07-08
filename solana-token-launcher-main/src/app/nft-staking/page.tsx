'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Coins, Clock } from 'lucide-react';

interface Pool {
  id: number;
  collection_mint: string;
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

export default function NFTStakingPage() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/nft-staking/pools')
      .then(res => res.json())
      .then(data => { setPools(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12 text-[#BDDBDB]">Loading pools...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">🧩 NFT Staking</h1>
      {pools.length === 0 ? (
        <p className="text-[#BDDBDB]">No active staking pools.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pools.map((pool) => (
            <Link key={pool.id} href={`/nft-staking/${pool.collection_mint}`} className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h2 className="text-xl font-bold text-white">{pool.token_name || 'NFT Collection'}</h2>
              <p className="text-[#BDDBDB] text-sm">{pool.token_symbol}</p>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="text-[#FF2D2D] font-bold">{pool.apy}% APY</span>
                {pool.lock_duration > 0 && (
                  <span className="text-[#BDDBDB] opacity-50 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {pool.lock_duration / 86400}d lock
                  </span>
                )}
              </div>
              <div className="mt-2 text-[#BDDBDB] text-sm">
                Staked: {pool.total_staked} NFTs
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
