'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, X, Info } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Test on devnet with zero cost',
    features: [
      { name: 'Devnet Testing', included: true },
      { name: 'Token Creation', included: true },
      { name: 'IPFS Image Storage', included: true },
      { name: 'Social Links', included: true },
      { name: 'Mainnet Launch', included: false },
      { name: 'Authority Revocations', included: false },
    ],
    button: 'Test Free',
    buttonColor: 'bg-zinc-800 hover:bg-zinc-700',
    popular: false
  },
  {
    name: 'Basic',
    price: '0.15 SOL',
    description: 'Launch on mainnet',
    features: [
      { name: 'Devnet Testing', included: true },
      { name: 'Mainnet Launch', included: true },
      { name: 'Token Creation', included: true },
      { name: 'IPFS Image Storage', included: true },
      { name: 'Social Links', included: true },
      { name: 'Authority Revocations', included: false },
    ],
    button: 'Launch Token',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    popular: true
  },
  {
    name: 'Secure',
    price: '0.60 SOL',
    description: 'All authorities revoked',
    features: [
      { name: 'Everything in Basic', included: true },
      { name: 'Revoke Mint Authority', included: true },
      { name: 'Revoke Freeze Authority', included: true },
      { name: 'Revoke Update Authority', included: true },
      { name: 'Immutable Metadata', included: true },
      { name: 'Maximum Trust', included: true },
    ],
    button: 'Launch Secure',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    popular: false
  }
];

export default function PricingTable() {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Start for free on devnet. Pay only when you&apos;re ready to launch on mainnet.
            No subscriptions, no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-zinc-900 rounded-2xl p-8 border ${
                plan.popular
                  ? 'border-purple-500 shadow-lg shadow-purple-500/10'
                  : 'border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="inline-block bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
              </div>
              <p className="text-sm text-zinc-400">{plan.description}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-zinc-600 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-zinc-300' : 'text-zinc-500'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/create-mint"
                className={`block text-center mt-8 px-6 py-3 rounded-xl font-semibold text-white transition ${plan.buttonColor}`}
              >
                {plan.button}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Fee breakdown note */}
        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm flex items-center justify-center gap-2">
            <Info className="h-4 w-4" />
            Each authority revocation adds 0.15 SOL. 
            <Link href="/pricing" className="text-purple-400 hover:text-purple-300 underline">
              See full pricing breakdown
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
