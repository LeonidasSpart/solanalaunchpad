import { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Zap, Code, ArrowRight, Settings, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create Simple Token on Solana | ZRP Token Launcher',
  description: 'Quick and simple Solana token creation. 1M supply, 9 decimals, perfect for testing or private use. Free devnet.',
  keywords: 'simple token creator, test token solana, create spl token, solana devnet token',
  openGraph: {
    title: 'Create Simple Token on Solana | ZRP',
    description: 'Quick token creation for testing or private use.',
    images: ['/og-image.png'],
  },
};

export default function SimpleTokenPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-6">
            <Zap className="w-4 h-4" />
            🚀 Quick Start
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Create a{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Simple Token
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Fast token creation for testing, experiments, or private use. 
            1M supply, 9 decimals, minimal configuration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create-mint?template=simple"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-lg transition-all"
            >
              <Rocket className="w-5 h-5" />
              Create Simple Token
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

      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Minimal & Fast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Zap className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">1M Supply</h3>
              <p className="text-zinc-400 text-sm">Small supply for testing, experiments, or limited distribution.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Code className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">9 Decimals</h3>
              <p className="text-zinc-400 text-sm">Maximum precision for micro-transactions and fractional ownership.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Settings className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Update Retained</h3>
              <p className="text-zinc-400 text-sm">Keep update authority for metadata changes during testing.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Configuration</h2>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-1">Mint Authority</h3>
                <p className="text-sm text-green-400">✓ Revoked</p>
                <p className="text-xs text-zinc-500 mt-1">Fixed supply</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-1">Freeze Authority</h3>
                <p className="text-sm text-green-400">✓ Revoked</p>
                <p className="text-xs text-zinc-500 mt-1">No freezing</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-semibold mb-1">Update Authority</h3>
                <p className="text-sm text-yellow-400">✓ Retained</p>
                <p className="text-xs text-zinc-500 mt-1">Editable metadata</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Quick Test?</h2>
          <p className="text-zinc-400 mb-8">Test free on devnet. Launch on mainnet for 0.15 SOL.</p>
          <Link
            href="/create-mint?template=simple"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-lg transition-all"
          >
            <Rocket className="w-5 h-5" />
            Create Simple Token
          </Link>
        </div>
      </section>
    </div>
  );
}
