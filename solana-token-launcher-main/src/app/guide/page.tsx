// src/app/guide/page.tsx
export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">SPL Token Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Create an SPL Token: <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Step-by-Step Guide</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          SPL tokens are the standard for digital assets on Solana. This guide covers what they are, what you need, and how to create one — no coding required.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-white font-semibold">🪙 SPL Standard</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-white font-semibold">⚡ 60 Seconds</span>
            <span className="text-[#BDDBDB] ml-2">to Create</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-white font-semibold">💰 0.15 SOL</span>
            <span className="text-[#BDDBDB] ml-2">Starting From</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What Is an SPL Token */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What Is an SPL Token</h2>
          <p>
            An SPL token is any token built on the Solana blockchain using the Solana Program Library (SPL). Think of it as a digital coin that follows a standard set of rules, so it works across all Solana wallets and exchanges.
          </p>
          <p className="mt-3">
            SPL stands for Solana Program Library. It's a collection of on-chain programs that handle different functions, like tokens, NFTs, and staking. The token program defines how tokens are created, owned, and transferred.
          </p>
          <p className="mt-3">
            When you create an SPL token, you're creating a new digital asset on the Solana network. It could be used for a project, a community reward system, a utility token for a website, or even as a joke coin just for fun.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm">
              💡 What makes Solana's SPL tokens appealing is how low the fees are. Transactions cost fractions of a cent, and minting a token doesn't require expensive gas fees like Ethereum.
            </p>
          </div>
        </section>

        {/* Prerequisites */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What You Need Before You Start</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🟣 A Solana Wallet</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                You'll need a wallet that supports the Solana network. The most common one is Phantom, but Solflare and Backpack also work. These wallets let you connect to Solana sites and approve transactions.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🟣 Some SOL (Solana)</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                You'll need a small amount of SOL in your wallet to cover transaction fees. You can buy SOL on most major exchanges and send it to your wallet address. The fees are tiny, but without SOL, the network won't process your transactions.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🟣 A Token Idea</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Decide what your token will represent. Choose a fun name, a symbol (ticker), a total supply, and number of decimals. For example, 6 decimals means the smallest unit is 0.000001 of your token.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🟣 Optional Metadata</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                This includes the description, image, and website for your token. You can always add or update metadata later. If you want your token to look complete on Solscan or in wallets, prepare it now.
              </p>
            </div>
          </div>
        </section>

        {/* 7 Steps */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">7 Steps to Create Your SPL Token</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">Set Up Your Wallet</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Install a Solana wallet like Phantom. Create a new wallet, set a password, and write down your recovery phrase. Never share that phrase with anyone — it's the key to your funds.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">Connect to a Token Creation Platform</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Use a web interface like ZRP that handles all the technical setup for you. Most people prefer this because it's easier and safer. We guide you through the process visually.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Fill in Token Details</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Enter your token's Name, Symbol (ticker), Total Supply, and Decimals. You can also add optional Metadata like an image, website, and description.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <h3 className="text-white font-semibold">Wait for Confirmation</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                After you approve the transaction, the blockchain takes a few seconds to process it. You'll then see your new token's unique mint address. Copy this address to view it on Solscan.io.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                <h3 className="text-white font-semibold">Add the Token to Your Wallet</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Your token won't appear in your wallet automatically. In Phantom, click "Manage Token List," paste the token address, and add it. If you uploaded a logo, it might take a few minutes to appear.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">6</span>
                <h3 className="text-white font-semibold">Revoke Authorities (Optional but Important)</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                To build trust, you can revoke Mint, Freeze, and Update authorities. This proves the supply won't change and the metadata is locked. Learn more on our <a href="/revoke" className="text-[#FF2D2D] hover:text-[#B10000] transition">Revoke Authority page</a>.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">7</span>
                <h3 className="text-white font-semibold">View Your Token on Solscan</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Go to Solscan.io and paste your token's mint address. You'll see all the details — supply, holders, transactions, and metadata. This is how you verify your token was created correctly.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What is an SPL token?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                SPL tokens are the standard token format on Solana blockchain. They're similar to ERC-20 tokens on Ethereum but built for Solana's high-speed, low-cost network. They can represent currencies, assets, utility tokens, or NFTs.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How much does it cost to create an SPL token?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                With ZRP, you can test for FREE on devnet. Mainnet costs start from 0.15 SOL for a basic token. See our <a href="/pricing" className="text-[#FF2D2D] hover:text-[#B10000] transition">Pricing page</a> for complete details.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Do I need coding skills to create an SPL token?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                No! No-code platforms like ZRP handle all the technical work. You just fill in a form with your token details, connect your wallet, and confirm the transaction. No coding required.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I change my token after creation?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Some aspects are permanent (name, symbol, total supply). However, you can update metadata if you keep the Update authority. Plan carefully before creating, as many changes are permanent.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Launch */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Create your SPL token in minutes — no coding required. Connect your wallet, set your token details, and your token is live on Solana mainnet in under 2 minutes.
          </p>
          <a
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </a>
        </section>
      </div>
    </div>
  );
}
