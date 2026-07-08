'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  Shield, 
  Coins, 
  Clock, 
  TrendingUp, 
  Zap, 
  Users, 
  Lock, 
  Wallet,
  Gamepad2,
  Palette,
  Globe,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function NFTStakingInfoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <div className="text-center mb-16">
        <div className="inline-block bg-[#FF2D2D]/10 rounded-full px-4 py-1.5 text-sm text-[#FF2D2D] font-medium mb-4">
          🧩 Earn with Your NFTs
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Stake NFTs, <span className="text-[#FF2D2D]">Earn Rewards</span>
        </h1>
        <p className="text-xl text-[#BDDBDB] max-w-2xl mx-auto">
          Lock your NFTs in staking pools and earn passive income – all on Solana. 
          No coding, no complexity, just rewards.
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

      {/* ─── What Is NFT Staking? ───────────────────────────────────── */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">What Is NFT Staking?</h2>
        <p className="text-[#BDDBDB] text-lg leading-relaxed">
          NFT staking is the process of locking up your NFTs on a blockchain‑based 
          platform to earn rewards – typically in cryptocurrency or additional NFTs.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#1a1a1a] rounded-xl p-4">
            <p className="text-[#BDDBDB] text-sm font-medium">Traditional Staking</p>
            <p className="text-white text-sm">Lock fungible tokens (like SOL or ETH) to earn rewards.</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#FF2D2D]/20">
            <p className="text-[#FF2D2D] text-sm font-medium">NFT Staking</p>
            <p className="text-white text-sm">Lock NFTs to earn rewards – adds utility to digital collectibles.</p>
          </div>
        </div>
      </div>

      {/* ─── Why Stake on ZRP? ──────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Why Stake on ZRP?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-[#FF2D2D]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High APY</h3>
            <p className="text-[#BDDBDB] text-sm">Competitive rates (e.g., 12.5% APY) on your staked NFTs.</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-[#FF2D2D]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Flexible Lock</h3>
            <p className="text-[#BDDBDB] text-sm">Choose pools with 0‑day, 7‑day, or 30‑day lock periods.</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-[#FF2D2D]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Community Governance</h3>
            <p className="text-[#BDDBDB] text-sm">Stakers get voting power in the ZRP DAO.</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-[#FF2D2D]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Secure & Transparent</h3>
            <p className="text-[#BDDBDB] text-sm">All transactions on‑chain, fully auditable.</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-[#FF2D2D]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant Claim</h3>
            <p className="text-[#BDDBDB] text-sm">Claim rewards anytime – no waiting for lock period to end.</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coins className="h-6 w-6 text-[#FF2D2D]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Zero Fees</h3>
            <p className="text-[#BDDBDB] text-sm">No fees to stake, claim, or unstake – only a small platform fee on rewards.</p>
          </div>
        </div>
      </div>

      {/* ─── How It Works ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { step: 1, title: 'Connect Wallet', desc: 'Connect Phantom, Solflare, or any Solana wallet.', icon: <Wallet className="h-5 w-5" /> },
            { step: 2, title: 'Choose a Pool', desc: 'Browse available NFT staking pools.', icon: <Coins className="h-5 w-5" /> },
            { step: 3, title: 'Select NFT', desc: 'Pick an NFT from the collection.', icon: <Palette className="h-5 w-5" /> },
            { step: 4, title: 'Stake & Earn', desc: 'Lock your NFT and start earning rewards.', icon: <Lock className="h-5 w-5" /> },
            { step: 5, title: 'Claim or Unstake', desc: 'Claim rewards anytime or unstake after lock.', icon: <Zap className="h-5 w-5" /> },
          ].map((s) => (
            <div key={s.step} className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                {s.icon}
              </div>
              <div className="text-xl font-bold text-[#FF2D2D] mb-1">{s.step}</div>
              <h4 className="text-white font-semibold text-sm">{s.title}</h4>
              <p className="text-[#BDDBDB] text-xs mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Real‑World Use Cases ───────────────────────────────────── */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Real‑World Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Gamepad2 className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Gaming</h4>
              <p className="text-[#BDDBDB] text-sm">Stake in‑game NFTs like characters or weapons to earn tokens.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Palette className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Art</h4>
              <p className="text-[#BDDBDB] text-sm">Artists stake digital art NFTs to earn royalties.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Metaverse</h4>
              <p className="text-[#BDDBDB] text-sm">Stake virtual land and assets to generate income.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Fees & Rewards ─────────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Fees & Rewards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-[#BDDBDB] text-sm">Staking Fee</p>
            <p className="text-white text-2xl font-bold">0%</p>
            <p className="text-[#BDDBDB] text-xs">No fee to stake.</p>
          </div>
          <div>
            <p className="text-[#BDDBDB] text-sm">Claim Fee</p>
            <p className="text-white text-2xl font-bold">0%</p>
            <p className="text-[#BDDBDB] text-xs">No fee to claim rewards.</p>
          </div>
          <div>
            <p className="text-[#BDDBDB] text-sm">Unstake Fee</p>
            <p className="text-white text-2xl font-bold">0%</p>
            <p className="text-[#BDDBDB] text-xs">No fee to unstake.</p>
          </div>
          <div>
            <p className="text-[#BDDBDB] text-sm">Platform Fee</p>
            <p className="text-white text-2xl font-bold">5%</p>
            <p className="text-[#BDDBDB] text-xs">of rewards – goes to ZRP treasury.</p>
          </div>
        </div>
      </div>

      {/* ─── Risks & Mitigation ─────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Risks & How We Mitigate Them</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Platform Reliability</h4>
              <p className="text-[#BDDBDB] text-sm">Audited smart contracts, open‑source, and transparent.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Market Volatility</h4>
              <p className="text-[#BDDBDB] text-sm">Rewards in stable tokens (optional) to reduce risk.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Illiquidity</h4>
              <p className="text-[#BDDBDB] text-sm">Flexible lock options – choose 0‑day, 7‑day, or 30‑day.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Complexity</h4>
              <p className="text-[#BDDBDB] text-sm">One‑click staking – no technical knowledge needed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FAQ ──────────────────────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">FAQ</h2>
        <div className="space-y-4">
          <div className="border-b border-[#1a1a1a] pb-3">
            <p className="text-white font-semibold">What is NFT staking?</p>
            <p className="text-[#BDDBDB] text-sm">Locking your NFTs on a platform to earn rewards – like staking tokens, but for NFTs.</p>
          </div>
          <div className="border-b border-[#1a1a1a] pb-3">
            <p className="text-white font-semibold">How do I stake my NFT?</p>
            <p className="text-[#BDDBDB] text-sm">Connect your wallet, choose a pool, select an NFT, and click “Stake”.</p>
          </div>
          <div className="border-b border-[#1a1a1a] pb-3">
            <p className="text-white font-semibold">What rewards can I earn?</p>
            <p className="text-[#BDDBDB] text-sm">Rewards are in tokens (e.g., ZRP) – APY varies by pool.</p>
          </div>
          <div className="border-b border-[#1a1a1a] pb-3">
            <p className="text-white font-semibold">Can I unstake anytime?</p>
            <p className="text-[#BDDBDB] text-sm">Yes – you can unstake anytime, but lock periods may apply (0‑day, 7‑day, or 30‑day).</p>
          </div>
          <div className="border-b border-[#1a1a1a] pb-3">
            <p className="text-white font-semibold">Is my NFT safe?</p>
            <p className="text-[#BDDBDB] text-sm">Yes – all transactions are on‑chain, and smart contracts are audited.</p>
          </div>
          <div className="border-b border-[#1a1a1a] pb-3">
            <p className="text-white font-semibold">How are rewards calculated?</p>
            <p className="text-[#BDDBDB] text-sm">Rewards = (staked amount × APY × time staked) / 365.25 days.</p>
          </div>
          <div>
            <p className="text-white font-semibold">What is the lock period?</p>
            <p className="text-[#BDDBDB] text-sm">Each pool has a lock period – choose what fits your strategy.</p>
          </div>
        </div>
      </div>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
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
