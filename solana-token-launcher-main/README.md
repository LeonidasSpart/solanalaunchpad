# ZRP — No-Code Solana Token Creator

<p align="center">
  <a href="https://zrp.one">
    <img src="https://img.shields.io/badge/🔗_Live_Demo-zrp.one-FF2D2D?style=for-the-badge&logo=solana&logoColor=white" alt="Live Demo">
  </a>
  <a href="https://github.com/LeonidasSpart/solanalaunchpad/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
  </a>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white" alt="Solana">
</p>

<p align="center">
  <b>Create, test, and launch SPL tokens on Solana in under 60 seconds — no coding required.</b>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Pages & Routes](#pages--routes)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Token Creation Flow](#token-creation-flow)
- [Pricing](#pricing)
- [Security](#security)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Overview

ZRP is a production-ready, open-source platform for creating and deploying custom SPL tokens on the Solana blockchain. Built for founders, creators, and developers who want to launch tokens without writing a single line of code.

**Key differentiators:**
- **Free devnet testing** — Experiment with zero cost and zero risk before going live
- **Non-custodial by design** — We never see or store your private keys
- **Open source & auditable** — Fully transparent codebase
- **Under 60 seconds** — From wallet connection to live token on-chain

🔗 **Live:** [https://zrp.one](https://zrp.one)

---

## Features

### Core
- 🪙 **One-Click Token Creation** — Launch SPL tokens via simple form
- 🖼️ **IPFS Metadata Storage** — Upload token images and metadata via Pinata
- 👛 **Wallet Integration** — Phantom, Solflare, Backpack, and all Solana wallets
- 🔒 **Authority Revocation** — Revoke mint, freeze, and update authorities
- ⚡ **Sub-60-Second Minting** — Lightning-fast deployment on Solana
- 🧪 **Free Devnet Testing** — Test tokens with zero cost before mainnet launch

### Platform
- 📱 **Fully Responsive** — Desktop, tablet, and mobile optimized
- 🎨 **Modern UI/UX** — Tailwind CSS with Framer Motion animations
- 📚 **35+ Educational Articles** — Help Center with searchable categories
- 🔍 **Token Explorer** — Browse tokens created through the platform
- 📊 **Token Analytics Dashboard** — Real-time price, holders, volume, and liquidity
- 🌐 **SEO Optimized** — Sitemap, structured data, and keyword-rich content
- 📈 **Revenue Tracking** — Admin dashboard with real-time SOL revenue metrics

### Growth & Community
- 🤝 **Affiliate Program** — Earn 15% commission on every token created by referrals
- 📊 **Affiliate Analytics** — Track clicks, sign-ups, conversions, and conversion rates
- 🏆 **Leaderboard & Milestones** — Gamified referral system with bonus rewards
- 📋 **Interactive Launch Checklist** — Track progress with checkboxes, countdown timer, and shareable progress

### DeFi & Token Management
- 🔐 **Token Vesting** — Lock tokens with cliff and vesting periods for team, advisors, and investors
- 📖 **Vesting Guide** — Comprehensive educational resource covering vesting concepts, red flags, and best practices
- 💰 **Token Staking** — Stake tokens to earn rewards with configurable APY
- 📖 **Staking Guide** — Complete guide to staking, rewards, risks, and best practices
- 🪙 **Burn LP Tokens** — Permanently lock liquidity by burning LP tokens
- 📦 **Airdrop Tool** — Distribute tokens to multiple wallets with recipient limits

### Admin & Monitoring
- 🛡️ **Admin Dashboard** — Secure admin panel with real-time PostgreSQL data
- 🔐 **Admin Security** — bcrypt password hashing, JWT authentication, rate limiting
- 📊 **System Status Page** — Monitor 11+ services (Database, Helius, Solana, Pinata, Resend, wallets, DEX APIs)
- 📧 **Contact Form** — Working email integration via Resend

---

## Pages & Routes

### 🏠 Core Pages
| Page | Route |
|------|-------|
| Home | `/` |
| Create Token | `/create-mint` |
| Tokens | `/tokens` |
| Token Details | `/tokens/[mintAddress]` |
| Token Analytics | `/analytics/[mintAddress]` |
| Pricing | `/pricing` |
| FAQ | `/faq` |
| About | `/about` |
| Contact | `/contact` |
| Privacy | `/privacy` |
| Terms | `/terms` |
| Blog | `/blog` |

### 🛠️ Token Management Tools
| Page | Route |
|------|-------|
| Revoke Authority | `/revoke` |
| Airdrop | `/airdrop` |
| Add Liquidity | `/add-liquidity` |
| Burn LP | `/burn-lp` |
| Airdrop Guide | `/airdrop-guide` |
| Distribution Guide | `/distribution` |
| Liquidity Guide | `/liquidity-guide` |
| DEX Comparison | `/dex-comparison` |
| List Token on DEX | `/list-token-dex` |
| Meme vs Utility | `/meme-vs-utility` |
| No-Code Creator Guide | `/no-code-creator` |
| Why ZRP | `/why-zrp` |
| Tokenomics Calculator | `/tokenomics-calculator` |

### 📚 Educational Guides
| Page | Route |
|------|-------|
| Tokenomics Guide | `/tokenomics` |
| Marketing Guide | `/marketing` |
| Security Guide | `/security` |
| Launch Checklist | `/checklist` |
| Create Token Guide | `/create-token-guide` |
| Devnet vs Mainnet | `/devnet-vs-mainnet` |
| Community Guidelines | `/community-guidelines` |
| Feature Requests | `/feature-requests` |
| Report Bug | `/report-bug` |
| Contact Support | `/contact-support` |
| Browser Compatibility | `/browser-compatibility` |
| Transaction Signing | `/transaction-signing` |
| Transaction Failed | `/transaction-failed` |
| Insufficient SOL | `/insufficient-sol` |
| RPC Errors | `/rpc-errors` |
| Token Not Showing | `/token-not-showing` |
| Image Upload Issue | `/image-upload-issue` |
| Rug Pull Prevention | `/rug-pull` |
| Security Checklist | `/security-checklist` |
| Reporting Suspicious | `/report-suspicious` |
| Revoke After Creation | `/revoke-after` |
| Supported Wallets | `/supported-wallets` |
| Templates | `/templates` |
| Token Authorities | `/token-authorities` |
| Token Parameters | `/token-parameters` |
| Upload Images | `/upload-images` |
| View Token | `/view-token` |
| Share Token | `/share-token` |
| Adding Liquidity | `/adding-liquidity` |
| Wallet Security | `/wallet-security` |
| What is ZRP? | `/what-is-zrp` |
| Glossary | `/glossary` |

### 🔐 DeFi & Token Management
| Page | Route |
|------|-------|
| Vesting Dashboard | `/vesting` |
| Create Vesting Schedule | `/vesting/create` |
| Vesting Details | `/vesting/[contractId]` |
| Vesting Guide | `/vesting-guide` |
| Staking Dashboard | `/staking` |
| Staking Guide | `/staking-guide` |
| Stake Tokens | `/staking/[mintAddress]` |

### 👥 Affiliate Program
| Page | Route |
|------|-------|
| Affiliate Dashboard | `/affiliate` (or `/affiliates`) |
| Referral Landing | `/ref/[wallet]` |
| Affiliate Info | `/affiliate-info` |

### 📊 Monitoring & Admin
| Page | Route |
|------|-------|
| Status Page | `/status` |
| Admin Login | `/admin/login` |
| Admin Dashboard | `/admin/dashboard` |

### ❓ Help Center
| Page | Route |
|------|-------|
| Help Center Index | `/help` |
| All Help Articles (35+) | `/help/[slug]` |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/) | Blockchain interaction |
| [Metaplex](https://metaplex.com/) | Token metadata standards |
| [Pinata](https://app.pinata.cloud) | IPFS uploads |
| [Helius](https://helius.xyz/) | Reliable RPC infrastructure |
| [PostgreSQL](https://www.postgresql.org/) | Database for users, tokens, referrals, vesting, and staking |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Resend](https://resend.com/) | Email delivery |
| [Jupiter API](https://jup.ag/) | Token price and swap data |
| [Raydium API](https://raydium.io/) | Liquidity and price data |

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)
- PostgreSQL database (Railway, Neon, or self-hosted)
- Helius RPC URL
- Pinata API key
- Resend API key (for contact form)

### Installation

```bash
# Clone the repository
git clone https://github.com/LeonidasSpart/solanalaunchpad.git
cd solanalaunchpad

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

---

Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Admin
ADMIN_EMAIL=admin@yourpage.com
ADMIN_PASSWORD_HASH=bcrypt_hash_here
JWT_SECRET=your_jwt_secret_key

# APIs
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_key
PINATA_JWT=your_pinata_jwt
RESEND_API_KEY=your_resend_key

# RPC
RPC_URL_MAINNET=https://mainnet.helius-rpc.com/
RPC_URL_DEVNET=https://devnet.helius-rpc.com/

# Platform Wallet (for vesting & staking)
PLATFORM_PUBLIC_KEY=your_platform_wallet_public_key
PLATFORM_PRIVATE_KEY=your_platform_wallet_private_key_base64

# Limits
MAX_AIRDROP_RECIPIENTS=100

# Optional
NEXT_PUBLIC_FEE_RECIPIENT=wallet_address_for_fees
```

Note: All NEXT_PUBLIC_* variables are exposed to the browser. Keep sensitive keys (PLATFORM_PRIVATE_KEY) in server-side variables only.

---

Project Structure

```
solanalaunchpad/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Landing page
│   │   ├── create-mint/                  # Token creation
│   │   ├── pricing/                      # Pricing
│   │   ├── faq/                          # FAQ
│   │   ├── about/                        # About
│   │   ├── contact/                      # Contact
│   │   ├── privacy/                      # Privacy policy
│   │   ├── terms/                        # Terms of service
│   │   ├── blog/                         # Blog
│   │   ├── tokenomics/                   # Tokenomics guide
│   │   ├── marketing/                    # Marketing guide
│   │   ├── security/                     # Security guide
│   │   ├── revoke/                       # Authority revocation
│   │   ├── airdrop/                      # Airdrop tool
│   │   ├── add-liquidity/                # Add liquidity guide
│   │   ├── burn-lp/                      # Burn LP
│   │   ├── tokens/                       # Token explorer
│   │   ├── analytics/                    # Token analytics
│   │   ├── vesting/                      # Vesting dashboard
│   │   ├── vesting-guide/                # Vesting guide
│   │   ├── staking/                      # Staking dashboard
│   │   ├── staking-guide/                # Staking guide
│   │   ├── affiliate/                    # Affiliate dashboard
│   │   ├── affiliates/                   # Affiliate (redirect)
│   │   ├── ref/                          # Referral landing
│   │   ├── checklist/                    # Launch checklist
│   │   ├── status/                       # Status page
│   │   ├── admin/                        # Admin panel
│   │   ├── help/                         # Help Center
│   │   ├── create-token-guide/           # Create token guide
│   │   ├── devnet-vs-mainnet/            # Network comparison
│   │   ├── community-guidelines/         # Community rules
│   │   ├── feature-requests/             # Feature requests
│   │   ├── report-bug/                   # Bug reporting
│   │   ├── contact-support/              # Support contact
│   │   ├── browser-compatibility/        # Browser support
│   │   ├── transaction-signing/          # Transaction signing
│   │   ├── transaction-failed/           # Transaction troubleshooting
│   │   ├── insufficient-sol/             # SOL balance issues
│   │   ├── rpc-errors/                   # RPC errors
│   │   ├── token-not-showing/            # Wallet display issues
│   │   ├── image-upload-issue/           # Image upload troubleshooting
│   │   ├── rug-pull/                     # Rug pull prevention
│   │   ├── security-checklist/           # Security checklist
│   │   ├── report-suspicious/            # Report suspicious activity
│   │   ├── revoke-after/                 # Revoke after creation
│   │   ├── supported-wallets/            # Wallet compatibility
│   │   ├── templates/                    # Token templates
│   │   ├── token-authorities/            # Authority guide
│   │   ├── token-parameters/             # Token parameters
│   │   ├── upload-images/                # IPFS upload guide
│   │   ├── view-token/                   # View your token
│   │   ├── share-token/                  # Share your token
│   │   ├── adding-liquidity/             # Liquidity guide
│   │   ├── wallet-security/              # Wallet security
│   │   ├── what-is-zrp/                  # Platform overview
│   │   └── glossary/                     # Crypto glossary
│   ├── components/                       # React components
│   │   ├── CreateToken/                  # Token creation form
│   │   ├── Collection/                   # Token display
│   │   ├── Home/                         # Homepage sections
│   │   └── header.tsx                    # Navigation with wallet connect
│   ├── lib/                              # Utilities
│   │   ├── create-token.ts               # Token creation logic
│   │   ├── upload.ts                     # IPFS upload functions
│   │   ├── db.ts                         # PostgreSQL connection
│   │   ├── vesting.ts                    # Vesting logic
│   │   ├── staking.ts                    # Staking logic
│   │   ├── validate-url.ts               # URL sanitization
│   │   └── constants.ts                  # Configuration
│   ├── providers/                        # Wallet providers
│   └── content/                          # Help Center articles
│       └── help/                         # 35+ TSX articles
├── public/                               # Static assets
│   ├── sitemap.xml
│   └── robots.txt
├── .env.local
├── package.json
└── tsconfig.json
```

---

Database Schema

Table Purpose
tokens Token metadata and creation records
referrals Referral tracking and commission
referral_stats Aggregated referral statistics
referral_events Analytics events (clicks, sign-ups, conversions)
vesting_contracts Vesting schedules and settings
vesting_releases Individual token release records
staking_pools Staking pool configurations
staking_positions User staking positions
staking_transactions Staking history

---

Token Creation Flow

1. Connect Wallet — User connects their Solana wallet
2. Fill Token Details — Enter name, symbol, description, decimals, supply
3. Upload Image — Upload token logo to IPFS via Pinata
4. Configure Authorities — Optionally revoke mint, freeze, and update authorities
5. Review & Confirm — Transaction is simulated; user approves in wallet
6. Token Minted — Token is live on-chain in under 60 seconds

Network Support

Network Purpose Cost
Devnet Testing & experimentation Free
Mainnet Beta Production deployment 0.15–0.60 SOL

---

Pricing

Plan Cost Features
Free $0 Devnet testing, token creation, IPFS storage, social links & branding
Basic 0.15 SOL (~$25) Everything in Free + Mainnet launch
Secure 0.60 SOL (~$100) Everything in Basic + Revoke all authorities + Immutable metadata

Authority revocations (add-on): 0.15 SOL each

· Revoke Mint Authority — Prevents future token minting
· Revoke Freeze Authority — Prevents freezing token accounts
· Revoke Update Authority — Makes metadata immutable

---

Security

Feature Description
Non-Custodial We never see or store private keys.
Wallet-Signed Every transaction is signed directly in your wallet.
Open Source Fully auditable code. No hidden logic.
Metaplex Standard SPL-compliant tokens compatible with all Solana wallets & DEXes.
Authority Revocation Permanently revoke authorities to build holder trust.
IPFS Storage Decentralized, censorship-resistant metadata via Pinata.
Admin Security bcrypt password hashing, JWT authentication, rate limiting.
URL Validation Sanitized social links to prevent XSS and phishing.

---

Deployment

Deploy on Vercel

https://vercel.com/button

Deploy on Railway

https://railway.app/button.svg

Manual Deployment

1. Push code to GitHub
2. Connect repository to your hosting platform
3. Add environment variables
4. Deploy automatically on push

---

Roadmap

· Token creation
· IPFS image upload
· Wallet integration
· Authority revocation
· Token airdrop feature
· Token explorer
· Token analytics dashboard
· Affiliate program with analytics
· Interactive launch checklist
· Token vesting (cliff + duration + frequency)
· Token staking (APY + lock period)
· System status page
· Admin dashboard with real-time data
· Revenue tracking
· 35+ educational articles
· Vesting & staking guides
· Help Center with search
· Mobile app (PWA)
· Token swap integration
· Multi-RPC fallback
· Advanced tokenomics calculator

---

Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit your changes: git commit -m 'Add some amazing feature'
4. Push to the branch: git push origin feature/amazing-feature
5. Open a Pull Request

Please ensure your code follows the existing TypeScript and formatting conventions.

---

License

This project is licensed under the MIT License — see the LICENSE file for details.

---

Acknowledgments

· Solana Foundation — Blockchain infrastructure
· Metaplex — Token metadata standards
· Pinata — IPFS storage
· Helius — RPC infrastructure
· Jupiter — Token price data
· Resend — Email delivery
· Railway — Hosting
· Vercel — Deployment platform

---

Support

For issues, questions, or feature requests:

· 🐛 Open an issue on GitHub
· 📧 Contact via GitHub
· 💬 Join our community on Discord

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/LeonidasSpart">LeonidasSpart</a>
</p><p align="center">
  <a href="https://zrp.one">🚀 Try it now at zrp.one</a>
</p>---

License

MIT License

Copyright (c) 2026 LeonidasSpart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```
```
