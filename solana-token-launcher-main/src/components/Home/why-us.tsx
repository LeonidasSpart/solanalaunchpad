'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Wallet, Lock, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-purple-400" />,
    title: 'Devnet + Mainnet',
    description: 'Test for FREE on devnet, then launch on mainnet with confidence.'
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-400" />,
    title: 'Non-Custodial',
    description: 'We never see or store your private keys. Your wallet, your tokens.'
  },
  {
    icon: <Wallet className="h-6 w-6 text-purple-400" />,
    title: 'Wallet-Signed',
    description: 'Every transaction is signed directly in your wallet. Full control.'
  },
  {
    icon: <Globe className="h-6 w-6 text-purple-400" />,
    title: 'IPFS Storage',
    description: 'Token metadata stored on IPFS via NFT.Storage — permanent and decentralized.'
  },
  {
    icon: <Lock className="h-6 w-6 text-purple-400" />,
    title: 'Revoke Authorities',
    description: 'Optional revoke of Mint, Freeze, and Update authorities for trust.'
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-purple-400" />,
    title: 'SPL Standard',
    description: 'Fully SPL-compliant tokens compatible with all Solana wallets and DEXes.'
  }
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-zinc-900/30 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose ZRP?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              The only platform that lets you test your token for FREE on devnet before launching on mainnet.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 hover:border-purple-500/50 hover:bg-black/70 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-900/20 flex items-center justify-center mb-4 group-hover:bg-purple-900/40 transition">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-purple-900/20 border border-purple-500/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <span className="text-purple-400 font-semibold">🚀 FREE Devnet Testing</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Launch on Mainnet from 0.15 SOL</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
