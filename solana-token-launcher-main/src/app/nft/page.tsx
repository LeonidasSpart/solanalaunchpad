'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface Collection {
  id: number;
  name: string;
  symbol: string;
  description: string;
  collection_mint: string;
  max_supply: number;
  price_sol: number;
  creator_wallet: string;
  network: string;
  created_at: string;
}

export default function NFTCollectionsPage() {
  const { connected } = useWallet();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/nft/collections')
      .then(res => res.json())
      .then(data => { setCollections(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12 text-[#BDDBDB]">Loading collections...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">🎨 NFT Collections</h1>
        <Link href="/nft/create" className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-4 py-2 rounded-xl transition">
          + Create Collection
        </Link>
      </div>

      {collections.length === 0 ? (
        <p className="text-[#BDDBDB] text-center">No NFT collections yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link key={col.id} href={`/nft/${col.id}`} className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h2 className="text-xl font-bold text-white">{col.name}</h2>
              <p className="text-[#BDDBDB] text-sm">{col.symbol}</p>
              <p className="text-[#BDDBDB] text-sm mt-2">Supply: {col.max_supply}</p>
              <p className="text-[#BDDBDB] text-sm">Price: {col.price_sol} SOL</p>
              <p className="text-[#BDDBDB] text-xs mt-2 font-mono">{col.collection_mint.slice(0, 8)}...</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
