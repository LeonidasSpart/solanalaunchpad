'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Rocket, Coins, Lock, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Easy Token Creation',
    description: 'Create your Solana token in minutes with our intuitive interface. No coding required.',
    color: 'from-purple-500/20 to-purple-600/5'
  },
  {
    icon: Shield,
    title: 'Secure Minting',
    description: 'Mint tokens securely with our advanced blockchain integration. Your keys, your control.',
    color: 'from-green-500/20 to-green-600/5'
  },
  {
    icon: Zap,
    title: 'Fast Transactions',
    description: 'Experience lightning-fast token transactions on the Solana network. Under 60 seconds.',
    color: 'from-yellow-500/20 to-yellow-600/5'
  },
  {
    icon: Lock,
    title: 'Robust Security',
    description: 'Your tokens are protected by state-of-the-art security measures. Non-custodial by design.',
    color: 'from-red-500/20 to-red-600/5'
  },
  {
    icon: Coins,
    title: 'Free Devnet Testing',
    description: 'Test your token on devnet with zero cost before launching on mainnet. No risk, no fees.',
    color: 'from-emerald-500/20 to-emerald-600/5'
  },
  {
    icon: BarChart3,
    title: 'Transparent Pricing',
    description: 'Start for free on devnet. Pay only when you\'re ready to launch on mainnet. No hidden fees.',
    color: 'from-blue-500/20 to-blue-600/5'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Everything You Need to <span className="text-purple-400">Launch Your Token</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Our platform provides all the tools and features you need to create, mint, and manage your Solana tokens efficiently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 group-hover:border-purple-500/50 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-purple-900/20 flex items-center justify-center mb-5 group-hover:bg-purple-900/40 transition-colors">
                    <Icon className="h-7 w-7 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
