'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NetworkSwitcher from '@/components/NetworkSwitcher';
import { useState } from 'react';
import { Menu, X, Zap, ChevronDown } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/create-mint', label: 'Create Token', highlight: true },
    { href: '/tokens', label: 'Tokens' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
  ];

  const dropdownLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-purple-500/10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-blue-600/20 border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center gap-2 text-xs">
          <Zap className="h-3.5 w-3.5 text-yellow-400" />
          <span className="text-zinc-300">
            <span className="text-purple-400 font-semibold">Free Devnet Testing</span> — Test your token with zero cost before mainnet launch
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="ZRP Logo"
                width={38}
                height={38}
                className="rounded-xl"
                priority
              />
              <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition">
                ZRP
              </span>
              <span className="text-[10px] text-zinc-500 -mt-1 tracking-wider uppercase">Token Launcher</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 relative ${
                  isActive(link.href)
                    ? 'text-white bg-purple-600/20'
                    : link.highlight
                    ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {link.label}
                {link.highlight && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                )}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
              >
                More
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-[#12121a] border border-purple-500/20 rounded-xl shadow-2xl shadow-purple-500/10 overflow-hidden">
                  {dropdownLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-purple-500/10 transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Network Switcher */}
            <div className="hidden sm:block">
              <NetworkSwitcher />
            </div>

            {/* Wallet Button */}
            <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-purple-700 hover:!from-purple-500 hover:!to-purple-600 !rounded-xl !px-5 !py-2.5 !font-semibold !text-white !text-sm transition-all !shadow-lg !shadow-purple-500/25 hover:!shadow-purple-500/40" />

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
          <div className="lg:hidden border-t border-purple-500/10 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition ${
                  isActive(link.href)
                    ? 'text-white bg-purple-600/20'
                    : link.highlight
                    ? 'text-purple-400 bg-purple-500/5'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {link.highlight && <Zap className="h-3.5 w-3.5" />}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-zinc-800/50 pt-2 mt-2">
              {dropdownLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-zinc-500 hover:text-white hover:bg-zinc-800/50 rounded-xl transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
