'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Info } from 'lucide-react';

const tokens = [
  {
    name: 'ExampleToken',
    symbol: 'EXMPL',
    description: 'Basic token with standard metadata',
    icon: '🤖',
    color: 'from-purple-500/20 to-purple-600/5'
  },
  {
    name: 'DemoCoin',
    symbol: 'DEMO',
    description: 'Token with revoked mint authority',
    icon: '🪙',
    color: 'from-blue-500/20 to-blue-600/5'
  },
  {
    name: 'TestToken',
    symbol: 'TEST',
    description: 'Token with all authorities revoked',
    icon: '🌙',
    color: 'from-emerald-500/20 to-emerald-600/5'
  },
  {
    name: 'SampleCoin',
    symbol: 'SMPL',
    description: 'Token with full branding and social links',
    icon: '⭐',
    color: 'from-yellow-500/20 to-yellow-600/5'
  },
];

export default function FeaturedTokens() {
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
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Examples</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Example <span className="text-purple-400">Token Previews</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            These are example tokens showing what your token could look like on Solana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokens.map((token, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${token.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 group-hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{token.icon}</span>
                      <div>
                        <h3 className="text-white font-bold text-lg">{token.name}</h3>
                        <p className="text-zinc-500 text-xs">{token.symbol}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                      <Info className="h-3 w-3" />
                      <span>Example</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-zinc-400 text-sm">{token.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="/tokens"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition"
          >
            View All Tokens
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
