'use client';

import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Official Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="ZRP Logo" 
            width={48} 
            height={48} 
            className="rounded-xl"
            priority
          />
          <span className="text-3xl font-bold tracking-tighter text-white">ZRP</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/airdrop" className="text-gray-400 hover:text-white transition">Airdrop</Link>
          <Link href="/create-mint" className="text-gray-400 hover:text-white transition">Create Mint</Link>
          <Link href="/tokens" className="text-gray-400 hover:text-white transition">Tokens</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="bg-white text-black px-6 py-2.5 rounded-2xl font-semibold hover:bg-gray-200 transition">
            Launch Token
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-2xl font-medium transition">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
