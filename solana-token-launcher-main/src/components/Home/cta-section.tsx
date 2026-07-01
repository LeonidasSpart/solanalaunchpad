'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CtaSection() {
  return (
    <section className="py-20 bg-[#050505] border-t border-b border-[#FF2D2D]/20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to launch your <span className="text-[#FF2D2D]">Solana token</span>?
          </h2>
          <p className="text-[#BDDBDB] text-lg mb-8 max-w-2xl mx-auto">
            Create, test, and launch your token with confidence. Free devnet testing, transparent mainnet pricing.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/airdrop"
              className="px-8 py-3 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-white font-semibold rounded-xl transition border border-[#1a1a1a]"
            >
              Get Airdrop
            </Link>
            <Link
              href="/create-mint"
              className="px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition shadow-lg shadow-[#FF2D2D]/25"
            >
              Create Token
            </Link>
            <Link
              href="#"
              className="px-8 py-3 bg-[#0D0D0D]/50 hover:bg-[#0D0D0D] text-[#BDDBDB] hover:text-white font-semibold rounded-xl transition border border-[#1a1a1a] cursor-not-allowed opacity-60"
            >
              Liquidity Pool <span className="text-xs text-[#BDDBDB] opacity-50">(soon)</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
