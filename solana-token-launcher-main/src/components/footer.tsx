'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top section: Logo + Tagline */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="ZRP Logo"
              width={40}
              height={40}
              className="rounded-xl"
              priority
            />
            <span className="text-2xl font-bold text-white">ZRP</span>
          </div>
          <p className="text-zinc-500 text-sm text-center md:text-right">
            Premium AI experiences, built for the future.
          </p>
        </div>

        {/* Middle section: Quick Links + Social */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8">
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/airdrop" className="text-zinc-500 hover:text-purple-400 text-sm transition">
                    Airdrop
                  </Link>
                </li>
                <li>
                  <Link href="/create-mint" className="text-zinc-500 hover:text-purple-400 text-sm transition">
                    Create Mint
                  </Link>
                </li>
                <li>
                  <Link href="/tokens" className="text-zinc-500 hover:text-purple-400 text-sm transition">
                    Tokens
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3 text-center md:text-left">Connect With Us</h4>
            <div className="flex justify-center gap-4">
              {/* X (Twitter) */}
              <a
                href="https://x.com/zrp_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition p-2 rounded-lg hover:bg-zinc-800/50"
                aria-label="Follow us on X"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="https://t.me/AIZRP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition p-2 rounded-lg hover:bg-zinc-800/50"
                aria-label="Join us on Telegram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.914.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>

              {/* Discord */}
              <a
                href="https://discord.com/invite/W4qS4xkbn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition p-2 rounded-lg hover:bg-zinc-800/50"
                aria-label="Join us on Discord"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.492a1.5 1.5 0 0 0-1.5-1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h-1.5v-1.5a1.5 1.5 0 0 0-1.5-1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v1.5h-1.5v1.5h1.5v-1.5h1.5v1.5h-1.5v1.5h1.5v1.5h-1.5v1.5h1.5v1.5h1.5v-1.5h1.5v1.5h1.5v-1.5h1.5v-1.5h-1.5v-1.5h1.5v-1.5h-1.5v-1.5h1.5V4.492z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} ZRP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
