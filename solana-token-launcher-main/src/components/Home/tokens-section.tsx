'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Shield, Sparkles, Globe, Lock } from 'lucide-react';

const tokens = [
  { 
    name: 'SolToken', 
    symbol: 'SOL', 
    description: 'Basic token with standard metadata and full creator branding.',
    network: 'Devnet',
    features: ['Standard Metadata', 'Creator Branding'],
    icon: 'S',
    color: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'group-hover:border-purple-500/50',
    iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    iconColor: 'text-purple-400',
    networkColor: 'bg-purple-500/10 text-purple-400'
  },
  { 
    name: 'LunaToken', 
    symbol: 'LUNA', 
    description: 'Token with revoked mint authority for maximum holder trust.',
    network: 'Mainnet',
    features: ['Revoked Mint', 'Immutable Supply'],
    icon: 'L',
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'group-hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    networkColor: 'bg-emerald-500/10 text-emerald-400'
  },
  { 
    name: 'StarToken', 
    symbol: 'STAR', 
    description: 'Fully secured token with all authorities revoked and IPFS metadata.',
    network: 'Mainnet',
    features: ['All Revoked', 'IPFS Storage', 'Full Security'],
    icon: 'S',
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'group-hover:border-amber-500/50',
    iconBg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
    iconColor: 'text-amber-400',
    networkColor: 'bg-amber-500/10 text-amber-400'
  }
];

const TokensSection = () => {
  return (
    <section id="tokens" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-3xl" />
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
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Live Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Example <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Token Previews</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            See what your token will look like on Solana. From basic to fully secured — choose your level.
          </p>
        </motion.div>

        {/* Token Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tokens.map((token, index) => (
            <motion.div
              key={token.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group relative bg-gradient-to-br ${token.color} backdrop-blur-sm rounded-2xl border border-zinc-800/80 ${token.borderColor} hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden`}
            >
              {/* Network Badge */}
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${token.networkColor}`}>
                  <Globe className="h-3 w-3" />
                  {token.network}
                </span>
              </div>

              <div className="p-7">
                {/* Token Icon & Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-xl ${token.iconBg} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                    <span className={`text-2xl font-bold ${token.iconColor}`}>{token.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                      {token.name}
                    </h3>
                    <p className="text-sm font-mono text-zinc-500">${token.symbol}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-5 group-hover:text-zinc-300 transition-colors duration-300">
                  {token.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {token.features.map((feature, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 bg-zinc-800/50 border border-zinc-700/50 px-2.5 py-1 rounded-lg"
                    >
                      {feature.includes('Revoked') || feature.includes('Security') ? (
                        <Lock className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Shield className="h-3 w-3 text-zinc-500" />
                      )}
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Example Badge */}
                <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-800/30 border border-zinc-700/30 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                  Example Token
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className={`h-1 w-full bg-gradient-to-r ${token.color} opacity-50`} />
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
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white border-0 rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group"
          >
            <Link href="/tokens" className="inline-flex items-center gap-2">
              View All Your Tokens
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-zinc-500">
            See real tokens created by the community
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TokensSection;
