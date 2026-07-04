'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, 
  ChevronRight, 
  BookOpen, 
  Wallet, 
  Shield, 
  Zap, 
  HelpCircle, 
  AlertCircle,
  Settings,
  Users,
  ArrowLeft
} from 'lucide-react';

interface HelpCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  articles: { title: string; slug: string }[];
}

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories: HelpCategory[] = [
    {
      title: 'Getting Started',
      icon: <BookOpen className="h-5 w-5 text-[#FF2D2D]" />,
      description: 'Learn the basics of ZRP and token creation',
      articles: [
        { title: 'What is ZRP?', slug: 'what-is-zrp' },
        { title: 'How to Create a Solana Token', slug: 'create-token-guide' },
        { title: 'Supported Wallets', slug: 'supported-wallets' },
        { title: 'Devnet vs Mainnet', slug: 'devnet-vs-mainnet' },
        { title: 'Glossary of Terms', slug: 'glossary' },
      ],
    },
    {
      title: 'Creating Tokens',
      icon: <Zap className="h-5 w-5 text-[#FF2D2D]" />,
      description: 'Step-by-step guides for token creation',
      articles: [
        { title: 'How to Create a Token on ZRP', slug: 'create-token' },
        { title: 'Using Templates', slug: 'templates' },
        { title: 'Token Parameters Explained', slug: 'token-parameters' },
        { title: 'Uploading Images to IPFS', slug: 'upload-images' },
        { title: 'Authority Revocation', slug: 'authority-revocation' },
        { title: 'Security Settings', slug: 'security-settings' },
      ],
    },
    {
      title: 'Wallet & Connection',
      icon: <Wallet className="h-5 w-5 text-[#FF2D2D]" />,
      description: 'Connect and manage your wallet on ZRP',
      articles: [
        { title: 'Connecting Your Wallet', slug: 'connect-wallet' },
        { title: 'Transaction Signing', slug: 'transaction-signing' },
        { title: 'Wallet Security Best Practices', slug: 'wallet-security' },
        { title: 'Troubleshooting Connection Issues', slug: 'connection-issues' },
      ],
    },
    {
      title: 'After Token Creation',
      icon: <Settings className="h-5 w-5 text-[#FF2D2D]" />,
      description: 'Manage and grow your token after launch',
      articles: [
        { title: 'Viewing Your Token', slug: 'view-token' },
        { title: 'Sharing Your Token', slug: 'share-token' },
        { title: 'Adding Liquidity', slug: 'add-liquidity' },
        { title: 'Airdrop Distribution', slug: 'airdrop' },
        { title: 'Revoking Authorities After Creation', slug: 'revoke-after' },
        { title: 'Burning LP Tokens', slug: 'burn-lp' },
      ],
    },
    {
      title: 'Security & Trust',
      icon: <Shield className="h-5 w-5 text-[#FF2D2D]" />,
      description: 'Keep your tokens and wallet secure',
      articles: [
        { title: 'Understanding Token Authorities', slug: 'token-authorities' },
        { title: 'Rug Pull Prevention', slug: 'rug-pull' },
        { title: 'Security Checklist', slug: 'security-checklist' },
        { title: 'Reporting Suspicious Activity', slug: 'report-suspicious' },
      ],
    },
    {
      title: 'Troubleshooting',
      icon: <AlertCircle className="h-5 w-5 text-[#FF2D2D]" />,
      description: 'Common issues and how to fix them',
      articles: [
        { title: 'Transaction Failed', slug: 'transaction-failed' },
        { title: 'Insufficient SOL Balance', slug: 'insufficient-sol' },
        { title: 'Token Not Showing in Wallet', slug: 'token-not-showing' },
        { title: 'Image Not Uploading', slug: 'image-upload-issue' },
        { title: 'RPC Connection Errors', slug: 'rpc-errors' },
        { title: 'Browser Compatibility', slug: 'browser-compatibility' },
      ],
    },
    {
      title: 'Account & Support',
      icon: <Users className="h-5 w-5 text-[#FF2D2D]" />,
      description: 'Get help and connect with the community',
      articles: [
        { title: 'Contact Support', slug: 'contact-support' },
        { title: 'Feature Requests', slug: 'feature-requests' },
        { title: 'Report a Bug', slug: 'report-bug' },
        { title: 'Community Guidelines', slug: 'community-guidelines' },
        { title: 'Affiliate Program', slug: 'affiliate-program' },
        { title: 'Frequently Asked Questions', slug: 'faq' },
      ],
    },
    {
      title: 'About ZRP',
      icon: <HelpCircle className="h-5 w-5 text-[#FF2D2D]" />,
      description: 'Learn more about ZRP and our mission',
      articles: [
        { title: 'Our Mission', slug: 'mission' },
        { title: 'Open Source', slug: 'open-source' },
        { title: 'Privacy Policy', slug: 'privacy' },
        { title: 'Terms of Service', slug: 'terms' },
        { title: 'Powered by DeepSeek', slug: 'deepseek' },
      ],
    },
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          ZRP <span className="text-[#FF2D2D]">Help Center</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Everything you need to know about creating, managing, and launching Solana tokens on ZRP.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#BDDBDB]" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl px-12 py-4 text-white placeholder-[#BDDBDB] focus:outline-none focus:border-[#FF2D2D]"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center">
                {category.icon}
              </div>
              <h2 className="text-lg font-bold text-white">{category.title}</h2>
            </div>
            <p className="text-[#BDDBDB] text-sm mb-4">{category.description}</p>
            <ul className="space-y-2">
              {category.articles.slice(0, 5).map((article, i) => (
                <li key={i}>
                  <Link
                    href={`/help/${article.slug}`}
                    className="flex items-center justify-between text-sm text-[#BDDBDB] hover:text-white transition group"
                  >
                    <span>{article.title}</span>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>
              ))}
              {category.articles.length > 5 && (
                <li className="text-sm text-[#BDDBDB] opacity-50">
                  +{category.articles.length - 5} more articles
                </li>
              )}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Still Need Help */}
      <div className="mt-16 bg-[#0D0D0D] rounded-2xl p-8 border border-[#1a1a1a] text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Still Need Help?</h2>
        <p className="text-[#BDDBDB] mb-6">
          Can't find what you're looking for? Contact our support team.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
