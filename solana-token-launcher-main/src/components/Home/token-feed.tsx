'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Token {
  id: string;
  name: string;
  symbol: string;
  network: string;
  timestamp: string;
}

export default function TokenFeed() {
  const [tokens] = useState<Token[]>([
    { id: '1', name: 'ExampleToken', symbol: 'EXMPL', network: 'Devnet', timestamp: 'Example' },
    { id: '2', name: 'DemoCoin', symbol: 'DEMO', network: 'Devnet', timestamp: 'Example' },
    { id: '3', name: 'TestToken', symbol: 'TEST', network: 'Mainnet', timestamp: 'Example' },
    { id: '4', name: 'SampleCoin', symbol: 'SMPL', network: 'Devnet', timestamp: 'Example' }
  ]);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">🪙 Example Activity</h2>
          <p className="text-zinc-400">This is how the live token feed will look once tokens are created</p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-zinc-800/50 text-sm font-semibold text-zinc-400 border-b border-zinc-800">
            <div>Token</div>
            <div>Symbol</div>
            <div>Network</div>
            <div className="text-right">Status</div>
          </div>

          <div className="divide-y divide-zinc-800">
            {tokens.map((token, index) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-4 flex items-center justify-between text-sm hover:bg-zinc-800/30 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-purple-400 font-semibold">{token.name}</span>
                </div>
                <div className="text-zinc-300">{token.symbol}</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    token.network === 'Mainnet'
                      ? 'bg-green-900/50 text-green-400'
                      : 'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {token.network}
                  </span>
                </div>
                <div className="text-zinc-500 text-right text-xs italic">{token.timestamp}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/tokens"
            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition"
          >
            View All Tokens →
          </Link>
        </div>
      </div>
    </section>
  );
}
