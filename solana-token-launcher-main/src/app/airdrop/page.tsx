// src/app/airdrop/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  getAccount,
} from '@solana/spl-token';
import { motion } from 'framer-motion';
import { Send, Users, CheckCircle, AlertCircle, Loader2, FileUp, ExternalLink } from 'lucide-react';

export default function AirdropPage() {
  const { publicKey, connected, signTransaction } = useWallet();
  const [walletList, setWalletList] = useState('');
  const [amount, setAmount] = useState('');
  const [tokenMint, setTokenMint] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info' | null; message: string }>({
    type: null,
    message: '',
  });
  const [txResults, setTxResults] = useState<{ address: string; status: 'success' | 'failed'; signature?: string }[]>([]);
  const [balance, setBalance] = useState<number | null>(null);

  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com',
    'confirmed'
  );

  const handleWalletsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWalletList(e.target.value);
  };

  const parseWallets = useCallback(() => {
    return walletList
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && (line.startsWith('0x') || line.length === 44));
  }, [walletList]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setWalletList(content);
    };
    reader.readAsText(file);
  };

  const checkBalance = async () => {
    if (!connected || !publicKey || !tokenMint) return;

    try {
      const mintPubkey = new PublicKey(tokenMint);
      const senderAta = await getAssociatedTokenAddress(mintPubkey, publicKey);
      const accountInfo = await getAccount(connection, senderAta);
      setBalance(Number(accountInfo.amount) / Math.pow(10, 9)); // Assuming 9 decimals
    } catch (error) {
      setBalance(0);
    }
  };

  const handleAirdrop = async () => {
    if (!connected || !publicKey || !signTransaction) {
      setStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    if (!tokenMint) {
      setStatus({ type: 'error', message: 'Please enter your token mint address' });
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    const wallets = parseWallets();
    if (wallets.length === 0) {
      setStatus({ type: 'error', message: 'Please add at least one wallet address' });
      return;
    }

    setIsProcessing(true);
    setProgress({ current: 0, total: wallets.length });
    setTxResults([]);
    setStatus({ type: 'info', message: `Processing airdrop to ${wallets.length} wallets...` });

    try {
      const mintPubkey = new PublicKey(tokenMint);
      const senderAta = await getAssociatedTokenAddress(mintPubkey, publicKey);

      // Get token decimals
      let decimals = 9;
      try {
        const accountInfo = await getAccount(connection, mintPubkey);
        decimals = accountInfo.decimals;
      } catch (error) {
        // Use default decimals if we can't fetch
      }

      // Check sender's token balance
      const senderBalance = await connection.getTokenAccountBalance(senderAta);
      const amountInBaseUnits = amountNum * Math.pow(10, decimals);

      if (senderBalance.value.uiAmount === null || senderBalance.value.uiAmount < amountNum * wallets.length) {
        setStatus({
          type: 'error',
          message: `Insufficient balance. You have ${senderBalance.value.uiAmount || 0} tokens, need ${amountNum * wallets.length}`,
        });
        setIsProcessing(false);
        return;
      }

      // Process each wallet in batches
      const results = [];
      const batchSize = 5; // Reduced batch size for better reliability

      for (let i = 0; i < wallets.length; i += batchSize) {
        const batch = wallets.slice(i, Math.min(i + batchSize, wallets.length));
        const transaction = new Transaction();

        for (const walletAddress of batch) {
          try {
            const recipientPubkey = new PublicKey(walletAddress);
            const recipientAta = await getAssociatedTokenAddress(mintPubkey, recipientPubkey);

            // Check if recipient has an associated token account
            try {
              await getAccount(connection, recipientAta);
            } catch (error) {
              // If recipient doesn't have an ATA, we need to create one first
              // For simplicity in this version, we'll skip wallets without ATAs
              results.push({
                address: walletAddress,
                status: 'failed' as const,
              });
              continue;
            }

            // Create transfer instruction
            const transferIx = createTransferInstruction(
              senderAta,
              recipientAta,
              publicKey,
              amountInBaseUnits,
              [],
              TOKEN_PROGRAM_ID
            );

            transaction.add(transferIx);
          } catch (error) {
            results.push({
              address: walletAddress,
              status: 'failed' as const,
            });
          }
        }

        if (transaction.instructions.length > 0) {
          try {
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            const signedTx = await signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTx.serialize());

            // Wait for confirmation
            const confirmation = await connection.confirmTransaction(signature);
            if (confirmation.value.err) {
              throw new Error('Transaction failed');
            }

            // Update results for successful transactions
            for (const walletAddress of batch) {
              if (!results.some(r => r.address === walletAddress && r.status === 'failed')) {
                results.push({
                  address: walletAddress,
                  status: 'success' as const,
                  signature,
                });
              }
            }

            setProgress({ current: Math.min(i + batch.length, wallets.length), total: wallets.length });
          } catch (error: any) {
            for (const walletAddress of batch) {
              if (!results.some(r => r.address === walletAddress)) {
                results.push({
                  address: walletAddress,
                  status: 'failed' as const,
                });
              }
            }
            setStatus({
              type: 'error',
              message: `Batch ${Math.floor(i / batchSize) + 1} failed: ${error.message?.slice(0, 100) || 'Unknown error'}`,
            });
          }
        }
      }

      setTxResults(results);
      const successCount = results.filter(r => r.status === 'success').length;
      const failCount = results.filter(r => r.status === 'failed').length;

      if (successCount === wallets.length) {
        setStatus({
          type: 'success',
          message: `✅ Successfully airdropped ${amount} tokens to all ${wallets.length} wallets!`,
        });
      } else if (successCount > 0) {
        setStatus({
          type: 'info',
          message: `✅ ${successCount} successful, ${failCount} failed. Check results below.`,
        });
      } else {
        setStatus({
          type: 'error',
          message: `❌ All transactions failed. Please check your balance and wallet addresses.`,
        });
      }
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error.message || 'Airdrop failed. Please try again.',
      });
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const wallets = parseWallets();
  const totalAmount = wallets.length > 0 && amount ? parseFloat(amount) * wallets.length : 0;

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
            {connected && balance !== null && (
              <span className="text-zinc-400 text-xs ml-2">
                Balance: {balance.toFixed(4)} tokens
              </span>
            )}
          </div>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-4 !py-2 !font-semibold !text-white !text-sm" />
        </div>

        {/* Step 1: Token Mint Address */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">
            Step 1: Enter Your Token Mint Address
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={tokenMint}
              onChange={(e) => setTokenMint(e.target.value)}
              placeholder="e.g. So11111111111111111111111111111111111111112"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
            />
            <button
              onClick={checkBalance}
              disabled={!connected || !tokenMint}
              className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition text-sm disabled:opacity-50"
            >
              Check Balance
            </button>
          </div>
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
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-semibold text-sm">
              Step 3: Wallet Addresses
            </label>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-lg transition flex items-center gap-1">
                <FileUp className="h-3.5 w-3.5" />
                Upload CSV
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <textarea
            value={walletList}
            onChange={handleWalletsChange}
            rows={6}
            placeholder="Paste wallet addresses here, one per line&#10;e.g.&#10;BEK84UNPpH9jAqHR21hWmrEgKgrnGjA7yc5cocd1v&#10;EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm font-mono"
          />
          <p className="text-zinc-500 text-xs mt-1">
            {wallets.length > 0 ? `${wallets.length} wallets detected` : 'Paste wallet addresses, one per line'}
          </p>
        </div>

        {/* Summary */}
        {wallets.length > 0 && amount && tokenMint && (
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
                <p className="text-white font-medium">{wallets.length}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Per Wallet</p>
                <p className="text-white font-medium">{amount} tokens</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs">Total</p>
                <p className="text-white font-medium">{totalAmount.toLocaleString()} tokens</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        {isProcessing && progress.total > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Progress</span>
              <span className="text-zinc-400">{progress.current} / {progress.total}</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-purple-600 h-2 transition-all duration-500 rounded-full"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
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

        {/* Results Table */}
        {txResults.length > 0 && (
          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
              <p className="text-white font-semibold text-sm">Results</p>
              <p className="text-zinc-400 text-xs">
                {txResults.filter(r => r.status === 'success').length} successful
                {' · '}
                {txResults.filter(r => r.status === 'failed').length} failed
              </p>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {txResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-4 py-2 border-b border-zinc-800/50 text-sm ${
                    result.status === 'success' ? 'bg-green-900/10' : 'bg-red-900/10'
                  }`}
                >
                  <span className="text-zinc-300 font-mono text-xs truncate max-w-xs">
                    {result.address}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${
                      result.status === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {result.status === 'success' ? '✅ Success' : '❌ Failed'}
                    </span>
                    {result.signature && (
                      <a
                        href={`https://solscan.io/tx/${result.signature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-xs transition flex items-center gap-1"
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Airdrop Button */}
        <button
          onClick={handleAirdrop}
          disabled={isProcessing || !connected || !tokenMint || !amount || wallets.length === 0}
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
