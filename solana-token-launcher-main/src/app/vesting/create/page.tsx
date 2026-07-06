'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Users, Coins } from 'lucide-react';

export default function CreateVestingPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [form, setForm] = useState({
    tokenMint: '',
    beneficiary: '',
    totalAmount: '',
    cliffDays: '0',
    vestingDays: '365',
    frequencyDays: '30',
    startDate: new Date().toISOString().slice(0, 16),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      setError('Please connect your wallet');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/vesting/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenMint: form.tokenMint,
          creator: publicKey.toBase58(),
          beneficiary: form.beneficiary,
          totalAmount: parseFloat(form.totalAmount),
          cliffDuration: parseInt(form.cliffDays) * 86400,
          vestingDuration: parseInt(form.vestingDays) * 86400,
          releaseFrequency: parseInt(form.frequencyDays) * 86400,
          startTime: new Date(form.startDate),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create');
      alert('✅ Vesting contract created!');
      router.push('/vesting');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a]">
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to create a vesting schedule.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-[#BDDBDB] hover:text-white transition">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-white">Create Vesting Schedule</h1>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-white text-sm font-medium block mb-1.5">Token Mint Address</label>
            <input
              type="text"
              name="tokenMint"
              value={form.tokenMint}
              onChange={handleChange}
              placeholder="e.g. So11111111111111111111111111111111111111112"
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium block mb-1.5">Beneficiary Wallet</label>
            <input
              type="text"
              name="beneficiary"
              value={form.beneficiary}
              onChange={handleChange}
              placeholder="Enter Solana wallet address"
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium block mb-1.5">Total Amount (tokens)</label>
            <input
              type="number"
              name="totalAmount"
              value={form.totalAmount}
              onChange={handleChange}
              placeholder="e.g. 1000000"
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-1.5">Cliff (days)</label>
              <input
                type="number"
                name="cliffDays"
                value={form.cliffDays}
                onChange={handleChange}
                min="0"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF2D2D]"
              />
              <p className="text-[#BDDBDB] text-xs mt-1">0 = no cliff</p>
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1.5">Vesting (days)</label>
              <input
                type="number"
                name="vestingDays"
                value={form.vestingDays}
                onChange={handleChange}
                min="1"
                required
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium block mb-1.5">Release Frequency (days)</label>
            <input
              type="number"
              name="frequencyDays"
              value={form.frequencyDays}
              onChange={handleChange}
              min="1"
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium block mb-1.5">Start Date & Time</label>
            <input
              type="datetime-local"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>

          {error && <p className="text-[#FF2D2D] text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
          >
            {loading ? 'Creating...' : 'Create Vesting Schedule'}
          </button>

          <p className="text-[#BDDBDB] text-xs text-center mt-2">
            Tokens will be locked in the platform wallet. Beneficiary can claim vested tokens over time.
          </p>
        </form>
      </div>
    </div>
  );
}
