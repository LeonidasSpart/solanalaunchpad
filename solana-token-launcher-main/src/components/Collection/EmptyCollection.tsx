'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyCollection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-[#FF2D2D]/10 flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-[#FF2D2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No Tokens Found</h3>
      <p className="text-[#BDDBDB] mb-6 max-w-md">
        Your collection is empty. Create a new token to get started!
      </p>
      <Link
        href="/create-mint"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#FF2D2D]/25 hover:shadow-[#FF2D2D]/40"
      >
        <Plus className="h-4 w-4" />
        Create New Token
      </Link>
    </motion.div>
  );
}
