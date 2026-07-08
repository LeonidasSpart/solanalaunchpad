'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';

export default function CreateNFTCollection() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    description: '',
    royalty_basis_points: '0',
    max_supply: '',
    price_sol: '0',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      setError('Connect wallet first');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/nft/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          creator_wallet: publicKey.toBase58(),
          royalty_basis_points: parseInt(form.royalty_basis_points),
          max_supply: parseInt(form.max_supply),
          price_sol: parseFloat(form.price_sol),
        }),
      });
      if (!res.ok) throw new Error('Failed to create collection');
      const data = await res.json();
      router.push(`/nft/${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
          <p className="text-white mb-4">Connect your wallet to create an NFT collection.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/nft" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Collections
      </Link>
      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <h1 className="text-2xl font-bold text-white mb-4">Create NFT Collection</h1>
        {error && <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4 text-[#FF2D2D] text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm block mb-1">Collection Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Symbol *</label>
            <input
              type="text"
              name="symbol"
              value={form.symbol}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm block mb-1">Royalty (%)</label>
              <input
                type="number"
                name="royalty_basis_points"
                value={form.royalty_basis_points}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
            <div>
              <label className="text-white text-sm block mb-1">Max Supply *</label>
              <input
                type="number"
                name="max_supply"
                value={form.max_supply}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Price (SOL)</label>
            <input
              type="number"
              name="price_sol"
              value={form.price_sol}
              onChange={handleChange}
              step="0.01"
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
              placeholder="https://..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white font-semibold rounded-xl transition"
          >
            {loading ? 'Creating...' : 'Create Collection'}
          </button>
        </form>
      </div>
    </div>
  );
}
