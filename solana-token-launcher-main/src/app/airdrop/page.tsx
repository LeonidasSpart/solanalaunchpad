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
  getMint,
} from '@solana/spl-token';

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

  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com',
    'confirmed'
  );

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

      // Get token decimals using getMint
      let decimals = 9;
      try {
        const mintInfo = await getMint(connection, mintPubkey);
        decimals = mintInfo.decimals;
      } catch (error) {
        // Use default decimals if we can't fetch
        console.warn('Could not fetch mint info, using default decimals (9)');
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

      const results = [];
      const batchSize = 5;

      for (let i = 0; i < wallets.length; i += batchSize) {
        const batch = wallets.slice(i, Math.min(i + batchSize, wallets.length));
        const transaction = new Transaction();

        for (const walletAddress of batch) {
          try {
            const recipientPubkey = new PublicKey(walletAddress);
            const recipientAta = await getAssociatedTokenAddress(mintPubkey, recipientPubkey);

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
            results.push({ address: walletAddress, status: 'failed' as const });
          }
        }

        if (transaction.instructions.length > 0) {
          try {
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            const signedTx = await signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTx.serialize());
            await connection.confirmTransaction(signature);

            for (const walletAddress of batch) {
              if (!results.some(r => r.address === walletAddress && r.status === 'failed')) {
                results.push({ address: walletAddress, status: 'success' as const, signature });
              }
            }

            setProgress({ current: Math.min(i + batch.length, wallets.length), total: wallets.length });
          } catch (error: any) {
            for (const walletAddress of batch) {
              if (!results.some(r => r.address === walletAddress)) {
                results.push({ address: walletAddress, status: 'failed' as const });
              }
            }
          }
        }
      }

      setTxResults(results);
      const successCount = results.filter(r => r.status === 'success').length;
      const failCount = results.filter(r => r.status === 'failed').length;

      if (successCount === wallets.length) {
        setStatus({ type: 'success', message: `✅ Successfully airdropped ${amount} tokens to all ${wallets.length} wallets!` });
      } else if (successCount > 0) {
        setStatus({ type: 'info', message: `✅ ${successCount} successful, ${failCount} failed. Check results below.` });
      } else {
        setStatus({ type: 'error', message: `❌ All transactions failed. Please check your balance and wallet addresses.` });
      }
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Airdrop failed. Please try again.' });
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const wallets = parseWallets();
  const totalAmount = wallets.length > 0 && amount ? parseFloat(amount) * wallets.length : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
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

        {/* Token Mint */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">Step 1: Enter Your Token Mint Address</label>
          <input
            type="text"
            value={tokenMint}
            onChange={(e) => setTokenMint(e.target.value)}
            placeholder="e.g. So11111111111111111111111111111111111111112"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
          />
          <p className="text-zinc-500 text-xs mt-1">Find your token mint address on Solscan.io</p>
        </div>

        {/* Amount */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">Step 2: Amount Per Wallet</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 1000"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
          />
        </div>

        {/* Wallet List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-white font-semibold text-sm">Step 3: Wallet Addresses</label>
            <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-lg transition">
              Upload CSV
              <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
          <textarea
            value={walletList}
            onChange={(e) => setWalletList(e.target.value)}
            rows={6}
            placeholder="Paste wallet addresses here, one per line"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm font-mono"
          />
          <p className="text-zinc-500 text-xs mt-1">{wallets.length > 0 ? `${wallets.length} wallets detected` : 'Paste wallet addresses, one per line'}</p>
        </div>

        {/* Summary */}
        {wallets.length > 0 && amount && tokenMint && (
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm mb-2">
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
          </div>
        )}

        {/* Progress */}
        {isProcessing && progress.total > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Progress</span>
              <span className="text-zinc-400">{progress.current} / {progress.total}</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-600 h-2 transition-all duration-500 rounded-full" style={{ width: `${(progress.current / progress.total) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Status */}
        {status.type && (
          <div className={`rounded-xl p-4 ${
            status.type === 'success' ? 'bg-green-900/20 border border-green-500/30' :
            status.type === 'error' ? 'bg-red-900/20 border border-red-500/30' :
            'bg-blue-900/20 border border-blue-500/30'
          }`}>
            <p className={`text-sm ${status.type === 'success' ? 'text-green-300' : status.type === 'error' ? 'text-red-300' : 'text-blue-300'}`}>
              {status.message}
            </p>
          </div>
        )}

        {/* Results */}
        {txResults.length > 0 && (
          <div className="border border-zinc-800 rounded-xl overflow-hidden">
            <div className="bg-zinc-800/50 px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
              <p className="text-white font-semibold text-sm">Results</p>
              <p className="text-zinc-400 text-xs">
                {txResults.filter(r => r.status === 'success').length} successful · {txResults.filter(r => r.status === 'failed').length} failed
              </p>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {txResults.map((result, index) => (
                <div key={index} className={`flex items-center justify-between px-4 py-2 border-b border-zinc-800/50 text-sm ${result.status === 'success' ? 'bg-green-900/10' : 'bg-red-900/10'}`}>
                  <span className="text-zinc-300 font-mono text-xs truncate max-w-xs">{result.address}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium ${result.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                      {result.status === 'success' ? '✅ Success' : '❌ Failed'}
                    </span>
                    {result.signature && (
                      <a href={`https://solscan.io/tx/${result.signature}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-xs transition">View</a>
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
          {isProcessing ? 'Processing Airdrop...' : 'Send Airdrop'}
        </button>

        <p className="text-zinc-500 text-xs text-center">⚠️ Airdrop transactions require SOL for network fees. Ensure your wallet has sufficient balance.</p>
      </div>

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
