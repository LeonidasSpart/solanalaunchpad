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
        a: 'Devnet testing is FREE. For mainnet, the base token creation fee is 0.15 SOL. Each authority revocation (Mint, Freeze, Update) adds 0.15 SOL, so the maximum cost for full security with all three revocations is 0.60 SOL. Network gas is covered. No hidden fees.'
      },
      {
        q: 'What token templates does ZRP offer?',
        a: 'ZRP provides several templates to get started quickly: Meme Coin, Governance DAO, Utility Token, and Simple Token. Each template comes with pre‑configured supply, decimals, and authority settings (e.g., No Mint, No Freeze, Immutable). You can also choose “Start from Scratch” for full customization.'
      },
      {
        q: 'How long does minting take?',
        a: 'Typically under 60 seconds from confirming the transaction in your wallet to your token appearing on-chain. Solana\'s fast block times make the process almost instant.'
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
        a: 'Devnet testing is FREE. Mainnet costs 0.15 SOL for a basic token. Each authority revocation (Mint, Freeze, Update) adds 0.15 SOL, so the maximum cost for full security is 0.60 SOL. Network gas is covered. No hidden fees.'
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
  // ─── 5. Security & Trust ──────────────────────────────────────────
  {
    category: 'Security & Trust',
    icon: Shield,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
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
  // ─── 6. Tokenomics & Strategy ─────────────────────────────────────
  {
    category: 'Tokenomics & Strategy',
    icon: BarChart3,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
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
  // ─── 7. Technical & Advanced ──────────────────────────────────────
  {
    category: 'Technical & Advanced',
    icon: Wrench,
    iconColor: 'text-[#FF2D2D]',
    bgColor: 'bg-[#FF2D2D]/10',
    borderColor: 'border-[#FF2D2D]/20',
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
  },
  // ─── 8. Launchpad (IDO) ───────────────────────────────────────────
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
  // ─── 9. Vesting ────────────────────────────────────────────────────
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
  // ─── 10. Staking ──────────────────────────────────────────────────
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
  // ─── 11. DAO Governance ──────────────────────────────────────────
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
  // ─── 12. NFT ──────────────────────────────────────────────────────
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
  // ─── 13. NFT Staking ─────────────────────────────────────────────
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

// ─── Component remains unchanged ────────────────────────────────────
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
