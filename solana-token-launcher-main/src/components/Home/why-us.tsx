'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Wallet, Lock, TrendingUp, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Devnet + Mainnet',
    description: 'Test your token for FREE on devnet with zero risk. Launch on mainnet only when you are ready.'
  },
  {
    icon: Shield,
    title: 'Non-Custodial',
    description: 'We never see or store your private keys. Your wallet, your tokens. 100% self-custody.'
  },
  {
    icon: Wallet,
    title: 'Wallet-Signed',
    description: 'Every transaction is signed directly in your wallet. We never have access to your funds.'
  },
  {
    icon: Globe,
    title: 'IPFS Storage',
    description: 'Token metadata stored permanently on IPFS via NFT.Storage — decentralized and censorship-resistant.'
  },
  {
    icon: Lock,
    title: 'Revoke Authorities',
    description: 'Build trust by permanently revoking Mint, Freeze, and Update authorities. Irreversible and provable.'
  },
  {
    icon: TrendingUp,
    title: 'SPL Standard',
    description: 'Fully SPL-compliant tokens. Compatible with Phantom, Solflare, Raydium, Jupiter & all Solana DEXes.'
  }
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* ZRP Red glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF2D2D]/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF2D2D]/[0.02] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
            Why Choose <span className="text-[#FF2D2D]">ZRP</span>?
          </h2>
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto leading-relaxed">
            The only open-source platform that lets you test your token for FREE on devnet before launching on mainnet.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group bg-[#0D0D0D] rounded-2xl p-7 border border-[#1a1a1a] hover:border-[#FF2D2D]/40 transition-all duration-400 hover:-translate-y-0.5"
              >
                {/* Icon — ZRP Red */}
                <div className="w-11 h-11 rounded-xl bg-[#FF2D2D]/10 flex items-center justify-center mb-5 group-hover:bg-[#FF2D2D]/20 transition-colors">
                  <Icon className="h-5 w-5 text-[#FF2D2D]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#BDDBDB] leading-relaxed group-hover:text-white transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="/create-mint"
            className="inline-flex items-center gap-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300"
          >
            Start Creating
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
