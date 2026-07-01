Here's the full README content directly in the chat:
🪙 ZRP — Solana Token Launcher
Create, launch, and manage Solana SPL tokens in under 60 seconds. No coding required. Free devnet testing. Open source and non-custodial.
[](https://img.shields.io/badge/🚀_Live_Site-zrp.one-9945FF?style=for-the-badge https://zrp.one
[](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge https://opensource.org/licenses/MIT
[](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js https://nextjs.org/
[](https://img.shields.io/badge/Solana-Web3.js-9945FF?style=for-the-badge&logo=solana https://solana.com/
[](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript https://www.typescriptlang.org/
----
🌐 Live Demo
🚀 Try it now: https://zrp.one https://zrp.one
----
✨ Features
Feature	Description
🪙 Token Creation	Launch SPL tokens with a simple form — no coding required
🧪 Free Devnet Testing	Test your token for FREE before launching on mainnet
🖼️ IPFS Storage	Upload token images and metadata via NFT.Storage — permanent & decentralized
👛 Wallet Integration	Connect with Phantom, Solflare, Backpack, Torus, and Ledger
🔒 Authority Revocation	Revoke mint, freeze, and update authorities for maximum trust
🎁 Airdrop Tool	Distribute tokens to multiple wallets in one batch
💧 Liquidity Guides	Step-by-step guides for Raydium, Orca, and Jupiter
📊 Token Dashboard	Track all your created tokens in one place
📱 Responsive Design	Works seamlessly on desktop, tablet, and mobile
⚡ Fast & Modern	Built with Next.js 15 and TypeScript
🎨 Beautiful UI	Tailwind CSS with Framer Motion animations
🔓 Non-Custodial	You sign every transaction — we never see your private keys
📖 Open Source	Fully auditable code on GitHub
----
💰 Pricing
Plan	Cost	Includes
Free	$0	Devnet testing, token creation, IPFS storage, social links & branding
Basic	0.15 SOL (~$25)	Mainnet launch, full branding, metadata
Secure	0.60 SOL (~$100)	All authorities revoked, immutable metadata, maximum trust
Each authority revocation adds 0.15 SOL. Network gas fees are covered.
----
🚀 Quick Start
Prerequisites
•  Node.js 18+
•  npm or yarn
•  A Solana wallet (Phantom, Solflare, etc.)
•  NFT.Storage API key
•  Helius RPC URL (for reliable connection)
Installation
# Clone the repository
git clone https://github.com/LeonidasSpart/solanalaunchpad.git
cd solanalaunchpad

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

Environment Variables
Create a .env.local file with:
NEXT_PUBLIC_NFT_STORAGE_API_KEY=your_nft_storage_key
NEXT_PUBLIC_RPC_URL=https://devnet.helius-rpc.com/?api-key=your_helius_key
NEXT_PUBLIC_FEE_RECIPIENT=your_wallet_address

Run Development Server
npm run dev

Open http://localhost:3000 http://localhost:3000 to view the app.
----
📦 Tech Stack
Technology	Purpose
Next.js 15	React framework with App Router
TypeScript	Type safety
Solana Web3.js	Blockchain interaction
NFT.Storage	IPFS uploads
Helius	Reliable RPC connection
Tailwind CSS	Styling
Framer Motion	Animations
----
📁 Project Structure
solanalaunchpad/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── page.tsx             # Landing page
│   │   ├── create-mint/         # Token creation page
│   │   ├── pricing/             # Pricing guide
│   │   ├── faq/                 # FAQ & support
│   │   ├── guide/               # SPL token guide
│   │   ├── revoke/              # Authority revocation
│   │   ├── airdrop/             # Airdrop tool
│   │   ├── add-liquidity/       # Liquidity addition
│   │   ├── burn-lp/             # LP burn tool
│   │   ├── tokens/              # Token explorer
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   ├── blog/                # Blog
│   │   ├── terms/               # Terms of service
│   │   ├── privacy/             # Privacy policy
│   │   └── ...                  # Additional guides & tools
│   ├── components/              # React components
│   │   ├── CreateToken/         # Token creation form
│   │   ├── Collection/          # Token display components
│   │   └── header.tsx           # Navigation with wallet connect
│   ├── lib/                     # Utilities
│   │   ├── create-token.ts      # Token creation logic
│   │   ├── upload.ts            # IPFS upload functions
│   │   └── constants.ts         # Configuration
│   └── providers/               # Wallet providers
├── public/                      # Static assets
│   ├── sitemap.xml              # SEO sitemap
│   ├── robots.txt               # Web crawler rules
│   └── ...                      # Images, logos, favicons
├── .env.local                   # Environment variables
├── package.json                 # Dependencies
└── tsconfig.json               # TypeScript configuration

----
📊 How It Works
Token Creation Flow
1.  Connect Wallet — User connects their Solana wallet (Phantom, Solflare, etc.)
2.  Fill Token Details — Enter name, symbol, description, decimals, and supply
3.  Upload Image — Upload token logo/image to IPFS via NFT.Storage
4.  Configure Authorities — Choose to revoke mint, freeze, and update authorities
5.  Create Token — Submit transaction to create the token on Solana
6.  Confirmation — Token is created and metadata is stored on-chain
Network Support
•  Devnet — Test and experiment with free SOL (completely FREE)
•  Mainnet Beta — Deploy real tokens with real SOL (from 0.15 SOL)
----
🔒 Security Features
•  Revoke Mint Authority — Prevents minting new tokens after creation
•  Revoke Freeze Authority — Prevents freezing token accounts
•  Revoke Update Authority — Makes metadata immutable
•  Wallet Authentication — All transactions require wallet signing
•  Non-Custodial — We never see or store your private keys
----
🗺️ Roadmap
•  [x] •  [x] •  [x] •  [x] •  [x] •  [x] •  [x] •  [x] •  [x] •  [ ] Token staking
•  [ ] Token swap integration
•  [ ] Mobile app
----
🧪 Testing
Get Devnet SOL
Visit https://faucet.solana.com/ https://faucet.solana.com/ to get free devnet SOL for testing.
Create a Test Token
1.  Connect wallet on devnet
2.  Fill in token details
3.  Upload an image
4.  Click "Create & Mint Token"
5.  Approve the transaction in your wallet
6.  Wait for confirmation
----
🤝 Contributing
Contributions are welcome! Please follow these steps:
1.  Fork the repository
2.  Create a feature branch (git checkout -b feature/amazing-feature)
3.  Commit your changes (git commit -m 'Add some amazing feature')
4.  Push to the branch (git push origin feature/amazing-feature)
5.  Open a Pull Request
----
📄 License
This project is licensed under the MIT License — see the LICENSE LICENSE file for details.
----
🙏 Acknowledgments
•  Solana Foundation https://solana.com/ — Blockchain infrastructure
•  Metaplex https://metaplex.com/ — Token metadata standards
•  NFT.Storage https://nft.storage/ — IPFS storage
•  Helius https://helius.xyz/ — RPC infrastructure
•  Vercel https://vercel.com/ — Deployment platform
----
📞 Support
For issues and questions:
•  Open an issue on GitHub Issues https://github.com/LeonidasSpart/solanalaunchpad/issues
•  Check the deployment logs for debugging
•  Contact via GitHub
----
Made with ❤️ by LeonidasSpart https://github.com/LeonidasSpart
[](https://img.shields.io/badge/🚀_Try_It_Now-zrp.one-9945FF?style=for-the-badge https://zrp.one



