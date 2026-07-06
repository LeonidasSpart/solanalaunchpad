'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Coins, TrendingUp, Sparkles } from 'lucide-react';

export default function AffiliateCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="relative bg-gradient-to-r from-[#FF2D2D]/10 via-[#FF2D2D]/5 to-transparent rounded-3xl border border-[#FF2D2D]/20 p-8 md:p-12">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF2D2D]/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF2D2D]/10 rounded-full blur-3xl opacity-20" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="h-4 w-4 text-[#FF2D2D]" />
              <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">
                Earn SOL
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Refer & Earn <span className="text-[#FF2D2D]">15% Commission</span>
            </h2>
            <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto mb-8">
              Share ZRP with others and earn 15% of every token creation fee. 
              No limits, no caps – just endless earning potential.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#050505]/50 rounded-xl p-4 border border-[#1a1a1a]">
                <Users className="h-6 w-6 text-[#FF2D2D] mx-auto mb-2" />
                <p className="text-white font-semibold">Unlimited Referrals</p>
                <p className="text-[#BDDBDB] text-sm">Share with anyone, anywhere</p>
              </div>
              <div className="bg-[#050505]/50 rounded-xl p-4 border border-[#1a1a1a]">
                <Coins className="h-6 w-6 text-[#FF2D2D] mx-auto mb-2" />
                <p className="text-white font-semibold">15% Commission</p>
                <p className="text-[#BDDBDB] text-sm">On every token creation</p>
              </div>
              <div className="bg-[#050505]/50 rounded-xl p-4 border border-[#1a1a1a]">
                <TrendingUp className="h-6 w-6 text-[#FF2D2D] mx-auto mb-2" />
                <p className="text-white font-semibold">Instant Payout</p>
                <p className="text-[#BDDBDB] text-sm">Earn SOL directly to your wallet</p>
              </div>
            </div>

            <Link
              href="/affiliate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition text-lg shadow-lg shadow-[#FF2D2D]/25"
            >
              Join Affiliate Program →
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
