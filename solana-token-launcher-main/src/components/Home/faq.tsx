'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const frontPageFAQs = [
  {
    q: 'What is a Solana token creator?',
    a: 'A Solana token creator is a no-code platform that helps you create SPL tokens by handling wallet connection, token parameters, metadata, and on-chain minting in one guided flow.',
  },
  {
    q: 'What is a Solana SPL token?',
    a: 'An SPL token is a fungible digital asset created on the Solana blockchain using the Solana Program Library (SPL) token standard — analogous to ERC-20 tokens on Ethereum.',
  },
  {
    q: 'How do I create a token on Solana?',
    a: 'With ZRP: (1) connect your wallet, (2) enter your token details, (3) upload a logo, (4) confirm the transaction. No coding required.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'No. ZRP is a completely no-code Solana token creator. Fill in a form, connect your wallet, and click mint.',
  },
  {
    q: 'How much does it cost to create a Solana token?',
    a: 'Devnet testing is FREE. Mainnet costs 0.15 SOL for a basic token. Each authority revocation adds 0.15 SOL, so the maximum is 0.60 SOL.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF2D2D]/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Frequently Asked <span className="text-[#FF2D2D]">Questions</span>
          </h2>
          <p className="text-[#BDDBDB]">
            Quick answers to the most common questions.
          </p>
        </motion.div>

        <div className="space-y-3">
          {frontPageFAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className={`bg-[#0D0D0D]/40 backdrop-blur-sm rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#FF2D2D]/40 shadow-lg shadow-[#FF2D2D]/5'
                    : 'border-[#1a1a1a] hover:border-[#FF2D2D]/30'
                }`}
              >
                <button
                  className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-[#1a1a1a]/30 transition-colors"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="text-white font-medium text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'bg-[#FF2D2D]/20 rotate-180' : 'bg-[#0D0D0D]'
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-colors duration-300 ${
                        isOpen ? 'text-[#FF2D2D]' : 'text-[#BDDBDB]'
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 text-[#BDDBDB] text-sm sm:text-base leading-relaxed border-t border-[#1a1a1a] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-[#FF2D2D] hover:text-[#B10000] font-medium transition-colors group"
          >
            View all FAQs →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-[#FF2D2D]/20 via-[#FF2D2D]/10 to-[#FF2D2D]/20 border border-[#FF2D2D]/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
            <MessageCircle className="h-5 w-5 text-[#FF2D2D]" />
            <span className="text-[#BDDBDB] text-sm">Still have questions?</span>
            <a
              href="/contact"
              className="bg-[#FF2D2D] hover:bg-[#B10000] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF2D2D]/25 hover:shadow-[#FF2D2D]/40"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
