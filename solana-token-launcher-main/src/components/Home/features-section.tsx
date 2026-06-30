'use client';

import { motion } from 'framer-motion';
import { Rocket, Shield, Zap, Lock, Coins, BarChart3, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Easy Token Creation',
    description: 'Create your Solana token in minutes with our intuitive interface. No coding required. Just fill in the form, connect your wallet, and launch.',
    color: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'group-hover:border-purple-500/50',
    iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    iconColor: 'text-purple-400',
    highlight: null
  },
  {
    icon: Shield,
    title: 'Secure Minting',
    description: 'Mint tokens securely with advanced blockchain integration. Every transaction is wallet-signed. We never see or store your private keys.',
    color: 'from-emerald-500/20 to-emerald-600/5',
    borderColor: 'group-hover:border-emerald-500/50',
    iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    highlight: null
  },
  {
    icon: Zap,
    title: 'Fast Transactions',
    description: 'Experience lightning-fast token transactions on Solana. Under 60 seconds from wallet confirmation to your token being live on-chain.',
    color: 'from-amber-500/20 to-amber-600/5',
    borderColor: 'group-hover:border-amber-500/50',
    iconBg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
    iconColor: 'text-amber-400',
    highlight: null
  },
  {
    icon: Lock,
    title: 'Robust Security',
    description: 'Your tokens are protected by state-of-the-art security measures. Non-custodial by design. Optional authority revocation for maximum trust.',
    color: 'from-rose-500/20 to-rose-600/5',
    borderColor: 'group-hover:border-rose-500/50',
    iconBg: 'bg-rose-500/10 group-hover:bg-rose-500/20',
    iconColor: 'text-rose-400',
    highlight: null
  },
  {
    icon: Coins,
    title: 'Free Devnet Testing',
    description: 'Test your token on devnet with zero cost before launching on mainnet. No risk, no fees, no commitment. Perfect your token before going live.',
    color: 'from-cyan-500/20 to-cyan-600/5',
    borderColor: 'group-hover:border-cyan-500/50',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    iconColor: 'text-cyan-400',
    highlight: 'FREE'
  },
  {
    icon: BarChart3,
    title: 'Transparent Pricing',
    description: 'Start for free on devnet. Pay only when you are ready to launch on mainnet. No hidden fees, no subscriptions, no surprises ever.',
    color: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'group-hover:border-blue-500/50',
    iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    iconColor: 'text-blue-400',
    highlight: null
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />

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
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Launch Your Token
            </span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Our platform provides all the tools and features you need to create, mint, and manage your Solana tokens efficiently.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                <div className={`relative bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/80 ${feature.borderColor} hover:shadow-2xl hover:shadow-purple-500/5 transition-all duration-500 hover:-translate-y-1 h-full`}>
                  {/* Highlight badge */}
                  {feature.highlight && (
                    <div className="absolute -top-3 right-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-cyan-500/25">
                      {feature.highlight}
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                    <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${feature.color} group-hover:w-1/2 transition-all duration-500 rounded-full`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="/create-mint"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 group"
          >
            Start Creating Now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-4 text-sm text-zinc-500">
            Free devnet testing. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
