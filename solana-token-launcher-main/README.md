ZRP — No-Code Solana Token Creator
----
Table of Contents
•  Overview #overview
•  Features #features
•  Tech Stack #tech-stack
•  Quick Start #quick-start
•  Environment Variables #environment-variables
•  Project Structure #project-structure
•  Token Creation Flow #token-creation-flow
•  Pricing #pricing
•  Security #security
•  Deployment #deployment
•  Roadmap #roadmap
•  Contributing #contributing
•  License #license
•  Support #support
----
Overview
ZRP is a production-ready, open-source platform for creating and deploying custom SPL tokens on the Solana blockchain. Built for founders, creators, and developers who want to launch tokens without writing a single line of code.
Key differentiators:
•  Free devnet testing — Experiment with zero cost and zero risk before going live
•  Non-custodial by design — We never see or store your private keys
•  Open source & auditable — Fully transparent codebase
•  Under 60 seconds — From wallet connection to live token on-chain
🔗 Live: https://zrp.one https://zrp.one
----
Features
Core
•  🪙 One-Click Token Creation — Launch SPL tokens via simple form
•  🖼️ IPFS Metadata Storage — Upload token images and metadata via Pinata
•  👛 Wallet Integration — Phantom, Solflare, Backpack, and all Solana wallets
•  🔒 Authority Revocation — Revoke mint, freeze, and update authorities for maximum trust
•  ⚡ Sub-60-Second Minting — Lightning-fast deployment on Solana
•  🧪 Free Devnet Testing — Test tokens with zero cost before mainnet launch
Platform
•  📱 Fully Responsive — Desktop, tablet, and mobile optimized
•  🎨 Modern UI/UX — Tailwind CSS with Framer Motion animations
•  📚 25+ Educational Guides — Tokenomics, marketing, security, DEX listings, and more
•  🔍 Token Explorer — Browse tokens created through the platform
•  🌐 SEO Optimized — Sitemap, structured data, and keyword-rich content
----
Tech Stack
Technology	Purpose
Next.js 15	React framework with App Router
TypeScript	Type safety
Solana Web3.js	Blockchain interaction
Metaplex	Token metadata standards
Pinata	IPFS uploads
Helius	Reliable RPC infrastructure
Tailwind CSS	Styling
Framer Motion	Animations
----
Quick Start
Prerequisites
•  Node.js 18+
•  npm or yarn
•  A Solana wallet (Phantom, Solflare, etc.)
•  Pinata API key
•  Helius RPC URL
Installation
# Clone the repository
git clone https://github.com/LeonidasSpart/solanalaunchpad.git
cd solanalaunchpad

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

Run Development Server
npm run dev

Open http://localhost:3000 http://localhost:3000 to view the app.
----
Environment Variables
Create a .env.local file with the following:
# Pinata API key for IPFS uploads
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key

# Helius RPC URL for reliable Solana connection
NEXT_PUBLIC_RPC_URL=https://devnet.helius-rpc.com/?api-key=your_helius_key

# Wallet address to receive creation fees
NEXT_PUBLIC_FEE_RECIPIENT=your_wallet_address

Note: NEXT_PUBLIC_FEE_RECIPIENT is public by design. The fee amount is hardcoded and verified on-chain to prevent tampering.
----
Project Structure
solanalaunchpad/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page
│   │   ├── create-mint/        # Token creation interface
│   │   ├── pricing/            # Pricing guide
│   │   ├── faq/                # FAQ & support
│   │   ├── guide/              # SPL token guide
│   │   ├── revoke/             # Authority revocation tool
│   │   ├── airdrop/            # Airdrop tool
│   │   ├── add-liquidity/      # Liquidity addition guide
│   │   ├── burn-lp/            # LP burn tool
│   │   ├── tokens/             # Token explorer
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── blog/               # Blog
│   │   ├── terms/              # Terms of service
│   │   ├── privacy/            # Privacy policy
│   │   ├── tokenomics/         # Tokenomics guide
│   │   ├── marketing/          # Marketing guide
│   │   ├── security/           # Security guide
│   │   ├── checklist/          # Launch checklist
│   │   └── ...                 # Additional guides & tools
│   ├── components/             # React components
│   │   ├── CreateToken/        # Token creation form
│   │   ├── Collection/         # Token display components
│   │   └── header.tsx          # Navigation with wallet connect
│   ├── lib/                    # Utilities
│   │   ├── create-token.ts     # Token creation logic
│   │   ├── upload.ts           # IPFS upload functions
│   │   └── constants.ts        # Configuration
│   └── providers/              # Wallet providers
├── public/                     # Static assets
│   ├── sitemap.xml             # SEO sitemap
│   └── robots.txt              # Web crawler rules
├── .env.local                  # Environment variables
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript configuration

----
Token Creation Flow
1.  Connect Wallet — User connects their Solana wallet (Phantom, Solflare, etc.)
2.  Fill Token Details — Enter name, symbol, description, decimals, and supply
3.  Upload Image — Upload token logo to IPFS via Pinata
4.  Configure Authorities — Optionally revoke mint, freeze, and update authorities
5.  Review & Confirm — Transaction is simulated; user approves in wallet
6.  Token Minted — Token is live on-chain in under 60 seconds
Network Support
Network	Purpose	Cost
Devnet	Testing & experimentation	Free
Mainnet Beta	Production deployment	0.15–0.60 SOL
----
Pricing
Plan	Cost	Features
Free	$0	Devnet testing, token creation, IPFS storage, social links & branding
Basic	0.15 SOL (~$25)	Everything in Free + Mainnet launch
Secure	0.60 SOL (~$100)	Everything in Basic + Revoke all authorities + Immutable metadata
Authority revocations (add-on): 0.15 SOL each
•  Revoke Mint Authority — Prevents future token minting
•  Revoke Freeze Authority — Prevents freezing token accounts
•  Revoke Update Authority — Makes metadata immutable
Network gas fees are included in all paid tiers. No subscriptions. No hidden fees.
----
Security
Feature	Description
Non-Custodial	We never see or store private keys. Your wallet, your tokens.
Wallet-Signed	Every transaction is signed directly in your wallet.
Open Source	Fully auditable code. No hidden logic.
Metaplex Standard	SPL-compliant tokens compatible with all Solana wallets & DEXes.
Authority Revocation	Permanently revoke authorities to build holder trust.
IPFS Storage	Decentralized, censorship-resistant metadata via Pinata.
----
Deployment
Deploy on Vercel
[](https://vercel.com/button https://vercel.com/new/clone?repository-url=https://github.com/LeonidasSpart/solanalaunchpad
Deploy on Railway
[](https://railway.app/button.svg https://railway.app/new/template
Manual Deployment
1.  Push code to GitHub
2.  Connect repository to your hosting platform
3.  Add environment variables
4.  Deploy automatically on push
----
Roadmap
•  [x] •  [x] •  [x] •  [x] •  [x] •  [x] •  [ ] Token staking
•  [ ] Token swap integration
•  [ ] Mobile app
•  [ ] Multi-RPC fallback
•  [ ] Advanced tokenomics calculator
----
Contributing
Contributions are welcome! Please follow these steps:
1.  Fork the repository
2.  Create a feature branch: git checkout -b feature/amazing-feature
3.  Commit your changes: git commit -m 'Add some amazing feature'
4.  Push to the branch: git push origin feature/amazing-feature
5.  Open a Pull Request
Please ensure your code follows the existing TypeScript and formatting conventions.
----
License
This project is licensed under the MIT License — see the LICENSE LICENSE file for details.
----
Acknowledgments
•  Solana Foundation https://solana.com/ — Blockchain infrastructure
•  Metaplex https://metaplex.com/ — Token metadata standards
•  Pinata https://www.pinata.cloud/ — IPFS storage
•  Helius https://helius.xyz/ — RPC infrastructure
•  Railway https://railway.app/ — Hosting
•  Vercel https://vercel.com/ — Deployment platform
----
Support
For issues, questions, or feature requests:
•  🐛 Open an issue https://github.com/LeonidasSpart/solanalaunchpad/issues on GitHub
•  📧 Contact via GitHub
----
----
LICENSE
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


