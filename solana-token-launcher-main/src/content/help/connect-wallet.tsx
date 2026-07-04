import Link from 'next/link';

export default function ConnectingYourWalletPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Wallet & Connection</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Connecting Your <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Wallet</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          To use ZRP, you need to connect a Solana wallet. This guide shows you how.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Supported Wallets */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Supported Wallets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">👻 Phantom</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🔥 Solflare</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🎒 Backpack</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🔐 Ledger</p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Extension</span>
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Mobile</span>
              </div>
            </div>
          </div>
        </section>

        {/* How to Connect */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Connect</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Install a Wallet</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">If you don't have a wallet yet:</p>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to the wallet's website</p>
                <p className="text-[#BDDBDB] text-sm">Visit the official wallet page</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Install the browser extension</p>
                <p className="text-[#BDDBDB] text-sm">Add it to your browser</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Create a new wallet</p>
                <p className="text-[#BDDBDB] text-sm">Follow the setup process</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Save your seed phrase securely</p>
                <p className="text-[#BDDBDB] text-sm">⚠️ Never share it with anyone</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Go to ZRP</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Navigate to ZRP</p>
                <p className="text-[#BDDBDB] text-sm">Visit <a href="https://zrp.one" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">zrp.one</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Find the "Select Wallet" button</p>
                <p className="text-[#BDDBDB] text-sm">Located in the top right corner</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Click "Select Wallet"</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Click the button</p>
                <p className="text-[#BDDBDB] text-sm">A wallet selection menu will appear</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 4: Choose Your Wallet</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Click on your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Select Phantom, Solflare, or Backpack</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Your wallet will open</p>
                <p className="text-[#BDDBDB] text-sm">The extension will pop up</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 5: Approve Connection</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Review the connection request</p>
                <p className="text-[#BDDBDB] text-sm">Check what permissions you're granting</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Connect" or "Approve"</p>
                <p className="text-[#BDDBDB] text-sm">✅ You're now connected!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Connection Status */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Connection Status</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">After connecting, you'll see:</p>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Your wallet address shortened</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Your SOL balance (if available)</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Network (Devnet/Mainnet)</span>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">❌ "No wallet found"</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Make sure your wallet extension is installed</li>
                  <li>Refresh the page</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">❌ Connection fails</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Make sure your wallet is unlocked</li>
                  <li>Check if you're on the right network</li>
                  <li>Clear browser cache</li>
                  <li>Try a different browser</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">❌ Wallet not showing</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Check if wallet extension is enabled</li>
                  <li>Click the extension icon</li>
                  <li>Make sure you're logged in</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Disconnecting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Disconnecting</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">To disconnect your wallet:</p>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Click your wallet address</p>
                <p className="text-[#BDDBDB] text-sm">Located in the top right</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Select "Disconnect" or "Logout"</p>
                <p className="text-[#BDDBDB] text-sm">Your wallet is now disconnected</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/supported-wallets" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">💼 Supported Wallets</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">All wallets that work with ZRP</p>
            </Link>
            <Link href="/help/wallet-security-best-practices" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Wallet Security Best Practices</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Keep your wallet safe</p>
            </Link>
            <Link href="/help/troubleshooting-connection-issues" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
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
