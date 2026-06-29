// src/app/airdrop/page.tsx
'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { Upload, Send, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function AirdropPage() {
  const { publicKey, connected } = useWallet();
  const [walletList, setWalletList] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenMint, setTokenMint] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({
    type: null,
    message: '',
  });
  const [previewWallets, setPreviewWallets] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleWalletsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setWalletList(value);
    const wallets = value.split('\n').filter(line => line.trim() !== '');
    setPreviewWallets(wallets);
  };

  const handleAirdrop = async () => {
    if (!connected || !publicKey) {
      setStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    if (!tokenMint) {
      setStatus({ type: 'error', message: 'Please enter your token mint address' });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    if (previewWallets.length === 0) {
      setStatus({ type: 'error', message: 'Please add at least one wallet address' });
      return;
    }

    setIsProcessing(true);
    setStatus({ type: 'info', message: 'Processing airdrop...' });

    try {
      // This will be connected to the actual Solana logic
      // For now, we simulate the process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate success
      setStatus({
        type: 'success',
        message: `✅ Successfully airdropped ${amount} tokens to ${previewWallets.length} wallets!`,
      });
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Airdrop failed. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Airdrop Tool</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Distribute Tokens <br className="hidden sm:block" />
          <span className="text-purple-400">to Multiple Wallets</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Send your tokens to hundreds of wallets at once. Perfect for community rewards, giveaways, and token distribution.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-8">
        {/* Wallet Connection Status */}
        <div className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-white text-sm font-medium">
              {connected ? `Connected: ${publicKey?.toBase58().slice(0, 8)}...${publicKey?.toBase58().slice(-8)}` : 'Wallet not connected'}
            </span>
          </div>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-4 !py-2 !font-semibold !text-white !text-sm" />
        </div>

        {/* Step 1: Token Mint Address */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">
            Step 1: Enter Your Token Mint Address
          </label>
          <input
            type="text"
            value={tokenMint}
            onChange={(e) => setTokenMint(e.target.value)}
            placeholder="e.g. So11111111111111111111111111111111111111112"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
          />
          <p className="text-zinc-500 text-xs mt-1">Find your token mint address on Solscan.io</p>
        </div>

        {/* Step 2: Amount */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">
            Step 2: Amount Per Wallet
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 1000"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
          />
        </div>

        {/* Step 3: Wallet List */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">
            Step 3: Wallet Addresses
          </label>
          <textarea
            value={walletList}
            onChange={handleWalletsChange}
            rows={6}
            placeholder="Paste wallet addresses here, one per line&#10;e.g.&#10;BEK84UNPpH9jAqHR21hWmrEgKgrnGjA7yc5cocd1v&#10;EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm font-mono"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-zinc-500 text-xs">
              {previewWallets.length > 0 ? `${previewWallets.length} wallets detected` : 'Paste wallet addresses, one per line'}
            </p>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-purple-400 hover:text-purple-300 text-xs font-medium transition"
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
          </div>
        </div>

        {/* Preview */}
        {showPreview && previewWallets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 max-h-48 overflow-y-auto"
          >
            <p className="text-zinc-400 text-xs font-mono">
              {previewWallets.map((wallet, index) => (
                <span key={index} className="block py-0.5">
                  {index + 1}. {wallet}
                </span>
              ))}
            </p>
          </motion.div>
        )}

        {/* Summary */}
        {previewWallets.length > 0 && amount && tokenMint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm mb-2">
              <Users className="h-4 w-4" />
              <span>Airdrop Summary</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-zinc-500 text-xs">Recipients</p>
                <p className="text-white font-medium">{previewWallets.length}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Per Wallet</p>
                <p className="text-white font-medium">{amount} tokens</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Total</p>
                <p className="text-white font-medium">{parseFloat(amount) * previewWallets.length} tokens</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Status Message */}
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

        {/* Airdrop Button */}
        <button
          onClick={handleAirdrop}
          disabled={isProcessing || !connected || !tokenMint || !amount || previewWallets.length === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing Airdrop...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Airdrop
            </>
          )}
        </button>

        <p className="text-zinc-500 text-xs text-center">
          ⚠️ Airdrop transactions require SOL for network fees. Ensure your wallet has sufficient balance.
        </p>
      </div>

      {/* Info Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="text-white font-semibold">Step 1</h3>
          <p className="text-zinc-400 text-sm">Enter token mint address</p>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-white font-semibold">Step 2</h3>
          <p className="text-zinc-400 text-sm">Add wallet addresses</p>
        </div>
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 text-center">
          <div className="text-3xl mb-2">🚀</div>
          <h3 className="text-white font-semibold">Step 3</h3>
          <p className="text-zinc-400 text-sm">Send airdrop instantly</p>
        </div>
      </div>
    </div>
  );
}
