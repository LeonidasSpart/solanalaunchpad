'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ShareButtons from '@/components/Home/share-buttons';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black" />
      
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-purple-400 text-sm font-medium">⚡ NO-CODE SOLANA TOKEN CREATOR</span>
          </div>

          {/* FREE Devnet Testing Banner */}
          <div className="inline-flex items-center gap-3 bg-green-900/30 border border-green-500/30 rounded-full px-6 py-2.5 mb-6 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-400 font-semibold text-sm">FREE Devnet Testing</span>
            <span className="text-zinc-400 text-sm">|</span>
            <span className="text-zinc-300 text-sm">Test your token with zero cost</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Create a <span className="text-purple-400">Solana Token</span>
            <br />
            in Under 2 Minutes
          </h1>

          {/* Sub-heading */}
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            No coding required. Mint instantly to your wallet. Secure, fast, and non-custodial.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create-mint"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              Create Your Token
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-2xl transition-all border border-zinc-700"
            >
              How It Works →
            </a>
          </div>

          {/* Share Buttons */}
          <div className="mt-8">
            <ShareButtons />
          </div>

          {/* Stats - FIXED */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-zinc-500">
            <div>
              <span className="text-purple-400 font-bold text-lg">Open Source</span>
              <p className="text-zinc-500">Code on GitHub</p>
            </div>
            <div>
              <span className="text-purple-400 font-bold text-lg">&lt;60s</span>
              <p className="text-zinc-500">Average Mint Time</p>
            </div>
            <div>
              <span className="text-purple-400 font-bold text-lg">0.15 SOL</span>
              <p className="text-zinc-500">Starting From</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
