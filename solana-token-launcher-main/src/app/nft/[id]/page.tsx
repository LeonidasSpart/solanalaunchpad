'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Send, ImageOff } from 'lucide-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

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
  image_url?: string | null;
}

const MINTING_FEE_PERCENT = 3; // 3%

export default function NFTCollectionDetail() {
  const params = useParams();
  const id = params.id as string;
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [feeAmount, setFeeAmount] = useState<number>(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch collection
      const collRes = await fetch(`/api/nft/collections/${id}`);
      if (!collRes.ok) throw new Error('Collection not found');
      const collData = await collRes.json();
      setCollection(collData);
      // Calculate fee
      const mintPrice = parseFloat(collData.price_sol || '0');
      const fee = mintPrice * (MINTING_FEE_PERCENT / 100);
      setFeeAmount(fee);

      // Fetch NFTs in this collection (API now returns image_url)
      const nftRes = await fetch(`/api/nft/collections/${id}/tokens`);
      if (nftRes.ok) {
        const nftData = await nftRes.json();
        setNfts(nftData);
      }
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
    if (collection && nfts.length >= collection.max_supply) {
      setError('Sold out!');
      return;
    }

    setMinting(true);
    setError(null);
    setSuccess(null);

    try {
      // ─── 1. Send fee transaction (if fee > 0) ──────────────────────
      let feeSignature = null;
      if (feeAmount > 0) {
        const feeWallet = new PublicKey(process.env.NEXT_PUBLIC_FEE_REC!);
        const tx = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: feeWallet,
            lamports: feeAmount * LAMPORTS_PER_SOL,
          })
        );
        const { blockhash } = await connection.getLatestBlockhash();
        tx.recentBlockhash = blockhash;
        tx.feePayer = publicKey;
        feeSignature = await sendTransaction(tx, connection);
        await connection.confirmTransaction(feeSignature);
      }

      // ─── 2. Mint NFT via API ────────────────────────────────────────
      const res = await fetch(`/api/nft/collections/${id}/mint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner_wallet: publicKey.toBase58(),
          name: `${collection?.name} #${nfts.length + 1}`,
          description: collection?.description,
          fee_tx_signature: feeSignature,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Mint failed');
      }
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

  const isSoldOut = nfts.length >= collection.max_supply;

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

        {feeAmount > 0 && (
          <div className="mt-4 bg-[#1a1a1a] rounded-xl p-3 text-center border border-[#FF2D2D]/20">
            <p className="text-[#BDDBDB] text-sm">
              Minting fee: <span className="text-white font-bold">{feeAmount.toFixed(4)} SOL</span>
            </p>
            <p className="text-[#BDDBDB] text-xs opacity-50">Fee goes to the platform</p>
          </div>
        )}

        {isSoldOut ? (
          <div className="mt-6 text-center py-4 bg-[#1a1a1a] rounded-xl border border-[#FF2D2D]/30">
            <p className="text-[#FF2D2D] font-bold text-lg">🎉 Sold Out!</p>
            <p className="text-[#BDDBDB] text-sm">All NFTs have been minted.</p>
          </div>
        ) : (
          <button
            onClick={handleMint}
            disabled={minting}
            className="mt-6 w-full py-3 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            {minting ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Minting...</>
            ) : (
              <><Send className="h-5 w-5" /> Mint NFT</>
            )}
          </button>
        )}

        {error && <div className="mt-4 text-[#FF2D2D] text-sm">{error}</div>}
        {success && <div className="mt-4 text-green-400 text-sm">{success}</div>}
      </div>

      {/* ─── NFT Gallery with Images ────────────────────────────────── */}
      {nfts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Minted NFTs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nfts.map((nft) => (
              <div key={nft.id} className="bg-[#1a1a1a] rounded-xl p-3 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition">
                <div className="aspect-square bg-[#050505] rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                  {nft.image_url ? (
                    <img src={nft.image_url} alt={`NFT #${nft.id}`} className="w-full h-full object-cover" />
                  ) : (
                    <ImageOff className="h-8 w-8 text-[#BDDBDB] opacity-30" />
                  )}
                </div>
                <p className="text-white text-sm truncate font-mono">{nft.mint_address.slice(0, 8)}...</p>
                <p className="text-[#BDDBDB] text-xs">Owner: {nft.owner_wallet.slice(0, 6)}...</p>
                <p className="text-[#BDDBDB] text-xs opacity-50">{new Date(nft.minted_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
