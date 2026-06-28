'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900/20 via-black to-purple-900/20 border-t border-b border-purple-500/20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to launch your <span className="text-purple-400">Solana token</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of projects already using our platform to create and manage their tokens.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/airdrop"
              className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition border border-zinc-700"
            >
              Get Airdrop
            </Link>
            <Link
              href="/create-mint"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition shadow-lg shadow-purple-500/25"
            >
              Create Token
            </Link>
            <Link
              href="#"
              className="px-8 py-3 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white font-semibold rounded-xl transition border border-zinc-700 cursor-not-allowed opacity-60"
            >
              Liquidity Pool <span className="text-xs text-zinc-500">(soon)</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
