'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Connection, PublicKey } from '@solana/web3.js';
import { getTokenMetadata, TOKEN_2022_PROGRAM_ID, getMint } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  ExternalLink, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  Coins,
  Hash,
  BarChart3,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { RPC_URLS, NETWORKS } from '@/lib/constants';

interface TokenDetail {
  name: string;
  symbol: string;
  image: string;
  description: string;
  uri: string;
  supply: number;
  decimals: number;
  mintAuthority: string | null;
  freezeAuthority: string | null;
  updateAuthority: string | null;
  yourBalance: number;
}

type NetworkType = 'devnet' | 'mainnet';

const TokenDetailPage = () => {
  const params = useParams();
  const wallet = useWallet();
  const mintAddress = params.mintAddress as string;
  
  const [network, setNetwork] = useState<NetworkType>('devnet');
  const [token, setToken] = useState<TokenDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const connection = new Connection(
    network === 'mainnet' ? RPC_URLS[NETWORKS.MAINNET] : RPC_URLS[NETWORKS.DEVNET],
    'confirmed'
  );

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fetchMetadataFromUri = async (uri: string): Promise<any> => {
    try {
      const response = await fetch(uri);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!mintAddress) return;

      setLoading(true);
      setError(null);

      try {
        const mintPubkey = new PublicKey(mintAddress);

        // Get mint info (supply, decimals, authorities)
        const mintInfo = await getMint(connection, mintPubkey, 'confirmed', TOKEN_2022_PROGRAM_ID);

        // Get metadata
        const metadata = await getTokenMetadata(
          connection,
          mintPubkey,
          'confirmed',
          TOKEN_2022_PROGRAM_ID
        );

        // Get user's balance
        let yourBalance = 0;
        if (wallet.publicKey) {
          try {
            const { getAssociatedTokenAddressSync } = await import('@solana/spl-token');
            const ata = getAssociatedTokenAddressSync(mintPubkey, wallet.publicKey);
            const accountInfo = await connection.getParsedAccountInfo(ata);
            if (accountInfo.value && 'parsed' in accountInfo.value.data) {
              yourBalance = Number(accountInfo.value.data.parsed.info.tokenAmount.uiAmount);
            }
          } catch {
            yourBalance = 0;
          }
        }

        let name = 'Unknown Token';
        let symbol = '???';
        let image = '/placeholder.svg?height=400&width=400';
        let description = '';
        let uri = '';

        if (metadata && metadata.uri) {
          uri = metadata.uri;
          const offChain = await fetchMetadataFromUri(metadata.uri);
          if (offChain) {
            name = offChain.name || metadata.name || 'Unknown Token';
            symbol = offChain.symbol || metadata.symbol || '???';
            image = offChain.image || '/placeholder.svg?height=400&width=400';
            description = offChain.description || '';
          } else {
            name = metadata.name || 'Unknown Token';
            symbol = metadata.symbol || '???';
          }
        }

        setToken({
          name,
          symbol,
          image,
          description,
          uri,
          supply: Number(mintInfo.supply) / Math.pow(10, mintInfo.decimals),
          decimals: mintInfo.decimals,
          mintAuthority: mintInfo.mintAuthority?.toBase58() || null,
          freezeAuthority: mintInfo.freezeAuthority?.toBase58() || null,
          updateAuthority: metadata?.updateAuthority?.toBase58() || null,
          yourBalance,
        });
      } catch (err) {
        console.error('Error fetching token details:', err);
        setError('Failed to load token details. The mint address may be invalid.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
  }, [mintAddress, network, wallet.publicKey, connection]);

  const solscanUrl = network === 'mainnet'
    ? `https://solscan.io/token/${mintAddress}`
    : `https://solscan.io/token/${mintAddress}?cluster=devnet`;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading token details...</p>
        </div>
      </div>
    );
  }

  if (error || !token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShieldAlert className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Token Not Found</h2>
          <p className="text-zinc-400 mb-6">{error || 'Could not load token details.'}</p>
          <Link 
            href="/tokens" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tokens
          </Link>
        </div>
      </div>
    );
  }

  const isMintRevoked = !token.mintAuthority;
  const isFreezeRevoked = !token.freezeAuthority;
  const isUpdateRevoked = !token.updateAuthority;

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/tokens" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </Link>
        </motion.div>

        {/* Network Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5">
            <button
              onClick={() => setNetwork('devnet')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                network === 'devnet'
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Devnet
            </button>
            <button
              onClick={() => setNetwork('mainnet')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                network === 'mainnet'
                  ? 'bg-purple-600 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Mainnet
            </button>
          </div>
        </div>

        {/* Token Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-1/3 h-64 md:h-auto bg-zinc-800 relative">
              <img
                src={token.image}
                alt={token.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg?height=400&width=400';
                }}
              />
            </div>

            {/* Info */}
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">{token.name}</h1>
                  <p className="text-xl text-purple-400 font-semibold">{token.symbol}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  network === 'mainnet' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}>
                  {network === 'mainnet' ? '⚡ Mainnet' : '🧪 Devnet'}
                </span>
              </div>

              {token.description && (
                <p className="text-zinc-400 mb-6 leading-relaxed">{token.description}</p>
              )}

              {/* Mint Address */}
              <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-500 font-medium">Mint Address</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(mintAddress, 'mint')}
                      className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                      title="Copy"
                    >
                      {copiedField === 'mint' ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-zinc-400" />
                      )}
                    </button>
                    <a
                      href={solscanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
                      title="View on Solscan"
                    >
                      <ExternalLink className="h-4 w-4 text-zinc-400" />
                    </a>
                  </div>
                </div>
                <p className="text-sm font-mono text-zinc-300 break-all">{mintAddress}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-zinc-800/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-zinc-500">Total Supply</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {token.supply.toLocaleString()}
                  </p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-zinc-500">Decimals</span>
                  </div>
                  <p className="text-lg font-bold text-white">{token.decimals}</p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-zinc-500">Your Balance</span>
                  </div>
                  <p className="text-lg font-bold text-white">
                    {token.yourBalance.toLocaleString()}
                  </p>
                </div>
                <div className="bg-zinc-800/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-zinc-500">Symbol</span>
                  </div>
                  <p className="text-lg font-bold text-white">{token.symbol}</p>
                </div>
              </div>

              {/* Security Status */}
              <div className="border-t border-zinc-800 pt-6">
                <h3 className="text-sm font-semibold text-zinc-400 mb-4 uppercase tracking-wider">
                  Security Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${
                    isMintRevoked ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    {isMintRevoked ? (
                      <ShieldCheck className="h-5 w-5 text-green-400" />
                    ) : (
                      <Shield className="h-5 w-5 text-yellow-400" />
                    )}
                    <div>
                      <p className={`text-sm font-semibold ${isMintRevoked ? 'text-green-400' : 'text-yellow-400'}`}>
                        Mint Authority
                      </p>
                      <p className="text-xs text-zinc-500">
                        {isMintRevoked ? 'Revoked ✓' : 'Active'}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-xl ${
                    isFreezeRevoked ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    {isFreezeRevoked ? (
                      <ShieldCheck className="h-5 w-5 text-green-400" />
                    ) : (
                      <Shield className="h-5 w-5 text-yellow-400" />
                    )}
                    <div>
                      <p className={`text-sm font-semibold ${isFreezeRevoked ? 'text-green-400' : 'text-yellow-400'}`}>
                        Freeze Authority
                      </p>
                      <p className="text-xs text-zinc-500">
                        {isFreezeRevoked ? 'Revoked ✓' : 'Active'}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-xl ${
                    isUpdateRevoked ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    {isUpdateRevoked ? (
                      <ShieldCheck className="h-5 w-5 text-green-400" />
                    ) : (
                      <Shield className="h-5 w-5 text-yellow-400" />
                    )}
                    <div>
                      <p className={`text-sm font-semibold ${isUpdateRevoked ? 'text-green-400' : 'text-yellow-400'}`}>
                        Update Authority
                      </p>
                      <p className="text-xs text-zinc-500">
                        {isUpdateRevoked ? 'Revoked ✓' : 'Active'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TokenDetailPage;
