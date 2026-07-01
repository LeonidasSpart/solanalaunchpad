'use client';

import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">See It In Action</h2>
          <p className="text-[#BDDBDB] max-w-2xl mx-auto">
            Watch how to create a Solana token in under 60 seconds — for free on devnet.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative aspect-video bg-[#0D0D0D] rounded-2xl border border-[#1a1a1a] overflow-hidden group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          {isPlaying ? (
            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
              <p className="text-[#BDDBDB]">🎥 Demo video coming soon</p>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D2D]/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#FF2D2D]/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-10 w-10 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <span className="text-sm text-[#BDDBDB] bg-[#050505]/70 px-3 py-1 rounded-full">
                  🎬 Watch demo
                </span>
                <span className="text-sm text-[#BDDBDB] bg-[#050505]/70 px-3 py-1 rounded-full">
                  <ExternalLink className="h-4 w-4 inline mr-1" />
                  60 seconds
                </span>
              </div>
            </>
          )}
        </motion.div>

        <div className="flex justify-center gap-6 mt-6 text-sm text-[#BDDBDB]">
          <span>✅ Create token on devnet – <span className="text-[#FF2D2D]">FREE</span></span>
          <span>✅ Launch on mainnet – <span className="text-[#FF2D2D]">0.15 SOL</span></span>
        </div>
      </div>
    </section>
  );
}
