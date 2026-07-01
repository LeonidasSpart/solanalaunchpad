'use client';

import { motion } from 'framer-motion';
import { Rocket, Shield, Zap, Lock, Coins, BarChart3, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Easy Token Creation',
    description: 'Create your Solana token in minutes with our intuitive interface. No coding required. Just fill in the form, connect your wallet, and launch.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]',
    highlight: null
  },
  {
    icon: Shield,
    title: 'Secure Minting',
    description: 'Mint tokens securely with advanced blockchain integration. Every transaction is wallet-signed. We never see or store your private keys.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]',
    highlight: null
  },
  {
    icon: Zap,
    title: 'Fast Transactions',
    description: 'Experience lightning-fast token transactions on Solana. Under 60 seconds from wallet confirmation to your token being live on-chain.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]',
    highlight: null
  },
  {
    icon: Lock,
    title: 'Robust Security',
    description: 'Your tokens are protected by state-of-the-art security measures. Non-custodial by design. Optional authority revocation for maximum trust.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]',
    highlight: null
  },
  {
    icon: Coins,
    title: 'Free Devnet Testing',
    description: 'Test your token on devnet with zero cost before launching on mainnet. No risk, no fees, no commitment. Perfect your token before going live.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]',
    highlight: 'FREE'
  },
  {
    icon: BarChart3,
    title: 'Transparent Pricing',
    description: 'Start for free on devnet. Pay only when you are ready to launch on mainnet. No hidden fees, no subscriptions, no surprises ever.',
    color: 'from-[#FF2D2D]/20 to-[#FF2D2D]/5',
    borderColor: 'group-hover:border-[#FF2D2D]/50',
    iconBg: 'bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20',
    iconColor: 'text-[#FF2D2D]',
    highlight: null
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#FF2D2D]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FF2D2D]/[0.03] rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything You Need to{' '}
            <span className="text-[#FF2D2D]">
              Launch Your Token
            </span>
          </h2>
          
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto">
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
                <div className={`relative bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl p-8 border border-[#1a1a1a] ${feature.borderColor} hover:shadow-2xl hover:shadow-[#FF2D2D]/5 transition-all duration-500 hover:-translate-y-1 h-full`}>
                  {/* Highlight badge */}
                  {feature.highlight && (
                    <div className="absolute -top-3 right-4 bg-[#FF2D2D] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg shadow-[#FF2D2D]/25">
                      {feature.highlight}
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                    <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF2D2D] transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[#BDDBDB] text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
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
            className="inline-flex items-center gap-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF2D2D]/25 hover:shadow-[#FF2D2D]/40 group"
          >
            Start Creating Now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-4 text-sm text-[#BDDBDB]">
            Free devnet testing. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
