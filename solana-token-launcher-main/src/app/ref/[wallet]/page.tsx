'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, Users, Shield, Zap } from 'lucide-react';

export default function ReferralLandingPage() {
  const params = useParams();
  const router = useRouter();
  const wallet = params.wallet as string;
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    // Track the referral when the page loads
    const trackReferral = async () => {
      if (!wallet || tracked) return;

      // Check if user is already in localStorage
      const stored = localStorage.getItem(`ref_${wallet}`);
      if (stored) {
        setTracked(true);
        return;
      }

      try {
        // Get the visitor's wallet address if connected, else use a session ID
        // For now, we'll use a simple tracking method
        const visitorId = localStorage.getItem('visitor_id') || 
          `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        localStorage.setItem('visitor_id', visitorId);

        await fetch('/api/affiliate/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            referrer: wallet,
            referred: visitorId,
            event: 'click',
          }),
        });

        localStorage.setItem(`ref_${wallet}`, 'true');
        setTracked(true);
      } catch (error) {
        console.error('Failed to track referral:', error);
      }
    };

    trackReferral();
  }, [wallet, tracked]);

  const features = [
    { icon: <Rocket className="h-5 w-5 text-[#FF2D2D]" />, title: 'Create in 60s', desc: 'Launch your token instantly' },
    { icon: <Users className="h-5 w-5 text-[#FF2D2D]" />, title: 'No Code', desc: 'Anyone can create tokens' },
    { icon: <Shield className="h-5 w-5 text-[#FF2D2D]" />, title: 'Secure', desc: 'Non-custodial & wallet-signed' },
    { icon: <Zap className="h-5 w-5 text-[#FF2D2D]" />, title: 'Low Cost', desc: 'Starting from 0.15 SOL' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="mb-8">
          <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">ZRP</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-4 leading-tight">
            Create Solana Tokens<br />
            <span className="text-[#FF2D2D]">In 60 Seconds</span>
          </h1>
          <p className="text-[#BDDBDB] text-lg max-w-xl mx-auto">
            No code. No limits. Just your idea — live on Solana in seconds.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#0D0D0D] rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex justify-center mb-2">{feature.icon}</div>
              <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
              <p className="text-[#BDDBDB] text-xs">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/create-mint"
            className="px-8 py-4 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition text-lg"
          >
            🚀 Create Your Token
          </Link>
          <Link
            href="/"
            className="px-8 py-4 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] font-medium rounded-xl transition border border-[#1a1a1a] text-lg"
          >
            Learn More
          </Link>
        </div>

        <p className="text-[#BDDBDB] text-xs mt-8 opacity-50">
          Referred by {wallet.slice(0, 6)}...{wallet.slice(-6)}
        </p>

        <div className="mt-4 text-[#BDDBDB] text-xs opacity-30">
          {tracked ? '✅ Referral tracked' : '⏳ Tracking referral...'}
        </div>
      </motion.div>
    </div>
  );
}
