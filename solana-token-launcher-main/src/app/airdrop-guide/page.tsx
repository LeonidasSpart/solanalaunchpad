// src/app/airdrop-guide/page.tsx
import Link from 'next/link';

export default function AirdropGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Airdrop Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          How to Airdrop Solana Tokens: <br className="hidden sm:block" />
          <span className="text-purple-400">Complete Distribution Guide</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Learn how to airdrop Solana tokens to multiple wallets. Complete guide covering preparation, execution, and best practices for successful token distributions.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            An airdrop is the distribution of tokens to multiple wallet addresses, typically for free or as a reward. Airdrops are used to build communities, reward early supporters, and distribute tokens fairly. This guide explains how to execute airdrops on Solana.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">⚠️ Plan Before You Start</p>
            <p className="text-zinc-400 text-sm mt-1">
              Airdropping Solana tokens involves sending tokens from your wallet to multiple recipient addresses. While simple in concept, planning and execution matter for successful distributions. This guide covers everything you need to know.
            </p>
          </div>
        </section>

        {/* What is an Airdrop */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What is a Token Airdrop?</h2>
          <p className="mb-4">
            A token airdrop is the distribution of tokens to multiple wallet addresses simultaneously. Airdrops are typically free distributions used to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-3xl mb-1">🏗️</p>
              <p className="text-white font-semibold text-sm">Build Communities</p>
              <p className="text-zinc-500 text-xs">Grow your user base</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-3xl mb-1">🎁</p>
              <p className="text-white font-semibold text-sm">Reward Supporters</p>
              <p className="text-zinc-500 text-xs">Early community members</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-3xl mb-1">📢</p>
              <p className="text-white font-semibold text-sm">Create Awareness</p>
              <p className="text-zinc-500 text-xs">Generate engagement</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-3xl mb-1">⚖️</p>
              <p className="text-white font-semibold text-sm">Fair Distribution</p>
              <p className="text-zinc-500 text-xs">Launch and decentralize</p>
            </div>
          </div>
          <p className="text-zinc-500 text-xs text-center mt-3">Airdrops can be one-time events or ongoing distributions. They're a common way to get tokens into the hands of users and build initial adoption.</p>
        </section>

        {/* Planning Your Airdrop */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Planning Your Airdrop</h2>
          <p className="mb-4">Successful airdrops require planning. Here's what to consider before executing:</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Determine Recipients</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li>All wallet addresses that meet certain criteria</li>
            <li>Early supporters or community members</li>
            <li>Participants in specific activities</li>
            <li>Holders of related tokens or NFTs</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Calculate Amounts</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li>Give everyone the same amount (equal distribution)</li>
            <li>Vary amounts based on criteria (tiered distribution)</li>
            <li>Use formulas based on holdings or participation</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Budget for Fees</h3>
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-3">
            <p className="text-zinc-400 text-sm">
              Each airdrop transaction costs a small SOL fee (typically <span className="text-white font-medium">0.000005 SOL</span> per transaction). For large airdrops, fees add up.
            </p>
            <div className="bg-black/40 rounded-lg p-2 mt-2">
              <p className="text-zinc-400 text-xs">Example: Airdropping to <span className="text-white font-medium">1,000 wallets</span> costs approximately <span className="text-purple-400 font-medium">0.005 SOL</span> in fees.</p>
            </div>
            <p className="text-zinc-500 text-xs mt-1">Always have extra SOL for fees to ensure all transactions complete.</p>
          </div>
        </section>

        {/* How to Execute an Airdrop */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Execute an Airdrop</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">Prepare Your Wallet</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Ensure your wallet has enough tokens to distribute and enough SOL for transaction fees. Check your balances before starting.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">Collect Recipient Addresses</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Gather all Solana wallet addresses that will receive tokens. Verify addresses are correct — sending to wrong addresses means lost tokens.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Choose Your Method</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                For small airdrops, send manually. For larger airdrops, use batch sending tools. <Link href="/airdrop" className="text-purple-400 hover:underline">ZRP's Airdrop Tool</Link> makes batch sending easy.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <h3 className="text-white font-semibold">Send Tokens</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Send tokens to each recipient address. Use batch tools for efficiency. Monitor transactions to ensure they complete successfully.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                <h3 className="text-white font-semibold">Verify Distribution</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Check a few addresses on Solscan to confirm transactions completed. Keep records of all transactions for reference.
              </p>
            </div>
          </div>
        </section>

        {/* Airdrop Tools */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Airdrop Tools and Methods</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Manual Wallet Sending</h3>
              <p className="text-zinc-400 text-sm mt-1">Use your wallet (Phantom, Solflare) to send tokens manually. Works well for small airdrops (under 50 recipients). Simple but time-consuming.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Batch Sending Tools</h3>
              <p className="text-zinc-400 text-sm mt-1">Use tools that send tokens to multiple addresses automatically. <Link href="/airdrop" className="text-purple-400 hover:underline">ZRP's Airdrop Tool</Link> is designed for this — efficient, secure, and easy to use.</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
              <p className="text-purple-300 text-sm font-semibold">🚀 Recommended: Use ZRP's Airdrop Tool</p>
              <p className="text-zinc-400 text-sm mt-1">
                Our <Link href="/airdrop" className="text-purple-400 hover:underline">Airdrop Tool</Link> handles batch sending automatically. Simply enter your token mint, set the amount, paste wallet addresses, and send. No technical knowledge required.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Airdrop Best Practices</h2>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">✅ Verify Addresses</h3>
              <p className="text-zinc-400 text-xs mt-1">Always verify recipient addresses before sending. Double-check addresses, especially when copying from lists or spreadsheets.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">✅ Test First</h3>
              <p className="text-zinc-400 text-xs mt-1">For large airdrops, test with a small batch first. Send to a few addresses to verify the process works correctly.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">✅ Keep Records</h3>
              <p className="text-zinc-400 text-xs mt-1">Maintain records of all airdrop transactions. This helps verify distributions and address issues.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">✅ Communicate Clearly</h3>
              <p className="text-zinc-400 text-xs mt-1">Inform recipients about the airdrop. Explain why they're receiving tokens, how much, and when to expect them.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">✅ Budget for Fees</h3>
              <p className="text-zinc-400 text-xs mt-1">Always have extra SOL for fees. Transaction failures due to insufficient fees can delay or prevent distributions.</p>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Airdrop Mistakes</h2>
          <div className="space-y-3">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Insufficient SOL for Fees</h3>
              <p className="text-zinc-400 text-xs mt-1">Not having enough SOL for transaction fees causes failed transactions. Always calculate fees and ensure you have extra SOL.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Wrong Addresses</h3>
              <p className="text-zinc-400 text-xs mt-1">Sending to incorrect addresses means lost tokens. Always verify addresses before sending.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Not Testing First</h3>
              <p className="text-zinc-400 text-xs mt-1">Executing large airdrops without testing can lead to errors affecting all recipients. Test with a small batch first.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Poor Communication</h3>
              <p className="text-zinc-400 text-xs mt-1">Not informing recipients about airdrops can cause confusion. Clear communication is essential for trust.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How much does it cost to airdrop tokens?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Each airdrop transaction costs a small SOL fee, typically around <span className="text-white font-medium">0.000005 SOL</span> per transaction. For 1,000 recipients, fees total approximately <span className="text-purple-400 font-medium">0.005 SOL</span>.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I airdrop to thousands of wallets?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Yes, using batch sending tools like <Link href="/airdrop" className="text-purple-400 hover:underline">ZRP's Airdrop Tool</Link>. Manual sending to thousands of wallets is impractical. Large airdrops require significant SOL for fees.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Do recipients need to do anything?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                No, recipients don't need to do anything. Tokens are sent directly to their wallet addresses. They may need to add the token to their wallet to see it.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I cancel an airdrop after starting?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Once tokens are sent, transactions cannot be reversed. You can stop sending to remaining recipients, but tokens already sent cannot be recovered. Always verify your airdrop list before starting.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Airdrop */}
        <section className="text-center border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Airdrop Your Tokens?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Use ZRP's Airdrop Tool to send tokens to multiple wallets instantly. No coding required.
          </p>
          <Link
            href="/airdrop"
            className="inline-block mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
          >
            Go to Airdrop Tool
          </Link>
        </section>
      </div>
    </div>
  );
}
