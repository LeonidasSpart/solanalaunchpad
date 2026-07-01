import { Metadata } from 'next';
import Link from 'next/link';
import { Rocket, Shield, Landmark, Vote, ArrowRight, Users, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create DAO Governance Token on Solana | ZRP',
  description: 'Launch DAO governance tokens on Solana. Delegation support, voting-ready, transparent treasury. Free devnet testing.',
  keywords: 'dao token creator, governance token solana, create dao, solana dao launcher',
  openGraph: {
    title: 'Create DAO Governance Token | ZRP',
    description: 'Voting-ready governance tokens for your DAO.',
    images: ['/og-image.png'],
  },
};

export default function GovernanceDAOPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
            <Landmark className="w-4 h-4" />
            🏛️ DAO Ready
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Launch Your{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              DAO Governance
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Create governance tokens with delegation support. 
            100M supply, voting-ready, built for decentralized communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create-mint?template=governance"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-lg transition-all"
            >
              <Rocket className="w-5 h-5" />
              Launch DAO Token
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
          <h2 className="text-3xl font-bold text-center mb-12">Built for Decentralized Governance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Vote className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">100M Supply</h3>
              <p className="text-zinc-400 text-sm">Optimal for governance distribution and voting power allocation.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Users className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Delegation Ready</h3>
              <p className="text-zinc-400 text-sm">Token holders can delegate voting power. Snapshot compatible.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <Landmark className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Treasury Control</h3>
              <p className="text-zinc-400 text-sm">Keep mint authority for treasury management and grants.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">DAO-Optimized Settings</h2>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="font-semibold mb-1">Mint Authority</h3>
                <p className="text-sm text-yellow-400">✓ Retained</p>
                <p className="text-xs text-zinc-500 mt-1">Treasury & grants</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-1">Freeze Authority</h3>
                <p className="text-sm text-green-400">✓ Revoked</p>
                <p className="text-xs text-zinc-500 mt-1">No censorship</p>
              </div>
              <div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <Vote className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-1">Update Authority</h3>
                <p className="text-sm text-green-400">✓ Revoked</p>
                <p className="text-xs text-zinc-500 mt-1">Immutable governance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your DAO</h2>
          <p className="text-zinc-400 mb-8">Test free on devnet. Launch on mainnet for 0.45 SOL.</p>
          <Link
            href="/create-mint?template=governance"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-lg transition-all"
          >
            <Rocket className="w-5 h-5" />
            Create DAO Token
          </Link>
        </div>
      </section>
    </div>
  );
}
