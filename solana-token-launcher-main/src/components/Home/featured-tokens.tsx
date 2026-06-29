'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Star } from 'lucide-react';

const tokens = [
  {
    name: 'ZRPDEEPSEEK',
    symbol: 'ZDP',
    price: '$1.23',
    change: '+12.5%',
    icon: '🤖',
    color: 'from-purple-500/20 to-purple-600/5'
  },
  {
    name: 'SolToken',
    symbol: 'SOLT',
    price: '$32.45',
    change: '+8.2%',
    icon: '🪙',
    color: 'from-blue-500/20 to-blue-600/5'
  },
  {
    name: 'LunaToken',
    symbol: 'LUN',
    price: '$0.89',
    change: '+5.7%',
    icon: '🌙',
    color: 'from-emerald-500/20 to-emerald-600/5'
  },
  {
    name: 'StarToken',
    symbol: 'STR',
    price: '$1.23',
    change: '-2.1%',
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
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Featured</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
            Popular Tokens <span className="text-purple-400">Launched on ZRP</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Discover some of the most popular tokens created by our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokens.map((token, index) => {
            const isPositive = token.change.startsWith('+');
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
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <ArrowUpRight className={`h-3 w-3 ${isPositive ? '' : 'rotate-180'}`} />
                      {token.change}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{token.price}</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <Star className="h-3 w-3 text-yellow-400/30" />
                    </div>
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
