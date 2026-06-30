'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Globe, Lock, Shield, Zap } from 'lucide-react';

const tokens = [
  {
    name: 'ExampleToken',
    symbol: 'EXMPL',
    description: 'Basic token with standard metadata and full creator branding included.',
    icon: '🤖',
    color: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'group-hover:border-purple-500/50',
    iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    network: 'Devnet',
    features: ['Standard', 'Branding'],
    featureIcon: <Shield className="h-3 w-3" />
  },
  {
    name: 'DemoCoin',
    symbol: 'DEMO',
    description: 'Token with revoked mint authority for maximum holder trust and confidence.',
    icon: '🪙',
    color: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'group-hover:border-blue-500/50',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    network: 'Mainnet',
    features: ['Revoked Mint', 'Immutable'],
    featureIcon: <Lock className="h-3 w-3" />
  },
  {
    name: 'TestToken',
    symbol: 'TEST',
    description: 'Fully secured with all authorities revoked. Maximum trust signal for holders.',
    icon: '🌙',
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'group-hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    network: 'Mainnet',
    features: ['All Revoked', 'Max Trust'],
    featureIcon: <Lock className="h-3 w-3" />
  },
  {
    name: 'SampleCoin',
    symbol: 'SMPL',
    description: 'Token with full branding, social links, and complete metadata on IPFS.',
    icon: '⭐',
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'group-hover:border-amber-500/50',
    iconBg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
    network: 'Devnet',
    features: ['Full Branding', 'IPFS'],
    featureIcon: <Zap className="h-3 w-3" />
  },
];

export default function FeaturedTokens() {
  return (
    <section id="examples" className="py-24 bg-gradient-to-b from-black via-zinc-950/30 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Examples</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Example <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Token Previews</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            See what your token will look like on Solana. From basic to fully secured — choose your level.
          </p>
        </motion.div>

        {/* Token Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokens.map((token, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              <div className={`relative bg-gradient-to-br ${token.color} backdrop-blur-sm rounded-2xl border border-zinc-800/80 ${token.borderColor} hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden`}>
                {/* Network Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    token.network === 'Mainnet' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    <Globe className="h-2.5 w-2.5" />
                    {token.network}
                  </span>
                </div>

                <div className="p-6">
                  {/* Token Icon & Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{token.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                        {token.name}
                      </h3>
                      <p className="text-xs font-mono text-zinc-500">${token.symbol}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors duration-300 min-h-[40px]">
                    {token.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {token.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-400 bg-zinc-800/50 border border-zinc-700/50 px-2 py-1 rounded-lg"
                      >
                        <span className="text-zinc-500">{token.featureIcon}</span>
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Example Badge */}
                  <div className="inline-flex items-center gap-1.5 text-[10px] text-zinc-500 bg-zinc-800/30 border border-zinc-700/30 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                    Example Token
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className={`h-1 w-full bg-gradient-to-r ${token.color} opacity-50`} />

                {/* Hover overlay link */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 text-xs text-white font-medium bg-purple-600/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <ExternalLink className="h-3 w-3" />
                    View on Explorer
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            href="/tokens"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition group"
          >
            View All Tokens
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="mt-3 text-sm text-zinc-500">
            Browse real tokens created by the ZRP community
          </p>
        </motion.div>
      </div>
    </section>
  );
}
