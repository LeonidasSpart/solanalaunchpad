'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles, Globe, Lock, Shield, Zap, Loader2 } from 'lucide-react';

interface Token {
  name: string;
  symbol: string;
  description: string;
  mint: string;
  network: string;
  revoke_mint?: boolean;
  revoke_freeze?: boolean;
  revoke_update?: boolean;
  image_url?: string;
}

export default function FeaturedTokens() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const res = await fetch('/api/tokens?network=mainnet&limit=4');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTokens(data);
      } catch {
        setTokens([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, []);

  if (loading) {
    return (
      <section id="examples" className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Loader2 className="h-8 w-8 text-[#FF2D2D] animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  // Show real tokens if available, otherwise show educational examples
  const displayTokens = tokens.length > 0 ? tokens : [
    {
      name: 'Basic Token',
      symbol: 'BASIC',
      description: 'Standard SPL token with full metadata and branding. No authorities revoked.',
      mint: '',
      network: 'Example',
      revoke_mint: false,
      revoke_freeze: false,
      revoke_update: false,
    },
    {
      name: 'Secure Token',
      symbol: 'SECURE',
      description: 'Mint authority revoked. No new tokens can ever be created.',
      mint: '',
      network: 'Example',
      revoke_mint: true,
      revoke_freeze: false,
      revoke_update: false,
    },
    {
      name: 'Immutable Token',
      symbol: 'IMMUT',
      description: 'All authorities revoked. Maximum trust for holders.',
      mint: '',
      network: 'Example',
      revoke_mint: true,
      revoke_freeze: true,
      revoke_update: true,
    },
    {
      name: 'Community Token',
      symbol: 'COMM',
      description: 'Freeze authority kept for compliance. Mint revoked for trust.',
      mint: '',
      network: 'Example',
      revoke_mint: true,
      revoke_freeze: false,
      revoke_update: true,
    },
  ];

  const isReal = tokens.length > 0;

  return (
    <section id="examples" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2D2D]/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">
              {isReal ? 'Recently Launched' : 'Examples'}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            {isReal ? 'Community ' : 'Example '}
            <span className="text-[#FF2D2D]">Tokens</span>
          </h2>
          
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto">
            {isReal 
              ? 'Real tokens created by the ZRP community. All verifiable on-chain.'
              : 'See what your token will look like on Solana. From basic to fully secured.'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTokens.map((token, index) => (
            <motion.div
              key={token.mint || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-[#FF2D2D]/20 to-[#FF2D2D]/5 backdrop-blur-sm rounded-2xl border border-[#1a1a1a] group-hover:border-[#FF2D2D]/50 hover:shadow-2xl hover:shadow-[#FF2D2D]/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FF2D2D]/10 text-[#FF2D2D] border border-[#FF2D2D]/20">
                    <Globe className="h-2.5 w-2.5" />
                    {token.network}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      {token.image_url ? (
                        <img src={token.image_url} alt={token.name} className="w-12 h-12 rounded-xl object-cover" />
                      ) : (
                        ['🤖', '🪙', '🌙', '⭐'][index % 4]
                      )}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#FF2D2D] transition-all duration-300">
                        {token.name}
                      </h3>
                      <p className="text-xs font-mono text-[#BDDBDB]">${token.symbol}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[#BDDBDB] leading-relaxed mb-4 group-hover:text-white transition-colors duration-300 min-h-[40px]">
                    {token.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {token.revoke_mint && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-2 py-1 rounded-lg">
                        <Lock className="h-3 w-3 text-[#FF2D2D]" />
                        Mint Revoked
                      </span>
                    )}
                    {token.revoke_freeze && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-2 py-1 rounded-lg">
                        <Lock className="h-3 w-3 text-[#FF2D2D]" />
                        Freeze Revoked
                      </span>
                    )}
                    {token.revoke_update && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-2 py-1 rounded-lg">
                        <Shield className="h-3 w-3 text-[#FF2D2D]" />
                        Immutable
                      </span>
                    )}
                    {!token.revoke_mint && !token.revoke_freeze && !token.revoke_update && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-2 py-1 rounded-lg">
                        <Shield className="h-3 w-3 text-[#FF2D2D]" />
                        Standard
                      </span>
                    )}
                  </div>

                  {!isReal && (
                    <div className="inline-flex items-center gap-1.5 text-[10px] text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BDDBDB]" />
                      Example
                    </div>
                  )}
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-[#FF2D2D]/20 to-[#FF2D2D]/5 opacity-50" />

                {token.mint && (
                  <a
                    href={`https://solscan.io/token/${token.mint}${token.network === 'Devnet' ? '?cluster=devnet' : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100"
                  >
                    <span className="inline-flex items-center gap-1 text-xs text-white font-medium bg-[#FF2D2D]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <ExternalLink className="h-3 w-3" />
                      View on Explorer
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            href="/tokens"
            className="inline-flex items-center gap-2 text-[#FF2D2D] hover:text-[#B10000] font-medium transition group"
          >
            View All Tokens
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="mt-3 text-sm text-[#BDDBDB]">
            {isReal ? 'Browse all tokens created through ZRP' : 'Launch your own token today'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
