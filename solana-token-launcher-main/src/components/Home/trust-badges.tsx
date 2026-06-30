'use client';

import { Lock, Eye, CheckCircle, Zap, Shield, Github, Fingerprint, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'You control your keys. We never see or store private keys.',
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'group-hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    iconColor: 'text-emerald-400'
  },
  {
    icon: Eye,
    title: 'Open Source',
    description: 'Fully auditable code on GitHub. No hidden logic.',
    color: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'group-hover:border-blue-500/50',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    iconColor: 'text-blue-400',
    highlight: 'Verified'
  },
  {
    icon: Shield,
    title: 'Metaplex Standard',
    description: 'SPL compliant tokens. Compatible with all Solana wallets & DEXes.',
    color: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'group-hover:border-purple-500/50',
    iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    iconColor: 'text-purple-400'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Under 60 seconds from wallet to live token on-chain.',
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'group-hover:border-amber-500/50',
    iconBg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: Fingerprint,
    title: 'Wallet-Signed',
    description: 'Every transaction signed in your wallet. Zero trust required.',
    color: 'from-cyan-500/20 to-cyan-600/5',
    borderColor: 'group-hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    icon: Timer,
    title: '24/7 Available',
    description: 'Create tokens anytime. No queues, no approval delays.',
    color: 'from-rose-500/20 to-rose-600/5',
    borderColor: 'group-hover:border-rose-500/50',
    iconBg: 'bg-rose-500/10 group-hover:bg-rose-500/20',
    iconColor: 'text-rose-400'
  }
];

export default function TrustBadges() {
  return (
    <section id="trust" className="py-20 bg-gradient-to-b from-black via-zinc-950/50 to-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Security First</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Trust</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Transparent, secure, and user-controlled. Your keys, your tokens, your control.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true, margin: "-30px" }}
                className={`group relative bg-gradient-to-br ${badge.color} backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-zinc-800/80 ${badge.borderColor} hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Highlight badge */}
                {badge.highlight && (
                  <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-blue-500/25">
                    {badge.highlight}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${badge.iconBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`h-7 w-7 ${badge.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                  {badge.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-zinc-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>No seed phrases collected</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span>Open source & auditable</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>SPL + Metaplex compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
