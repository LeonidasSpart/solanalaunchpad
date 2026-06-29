'use client';
import Link from 'next/link';
import Image from 'next/image';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NetworkSwitcher from '@/components/NetworkSwitcher';

const Header = () => {
  return (
    <header className="bg-black/95 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="ZRP Logo"
            width={40}
            height={40}
            className="rounded-xl"
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-purple-400 transition">ZRP</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <nav className="flex items-center gap-1">
            <Link href="/airdrop" className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition">
              Airdrop
            </Link>
            <Link href="/create-mint" className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition">
              Create Mint
            </Link>
            <Link href="/tokens" className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition">
              Tokens
            </Link>
            <Link href="/admin/dashboard" className="px-3 py-1.5 text-xs text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-lg transition border border-zinc-800 hover:border-zinc-600">
              Admin
            </Link>
          </nav>

          <div className="w-px h-6 bg-zinc-800 mx-3" />

          {/* Network Switcher */}
          <div className="mr-1">
            <NetworkSwitcher />
          </div>

          {/* Wallet Button */}
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-5 !py-2 !font-semibold !text-white !text-sm transition-all !shadow-lg !shadow-purple-500/25" />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-zinc-400 hover:text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
