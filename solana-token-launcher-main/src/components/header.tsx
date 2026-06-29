'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NetworkSwitcher from '@/components/NetworkSwitcher';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/airdrop', label: 'Airdrop' },
    { href: '/create-mint', label: 'Create Mint' },
    { href: '/tokens', label: 'Tokens' },
    { href: '/pricing', label: 'Pricing' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-zinc-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <Image
              src="/logo.png"
              alt="ZRP Logo"
              width={38}
              height={38}
              className="rounded-xl"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition">
              ZRP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-purple-600/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Network Switcher */}
            <NetworkSwitcher />

            {/* Wallet Button */}
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-xl !px-5 !py-2 !font-semibold !text-white !text-sm transition-all !shadow-lg !shadow-purple-500/25 hover:!shadow-purple-500/40" />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800/50 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800/50 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition ${
                  isActive(link.href)
                    ? 'text-white bg-purple-600/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-xl transition"
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
