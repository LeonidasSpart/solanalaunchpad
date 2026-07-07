'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import NetworkSwitcher from '@/components/NetworkSwitcher';
import { useState } from 'react';
import { Menu, X, Zap, Rocket, ChevronDown, Droplets, Lock, Gift, Flame, Coins, Clock } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  // ─── Main links (including Launchpad) ──────────────────────────────
  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/create-mint', label: 'Create Token', highlight: true },
    { href: '/tokens', label: 'Tokens' },
    { href: '/launchpad', label: 'Launchpad', highlight: true },  // ← NEW
  ];

  // ─── Feature links (Staking & Vesting) ────────────────────────────
  const featureLinks = [
    { href: '/staking', label: 'Staking', icon: <Coins className="h-4 w-4" /> },
    { href: '/vesting', label: 'Vesting', icon: <Clock className="h-4 w-4" /> },
  ];

  const toolsLinks = [
    { href: '/add-liquidity', label: 'Add Liquidity', icon: <Droplets className="h-4 w-4" /> },
    { href: '/revoke', label: 'Revoke Authority', icon: <Lock className="h-4 w-4" /> },
    { href: '/airdrop', label: 'Airdrop', icon: <Gift className="h-4 w-4" /> },
    { href: '/burn-lp', label: 'Burn LP', icon: <Flame className="h-4 w-4" /> },
  ];

  const otherLinks = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-[#FF2D2D]/10">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#FF2D2D]/10 via-[#FF2D2D]/5 to-[#FF2D2D]/10 border-b border-[#FF2D2D]/10">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm">
          <Zap className="h-3.5 w-3.5 text-[#FF2D2D]" />
          <span className="text-[#BDDBDB]">
            <span className="text-[#FF2D2D] font-semibold">Free Devnet Testing</span>
            <span className="text-[#BDDBDB] opacity-50 mx-2">|</span>
            <span className="text-[#BDDBDB] opacity-70">Test with zero cost before mainnet</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="ZRP Logo"
                width={88}
                height={88}
                className="rounded-xl"
                priority
              />
              <div className="absolute inset-0 rounded-xl bg-[#FF2D2D]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    ? 'text-white bg-[#FF2D2D]/20'
                    : link.highlight
                    ? 'text-[#FF2D2D] hover:text-white hover:bg-[#FF2D2D]'
                    : 'text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50'
                }`}
              >
                {link.label}
                {link.highlight && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#FF2D2D] rounded-full animate-pulse" />
                )}
              </Link>
            ))}

            {/* Feature Links (Staking & Vesting) */}
            {featureLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-[#FF2D2D]/20'
                    : 'text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50'
                }`}
              >
                <span className="text-[#FF2D2D]">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                onMouseEnter={() => setIsToolsOpen(true)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50 transition-all duration-200"
              >
                Tools
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isToolsOpen && (
                <div 
                  className="absolute top-full mt-2 left-0 w-56 bg-[#0D0D0D] border border-[#FF2D2D]/20 rounded-xl shadow-2xl shadow-[#FF2D2D]/10 overflow-hidden"
                  onMouseLeave={() => setIsToolsOpen(false)}
                >
                  {toolsLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsToolsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#BDDBDB] hover:text-white hover:bg-[#FF2D2D]/10 transition"
                    >
                      <span className="text-[#FF2D2D]">{link.icon}</span>
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
                    ? 'text-white bg-[#FF2D2D]/20'
                    : 'text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <NetworkSwitcher />
            </div>

            <div className="[&>button]:!bg-gradient-to-r [&>button]:!from-[#FF2D2D] [&>button]:!via-[#1a1a1a] [&>button]:!to-[#BDDBDB] [&>button]:hover:!from-[#B10000] [&>button]:hover:!via-[#0D0D0D] [&>button]:hover:!to-[#9a9a9a] [&>button]:!rounded-xl [&>button]:!px-4 [&>button]:!py-2.5 [&>button]:!font-semibold [&>button]:!text-white [&>button]:!text-sm [&>button]:!transition-all [&>button]:!shadow-lg [&>button]:!shadow-[#FF2D2D]/20">
              <WalletMultiButton />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-[#BDDBDB] hover:text-white p-2 rounded-lg hover:bg-[#1a1a1a]/50 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ─── Mobile Menu ─── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#FF2D2D]/10 py-4 space-y-2">
            <Link
              href="/create-mint"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#FF2D2D] rounded-xl transition"
            >
              <Rocket className="h-4 w-4" />
              Create Your Token
            </Link>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/tokens"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50 rounded-xl transition"
              >
                Tokens
              </Link>
              <Link
                href="/launchpad"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm text-[#FF2D2D] hover:text-white hover:bg-[#FF2D2D]/20 rounded-xl transition"
              >
                Launchpad
              </Link>
            </div>

            {/* Features (Staking & Vesting) */}
            <div className="border-t border-[#1a1a1a] pt-3 mt-2">
              <p className="px-4 text-xs text-[#BDDBDB] opacity-50 uppercase tracking-wider mb-2">Features</p>
              <div className="space-y-1">
                {featureLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50 rounded-xl transition"
                  >
                    <span className="text-[#FF2D2D]">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="border-t border-[#1a1a1a] pt-3">
              <p className="px-4 text-xs text-[#BDDBDB] opacity-50 uppercase tracking-wider mb-2">Tools</p>
              <div className="space-y-1">
                {toolsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50 rounded-xl transition"
                  >
                    <span className="text-[#FF2D2D]">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1a1a1a]">
              <Link
                href="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50 rounded-xl transition"
              >
                FAQ
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center px-4 py-2.5 text-sm text-[#BDDBDB] hover:text-white hover:bg-[#1a1a1a]/50 rounded-xl transition"
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
