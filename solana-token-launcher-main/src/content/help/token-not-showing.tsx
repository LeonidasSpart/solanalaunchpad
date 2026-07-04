import Link from 'next/link';

export default function TokenNotShowingInWalletPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Troubleshooting</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Token Not Showing <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">in Wallet</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Sometimes your token doesn't automatically appear in your wallet. This guide shows you how to add it.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Why Tokens Don't Show */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Tokens Don't Show</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Not auto-detected</span>
              <span className="text-white text-sm font-medium">Wallets don't show all tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">No liquidity</span>
              <span className="text-white text-sm font-medium">Tokens without pools may not show</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Manual add needed</span>
              <span className="text-white text-sm font-medium">Most tokens need manual addition</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wrong network</span>
              <span className="text-white text-sm font-medium">Check Devnet vs Mainnet</span>
            </div>
          </div>
        </section>

        {/* How to Add Token - Phantom */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Add Token</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">👻 Phantom Wallet</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">Step 1: Open Phantom</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Click the Phantom extension</li>
                <li>Make sure you're on the right network</li>
              </ul>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">Step 2: Go to Tokens</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Click <span className="text-white font-medium">"Tokens"</span> tab</li>
                <li>Scroll down</li>
                <li>Click <span className="text-white font-medium">"Add Token"</span></li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h4 className="text-white font-semibold">Step 3: Enter Mint Address</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Paste your token's mint address</li>
                <li>Click <span className="text-white font-medium">"Add"</span></li>
                <li>✅ Token will appear</li>
              </ul>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">🦊 Solflare Wallet</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">Step 1: Open Solflare</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Click the Solflare extension</li>
                <li>Make sure you're on the right network</li>
              </ul>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">Step 2: Go to Assets</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Click <span className="text-white font-medium">"Assets"</span> tab</li>
                <li>Click <span className="text-white font-medium">"Add Token"</span></li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h4 className="text-white font-semibold">Step 3: Enter Mint Address</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Paste your token's mint address</li>
                <li>Click <span className="text-white font-medium">"Add"</span></li>
                <li>✅ Token will appear</li>
              </ul>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">🎒 Backpack Wallet</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">Step 1: Open Backpack</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Click the Backpack extension</li>
                <li>Make sure you're on the right network</li>
              </ul>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h4 className="text-white font-semibold">Step 2: Go to Tokens</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Click <span className="text-white font-medium">"Tokens"</span> tab</li>
                <li>Click <span className="text-white font-medium">"Add Token"</span></li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h4 className="text-white font-semibold">Step 3: Enter Mint Address</h4>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Paste your token's mint address</li>
                <li>Click <span className="text-white font-medium">"Add"</span></li>
                <li>✅ Token will appear</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Finding Your Mint Address */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Finding Your Mint Address</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">On ZRP</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to Token Explorer</p>
                <p className="text-[#BDDBDB] text-sm">Visit <Link href="/tokens" className="text-[#FF2D2D] hover:text-[#B10000] transition">/tokens</Link></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click on your token</p>
                <p className="text-[#BDDBDB] text-sm">Open the token details</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Copy the mint address</p>
                <p className="text-[#BDDBDB] text-sm">Use it to add to your wallet</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">On Solscan</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Open your transaction</p>
                <p className="text-[#BDDBDB] text-sm">Find the transaction on Solscan</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Look for the token mint</p>
                <p className="text-[#BDDBDB] text-sm">Find the mint address in the transaction</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Copy the mint address</p>
                <p className="text-[#BDDBDB] text-sm">Use it to add to your wallet</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Issues</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Token not found on this network.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Check the network (Devnet/Mainnet)</li>
                  <li>Make sure you're on the same network</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Invalid token address.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Check the mint address</li>
                  <li>Make sure it's complete</li>
                  <li>Copy it again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Logo Not Showing</h3>
              <div className="mt-2 space-y-2">
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Logo not loading</span>
                  <span className="text-white text-xs font-medium">Wait for IPFS to propagate</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Wrong logo</span>
                  <span className="text-white text-xs font-medium">Check metadata</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">No logo</span>
                  <span className="text-white text-xs font-medium">Uploaded correctly?</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Fixes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Quick Fixes</h2>

          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔄 Refresh and Retry</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Refresh the page</li>
                <li>Reopen your wallet</li>
                <li>Try again</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🌐 Switch Networks</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Check if you're on Devnet or Mainnet</li>
                <li>Switch to the correct network</li>
                <li>Try adding the token again</li>
              </ul>
            </div>

            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">🔍 Use Solscan</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Go to <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">Solscan</a></li>
                <li>Search your token</li>
                <li>See all details there</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prevention Tips */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Prevention Tips</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">During Creation</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Save your mint address</li>
            <li>✅ Verify on Solscan</li>
            <li>✅ Add to wallet immediately</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">After Creation</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Check Solscan</li>
            <li>✅ Add to wallet</li>
            <li>✅ Share with community</li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/view-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">👀 Viewing Your Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to find and view your token</p>
            </Link>
            <Link href="/help/transaction-failed" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❌ Transaction Failed</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">What to do when transactions fail</p>
            </Link>
            <Link href="/help/share-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📤 Sharing Your Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to share your token with others</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Your token will be ready to view in seconds.
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
