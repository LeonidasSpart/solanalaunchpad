'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface Proposal {
  id: number;
  title: string;
  description: string;
  token_mint: string;
  start_time: string;
  end_time: string;
  status: string;
  yes_votes: number;
  no_votes: number;
  total_voting_power: number;
}

export default function DaoPage() {
  const { connected, publicKey } = useWallet();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dao/proposals?status=active')
      .then(res => res.json())
      .then(data => { setProposals(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12 text-[#BDDBDB]">Loading proposals...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">🏛️ DAO Proposals</h1>
        <Link href="/dao/create" className="bg-[#FF2D2D] text-white px-4 py-2 rounded-lg hover:bg-[#B10000] transition">
          + Create Proposal
        </Link>
      </div>
      {proposals.length === 0 ? (
        <p className="text-gray-400">No active proposals.</p>
      ) : (
        <div className="space-y-4">
          {proposals.map(p => {
            const total = p.total_voting_power || 0;
            const yesPct = total > 0 ? (p.yes_votes / total) * 100 : 0;
            return (
              <Link key={p.id} href={`/dao/${p.id}`} className="block bg-[#0D0D0D] p-5 rounded-xl border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
                <h2 className="text-xl font-bold text-white">{p.title}</h2>
                <p className="text-[#BDDBDB] text-sm line-clamp-2">{p.description}</p>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="text-[#BDDBDB]">Votes: {total.toFixed(0)}</span>
                  <span className="text-green-400">Yes: {yesPct.toFixed(1)}%</span>
                  <span className="text-red-400">No: {(100 - yesPct).toFixed(1)}%</span>
                  <span className="text-[#BDDBDB] opacity-50">
                    {new Date(p.end_time) > new Date() ? `Ends ${new Date(p.end_time).toLocaleDateString()}` : 'Ended'}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
