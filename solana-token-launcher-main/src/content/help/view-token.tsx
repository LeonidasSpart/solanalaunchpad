import Link from 'next/link';

export default function ViewingYourTokenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">After Token Creation</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Viewing Your <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Token</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          How to find and view your token on ZRP, Solscan, and in your wallet.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* On ZRP */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">On ZRP</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Token Explorer</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">1</span>
              <div>
                <p className="text-white font-semibold">Go to Token Explorer</p>
                <p className="text-[#BDDBDB] text-sm">Visit <Link href="/tokens" className="text-[#FF2D2D] hover:text-[#B10000] transition">/tokens</Link></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">2</span>
              <div>
                <p className="text-white font-semibold">Find your token</p>
                <p className="text-[#BDDBDB] text-sm">Locate your token in the list</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">3</span>
              <div>
                <p className="text-white font-semibold">View details</p>
                <p className="text-[#BDDBDB] text-sm">Click on it to see full information</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Token Details Page</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">The Token Details page shows you everything about your token:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Name & Symbol</span>
              <span className="text-white text-sm font-medium">Your token's identity</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Mint Address</span>
              <span className="text-white text-sm font-medium">Unique identifier</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Total Supply</span>
              <span className="text-white text-sm font-medium">How many tokens exist</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Decimals</span>
              <span className="text-white text-sm font-medium">How divisible it is</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Creator</span>
              <span className="text-white text-sm font-medium">Who created it</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Created Date</span>
              <span className="text-white text-sm font-medium">When it was created</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center md:col-span-2">
              <span className="text-[#BDDBDB] text-sm">Security Status</span>
              <span className="text-white text-sm font-medium">Which authorities are revoked</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 md:col-span-2 flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Your Balance</span>
              <span className="text-white text-sm font-medium">How many you hold</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Dashboard</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">1</span>
              <div>
                <p className="text-white font-semibold">Click "Dashboard"</p>
                <p className="text-[#BDDBDB] text-sm">Find it in the header navigation</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">2</span>
              <div>
                <p className="text-white font-semibold">View all your tokens</p>
                <p className="text-[#BDDBDB] text-sm">Each token shows name, balance, and actions</p>
              </div>
            </div>
          </div>
        </section>

        {/* On Solscan */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">On Solscan</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">View on Solscan</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">1</span>
              <div>
                <p className="text-white font-semibold">Copy mint address</p>
                <p className="text-[#BDDBDB] text-sm">Get your token's mint address</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">2</span>
              <div>
                <p className="text-white font-semibold">Go to Solscan</p>
                <p className="text-[#BDDBDB] text-sm">Visit <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">solscan.io</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex items-start gap-4">
              <span className="text-[#FF2D2D] font-bold text-lg">3</span>
              <div>
                <p className="text-white font-semibold">Search</p>
                <p className="text-[#BDDBDB] text-sm">Paste the mint address and press Enter</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">What You'll See on Solscan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Overview</span>
              <span className="text-white text-sm font-medium">Name, symbol, supply, decimals</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Holders</span>
              <span className="text-white text-sm font-medium">Who holds the token</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Transactions</span>
              <span className="text-white text-sm font-medium">All activity</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Metadata</span>
              <span className="text-white text-sm font-medium">Your token details</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 md:col-span-2 flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Authority Info</span>
              <span className="text-white text-sm font-medium">Which authorities are revoked</span>
            </div>
          </div>
        </section>

        {/* In Your Wallet */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">In Your Wallet</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Phantom</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Open Phantom</p>
                <p className="text-[#BDDBDB] text-sm">Click the extension or app</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Tokens"</p>
                <p className="text-[#BDDBDB] text-sm">Your token should appear in the list</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Add if not showing</p>
                <p className="text-[#BDDBDB] text-sm">Click "Add Token" and paste the mint address</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Solflare</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Open Solflare</p>
                <p className="text-[#BDDBDB] text-sm">Click the extension or app</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Assets"</p>
                <p className="text-[#BDDBDB] text-sm">Your token should be visible</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Add if not showing</p>
                <p className="text-[#BDDBDB] text-sm">Click "Add Token" and paste the mint address</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Backpack</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Open Backpack</p>
                <p className="text-[#BDDBDB] text-sm">Click the extension or app</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Tokens"</p>
                <p className="text-[#BDDBDB] text-sm">Your token should appear</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Add if not showing</p>
                <p className="text-[#BDDBDB] text-sm">Click "Add Token" and paste the mint address</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Issues</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Token Not Showing in Wallet</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Click <span className="text-white">"Add Token"</span> or <span className="text-white">"Import Token"</span></li>
                  <li>Paste the mint address</li>
                  <li>Confirm</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Wrong Balance Displayed</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Refresh the page</li>
                  <li>Wait for the network to update</li>
                  <li>Check Solscan for accurate balance</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Token Not Found in Explorer</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Make sure you're on the right network</li>
                  <li>Check the mint address for typos</li>
                  <li>Wait a few minutes for the network to update</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/share-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📤 Sharing Your Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to share your token with others</p>
            </Link>
            <Link href="/tokens" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔍 Token Explorer</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Browse all tokens on ZRP</p>
            </Link>
            <Link href="/dashboard" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📊 Dashboard</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Manage all your tokens</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Launch, view, and manage your tokens all in one place.
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
