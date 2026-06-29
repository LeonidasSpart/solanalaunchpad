// src/app/affiliates/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Share2, Users, Coins, TrendingUp } from 'lucide-react';

export default function AffiliatesPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const generateLink = () => {
    if (!walletAddress || walletAddress.length < 32) {
      alert('Please enter a valid Solana wallet address');
      return;
    }
    // In production, this would create a unique link with the wallet encoded
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const encodedWallet = encodeURIComponent(walletAddress);
    setReferralLink(`${baseUrl}/?ref=${encodedWallet}`);
  };

  const copyToClipboard = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    if (referralLink) {
      const text = `🚀 Create your own Solana token with ZRP! Use my referral link to get started: ${referralLink}`;
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Affiliate Program</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Earn SOL by <br className="hidden sm:block" />
          <span className="text-purple-400">Sharing ZRP</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Generate a unique referral link, share it, and earn a percentage of every token creation fee paid through your link.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
            <div className="text-2xl font-bold text-purple-400">15%</div>
            <p className="text-zinc-400 text-xs">Commission Rate</p>
          </div>
          <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
            <div className="text-2xl font-bold text-purple-400">Instant</div>
            <p className="text-zinc-400 text-xs">Link Generation</p>
          </div>
          <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
            <div className="text-2xl font-bold text-purple-400">0</div>
            <p className="text-zinc-400 text-xs">Sign-ups Needed</p>
          </div>
          <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
            <div className="text-2xl font-bold text-purple-400">SOL</div>
            <p className="text-zinc-400 text-xs">Payout Currency</p>
          </div>
        </div>

        {/* Generate Link Section */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h2 className="text-xl font-bold text-white mb-4">Generate Your Referral Link</h2>
          <p className="text-zinc-400 text-sm mb-4">No login required — your wallet address is used to create a unique link.</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your Solana wallet address"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 text-sm"
            />
            <button
              onClick={generateLink}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition text-sm whitespace-nowrap"
            >
              Generate Link
            </button>
          </div>

          {referralLink && (
            <div className="mt-4 bg-zinc-900 rounded-xl p-4 border border-zinc-700">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <code className="flex-1 text-purple-400 text-sm break-all bg-black/50 px-3 py-2 rounded-lg font-mono">
                  {referralLink}
                </code>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition flex items-center gap-2 text-sm"
                  >
                    {isCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={shareOnTwitter}
                    className="px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg transition flex items-center gap-2 text-sm"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">How It Works</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4 bg-black/40 rounded-xl p-4 border border-zinc-800">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <div>
                <p className="text-white font-medium">Enter your wallet address</p>
                <p className="text-zinc-400 text-sm">No login needed — just your Solana wallet address.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-black/40 rounded-xl p-4 border border-zinc-800">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <div>
                <p className="text-white font-medium">Copy your unique referral link</p>
                <p className="text-zinc-400 text-sm">Share it anywhere: Twitter, Telegram, Discord, YouTube, your website.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-black/40 rounded-xl p-4 border border-zinc-800">
              <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <div>
                <p className="text-white font-medium">Earn commission</p>
                <p className="text-zinc-400 text-sm">When someone creates a token through your link, you earn a percentage of their fee.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Example Earnings */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Example Earnings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
              <p className="text-zinc-400 text-xs">1 referral @ 0.1 SOL</p>
              <p className="text-purple-400 font-bold text-lg">0.015 SOL</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
              <p className="text-zinc-400 text-xs">1 referral @ 0.5 SOL</p>
              <p className="text-purple-400 font-bold text-lg">0.075 SOL</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
              <p className="text-zinc-400 text-xs">10 referrals @ 0.3 SOL</p>
              <p className="text-purple-400 font-bold text-lg">0.45 SOL</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
              <p className="text-zinc-400 text-xs">50 referrals @ 0.3 SOL</p>
              <p className="text-purple-400 font-bold text-lg">2.25 SOL</p>
            </div>
          </div>
          <p className="text-zinc-500 text-xs text-center mt-2">Based on 15% commission rate. Actual earnings vary.</p>
        </div>

        {/* Programme Details */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Everything You Need to Know</h2>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">📋 Programme Terms</h3>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-zinc-400 text-sm">
                <li>Enter your wallet address to generate a unique referral link — no sign-up required.</li>
                <li>Share your link anywhere: Twitter, Telegram, Discord, YouTube, your website.</li>
                <li>When someone creates a token using your link, you earn <span className="text-purple-400 font-medium">15%</span> of the total fee they pay.</li>
                <li>The commission is based on the full creation fee including any add-ons — not just the base fee.</li>
                <li>No monthly minimums, no expiry dates. Your link stays active as long as you want.</li>
              </ul>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">❓ Common Questions</h3>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-zinc-400 text-sm">
                <li><span className="text-white">When do I receive payouts?</span> Payout details are coming in v2. Your referrals are tracked now.</li>
                <li><span className="text-white">Do referred users pay more?</span> No. The price they pay is identical — your commission comes from our share.</li>
                <li><span className="text-white">Can I have multiple links?</span> Each wallet address generates one link. Use different wallets for different campaigns.</li>
                <li><span className="text-white">What counts as a conversion?</span> Any token successfully minted through your referral link with a confirmed on-chain payment.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-zinc-800 pt-6 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Earn SOL from Referrals?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Enter your wallet address above to generate your unique referral link — no sign-up required.
          </p>
        </div>
      </div>
    </div>
  );
}
