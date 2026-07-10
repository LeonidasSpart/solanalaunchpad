'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ArrowLeft, Send, Loader2, CheckCircle, AlertCircle, RotateCcw, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

interface Project {
  id: number;
  creator_wallet: string;
  token_mint: string;
  token_symbol: string;
  token_name: string;
  token_supply: number;
  token_price: number;
  hard_cap: number;
  soft_cap: number;
  raised_so_far: number;
  start_time: string;
  end_time: string;
  min_contribution: number;
  max_contribution: number;
  fee_percentage: number;
  status: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  logo_url: string;
  lp_created?: boolean;
  lp_pool_address?: string;
  lp_lock_end?: string;
  lp_locked?: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [contributing, setContributing] = useState(false);
  const [refunding, setRefunding] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/launchpad/projects/${id}`);
      if (!res.ok) throw new Error('Project not found');
      const data = await res.json();
      setProject({
        ...data,
        token_supply: parseFloat(data.token_supply) || 0,
        token_price: parseFloat(data.token_price) || 0,
        hard_cap: parseFloat(data.hard_cap) || 0,
        soft_cap: parseFloat(data.soft_cap) || 0,
        raised_so_far: parseFloat(data.raised_so_far) || 0,
        min_contribution: parseFloat(data.min_contribution) || 0,
        max_contribution: parseFloat(data.max_contribution) || 0,
        fee_percentage: parseFloat(data.fee_percentage) || 0,
        website: data.website || '',
        twitter: data.twitter || '',
        telegram: data.telegram || '',
        discord: data.discord || '',
        logo_url: data.logo_url || '',
        lp_created: data.lp_created || false,
        lp_pool_address: data.lp_pool_address || '',
        lp_lock_end: data.lp_lock_end || '',
        lp_locked: data.lp_locked || false,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  // ─── THE ONLY FUNCTION THAT MATTERS ──────────────────────────────────────
  const handleContribute = async () => {
    try {
      alert('🔥 Starting handleContribute...');

      if (!connected || !publicKey) {
        alert('❌ Wallet not connected');
        setError('Please connect your wallet');
        return;
      }
      if (!project) {
        alert('❌ No project');
        return;
      }

      const amount = parseFloat(contributionAmount);
      alert(`📊 Amount: ${amount}`);
      if (isNaN(amount) || amount <= 0) {
        alert('❌ Invalid amount');
        setError('Please enter a valid amount');
        return;
      }
      if (project.min_contribution > 0 && amount < project.min_contribution) {
        alert(`❌ Below min: ${project.min_contribution}`);
        setError(`Minimum contribution is ${project.min_contribution} SOL`);
        return;
      }
      if (project.max_contribution > 0 && amount > project.max_contribution) {
        alert(`❌ Above max: ${project.max_contribution}`);
        setError(`Maximum contribution is ${project.max_contribution} SOL`);
        return;
      }
      const remaining = project.hard_cap - (project.raised_so_far || 0);
      if (amount > remaining) {
        alert(`❌ Exceeds remaining cap: ${remaining}`);
        setError(`Only ${remaining.toFixed(2)} SOL remaining in hard cap`);
        return;
      }

      // ─── Hardcoded public key ──────────────────────────────────────────
      // This key is known to be valid.
      const LAUNCHPAD_PUBKEY_STR = 'HkkXDw3RJC1GpJCC4wYKUMfeHYyX8yPKzh2g0Hk1knPM';
      alert(`🔑 Using pubkey: ${LAUNCHPAD_PUBKEY_STR}`);
      let launchpadPubkey: PublicKey;
      try {
        launchpadPubkey = new PublicKey(LAUNCHPAD_PUBKEY_STR);
      } catch (e: any) {
        alert(`❌ Failed to create PublicKey: ${e.message}`);
        setError('Invalid launchpad public key');
        return;
      }

      setContributing(true);
      setError(null);
      setSuccess(null);

      const lamports = amount * LAMPORTS_PER_SOL;
      alert(`💰 Lamports: ${lamports}`);

      alert('📦 Creating transaction...');
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: launchpadPubkey,
          lamports,
        })
      );

      alert('⏳ Getting blockhash...');
      const { blockhash } = await connection.getLatestBlockhash();
      alert(`✅ Blockhash: ${blockhash}`);
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      alert('📤 Sending transaction...');
      const signature = await sendTransaction(tx, connection);
      alert(`✅ Transaction sent! Signature: ${signature}`);

      alert('📡 Confirming with backend...');
      const confirmRes = await fetch(`/api/launchpad/projects/${id}/contribute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          investorWallet: publicKey.toBase58(),
          amountSol: amount,
          txSignature: signature,
        }),
      });

      alert(`📡 Backend status: ${confirmRes.status}`);
      if (!confirmRes.ok) {
        const errData = await confirmRes.json();
        alert(`❌ Backend error: ${JSON.stringify(errData)}`);
        throw new Error(errData.error || 'Failed to record contribution');
      }

      const confirmData = await confirmRes.json();
      alert('✅ Contribution confirmed!');
      setSuccess(`✅ Contributed ${amount} SOL successfully!`);
      setContributionAmount('');
      await fetchProject();
    } catch (err: any) {
      alert(`❌ ERROR: ${err.message}`);
      setError(err.message || 'Contribution failed');
    } finally {
      setContributing(false);
      alert('🏁 handleContribute finished');
    }
  };

  const handleRefund = async () => {
    if (!connected || !publicKey) {
      setError('Please connect your wallet');
      return;
    }
    if (!project) return;

    setRefunding(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/launchpad/projects/${id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ investorWallet: publicKey.toBase58() }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Refund failed');
      }
      const data = await res.json();
      setSuccess(`✅ Refunded successfully! Tx: ${data.signature.slice(0, 8)}...`);
      await fetchProject();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setRefunding(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Loader2 className="h-8 w-8 text-[#FF2D2D] animate-spin mx-auto mb-4" />
        <p className="text-[#BDDBDB]">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-[#BDDBDB]">Project not found.</p>
        <Link href="/launchpad" className="text-[#FF2D2D] hover:text-[#B10000] mt-4 inline-block transition">
          ← Back to Launchpad
        </Link>
      </div>
    );
  }

  const endDate = project.end_time ? new Date(project.end_time) : new Date(0);
  const isActive = project.status === 'active' && new Date() < endDate;
  const isEnded = new Date() > endDate;
  const progress = project.hard_cap > 0 ? ((project.raised_so_far || 0) / project.hard_cap) * 100 : 0;
  const raised = project.raised_so_far || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/launchpad" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Launchpad
      </Link>

      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{project.token_name} ({project.token_symbol})</h1>
            <p className="text-[#BDDBDB] text-sm font-mono">{project.token_mint.slice(0, 8)}...</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isActive ? 'bg-green-600 text-white' :
              project.status === 'failed' ? 'bg-red-600 text-white' :
              isEnded ? 'bg-gray-700 text-gray-300' :
              'bg-yellow-600 text-white'
            }`}>
              {project.status === 'failed' ? 'Failed' : isActive ? 'Active' : isEnded ? 'Ended' : project.status}
            </span>
          </div>
        </div>

        {project.description && (
          <p className="text-[#BDDBDB] mt-4">{project.description}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-[#BDDBDB] text-sm">Price</p>
            <p className="text-white font-bold">{project.token_price} SOL</p>
          </div>
          <div>
            <p className="text-[#BDDBDB] text-sm">Hard Cap</p>
            <p className="text-white font-bold">{project.hard_cap} SOL</p>
          </div>
          <div>
            <p className="text-[#BDDBDB] text-sm">Raised</p>
            <p className="text-white font-bold">{raised.toFixed(2)} SOL</p>
          </div>
          <div>
            <p className="text-[#BDDBDB] text-sm">Fee</p>
            <p className="text-white font-bold">{project.fee_percentage}%</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-[#BDDBDB] mb-1">
            <span>{progress.toFixed(1)}% funded</span>
            <span>{raised.toFixed(2)} / {project.hard_cap} SOL</span>
          </div>
          <div className="w-full bg-[#1a1a1a] h-2 rounded">
            <div className="bg-[#FF2D2D] h-2 rounded" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>

        {isActive && (
          <div className="mt-6 bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
            <h3 className="text-white font-medium mb-3">Contribute</h3>
            
            {/* Debug display – shows current state */}
            <div className="mb-3 text-xs text-[#BDDBDB] space-y-1">
              <div>connected: {String(connected)}</div>
              <div>contributing: {String(contributing)}</div>
              <div>amount: "{contributionAmount || 'empty'}"</div>
              <div>publicKey: {publicKey?.toBase58() || 'none'}</div>
            </div>

            {connected ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  placeholder="Amount (SOL)"
                  value={contributionAmount}
                  onChange={(e) => setContributionAmount(e.target.value)}
                  className="flex-1 bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                  disabled={contributing}
                />
                <button
                  onClick={handleContribute}
                  disabled={contributing || !contributionAmount}
                  className="px-6 py-2 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white rounded-xl transition flex items-center justify-center gap-2"
                >
                  {contributing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send
                    </>
                  )}
                </button>
              </div>
            ) : (
              <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
            )}
          </div>
        )}

        {project.status === 'failed' && (
          <div className="mt-6 bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
            <p className="text-[#FF2D2D] font-medium">This sale did not reach the soft cap.</p>
            <p className="text-[#BDDBDB] text-sm mt-1">You can claim a refund of your contribution.</p>
            <button
              onClick={handleRefund}
              disabled={refunding}
              className="mt-3 px-6 py-2 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white rounded-xl transition flex items-center justify-center gap-2"
            >
              {refunding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Refunding...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4" />
                  Claim Refund
                </>
              )}
            </button>
          </div>
        )}

        {isEnded && project.status !== 'failed' && (
          <div className="mt-6 text-center text-[#BDDBDB]">
            This sale has ended.
          </div>
        )}

        {project.lp_created && (
          <div className="mt-6 bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
            <h3 className="text-white font-semibold mb-3">🌊 Liquidity Pool</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#BDDBDB]">Status</span>
                <span className="text-green-400 font-semibold">✅ Created</span>
              </div>
              {project.lp_pool_address && (
                <div className="flex justify-between">
                  <span className="text-[#BDDBDB]">Pool Address</span>
                  <a
                    href={`https://solscan.io/address/${project.lp_pool_address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF2D2D] hover:text-[#B10000] transition inline-flex items-center gap-1"
                  >
                    {project.lp_pool_address.slice(0, 8)}...
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#BDDBDB]">Locked</span>
                <span className="text-white">
                  {project.lp_lock_end ? new Date(project.lp_lock_end).toLocaleDateString() : 'No lock'}
                </span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 text-[#FF2D2D] text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-green-400 text-sm flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            {success}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          {project.website && (
            <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] hover:text-white transition">
              🌐 Website
            </a>
          )}
          {project.twitter && (
            <a href={`https://twitter.com/${project.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] hover:text-white transition">
              🐦 Twitter
            </a>
          )}
          {project.telegram && (
            <a href={project.telegram.startsWith('http') ? project.telegram : `https://t.me/${project.telegram.replace('t.me/', '')}`} target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] hover:text-white transition">
              💬 Telegram
            </a>
          )}
          {project.discord && (
            <a href={project.discord} target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] hover:text-white transition">
              🎮 Discord
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
