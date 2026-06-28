'use client';
import Link from 'next/link';
import Image from 'next/image';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NetworkSwitcher from '@/components/NetworkSwitcher';

const Header = () => {
  return (
    <header className="bg-black/95 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
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
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/airdrop" className="text-gray-400 hover:text-white transition">Airdrop</Link>
            <Link href="/create-mint" className="text-gray-400 hover:text-white transition">Create Mint</Link>
            <Link href="/tokens" className="text-gray-400 hover:text-white transition">Tokens</Link>
          </nav>

          {/* Network Switcher */}
          <NetworkSwitcher />

          {/* Wallet Button */}
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-2xl !px-6 !py-2.5 !font-semibold !text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
