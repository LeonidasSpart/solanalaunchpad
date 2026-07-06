'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Gift,
  ArrowRight,
  CheckCircle,
  XCircle,
  TrendingUp,
  Shield,
  Zap,
  Info,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  BarChart3,
  Users,
  Lock,
  Unlock,
  FileText,
} from 'lucide-react';

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

// ─── Helper Functions ──────────────────────────────────────────────

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const formatDuration = (seconds: number) => {
  if (seconds === 0) return 'No cliff';
  const days = Math.floor(seconds / 86400);
  const months = Math.floor(days / 30);
  if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
  return `${days} day${days > 1 ? 's' : ''}`;
};

const formatNumber = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toFixed(2);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-400 bg-green-500/10 border-green-500/30';
    case 'completed': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    case 'pending': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    case 'cancelled': return 'text-[#FF2D2D] bg-[#FF2D2D]/10 border-[#FF2D2D]/30';
    default: return 'text-[#BDDBDB] bg-[#1a1a1a] border-[#1a1a1a]';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Active';
    case 'completed': return 'Completed';
    case 'pending': return 'Pending';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
};

// ─── Main Component ─────────────────────────────────────────────────

export default function VestingPage() {
  const { publicKey, connected } = useWallet();
  const [contracts, setContracts] = useState<VestingContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

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

  // ─── Stats ────────────────────────────────────────────────────────

  const totalContracts = contracts.length;
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const completedContracts = contracts.filter(c => c.status === 'completed').length;
  const totalLocked = contracts.reduce((sum, c) => sum + (c.total_amount - c.total_released), 0);
  const totalClaimable = contracts.reduce((sum, c) => sum + c.claimable, 0);

  // ─── Render ──────────────────────────────────────────────────────

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a] text-center">
          <Lock className="h-16 w-16 text-[#FF2D2D] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to view and manage your vesting schedules.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* ─── Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock className="h-5 w-5 text-[#FF2D2D]" />
            <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Vesting</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Token Vesting Schedules</h1>
          <p className="text-[#BDDBDB] mt-1">Lock tokens with cliff and vesting periods for team, advisors, or investors.</p>
        </div>
        <Link
          href="/vestinginfo/create"
          className="flex items-center gap-2 px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          Create Schedule
        </Link>
      </div>

      {/* ─── Stats ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
          <p className="text-[#BDDBDB] text-sm">Total Contracts</p>
          <p className="text-2xl font-bold text-white">{totalContracts}</p>
        </div>
        <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
          <p className="text-[#BDDBDB] text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400">{activeContracts}</p>
        </div>
        <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
          <p className="text-[#BDDBDB] text-sm">Total Locked</p>
          <p className="text-2xl font-bold text-white">{formatNumber(totalLocked)}</p>
        </div>
        <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
          <p className="text-[#BDDBDB] text-sm">Claimable</p>
          <p className="text-2xl font-bold text-[#FF2D2D]">{formatNumber(totalClaimable)}</p>
        </div>
      </div>

      {/* ─── Educational Section ───────────────────────────────────── */}
      <div className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] overflow-hidden mb-8">
        <button
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between p-4 hover:bg-[#1a1a1a]/50 transition"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-[#FF2D2D]" />
            <span className="text-white font-semibold">Understanding Token Vesting</span>
            <span className="text-[#BDDBDB] text-xs opacity-50">— Why it matters</span>
          </div>
          {expandedSections.includes('education') ? (
            <ChevronUp className="h-5 w-5 text-[#BDDBDB]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#BDDBDB]" />
          )}
        </button>

        {expandedSections.includes('education') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-6 space-y-6 text-[#BDDBDB] text-sm leading-relaxed"
          >
            {/* What is Vesting */}
            <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-2">What is Token Vesting?</h3>
              <p>
                Token vesting is the gradual release of cryptocurrency tokens to stakeholders over a predetermined period.
                Rather than distributing all tokens at once, vesting locks tokens and releases them incrementally based on
                time elapsed, milestones achieved, or a combination of both.
              </p>
              <p className="mt-2">
                Vesting applies primarily to <span className="text-white">founders and core team members</span>,
                <span className="text-white"> early-stage investors</span>, and
                <span className="text-white"> advisors</span> — ensuring sustained commitment and preventing
                immediate dumping after launch.
              </p>
            </div>

            {/* Why It Matters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-[#FF2D2D]" />
                  <h4 className="text-white font-semibold">Supply Management</h4>
                </div>
                <p className="text-xs">
                  Vesting spreads selling pressure over time, allowing natural demand to absorb supply gradually.
                  Projects with weak vesting experience <span className="text-[#FF2D2D]">40-60% higher price volatility</span>.
                </p>
              </div>
              <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-[#FF2D2D]" />
                  <h4 className="text-white font-semibold">Long-Term Alignment</h4>
                </div>
                <p className="text-xs">
                  The standard <span className="text-white">4-year vesting</span> period for teams mirrors
                  traditional tech equity vesting, creating accountability through extended lock-in periods.
                </p>
              </div>
              <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-[#FF2D2D]" />
                  <h4 className="text-white font-semibold">Trust Signal</h4>
                </div>
                <p className="text-xs">
                  Projects with aggressive vesting schedules signal confidence in long-term value creation.
                  Short vesting periods often indicate founders prioritizing quick exits over sustainable growth.
                </p>
              </div>
            </div>

            {/* Key Components */}
            <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-3">Key Components of a Vesting Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium">🏔️ Cliff Period</p>
                  <p className="text-xs text-[#BDDBDB]">Waiting period before any tokens unlock.</p>
                  <ul className="text-xs text-[#BDDBDB] mt-1 list-disc list-inside opacity-70">
                    <li>Team: 12 months (85% of projects)</li>
                    <li>Investors: 6-12 months</li>
                    <li>Advisors: 6 months</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium">⏳ Vesting Duration</p>
                  <p className="text-xs text-[#BDDBDB]">Total period over which tokens fully unlock.</p>
                  <ul className="text-xs text-[#BDDBDB] mt-1 list-disc list-inside opacity-70">
                    <li>Team: 3-4 years (most common is 4 years)</li>
                    <li>Investors: 2-3 years</li>
                    <li>Advisors: 12-24 months</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium">📊 TGE Unlock</p>
                  <p className="text-xs text-[#BDDBDB]">Percentage available immediately at launch.</p>
                  <ul className="text-xs text-[#BDDBDB] mt-1 list-disc list-inside opacity-70">
                    <li>Conservative: 5-15%</li>
                    <li>Aggressive: 30-50%</li>
                    <li className="text-[#FF2D2D]">Unlocks &gt;25% correlate with 72% price decline</li>
                  </ul>
                </div>
                <div>
                  <p className="text-white font-medium">🔄 Vesting Frequency</p>
                  <p className="text-xs text-[#BDDBDB]">How often tokens unlock after the cliff.</p>
                  <ul className="text-xs text-[#BDDBDB] mt-1 list-disc list-inside opacity-70">
                    <li>Daily: Most granular</li>
                    <li>Monthly: Common standard</li>
                    <li>Quarterly: Small periodic bumps</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Red Flags */}
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-[#FF2D2D]" />
                <h3 className="text-[#FF2D2D] font-semibold">Red Flags to Avoid</h3>
              </div>
              <ul className="text-xs text-[#BDDBDB] space-y-1 list-disc list-inside">
                <li>No cliff period for team or investors — allows immediate selling post-launch</li>
                <li>Vesting duration under 24 months for core team — insufficient commitment</li>
                <li>TGE unlock exceeding 30% of total supply — excessive immediate selling pressure</li>
                <li>Opaque or missing smart contract implementation — vesting is a promise, not a guarantee</li>
                <li>Large unlocks concentrated in short windows — monthly unlocks &gt;5% of circulating supply</li>
              </ul>
            </div>

            {/* Best Practices */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <h3 className="text-green-400 font-semibold">Best Practices</h3>
              </div>
              <ul className="text-xs text-[#BDDBDB] space-y-1 list-disc list-inside">
                <li>Match industry standards: 4-year team vesting with 1-year cliff</li>
                <li>Align vesting across stakeholder groups — team vesting should meet or exceed investor vesting</li>
                <li>Prioritize smooth unlock curves — avoid large step-function unlocks</li>
                <li>Implement on-chain enforcement — deploy audited smart contracts</li>
                <li>Maintain transparency — publish clear documentation of all vesting schedules</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* ─── Dashboard ─────────────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] overflow-hidden">
        <button
          onClick={() => toggleSection('dashboard')}
          className="w-full flex items-center justify-between p-4 hover:bg-[#1a1a1a]/50 transition"
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-[#FF2D2D]" />
            <span className="text-white font-semibold">Your Vesting Contracts</span>
            <span className="text-[#BDDBDB] text-xs opacity-50">— {totalContracts} schedules</span>
          </div>
          {expandedSections.includes('dashboard') ? (
            <ChevronUp className="h-5 w-5 text-[#BDDBDB]" />
          ) : (
            <ChevronDown className="h-5 w-5 text-[#BDDBDB]" />
          )}
        </button>

        {expandedSections.includes('dashboard') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-4 pb-6"
          >
            {loading ? (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#BDDBDB]">Loading vesting schedules...</p>
              </div>
            ) : error ? (
              <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
                <p className="text-[#FF2D2D]">{error}</p>
              </div>
            ) : contracts.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="h-12 w-12 text-[#BDDBDB] opacity-30 mx-auto mb-4" />
                <p className="text-[#BDDBDB] text-lg">No vesting schedules found.</p>
                <p className="text-[#BDDBDB] text-sm mt-2">
                  Create a new vesting schedule to lock tokens for your team or investors.
                </p>
                <Link
                  href="/vestinginfo/create"
                  className="inline-block mt-4 px-6 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition"
                >
                  Create Vesting Schedule
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {contracts.map((contract) => {
                  const isCreator = contract.creator_wallet === publicKey?.toBase58();
                  const progress = contract.total_amount > 0
                    ? Math.min((contract.total_released / contract.total_amount) * 100, 100)
                    : 0;

                  return (
                    <motion.div
                      key={contract.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#050505] rounded-xl p-5 border border-[#1a1a1a] hover:border-[#FF2D2D]/20 transition"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        {/* Left: Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg font-bold text-white">
                              {isCreator ? '📤 Created' : '📥 Beneficiary'}
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(contract.status)}`}>
                              {getStatusLabel(contract.status)}
                            </span>
                          </div>
                          <p className="text-[#BDDBDB] text-xs font-mono mt-1">
                            {contract.token_mint.slice(0, 8)}...{contract.token_mint.slice(-8)}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
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
                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-[#BDDBDB] mb-1">
                              <span>Progress</span>
                              <span>{progress.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-[#1a1a1a] rounded-full h-1.5">
                              <div
                                className="bg-[#FF2D2D] h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3 mt-3 text-xs text-[#BDDBDB] opacity-70">
                            <span>⏱️ Cliff: {formatDuration(contract.cliff_duration)}</span>
                            <span>📈 Vesting: {formatDuration(contract.vesting_duration)}</span>
                            <span>📅 Start: {formatDate(contract.start_time)}</span>
                            {contract.release_frequency > 0 && (
                              <span>🔄 Every: {formatDuration(contract.release_frequency)}</span>
                            )}
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex flex-col items-end gap-2 min-w-[120px]">
                          {!isCreator && contract.claimable > 0 && contract.status === 'active' && (
                            <button
                              onClick={() => handleClaim(contract.id)}
                              disabled={claiming === contract.id}
                              className="w-full px-4 py-2 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white rounded-xl transition text-sm font-medium flex items-center justify-center gap-2"
                            >
                              {claiming === contract.id ? (
                                'Claiming...'
                              ) : (
                                <>
                                  <Unlock className="h-3.5 w-3.5" />
                                  Claim {contract.claimable.toFixed(2)}
                                </>
                              )}
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
                            href={`/vestinginfo/${contract.id}`}
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
          </motion.div>
        )}
      </div>

      {/* ─── CTA ────────────────────────────────────────────────────── */}
      <div className="mt-12 bg-gradient-to-r from-[#FF2D2D]/10 via-transparent to-[#FF2D2D]/5 rounded-2xl border border-[#FF2D2D]/20 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Ready to Lock Your Tokens?</h2>
        <p className="text-[#BDDBDB] text-sm max-w-xl mx-auto mb-4">
          Create a vesting schedule to build trust with your community and align long-term incentives.
        </p>
        <Link
          href="/vestinginfo/create"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
        >
          <Plus className="h-4 w-4" />
          Create Vesting Schedule
        </Link>
      </div>
    </div>
  );
}
