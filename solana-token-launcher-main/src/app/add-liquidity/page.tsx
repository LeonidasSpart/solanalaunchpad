'use client';

import { useState, useContext, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';
import { NetworkContext } from '@/providers/providers';
import { motion } from 'framer-motion';
import { Coins, Wallet, Loader2, CheckCircle, AlertCircle, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getTokenDecimals, getTokenBalance } from '@/lib/token-helpers';

export default function AddLiquidityPage() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { network } = useContext(NetworkContext);
  const [tokenMint, setTokenMint] = useState('');
  const [solAmount, setSolAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [lockDuration, setLockDuration] = useState(180 * 24 * 60 * 60); // 6 months default
  const [loading, setLoading] = useState(false);
  const [tokenDecimals, setTokenDecimals] = useState<number | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [poolAddress, setPoolAddress] = useState('');
  const [lpMint, setLpMint] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({
    type: null,
    message: '',
  });

  // Fetch token info when mint changes
  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!tokenMint || tokenMint.length < 32) {
        setTokenDecimals(null);
        setTokenBalance(null);
        return;
      }

      try {
        const mintPubkey = new PublicKey(tokenMint);
        const decimals = await getTokenDecimals(connection, mintPubkey);
        setTokenDecimals(decimals);
        
        if (publicKey) {
          const balance = await getTokenBalance(connection, publicKey, mintPubkey);
          setTokenBalance(balance);
        }
      } catch (error) {
        setTokenDecimals(null);
        setTokenBalance(null);
      }
    };
    fetchTokenInfo();
  }, [tokenMint, publicKey, connection]);

  // Fetch SOL balance
  useEffect(() => {
    const fetchSolBalance = async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          setSolBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
          setSolBalance(null);
        }
      }
    };
    fetchSolBalance();
  }, [publicKey, connection]);

  const handleCreateLP = async () => {
    if (!connected || !publicKey) {
      setStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    if (!tokenMint) {
      setStatus({ type: 'error', message: 'Please enter your token mint address' });
      return;
    }

    const sol = parseFloat(solAmount);
    if (isNaN(sol) || sol <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid SOL amount' });
      return;
    }

    const tokens = parseFloat(tokenAmount);
    if (isNaN(tokens) || tokens <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid token amount' });
      return;
    }

    if (solBalance !== null && solBalance < sol + 0.005) {
      setStatus({ type: 'error', message: `Insufficient SOL balance. You have ${solBalance.toFixed(4)} SOL` });
      return;
    }

    if (tokenBalance !== null && tokenBalance < tokens) {
      setStatus({ type: 'error', message: `Insufficient token balance. You have ${tokenBalance} tokens` });
      return;
    }

    setLoading(true);
    setStatus({ type: 'info', message: 'Building transaction...' });
    setPoolAddress('');
    setLpMint('');

    try {
      // 1. Get transaction from backend (Jupiter)
      const res = await fetch('/api/raydium/create-pool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenMint,
          solAmount: sol,
          tokenAmount: tokens,
          creator: publicKey.toBase58(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create LP');

      // 2. Sign and send
      const txBuffer = Buffer.from(data.transaction, 'base64');
      const tx = Transaction.from(txBuffer);
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature);

      // 3. Confirm and store in DB (with lock)
      const confirmRes = await fetch('/api/lp/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
        },
        body: JSON.stringify({
          txSignature: signature,
          poolAddress: data.poolAddress,
          lpMint: data.lpMint,
          tokenMint,
          solAmount: sol,
          tokenAmount: tokens,
          lockDuration: lockDuration,
          creatorWallet: publicKey.toBase58(),
        }),
      });
      if (!confirmRes.ok) {
        const err = await confirmRes.json();
        throw new Error(err.error || 'Confirmation failed');
      }

      setPoolAddress(data.poolAddress);
      setLpMint(data.lpMint);
      setStatus({
        type: 'success',
        message: `✅ Liquidity pool created! Pool address: ${data.poolAddress.slice(0, 8)}...`,
      });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to create LP' });
    } finally {
      setLoading(false);
    }
  };

  const solNum = parseFloat(solAmount);
  const tokenNum = parseFloat(tokenAmount);
  const price = solNum > 0 && tokenNum > 0 ? (solNum / tokenNum) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Raydium Liquidity</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Add Liquidity to <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Your Solana Token</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Create a SOL-pair liquidity pool directly on ZRP – no redirects, no hassle.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">0.3 SOL</span>
            <span className="text-[#BDDBDB] ml-2">platform fee</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">0.25%</span>
            <span className="text-[#BDDBDB] ml-2">Raydium swap fee</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">&lt;2 min</span>
            <span className="text-[#BDDBDB] ml-2">to go live</span>
          </div>
        </div>
        <p className="text-[#BDDBDB] text-sm mt-4">
          Haven't created your token yet? <Link href="/create-mint" className="text-[#FF2D2D] hover:text-[#B10000] transition">Mint it here first →</Link>
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-8">
        {/* Wallet Connection */}
        <div className="flex items-center justify-between bg-[#1a1a1a]/50 rounded-xl p-4 border border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-[#FF2D2D]' : 'bg-[#BDDBDB]'}`} />
            <span className="text-white text-sm font-medium">
              {connected ? `Connected: ${publicKey?.toBase58().slice(0, 8)}...${publicKey?.toBase58().slice(-8)}` : 'Wallet not connected'}
            </span>
            {solBalance !== null && (
              <span className="text-[#BDDBDB] text-xs ml-2">
                ◎ {solBalance.toFixed(4)} SOL
              </span>
            )}
          </div>
          <WalletMultiButton className="!bg-gradient-to-r !from-[#FF2D2D] !via-[#1a1a1a] !to-[#BDDBDB] hover:!from-[#B10000] hover:!via-[#0D0D0D] hover:!to-[#9a9a9a] !rounded-xl !px-4 !py-2 !font-semibold !text-white !text-sm transition-all !shadow-lg !shadow-[#FF2D2D]/20" />
        </div>

        {/* Network Warning */}
        {network === 'mainnet' && (
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
            <p className="text-[#FF2D2D] font-bold">⚠️ MAINNET MODE</p>
            <p className="text-[#BDDBDB] text-sm">
              Adding liquidity on mainnet requires real SOL and tokens. Double-check all amounts.
            </p>
          </div>
        )}

        {/* Form */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">1. Pool Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-white font-semibold text-sm block mb-2">Token Mint Address</label>
              <input
                type="text"
                value={tokenMint}
                onChange={(e) => setTokenMint(e.target.value)}
                placeholder="e.g. So11111111111111111111111111111111111111112"
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D] text-sm font-mono"
              />
              <div className="flex items-center gap-4 mt-1 text-xs">
                <span className="text-[#BDDBDB]">The on-chain address of your token</span>
                {tokenDecimals !== null && <span className="text-[#FF2D2D]">✅ {tokenDecimals} decimals</span>}
                {tokenBalance !== null && (
                  <span className="text-[#BDDBDB]">Balance: {tokenBalance.toLocaleString()} tokens</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white font-semibold text-sm block mb-2">SOL Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BDDBDB] font-medium">◎</span>
                  <input
                    type="number"
                    value={solAmount}
                    onChange={(e) => setSolAmount(e.target.value)}
                    placeholder="e.g. 10"
                    className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl pl-10 pr-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D] text-sm"
                  />
                </div>
                <p className="text-[#BDDBDB] text-xs mt-1">Typical launches: 5-20 SOL</p>
              </div>
              <div>
                <label className="text-white font-semibold text-sm block mb-2">Token Amount</label>
                <input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="e.g. 1000000"
                  className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D] text-sm"
                />
                <p className="text-[#BDDBDB] text-xs mt-1">Whole numbers only. Paired with SOL above.</p>
              </div>
            </div>

            <div>
              <label className="text-white font-semibold text-sm block mb-2">Lock Duration (optional)</label>
              <div className="flex items-center gap-4">
                <select
                  value={lockDuration}
                  onChange={(e) => setLockDuration(parseInt(e.target.value))}
                  className="bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF2D2D]"
                >
                  <option value="0">No lock</option>
                  <option value="30*24*60*60">1 month</option>
                  <option value="90*24*60*60">3 months</option>
                  <option value="180*24*60*60">6 months</option>
                  <option value="365*24*60*60">1 year</option>
                </select>
                <span className="text-[#BDDBDB] text-sm">LP tokens will be locked if you choose a duration.</span>
              </div>
            </div>

            {/* Price Preview */}
            {solNum > 0 && tokenNum > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 text-[#FF2D2D] font-semibold text-sm mb-2">
                  <Info className="h-4 w-4" />
                  <span>Starting Price</span>
                </div>
                <p className="text-white font-mono">≈ {price.toFixed(12)} SOL per token</p>
                <p className="text-[#BDDBDB] text-xs mt-1">Token Price = SOL Amount ÷ Token Amount</p>
                {tokenDecimals !== null && (
                  <p className="text-[#BDDBDB] text-xs mt-1">
                    Amount in base units: {(tokenNum * Math.pow(10, tokenDecimals)).toLocaleString()}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* What You'll Pay */}
        <div className="bg-[#1a1a1a]/50 rounded-xl p-4 border border-[#1a1a1a]">
          <h3 className="text-white font-semibold text-sm mb-3">What You'll Pay</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#BDDBDB]">Liquidity SOL</span>
              <span className="text-white">{solAmount || '0'} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#BDDBDB]">Platform fee</span>
              <span className="text-[#FF2D2D]">0.300 SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#BDDBDB]">Network gas</span>
              <span className="text-[#FF2D2D]">Covered. No extra charge.</span>
            </div>
            <div className="border-t border-[#1a1a1a] pt-2 mt-2 flex justify-between font-bold">
              <span className="text-white">Total estimated</span>
              <span className="text-[#FF2D2D]">{solAmount ? (parseFloat(solAmount) + 0.3).toFixed(3) : '0.300'} SOL</span>
            </div>
          </div>
          <p className="text-[#BDDBDB] text-xs mt-2">
            Raydium charges 0.25% on each swap in the pool — not paid upfront.
          </p>
        </div>

        {/* Status */}
        {status.type && (
          <div
            className={`rounded-xl p-4 flex items-start gap-3 ${
              status.type === 'success'
                ? 'bg-[#FF2D2D]/10 border border-[#FF2D2D]/30'
                : status.type === 'error'
                ? 'bg-[#FF2D2D]/10 border border-[#FF2D2D]/30'
                : 'bg-[#FF2D2D]/10 border border-[#FF2D2D]/30'
            }`}
          >
            {status.type === 'success' && <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />}
            {status.type === 'error' && <AlertCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5" />}
            {status.type === 'info' && <Loader2 className="h-5 w-5 text-[#FF2D2D] flex-shrink-0 mt-0.5 animate-spin" />}
            <p className={`text-sm ${
              status.type === 'success' ? 'text-[#FF2D2D]' : 
              status.type === 'error' ? 'text-[#FF2D2D]' : 
              'text-[#BDDBDB]'
            }`}>
              {status.message}
            </p>
          </div>
        )}

        {/* Result */}
        {poolAddress && (
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
            <CheckCircle className="h-8 w-8 text-[#FF2D2D] mx-auto mb-2" />
            <p className="text-[#FF2D2D] font-semibold mb-2">Liquidity Pool Created!</p>
            <a
              href={`https://solscan.io/address/${poolAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#FF2D2D] hover:text-[#B10000] inline-flex items-center gap-1 transition"
            >
              View Pool on Solscan <ExternalLink className="h-3 w-3" />
            </a>
            {lpMint && (
              <p className="text-[#BDDBDB] text-xs mt-1">LP Mint: {lpMint.slice(0, 8)}...</p>
            )}
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleCreateLP}
          disabled={loading || !connected || !tokenMint || !solAmount || !tokenAmount}
          className="w-full bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating Liquidity Pool...
            </>
          ) : (
            <>
              <Coins className="h-5 w-5" />
              Create Liquidity Pool
            </>
          )}
        </button>

        <p className="text-[#BDDBDB] text-xs text-center">
          ⚠️ Liquidity transactions require SOL for network fees. Ensure your wallet has sufficient balance.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Liquidity Pool FAQ</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
            <h3 className="text-white font-semibold">What is a liquidity pool?</h3>
            <p className="text-[#BDDBDB] text-sm mt-1">
              A liquidity pool is a smart contract that holds two assets — in this case your token and SOL — allowing anyone to trade against the pool without a traditional order book. The price adjusts automatically based on supply and demand.
            </p>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
            <h3 className="text-white font-semibold">How much SOL should I add?</h3>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Typical launches use 5–20 SOL. More liquidity means less price slippage for traders, which usually attracts more volume.
            </p>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
            <h3 className="text-white font-semibold">How is the starting price set?</h3>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Your token's initial price is the ratio of SOL to tokens: Price ≈ SOL Amount ÷ Token Amount.
            </p>
          </div>
          <div className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
            <h3 className="text-white font-semibold">What does "lock" mean?</h3>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Locking your LP tokens prevents you from removing liquidity for a set period. This builds trust with traders, as it shows commitment to the project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
