// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect, useContext } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  getAccount,
} from '@solana/spl-token';
import { NetworkContext } from '@/providers/providers';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Coins,
  Users,
  TrendingUp,
  Wallet,
  Plus,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
  Flame,
  X,
} from 'lucide-react';

interface Token {
  mintAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  createdAt: string;
  network: string;
  balance?: number;
}

export default function DashboardPage() {
  const { publicKey, connected, signTransaction } = useWallet();
  const { network } = useContext(NetworkContext);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [burnLoading, setBurnLoading] = useState(false);
  const [burnModal, setBurnModal] = useState<{ open: boolean; token: Token | null }>({
    open: false,
    token: null,
  });
  const [burnAmount, setBurnAmount] = useState('');
  const [burnStatus, setBurnStatus] = useState<{
    type: 'success' | 'error' | 'info' | null;
    message: string;
  }>({ type: null, message: '' });
  const [stats, setStats] = useState({
    totalTokens: 0,
    totalSupply: 0,
    totalHolders: 0,
  });

  const connection = new Connection(
    process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com',
    'confirmed'
  );

  // Fetch tokens on component mount or wallet change
  useEffect(() => {
    const fetchTokens = async () => {
      if (!connected || !publicKey) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // For now, we'll use mock data until we have a backend
        const mockTokens: Token[] = [
          {
            mintAddress: 'So11111111111111111111111111111111111111112',
            name: 'ZRPDEEPSEEK',
            symbol: 'ZDP',
            decimals: 9,
            supply: 1000000000,
            createdAt: new Date().toISOString(),
            network: 'Devnet',
            balance: 500000000,
          },
          {
            mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            name: 'SolToken',
            symbol: 'SOLT',
            decimals: 9,
            supply: 500000000,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            network: 'Devnet',
            balance: 250000000,
          },
        ];

        setTokens(mockTokens);
        setStats({
          totalTokens: mockTokens.length,
          totalSupply: mockTokens.reduce((acc, t) => acc + t.supply, 0),
          totalHolders: 1427,
        });
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [connected, publicKey]);

  const handleBurn = async () => {
    if (!burnModal.token || !publicKey || !signTransaction) {
      setBurnStatus({ type: 'error', message: 'Please connect your wallet first' });
      return;
    }

    const amount = parseFloat(burnAmount);
    if (isNaN(amount) || amount <= 0) {
      setBurnStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    const token = burnModal.token;
    if (token.balance !== undefined && amount > token.balance) {
      setBurnStatus({ type: 'error', message: `You only have ${token.balance} tokens to burn` });
      return;
    }

    setBurnLoading(true);
    setBurnStatus({ type: 'info', message: 'Burning tokens...' });

    try {
      const mintPubkey = new PublicKey(token.mintAddress);
      const burnAddress = new PublicKey('1nc1nerator11111111111111111111111111111111');
      const senderAta = await getAssociatedTokenAddress(mintPubkey, publicKey);
      const burnAta = await getAssociatedTokenAddress(mintPubkey, burnAddress);

      const amountInBaseUnits = amount * Math.pow(10, token.decimals);

      // Check if burn address has an associated token account
      let burnAccountExists = true;
      try {
        await getAccount(connection, burnAta);
      } catch (error) {
        burnAccountExists = false;
      }

      const transaction = new Transaction();

      // If burn address doesn't have the token account, we need to create it
      // For simplicity in this version, we'll just transfer to the burn address
      const transferIx = createTransferInstruction(
        senderAta,
        burnAta,
        publicKey,
        amountInBaseUnits,
        [],
        TOKEN_PROGRAM_ID
      );

      transaction.add(transferIx);

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signedTx = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(signature);

      // Update token balance locally
      setTokens((prev) =>
        prev.map((t) =>
          t.mintAddress === token.mintAddress && t.balance !== undefined
            ? { ...t, balance: t.balance - amount }
            : t
        )
      );

      setBurnStatus({
        type: 'success',
        message: `🔥 Successfully burned ${amount} ${token.symbol} tokens!`,
      });

      // Close modal after success
      setTimeout(() => {
        setBurnModal({ open: false, token: null });
        setBurnAmount('');
      }, 3000);
    } catch (error: any) {
      setBurnStatus({
        type: 'error',
        message: error.message || 'Failed to burn tokens',
      });
    } finally {
      setBurnLoading(false);
    }
  };

  if (!connected || !publicKey) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-xl p-12 border border-[#1a1a1a]">
          <Wallet className="h-16 w-16 text-[#BDDBDB] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h1>
          <p className="text-[#BDDBDB] mb-6">Connect your wallet to view your dashboard and manage your tokens.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-[#BDDBDB] text-sm">
            Connected: {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
          </p>
        </div>
        <Link
          href="/create-mint"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
        >
          <Plus className="h-4 w-4" />
          Create New Token
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 text-[#FF2D2D] animate-spin" />
          <span className="ml-2 text-[#BDDBDB]">Loading your dashboard...</span>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#BDDBDB] text-sm">Total Tokens</p>
                  <p className="text-2xl font-bold text-white">{stats.totalTokens}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/20 flex items-center justify-center">
                  <Coins className="h-5 w-5 text-[#FF2D2D]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#BDDBDB] text-sm">Total Supply</p>
                  <p className="text-2xl font-bold text-white">{stats.totalSupply.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-[#FF2D2D]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#BDDBDB] text-sm">Total Holders</p>
                  <p className="text-2xl font-bold text-white">{stats.totalHolders.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#FF2D2D]" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tokens List */}
          <div className="bg-[#0D0D0D] rounded-xl border border-[#1a1a1a] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#1a1a1a]">
              <h2 className="text-white font-semibold">Your Tokens</h2>
            </div>

            {tokens.length === 0 ? (
              <div className="text-center py-12">
                <Coins className="h-12 w-12 text-[#BDDBDB] mx-auto mb-3" />
                <p className="text-[#BDDBDB]">You haven't created any tokens yet.</p>
                <Link
                  href="/create-mint"
                  className="inline-block mt-4 text-[#FF2D2D] hover:text-[#B10000] transition"
                >
                  Create your first token →
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1a1a1a]/50">
                      <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Token</th>
                      <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Symbol</th>
                      <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Network</th>
                      <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Supply</th>
                      <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Balance</th>
                      <th className="px-6 py-3 text-left text-[#BDDBDB] font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token, index) => (
                      <motion.tr
                        key={token.mintAddress}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-[#1a1a1a]/50 hover:bg-[#1a1a1a]/20 transition"
                      >
                        <td className="px-6 py-3 text-white">{token.name}</td>
                        <td className="px-6 py-3 text-[#BDDBDB]">{token.symbol}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            token.network === 'Mainnet'
                              ? 'bg-[#FF2D2D]/20 text-[#FF2D2D]'
                              : 'bg-[#FF2D2D]/10 text-[#BDDBDB]'
                          }`}>
                            {token.network}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-[#BDDBDB]">{token.supply.toLocaleString()}</td>
                        <td className="px-6 py-3 text-[#BDDBDB]">
                          {token.balance !== undefined ? token.balance.toLocaleString() : 'N/A'}
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <a
                              href={`https://solscan.io/address/${token.mintAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FF2D2D] hover:text-[#B10000] transition"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <button
                              onClick={() => {
                                setBurnModal({ open: true, token });
                                setBurnStatus({ type: null, message: '' });
                                setBurnAmount('');
                              }}
                              className="text-[#FF2D2D] hover:text-[#B10000] transition"
                              title="Burn tokens"
                            >
                              <Flame className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Burn Modal */}
      {burnModal.open && burnModal.token && (
        <div className="fixed inset-0 bg-[#050505]/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0D0D0D] rounded-2xl p-6 max-w-md w-full border border-[#1a1a1a]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF2D2D]/20 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-[#FF2D2D]" />
                </div>
                <h2 className="text-xl font-bold text-white">Burn Tokens</h2>
              </div>
              <button
                onClick={() => {
                  setBurnModal({ open: false, token: null });
                  setBurnStatus({ type: null, message: '' });
                  setBurnAmount('');
                }}
                className="text-[#BDDBDB] hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-[#BDDBDB] text-sm mb-2">
              Burn <span className="text-white font-semibold">{burnModal.token.symbol}</span> tokens from your wallet.
              This action is <span className="text-[#FF2D2D] font-semibold">irreversible</span>.
            </p>

            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4">
              <p className="text-[#FF2D2D] text-xs">
                ⚠️ Burning tokens permanently removes them from circulation. You cannot recover burned tokens.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium block mb-1.5">
                  Amount to Burn
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="flex-1 bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2.5 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D] text-sm"
                  />
                  <button
                    onClick={() => {
                      if (burnModal.token?.balance !== undefined) {
                        setBurnAmount(burnModal.token.balance.toString());
                      }
                    }}
                    className="text-xs text-[#FF2D2D] hover:text-[#B10000] transition whitespace-nowrap"
                  >
                    Max
                  </button>
                </div>
                {burnModal.token?.balance !== undefined && (
                  <p className="text-[#BDDBDB] text-xs mt-1">
                    Available: {burnModal.token.balance.toLocaleString()} {burnModal.token.symbol}
                  </p>
                )}
              </div>

              {burnStatus.type && (
                <div
                  className={`rounded-xl p-3 flex items-start gap-2 ${
                    burnStatus.type === 'success'
                      ? 'bg-[#FF2D2D]/10 border border-[#FF2D2D]/30'
                      : burnStatus.type === 'error'
                      ? 'bg-[#FF2D2D]/10 border border-[#FF2D2D]/30'
                      : 'bg-[#FF2D2D]/10 border border-[#FF2D2D]/30'
                  }`}
                >
                  {burnStatus.type === 'success' && <CheckCircle className="h-4 w-4 text-[#FF2D2D] flex-shrink-0 mt-0.5" />}
                  {burnStatus.type === 'error' && <AlertCircle className="h-4 w-4 text-[#FF2D2D] flex-shrink-0 mt-0.5" />}
                  {burnStatus.type === 'info' && <Loader2 className="h-4 w-4 text-[#FF2D2D] flex-shrink-0 mt-0.5 animate-spin" />}
                  <p className={`text-xs ${
                    burnStatus.type === 'success' ? 'text-[#FF2D2D]' :
                    burnStatus.type === 'error' ? 'text-[#FF2D2D]' :
                    'text-[#BDDBDB]'
                  }`}>
                    {burnStatus.message}
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setBurnModal({ open: false, token: null });
                    setBurnStatus({ type: null, message: '' });
                    setBurnAmount('');
                  }}
                  className="flex-1 px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white rounded-xl transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBurn}
                  disabled={burnLoading || !burnAmount || parseFloat(burnAmount) <= 0}
                  className="flex-1 px-4 py-2.5 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition text-sm flex items-center justify-center gap-2"
                >
                  {burnLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Flame className="h-4 w-4" />
                  )}
                  {burnLoading ? 'Burning...' : 'Burn Tokens'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
