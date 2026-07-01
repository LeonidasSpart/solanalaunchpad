import { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Shield, Settings, TrendingUp, ArrowRight, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create Utility Token on Solana | ZRP Token Launcher',
  description: 'Launch governance and utility tokens on Solana. Controlled supply, vesting-ready, transparent tokenomics. Free devnet testing.',
  keywords: 'utility token creator, governance token solana, create dao token, solana token launcher',
  openGraph: {
    title: 'Create Utility Token on Solana | ZRP',
    description: 'Governance-ready tokens with controlled supply.',
    images: ['/og-image.png'],
  },
};

export default function UtilityTokenPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-6">
            <Settings className="w-4 h-4" />
            ⚙️ Governance Ready
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Build a{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
              Utility Token
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Create governance and utility tokens with controlled supply. 
            Keep mint authority for vesting schedules. Built for serious projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create-mint?template=utility"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg transition-all"
            >
              <Rocket className="w-5 h-5" />
              Launch Utility Token
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
          <h2 className="text-3xl font-bold text-center mb-12">Built for Real Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">10M Supply</h3>
              <p className="text-zinc-400 text-sm">Controlled supply for sustainable tokenomics and governance.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Settings className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">6 Decimals</h3>
              <p className="text-zinc-400 text-sm">Standard precision for trading, staking, and micro-transactions.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Shield className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vesting Ready</h3>
              <p className="text-zinc-400 text-sm">Keep mint authority for team vesting and treasury management.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Authority Configuration</h2>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-semibold mb-1">Mint Authority</h3>
                <p className="text-sm text-yellow-400">✓ Retained</p>
                <p className="text-xs text-zinc-500 mt-1">For future minting & vesting</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-1">Freeze Authority</h3>
                <p className="text-sm text-green-400">✓ Revoked</p>
                <p className="text-xs text-zinc-500 mt-1">No account freezing</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-1">Update Authority</h3>
                <p className="text-sm text-green-400">✓ Revoked</p>
                <p className="text-xs text-zinc-500 mt-1">Immutable metadata</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-zinc-400 mb-8">Test free on devnet. Launch on mainnet for 0.45 SOL.</p>
          <Link
            href="/create-mint?template=utility"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg transition-all"
          >
            <Rocket className="w-5 h-5" />
            Create Utility Token
          </Link>
        </div>
      </section>
    </div>
  );
}
