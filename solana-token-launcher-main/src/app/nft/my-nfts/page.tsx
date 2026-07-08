'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { ImageOff, Loader2 } from 'lucide-react';

interface NFT {
  id: number;
  mint_address: string;
  metadata_uri: string;
  collection_id: number;
  owner_wallet: string;
  minted_at: string;
  image_url?: string | null;
}

export default function MyNFTs() {
  const { publicKey, connected } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) {
      setLoading(false);
      return;
    }
    const fetchOwned = async () => {
      try {
        const res = await fetch(`/api/nft/owned?wallet=${publicKey.toBase58()}`);
        if (!res.ok) throw new Error('Failed to fetch your NFTs');
        const data = await res.json();
        setNfts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOwned();
  }, [connected, publicKey]);

  if (!connected) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
          <p className="text-white mb-4">Connect your wallet to see your NFTs.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="h-8 w-8 text-[#FF2D2D] animate-spin mx-auto" />
        <p className="text-[#BDDBDB] mt-4">Loading your NFTs...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-[#FF2D2D]">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">🎨 My NFTs</h1>
      {nfts.length === 0 ? (
        <p className="text-[#BDDBDB]">You don’t own any NFTs yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-[#0D0D0D] rounded-xl p-3 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition">
              <div className="aspect-square bg-[#050505] rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                {nft.image_url ? (
                  <img src={nft.image_url} alt={`NFT #${nft.id}`} className="w-full h-full object-cover" />
                ) : (
                  <ImageOff className="h-8 w-8 text-[#BDDBDB] opacity-30" />
                )}
              </div>
              <p className="text-white text-sm truncate font-mono">{nft.mint_address.slice(0, 8)}...</p>
              <Link href={`/nft/${nft.collection_id}`} className="text-[#FF2D2D] text-xs hover:underline">
                View Collection
              </Link>
              <p className="text-[#BDDBDB] text-xs opacity-50">{new Date(nft.minted_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
