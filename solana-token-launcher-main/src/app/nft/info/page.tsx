'use client';

import Link from 'next/link';
import { ArrowRight, Image, Palette, Coins, TrendingUp, Shield, Zap, Users, Eye } from 'lucide-react';

export default function NFTInfoPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block bg-[#FF2D2D]/10 rounded-full px-4 py-1.5 text-sm text-[#FF2D2D] font-medium mb-4">
          🎨 Digital Collectibles
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Launch Your <span className="text-[#FF2D2D]">NFT</span> Collection
        </h1>
        <p className="text-xl text-[#BDDBDB] max-w-2xl mx-auto">
          Create, mint, and manage NFT collections on Solana – no coding required.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/nft"
            className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-8 py-3 rounded-xl font-semibold transition flex items-center gap-2"
          >
            Explore Collections <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/nft/create"
            className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-8 py-3 rounded-xl font-semibold border border-[#FF2D2D]/30 transition"
          >
            Create Collection
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Create Collections</h3>
          <p className="text-[#BDDBDB] text-sm">Launch a full NFT collection with name, symbol, supply, and royalties.</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Coins className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Mint NFTs</h3>
          <p className="text-[#BDDBDB] text-sm">Mint individual NFTs from your collection – each with unique metadata.</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-[#FF2D2D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="h-6 w-6 text-[#FF2D2D]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Gallery & Ownership</h3>
          <p className="text-[#BDDBDB] text-sm">View all minted NFTs in a gallery and track your collection.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Create Collection', desc: 'Fill in the details (name, symbol, supply, royalties) and upload metadata.' },
            { step: 2, title: 'Pay Fee', desc: 'Pay a small creation fee (0.15 SOL) to deploy the collection on Solana.' },
            { step: 3, title: 'Mint NFTs', desc: 'Mint NFTs from the collection – each mint costs the set price.' },
            { step: 4, title: 'Trade & Earn', desc: 'NFTs are tradable on marketplaces; royalties earn you passive income.' },
          ].map((s) => (
            <div key={s.step} className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-[#FF2D2D] mb-2">{s.step}</div>
              <h4 className="text-white font-semibold">{s.title}</h4>
              <p className="text-[#BDDBDB] text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fees */}
      <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Fees</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-[#BDDBDB] text-sm">Collection Creation</p>
            <p className="text-white text-2xl font-bold">0.15 SOL</p>
            <p className="text-[#BDDBDB] text-xs">One‑time fee</p>
          </div>
          <div className="text-center">
            <p className="text-[#BDDBDB] text-sm">Minting Fee</p>
            <p className="text-white text-2xl font-bold">3%</p>
            <p className="text-[#BDDBDB] text-xs">of mint price</p>
          </div>
          <div className="text-center">
            <p className="text-[#BDDBDB] text-sm">Royalties</p>
            <p className="text-white text-2xl font-bold">Configurable</p>
            <p className="text-[#BDDBDB] text-xs">Set by creator</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-[#FF2D2D]/10 via-[#FF2D2D]/5 to-[#FF2D2D]/10 rounded-2xl p-12 border border-[#FF2D2D]/20">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Launch Your NFT Project?</h2>
        <p className="text-[#BDDBDB] max-w-md mx-auto mb-6">
          Start building your NFT collection today – no coding required.
        </p>
        <Link
          href="/nft/create"
          className="bg-[#FF2D2D] hover:bg-[#B10000] text-white px-8 py-3 rounded-xl font-semibold transition inline-flex items-center gap-2"
        >
          Create Collection <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
