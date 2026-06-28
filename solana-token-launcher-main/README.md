# 🪙 Solana Token Launcher

A modern, user-friendly web application for creating and launching custom tokens on the Solana blockchain. Built with Next.js and the Solana Web3.js library, this tool simplifies the process of token creation, metadata management, and deployment.

## ✨ Features

- **Create Custom Tokens**: Launch your own SPL tokens on Solana with a simple form interface
- **IPFS Integration**: Upload token images and metadata to IPFS via NFT.Storage
- **Wallet Support**: Connect with popular Solana wallets (Phantom, Solflare, etc.)
- **Authority Management**: Option to revoke mint, freeze, and update authorities for enhanced security
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Token Management**: View and manage your created tokens in one place

## 🚀 Live Demo

[View the application](https://solana-token-launcher-production.up.railway.app)

## 📸 Screenshots

![Token Creation Form](/public/screenshot.png)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework for server-side rendering and routing |
| **TypeScript** | Type-safe JavaScript development |
| **Solana Web3.js** | Interact with the Solana blockchain |
| **SPL Token** | Create and manage Solana tokens |
| **NFT.Storage** | Store token images and metadata on IPFS |
| **Firebase** | Backend for storing user token data |
| **Tailwind CSS** | Styling and responsive design |
| **Wallet Adapter** | Connect with multiple Solana wallets |

## 📋 Prerequisites

- Node.js 18+ and npm
- A Solana wallet (Phantom, Solflare, etc.)
- NFT.Storage API key (for IPFS uploads)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/LeonidasSpart/solana-token-launcher.git
cd solana-token-launcher


2. Install Dependencies

```bash
npm install
```

3. Set Up Environment Variables

Create a .env.local file in the root directory:

```env
NEXT_PUBLIC_NFT_STORAGE_API_KEY=your_nft_storage_api_key
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_FEE_RECIPIENT=your_wallet_address
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

5. Build for Production

```bash
npm run build
npm start
```

🌐 Deployment

Deploy on Railway

1. Push your code to GitHub
2. Connect your repository to Railway
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

Deploy on Vercel

https://vercel.com/button

📖 How It Works

Token Creation Flow

1. Connect Wallet: User connects their Solana wallet
2. Fill Token Details: Enter name, symbol, description, decimals, and supply
3. Upload Image: Upload token logo/image to IPFS
4. Configure Authorities: Choose to revoke mint, freeze, and update authorities
5. Create Token: Submit transaction to create the token on Solana
6. Confirmation: Token is created and metadata is stored

Token Metadata

The application uses NFT.Storage to upload token metadata to IPFS, ensuring permanent and decentralized storage for your token information.

🔒 Security Features

· Revoke Mint Authority: Prevents minting new tokens after creation
· Revoke Freeze Authority: Prevents freezing token accounts
· Revoke Update Authority: Makes metadata immutable
· Wallet Authentication: All transactions require wallet signing

📁 Project Structure

```
solana-token-launcher/
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   │   ├── Collection/      # Token display components
│   │   ├── CreateToken/     # Token creation components
│   │   └── ui/              # Reusable UI components
│   ├── config/              # Configuration files
│   ├── lib/                 # Utility functions
│   │   ├── create-token.ts  # Token creation logic
│   │   ├── upload.ts        # IPFS upload functions
│   │   └── constants.ts     # Constants and configurations
│   └── providers/           # Wallet and context providers
├── public/                  # Static assets
├── .env.local               # Environment variables
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

🧪 Testing on Devnet

Before launching on mainnet, test your tokens on Solana Devnet:

1. Set NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
2. Get free devnet SOL from a faucet
3. Create test tokens
4. Verify all features work correctly

🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments

· Solana for the blockchain infrastructure
· Metaplex for token metadata standards
· NFT.Storage for IPFS storage
· Railway for hosting
· Vercel for deployment platform

📞 Support

For issues and questions:

· Open an issue on GitHub Issues
· Check the deployment logs for debugging

---

Made with ❤️ by LeonidasSpart

```

---


