'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Activity, 
  ArrowRight, 
  ExternalLink, 
  Globe, 
  Clock
} from 'lucide-react';

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
    <section id="activity" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF2D2D]/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <Activity className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">Token Activity</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Example <span className="text-[#FF2D2D]">Activity Feed</span>
          </h2>
          
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto">
            This is how the live token feed will look once tokens are created through ZRP.
          </p>
        </motion.div>

        {/* Token Feed Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#0D0D0D]/50 backdrop-blur-sm rounded-2xl border border-[#1a1a1a] overflow-hidden shadow-2xl shadow-[#FF2D2D]/5"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#1a1a1a]/50 text-xs font-semibold text-[#BDDBDB] uppercase tracking-wider border-b border-[#1a1a1a]">
            <div className="col-span-4 sm:col-span-3">Token</div>
            <div className="col-span-2 hidden sm:block">Symbol</div>
            <div className="col-span-3 sm:col-span-2">Network</div>
            <div className="col-span-3 sm:col-span-2">Status</div>
            <div className="col-span-2 sm:col-span-2 hidden sm:block text-right">Time</div>
            <div className="col-span-2 sm:col-span-1 text-right">View</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#1a1a1a]/50">
            {tokens.map((token, index) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="group px-6 py-4 hover:bg-[#1a1a1a]/40 transition-all duration-300"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Token Name */}
                  <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF2D2D]/20 to-[#FF2D2D]/5 flex items-center justify-center border border-[#FF2D2D]/20 group-hover:border-[#FF2D2D]/40 transition-all">
                      <span className="text-[#FF2D2D] font-bold text-sm">{token.symbol[0]}</span>
                    </div>
                    <div className="text-white font-semibold text-sm group-hover:text-[#FF2D2D] transition-colors">
                      {token.name}
                    </div>
                  </div>

                  {/* Symbol */}
                  <div className="col-span-2 hidden sm:block">
                    <span className="text-[#BDDBDB] font-mono text-sm font-medium">${token.symbol}</span>
                  </div>

                  {/* Network */}
                  <div className="col-span-3 sm:col-span-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                      token.network === 'Mainnet'
                        ? 'bg-[#FF2D2D]/10 text-[#FF2D2D] border-[#FF2D2D]/20'
                        : 'bg-[#FF2D2D]/10 text-[#FF2D2D] border-[#FF2D2D]/20'
                    }`}>
                      <Globe className="h-3 w-3" />
                      {token.network}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-3 sm:col-span-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border bg-[#FF2D2D]/10 text-[#FF2D2D] border-[#FF2D2D]/20">
                      Example
                    </span>
                  </div>

                  {/* Time */}
                  <div className="col-span-2 sm:col-span-2 hidden sm:block text-right">
                    <span className="text-[#BDDBDB] text-xs flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                      {token.timestamp}
                    </span>
                  </div>

                  {/* View Link */}
                  <div className="col-span-2 sm:col-span-1 text-right">
                    <button className="text-[#BDDBDB] hover:text-[#FF2D2D] transition-colors p-2 rounded-lg hover:bg-[#FF2D2D]/10">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-[#1a1a1a]/30 border-t border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#BDDBDB]">
                Showing example data
              </div>
              <Link
                href="/tokens"
                className="inline-flex items-center gap-2 text-sm text-[#FF2D2D] hover:text-[#B10000] font-medium transition-colors group"
              >
                View All Tokens
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
