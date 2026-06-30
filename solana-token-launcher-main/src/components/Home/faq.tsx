'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Rocket, Settings, DollarSign, TrendingUp, Shield, BarChart3, Wrench, Sparkles } from 'lucide-react';

const faqData = [
  {
    category: 'Getting Started',
    icon: Rocket,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    questions: [
      {
        q: 'What is a Solana token creator?',
        a: 'A Solana token creator is a no-code platform that helps you create SPL tokens by handling wallet connection, token parameters, metadata, and on-chain minting in one guided flow.'
      },
      {
        q: 'What is a Solana SPL token?',
        a: 'An SPL token is a fungible digital asset created on the Solana blockchain using the Solana Program Library (SPL) token standard — analogous to ERC-20 tokens on Ethereum. They can represent memecoins, utility tokens, governance tokens, stablecoins, or any custom cryptocurrency.'
      },
      {
        q: 'How do I create a token on Solana?',
        a: 'With ZRP: (1) connect your Solana wallet, (2) enter your token name, symbol, total supply, and decimals, (3) upload a logo and add optional social metadata, (4) confirm the transaction and pay a small SOL fee. No coding required.'
      },
      {
        q: 'Do I need to know how to code?',
        a: 'No. ZRP is a completely no-code Solana token creator. Fill in a form, connect your wallet, and click mint. The platform handles all SPL token program interactions on your behalf.'
      },
      {
        q: 'Which wallet do I need?',
        a: 'ZRP supports common Solana wallets including Phantom, Solflare, Backpack, and Ledger. Use whichever supported wallet you prefer.'
      },
      {
        q: 'How much SOL do I need before I start?',
        a: 'Devnet testing is FREE. For mainnet, you need at least 0.15 SOL for a basic token. If you plan to revoke authorities, budget 0.5 SOL for full features. Network gas is covered.'
      },
      {
        q: 'How long does minting take?',
        a: 'Typically under 60 seconds from confirming the transaction in your wallet to your token appearing on-chain. Solana\'s fast block times make the process almost instant.'
      }
    ]
  },
  {
    category: 'Token Setup & Configuration',
    icon: Settings,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    questions: [
      {
        q: 'What are token decimals and what should I choose?',
        a: 'Decimals determine the smallest divisible unit. 9 decimals (Solana default) allows fractions as small as 0.000000001. Memecoins often use 6 decimals. Non-divisible tokens (e.g. limited-edition items) should use 0 decimals.'
      },
      {
        q: 'How do I decide on token supply?',
        a: 'Memecoins typically use 1 billion to 1 trillion tokens — large numbers make the per-token price feel accessible to retail buyers. Utility tokens often use more modest amounts. Think about your tokenomics: distribution, team allocation, liquidity pool share, and community rewards.'
      },
      {
        q: 'What are Mint, Freeze, and Update authorities?',
        a: 'Mint authority controls who can create additional tokens. Freeze authority can lock token accounts. Update authority controls who can modify the on-chain metadata. All three default to your wallet and can optionally be revoked.'
      },
      {
        q: 'Should I revoke my token authorities?',
        a: 'Revoking Mint authority prevents future inflation — a strong trust signal. Revoking Freeze authority reassures holders their tokens can never be locked. Revoking Update authority locks the metadata forever. These decisions are irreversible, so choose carefully.'
      },
      {
        q: 'What is token metadata on Solana?',
        a: 'Token metadata is the on-chain data describing your token: name, symbol, logo URI, description, website URL, and social links. It is stored using the Metaplex Token Metadata standard, ensuring compatibility with all Solana wallets, DEXes, and explorers.'
      },
      {
        q: 'Where is my logo and metadata stored?',
        a: 'Your logo and JSON metadata are uploaded to IPFS via NFT.Storage — decentralized and permanent. The metadata URI is then written on-chain via Metaplex, so your token\'s data is permanent and censorship-resistant.'
      },
      {
        q: 'Can I update my token name or logo after minting?',
        a: 'Yes, as long as you have not revoked the Update authority. If Update authority has been revoked, metadata is permanently locked. Always double-check your name, symbol, and logo before revoking.'
      }
    ]
  },
  {
    category: 'Costs & Fees',
    icon: DollarSign,
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    questions: [
      {
        q: 'How much does it cost to create a Solana token?',
        a: 'Devnet testing is FREE. Mainnet costs 0.15 SOL for a basic token, or 0.5 SOL for full features including authority revocation and social links. Network gas is covered. No hidden fees.'
      },
      {
        q: 'What is rent-exemption on Solana?',
        a: 'Solana requires accounts to hold a minimum SOL balance to remain open on-chain — this is "rent-exemption." For a new token mint account, it is approximately 0.00203928 SOL. This is embedded in the overall creation cost and is not a recurring charge.'
      },
      {
        q: 'What happens if my transaction fails?',
        a: 'If a Solana transaction fails, no charges apply. You can safely retry the creation process. Common causes include insufficient SOL balance or brief network congestion.'
      },
      {
        q: 'Are there any hidden fees?',
        a: 'No. The pricing is fully transparent. Network gas is covered. There are no subscription fees, withdrawal fees, or royalty charges.'
      }
    ]
  },
  {
    category: 'After Minting - Trading & Listing',
    icon: TrendingUp,
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    questions: [
      {
        q: 'Can I add liquidity after minting?',
        a: 'Yes. You can pair your token with SOL on Raydium or Jupiter. Once the pool is live, your token is tradeable by the public.'
      },
      {
        q: 'How do I list my token on a Solana DEX?',
        a: 'Adding liquidity to Raydium is the listing step — once your pool is live, your token is tradeable and gets indexed by Jupiter automatically.'
      },
      {
        q: 'Will my token appear on Jupiter?',
        a: 'Once you have an active Raydium or Orca liquidity pool, Jupiter typically indexes your token automatically, making it available to Jupiter\'s large user base for swapping.'
      },
      {
        q: 'Can I list on CoinGecko or CoinMarketCap?',
        a: 'CoinGecko and CoinMarketCap require separate self-service applications. You\'ll need an active liquidity pool, real trading volume, a live project website, and social media presence.'
      },
      {
        q: 'How do I verify my token on Solscan?',
        a: 'After minting, copy your mint address from the confirmation screen. Paste it into Solscan.io to view on-chain data. Solscan also offers a project information submission form for a verified listing.'
      },
      {
        q: 'Can I airdrop tokens to other wallets?',
        a: 'Yes. Once minted, you can transfer tokens to any Solana wallet address. For large-scale airdrops to hundreds or thousands of wallets, use Solana batch-transfer tools.'
      },
      {
        q: 'Why is my token not showing in my wallet?',
        a: 'Many wallets don\'t auto-display tokens with no market activity. Manually add it using your mint address. Once trading begins, it should appear automatically.'
      },
      {
        q: 'Can I burn tokens to reduce supply?',
        a: 'Yes. Burning permanently removes tokens from circulation. You can burn from your wallet or a Solana explorer tool. Burning is a common deflationary tactic used by projects to reward holders.'
      }
    ]
  },
  {
    category: 'Security & Trust',
    icon: Shield,
    iconColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
    questions: [
      {
        q: 'Is it safe to use ZRP?',
        a: 'Yes. ZRP never requests your seed phrase or private keys. All transactions are signed locally in your wallet. Only the signed transaction is broadcast to Solana — we never have custody of your funds.'
      },
      {
        q: 'Can you rug-pull or steal my token?',
        a: 'No. Once your token is minted, it belongs entirely to your wallet. Unless you grant additional authorities to a third party, no one — including ZRP — can move, freeze, or modify your token without your wallet signature.'
      },
      {
        q: 'Is creating a Solana token legal?',
        a: 'Token creation is technically legal in most jurisdictions. However, the legal classification — utility vs. security — varies by country. We recommend consulting a crypto-literate legal professional in your jurisdiction before launching.'
      },
      {
        q: 'What is a fair launch token?',
        a: 'A fair launch means all participants have equal access from day one — no private pre-sales, no team allocations, and no early insider advantages. Fair launches have become a key trust signal in the Solana community.'
      }
    ]
  },
  {
    category: 'Tokenomics & Strategy',
    icon: BarChart3,
    iconColor: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    questions: [
      {
        q: 'What is tokenomics and why does it matter?',
        a: 'Tokenomics is the economic model of your token: total supply, distribution, vesting, utility, and burn mechanisms. Good tokenomics align incentives between founders, early investors, and the community.'
      },
      {
        q: 'What is the difference between a token and an NFT on Solana?',
        a: 'A fungible SPL token has a supply greater than 1 and each unit is interchangeable (like currency). An NFT has a supply of exactly 1 and 0 decimals, making it unique. ZRP is for fungible SPL tokens.'
      },
      {
        q: 'What is a memecoin on Solana?',
        a: 'A Solana memecoin is a cryptocurrency token inspired by internet culture, memes, or community trends — examples include BONK and WIF. They are typically created quickly with large supplies and rely on community virality and social media momentum.'
      },
      {
        q: 'Can I create a fixed-supply token?',
        a: 'Yes. Set your desired total supply at creation, then revoke the Mint authority. This permanently prevents any additional tokens from being created, making your supply truly fixed and provably deflationary.'
      },
      {
        q: 'What is the Solana Token-2022 standard?',
        a: 'Token-2022 (Token Extensions) is an upgraded SPL standard supporting advanced features: transfer fees, interest-bearing tokens, confidential transfers, and non-transferable tokens. ZRP currently creates standard SPL tokens.'
      },
      {
        q: 'How do I market my token after launching?',
        a: 'Build a community on X (Twitter) and Telegram, launch a project website, submit to token trackers (Birdeye, DEX Screener), run airdrop campaigns, engage Solana-focused influencers, and post in crypto communities.'
      }
    ]
  },
  {
    category: 'Technical & Advanced',
    icon: Wrench,
    iconColor: 'text-zinc-400',
    bgColor: 'bg-zinc-500/10',
    borderColor: 'border-zinc-500/20',
    questions: [
      {
        q: 'What is Metaplex and does my token use it?',
        a: 'Metaplex is the leading on-chain metadata standard for Solana. ZRP uses the Metaplex Token Metadata program to attach your logo, name, symbol, and other data to your token. This ensures compatibility with all Solana wallets, DEXes, and block explorers.'
      },
      {
        q: 'What is the difference between Solana mainnet and devnet?',
        a: 'Mainnet is the live Solana blockchain where real SOL is used and tokens have real monetary value. Devnet is a test environment using free test SOL with no real value. ZRP supports both networks!'
      },
      {
        q: 'What is a liquidity pool?',
        a: 'A liquidity pool is a smart contract holding reserves of two tokens — for example, your token and SOL. Traders swap against the pool, and liquidity providers earn a share of trading fees. Without a pool, your token has no on-chain trading market.'
      },
      {
        q: 'What is Raydium?',
        a: 'Raydium is one of Solana\'s largest AMM (Automated Market Maker) DEXes. It allows you to create a liquidity pool for your newly minted token. Once live on Raydium, your token can be bought and sold by anyone — and is automatically indexed by Jupiter.'
      },
      {
        q: 'Can I create multiple tokens with the same wallet?',
        a: 'Yes, there is no limit. Each token creation is an independent transaction with its own fee. Many projects create multiple tokens from the same wallet.'
      },
      {
        q: 'How do I add my token to a Solana portfolio tracker?',
        a: 'Most trackers — Step Finance, Birdeye, Sonar Watch — auto-detect tokens in your connected wallet. For broader recognition, submit your token\'s metadata via Birdeye\'s token listing form or the Solana token registry.'
      },
      {
        q: 'What makes ZRP different from other token creators?',
        a: 'ZRP is the only platform that offers FREE devnet testing before mainnet launch. We combine a fast no-code interface with full Metaplex metadata support, built-in authority revocation, decentralized IPFS storage, and transparent pricing — all designed for reliable Solana launches with a production-grade UX.'
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (key: string) => {
    setOpenIndex((prev) => (prev === key ? null : key));
  };

  const isOpen = (key: string) => openIndex === key;

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-black via-zinc-950/30 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Support</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Questions</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Everything you need to know about creating Solana tokens — no jargon, straight answers.
          </p>
        </motion.div>

        {/* FAQ Categories */}
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
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-zinc-800/80">
                  <div className={`w-10 h-10 rounded-xl ${category.bgColor} flex items-center justify-center border ${category.borderColor}`}>
                    <Icon className={`h-5 w-5 ${category.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{category.category}</h3>
                  <span className="ml-auto text-xs text-zinc-500 bg-zinc-800/50 px-2.5 py-1 rounded-full">
                    {category.questions.length} questions
                  </span>
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  {category.questions.map((faq, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isExpanded = isOpen(key);
                    
                    return (
                      <div
                        key={qIndex}
                        className={`bg-zinc-900/40 backdrop-blur-sm rounded-xl border transition-all duration-300 overflow-hidden ${
                          isExpanded 
                            ? 'border-zinc-700 shadow-lg shadow-purple-500/5' 
                            : 'border-zinc-800/80 hover:border-zinc-700'
                        }`}
                      >
                        <button
                          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-800/30 transition-colors"
                          onClick={() => toggleQuestion(key)}
                        >
                          <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isExpanded 
                              ? 'bg-purple-500/20 rotate-180' 
                              : 'bg-zinc-800/50'
                          }`}>
                            <ChevronDown
                              className={`h-4 w-4 transition-colors duration-300 ${
                                isExpanded ? 'text-purple-400' : 'text-zinc-500'
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
                              <div className="px-5 sm:px-6 pb-5 text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-zinc-800/50 pt-4">
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-purple-900/20 via-purple-900/10 to-blue-900/20 border border-purple-500/20 rounded-2xl px-8 py-5 backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-purple-400" />
            <div className="text-left">
              <div className="text-white font-semibold">Still have questions?</div>
              <div className="text-sm text-zinc-400">We&apos;re here to help you launch</div>
            </div>
            <a 
              href="/contact"
              className="ml-0 sm:ml-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
