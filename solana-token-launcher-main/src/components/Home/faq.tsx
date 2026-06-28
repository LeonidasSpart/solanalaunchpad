'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  // ============================================
  // GETTING STARTED
  // ============================================
  {
    category: 'Getting Started',
    q: 'What is a Solana token creator?',
    a: 'A Solana token creator is a no-code platform that helps you create SPL tokens by handling wallet connection, token parameters, metadata, and on-chain minting in one guided flow.'
  },
  {
    category: 'Getting Started',
    q: 'What is a Solana SPL token?',
    a: 'An SPL token is a fungible digital asset created on the Solana blockchain using the Solana Program Library (SPL) token standard — analogous to ERC-20 tokens on Ethereum. They can represent memecoins, utility tokens, governance tokens, stablecoins, or any custom cryptocurrency.'
  },
  {
    category: 'Getting Started',
    q: 'How do I create a token on Solana?',
    a: 'With ZRP: (1) connect your Solana wallet, (2) enter your token name, symbol, total supply, and decimals, (3) upload a logo and add optional social metadata, (4) confirm the transaction and pay a small SOL fee. No coding required.'
  },
  {
    category: 'Getting Started',
    q: 'Do I need to know how to code?',
    a: 'No. ZRP is a completely no-code Solana token creator. Fill in a form, connect your wallet, and click mint. The platform handles all SPL token program interactions on your behalf.'
  },
  {
    category: 'Getting Started',
    q: 'Which wallet do I need?',
    a: 'ZRP supports common Solana wallets including Phantom, Solflare, Torus, and Ledger. Use whichever supported wallet you prefer.'
  },
  {
    category: 'Getting Started',
    q: 'How much SOL do I need before I start?',
    a: 'Devnet testing is FREE. For mainnet, you need at least 0.15 SOL for a basic token. If you plan to revoke authorities, budget 0.5 SOL for full features. Network gas is covered.'
  },
  {
    category: 'Getting Started',
    q: 'How long does minting take?',
    a: 'Typically under 60 seconds from confirming the transaction in your wallet to your token appearing on-chain. Solana\'s fast block times make the process almost instant.'
  },

  // ============================================
  // TOKEN SETUP & CONFIGURATION
  // ============================================
  {
    category: 'Token Setup',
    q: 'What are token decimals and what should I choose?',
    a: 'Decimals determine the smallest divisible unit. 9 decimals (Solana default) allows fractions as small as 0.000000001. Memecoins often use 6 decimals. Non-divisible tokens (e.g. limited-edition items) should use 0 decimals.'
  },
  {
    category: 'Token Setup',
    q: 'How do I decide on token supply?',
    a: 'Memecoins typically use 1 billion to 1 trillion tokens — large numbers make the per-token price feel accessible to retail buyers. Utility tokens often use more modest amounts. Think about your tokenomics: distribution, team allocation, liquidity pool share, and community rewards.'
  },
  {
    category: 'Token Setup',
    q: 'What are Mint, Freeze, and Update authorities?',
    a: 'Mint authority controls who can create additional tokens. Freeze authority can lock token accounts. Update authority controls who can modify the on-chain metadata. All three default to your wallet and can optionally be revoked.'
  },
  {
    category: 'Token Setup',
    q: 'Should I revoke my token authorities?',
    a: 'Revoking Mint authority prevents future inflation — a strong trust signal. Revoking Freeze authority reassures holders their tokens can never be locked. Revoking Update authority locks the metadata forever. These decisions are irreversible, so choose carefully.'
  },
  {
    category: 'Token Setup',
    q: 'What is token metadata on Solana?',
    a: 'Token metadata is the on-chain data describing your token: name, symbol, logo URI, description, website URL, and social links. It is stored using the Metaplex Token Metadata standard, ensuring compatibility with all Solana wallets, DEXes, and explorers.'
  },
  {
    category: 'Token Setup',
    q: 'Where is my logo and metadata stored?',
    a: 'Your logo and JSON metadata are uploaded to IPFS via NFT.Storage — decentralized and permanent. The metadata URI is then written on-chain via Metaplex, so your token\'s data is permanent and censorship-resistant.'
  },
  {
    category: 'Token Setup',
    q: 'Can I update my token name or logo after minting?',
    a: 'Yes, as long as you have not revoked the Update authority. If Update authority has been revoked, metadata is permanently locked. Always double-check your name, symbol, and logo before revoking.'
  },

  // ============================================
  // COSTS & FEES
  // ============================================
  {
    category: 'Costs & Fees',
    q: 'How much does it cost to create a Solana token?',
    a: 'Devnet testing is FREE. Mainnet costs 0.15 SOL for a basic token, or 0.5 SOL for full features including authority revocation and social links. Network gas is covered. No hidden fees.'
  },
  {
    category: 'Costs & Fees',
    q: 'What is rent-exemption on Solana?',
    a: 'Solana requires accounts to hold a minimum SOL balance to remain open on-chain — this is "rent-exemption." For a new token mint account, it is approximately 0.00203928 SOL. This is embedded in the overall creation cost and is not a recurring charge.'
  },
  {
    category: 'Costs & Fees',
    q: 'What happens if my transaction fails?',
    a: 'If a Solana transaction fails, no charges apply. You can safely retry the creation process. Common causes include insufficient SOL balance or brief network congestion.'
  },
  {
    category: 'Costs & Fees',
    q: 'Are there any hidden fees?',
    a: 'No. The pricing is fully transparent. Network gas is covered. There are no subscription fees, withdrawal fees, or royalty charges.'
  },

  // ============================================
  // AFTER MINTING - TRADING & LISTING
  // ============================================
  {
    category: 'After Minting',
    q: 'Can I add liquidity after minting?',
    a: 'Yes. You can pair your token with SOL on Raydium or Jupiter. Once the pool is live, your token is tradeable by the public.'
  },
  {
    category: 'After Minting',
    q: 'How do I list my token on a Solana DEX?',
    a: 'Adding liquidity to Raydium is the listing step — once your pool is live, your token is tradeable and gets indexed by Jupiter automatically.'
  },
  {
    category: 'After Minting',
    q: 'Will my token appear on Jupiter?',
    a: 'Once you have an active Raydium or Orca liquidity pool, Jupiter typically indexes your token automatically, making it available to Jupiter\'s large user base for swapping.'
  },
  {
    category: 'After Minting',
    q: 'Can I list on CoinGecko or CoinMarketCap?',
    a: 'CoinGecko and CoinMarketCap require separate self-service applications. You\'ll need an active liquidity pool, real trading volume, a live project website, and social media presence.'
  },
  {
    category: 'After Minting',
    q: 'How do I verify my token on Solscan?',
    a: 'After minting, copy your mint address from the confirmation screen. Paste it into Solscan.io to view on-chain data. Solscan also offers a project information submission form for a verified listing.'
  },
  {
    category: 'After Minting',
    q: 'Can I airdrop tokens to other wallets?',
    a: 'Yes. Once minted, you can transfer tokens to any Solana wallet address. For large-scale airdrops to hundreds or thousands of wallets, use Solana batch-transfer tools.'
  },
  {
    category: 'After Minting',
    q: 'Why is my token not showing in my wallet?',
    a: 'Many wallets don\'t auto-display tokens with no market activity. Manually add it using your mint address. Once trading begins, it should appear automatically.'
  },
  {
    category: 'After Minting',
    q: 'Can I burn tokens to reduce supply?',
    a: 'Yes. Burning permanently removes tokens from circulation. You can burn from your wallet or a Solana explorer tool. Burning is a common deflationary tactic used by projects to reward holders.'
  },

  // ============================================
  // SECURITY & TRUST
  // ============================================
  {
    category: 'Security & Trust',
    q: 'Is it safe to use ZRP?',
    a: 'Yes. ZRP never requests your seed phrase or private keys. All transactions are signed locally in your wallet. Only the signed transaction is broadcast to Solana — we never have custody of your funds.'
  },
  {
    category: 'Security & Trust',
    q: 'Can you rug-pull or steal my token?',
    a: 'No. Once your token is minted, it belongs entirely to your wallet. Unless you grant additional authorities to a third party, no one — including ZRP — can move, freeze, or modify your token without your wallet signature.'
  },
  {
    category: 'Security & Trust',
    q: 'Is creating a Solana token legal?',
    a: 'Token creation is technically legal in most jurisdictions. However, the legal classification — utility vs. security — varies by country. We recommend consulting a crypto-literate legal professional in your jurisdiction before launching.'
  },
  {
    category: 'Security & Trust',
    q: 'What is a fair launch token?',
    a: 'A fair launch means all participants have equal access from day one — no private pre-sales, no team allocations, and no early insider advantages. Fair launches have become a key trust signal in the Solana community.'
  },

  // ============================================
  // TOKENOMICS & STRATEGY
  // ============================================
  {
    category: 'Tokenomics',
    q: 'What is tokenomics and why does it matter?',
    a: 'Tokenomics is the economic model of your token: total supply, distribution, vesting, utility, and burn mechanisms. Good tokenomics align incentives between founders, early investors, and the community.'
  },
  {
    category: 'Tokenomics',
    q: 'What is the difference between a token and an NFT on Solana?',
    a: 'A fungible SPL token has a supply greater than 1 and each unit is interchangeable (like currency). An NFT has a supply of exactly 1 and 0 decimals, making it unique. ZRP is for fungible SPL tokens.'
  },
  {
    category: 'Tokenomics',
    q: 'What is a memecoin on Solana?',
    a: 'A Solana memecoin is a cryptocurrency token inspired by internet culture, memes, or community trends — examples include BONK and WIF. They are typically created quickly with large supplies and rely on community virality and social media momentum.'
  },
  {
    category: 'Tokenomics',
    q: 'Can I create a fixed-supply token?',
    a: 'Yes. Set your desired total supply at creation, then revoke the Mint authority. This permanently prevents any additional tokens from being created, making your supply truly fixed and provably deflationary.'
  },
  {
    category: 'Tokenomics',
    q: 'What is the Solana Token-2022 standard?',
    a: 'Token-2022 (Token Extensions) is an upgraded SPL standard supporting advanced features: transfer fees, interest-bearing tokens, confidential transfers, and non-transferable tokens. ZRP currently creates standard SPL tokens.'
  },
  {
    category: 'Tokenomics',
    q: 'How do I market my token after launching?',
    a: 'Build a community on X (Twitter) and Telegram, launch a project website, submit to token trackers (Birdeye, DEX Screener), run airdrop campaigns, engage Solana-focused influencers, and post in crypto communities.'
  },

  // ============================================
  // TECHNICAL & ADVANCED
  // ============================================
  {
    category: 'Technical',
    q: 'What is Metaplex and does my token use it?',
    a: 'Metaplex is the leading on-chain metadata standard for Solana. ZRP uses the Metaplex Token Metadata program to attach your logo, name, symbol, and other data to your token. This ensures compatibility with all Solana wallets, DEXes, and block explorers.'
  },
  {
    category: 'Technical',
    q: 'What is the difference between Solana mainnet and devnet?',
    a: 'Mainnet is the live Solana blockchain where real SOL is used and tokens have real monetary value. Devnet is a test environment using free test SOL with no real value. ZRP supports both networks!'
  },
  {
    category: 'Technical',
    q: 'What is a liquidity pool?',
    a: 'A liquidity pool is a smart contract holding reserves of two tokens — for example, your token and SOL. Traders swap against the pool, and liquidity providers earn a share of trading fees. Without a pool, your token has no on-chain trading market.'
  },
  {
    category: 'Technical',
    q: 'What is Raydium?',
    a: 'Raydium is one of Solana\'s largest AMM (Automated Market Maker) DEXes. It allows you to create a liquidity pool for your newly minted token. Once live on Raydium, your token can be bought and sold by anyone — and is automatically indexed by Jupiter.'
  },
  {
    category: 'Technical',
    q: 'Can I create multiple tokens with the same wallet?',
    a: 'Yes, there is no limit. Each token creation is an independent transaction with its own fee. Many projects create multiple tokens from the same wallet.'
  },
  {
    category: 'Technical',
    q: 'How do I add my token to a Solana portfolio tracker?',
    a: 'Most trackers — Step Finance, Birdeye, Sonar Watch — auto-detect tokens in your connected wallet. For broader recognition, submit your token\'s metadata via Birdeye\'s token listing form or the Solana token registry.'
  },
  {
    category: 'Technical',
    q: 'What makes ZRP different from other token creators?',
    a: 'ZRP is the only platform that offers FREE devnet testing before mainnet launch. We combine a fast no-code interface with full Metaplex metadata support, built-in authority revocation, decentralized IPFS storage, and transparent pricing — all designed for reliable Solana launches with a production-grade UX.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400">
            Everything you need to know about creating Solana tokens — no jargon, straight answers.
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
                <div className="flex-1">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-wider block mb-0.5">
                    {faq.category}
                  </span>
                  <span className="text-white font-medium">{faq.q}</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-zinc-400 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-zinc-300 text-sm border-t border-zinc-800 pt-3 leading-relaxed">
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
