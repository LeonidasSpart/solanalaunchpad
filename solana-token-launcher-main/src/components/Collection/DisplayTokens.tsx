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

  // Auto-refresh for All Tokens
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

  const solscanBaseUrl = network === 'mainnet' 
    ? 'https://solscan.io/token/' 
    : 'https://solscan.io/token/?cluster=devnet';

  // ... (keep your existing return JSX exactly as before, or let me know if you want me to adjust the card layout too)

  return (
    // Your original return JSX here — no changes needed for now
    // Just make sure the image onError fallback is good
  );
};

export default DisplayTokens;
