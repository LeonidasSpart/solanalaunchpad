'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Send } from 'lucide-react';

interface Collection {
  id: number;
  name: string;
  symbol: string;
  description: string;
  collection_mint: string;
  max_supply: number;
  price_sol: number;
  creator_wallet: string;
}

interface NFT {
  id: number;
  mint_address: string;
  metadata_uri: string;
  owner_wallet: string;
  minted_at: string;
}

export default function NFTCollectionDetail() {
  const params = useParams();
  const id = params.id as string;
  const { publicKey, connected } = useWallet();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/nft/collections/${id}`);
      if (!res.ok) throw new Error('Collection not found');
      const data = await res.json();
      setCollection(data);
      // Optionally fetch NFTs in this collection – you may need another endpoint.
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleMint = async () => {
    if (!connected || !publicKey) {
      setError('Connect your wallet first');
      return;
    }
    setMinting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/nft/collections/${id}/mint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner_wallet: publicKey.toBase58(),
          name: `${collection?.name} #${nfts.length + 1}`,
          description: collection?.description,
        }),
      });
      if (!res.ok) throw new Error('Mint failed');
      const data = await res.json();
      setSuccess(`✅ Minted! Address: ${data.mint_address.slice(0, 8)}...`);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setMinting(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-[#BDDBDB]">Loading...</div>;
  if (!collection) return <div className="text-center py-12 text-[#BDDBDB]">Collection not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/nft" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Collections
      </Link>
      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <h1 className="text-2xl font-bold text-white">{collection.name}</h1>
        <p className="text-[#BDDBDB] text-sm">{collection.symbol}</p>
        <p className="text-[#BDDBDB] mt-2">{collection.description}</p>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-[#BDDBDB] text-xs">Total Supply</p>
            <p className="text-white font-bold">{collection.max_supply}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-[#BDDBDB] text-xs">Minted</p>
            <p className="text-white font-bold">{nfts.length}</p>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-[#BDDBDB] text-xs">Price</p>
            <p className="text-white font-bold">{collection.price_sol} SOL</p>
          </div>
        </div>
        <button
          onClick={handleMint}
          disabled={minting}
          className="mt-6 w-full py-3 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
        >
          {minting ? <><Loader2 className="h-5 w-5 animate-spin" /> Minting...</> : <><Send className="h-5 w-5" /> Mint NFT</>}
        </button>
        {error && <div className="mt-4 text-[#FF2D2D] text-sm">{error}</div>}
        {success && <div className="mt-4 text-green-400 text-sm">{success}</div>}
      </div>
    </div>
  );
}
