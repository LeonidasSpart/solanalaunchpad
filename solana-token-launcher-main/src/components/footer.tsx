'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a] py-16 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section: Logo + Tagline + Socials */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-12 border-b border-[#1a1a1a]/50">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logo.png"
                alt="ZRP Logo"
                width={48}
                height={48}
                className="rounded-xl"
                priority
              />
              <span className="text-2xl font-bold text-white"></span>
            </div>
            <p className="text-[#BDDBDB] text-sm max-w-md">
              Zero-code Solana token creation. Fast, simple, and secure.
            </p>
            <p className="text-[#BDDBDB] text-sm mt-2">
              Starting from <span className="text-[#FF2D2D] font-semibold">0.15 SOL</span> · No hidden fees · Your keys, your tokens
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-4">
              <a 
                href="https://x.com/zrp_ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] flex items-center justify-center text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a] hover:border-[#FF2D2D]/50 transition"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://discord.com/invite/W4qS4xkbn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] flex items-center justify-center text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a] hover:border-[#FF2D2D]/50 transition"
                aria-label="Discord"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/LeonidasSpart/solanalaunchpad" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] flex items-center justify-center text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a] hover:border-[#FF2D2D]/50 transition"
                aria-label="GitHub"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a 
                href="https://t.me/AIZRP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] flex items-center justify-center text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a] hover:border-[#FF2D2D]/50 transition"
                aria-label="Telegram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/create-mint"
              className="px-6 py-2.5 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition text-sm"
            >
              Create Token
            </Link>
            <Link
              href="/checklist"
              className="px-6 py-2.5 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-white font-semibold rounded-xl transition text-sm border border-[#1a1a1a]"
            >
              Launch Checklist
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-[#BDDBDB] hover:text-white text-sm transition">Home</Link></li>
              <li><Link href="/create-mint" className="text-[#BDDBDB] hover:text-white text-sm transition">Create Token</Link></li>
              <li><Link href="/add-liquidity" className="text-[#BDDBDB] hover:text-white text-sm transition">Add Liquidity</Link></li>
              <li><Link href="/airdrop" className="text-[#BDDBDB] hover:text-white text-sm transition">Airdrop Tool</Link></li>
              <li><Link href="/revoke" className="text-[#BDDBDB] hover:text-white text-sm transition">Revoke Authority</Link></li>
              <li><Link href="/burn-lp" className="text-[#BDDBDB] hover:text-white text-sm transition">Burn LP</Link></li>
              <li><Link href="/pricing" className="text-[#BDDBDB] hover:text-white text-sm transition">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-[#BDDBDB] hover:text-white text-sm transition">Dashboard</Link></li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Guides</h4>
            <ul className="space-y-2.5">
              <li><Link href="/guide" className="text-[#BDDBDB] hover:text-white text-sm transition">SPL Token Guide</Link></li>
              <li><Link href="/guide" className="text-[#BDDBDB] hover:text-white text-sm transition">How to Create Token</Link></li>
              <li><Link href="/checklist" className="text-[#BDDBDB] hover:text-white text-sm transition">Pre-Launch Checklist</Link></li>
              <li><Link href="/launch" className="text-[#BDDBDB] hover:text-white text-sm transition">Launch Strategy</Link></li>
              <li><Link href="/liquidity-guide" className="text-[#BDDBDB] hover:text-white text-sm transition">Liquidity Guide</Link></li>
              <li><Link href="/list-token-dex" className="text-[#BDDBDB] hover:text-white text-sm transition">DEX Listing</Link></li>
              <li><Link href="/dex-comparison" className="text-[#BDDBDB] hover:text-white text-sm transition">DEX Comparison</Link></li>
              <li><Link href="/distribution" className="text-[#BDDBDB] hover:text-white text-sm transition">Distribution</Link></li>
              <li><Link href="/airdrop-guide" className="text-[#BDDBDB] hover:text-white text-sm transition">Airdrop Guide</Link></li>
              <li><Link href="/burn" className="text-[#BDDBDB] hover:text-white text-sm transition">Token Burning</Link></li>
              <li><Link href="/revoke-authority" className="text-[#BDDBDB] hover:text-white text-sm transition">Revoke Authority Guide</Link></li>
              <li><Link href="/staking" className="text-[#BDDBDB] hover:text-white text-sm transition">Staking</Link></li>
              <li><Link href="/meme-vs-utility" className="text-[#BDDBDB] hover:text-white text-sm transition">Meme vs Utility</Link></li>
              <li><Link href="/community" className="text-[#BDDBDB] hover:text-white text-sm transition">Community Building</Link></li>
              <li><Link href="/marketing" className="text-[#BDDBDB] hover:text-white text-sm transition">Marketing</Link></li>
              <li><Link href="/security" className="text-[#BDDBDB] hover:text-white text-sm transition">Security</Link></li>
              <li><Link href="/tokenomics" className="text-[#BDDBDB] hover:text-white text-sm transition">Tokenomics</Link></li>
              <li><Link href="/tokenomics-calculator" className="text-[#BDDBDB] hover:text-white text-sm transition">Tokenomics Calculator</Link></li>
              <li><Link href="/no-code-creator" className="text-[#BDDBDB] hover:text-white text-sm transition">No-Code Creator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-[#BDDBDB] hover:text-white text-sm transition">Blog</Link></li>
              <li><Link href="/pricing" className="text-[#BDDBDB] hover:text-white text-sm transition">Creation Costs</Link></li>
              <li><Link href="/why-zrp" className="text-[#BDDBDB] hover:text-white text-sm transition">Why ZRP</Link></li>
              <li><Link href="/affiliates" className="text-[#BDDBDB] hover:text-white text-sm transition">Affiliates</Link></li>
              <li><Link href="/faq" className="text-[#BDDBDB] hover:text-white text-sm transition">FAQ</Link></li>
              <li><Link href="/about" className="text-[#BDDBDB] hover:text-white text-sm transition">About Us</Link></li>
              <li><Link href="/contact" className="text-[#BDDBDB] hover:text-white text-sm transition">Contact</Link></li>
            </ul>
          </div>

          {/* Trust & Security */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Trust & Security</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-[#BDDBDB] text-sm">
                <span className="text-[#FF2D2D]">✓</span> Wallet-signed only
              </li>
              <li className="flex items-center gap-2 text-[#BDDBDB] text-sm">
                <span className="text-[#FF2D2D]">✓</span> No seed phrase access
              </li>
              <li className="flex items-center gap-2 text-[#BDDBDB] text-sm">
                <span className="text-[#FF2D2D]">✓</span> Decentralised storage
              </li>
              <li className="flex items-center gap-2 text-[#BDDBDB] text-sm">
                <span className="text-[#FF2D2D]">✓</span> You own your tokens
              </li>
              <li className="flex items-center gap-2 text-[#BDDBDB] text-sm">
                <span className="text-[#FF2D2D]">✓</span> Transparent pricing
              </li>
            </ul>

            {/* Ecosystem */}
            <h4 className="text-white font-semibold text-sm mt-6 mb-3">Ecosystem</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] text-xs bg-[#0D0D0D] px-3 py-1 rounded-full hover:text-white hover:bg-[#1a1a1a] transition">Phantom</a>
              <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] text-xs bg-[#0D0D0D] px-3 py-1 rounded-full hover:text-white hover:bg-[#1a1a1a] transition">Solflare</a>
              <a href="https://raydium.io/" target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] text-xs bg-[#0D0D0D] px-3 py-1 rounded-full hover:text-white hover:bg-[#1a1a1a] transition">Raydium</a>
              <a href="https://jup.ag/" target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] text-xs bg-[#0D0D0D] px-3 py-1 rounded-full hover:text-white hover:bg-[#1a1a1a] transition">Jupiter</a>
              <a href="https://metaplex.com/" target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] text-xs bg-[#0D0D0D] px-3 py-1 rounded-full hover:text-white hover:bg-[#1a1a1a] transition">Metaplex</a>
              <a href="https://solscan.io/" target="_blank" rel="noopener noreferrer" className="text-[#BDDBDB] text-xs bg-[#0D0D0D] px-3 py-1 rounded-full hover:text-white hover:bg-[#1a1a1a] transition">Solscan</a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Safety Notice */}
        <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-6 mt-8">
          <h4 className="text-[#FF2D2D] font-semibold text-sm mb-2">⚠️ Disclaimer &amp; Safety Notice</h4>
          <p className="text-[#BDDBDB] text-xs leading-relaxed">
            This platform provides tools for interacting with the Solana blockchain. We do not control, verify, or endorse tokens created by users. Nothing on this website constitutes financial, investment, or trading advice. Blockchain transactions are irreversible — always verify details before confirming in your wallet. We will never request your seed phrase or private keys. Users are solely responsible for tokens they create and must ensure compliance with applicable laws and regulations.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1a1a1a]/50 mt-6">
          <p className="text-[#BDDBDB] text-sm">
            © {new Date().getFullYear()} ZRP. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="/privacy" className="text-[#BDDBDB] hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="text-[#BDDBDB] hover:text-white transition">Terms of Service</Link>
            <Link href="/admin/login" className="text-[#BDDBDB] hover:text-[#FF2D2D] transition text-xs border border-[#1a1a1a] px-3 py-1 rounded-full hover:border-[#FF2D2D]/50">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white rounded-full shadow-lg shadow-[#FF2D2D]/30 transition-all hover:scale-110 duration-300"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
