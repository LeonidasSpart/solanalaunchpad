'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey } from '@solana/web3.js';
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Coins, AlertCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EmptyCollection from '@/components/Collection/EmptyCollection';
import { RPC_URLS, NETWORKS } from '@/lib/constants';

interface TokenData {
  mint: string;
  name: string;
  symbol: string;
  image: string;
  description: string;
  balance: number;
  decimals: number;
  uri: string;
}

const DisplayTokens = () => {
  const wallet = useWallet();
  const router = useRouter();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedMint, setCopiedMint] = useState<string | null>(null);

  const connection = new Connection(RPC_URLS[NETWORKS.DEVNET], 'confirmed');

  const fetchMetadataFromUri = async (uri: string): Promise<any> => {
    try {
      const response = await fetch(uri);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  };

  const fetchWalletTokens = useCallback(async () => {
    if (!wallet.publicKey) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get all token accounts owned by the wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        wallet.publicKey,
        { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }
      );

      const tokenDataPromises = tokenAccounts.value.map(async (account) => {
        const parsedInfo = account.account.data.parsed.info;
        const mintAddress = parsedInfo.mint;
        const tokenAmount = parsedInfo.tokenAmount;
        const balance = Number(tokenAmount.uiAmount);
        const decimals = tokenAmount.decimals;

        // Skip tokens with 0 balance
        if (balance === 0) return null;

        try {
          // Fetch on-chain metadata
          const metadata = await getTokenMetadata(
            connection,
            new PublicKey(mintAddress),
            'confirmed',
            TOKEN_2022_PROGRAM_ID
          );

          let name = 'Unknown Token';
          let symbol = '???';
          let image = '/placeholder.svg?height=200&width=200';
          let description = '';
          let uri = '';

          if (metadata && metadata.uri) {
            uri = metadata.uri;
            const offChainMetadata = await fetchMetadataFromUri(metadata.uri);
            if (offChainMetadata) {
              name = offChainMetadata.name || metadata.name || 'Unknown Token';
              symbol = offChainMetadata.symbol || metadata.symbol || '???';
              image = offChainMetadata.image || '/placeholder.svg?height=200&width=200';
              description = offChainMetadata.description || '';
            } else {
              name = metadata.name || 'Unknown Token';
              symbol = metadata.symbol || '???';
            }
          }

          return {
            mint: mintAddress,
            name,
            symbol,
            image,
            description,
            balance,
            decimals,
            uri,
          } as TokenData;
        } catch {
          // If metadata fetch fails, return basic info
          return {
            mint: mintAddress,
            name: 'Unknown Token',
            symbol: '???',
            image: '/placeholder.svg?height=200&width=200',
            description: '',
            balance,
            decimals,
            uri: '',
          } as TokenData;
        }
      });

      const results = await Promise.all(tokenDataPromises);
      const validTokens = results.filter((t): t is TokenData => t !== null);
      
      // Sort by balance descending
      validTokens.sort((a, b) => b.balance - a.balance);
      
      setTokens(validTokens);
    } catch (err) {
      console.error('Error fetching tokens:', err);
      setError('Failed to fetch your tokens. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [wallet.publicKey, connection]);

  useEffect(() => {
    fetchWalletTokens();
  }, [fetchWalletTokens]);

  const handleCopyMint = (mint: string) => {
    navigator.clipboard.writeText(mint);
    setCopiedMint(mint);
    setTimeout(() => setCopiedMint(null), 2000);
  };

  const handleViewToken = (mint: string) => {
    router.push(`/tokens/${mint}`);
  };

  // Not connected state
  if (!wallet.publicKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Coins className="w-10 h-10 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Your Token Collection</h2>
          <p className="text-zinc-400 mb-8">
            Connect your wallet to view all your SPL tokens created on Solana.
          </p>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Your Token Collection</h1>
          <p className="text-zinc-400">
            Connected: {wallet.publicKey.toBase58().slice(0, 6)}...{wallet.publicKey.toBase58().slice(-6)}
          </p>
          <p className="text-sm text-zinc-500 mt-1">
            {tokens.length} token{tokens.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400 mb-4" />
            <span className="text-zinc-400">Loading your tokens...</span>
          </div>
        ) : error ? (
          /* Error */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center"
          >
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchWalletTokens}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        ) : tokens.length > 0 ? (
          /* Token Grid */
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {tokens.map((token) => (
                <motion.div
                  key={token.mint}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="group"
                >
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    {/* Image */}
                    <div className="relative h-48 bg-zinc-800 overflow-hidden">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg?height=200&width=200';
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-semibold text-white">
                          {token.balance.toLocaleString()} {token.symbol}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white">{token.name}</h3>
                          <p className="text-sm text-purple-400 font-medium">{token.symbol}</p>
                        </div>
                      </div>

                      {token.description && (
                        <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                          {token.description}
                        </p>
                      )}

                      {/* Mint Address */}
                      <div className="flex items-center gap-2 bg-zinc-800/50 rounded-lg p-2 mb-4">
                        <span className="text-xs text-zinc-500 font-mono truncate flex-1">
                          {token.mint.slice(0, 12)}...{token.mint.slice(-8)}
                        </span>
                        <button
                          onClick={() => handleCopyMint(token.mint)}
                          className="p-1.5 hover:bg-zinc-700 rounded-md transition-colors"
                          title="Copy mint address"
                        >
                          {copiedMint === token.mint ? (
                            <Check className="h-3.5 w-3.5 text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-zinc-400" />
                          )}
                        </button>
                        <a
                          href={`https://solscan.io/token/${token.mint}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-zinc-700 rounded-md transition-colors"
                          title="View on Solscan"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                        </a>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewToken(token.mint)}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Coins className="h-4 w-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Empty State */
          <EmptyCollection />
        )}
      </div>
    </div>
  );
};

export default DisplayTokens;
