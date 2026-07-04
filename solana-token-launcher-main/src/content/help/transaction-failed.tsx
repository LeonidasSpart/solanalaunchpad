import Link from 'next/link';

export default function TransactionFailedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Troubleshooting</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Transaction <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Failed</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Transaction failures can be frustrating. This guide explains why they happen and how to fix them.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Common Reasons */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Reasons</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">1. Insufficient SOL Balance</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Not enough SOL</span>
              <span className="text-white text-sm font-medium">Add SOL to your wallet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">No fees</span>
              <span className="text-white text-sm font-medium">SOL needed for transaction fees</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Rent not covered</span>
              <span className="text-white text-sm font-medium">Need extra SOL for account rent</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">2. Network Congestion</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Solana network busy</span>
              <span className="text-white text-sm font-medium">Try again later</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">High fees</span>
              <span className="text-white text-sm font-medium">Wait for lower fees</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Timeout</span>
              <span className="text-white text-sm font-medium">Transaction took too long</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">3. Wallet Issues</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wallet locked</span>
              <span className="text-white text-sm font-medium">Unlock your wallet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wrong network</span>
              <span className="text-white text-sm font-medium">Switch to correct network</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wallet needs update</span>
              <span className="text-white text-sm font-medium">Update your wallet</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">4. Token Issues</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Invalid mint address</span>
              <span className="text-white text-sm font-medium">Check the address</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Already exists</span>
              <span className="text-white text-sm font-medium">Token may already be created</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Invalid parameters</span>
              <span className="text-white text-sm font-medium">Check your inputs</span>
            </div>
          </div>
        </section>

        {/* Error Messages */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Error Messages</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Insufficient balance. You need at least X SOL.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Add more SOL to your wallet</li>
                  <li>Check your balance</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Transaction simulation failed. Please check your inputs.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Check your token details</li>
                  <li>Verify the mint address</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Block height exceeded. Transaction may have succeeded.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Check your wallet</li>
                  <li>Check Solscan for the transaction</li>
                  <li>The token may have been created</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: User rejected the transaction.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Approve the transaction in your wallet</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: RPC connection failed.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Refresh the page</li>
                  <li>Try again later</li>
                  <li>Check your internet connection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Fix */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Fix</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Step 1: Check Your Balance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-[#050505]/40 rounded-lg p-3 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB]">Devnet</span>
                  <span className="text-white font-medium">0.05 SOL</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-3 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB]">Mainnet</span>
                  <span className="text-white font-medium">0.2 SOL</span>
                </div>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Step 2: Check Your Network</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Open your wallet</li>
                <li>Check the network (Devnet/Mainnet)</li>
                <li>Match the ZRP network</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Step 3: Refresh and Retry</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Refresh the page</li>
                <li>Reconnect your wallet</li>
                <li>Try again</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Step 4: Check Wallet Connection</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Make sure wallet is unlocked</li>
                <li>Check wallet extension</li>
                <li>Reconnect if needed</li>
              </ul>
            </div>

            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">Step 5: Wait and Try Again</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Wait a few minutes</li>
                <li>Try again</li>
                <li>Solana network may be busy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prevention Tips */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Prevention Tips</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Before Creating a Token</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">SOL balance</span>
              <span className="text-white text-sm font-medium">Need fees and rent</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Correct network</span>
              <span className="text-white text-sm font-medium">Devnet or Mainnet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wallet unlocked</span>
              <span className="text-white text-sm font-medium">Need to approve</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">During Creation</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">All fields filled</span>
              <span className="text-white text-sm font-medium">Complete form</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Valid inputs</span>
              <span className="text-white text-sm font-medium">Correct format</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Ready to approve</span>
              <span className="text-white text-sm font-medium">Wallet ready</span>
            </div>
          </div>
        </section>

        {/* What to Do If It Fails */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Do If It Fails</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Step 1: Check Your Wallet</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li><span className="text-white font-medium">Balance</span> — Do you have enough SOL?</li>
                <li><span className="text-white font-medium">Network</span> — Are you on the right one?</li>
                <li><span className="text-white font-medium">Status</span> — Is your wallet unlocked?</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Step 2: Check ZRP</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Refresh the page</li>
                <li>Reconnect your wallet</li>
                <li>Retry the transaction</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Step 3: Check Solscan</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Search for your transaction</li>
                <li>Look for <code className="text-[#FF2D2D] bg-[#050505] px-1 rounded">mint_address</code> in the transaction</li>
                <li>If found, your token was created</li>
              </ul>
            </div>

            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">Step 4: Contact Support</h3>
              <p className="text-[#BDDBDB] text-sm mt-2">If nothing works:</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                <li><Link href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition">Contact us</Link></li>
                <li>Include:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Error message</li>
                    <li>Steps you took</li>
                    <li>Transaction ID (if any)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/insufficient-sol" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 Insufficient SOL Balance</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">What to do when you need more SOL</p>
            </Link>
            <Link href="/help/rpc-errors" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔌 RPC Connection Errors</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Fix connection issues</p>
            </Link>
            <Link href="/help/token-not-showing" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">👀 Token Not Showing</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Where did your token go?</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            We'll help you succeed. Launch with confidence.
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
