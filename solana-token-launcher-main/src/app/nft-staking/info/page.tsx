'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Coins, Clock, TrendingUp, Zap, Users, Lock } from 'lucide-react';

export default function NFTStakingInfoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block bg-[#FF2D2D]/10 rounded-full px-4 py-1.5 text-sm text-[#FF2D2D] font-medium mb-4">
          🧩 Earn with Your NFTs
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Stake NFTs, <span className="text-[#FF2D2D]">Earn Rewards</span>
        </h1>
        <p className="text-xl text-[#BDDBDB] max-w-2xl mx-auto">
          Lock your NFTs in staking pools to earn passive income – all on Solana.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/nft-staking"
            className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-8 py-3 rounded-xl font-semibold transition flex items-center gap-2"
          >
            View Pools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coins className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Earn Rewards</h3>
          <p className="text-[#BDDBDB] text-sm">Stake your NFTs to earn rewards (e.g., ZRP tokens) with competitive APY.</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Flexible Lock</h3>
          <p className="text-[#BDDBDB] text-sm">Choose pools with different lock periods – short or long term.</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Secure & Transparent</h3>
          <p className="text-[#BDDBDB] text-sm">All staking transactions are on‑chain – fully auditable.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Select a Pool', desc: 'Browse available NFT staking pools and choose one.' },
            { step: 2, title: 'Stake Your NFT', desc: 'Connect your wallet, select an NFT from the collection, and stake.' },
            { step: 3, title: 'Earn Rewards', desc: 'Rewards accumulate based on APY and time staked.' },
            { step: 4, title: 'Claim or Unstake', desc: 'Claim rewards anytime or unstake after the lock period ends.' },
          ].map((s) => (
            <div key={s.step} className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-[#FF2D2D] mb-2">{s.step}</div>
              <h4 className="text-white font-semibold">{s.title}</h4>
              <p className="text-[#BDDBDB] text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Benefits */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Why Stake Your NFTs?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Passive Income</h4>
              <p className="text-[#BDDBDB] text-sm">Your NFTs work for you – earn rewards without selling.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Community Participation</h4>
              <p className="text-[#BDDBDB] text-sm">Support the ecosystem and be part of the staking community.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Instant Claim</h4>
              <p className="text-[#BDDBDB] text-sm">Claim rewards at any time – no waiting for the lock period to end.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Lock Options</h4>
              <p className="text-[#BDDBDB] text-sm">Choose pools with lock periods that suit your investment strategy.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-[#FF2D2D]/10 via-[#FF2D2D]/5 to-[#FF2D2D]/10 rounded-2xl p-12 border border-[#FF2D2D]/20">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Stake Your NFTs?</h2>
        <p className="text-[#BDDBDB] max-w-md mx-auto mb-6">
          Join the staking pools and start earning rewards today.
        </p>
        <Link
          href="/nft-staking"
          className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-8 py-3 rounded-xl font-semibold transition inline-flex items-center gap-2"
        >
          View Pools <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
