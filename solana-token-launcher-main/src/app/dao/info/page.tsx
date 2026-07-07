'use client';

import Link from 'next/link';
import { 
  ArrowRight, 
  Users, 
  Vote, 
  BarChart, 
  Shield, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  GitBranch,
  Wallet,
  Zap
} from 'lucide-react';

export default function DaoInfoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <div className="text-center mb-16">
        <div className="inline-block bg-[#FF2D2D]/10 rounded-full px-4 py-1.5 text-sm text-[#FF2D2D] font-medium mb-4">
          🏛️ Community Governance
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Decentralized <span className="text-[#FF2D2D]">DAO</span> Governance
        </h1>
        <p className="text-xl text-[#BDDBDB] max-w-2xl mx-auto">
          Propose, vote, and shape the future of projects on ZRP. 
          Token holders decide together.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/dao"
            className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-8 py-3 rounded-xl font-semibold transition flex items-center gap-2"
          >
            Explore Proposals <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dao/create"
            className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-8 py-3 rounded-xl font-semibold border border-[#FF2D2D]/30 transition"
          >
            Create a Proposal
          </Link>
        </div>
      </div>

      {/* ─── Features Grid ──────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <GitBranch className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Propose Changes</h3>
          <p className="text-[#BDDBDB] text-sm">Any token holder can create a proposal – no permission needed.</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Vote className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Vote with Tokens</h3>
          <p className="text-[#BDDBDB] text-sm">Your voting power equals your token balance – 1 token = 1 vote.</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Transparent Results</h3>
          <p className="text-[#BDDBDB] text-sm">All votes are on-chain and visible. Results update in real time.</p>
        </div>
      </div>

      {/* ─── How It Works ───────────────────────────────────────────── */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { 
              step: 1, 
              title: 'Create', 
              desc: 'Connect your wallet and draft a proposal with title, description, and voting period.' 
            },
            { 
              step: 2, 
              title: 'Vote', 
              desc: 'Community members vote Yes or No using their token balance as voting power.' 
            },
            { 
              step: 3, 
              title: 'Pass / Fail', 
              desc: 'If the proposal reaches the quorum and passes, it moves to execution.' 
            },
            { 
              step: 4, 
              title: 'Execute', 
              desc: 'The proposal is executed – funds are moved, parameters are updated, etc.' 
            },
          ].map((s) => (
            <div key={s.step} className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-[#FF2D2D] mb-2">{s.step}</div>
              <h4 className="text-white font-semibold">{s.title}</h4>
              <p className="text-[#BDDBDB] text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Benefits ────────────────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Why DAO?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Decentralized Decisions</h4>
              <p className="text-[#BDDBDB] text-sm">No single entity controls the protocol – the community decides.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Inclusive Participation</h4>
              <p className="text-[#BDDBDB] text-sm">Anyone with tokens can propose and vote – no gatekeeping.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Aligned Incentives</h4>
              <p className="text-[#BDDBDB] text-sm">Token holders vote in the best interest of the project.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Real‑time Results</h4>
              <p className="text-[#BDDBDB] text-sm">Vote counts update live – you always know the outcome.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CTA ─────────────────────────────────────────────────────── */}
      <div className="text-center bg-gradient-to-r from-[#FF2D2D]/10 via-[#FF2D2D]/5 to-[#FF2D2D]/10 rounded-2xl p-12 border border-[#FF2D2D]/20">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Participate?</h2>
        <p className="text-[#BDDBDB] max-w-md mx-auto mb-6">
          Connect your wallet, browse active proposals, and make your voice heard.
        </p>
        <Link
          href="/dao"
          className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-8 py-3 rounded-xl font-semibold transition inline-flex items-center gap-2"
        >
          View Proposals <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
