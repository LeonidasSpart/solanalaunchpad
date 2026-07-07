'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Proposal {
  id: number;
  creator_wallet: string;
  token_mint: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  status: string;
  yes_votes: number;
  no_votes: number;
  total_voting_power: number;
}

export default function ProposalDetail() {
  const params = useParams();
  const id = params.id as string;
  const { publicKey, connected } = useWallet();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState('');

  const fetchProposal = async () => {
    try {
      const res = await fetch(`/api/dao/proposals/${id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      setProposal(data);
    } catch (err) {
      setError('Failed to load proposal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposal();
  }, [id]);

  const handleVote = async (vote: boolean) => {
    if (!connected || !publicKey) {
      alert('Connect wallet to vote');
      return;
    }
    setVoting(true);
    try {
      const res = await fetch(`/api/dao/proposals/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voter_wallet: publicKey.toBase58(), vote }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Vote failed');
      }
      await fetchProposal();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setVoting(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-[#BDDBDB]">Loading...</div>;
  if (error || !proposal) return <div className="text-red-500 text-center py-12">{error || 'Proposal not found'}</div>;

  const total = proposal.total_voting_power || 0;
  const yesPct = total > 0 ? (proposal.yes_votes / total) * 100 : 0;
  const isActive = new Date() >= new Date(proposal.start_time) && new Date() <= new Date(proposal.end_time);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/dao" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Proposals
      </Link>
      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <h1 className="text-2xl font-bold text-white">{proposal.title}</h1>
        <p className="text-[#BDDBDB] mt-2">{proposal.description}</p>
        <div className="mt-4 flex gap-4 text-sm text-[#BDDBDB]">
          <span>Status: <strong>{proposal.status}</strong></span>
          <span>Token: {proposal.token_mint.slice(0, 8)}...</span>
          <span>Ends: {new Date(proposal.end_time).toLocaleString()}</span>
        </div>

        <div className="mt-6 bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
          <div className="flex justify-between text-sm">
            <span className="text-[#BDDBDB]">Yes: {proposal.yes_votes.toFixed(0)} ({yesPct.toFixed(1)}%)</span>
            <span className="text-[#BDDBDB]">No: {proposal.no_votes.toFixed(0)} ({(100 - yesPct).toFixed(1)}%)</span>
          </div>
          <div className="w-full bg-[#1a1a1a] h-2 rounded mt-1">
            <div className="bg-green-500 h-2 rounded" style={{ width: `${yesPct}%` }} />
          </div>
        </div>

        {isActive && connected ? (
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => handleVote(true)}
              disabled={voting}
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-xl transition flex items-center justify-center gap-2"
            >
              <ThumbsUp className="h-4 w-4" /> Vote Yes
            </button>
            <button
              onClick={() => handleVote(false)}
              disabled={voting}
              className="flex-1 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl transition flex items-center justify-center gap-2"
            >
              <ThumbsDown className="h-4 w-4" /> Vote No
            </button>
          </div>
        ) : isActive && !connected ? (
          <div className="mt-6 text-center text-[#BDDBDB]">
            Connect your wallet to vote.
          </div>
        ) : (
          <div className="mt-6 text-center text-[#BDDBDB]">Voting period is closed.</div>
        )}
      </div>
    </div>
  );
}
