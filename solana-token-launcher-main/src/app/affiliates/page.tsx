'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Users, 
  Coins, 
  TrendingUp, 
  Gift,
  Crown,
  Share2,
  Twitter,
  Send,
  Link as LinkIcon,
} from 'lucide-react';

interface AffiliateData {
  stats: {
    total_referrals: number;
    total_commission: number;
    claimed_commission: number;
  };
  recentReferrals: any[];
  leaderboard: any[];
  referralLink: string;
  milestones: any[];
  rank: number;
  analytics: {
    totalClicks: number;
    uniqueSignups: number;
    conversions: number;
    conversionRate: number;
  };
}

export default function AffiliatePage() {
  const { publicKey, connected } = useWallet();
  const [data, setData] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);

  const walletAddress = publicKey?.toBase58() || '';

  useEffect(() => {
    if (connected && walletAddress) {
      fetchData();
    } else {
      setData(null);
      setLoading(false);
    }
  }, [connected, walletAddress]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/affiliate/stats?wallet=${walletAddress}`);
      if (!res.ok) throw new Error('Failed to load affiliate data');
      const data = await res.json();
      setData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (data?.referralLink) {
      await navigator.clipboard.writeText(data.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClaim = async () => {
    setClaiming(true);
    try {
      const res = await fetch('/api/affiliate/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: walletAddress }),
      });
      const result = await res.json();
      if (result.success) {
        await fetchData();
        alert(result.message);
      } else {
        alert(result.message || 'No commissions to claim');
      }
    } catch (err) {
      alert('Failed to claim commissions');
    } finally {
      setClaiming(false);
    }
  };

  const shareOnTwitter = () => {
    const text = `🚀 Create your own Solana token in 60 seconds with @ZRP_AI!\n\nNo code needed. Launch on mainnet or test for free on devnet.\n\nStart creating today: ${data?.referralLink}\n\n#Solana #SPLToken #Crypto`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = `🚀 Create your own Solana token in 60 seconds with ZRP!\n\nNo code needed. Launch on mainnet or test for free on devnet.\n\nStart creating today: ${data?.referralLink}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(data?.referralLink || '')}&text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a]">
          <Users className="h-16 w-16 text-[#FF2D2D] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to view your affiliate dashboard and start earning SOL.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#BDDBDB]">Loading affiliate dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-[#FF2D2D]">{error}</p>
        <button onClick={fetchData} className="mt-4 text-[#FF2D2D] hover:text-[#B10000] transition">
          Try again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-[#BDDBDB]">No affiliate data found.</p>
      </div>
    );
  }

  const unclaimed = data.stats.total_commission - data.stats.claimed_commission;

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Affiliate Program</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Earn SOL by <span className="text-[#FF2D2D]">Sharing ZRP</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Refer users to ZRP and earn 15% commission on every token they create.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6 mb-8"
      >
        {/* Row 1: Core Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] text-center">
            <Users className="h-6 w-6 text-[#FF2D2D] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{data.stats.total_referrals}</p>
            <p className="text-[#BDDBDB] text-sm">Total Referrals</p>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] text-center">
            <Coins className="h-6 w-6 text-[#FF2D2D] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{data.stats.total_commission.toFixed(4)} SOL</p>
            <p className="text-[#BDDBDB] text-sm">Total Earned</p>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] text-center">
            <Gift className="h-6 w-6 text-[#FF2D2D] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{unclaimed.toFixed(4)} SOL</p>
            <p className="text-[#BDDBDB] text-sm">Unclaimed</p>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] text-center">
            <TrendingUp className="h-6 w-6 text-[#FF2D2D] mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">#{data.rank || '—'}</p>
            <p className="text-[#BDDBDB] text-sm">Leaderboard Rank</p>
          </div>
        </div>

        {/* 📊 Row 2: Analytics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#0D0D0D]/50 rounded-xl p-5 border border-[#1a1a1a] text-center">
            <p className="text-2xl font-bold text-[#BDDBDB]">{data.analytics.totalClicks}</p>
            <p className="text-[#BDDBDB] text-xs opacity-70">Link Clicks</p>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl p-5 border border-[#1a1a1a] text-center">
            <p className="text-2xl font-bold text-[#BDDBDB]">{data.analytics.uniqueSignups}</p>
            <p className="text-[#BDDBDB] text-xs opacity-70">Unique Sign-ups</p>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl p-5 border border-[#1a1a1a] text-center">
            <p className="text-2xl font-bold text-[#BDDBDB]">{data.analytics.conversions}</p>
            <p className="text-[#BDDBDB] text-xs opacity-70">Token Created</p>
          </div>
          <div className="bg-[#FF2D2D]/5 border border-[#FF2D2D]/20 rounded-xl p-5 text-center">
            <p className="text-2xl font-bold text-[#FF2D2D]">
              {data.analytics.conversionRate.toFixed(1)}%
            </p>
            <p className="text-[#BDDBDB] text-xs opacity-70">Conversion Rate</p>
          </div>
        </div>
      </motion.div>

      {/* Referral Link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1a1a1a] mb-8"
      >
        <h3 className="text-white font-semibold mb-3">Your Referral Link</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-[#050505] rounded-xl px-4 py-3 border border-[#1a1a1a] flex items-center">
            <LinkIcon className="h-4 w-4 text-[#BDDBDB] mr-2 flex-shrink-0" />
            <span className="text-[#BDDBDB] text-sm truncate">{data.referralLink}</span>
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={shareOnTwitter}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] rounded-lg transition flex items-center justify-center gap-2"
          >
            <Twitter className="h-4 w-4" />
            Share on X
          </button>
          <button
            onClick={shareOnTelegram}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] rounded-lg transition flex items-center justify-center gap-2"
          >
            <Send className="h-4 w-4" />
            Share on Telegram
          </button>
          <button
            onClick={() => {
              if (data?.referralLink) {
                navigator.share?.({ title: 'Create Tokens on ZRP', url: data.referralLink });
              }
            }}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] rounded-lg transition flex items-center justify-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1a1a1a]"
        >
          <h3 className="text-white font-semibold mb-4">Milestones</h3>
          <div className="space-y-3">
            {data.milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  milestone.unlocked
                    ? 'bg-[#FF2D2D]/10 border-[#FF2D2D]/30'
                    : 'bg-[#050505] border-[#1a1a1a] opacity-50'
                }`}
              >
                <span className="text-[#BDDBDB] text-sm">{milestone.label}</span>
                <span className="text-sm font-medium text-[#FF2D2D]">
                  {milestone.unlocked ? '✅ Unlocked' : `${milestone.target - data.stats.total_referrals} left`}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Claim Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1a1a1a] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-white font-semibold mb-2">Claim Your Commission</h3>
            <p className="text-[#BDDBDB] text-sm mb-4">
              You have <span className="text-[#FF2D2D] font-semibold">{unclaimed.toFixed(4)} SOL</span> available to claim.
            </p>
          </div>
          <button
            onClick={handleClaim}
            disabled={claiming || unclaimed === 0}
            className="w-full px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition"
          >
            {claiming ? 'Claiming...' : `Claim ${unclaimed.toFixed(4)} SOL`}
          </button>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#0D0D0D] rounded-2xl border border-[#1a1a1a] overflow-hidden mt-8"
      >
        <div className="px-6 py-4 border-b border-[#1a1a1a] flex items-center gap-2">
          <Crown className="h-5 w-5 text-[#FF2D2D]" />
          <h3 className="text-white font-semibold">Leaderboard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1a1a]/30">
              <tr>
                <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">#</th>
                <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Wallet</th>
                <th className="px-6 py-3 text-right text-[#BDDBDB] font-medium">Referrals</th>
                <th className="px-6 py-3 text-right text-[#BDDBDB] font-medium">Commission</th>
              </tr>
            </thead>
            <tbody>
              {data.leaderboard.map((item, index) => {
                const isUser = item.wallet === walletAddress;
                return (
                  <tr
                    key={index}
                    className={`border-t border-[#1a1a1a]/50 ${
                      isUser ? 'bg-[#FF2D2D]/10' : 'hover:bg-[#1a1a1a]/20'
                    }`}
                  >
                    <td className="px-6 py-3 text-[#BDDBDB]">
                      {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </td>
                    <td className="px-6 py-3 text-white font-mono">
                      {isUser ? (
                        <span className="text-[#FF2D2D]">{item.wallet.slice(0, 6)}...{item.wallet.slice(-6)}</span>
                      ) : (
                        `${item.wallet.slice(0, 6)}...${item.wallet.slice(-6)}`
                      )}
                    </td>
                    <td className="px-6 py-3 text-[#BDDBDB] text-right">{item.total_referrals}</td>
                    <td className="px-6 py-3 text-[#BDDBDB] text-right">{item.total_commission.toFixed(4)} SOL</td>
                  </tr>
                );
              })}
              {data.leaderboard.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-[#BDDBDB] text-sm">
                    No referrals yet. Be the first!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Referrals */}
      {data.recentReferrals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#0D0D0D] rounded-2xl border border-[#1a1a1a] overflow-hidden mt-8"
        >
          <div className="px-6 py-4 border-b border-[#1a1a1a]">
            <h3 className="text-white font-semibold">Recent Referrals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1a1a1a]/30">
                <tr>
                  <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Wallet</th>
                  <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Status</th>
                  <th className="px-6 py-3 text-right text-[#BDDBDB] font-medium">Commission</th>
                  <th className="px-6 py-3 text-right text-[#BDDBDB] font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.recentReferrals.map((ref, index) => (
                  <tr key={index} className="border-t border-[#1a1a1a]/50">
                    <td className="px-6 py-3 text-white font-mono text-xs">
                      {ref.referred_wallet.slice(0, 6)}...{ref.referred_wallet.slice(-6)}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ref.status === 'claimed' ? 'bg-green-500/20 text-green-400' :
                        ref.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {ref.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#BDDBDB] text-right">{ref.commission_earned || 0} SOL</td>
                    <td className="px-6 py-3 text-[#BDDBDB] text-right">
                      {new Date(ref.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-12 text-center"
      >
        <p className="text-[#BDDBDB] text-sm">
          Share ZRP and start earning SOL today!
        </p>
      </motion.div>
    </div>
  );
}
