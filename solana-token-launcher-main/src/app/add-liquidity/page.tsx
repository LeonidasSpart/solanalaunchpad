'use client';

import { useState, useContext, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey } from '@solana/web3.js';
import { NetworkContext } from '@/providers/providers';
import { motion } from 'framer-motion';
import { Coins, Wallet, ArrowRight, Loader2, CheckCircle, AlertCircle, ExternalLink, Info } from 'lucide-react';
import Link from 'next/link';

export default function AddLiquidityPage() {
  const { publicKey, connected } = useWallet();
  const { network } = useContext(NetworkContext);
  const [tokenMint, setTokenMint] = useState('');
  const [solAmount, setSolAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenDecimals, setTokenDecimals] = useState<number | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({
    type: null,
    message: '',
  });

  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com',
    'confirmed'
  );

  // Fetch token info when mint address changes
  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!tokenMint || tokenMint.length < 32) {
        setTokenDecimals(null);
        setTokenSymbol(null);
        return;
      }

      try {
        const mintPubkey = new PublicKey(tokenMint);
        // Try to get mint info
        const mintInfo = await connection.getParsedAccountInfo(mintPubkey);
        if (mintInfo.value && mintInfo.value.data) {
          const data = mintInfo.value.data as any;
          if (data.parsed) {
            const parsed = data.parsed;
            if (parsed.type === 'mint' && parsed.info) {
              setTokenDecimals(parsed.info.decimals);
            }
          }
        }
      } catch (error) {
        // Silently fail - user might be typing
      }
    };
    fetchTokenInfo();
  }, [tokenMint, connection]);

  const handleAddLiquidity = async () => {
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

    setLoading(true);
    setStatus({ type: 'info', message: 'Preparing Raydium liquidity pool...' });

    try {
      // Check SOL balance
      const solBalance = await connection.getBalance(publicKey);
      const solLamports = sol * 1e9;

      if (solBalance < solLamports + 3000000) {
        throw new Error(`Insufficient SOL balance. Need ${sol + 0.003} SOL for liquidity + fees`);
      }

      // Open Raydium in new tab with pre-filled parameters
      const raydiumUrl = `https://raydium.io/liquidity/pool/create?mint=${tokenMint}`;
      window.open(raydiumUrl, '_blank');

      setStatus({
        type: 'success',
        message: '✅ Raydium opened! Follow the steps above to create your liquidity pool.',
      });

    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to prepare liquidity pool',
      });
    } finally {
      setLoading(false);
    }
  };

  const solNum = parseFloat(solAmount);
  const tokenNum = parseFloat(tokenAmount);
  const price = solNum > 0 && tokenNum > 0 ? (solNum / tokenNum) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Raydium Liquidity</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Add Liquidity to <br className="hidden sm:block" />
          <span className="text-purple-400">Your Solana Token</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Create a SOL-pair liquidity pool in minutes. No coding — your token becomes tradeable instantly.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-purple-400 font-bold">0.3 SOL</span>
            <span className="text-zinc-500 ml-2">platform fee</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-purple-400 font-bold">0.25%</span>
            <span className="text-zinc-500 ml-2">Raydium swap fee</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-purple-400 font-bold">&lt;2 min</span>
            <span className="text-zinc-500 ml-2">to go live</span>
          </div>
        </div>
        <p className="text-zinc-500 text-sm mt-4">
          Haven't created your token yet? <Link href="/create-mint" className="text-purple-400 hover:underline">Mint it here first →</Link>
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-8">
        {/* Wallet Connection */}
        <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-white text-sm font-medium">
              {connected ? `Connected: ${publicKey?.toBase58().slice(0, 8)}...${publicKey?.toBase58().slice(-8)}` : 'Wallet not connected'}
            </span>
          </div>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-4 !py-2 !font-semibold !text-white !text-sm" />
        </div>

        {/* Network Warning */}
        {network === 'mainnet' && (
          <div className="bg-red-900/30 border border-red-500 rounded-xl p-4">
            <p className="text-red-400 font-bold">⚠️ MAINNET MODE</p>
            <p className="text-red-300 text-sm">
              Adding liquidity on mainnet requires real SOL and tokens. Double-check all amounts.
            </p>
          </div>
        )}

        {/* Pool Details */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">1. Pool Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-white font-semibold text-sm block mb-2">
                Token Mint Address
              </label>
              <input
                type="text"
                value={tokenMint}
                onChange={(e) => setTokenMint(e.target.value)}
                placeholder="e.g. So11111111111111111111111111111111111111112"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm font-mono"
              />
              <p className="text-zinc-500 text-xs mt-1">
                The on-chain address of your token — from the Create Token success screen or Solscan.
                {tokenDecimals !== null && (
                  <span className="text-green-400 ml-2">✅ {tokenDecimals} decimals detected</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white font-semibold text-sm block mb-2">
                  SOL Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">◎</span>
                  <input
                    type="number"
                    value={solAmount}
                    onChange={(e) => setSolAmount(e.target.value)}
                    placeholder="e.g. 10"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
                  />
                </div>
                <p className="text-zinc-500 text-xs mt-1">Typical launches: 5-20 SOL</p>
              </div>
              <div>
                <label className="text-white font-semibold text-sm block mb-2">
                  Token Amount
                </label>
                <input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="e.g. 1000000"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
                />
                <p className="text-zinc-500 text-xs mt-1">Whole numbers only. Paired with SOL above.</p>
              </div>
            </div>

            {/* Price Preview */}
            {solNum > 0 && tokenNum > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm mb-2">
                  <Info className="h-4 w-4" />
                  <span>Starting Price</span>
                </div>
                <p className="text-white font-mono">
                  ≈ {price.toFixed(12)} SOL per token
                </p>
                <p className="text-zinc-500 text-xs mt-1">
                  Token Price = SOL Amount ÷ Token Amount
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* What You'll Pay */}
        <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
          <h3 className="text-white font-semibold text-sm mb-3">What You'll Pay</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Liquidity SOL</span>
              <span className="text-white">{solAmount || '0'} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Platform fee</span>
              <span className="text-purple-400">0.300 SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Network gas</span>
              <span className="text-green-400">Covered. No extra charge.</span>
            </div>
            <div className="border-t border-zinc-700 pt-2 mt-2 flex justify-between font-bold">
              <span className="text-white">Total estimated</span>
              <span className="text-purple-400">{solAmount ? (parseFloat(solAmount) + 0.3).toFixed(3) : '0.300'} SOL</span>
            </div>
          </div>
          <p className="text-zinc-500 text-xs mt-2">
            Raydium charges 0.25% on each swap in the pool — not paid upfront.
          </p>
        </div>

        {/* Status */}
        {status.type && (
          <div
            className={`rounded-xl p-4 flex items-start gap-3 ${
              status.type === 'success'
                ? 'bg-green-900/20 border border-green-500/30'
                : status.type === 'error'
                ? 'bg-red-900/20 border border-red-500/30'
                : 'bg-blue-900/20 border border-blue-500/30'
            }`}
          >
            {status.type === 'success' && <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />}
            {status.type === 'error' && <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />}
            {status.type === 'info' && <Loader2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5 animate-spin" />}
            <p className={`text-sm ${
              status.type === 'success' ? 'text-green-300' : 
              status.type === 'error' ? 'text-red-300' : 
              'text-blue-300'
            }`}>
              {status.message}
            </p>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleAddLiquidity}
          disabled={loading || !connected || !tokenMint || !solAmount || !tokenAmount}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Wallet className="h-5 w-5" />
              Add Liquidity
            </>
          )}
        </button>

        <p className="text-zinc-500 text-xs text-center">
          ⚠️ Airdrop transactions require SOL for network fees. Ensure your wallet has sufficient balance.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Liquidity Pool FAQ</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <h3 className="text-white font-semibold">What is a liquidity pool?</h3>
            <p className="text-zinc-400 text-sm mt-1">
              A liquidity pool is a smart contract that holds two assets — in this case your token and SOL — allowing anyone to trade against the pool without a traditional order book. The price adjusts automatically based on supply and demand.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <h3 className="text-white font-semibold">How much SOL should I add?</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Typical launches use 5–20 SOL. More liquidity means less price slippage for traders, which usually attracts more volume. A higher SOL amount also signals confidence to potential buyers.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <h3 className="text-white font-semibold">How is the starting price set?</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Your token's initial price is the ratio of SOL to tokens: Price ≈ SOL Amount ÷ Token Amount. Choose amounts that reflect your intended market cap.
            </p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <h3 className="text-white font-semibold">Can I remove liquidity later?</h3>
            <p className="text-zinc-400 text-sm mt-1">
              Yes. You receive LP tokens when you create the pool. Redeem them on Raydium at any time to withdraw your proportional share of both assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
