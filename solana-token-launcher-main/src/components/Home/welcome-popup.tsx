'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Shield, Code, Wallet, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('zrp-welcome-seen');
    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('zrp-welcome-seen', 'true');
  };

  const handleCreateToken = () => {
    setIsOpen(false);
    localStorage.setItem('zrp-welcome-seen', 'true');
  };

  const features = [
    { icon: <Zap className="h-4 w-4" />, text: 'Deploy in under 60 seconds' },
    { icon: <Shield className="h-4 w-4" />, text: 'Secure wallet-signing — no seed phrase needed' },
    { icon: <Code className="h-4 w-4" />, text: 'Zero coding knowledge required' },
    { icon: <Wallet className="h-4 w-4" />, text: 'From 0.15 SOL · No subscriptions' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div 
              className="relative w-full max-w-md bg-[#0D0D0D] rounded-3xl border border-[#FF2D2D]/20 shadow-2xl shadow-[#FF2D2D]/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 flex items-center justify-center text-[#BDDBDB] hover:text-white hover:bg-[#FF2D2D]/20 transition-all z-10"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Top glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF2D2D]/20 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative z-10 p-8 pt-10">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF2D2D] to-[#B10000] flex items-center justify-center shadow-lg shadow-[#FF2D2D]/25">
                    <span className="text-white font-bold text-2xl">Z</span>
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-white text-center mb-2">
                  Welcome to <span className="text-[#FF2D2D]">ZRP</span>
                </h2>
                <p className="text-[#BDDBDB] text-center text-sm mb-8">
                  Create your own Solana token in minutes — no coding required.
                </p>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-3 bg-[#050505] rounded-xl px-4 py-3 border border-[#FF2D2D]/10"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#FF2D2D]">{feature.icon}</span>
                      </div>
                      <span className="text-white text-sm font-medium">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/create-mint"
                    onClick={handleCreateToken}
                    className="flex items-center justify-center gap-2 w-full bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF2D2D]/25"
                  >
                    <Zap className="h-4 w-4" />
                    Create Your Token Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={handleClose}
                    className="w-full bg-[#050505] hover:bg-[#0D0D0D] text-[#BDDBDB] hover:text-white font-medium py-3 rounded-xl border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition-all duration-300"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
