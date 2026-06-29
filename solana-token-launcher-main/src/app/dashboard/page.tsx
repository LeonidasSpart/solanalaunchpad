// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect, useContext } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey } from '@solana/web3.js';
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
  AlertCircle
} from 'lucide-react';

interface Token {
  mintAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  createdAt: string;
  network: string;
}

export default function DashboardPage() {
  const { publicKey, connected } = useWallet();
  const { network } = useContext(NetworkContext);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
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
        // In production, this would fetch from your database
        const mockTokens: Token[] = [
          {
            mintAddress: 'So11111111111111111111111111111111111111112',
            name: 'ZRPDEEPSEEK',
            symbol: 'ZDP',
            decimals: 9,
            supply: 1000000000,
            createdAt: new Date().toISOString(),
            network: 'Devnet',
          },
          {
            mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            name: 'SolToken',
            symbol: 'SOLT',
            decimals: 9,
            supply: 500000000,
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            network: 'Devnet',
          },
        ];

        setTokens(mockTokens);
        setStats({
          totalTokens: mockTokens.length,
          totalSupply: mockTokens.reduce((acc, t) => acc + t.supply, 0),
          totalHolders: 1427, // Mock data
        });
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [connected, publicKey]);

  if (!connected || !publicKey) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-zinc-900 rounded-xl p-12 border border-zinc-800">
          <Wallet className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h1>
          <p className="text-zinc-400 mb-6">Connect your wallet to view your dashboard and manage your tokens.</p>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
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
          <p className="text-zinc-400 text-sm">
            Connected: {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
          </p>
        </div>
        <Link
          href="/create-mint"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
        >
          <Plus className="h-4 w-4" />
          Create New Token
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
          <span className="ml-2 text-zinc-400">Loading your dashboard...</span>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Tokens</p>
                  <p className="text-2xl font-bold text-white">{stats.totalTokens}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-900/20 flex items-center justify-center">
                  <Coins className="h-5 w-5 text-purple-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Supply</p>
                  <p className="text-2xl font-bold text-white">{stats.totalSupply.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-900/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Holders</p>
                  <p className="text-2xl font-bold text-white">{stats.totalHolders.toLocaleString()}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-900/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tokens List */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-white font-semibold">Your Tokens</h2>
            </div>

            {tokens.length === 0 ? (
              <div className="text-center py-12">
                <Coins className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-zinc-400">You haven't created any tokens yet.</p>
                <Link
                  href="/create-mint"
                  className="inline-block mt-4 text-purple-400 hover:text-purple-300 transition"
                >
                  Create your first token →
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-800/50">
                      <th className="px-6 py-3 text-left text-zinc-400 font-medium">Token</th>
                      <th className="px-6 py-3 text-left text-zinc-400 font-medium">Symbol</th>
                      <th className="px-6 py-3 text-left text-zinc-400 font-medium">Network</th>
                      <th className="px-6 py-3 text-left text-zinc-400 font-medium">Supply</th>
                      <th className="px-6 py-3 text-left text-zinc-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token, index) => (
                      <motion.tr
                        key={token.mintAddress}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-zinc-800/50 hover:bg-zinc-800/20 transition"
                      >
                        <td className="px-6 py-3 text-white">{token.name}</td>
                        <td className="px-6 py-3 text-zinc-300">{token.symbol}</td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            token.network === 'Mainnet' 
                              ? 'bg-green-900/50 text-green-400' 
                              : 'bg-yellow-900/50 text-yellow-400'
                          }`}>
                            {token.network}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-zinc-300">{token.supply.toLocaleString()}</td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <a
                              href={`https://solscan.io/address/${token.mintAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 transition"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
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
    </div>
  );
}
