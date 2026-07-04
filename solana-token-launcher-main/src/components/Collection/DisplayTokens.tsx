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
  Globe2
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

const DisplayTokens = () => {
  const wallet = useWallet();
  const [network, setNetwork] = useState<NetworkType>('devnet');
  const [viewMode, setViewMode] = useState<ViewMode>('my');
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedMint, setCopiedMint] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const connection = useMemo(
    () => new Connection(
      network === 'mainnet' ? RPC_URLS[NETWORKS.MAINNET] : RPC_URLS[NETWORKS.DEVNET],
      'confirmed'
    ),
    [network]
  );

  // ... (keep your existing fetchMetadataFromUri and fetchWalletTokens unchanged)

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

  // Auto-refresh for "All Tokens" view
  useEffect(() => {
    if (viewMode === 'all') {
      const interval = setInterval(() => {
        fetchAllTokens();
      }, 15000); // every 15 seconds

      return () => clearInterval(interval);
    }
  }, [viewMode, fetchAllTokens]);

  // ... keep the rest of your useEffect, handleCopyMint, etc. unchanged

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header - add refresh indicator */}
        <motion.div className="mb-8">
          {/* ... your existing header ... */}
          {viewMode === 'all' && (
            <p className="text-xs text-zinc-500 mt-1">
              Auto-refreshing • Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </motion.div>

        {/* Rest of your render logic stays the same, but improve image handling in cards */}

        {tokens.map((token) => (
          <motion.div key={token.mint} ... >
            <div className="...">
              <div className="relative h-48 bg-zinc-800 overflow-hidden">
                <img
                  src={token.image}
                  alt={token.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200/1f2937/ffffff?text=No+Image';
                  }}
                />
                {/* ... your existing badges ... */}
              </div>
              {/* rest unchanged */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTokens;
