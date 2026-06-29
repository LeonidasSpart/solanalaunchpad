// src/app/revoke/page.tsx
'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function RevokeAuthorityPage() {
  const { publicKey } = useWallet();
  const [mintAddress, setMintAddress] = useState('');
  const [selectedAuthority, setSelectedAuthority] = useState<'mint' | 'freeze' | 'update' | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Revoke Token Authority
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Permanently give up control your buyers worry about: minting more supply, freezing wallets, and changing the token. Each revoke is a signed, on-chain trust signal anyone can verify.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-purple-400 font-bold">0.1 SOL</span>
            <span className="text-zinc-500 ml-2">per authority</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-red-400 font-bold">Forever</span>
            <span className="text-zinc-500 ml-2">irreversible</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-green-400 font-bold">1 approval</span>
            <span className="text-zinc-500 ml-2">confirm in wallet</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-8">
        {/* Explanation */}
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
          <p className="text-yellow-400 text-sm font-semibold">⚠️ This is irreversible</p>
          <p className="text-zinc-400 text-sm mt-1">
            Once an authority is revoked you can never get it back. New to this? Read the revoke authority guide first.
          </p>
        </div>

        {/* Wallet Connection Status */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Connect Your Wallet to Begin</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Use the Connect Wallet button in the header. You must connect with the wallet that currently holds the authority you want to revoke.
          </p>
          <div className="flex justify-center">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-6 !py-3 !font-semibold !text-white" />
          </div>
          {publicKey && (
            <p className="text-green-400 text-sm text-center mt-3">
              ✅ Connected: {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
            </p>
          )}
        </section>

        {/* Step 2: Choose Token */}
        <section>
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
            Choose Your Token
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            Pick a token you created with this wallet, or paste any mint address. We read its live on-chain authorities so you only pay for what is actually still revocable.
          </p>

          <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
            <label className="text-white text-sm font-medium block mb-2">Paste a token mint address manually</label>
            <input
              type="text"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              placeholder="e.g. So11111111111111111111111111111111111111112"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm"
            />
            <p className="text-zinc-500 text-xs mt-2">
              You must be the current authority on the token for the revoke to succeed.
            </p>
          </div>
        </section>

        {/* Step 3: Select Authority */}
        {publicKey && mintAddress && (
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">3</span>
              Select Authority to Revoke
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedAuthority('mint')}
                className={`p-4 rounded-xl border text-left transition ${
                  selectedAuthority === 'mint'
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">🪙 Mint</span>
                  <span className="text-purple-400 text-sm font-bold">0.1 SOL</span>
                </div>
                <p className="text-zinc-400 text-xs mt-1">Prevents minting more tokens</p>
              </button>

              <button
                onClick={() => setSelectedAuthority('freeze')}
                className={`p-4 rounded-xl border text-left transition ${
                  selectedAuthority === 'freeze'
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">❄️ Freeze</span>
                  <span className="text-purple-400 text-sm font-bold">0.1 SOL</span>
                </div>
                <p className="text-zinc-400 text-xs mt-1">Stops freezing token accounts</p>
              </button>

              <button
                onClick={() => setSelectedAuthority('update')}
                className={`p-4 rounded-xl border text-left transition ${
                  selectedAuthority === 'update'
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">✏️ Update</span>
                  <span className="text-purple-400 text-sm font-bold">0.1 SOL</span>
                </div>
                <p className="text-zinc-400 text-xs mt-1">Locks metadata forever</p>
              </button>
            </div>

            {selectedAuthority && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mt-4">
                <p className="text-red-400 text-sm font-semibold">⚠️ Confirm Revocation</p>
                <p className="text-zinc-400 text-sm mt-1">
                  You are about to permanently revoke <span className="text-white font-semibold">{selectedAuthority}</span> authority for token <span className="text-purple-400 font-mono text-xs">{mintAddress.slice(0, 8)}...{mintAddress.slice(-8)}</span>.
                  This action is <span className="text-red-400 font-bold">irreversible</span>.
                </p>
                <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition">
                  Revoke {selectedAuthority} Authority (0.1 SOL)
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
