'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

const CREATION_FEE_SOL = 0.15;

export default function CreateNFTCollection() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feeLoading, setFeeLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    description: '',
    royalty_basis_points: '0',
    max_supply: '',
    price_sol: '0',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      setError('Connect wallet first');
      return;
    }

    // ─── Validate fields ──────────────────────────────────────────
    const maxSupplyNum = parseInt(form.max_supply);
    if (isNaN(maxSupplyNum) || maxSupplyNum <= 0) {
      setError('Max supply must be a positive integer (e.g., 10)');
      return;
    }
    const royalty = parseInt(form.royalty_basis_points);
    if (isNaN(royalty) || royalty < 0 || royalty > 10000) {
      setError('Royalty must be between 0 and 10000 (0-100%)');
      return;
    }
    const price = parseFloat(form.price_sol);
    if (isNaN(price) || price < 0) {
      setError('Price must be a non-negative number');
      return;
    }

    setLoading(true);
    setError(null);
    setFeeLoading(true);

    try {
      // ─── 1. Send fee transaction ────────────────────────────────────
      const feeWallet = new PublicKey(process.env.NEXT_PUBLIC_FEE_REC!);
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: feeWallet,
          lamports: CREATION_FEE_SOL * LAMPORTS_PER_SOL,
        })
      );
      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;
      const feeSignature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(feeSignature);

      setFeeLoading(false);

      // ─── 2. Create collection via API ──────────────────────────────
      const res = await fetch('/api/nft/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          creator_wallet: publicKey.toBase58(),
          royalty_basis_points: royalty,
          max_supply: maxSupplyNum,
          price_sol: price,
          fee_tx_signature: feeSignature,
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create collection');
      }
      const data = await res.json();
      router.push(`/nft/${data.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFeeLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
          <p className="text-white mb-4">Connect your wallet to create an NFT collection.</p>
          <WalletMultiButton className="!bg-[#FF2D2D] hover:!bg-[#B10000] !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link href="/nft" className="text-[#BDDBDB] hover:text-white transition inline-flex items-center gap-2 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Collections
      </Link>
      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]">
        <h1 className="text-2xl font-bold text-white mb-4">Create NFT Collection</h1>
        <div className="bg-[#1a1a1a] rounded-xl p-3 mb-4 text-center">
          <p className="text-[#BDDBDB] text-sm">
            Creation Fee: <span className="text-white font-bold">{CREATION_FEE_SOL} SOL</span>
          </p>
          <p className="text-[#BDDBDB] text-xs opacity-50">Fee goes to the platform</p>
        </div>
        {error && <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 mb-4 text-[#FF2D2D] text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm block mb-1">Collection Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Symbol *</label>
            <input
              type="text"
              name="symbol"
              value={form.symbol}
              onChange={handleChange}
              required
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm block mb-1">Royalty (%)</label>
              <input
                type="number"
                name="royalty_basis_points"
                value={form.royalty_basis_points}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
              />
            </div>
            <div>
              <label className="text-white text-sm block mb-1">Max Supply *</label>
              <input
                type="number"
                name="max_supply"
                value={form.max_supply}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
                placeholder="e.g., 10"
              />
            </div>
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Price (SOL)</label>
            <input
              type="number"
              name="price_sol"
              value={form.price_sol}
              onChange={handleChange}
              step="0.01"
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
            />
          </div>
          <div>
            <label className="text-white text-sm block mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-[#1a1a1a] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF2D2D]"
              placeholder="https://..."
            />
          </div>
          <button
            type="submit"
            disabled={loading || feeLoading}
            className="w-full py-3 bg-[#FF2D2D] hover:bg-[#B10000] disabled:opacity-50 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            {feeLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending fee...
              </>
            ) : loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                Create Collection
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
