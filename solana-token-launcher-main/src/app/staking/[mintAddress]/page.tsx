'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Unlock, Coins, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { PublicKey, Transaction } from '@solana/web3.js';

interface StakingPool {
  id: number;
  token_mint: string;
  token_symbol: string;
  token_name: string;
  apy: number;
  lock_duration: number;
  min_stake: number;
  max_stake: number;
  total_staked: number;
  is_active: boolean;
}

interface StakingPosition {
  id: number;
  amount: number;
  reward_earned: number;
  reward_claimed: number;
  staked_at: string;
  unlocked_at: string | null;
}

export default function StakePage() {
  const params = useParams();
  const router = useRouter();
  const mintAddress = params.mintAddress as string;

  const { publicKey, connected, signTransaction } = useWallet();
  const { connection } = useConnection();

  const [pool, setPool] = useState<StakingPool | null>(null);
  const [position, setPosition] = useState<StakingPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [staking, setStaking] = useState(false);
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    if (!connected || !publicKey) {
      setLoading(false);
      return;
    }

    try {
      // Fetch pool
      const poolRes = await fetch(`/api/staking/pools/${mintAddress}`);
      if (poolRes.ok) {
        const poolData = await poolRes.json();
        setPool(poolData);
      }

      // Fetch user position
      const posRes = await fetch(`/api/staking/positions?wallet=${publicKey.toBase58()}&mint=${mintAddress}`);
      if (posRes.ok) {
        const posData = await posRes.json();
        setPosition(posData);
      }

      // Fetch token balance
      try {
        const mintPubkey = new PublicKey(mintAddress);
        const ata = await getAssociatedTokenAddress(mintPubkey, publicKey);
        const accountInfo = await getAccount(connection, ata);
        const balance = Number(accountInfo.amount) / Math.pow(10, 9); // Assuming 9 decimals
        setBalance(balance);
      } catch {
        setBalance(0);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [connected, publicKey, mintAddress]);

  const handleStake = async () => {
    if (!publicKey || !signTransaction || !pool) {
      setError('Please connect your wallet');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (amountNum < pool.min_stake) {
      setError(`Minimum stake is ${pool.min_stake} tokens`);
      return;
    }

    if (amountNum > pool.max_stake) {
      setError(`Maximum stake is ${pool.max_stake} tokens`);
      return;
    }

    if (amountNum > balance) {
      setError(`Insufficient balance. You have ${balance.toFixed(2)} tokens`);
      return;
    }

    setStaking(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/staking/stake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poolId: pool.id,
          userWallet: publicKey.toBase58(),
          amount: amountNum,
          mintAddress: mintAddress,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Stake failed');

      // Check if we need to sign a transaction
      if (data.transaction) {
        // Decode transaction and sign
        const txBuffer = Buffer.from(data.transaction, 'base64');
        const tx = Transaction.from(txBuffer);
        const signed = await signTransaction(tx);
        const signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);

        // Confirm stake on backend
        const confirmRes = await fetch('/api/staking/stake/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            poolId: pool.id,
            userWallet: publicKey.toBase58(),
            signature,
          }),
        });

        if (!confirmRes.ok) throw new Error('Failed to confirm stake');
      }

      setSuccess(`✅ Successfully staked ${amountNum} ${pool.token_symbol}!`);
      setAmount('');
      await fetchData();
    } catch (err: any) {
      setError(err.message || 'Stake failed');
    } finally {
      setStaking(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-2xl p-12 border border-[#1a1a1a]">
          <Lock className="h-16 w-16 text-[#FF2D2D] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to stake tokens.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <Loader2 className="h-8 w-8 text-[#FF2D2D] animate-spin mx-auto mb-4" />
        <p className="text-[#BDDBDB]">Loading staking pool...</p>
      </div>
    );
  }

  if (!pool) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-[#BDDBDB]">Staking pool not found.</p>
        <Link href="/staking" className="text-[#FF2D2D] hover:text-[#B10000] mt-4 inline-block transition">
          ← Back to Staking
        </Link>
      </div>
    );
  }

  const isStaked = position && position.amount > 0;
  const rewards = position ? position.reward_earned - position.reward_claimed : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/staking" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Staking
      </Link>

      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{pool.token_name || pool.token_symbol}</h1>
            <p className="text-[#BDDBDB] text-sm">{pool.token_symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-[#FF2D2D] font-bold text-2xl">{pool.apy}%</p>
            <p className="text-[#BDDBDB] text-xs">APY</p>
          </div>
        </div>

        {error && (
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />
            <p className="text-[#FF2D2D] text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 mb-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#050505] rounded-xl p-3 text-center border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-xs">Total Staked</p>
            <p className="text-white font-bold">{pool.total_staked.toFixed(2)}</p>
          </div>
          <div className="bg-[#050505] rounded-xl p-3 text-center border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-xs">Your Balance</p>
            <p className="text-white font-bold">{balance.toFixed(2)}</p>
          </div>
          <div className="bg-[#050505] rounded-xl p-3 text-center border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-xs">Your Stake</p>
            <p className="text-white font-bold">{isStaked ? position.amount.toFixed(2) : '0.00'}</p>
          </div>
        </div>

        {isStaked && rewards > 0 && (
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-[#BDDBDB] text-sm">Available Rewards</p>
              <p className="text-[#FF2D2D] font-bold text-lg">{rewards.toFixed(4)} {pool.token_symbol}</p>
            </div>
            <button
              onClick={() => alert('Claim rewards functionality coming soon!')}
              className="px-4 py-2 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-xl transition text-sm font-medium"
            >
              Claim Rewards
            </button>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-white font-medium block mb-1.5">Amount to Stake</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Min: ${pool.min_stake} | Max: ${pool.max_stake}`}
                className="flex-1 bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
                disabled={staking}
              />
              <button
                onClick={() => setAmount(Math.min(balance, pool.max_stake).toString())}
                className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] rounded-xl border border-[#1a1a1a] transition"
              >
                Max
              </button>
            </div>
            <p className="text-[#BDDBDB] text-xs mt-1">
              Min: {pool.min_stake} • Max: {pool.max_stake.toLocaleString()} • Balance: {balance.toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleStake}
            disabled={staking || !amount || parseFloat(amount) <= 0}
            className="w-full py-4 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            {staking ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Staking...
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                Stake {pool.token_symbol}
              </>
            )}
          </button>
        </div>

        {isStaked && (
          <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
            <button
              onClick={() => alert('Unstake functionality coming soon!')}
              className="w-full py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] rounded-xl transition border border-[#1a1a1a] flex items-center justify-center gap-2"
            >
              <Unlock className="h-5 w-5" />
              Unstake All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
