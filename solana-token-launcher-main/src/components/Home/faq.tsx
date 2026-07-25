'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  HelpCircle, 
  MessageCircle, 
  Rocket, 
  Settings, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Wrench, 
  Sparkles,
  Clock,
  Coins,
  Users,
  Image,
  Zap
} from 'lucide-react';

// ─── FAQ Data with `frontPage` flag ──────────────────────────────
const faqData = [
  // ─── 1. Getting Started ──────────────────────────────────────────
  {
    category: 'Getting Started',
    icon: Rocket,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'What is a Solana token creator?',
        a: 'A Solana token creator is a no-code platform that helps you create SPL tokens by handling wallet connection, token parameters, metadata, and on-chain minting in one guided flow.',
        frontPage: true, // ✅ Show on front page
      },
      {
        q: 'What is a Solana SPL token?',
        a: 'An SPL token is a fungible digital asset created on the Solana blockchain using the Solana Program Library (SPL) token standard — analogous to ERC-20 tokens on Ethereum.',
        frontPage: true, // ✅ Show on front page
      },
      {
        q: 'How do I create a token on Solana?',
        a: 'With ZRP: (1) connect your wallet, (2) enter your token details, (3) upload a logo, (4) confirm the transaction. No coding required.',
        frontPage: true, // ✅ Show on front page
      },
      {
        q: 'Do I need to know how to code?',
        a: 'No. ZRP is a completely no-code Solana token creator. Fill in a form, connect your wallet, and click mint.',
        frontPage: true, // ✅ Show on front page
      },
      {
        q: 'Which wallet do I need?',
        a: 'ZRP supports Phantom, Solflare, Backpack, and Ledger.',
        frontPage: false,
      },
      {
        q: 'How much SOL do I need before I start?',
        a: 'Devnet testing is FREE. Mainnet starts from 0.15 SOL. All fees are transparent.',
        frontPage: false,
      },
      {
        q: 'What token templates does ZRP offer?',
        a: 'Meme Coin, Governance DAO, Utility Token, and Simple Token. You can also start from scratch.',
        frontPage: false,
      },
      {
        q: 'How long does minting take?',
        a: 'Typically under 60 seconds from confirming the transaction.',
        frontPage: false,
      }
    ]
  },
  // ─── 2. Token Setup & Configuration ──────────────────────────────
  {
    category: 'Token Setup & Configuration',
    icon: Settings,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'What are token decimals and what should I choose?',
        a: 'Decimals determine the smallest divisible unit. 9 decimals (Solana default) allows fractions as small as 0.000000001. Memecoins often use 6 decimals.',
        frontPage: false,
      },
      {
        q: 'How do I decide on token supply?',
        a: 'Memecoins typically use 1 billion to 1 trillion tokens. Utility tokens often use more modest amounts.',
        frontPage: false,
      },
      {
        q: 'What are Mint, Freeze, and Update authorities?',
        a: 'Mint authority controls who can create additional tokens. Freeze authority can lock token accounts. Update authority controls who can modify the on-chain metadata.',
        frontPage: false,
      },
      {
        q: 'Should I revoke my token authorities?',
        a: 'Revoking Mint authority prevents future inflation — a strong trust signal. Revoking Freeze authority reassures holders. These decisions are irreversible.',
        frontPage: false,
      },
      {
        q: 'What is token metadata on Solana?',
        a: 'Token metadata is the on-chain data describing your token: name, symbol, logo URI, description, website, and social links.',
        frontPage: false,
      },
      {
        q: 'Where is my logo and metadata stored?',
        a: 'Your logo and JSON metadata are uploaded to IPFS via NFT.Storage — decentralized and permanent.',
        frontPage: false,
      },
      {
        q: 'Can I update my token name or logo after minting?',
        a: 'Yes, as long as you have not revoked the Update authority. Once revoked, metadata is permanently locked.',
        frontPage: false,
      }
    ]
  },
  // ─── 3. Costs & Fees ──────────────────────────────────────────────
  {
    category: 'Costs & Fees',
    icon: DollarSign,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'How much does it cost to create a Solana token?',
        a: 'Devnet testing is FREE. Mainnet costs 0.15 SOL for a basic token. Each authority revocation adds 0.15 SOL, so the maximum is 0.60 SOL.',
        frontPage: false,
      },
      {
        q: 'What is rent-exemption on Solana?',
        a: 'Solana requires accounts to hold a minimum SOL balance to remain open on-chain — this is "rent-exemption." It is embedded in the creation cost.',
        frontPage: false,
      },
      {
        q: 'What happens if my transaction fails?',
        a: 'No charges apply. You can safely retry. Common causes: insufficient SOL balance or network congestion.',
        frontPage: false,
      },
      {
        q: 'Are there any hidden fees?',
        a: 'No. The pricing is fully transparent. No subscriptions, withdrawal fees, or royalty charges.',
        frontPage: false,
      }
    ]
  },
  // ─── 4. After Minting - Trading & Listing ────────────────────────
  {
    category: 'After Minting - Trading & Listing',
    icon: TrendingUp,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'Can I add liquidity after minting?',
        a: 'Yes. You can pair your token with SOL on Raydium or Jupiter. Once the pool is live, your token is tradeable.',
        frontPage: false,
      },
      // ... (other questions with frontPage: false)
      // I'll include only a few for brevity; the full file will have all.
    ]
  },
  // ... (other categories similarly, but I'll provide a complete file in the final answer)
];

// ─── Component ──────────────────────────────────────────────────────
interface FAQProps {
  frontPage?: boolean; // if true, only show questions with `frontPage: true`
}

export default function FAQ({ frontPage = false }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (key: string) => {
    setOpenIndex((prev) => (prev === key ? null : key));
  };

  const isOpen = (key: string) => openIndex === key;

  // Filter categories and questions based on frontPage prop
  const filteredData = frontPage
    ? faqData
        .map((category) => ({
          ...category,
          questions: category.questions.filter((q) => q.frontPage === true),
        }))
        .filter((category) => category.questions.length > 0)
    : faqData;

  return (
    <section id="faq" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* ... (background and header) ... */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* ... (section header) ... */}

        <div className="space-y-10">
          {filteredData.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <motion.div key={catIndex} ...>
                {/* ... (category header) ... */}
                <div className="space-y-3">
                  {category.questions.map((faq, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isExpanded = isOpen(key);
                    return (
                      <div key={qIndex} ...>
                        {/* ... (question item) ... */}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ... (contact us section) ... */}
      </div>
    </section>
  );
}
