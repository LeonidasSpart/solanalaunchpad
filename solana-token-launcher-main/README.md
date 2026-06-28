```markdown
# 🪙 Solana Token Launcher

A production-ready web application for creating and deploying custom tokens on the Solana blockchain with IPFS metadata storage.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Railway-0B0D0E?style=for-the-badge&logo=railway)](https://solanalaunchpad-production.up.railway.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Solana](https://img.shields.io/badge/Solana-Web3.js-9945FF?style=for-the-badge&logo=solana)](https://solana.com/)

---

## 🌐 Live Demo

**🚀 Try it now:** [https://solanalaunchpad-production.up.railway.app/](https://solanalaunchpad-production.up.railway.app/)

---

## ✨ Features

- 🪙 **Create Custom Tokens** – Launch SPL tokens with a simple form
- 🖼️ **IPFS Storage** – Upload token images and metadata via NFT.Storage
- 👛 **Wallet Integration** – Connect with Phantom, Solflare, and more
- 🔒 **Security Options** – Revoke mint, freeze, and update authorities
- 📱 **Responsive** – Works on desktop, tablet, and mobile
- ⚡ **Fast & Modern** – Built with Next.js 15 and TypeScript
- 🎨 **Beautiful UI** – Tailwind CSS with animations
- 🚀 **Live & Functional** – Fully deployed and ready to use

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)
- NFT.Storage API key
- Helius RPC URL (for reliable connection)

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

Environment Variables

Create a .env.local file with:

```env
NEXT_PUBLIC_NFT_STORAGE_API_KEY=your_nft_storage_key
NEXT_PUBLIC_RPC_URL=https://devnet.helius-rpc.com/?api-key=your_helius_key
NEXT_PUBLIC_FEE_RECIPIENT=your_wallet_address
```

Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

---

📦 Tech Stack

Technology Purpose
Next.js 15 React framework
TypeScript Type safety
Solana Web3.js Blockchain interaction
NFT.Storage IPFS uploads
Helius RPC Reliable blockchain connection
Tailwind CSS Styling
Framer Motion Animations

---

📁 Project Structure

```
solanalaunchpad/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # Landing page
│   │   ├── create-mint/     # Token creation page
│   │   └── tokens/          # Token display page
│   ├── components/          # React components
│   │   ├── CreateToken/     # Token creation form
│   │   ├── Collection/      # Token display components
│   │   └── header.tsx       # Navigation with wallet connect
│   ├── lib/                 # Utilities
│   │   ├── create-token.ts  # Token creation logic
│   │   ├── upload.ts        # IPFS upload functions
│   │   └── constants.ts     # Configuration
│   └── providers/           # Wallet providers
├── public/                  # Static assets
├── .env.local               # Environment variables
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

---

🔧 Deployment

Deploy on Railway

https://railway.app/button.svg

1. Push code to GitHub
2. Connect repository on Railway
3. Add environment variables
4. Deploy automatically on push

Deploy on Vercel

https://vercel.com/button

---

📊 How It Works

Token Creation Flow

1. Connect Wallet – User connects their Solana wallet
2. Fill Token Details – Enter name, symbol, description, decimals, and supply
3. Upload Image – Upload token logo/image to IPFS via NFT.Storage
4. Configure Authorities – Choose to revoke mint, freeze, and update authorities
5. Create Token – Submit transaction to create the token on Solana
6. Confirmation – Token is created and metadata is stored on-chain

Network Support

· Devnet – Test and experiment with free SOL
· Mainnet Beta – Deploy real tokens with real SOL

---

🔒 Security Features

· Revoke Mint Authority – Prevents minting new tokens after creation
· Revoke Freeze Authority – Prevents freezing token accounts
· Revoke Update Authority – Makes metadata immutable
· Wallet Authentication – All transactions require wallet signing

---

🧪 Testing

Get Devnet SOL

```bash
# Use the Solana faucet
https://faucet.solana.com/
```

Create a Test Token

1. Connect wallet on devnet
2. Fill in token details
3. Upload an image
4. Click "Create & Mint Token"
5. Approve the transaction in your wallet
6. Wait for confirmation

---

🗺️ Roadmap

· Token creation
· IPFS image upload
· Wallet integration
· Authority revocation
· Token airdrop feature
· Token staking
· Token swap integration
· Mobile app

---

🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

---

📄 License

This project is licensed under the MIT License – see the LICENSE file for details.

---

🙏 Acknowledgments

· Solana Foundation – Blockchain infrastructure
· Metaplex – Token metadata standards
· NFT.Storage – IPFS storage
· Helius – RPC infrastructure
· Railway – Hosting
· Vercel – Deployment platform

---

📞 Support

For issues and questions:

· Open an issue on GitHub Issues
· Check the deployment logs for debugging
· Contact via GitHub

---

Made with ❤️ by LeonidasSpart

📊 Live Demo

https://img.shields.io/badge/🚀_Try_It_Now-Click_Here-9945FF?style=for-the-badge

