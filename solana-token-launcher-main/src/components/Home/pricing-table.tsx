'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, X, Info, Sparkles, Zap, Shield, ArrowRight, Flame } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    priceNote: 'Forever free',
    description: 'Test on devnet with zero cost. No credit card required.',
    features: [
      { name: 'Devnet Testing', included: true },
      { name: 'Token Creation', included: true },
      { name: 'IPFS Image Storage', included: true },
      { name: 'Social Links & Branding', included: true },
      { name: 'Mainnet Launch', included: false },
      { name: 'Authority Revocations', included: false },
    ],
    button: 'Test Free',
    buttonColor: 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700',
    buttonTextColor: 'text-white',
    popular: false,
    badge: null,
    highlight: 'Zero Risk'
  },
  {
    name: 'Basic',
    price: '0.15 SOL',
    priceNote: '~$25 USD',
    description: 'Launch on mainnet with full branding and metadata.',
    features: [
      { name: 'Devnet Testing', included: true },
      { name: 'Mainnet Launch', included: true },
      { name: 'Token Creation', included: true },
      { name: 'IPFS Image Storage', included: true },
      { name: 'Social Links & Branding', included: true },
      { name: 'Authority Revocations', included: false },
    ],
    button: 'Launch Token',
    buttonColor: 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400',
    buttonTextColor: 'text-white',
    popular: true,
    badge: 'Most Popular',
    highlight: 'Best Value'
  },
  {
    name: 'Secure',
    price: '0.60 SOL',
    priceNote: '~$100 USD',
    description: 'All authorities revoked. Maximum trust and security.',
    features: [
      { name: 'Everything in Basic', included: true },
      { name: 'Revoke Mint Authority', included: true },
      { name: 'Revoke Freeze Authority', included: true },
      { name: 'Revoke Update Authority', included: true },
      { name: 'Immutable Metadata', included: true },
      { name: 'Maximum Trust Signal', included: true },
    ],
    button: 'Launch Secure',
    buttonColor: 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400',
    buttonTextColor: 'text-white',
    popular: false,
    badge: 'Maximum Trust',
    highlight: 'Proven Safe'
  }
];

const competitorComparison = [
  { feature: 'Base fee', us: '0.15 SOL', them: '0.10 SOL', better: false },
  { feature: 'Devnet testing', us: 'FREE', them: 'Not offered', better: true },
  { feature: 'Branding included', us: 'Yes', them: '+0.10 SOL', better: true },
  { feature: 'Authority revocation', us: '0.15 SOL each', them: '0.10 SOL each', better: false },
  { feature: 'Open source', us: 'Yes', them: 'No', better: true },
  { feature: 'Max total cost', us: '0.60 SOL', them: '0.50 SOL', better: false },
];

export default function PricingTable() {
  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/[0.02] rounded-full blur-3xl" />
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
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Transparent Pricing</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Fair Pricing</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Start for free on devnet. Pay only when you&apos;re ready to launch on mainnet.
            No subscriptions, no hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`group relative bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 backdrop-blur-sm rounded-2xl p-8 border ${
                plan.popular
                  ? 'border-purple-500/50 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20'
                  : 'border-zinc-800/80 hover:border-zinc-700'
              } transition-all duration-500 hover:-translate-y-1`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/25">
                  {plan.badge}
                </div>
              )}

              {/* Highlight Badge */}
              {plan.highlight && !plan.popular && (
                <div className="absolute -top-3 right-4 bg-gradient-to-r from-zinc-700 to-zinc-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {plan.highlight}
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                </div>
                <p className="text-sm text-zinc-500">{plan.priceNote}</p>
                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{plan.description}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-800/80 mb-6" />

              {/* Features */}
              <ul className="space-y-3.5">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="h-3 w-3 text-zinc-600" />
                      </div>
                    )}
                    <span className={feature.included ? 'text-zinc-300' : 'text-zinc-600'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/create-mint"
                className={`block text-center mt-8 px-6 py-3.5 rounded-xl font-semibold ${plan.buttonTextColor} transition-all duration-300 shadow-lg hover:shadow-xl ${plan.buttonColor}`}
              >
                <span className="flex items-center justify-center gap-2">
                  {plan.name === 'Free' ? <Zap className="h-4 w-4" /> : plan.name === 'Secure' ? <Shield className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
                  {plan.button}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Competitor Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800/80 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-6 text-center">Why ZRP vs Competitors</h3>
            <div className="space-y-3">
              {competitorComparison.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2.5 border-b border-zinc-800/50 last:border-0">
                  <span className="text-sm text-zinc-400">{item.feature}</span>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs text-zinc-500 mb-0.5">Competitor</div>
                      <div className="text-sm text-zinc-400">{item.them}</div>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <div className="text-xs text-purple-400 mb-0.5">ZRP</div>
                      <div className={`text-sm font-semibold ${item.better ? 'text-emerald-400' : 'text-zinc-300'}`}>
                        {item.us}
                        {item.better && <span className="ml-1 text-emerald-400">✓</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-zinc-500 mt-6">
              * Competitor pricing based on SOLTokenLaunch. ZRP includes free devnet testing and branding.
            </p>
          </div>
        </motion.div>

        {/* Fee breakdown note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
            <Info className="h-4 w-4 flex-shrink-0" />
            Each authority revocation adds 0.15 SOL. Network gas fees are covered.
            <Link href="/pricing" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 ml-1 transition-colors">
              Full breakdown <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
