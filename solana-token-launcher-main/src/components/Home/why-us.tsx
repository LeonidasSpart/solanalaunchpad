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
    <section className="py-20 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose ZRP?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            The only platform that lets you test your token for FREE on devnet before launching on mainnet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black rounded-xl p-6 border border-zinc-800 hover:border-purple-500/50 transition"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-purple-900/20 border border-purple-500/30 rounded-full px-6 py-3">
            <span className="text-purple-400 font-semibold">🚀 FREE Devnet Testing</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-400">Launch on Mainnet from 0.15 SOL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
