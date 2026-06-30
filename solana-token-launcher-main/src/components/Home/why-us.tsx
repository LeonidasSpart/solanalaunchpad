'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Wallet, Lock, TrendingUp, Sparkles, Github, ExternalLink } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Devnet + Mainnet',
    description: 'Test your token for FREE on devnet with zero risk. Launch on mainnet only when you\'re ready.',
    highlight: 'FREE Testing',
    color: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'group-hover:border-purple-500/50',
    iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    iconColor: 'text-purple-400'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Non-Custodial',
    description: 'We never see or store your private keys. Your wallet, your tokens. 100% self-custody.',
    highlight: null,
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'group-hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    iconColor: 'text-emerald-400'
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: 'Wallet-Signed',
    description: 'Every transaction is signed directly in your wallet. We never have access to your funds.',
    highlight: null,
    color: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'group-hover:border-blue-500/50',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    iconColor: 'text-blue-400'
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'IPFS Storage',
    description: 'Token metadata stored permanently on IPFS via NFT.Storage — decentralized and censorship-resistant.',
    highlight: null,
    color: 'from-cyan-500/20 to-cyan-600/5',
    borderColor: 'group-hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    iconColor: 'text-cyan-400'
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Revoke Authorities',
    description: 'Build trust by permanently revoking Mint, Freeze, and Update authorities. Irreversible and provable.',
    highlight: 'Trust Signal',
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'group-hover:border-amber-500/50',
    iconBg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
    iconColor: 'text-amber-400'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'SPL Standard',
    description: 'Fully SPL-compliant tokens. Compatible with Phantom, Solflare, Raydium, Jupiter & all Solana DEXes.',
    highlight: null,
    color: 'from-rose-500/20 to-rose-600/5',
    borderColor: 'group-hover:border-rose-500/50',
    iconBg: 'bg-rose-500/10 group-hover:bg-rose-500/20',
    iconColor: 'text-rose-400'
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/[0.03] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Built Different</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400">ZRP</span>?
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              The only open-source platform that lets you <span className="text-white font-semibold">test your token for FREE</span> on devnet before launching on mainnet. No risk, no surprises.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group relative bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl p-7 border border-zinc-800/80 ${feature.borderColor} hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1`}
            >
              {/* Highlight badge */}
              {feature.highlight && (
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-purple-500/25">
                  {feature.highlight}
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                <span className={feature.iconColor}>{feature.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-r from-purple-900/20 via-purple-900/10 to-blue-900/20 border border-purple-500/20 rounded-2xl px-8 py-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
              <span className="text-white font-bold text-lg">FREE Devnet Testing</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-zinc-700" />
            <div className="flex items-center gap-3">
              <span className="text-zinc-400">Launch on Mainnet from</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold text-lg">0.15 SOL</span>
            </div>
          </div>

          {/* Open source badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-zinc-500 text-sm">
            <Github className="h-4 w-4" />
            <span>Open source on</span>
            <a 
              href="https://github.com/LeonidasSpart/solanalaunchpad" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              GitHub <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
