'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    q: 'What is ZRP token launcher?',
    a: 'ZRP is a no-code platform that helps you create SPL tokens on Solana by handling wallet connection, token parameters, metadata, and on-chain minting in one guided flow.'
  },
  {
    q: 'How much does it cost?',
    a: 'Devnet testing is FREE. Mainnet tokens cost 0.15 SOL for a basic token, or 0.5 SOL for full features including authority revocation and social links.'
  },
  {
    q: 'Can I test before launching?',
    a: 'Yes! ZRP is the only platform with FREE devnet testing. Create tokens with zero cost, then launch on mainnet when ready.'
  },
  {
    q: 'What wallets are supported?',
    a: 'Phantom, Solflare, Torus, and Ledger. More wallets coming soon.'
  },
  {
    q: 'What is the difference between devnet and mainnet?',
    a: 'Devnet is a test network using free test SOL. Mainnet is the live Solana blockchain where real SOL is used and tokens have real value.'
  },
  {
    q: 'Can I revoke token authorities?',
    a: 'Yes. You can revoke Mint, Freeze, and Update authorities to make your token more secure and trustworthy.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-400">Everything you need to know about creating Solana tokens.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-800/50 transition"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-zinc-400 text-sm">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500">
          <p>Still have questions? <a href="#" className="text-purple-400 hover:underline">Contact us</a></p>
        </div>
      </div>
    </section>
  );
}
