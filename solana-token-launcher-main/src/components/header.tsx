'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NetworkSwitcher from '@/components/NetworkSwitcher';
import { useState } from 'react';
import { Menu, X, Zap, Rocket, ChevronDown, Droplets, Lock, Gift } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/create-mint', label: 'Create Token', highlight: true },
    { href: '/tokens', label: 'Tokens' },
  ];

  const toolsLinks = [
    { href: '/add-liquidity', label: 'Add Liquidity', icon: <Droplets className="h-4 w-4" /> },
    { href: '/revoke', label: 'Revoke Authority', icon: <Lock className="h-4 w-4" /> },
    { href: '/airdrop', label: 'Airdrop', icon: <Gift className="h-4 w-4" /> },
  ];

  const otherLinks = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#9945ff]/10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#9945ff]/10 via-[#9945ff]/5 to-[#14f195]/10 border-b border-[#9945ff]/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm">
          <Zap className="h-3.5 w-3.5 text-[#14f195]" />
          <span className="text-zinc-300">
            <span className="text-[#14f195] font-semibold">Free Devnet Testing</span>
            <span className="text-zinc-500 mx-2">|</span>
            <span className="text-zinc-400">Test with zero cost before mainnet</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="ZRP Logo"
                width={38}
                height={38}
                className="rounded-xl"
                priority
              />
              <div className="absolute inset-0 rounded-xl bg-[#9945ff]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#9945ff] transition">ZRP</span>
              <span className="text-[10px] text-zinc-500 -mt-1 tracking-wider uppercase">Token Launcher</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 relative ${
                  isActive(link.href)
                    ? 'text-white bg-[#9945ff]/20'
                    : link.highlight
                    ? 'text-[#9945ff] hover:text-white hover:bg-[#9945ff]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {link.label}
                {link.highlight && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#14f195] rounded-full animate-pulse" />
                )}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                onMouseEnter={() => setIsToolsOpen(true)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
              >
                Tools
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isToolsOpen && (
                <div 
                  className="absolute top-full mt-2 left-0 w-56 bg-[#12121a] border border-[#9945ff]/20 rounded-xl shadow-2xl shadow-[#9945ff]/10 overflow-hidden"
                  onMouseLeave={() => setIsToolsOpen(false)}
                >
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsToolsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-[#9945ff]/10 transition"
                    >
                      <span className="text-[#9945ff]">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {otherLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-[#9945ff]/20'
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
            <div className="hidden sm:block">
              <NetworkSwitcher />
            </div>

            {/* Wallet Button */}
            <WalletMultiButton className="!bg-gradient-to-r !from-[#9945ff] !to-[#7c3aed] hover:!from-[#b279ff] hover:!to-[#9945ff] !rounded-xl !px-4 !py-2.5 !font-semibold !text-white !text-sm transition-all !shadow-lg !shadow-[#9945ff]/20" />

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
          <div className="lg:hidden border-t border-[#9945ff]/10 py-4 space-y-2">
            <Link
              href="/create-mint"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#9945ff] rounded-xl transition"
            >
              <Rocket className="h-4 w-4" />
              Create Your Token
            </Link>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/tokens"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition"
              >
                Tokens
              </Link>
              <Link
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition"
              >
                Pricing
              </Link>
            </div>

            {/* Tools Section Mobile */}
            <div className="border-t border-zinc-800/50 pt-3 mt-2">
              <p className="px-4 text-xs text-zinc-500 uppercase tracking-wider mb-2">Tools</p>
              <div className="space-y-1">
                {toolsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition"
                  >
                    <span className="text-[#9945ff]">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/50">
              <Link
                href="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition"
              >
                FAQ
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
