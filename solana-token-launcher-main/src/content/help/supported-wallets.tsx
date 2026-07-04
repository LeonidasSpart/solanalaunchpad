import Link from 'next/link';

export default function SupportedWalletsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Getting Started</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Supported <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Wallets</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          ZRP supports all major Solana wallets. Here's everything you need to know about connecting your wallet.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Supported Wallets */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Supported Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🦊 Phantom</p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🔥 Solflare</p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🎒 Backpack</p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🔐 Ledger</p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center md:col-span-2 lg:col-span-1">
              <p className="text-white font-semibold text-lg">🔑 Torus</p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
          </div>
        </section>

        {/* How to Connect Your Wallet */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Connect Your Wallet</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">🦊 Phantom Wallet</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Install the Phantom extension</p>
                <p className="text-[#BDDBDB] text-sm">From <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">phantom.app</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Create or import a wallet</p>
                <p className="text-[#BDDBDB] text-sm">Set up a new wallet or import an existing one</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Navigate to ZRP</p>
                <p className="text-[#BDDBDB] text-sm">Visit <a href="https://zrp.one" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">zrp.one</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Select Wallet"</p>
                <p className="text-[#BDDBDB] text-sm">Located in the top right corner</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">5</span>
              <div>
                <p className="text-white text-sm font-medium">Select Phantom</p>
                <p className="text-[#BDDBDB] text-sm">Choose Phantom from the list</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">6</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the connection</p>
                <p className="text-[#BDDBDB] text-sm">✅ You're now connected!</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">🔥 Solflare Wallet</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Install the Solflare extension</p>
                <p className="text-[#BDDBDB] text-sm">From <a href="https://solflare.com" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">solflare.com</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Create or import a wallet</p>
                <p className="text-[#BDDBDB] text-sm">Set up a new wallet or import an existing one</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Navigate to ZRP</p>
                <p className="text-[#BDDBDB] text-sm">Visit <a href="https://zrp.one" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">zrp.one</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Select Wallet"</p>
                <p className="text-[#BDDBDB] text-sm">Located in the top right corner</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">5</span>
              <div>
                <p className="text-white text-sm font-medium">Select Solflare</p>
                <p className="text-[#BDDBDB] text-sm">Choose Solflare from the list</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">6</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the connection</p>
                <p className="text-[#BDDBDB] text-sm">✅ You're now connected!</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">🎒 Backpack Wallet</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Install the Backpack extension</p>
                <p className="text-[#BDDBDB] text-sm">From <a href="https://backpack.app" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">backpack.app</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Create or import a wallet</p>
                <p className="text-[#BDDBDB] text-sm">Set up a new wallet or import an existing one</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Navigate to ZRP</p>
                <p className="text-[#BDDBDB] text-sm">Visit <a href="https://zrp.one" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">zrp.one</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Select Wallet"</p>
                <p className="text-[#BDDBDB] text-sm">Located in the top right corner</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">5</span>
              <div>
                <p className="text-white text-sm font-medium">Select Backpack</p>
                <p className="text-[#BDDBDB] text-sm">Choose Backpack from the list</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">6</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the connection</p>
                <p className="text-[#BDDBDB] text-sm">✅ You're now connected!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Need SOL? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Need SOL?</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            You'll need a small amount of SOL to cover transaction fees. You can get SOL from:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🏦 Centralized Exchanges</p>
              <p className="text-[#BDDBDB] text-sm mt-1">
                <a href="https://www.coinbase.com/" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">Coinbase</a>, Binance, Kraken
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🧪 Solana Faucet</p>
              <p className="text-[#BDDBDB] text-sm mt-1">
                <a href="https://faucet.solana.com/" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">faucet.solana.com</a> for Devnet testing
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] md:col-span-2">
              <p className="text-white font-semibold">🔄 Jupiter</p>
              <p className="text-[#BDDBDB] text-sm mt-1">
                <a href="https://jup.ag/" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">jup.ag</a> for swapping
              </p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Troubleshooting</h2>
          <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
            <h3 className="text-white font-semibold">Wallet not connecting?</h3>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
              <li>Refreshing the page</li>
              <li>Clearing your browser cache</li>
              <li>Making sure you're on the correct network (Devnet/Mainnet)</li>
              <li>Checking if your wallet is unlocked</li>
              <li>Updating your wallet to the latest version</li>
            </ul>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/connect-wallet" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔗 Connecting Your Wallet</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Step-by-step connection guide</p>
            </Link>
            <Link href="/help/wallet-security" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Wallet Security Best Practices</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Keep your wallet safe</p>
            </Link>
            <Link href="/help/connection-issues" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔧 Troubleshooting Connection Issues</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Fix common connection problems</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Connect your wallet and go live in seconds.
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
