import { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Shield, Zap, TrendingUp, Flame, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create Meme Coin on Solana | ZRP Token Launcher',
  description: 'Launch viral meme coins on Solana in 60 seconds. No code, 1B supply, auto-revoke authorities. Free devnet testing. The #1 meme coin creator.',
  keywords: 'meme coin creator, solana meme token, create meme coin, pump.fun alternative, viral token',
  openGraph: {
    title: 'Create Meme Coin on Solana | ZRP',
    description: 'Launch viral meme coins in 60 seconds. No code required.',
    images: ['/og-image.png'],
  },
};

export default function MemeCoinPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6">
            <Flame className="w-4 h-4" />
            🔥 Most Popular Template
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Launch the Next{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Viral Meme Coin
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Create a Solana meme coin in 60 seconds. 1 billion supply, zero decimals, 
            all authorities revoked. The ultimate trust signal for your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create-mint?template=meme"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold text-lg transition-all"
            >
              <Rocket className="w-5 h-5" />
              Launch Meme Coin
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/create-mint"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-semibold transition-all"
            >
              Start from Scratch
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-configured Settings */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pre-Configured for Viral Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <TrendingUp className="w-8 h-8 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">1B Supply</h3>
              <p className="text-zinc-400 text-sm">Maximum supply for wide distribution and viral potential.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Zap className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">0 Decimals</h3>
              <p className="text-zinc-400 text-sm">Whole numbers only. No confusing fractions for your community.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Shield className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rug-Proof</h3>
              <p className="text-zinc-400 text-sm">Mint, freeze, and update authorities auto-revoked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">The Strongest Trust Signal</h2>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">✅ No Mint Authority</span>
              <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">✅ No Freeze Authority</span>
              <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">✅ Immutable Metadata</span>
            </div>
            <p className="text-zinc-400 max-w-xl mx-auto">
              When you burn LP tokens and revoke all authorities, you send the strongest possible 
              message: <span className="text-white font-semibold">this token cannot be rugged.</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Viral?</h2>
          <p className="text-zinc-400 mb-8">Test free on devnet. Launch on mainnet for 0.60 SOL.</p>
          <Link
            href="/create-mint?template=meme"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-xl font-semibold text-lg transition-all"
          >
            <Rocket className="w-5 h-5" />
            Create Meme Coin Now
          </Link>
        </div>
      </section>
    </div>
  );
}
