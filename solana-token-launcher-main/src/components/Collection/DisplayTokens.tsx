'use client';
import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey } from '@solana/web3.js';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { getTokenMetadata } from '@solana/spl-token';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Coins, AlertCircle } from 'lucide-react';
import EmptyCollection from '@/components/Collection/EmptyCollection';

interface TokenMetadata {
  name: string;
  symbol: string;
  image: string;
  description: string;
  mintAddress: string;
}

// Mock token data for testing
const MOCK_TOKENS = [
  'So11111111111111111111111111111111111111112',
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
];

const DisplayTokens = () => {
  const wallet = useWallet();
  const router = useRouter();
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  const handleMint = (mintAddress: string) => {
    router.push(`/tokens/${mintAddress}`);
  };

  const fetchMetadataFromUri = async (uri: string) => {
    try {
      const response = await fetch(uri);
      const metadata = await response.json();
      return metadata;
    } catch (error) {
      console.error('Error fetching metadata from URI:', error);
      return null;
    }
  };

  const fetchMetadata = async (mintAddress: string) => {
    try {
      const mintPubkey = new PublicKey(mintAddress);
      const metadata = await getTokenMetadata(
        connection,
        mintPubkey,
        'confirmed',
        TOKEN_2022_PROGRAM_ID,
      );
      
      if (metadata && metadata.uri) {
        const fullMetadata = await fetchMetadataFromUri(metadata.uri);
        
        if (fullMetadata) {
          return {
            name: metadata.name || 'Unknown',
            symbol: metadata.symbol || 'Unknown',
            image: fullMetadata.image || '/placeholder.svg?height=200&width=200',
            description: fullMetadata.description || '',
            mintAddress
          };
        }
      }
      
      return {
        name: metadata?.name || 'Unknown',
        symbol: metadata?.symbol || 'Unknown',
        image: '/placeholder.svg?height=200&width=200',
        description: '',
        mintAddress
      };
    } catch (error) {
      console.error('Error fetching metadata for token:', mintAddress, error);
      return {
        name: 'Unknown Token',
        symbol: 'Unknown',
        image: '/placeholder.svg?height=200&width=200',
        description: '',
        mintAddress
      };
    }
  };

  useEffect(() => {
    const fetchTokens = async () => {
      if (!wallet.publicKey) {
        setLoading(false);
        return;
      }

      try {
        // Use mock tokens instead of Firebase
        setTokens(MOCK_TOKENS);

        const metadataPromises = MOCK_TOKENS.map(fetchMetadata);
        const metadata = await Promise.all(metadataPromises);
        setTokenMetadata(metadata.filter(m => m != null));
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setError('Failed to fetch your tokens. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.publicKey]);

  // Show connect wallet message when not connected
  if (!wallet.publicKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Card className="max-w-md w-full bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Connect Your Wallet</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-zinc-400 mb-6">
              Connect your wallet to view your token collection.
            </p>
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
          </CardContent>
        </Card>
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
        >
          <Card className="mb-8 bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white">Your Token Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">
                Connected Wallet: {wallet.publicKey.toBase58().slice(0, 8)}...{wallet.publicKey.toBase58().slice(-8)}
              </p>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
              <span className="ml-2 text-zinc-400">Loading your tokens...</span>
            </div>
          ) : error ? (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-red-500">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-red-500">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <p>{error}</p>
                </div>
              </CardContent>
            </Card>
          ) : tokenMetadata.length > 0 ? (
            <AnimatePresence>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
              >
                {tokenMetadata.map((token) => (
                  <motion.div
                    key={token.mintAddress}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col bg-zinc-900 border-zinc-800">
                      <CardHeader>
                        <CardTitle className="text-xl text-white">{token.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <img
                          src={token.image}
                          alt={token.name}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <div className="space-y-2">
                          <p className="text-sm text-zinc-400">Symbol: {token.symbol}</p>
                          <p className="text-sm text-zinc-400 line-clamp-2">
                            Description: {token.description || 'No description available'}
                          </p>
                          <p className="text-sm text-zinc-400 truncate">
                            Mint Address: {token.mintAddress}
                          </p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={() => handleMint(token.mintAddress)}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <Coins className="mr-2 h-4 w-4" />
                          Mint Tokens
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <EmptyCollection />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DisplayTokens;
