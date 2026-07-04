'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
  Globe2,
  Share2
} from 'lucide-react';
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

const metadataCache = new Map<string, any>();

const DisplayTokens = () => {
  const wallet = useWallet();
  const [network, setNetwork] = useState<NetworkType>('devnet');
  const [viewMode, setViewMode] = useState<ViewMode>('my');
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedMint, setCopiedMint] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');

  const connection = useMemo(
    () => new Connection(
      network === 'mainnet' ? RPC_URLS[NETWORKS.MAINNET] : RPC_URLS[NETWORKS.DEVNET],
      'confirmed'
    ),
    [network]
  );

  const fetchMetadataFromUri = async (uri: string): Promise<any> => {
    if (metadataCache.has(uri)) return metadataCache.get(uri);

    try {
      const response = await fetch(uri);
      if (!response.ok) return null;
      const data = await response.json();
      metadataCache.set(uri, data);
      return data;
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
        { programId: TOKEN_PROGRAM_ID }
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
            TOKEN_PROGRAM_ID
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
      setLastRefresh(new Date());
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

  useEffect(() => {
    if (viewMode === 'all') {
      const interval = setInterval(fetchAllTokens, 15000);
      return () => clearInterval(interval);
    }
  }, [viewMode, fetchAllTokens]);

  const handleCopyMint = (mint: string) => {
    navigator.clipboard.writeText(mint);
    setCopiedMint(mint);
    setTimeout(() => setCopiedMint(null), 2000);
  };

  const handleShareToX = (token: TokenData) => {
    const text = `Just launched ${token.name} (${token.symbol}) on ZRP! Check it out: https://zrp.one/tokens`;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(`https://solscan.io/token/${token.mint}${network === 'devnet' ? '?cluster=devnet' : ''}`)}`;
    window.open(url, '_blank');
  };

  const solscanBaseUrl = network === 'mainnet' 
    ? 'https://solscan.io/token/' 
    : 'https://solscan.io/token/?cluster=devnet';

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.mint.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <button onClick={() => setViewMode('my')} className={`...`}>My Tokens</button>
                <button onClick={() => setViewMode('all')} className={`...`}>All Tokens</button>
              </div>

              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5">
                <button onClick={() => setNetwork('devnet')} className={`...`}>Devnet</button>
                <button onClick={() => setNetwork('mainnet')} className={`...`}>Mainnet</button>
              </div>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search by name, symbol or mint..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm w-full max-w-md focus:outline-none focus:border-purple-500"
          />

          <div className="flex items-center gap-2 mt-4">
            {/* your existing status badges */}
            {viewMode === 'all' && <span className="text-xs text-zinc-500">• Auto-refreshing</span>}
          </div>
        </motion.div>

        {/* Rest of your render logic with filteredTokens instead of tokens */}

        {tokens.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTokens.map((token) => (
                <motion.div key={token.mint} className="group">
                  {/* your existing card JSX with added Share button */}
                  <button
                    onClick={() => handleShareToX(token)}
                    className="p-2 hover:bg-zinc-700 rounded-md transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
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
