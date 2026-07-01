'use client';

import { Lock, Eye, CheckCircle, Zap, Shield, Github, Fingerprint, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'You control your keys. We never see or store private keys.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]'
  },
  {
    icon: Eye,
    title: 'Open Source',
    description: 'Fully auditable code on GitHub. No hidden logic.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]',
    highlight: 'Verified'
  },
  {
    icon: Shield,
    title: 'Metaplex Standard',
    description: 'SPL compliant tokens. Compatible with all Solana wallets & DEXes.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Under 60 seconds from wallet to live token on-chain.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]'
  },
  {
    icon: Fingerprint,
    title: 'Wallet-Signed',
    description: 'Every transaction signed in your wallet. Zero trust required.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]'
  },
  {
    icon: Timer,
    title: '24/7 Available',
    description: 'Create tokens anytime. No queues, no approval delays.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]'
  }
];

export default function TrustBadges() {
  return (
    <section id="trust" className="py-20 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2D2D]/[0.03] rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">Security First</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Built for <span className="text-[#FF2D2D]">Trust</span>
          </h2>
          <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
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
                className={`group relative bg-gradient-to-br ${badge.color} backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-[#1a1a1a] ${badge.borderColor} hover:shadow-xl hover:shadow-[#FF2D2D]/5 transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Highlight badge */}
                {badge.highlight && (
                  <div className="absolute -top-2.5 right-4 bg-[#FF2D2D] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-[#FF2D2D]/25">
                    {badge.highlight}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${badge.iconBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`h-7 w-7 ${badge.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FF2D2D] transition-all duration-300">
                  {badge.title}
                </h3>
                <p className="text-sm text-[#BDDBDB] leading-relaxed group-hover:text-white transition-colors duration-300">
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
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[#BDDBDB] text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF2D2D] animate-pulse" />
            <span>No seed phrases collected</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#1a1a1a]" />
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span>Open source & auditable</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-[#1a1a1a]" />
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>SPL + Metaplex compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
