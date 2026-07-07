'use client';

import Link from 'next/link';
import { Rocket, Shield, Users, Coins, Clock, CheckCircle, ArrowRight, Zap, TrendingUp, BarChart } from 'lucide-react';

export default function LaunchpadInfoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block bg-[#FF2D2D]/10 rounded-full px-4 py-1.5 text-sm text-[#FF2D2D] font-medium mb-4">
          🚀 Launch on Solana
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Raise Funds with <span className="text-[#FF2D2D]">ZRP Launchpad</span>
        </h1>
        <p className="text-xl text-[#BDDBDB] max-w-2xl mx-auto">
          Launch your token sale in minutes. No code, no hassle. Powered by Solana.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/launchpad"
            className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-8 py-3 rounded-xl font-semibold transition flex items-center gap-2"
          >
            Explore Projects <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/launchpad/create"
            className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-8 py-3 rounded-xl font-semibold border border-[#FF2D2D]/30 transition"
          >
            Create a Project
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rocket className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Easy Setup</h3>
          <p className="text-[#BDDBDB] text-sm">Create a presale in minutes – no coding required.</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Secure & Transparent</h3>
          <p className="text-[#BDDBDB] text-sm">All transactions on-chain, fully auditable.</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Community Access</h3>
          <p className="text-[#BDDBDB] text-sm">Reach our growing community of active investors.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Create', desc: 'Fill in your project details and submit for review.' },
            { step: 2, title: 'Approve', desc: 'Our team reviews and approves your project quickly.' },
            { step: 3, title: 'Raise', desc: 'Investors contribute SOL to your project sale.' },
            { step: 4, title: 'Launch', desc: 'After the sale, funds are distributed and tokens are sent.' },
          ].map((s) => (
            <div key={s.step} className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-[#FF2D2D] mb-2">{s.step}</div>
              <h4 className="text-white font-semibold">{s.title}</h4>
              <p className="text-[#BDDBDB] text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fees */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <div className="flex items-center gap-2 mb-4">
          <Coins className="h-6 w-6 text-[#FF2D2D]" />
          <h2 className="text-2xl font-bold text-white">Platform Fees</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-[#BDDBDB] text-sm">Creators</p>
            <p className="text-white text-2xl font-bold">2–5%</p>
            <p className="text-[#BDDBDB] text-xs">of the raised amount</p>
          </div>
          <div>
            <p className="text-[#BDDBDB] text-sm">Investors</p>
            <p className="text-white text-2xl font-bold">0%</p>
            <p className="text-[#BDDBDB] text-xs">No fees for contributing</p>
          </div>
        </div>
        <p className="text-[#BDDBDB] text-sm mt-4 opacity-70">
          * Fees are configurable per project. Higher fees may be applied for premium services.
        </p>
      </div>

      {/* Why Use ZRP Launchpad */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Why Choose ZRP Launchpad?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Vesting Integration</h4>
              <p className="text-[#BDDBDB] text-sm">Lock team and advisor tokens with custom schedules.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Auto-Distribution</h4>
              <p className="text-[#BDDBDB] text-sm">Funds are automatically distributed after the sale ends.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Soft-Cap Refunds</h4>
              <p className="text-[#BDDBDB] text-sm">If the soft cap isn’t met, investors get refunds.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
            <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold">Admin Approval</h4>
              <p className="text-[#BDDBDB] text-sm">Every project is reviewed to ensure quality and safety.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-[#FF2D2D]/10 via-[#FF2D2D]/5 to-[#FF2D2D]/10 rounded-2xl p-12 border border-[#FF2D2D]/20">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch?</h2>
        <p className="text-[#BDDBDB] max-w-md mx-auto mb-6">
          Create your project today and start raising funds from the ZRP community.
        </p>
        <Link
          href="/launchpad/create"
          className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-8 py-3 rounded-xl font-semibold transition inline-flex items-center gap-2"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
