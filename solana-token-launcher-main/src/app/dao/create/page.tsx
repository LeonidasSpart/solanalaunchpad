'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreateProposal() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    token_mint: '',
    title: '',
    description: '',
    start_time: '',
    end_time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      alert('Connect wallet');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/dao/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          creator_wallet: publicKey.toBase58(),
          start_time: new Date(form.start_time).toISOString(),
          end_time: new Date(form.end_time).toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Failed to create');
      const data = await res.json();
      router.push(`/dao/${data.id}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
          <p className="text-white mb-4">Connect your wallet to create a proposal.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/dao" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Proposals
      </Link>
      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <h1 className="text-2xl font-bold text-white mb-4">Create Proposal</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm block mb-1">Token Mint (for voting)</label>
            <input
              type="text"
              name="token_mint"
              value={form.token_mint}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              placeholder="e.g., G3jfij3Uz..."
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm block mb-1">Start Time</label>
              <input
                type="datetime-local"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
            <div>
              <label className="text-white text-sm block mb-1">End Time</label>
              <input
                type="datetime-local"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white font-semibold rounded-xl transition"
          >
            {loading ? 'Creating...' : 'Create Proposal'}
          </button>
        </form>
      </div>
    </div>
  );
}
