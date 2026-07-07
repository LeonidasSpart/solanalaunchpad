'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreateProjectPage() {
  const { publicKey, connected } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    token_mint: '',
    token_symbol: '',
    token_name: '',
    token_supply: '',
    token_price: '',
    hard_cap: '',
    soft_cap: '',
    start_time: '',
    end_time: '',
    min_contribution: '0',
    max_contribution: '0',
    fee_percentage: '3',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    logo_url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        ...form,
        creator_wallet: publicKey.toBase58(),
        token_supply: parseFloat(form.token_supply),
        token_price: parseFloat(form.token_price),
        hard_cap: parseFloat(form.hard_cap),
        soft_cap: form.soft_cap ? parseFloat(form.soft_cap) : null,
        min_contribution: parseFloat(form.min_contribution),
        max_contribution: parseFloat(form.max_contribution),
        fee_percentage: parseFloat(form.fee_percentage),
        start_time: new Date(form.start_time).toISOString(),
        end_time: new Date(form.end_time).toISOString(),
      };

      const res = await fetch('/api/launchpad/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create project');

      setSuccess(`Project created! ID: ${data.id}`);
      setTimeout(() => router.push(`/launchpad/${data.id}`), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a]">
          <Plus className="h-16 w-16 text-[#FF2D2D] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to create a launchpad project.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/launchpad" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Launchpad
      </Link>

      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <h1 className="text-2xl font-bold text-white mb-2">Create Launchpad Project</h1>
        <p className="text-[#BDDBDB] text-sm mb-6">Fill in the details below. Your project will be reviewed by admins.</p>

        {error && (
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4 text-[#FF2D2D] text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 mb-4 text-green-400 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-1">Token Mint Address *</label>
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
              <label className="text-white text-sm font-medium block mb-1">Token Symbol *</label>
              <input
                type="text"
                name="token_symbol"
                value={form.token_symbol}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                placeholder="e.g., ZRP"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium block mb-1">Token Name *</label>
            <input
              type="text"
              name="token_name"
              value={form.token_name}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              placeholder="e.g., ZRP Token"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-1">Token Supply *</label>
              <input
                type="number"
                name="token_supply"
                value={form.token_supply}
                onChange={handleChange}
                required
                step="any"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Token Price (SOL) *</label>
              <input
                type="number"
                name="token_price"
                value={form.token_price}
                onChange={handleChange}
                required
                step="any"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                placeholder="e.g., 0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-1">Hard Cap (SOL) *</label>
              <input
                type="number"
                name="hard_cap"
                value={form.hard_cap}
                onChange={handleChange}
                required
                step="any"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Soft Cap (SOL)</label>
              <input
                type="number"
                name="soft_cap"
                value={form.soft_cap}
                onChange={handleChange}
                step="any"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-1">Start Time *</label>
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
              <label className="text-white text-sm font-medium block mb-1">End Time *</label>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-1">Min Contribution (SOL)</label>
              <input
                type="number"
                name="min_contribution"
                value={form.min_contribution}
                onChange={handleChange}
                step="any"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Max Contribution (SOL)</label>
              <input
                type="number"
                name="max_contribution"
                value={form.max_contribution}
                onChange={handleChange}
                step="any"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Platform Fee %</label>
              <input
                type="number"
                name="fee_percentage"
                value={form.fee_percentage}
                onChange={handleChange}
                step="0.1"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
              placeholder="Describe your project..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Logo URL</label>
              <input
                type="url"
                name="logo_url"
                value={form.logo_url}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm font-medium block mb-1">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={form.twitter}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                placeholder="@handle"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Telegram</label>
              <input
                type="text"
                name="telegram"
                value={form.telegram}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                placeholder="t.me/..."
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-1">Discord</label>
              <input
                type="text"
                name="discord"
                value={form.discord}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                placeholder="Discord invite"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                Create Project
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
