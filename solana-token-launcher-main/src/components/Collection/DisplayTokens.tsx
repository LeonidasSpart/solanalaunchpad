'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey } from '@solana/web3.js';
import { getTokenMetadata, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  Coins, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe,
  User,
  Globe2
} from 'lucide-react';
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
  creator_wallet?: string;
  created_at?: string;
  revoke_mint?: boolean;
  revoke_freeze?: boolean;
  revoke_update?: boolean;
}

type NetworkType = 'devnet' | 'mainnet';
type ViewMode = 'my' | 'all';

const DisplayTokens = () => {
  const wallet = useWallet();
  const router = useRouter();
  const [network, setNetwork] = useState<NetworkType>('devnet');
  const [viewMode, setViewMode] = useState<ViewMode>('my');
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedMint, setCopiedMint] = useState<string | null>(null);

  // Stable connection — only changes when network changes
  const connection = React.useMemo(
    () => new Connection(
      network === 'mainnet' ? RPC_URLS[NETWORKS.MAINNET] : RPC_URLS[NETWORKS.DEVNET],
      'confirmed'
    ),
    [network]
  );

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
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        wallet.publicKey,
        { programId: TOKEN_PROGRAM_ID }  // ← use imported constant
      );

      const tokenDataPromises = tokenAccounts.value.map(async (account) => {
        const parsedInfo = account.account.data.parsed.info;
        const mintAddress = parsedInfo.mint;
        const tokenAmount = parsedInfo.tokenAmount;
        const balance = Number(tokenAmount.uiAmount);
        const decimals = tokenAmount.decimals;

        if (balance === 0) return null;

        try {
          const metadata = await getTokenMetadata(
            connection,
            new PublicKey(mintAddress),
            'confirmed',
            TOKEN_PROGRAM_ID  // ← legacy program, matches create-token.ts
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
      validTokens.sort((a, b) => b.balance - a.balance);
      setTokens(validTokens);
    } catch (err) {
      console.error('Error fetching tokens:', err);
      setError('Failed to fetch your tokens. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [wallet.publicKey, connection]);

  const fetchAllTokens = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/tokens?network=${network}&limit=50`);
      if (!response.ok) throw new Error('Failed to fetch tokens');
      const data = await response.json();
      setTokens(data.map((t: any) => ({
        mint: t.mint_address,
        name: t.name,
        symbol: t.symbol,
        image: t.image_url || '/placeholder.svg?height=200&width=200',
        description: t.description,
        balance: Number(t.supply) / Math.pow(10, t.decimals),
        decimals: t.decimals,
        uri: t.metadata_uri,
        creator_wallet: t.creator_wallet,
        created_at: t.created_at,
        revoke_mint: t.revoke_mint,
        revoke_freeze: t.revoke_freeze,
        revoke_update: t.revoke_update,
      })));
    } catch (err) {
      console.error('Error fetching all tokens:', err);
      setError('Failed to fetch tokens from database.');
    } finally {
      setLoading(false);
    }
  }, [network]);

  useEffect(() => {
    if (viewMode === 'my') {
      fetchWalletTokens();
    } else {
      fetchAllTokens();
    }
  }, [viewMode, fetchWalletTokens, fetchAllTokens]);

  const handleCopyMint = (mint: string) => {
    navigator.clipboard.writeText(mint);
    setCopiedMint(mint);
    setTimeout(() => setCopiedMint(null), 2000);
  };

  const solscanBaseUrl = network === 'mainnet' 
    ? 'https://solscan.io/token/' 
    : 'https://solscan.io/token/?cluster=devnet';

  if (!wallet.publicKey && viewMode === 'my') {
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
            Connect your wallet to view all your SPL tokens on {network === 'mainnet' ? 'Mainnet' : 'Devnet'}.
          </p>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Token Explorer</h1>
              {wallet.publicKey && (
                <p className="text-zinc-400 text-sm">
                  Connected: {wallet.publicKey.toBase58().slice(0, 6)}...{wallet.publicKey.toBase58().slice(-6)}
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5">
                <button
                  onClick={() => setViewMode('my')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    viewMode === 'my'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <User className="h-4 w-4" />
                  My Tokens
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    viewMode === 'all'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Globe2 className="h-4 w-4" />
                  All Tokens
                </button>
              </div>

              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5">
                <button
                  onClick={() => setNetwork('devnet')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    network === 'devnet'
                      ? 'bg-purple-600 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  Devnet
                </button>
                <button
                  onClick={() => setNetwork('mainnet')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    network === 'mainnet'
                      ? 'bg-purple-600 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  Mainnet
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              network === 'mainnet' 
                ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${network === 'mainnet' ? 'bg-green-400' : 'bg-yellow-400'}`} />
              {network === 'mainnet' ? '⚡ Live Mainnet' : '🧪 Devnet Testing'}
            </span>
            <span className="text-sm text-zinc-500">
              {viewMode === 'my' ? 'Your wallet tokens' : 'All tokens created on ZRP'}
            </span>
            <span className="text-sm text-zinc-500">
              • {tokens.length} token{tokens.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400 mb-4" />
            <span className="text-zinc-400">
              {viewMode === 'my' ? 'Loading your tokens...' : 'Loading all tokens...'}
            </span>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center"
          >
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <p className="text-red-400">{error}</p>
            <button
              onClick={viewMode === 'my' ? fetchWalletTokens : fetchAllTokens}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        ) : tokens.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${network}`}
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
                      {viewMode === 'all' && token.revoke_mint && token.revoke_freeze && token.revoke_update && (
                        <div className="absolute top-3 left-3 bg-green-500/20 backdrop-blur-sm rounded-full px-2 py-1">
                          <span className="text-xs font-semibold text-green-400">✓ Fully Secure</span>
                        </div>
                      )}
                    </div>

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

                      {viewMode === 'all' && token.creator_wallet && (
                        <p className="text-xs text-zinc-500 mb-3">
                          Created by: {token.creator_wallet.slice(0, 6)}...{token.creator_wallet.slice(-6)}
                          {token.created_at && ` • ${new Date(token.created_at).toLocaleDateString()}`}
                        </p>
                      )}

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
                          href={`${solscanBaseUrl}${token.mint}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-zinc-700 rounded-md transition-colors"
                          title="View on Solscan"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
                        </a>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={`${solscanBaseUrl}${token.mint}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View on Explorer
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <EmptyCollection />
        )}
      </div>
    </div>
  );
};

export default DisplayTokens;
