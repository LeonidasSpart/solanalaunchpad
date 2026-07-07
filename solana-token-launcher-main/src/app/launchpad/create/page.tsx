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
    // Premium fields
    whitelist_enabled: false,
    kyc_enabled: false,
    tiered: false,
    rounds: '',          // JSON string
    tier_config: '',     // JSON string
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
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
      // Parse JSON fields if provided
      let rounds = null;
      let tierConfig = null;
      if (form.rounds.trim()) {
        try { rounds = JSON.parse(form.rounds); } catch { throw new Error('Invalid rounds JSON'); }
      }
      if (form.tier_config.trim()) {
        try { tierConfig = JSON.parse(form.tier_config); } catch { throw new Error('Invalid tier_config JSON'); }
      }

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
        whitelist_enabled: form.whitelist_enabled,
        kyc_enabled: form.kyc_enabled,
        tiered: form.tiered,
        rounds: rounds,
        tier_config: tierConfig,
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
          {/* ... existing fields ... */}
          {/* (I'm omitting the existing fields for brevity – keep your current ones) */}

          {/* ─── Premium Features ──────────────────────────────────── */}
          <div className="border-t border-[#1a1a1a] pt-4 mt-4">
            <h3 className="text-white font-medium mb-3">Premium Features</h3>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  name="whitelist_enabled"
                  checked={form.whitelist_enabled}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#FF2D2D]"
                />
                Enable Whitelist
              </label>
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  name="kyc_enabled"
                  checked={form.kyc_enabled}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#FF2D2D]"
                />
                Enable KYC
              </label>
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  name="tiered"
                  checked={form.tiered}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#FF2D2D]"
                />
                Tiered Participation
              </label>
            </div>

            {form.tiered && (
              <div className="mt-3">
                <label className="text-white text-sm block mb-1">Tier Configuration (JSON)</label>
                <textarea
                  name="tier_config"
                  value={form.tier_config}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] font-mono text-sm focus:outline-none focus:border-[#FF2D2D]"
                  placeholder='[{"tier":"Bronze","min_hold":100,"allocation":50},{"tier":"Silver","min_hold":500,"allocation":200}]'
                />
                <p className="text-[#BDDBDB] text-xs mt-1">Each tier: tier name, minimum token hold, max allocation in SOL.</p>
              </div>
            )}

            <div className="mt-3">
              <label className="text-white text-sm block mb-1">Rounds (JSON) – optional</label>
              <textarea
                name="rounds"
                value={form.rounds}
                onChange={handleChange}
                rows={3}
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] font-mono text-sm focus:outline-none focus:border-[#FF2D2D]"
                placeholder='[{"name":"Seed","price":0.005,"cap":50},{"name":"Public","price":0.01,"cap":200}]'
              />
              <p className="text-[#BDDBDB] text-xs mt-1">Round name, price per token, and cap in SOL.</p>
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
