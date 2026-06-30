'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Rocket, Shield, Clock, Github, Sparkles, Play, ChevronDown } from 'lucide-react';
import ShareButtons from '@/components/Home/share-buttons';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background layers */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/[0.03] rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-6xl mx-auto text-center pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">No-Code Solana Token Creator</span>
          </motion.div>

          {/* FREE Devnet Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-bold text-sm">FREE Devnet Testing</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm">Zero cost, zero risk</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
          >
            Create a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400">
              Solana Token
            </span>
            <br className="hidden sm:block" />
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">in Under 60 Seconds</span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            No coding required. Mint instantly to your wallet. 
            <span className="text-white font-medium"> Test FREE on devnet</span>, then launch on mainnet with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Link
              href="/create-mint"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 flex items-center gap-2 text-lg"
            >
              <Rocket className="h-5 w-5" />
              Create Your Token
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="group px-8 py-4 bg-zinc-900/80 hover:bg-zinc-800 text-white font-semibold rounded-2xl transition-all border border-zinc-700 hover:border-zinc-600 flex items-center gap-2 backdrop-blur-sm"
            >
              <Play className="h-4 w-4" />
              Watch How It Works
            </a>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-10"
          >
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>Non-Custodial</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-zinc-800" />
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Wallet-Signed</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-zinc-800" />
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Github className="h-4 w-4 text-blue-400" />
              <span>Open Source</span>
            </div>
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-12"
          >
            <ShareButtons />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
          >
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/80 p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Github className="h-4 w-4 text-purple-400" />
                <span className="text-purple-400 font-bold text-lg">Open</span>
              </div>
              <p className="text-zinc-500 text-xs">Source on GitHub</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/80 p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="text-purple-400 font-bold text-lg">&lt;60s</span>
              </div>
              <p className="text-zinc-500 text-xs">Average Mint Time</p>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/80 p-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-purple-400 font-bold text-lg">0.15 SOL</span>
              </div>
              <p className="text-zinc-500 text-xs">Starting From</p>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <a href="#how-it-works" className="flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors">
              <span className="text-xs uppercase tracking-wider">Scroll</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
