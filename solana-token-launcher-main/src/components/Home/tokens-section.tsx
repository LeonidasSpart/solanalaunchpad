'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Shield, Sparkles, Globe, Lock } from 'lucide-react';

interface Token {
  mint_address: string;
  name: string;
  symbol: string;
  description: string;
  network: string;
  features: string[];
  icon: string;
  image_url?: string;
}

const TokensSection = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch('/api/tokens');
        const data = await response.json();
        
        // Map real tokens to display format
        const formattedTokens = data.map((token: any) => ({
          mint_address: token.mint_address,
          name: token.name,
          symbol: token.symbol,
          description: token.description || 'A token created on ZRP',
          network: token.network || 'Devnet',
          features: ['SPL Token', 'Metaplex Metadata'],
          icon: token.symbol[0],
          image_url: token.image_url || '',
        }));
        
        setTokens(formattedTokens);
      } catch (error) {
        console.error('Failed to fetch tokens:', error);
        // Fallback to real tokens from your database
        setTokens([
          {
            mint_address: 'GJ3ifj3UzKEsN1YZ2WEeP3Ss1QWVaNJAi6c3qwQYfPv5',
            name: 'Turbo Lazar',
            symbol: 'ZLB',
            description: 'A token created on ZRP',
            network: 'Devnet',
            features: ['SPL Token', 'Metaplex Metadata'],
            icon: 'Z',
          },
          {
            mint_address: '3wJ2d1DUcMEamsHhKMezkaFrmqSsV14zviBQbEkXxFg6',
            name: 'Zoea',
            symbol: 'WQZ',
            description: 'A token created on ZRP',
            network: 'Devnet',
            features: ['SPL Token', 'Metaplex Metadata'],
            icon: 'W',
          },
          {
            mint_address: '4AdLsic4h29Vo2F63T4CqpSpLZcotjtbhD9XrX...',
            name: 'Sultana',
            symbol: 'SOY',
            description: 'A token created on ZRP',
            network: 'Devnet',
            features: ['SPL Token', 'Metaplex Metadata'],
            icon: 'S',
          },
          {
            mint_address: 'GKwx8jQtPAUGvCCVbv1kYa5W7cvS3CJYWzh...',
            name: 'Tikatika',
            symbol: 'TKA',
            description: 'A token created on ZRP',
            network: 'Devnet',
            features: ['SPL Token', 'Metaplex Metadata'],
            icon: 'T',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  if (loading) {
    return (
      <section id="tokens" className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#BDDBDB]">Loading tokens...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="tokens" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#FF2D2D]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#FF2D2D]/[0.03] rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">Live Tokens</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Tokens Created on <span className="text-[#FF2D2D]">ZRP</span>
          </h2>
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto">
            See real tokens launched by the ZRP community.
          </p>
        </motion.div>

        {/* Token Cards Grid */}
        {tokens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#BDDBDB]">No tokens created yet. Be the first!</p>
            <Link
              href="/create-mint"
              className="inline-block mt-4 px-6 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition"
            >
              Create Your Token
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tokens.map((token, index) => (
              <motion.div
                key={token.mint_address}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative bg-gradient-to-br from-[#FF2D2D]/20 to-[#FF2D2D]/5 backdrop-blur-sm rounded-2xl border border-[#1a1a1a] group-hover:border-[#FF2D2D]/50 hover:shadow-2xl hover:shadow-[#FF2D2D]/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Network Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FF2D2D]/10 text-[#FF2D2D]">
                    <Globe className="h-3 w-3" />
                    {token.network}
                  </span>
                </div>

                <div className="p-7">
                  {/* Token Icon & Info */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-[#FF2D2D]/10 group-hover:bg-[#FF2D2D]/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <span className="text-2xl font-bold text-[#FF2D2D]">{token.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#FF2D2D] transition-all duration-300">
                        {token.name}
                      </h3>
                      <p className="text-sm font-mono text-[#BDDBDB]">${token.symbol}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#BDDBDB] leading-relaxed mb-5 group-hover:text-white transition-colors duration-300">
                    {token.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {token.features.map((feature, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-2.5 py-1 rounded-lg"
                      >
                        <Shield className="h-3 w-3 text-[#BDDBDB]" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* View on Solscan Link */}
                  <a
                    href={`https://solscan.io/address/${token.mint_address}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#BDDBDB] bg-[#0D0D0D] border border-[#1a1a1a] px-3 py-1.5 rounded-full hover:border-[#FF2D2D]/30 transition"
                  >
                    View on Solscan →
                  </a>
                </div>

                {/* Bottom gradient line */}
                <div className="h-1 w-full bg-gradient-to-r from-[#FF2D2D]/20 to-[#FF2D2D]/5 opacity-50" />
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Button 
            asChild 
            size="lg"
            className="bg-[#FF2D2D] hover:bg-[#B10000] text-white border-0 rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-[#FF2D2D]/25 hover:shadow-[#FF2D2D]/40 transition-all duration-300 group"
          >
            <Link href="/tokens" className="inline-flex items-center gap-2">
              View All Tokens
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-[#BDDBDB]">
            See real tokens created by the ZRP community
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TokensSection;
