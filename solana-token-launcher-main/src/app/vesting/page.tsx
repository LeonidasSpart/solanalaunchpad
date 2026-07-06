'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Gift, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface VestingContract {
  id: number;
  token_mint: string;
  creator_wallet: string;
  beneficiary_wallet: string;
  total_amount: number;
  total_released: number;
  cliff_duration: number;
  vesting_duration: number;
  release_frequency: number;
  start_time: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  claimable: number;
}

export default function VestingPage() {
  const { publicKey, connected } = useWallet();
  const [contracts, setContracts] = useState<VestingContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState<number | null>(null);

  const fetchContracts = async () => {
    if (!connected || !publicKey) {
      setContracts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/vesting/${publicKey.toBase58()}`);
      if (!res.ok) throw new Error('Failed to fetch vesting contracts');
      const data = await res.json();
      setContracts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [connected, publicKey]);

  const handleClaim = async (contractId: number) => {
    if (!publicKey) return;
    setClaiming(contractId);
    try {
      const res = await fetch('/api/vesting/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractId, beneficiary: publicKey.toBase58() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Claim failed');
      alert(`✅ Claim successful! TX: ${data.signature.slice(0, 8)}...`);
      await fetchContracts();
    } catch (err: any) {
      alert(`❌ ${err.message}`);
    } finally {
      setClaiming(null);
    }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  const formatDuration = (seconds: number) => {
    if (seconds === 0) return 'No cliff';
    const days = Math.floor(seconds / 86400);
    const months = Math.floor(days / 30);
    if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a]">
          <Gift className="h-16 w-16 text-[#FF2D2D] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to view and manage your vesting schedules.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto" />
        <p className="text-[#BDDBDB] mt-4">Loading vesting schedules...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Vesting</span>
          <h1 className="text-4xl font-bold text-white mt-1">Token Vesting Schedules</h1>
          <p className="text-[#BDDBDB] mt-1">Lock tokens with cliff and vesting periods for team, advisors, or investors.</p>
        </div>
        <Link
          href="/vesting/create"
          className="px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition flex items-center gap-2"
        >
          + Create Schedule
        </Link>
      </div>

      {error && (
        <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mb-6">
          <p className="text-[#FF2D2D]">{error}</p>
        </div>
      )}

      {contracts.length === 0 ? (
        <div className="bg-[#0D0D0D] rounded-xl p-12 border border-[#1a1a1a] text-center">
          <Gift className="h-12 w-12 text-[#BDDBDB] opacity-30 mx-auto mb-4" />
          <p className="text-[#BDDBDB] text-lg">No vesting schedules found.</p>
          <p className="text-[#BDDBDB] text-sm mt-2">Create a new vesting schedule to lock tokens for your team or investors.</p>
          <Link
            href="/vesting/create"
            className="inline-block mt-4 px-6 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition"
          >
            Create Vesting Schedule
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {contracts.map((contract) => {
            const isCreator = contract.creator_wallet === publicKey?.toBase58();
            return (
              <motion.div
                key={contract.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">
                        {isCreator ? '📤 Created' : '📥 Beneficiary'}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        contract.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        contract.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        contract.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-[#FF2D2D]/20 text-[#FF2D2D] border border-[#FF2D2D]/30'
                      }`}>
                        {contract.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[#BDDBDB] text-sm font-mono mt-1">
                      {contract.token_mint.slice(0, 8)}...{contract.token_mint.slice(-8)}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-sm">
                      <div>
                        <p className="text-[#BDDBDB] opacity-50 text-xs">Total</p>
                        <p className="text-white font-medium">{contract.total_amount.toLocaleString()} tokens</p>
                      </div>
                      <div>
                        <p className="text-[#BDDBDB] opacity-50 text-xs">Released</p>
                        <p className="text-white font-medium">{contract.total_released.toLocaleString()} tokens</p>
                      </div>
                      <div>
                        <p className="text-[#BDDBDB] opacity-50 text-xs">Claimable</p>
                        <p className="text-[#FF2D2D] font-bold">{contract.claimable.toLocaleString()} tokens</p>
                      </div>
                      <div>
                        <p className="text-[#BDDBDB] opacity-50 text-xs">Beneficiary</p>
                        <p className="text-white font-mono text-xs truncate">{contract.beneficiary_wallet}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#BDDBDB]">
                      <span>⏱️ Cliff: {formatDuration(contract.cliff_duration)}</span>
                      <span>📈 Vesting: {formatDuration(contract.vesting_duration)}</span>
                      <span>📅 Start: {formatDate(contract.start_time)}</span>
                      {contract.release_frequency > 0 && (
                        <span>🔄 Frequency: {formatDuration(contract.release_frequency)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {!isCreator && contract.claimable > 0 && contract.status === 'active' && (
                      <button
                        onClick={() => handleClaim(contract.id)}
                        disabled={claiming === contract.id}
                        className="px-4 py-2 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white rounded-xl transition text-sm font-medium flex items-center gap-2"
                      >
                        {claiming === contract.id ? 'Claiming...' : `Claim ${contract.claimable.toFixed(2)} tokens`}
                      </button>
                    )}
                    {isCreator && contract.status === 'pending' && (
                      <p className="text-yellow-400 text-sm">Awaiting token transfer</p>
                    )}
                    {contract.status === 'completed' && (
                      <span className="text-green-400 text-sm flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" /> Fully vested
                      </span>
                    )}
                    <Link
                      href={`/vesting/${contract.id}`}
                      className="text-[#FF2D2D] hover:text-[#B10000] text-sm flex items-center gap-1 transition"
                    >
                      Details <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
