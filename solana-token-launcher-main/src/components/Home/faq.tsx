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
  Clock,      // for Vesting
  Coins,      // for Staking
  Users,      // for DAO
  Image,      // for NFT
  Zap         // for NFT Staking
} from 'lucide-react';

const faqData = [
  // ─── Existing categories (Getting Started, Token Setup, Costs, After Minting, Security, Tokenomics, Technical) ───
  // (We keep them exactly as they are – omitted here for brevity; they remain unchanged.)
  // ... (include all existing categories here) ...
  
  // ─── NEW: Launchpad (IDO) ──────────────────────────────────────────
  {
    category: 'Launchpad (IDO)',
    icon: Rocket,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'What is the ZRP Launchpad?',
        a: 'The ZRP Launchpad is a no‑code platform for projects to raise funds via token presales. It handles project creation, investor contributions, token distribution, and refunds – all on Solana.'
      },
      {
        q: 'How do I create a launchpad project?',
        a: 'Visit `/launchpad/create`, connect your wallet, fill in token details, sale caps, dates, and optionally enable whitelist, KYC, or tiered participation. Submit for admin review.'
      },
      {
        q: 'What are the fees for using the launchpad?',
        a: 'Projects pay a platform fee of 2–5% of the raised SOL (configurable). Investors pay 0% fees. Network transaction fees are covered by users.'
      },
      {
        q: 'How do investors participate in a launchpad sale?',
        a: 'Investors connect their wallet, visit the project page, enter their contribution amount, and send SOL to the launchpad wallet. Contributions are recorded on‑chain.'
      },
      {
        q: 'What happens if the soft cap is not reached?',
        a: 'If the soft cap is not met after the sale ends, the project is marked as failed and investors can claim a full refund of their contributed SOL.'
      },
      {
        q: 'How are funds distributed after a successful sale?',
        a: 'After the sale ends, the admin triggers the distribution. The raised SOL is split: the creator receives the project share, and ZRP keeps the platform fee. Any vesting schedules are automatically created.'
      },
      {
        q: 'Can I add vesting to my launchpad project?',
        a: 'Yes. During project creation, you can set up vesting schedules for team or advisor wallets. After the sale, these schedules are automatically created via ZRP\'s vesting module.'
      }
    ]
  },
  // ─── NEW: Vesting ──────────────────────────────────────────────────
  {
    category: 'Vesting',
    icon: Clock,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'What is token vesting?',
        a: 'Vesting is the process of locking tokens and releasing them gradually over time. It’s used to align long‑term incentives for team members, advisors, and early investors.'
      },
      {
        q: 'How does vesting work on ZRP?',
        a: 'You create a vesting schedule by specifying the beneficiary wallet, total amount, cliff duration, vesting duration, and release frequency. Tokens are locked and become claimable according to the schedule.'
      },
      {
        q: 'Can I create a vesting schedule for my team or investors?',
        a: 'Yes. Use the vesting creation form (under `/vesting`) to set up schedules. The platform handles the on‑chain locking and automatic release logic.'
      },
      {
        q: 'What are cliff and vesting duration?',
        a: 'The cliff is the initial waiting period before any tokens are released. The vesting duration is the total time over which all tokens are gradually released (e.g., monthly).'
      },
      {
        q: 'How do beneficiaries claim their vested tokens?',
        a: 'Beneficiaries can visit the vesting page, connect their wallet, and claim their released tokens. The claim amount is calculated automatically based on the schedule.'
      }
    ]
  },
  // ─── NEW: Staking ──────────────────────────────────────────────────
  {
    category: 'Staking',
    icon: Coins,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'What is staking on ZRP?',
        a: 'Staking allows you to lock your tokens (e.g., ZRP) to earn passive rewards. You earn a percentage of the staked amount over time, calculated based on the pool’s APY.'
      },
      {
        q: 'How do I stake my tokens?',
        a: 'Visit the staking page (e.g., `/staking`), choose a pool, enter the amount you want to stake, and sign the transaction. Your tokens are transferred to the platform wallet and you start earning rewards.'
      },
      {
        q: 'What is the APY for staking?',
        a: 'APY (Annual Percentage Yield) varies per pool – typical values are around 12.5%. The exact rate is shown on the pool detail page.'
      },
      {
        q: 'Can I unstake anytime?',
        a: 'You can unstake anytime, but some pools have a lock period (e.g., 60 seconds, 7 days). After the lock expires, you can unstake and receive your tokens back.'
      },
      {
        q: 'How are staking rewards calculated?',
        a: 'Rewards = (staked amount × APY × time staked) / 365.25 days. Rewards are calculated in real time and can be claimed at any time.'
      }
    ]
  },
  // ─── NEW: DAO Governance ──────────────────────────────────────────
  {
    category: 'DAO Governance',
    icon: Users,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'What is the ZRP DAO?',
        a: 'The ZRP DAO is a decentralized governance system where token holders can propose, discuss, and vote on changes to the protocol and projects launched on ZRP.'
      },
      {
        q: 'How do I create a DAO proposal?',
        a: 'Visit the DAO page (`/dao`), click “Create Proposal”, fill in the title, description, token mint (for voting), start/end times, and submit. The proposal is then open for voting.'
      },
      {
        q: 'How does voting work?',
        a: 'Each voter’s voting power equals their token balance at the time of voting. Votes are cast as “Yes” or “No”. The results are displayed in real time.'
      },
      {
        q: 'What is voting power?',
        a: 'Voting power is the number of tokens you hold of the voting token specified in the proposal. 1 token = 1 vote.'
      },
      {
        q: 'How are proposals executed?',
        a: 'After the voting period ends, if the proposal passes (e.g., >50% Yes), it can be executed by the admin or automatically depending on the implementation. Currently, the admin handles execution.'
      }
    ]
  },
  // ─── NEW: NFT ──────────────────────────────────────────────────────
  {
    category: 'NFT',
    icon: Image,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'What is NFT on ZRP?',
        a: 'ZRP allows you to create NFT collections and mint NFTs directly on Solana. You can set name, symbol, supply, royalties, and mint price – all without coding.'
      },
      {
        q: 'How do I create an NFT collection?',
        a: 'Go to `/nft/create`, fill in the collection details (name, symbol, description, max supply, price, image), pay the creation fee (0.15 SOL), and confirm the transaction.'
      },
      {
        q: 'What are the fees for NFT creation and minting?',
        a: 'Collection creation costs 0.15 SOL. Minting has a 3% fee on the mint price (if price > 0). There are no other hidden fees.'
      },
      {
        q: 'Can I earn royalties from my NFTs?',
        a: 'Yes. When you create a collection, you set a royalty percentage (e.g., 5%). Every time your NFT is sold on a secondary marketplace (like Tensor, Magic Eden), you earn that percentage – forever.'
      },
      {
        q: 'Where can I trade my NFTs?',
        a: 'All NFTs minted on ZRP are standard Metaplex NFTs and are compatible with all major Solana marketplaces: Tensor, Magic Eden, Solanart, and others. You can buy and sell them there easily.'
      }
    ]
  },
  // ─── NEW: NFT Staking ──────────────────────────────────────────────
  {
    category: 'NFT Staking',
    icon: Zap,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
    questions: [
      {
        q: 'What is NFT staking?',
        a: 'NFT staking allows you to lock your NFTs in a staking pool to earn rewards (e.g., ZRP tokens). It’s similar to token staking but uses NFTs as the staked asset.'
      },
      {
        q: 'How do I stake my NFTs?',
        a: 'Visit `/nft-staking`, choose a pool that matches your NFT collection, select an NFT you own, and click “Stake”. Your NFT will be locked in the platform wallet and you start earning rewards.'
      },
      {
        q: 'What rewards can I earn?',
        a: 'Rewards are paid in tokens (e.g., ZRP) with competitive APY rates (e.g., 12.5%). The exact APY is shown on the pool detail page.'
      },
      {
        q: 'Can I unstake anytime?',
        a: 'Yes, but you must wait for the lock period to end (if applicable). After the lock period, you can unstake and your NFT is returned to your wallet.'
      },
      {
        q: 'What is the lock period?',
        a: 'Each pool has a configurable lock period (e.g., 0‑day, 7‑day, 30‑day). You cannot unstake before the lock period ends, but you can claim rewards anytime.'
      }
    ]
  }
];

// ─── Rest of the component (unchanged) ──────────────────────────────
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (key: string) => {
    setOpenIndex((prev) => (prev === key ? null : key));
  };

  const isOpen = (key: string) => openIndex === key;

  return (
    <section id="faq" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF2D2D]/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
            <HelpCircle className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">Support</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Frequently Asked <span className="text-[#FF2D2D]">Questions</span>
          </h2>
          
          <p className="text-lg text-[#BDDBDB] max-w-2xl mx-auto">
            Everything you need to know about creating Solana tokens — no jargon, straight answers.
          </p>
        </motion.div>

        <div className="space-y-10">
          {faqData.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.05, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#1a1a1a]">
                  <div className={`w-10 h-10 rounded-xl ${category.bgColor} flex items-center justify-center border ${category.borderColor}`}>
                    <Icon className={`h-5 w-5 ${category.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.category}</h3>
                  <span className="ml-auto text-xs text-[#BDDBDB] bg-[#0D0D0D] px-2.5 py-1 rounded-full">
                    {category.questions.length} questions
                  </span>
                </div>

                <div className="space-y-3">
                  {category.questions.map((faq, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isExpanded = isOpen(key);
                    
                    return (
                      <div
                        key={qIndex}
                        className={`bg-[#0D0D0D]/40 backdrop-blur-sm rounded-xl border transition-all duration-300 overflow-hidden ${
                          isExpanded 
                            ? 'border-[#FF2D2D]/40 shadow-lg shadow-[#FF2D2D]/5' 
                            : 'border-[#1a1a1a] hover:border-[#FF2D2D]/30'
                        }`}
                      >
                        <button
                          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-[#1a1a1a]/30 transition-colors"
                          onClick={() => toggleQuestion(key)}
                        >
                          <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isExpanded 
                              ? 'bg-[#FF2D2D]/20 rotate-180' 
                              : 'bg-[#0D0D0D]'
                          }`}>
                            <ChevronDown
                              className={`h-4 w-4 transition-colors duration-300 ${
                                isExpanded ? 'text-[#FF2D2D]' : 'text-[#BDDBDB]'
                              }`}
                            />
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
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
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-[#FF2D2D]/20 via-[#FF2D2D]/10 to-[#FF2D2D]/20 border border-[#FF2D2D]/20 rounded-2xl px-8 py-5 backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-[#FF2D2D]" />
            <div className="text-left">
              <div className="text-white font-semibold">Still have questions?</div>
              <div className="text-sm text-[#BDDBDB]">We&apos;re here to help you launch</div>
            </div>
            <a 
              href="/contact"
              className="ml-0 sm:ml-4 bg-[#FF2D2D] hover:bg-[#B10000] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF2D2D]/25 hover:shadow-[#FF2D2D]/40"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
