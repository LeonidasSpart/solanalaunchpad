'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section: Logo + Tagline */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-12 border-b border-zinc-800/50">
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
              <span className="text-2xl font-bold text-white">ZRP</span>
            </div>
            <p className="text-zinc-400 text-sm max-w-md">
              Zero-code Solana token creation. Fast, simple, and secure.
            </p>
            <p className="text-zinc-500 text-sm mt-2">
              Starting from <span className="text-purple-400 font-semibold">0.15 SOL</span> · No hidden fees · Your keys, your tokens
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/create-mint"
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition text-sm"
            >
              Create Token
            </Link>
            <Link
              href="/checklist"
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition text-sm border border-zinc-700"
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
              <li><Link href="/" className="text-zinc-400 hover:text-white text-sm transition">Home</Link></li>
              <li><Link href="/create-mint" className="text-zinc-400 hover:text-white text-sm transition">Create Token</Link></li>
              <li><Link href="/add-liquidity" className="text-zinc-400 hover:text-white text-sm transition">Add Liquidity</Link></li>
              <li><Link href="/airdrop" className="text-zinc-400 hover:text-white text-sm transition">Airdrop Tool</Link></li>
              <li><Link href="/revoke" className="text-zinc-400 hover:text-white text-sm transition">Revoke Authority</Link></li>
              <li><Link href="/pricing" className="text-zinc-400 hover:text-white text-sm transition">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-zinc-400 hover:text-white text-sm transition">Dashboard</Link></li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Guides</h4>
            <ul className="space-y-2.5">
              <li><Link href="/guide" className="text-zinc-400 hover:text-white text-sm transition">How to Create Token</Link></li>
              <li><Link href="/checklist" className="text-zinc-400 hover:text-white text-sm transition">Pre-Launch Checklist</Link></li>
              <li><Link href="/launch" className="text-zinc-400 hover:text-white text-sm transition">Launch Strategy</Link></li>
              <li><Link href="/add-liquidity" className="text-zinc-400 hover:text-white text-sm transition">Add Liquidity</Link></li>
              <li><Link href="/list-token-dex" className="text-zinc-400 hover:text-white text-sm transition">DEX Listing</Link></li>
              <li><Link href="/distribution" className="text-zinc-400 hover:text-white text-sm transition">Distribution</Link></li>
              <li><Link href="/airdrop-guide" className="text-zinc-400 hover:text-white text-sm transition">Airdrop Guide</Link></li>
              <li><Link href="/burn" className="text-zinc-400 hover:text-white text-sm transition">Token Burning</Link></li>
              <li><Link href="/staking" className="text-zinc-400 hover:text-white text-sm transition">Staking</Link></li>
              <li><Link href="/meme-vs-utility" className="text-zinc-400 hover:text-white text-sm transition">Meme vs Utility</Link></li>
              <li><Link href="/community" className="text-zinc-400 hover:text-white text-sm transition">Community Building</Link></li>
              <li><Link href="/marketing" className="text-zinc-400 hover:text-white text-sm transition">Marketing</Link></li>
              <li><Link href="/security" className="text-zinc-400 hover:text-white text-sm transition">Security</Link></li>
              <li><Link href="/tokenomics" className="text-zinc-400 hover:text-white text-sm transition">Tokenomics</Link></li>
              <li><Link href="/tokenomics-calculator" className="text-zinc-400 hover:text-white text-sm transition">Tokenomics Calculator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-zinc-400 hover:text-white text-sm transition">Blog</Link></li>
              <li><Link href="/guide" className="text-zinc-400 hover:text-white text-sm transition">SPL Token Guide</Link></li>
              <li><Link href="/revoke" className="text-zinc-400 hover:text-white text-sm transition">Revoke Authority</Link></li>
              <li><Link href="/pricing" className="text-zinc-400 hover:text-white text-sm transition">Creation Costs</Link></li>
              <li><Link href="/faq" className="text-zinc-400 hover:text-white text-sm transition">FAQ</Link></li>
              <li><Link href="/about" className="text-zinc-400 hover:text-white text-sm transition">About Us</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-white text-sm transition">Contact</Link></li>
            </ul>
          </div>

          {/* Trust & Security */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Trust & Security</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-zinc-400 text-sm">
                <span className="text-green-400">✓</span> Wallet-signed only
              </li>
              <li className="flex items-center gap-2 text-zinc-400 text-sm">
                <span className="text-green-400">✓</span> No seed phrase access
              </li>
              <li className="flex items-center gap-2 text-zinc-400 text-sm">
                <span className="text-green-400">✓</span> Decentralised storage
              </li>
              <li className="flex items-center gap-2 text-zinc-400 text-sm">
                <span className="text-green-400">✓</span> You own your tokens
              </li>
              <li className="flex items-center gap-2 text-zinc-400 text-sm">
                <span className="text-green-400">✓</span> Transparent pricing
              </li>
            </ul>

            {/* Ecosystem */}
            <h4 className="text-white font-semibold text-sm mt-6 mb-3">Ecosystem</h4>
            <div className="flex flex-wrap gap-3">
              <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-xs bg-zinc-900 px-3 py-1 rounded-full hover:text-white hover:bg-zinc-800 transition">Phantom</a>
              <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-xs bg-zinc-900 px-3 py-1 rounded-full hover:text-white hover:bg-zinc-800 transition">Solflare</a>
              <a href="https://raydium.io/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-xs bg-zinc-900 px-3 py-1 rounded-full hover:text-white hover:bg-zinc-800 transition">Raydium</a>
              <a href="https://jup.ag/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-xs bg-zinc-900 px-3 py-1 rounded-full hover:text-white hover:bg-zinc-800 transition">Jupiter</a>
              <a href="https://metaplex.com/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-xs bg-zinc-900 px-3 py-1 rounded-full hover:text-white hover:bg-zinc-800 transition">Metaplex</a>
              <a href="https://solscan.io/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 text-xs bg-zinc-900 px-3 py-1 rounded-full hover:text-white hover:bg-zinc-800 transition">Solscan</a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-zinc-800/50 pt-8">
          <p className="text-zinc-500 text-xs leading-relaxed max-w-4xl">
            <span className="text-zinc-400 font-semibold">Disclaimer &amp; Safety Notice:</span>{' '}
            This platform provides tools for interacting with the Solana blockchain. We do not control, verify, or endorse tokens created by users. Nothing on this website constitutes financial, investment, or trading advice. Blockchain transactions are irreversible — always verify details before confirming in your wallet. We will never request your seed phrase or private keys. Users are solely responsible for tokens they create and must ensure compliance with applicable laws and regulations.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800/50 mt-6">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} ZRP. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 transition">Privacy Policy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 transition">Terms of Service</Link>
            <span className="text-zinc-600">|</span>
            <div className="flex gap-2">
              <button className="text-zinc-500 hover:text-white text-sm transition">🇬🇧 EN</button>
              <button className="text-zinc-600 hover:text-white text-sm transition">🇪🇸 ES</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
