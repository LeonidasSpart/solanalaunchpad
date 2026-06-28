'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400">
            Everything you need to know about creating Solana tokens.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-800/30 transition"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-white font-medium">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-zinc-400 text-sm border-t border-zinc-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-sm">
            Still have questions?{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300 transition">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
