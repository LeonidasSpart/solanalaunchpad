'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Globe, Lock, Shield, Zap } from 'lucide-react';

const tokens = [
  {
    name: 'ExampleToken',
    symbol: 'EXMPL',
    description: 'Basic token with standard metadata and full creator branding included.',
    icon: '🤖',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    network: 'Devnet',
    features: ['Standard', 'Branding'],
    featureIcon: <Shield className="h-3 w-3" />
  },
  {
    name: 'DemoCoin',
    symbol: 'DEMO',
    description: 'Token with revoked mint authority for maximum holder trust and confidence.',
    icon: '🪙',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    network: 'Mainnet',
    features: ['Revoked Mint', 'Immutable'],
    featureIcon: <Lock className="h-3 w-3" />
  },
  {
    name: 'TestToken',
    symbol: 'TEST',
    description: 'Fully secured with all authorities revoked. Maximum trust signal for holders.',
    icon: '🌙',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    network: 'Mainnet',
    features: ['All Revoked', 'Max Trust'],
    featureIcon: <Lock className="h-3 w-3" />
  },
  {
    name: 'SampleCoin',
    symbol: 'SMPL',
    description: 'Token with full branding, social links, and complete metadata on IPFS.',
    icon: '⭐',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    network: 'Devnet',
    features: ['Full Branding', 'IPFS'],
    featureIcon: <Zap className="h-3 w-3" />
  },
];

export default function FeaturedTokens() {
  return (
    <section id="examples" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2D2D]/[0.02] rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">Examples</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Example <span className="text-[#FF2D2D]">Token Previews</span>
          </h2>
          
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto">
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
              <div className={`relative bg-gradient-to-br ${token.color} backdrop-blur-sm rounded-2xl border border-[#1a1a1a] ${token.borderColor} hover:shadow-2xl hover:shadow-[#FF2D2D]/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden`}>
                {/* Network Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    token.network === 'Mainnet' 
                      ? 'bg-[#FF2D2D]/10 text-[#FF2D2D] border border-[#FF2D2D]/20' 
                      : 'bg-[#FF2D2D]/10 text-[#FF2D2D] border border-[#FF2D2D]/20'
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
                      <h3 className="text-lg font-bold text-white group-hover:text-[#FF2D2D] transition-all duration-300">
                        {token.name}
                      </h3>
                      <p className="text-xs font-mono text-[#BDDBDB]">${token.symbol}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#BDDBDB] leading-relaxed mb-4 group-hover:text-white transition-colors duration-300 min-h-[40px]">
                    {token.description}
                  </p>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {token.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-2 py-1 rounded-lg"
                      >
                        <span className="text-[#FF2D2D]">{token.featureIcon}</span>
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Example Badge */}
                  <div className="inline-flex items-center gap-1.5 text-[10px] text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BDDBDB]" />
                    Example Token
                  </div>
                </div>

                {/* Bottom gradient line */}
                <div className={`h-1 w-full bg-gradient-to-r ${token.color} opacity-50`} />

                {/* Hover overlay link */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 text-xs text-white font-medium bg-[#FF2D2D]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
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
            className="inline-flex items-center gap-2 text-[#FF2D2D] hover:text-[#B10000] font-medium transition group"
          >
            View All Tokens
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="mt-3 text-sm text-[#BDDBDB]">
            Browse real tokens created by the ZRP community
          </p>
        </motion.div>
      </div>
    </section>
  );
}
