import Link from 'next/link';

export default function FrequentlyAskedQuestionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Account & Support</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Frequently Asked <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Questions</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Quick answers to the most common questions about ZRP.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* General */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">General</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What is ZRP?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">ZRP is a no-code Solana token creation platform that lets anyone create SPL tokens in under 60 seconds.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Is ZRP free to use?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Yes! Devnet testing is completely <span className="text-green-400 font-medium">FREE</span>. Mainnet creation costs 0.15-0.60 SOL.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Do I need to know how to code?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">No. ZRP is completely no-code. Just fill in a form and click create.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What wallets does ZRP support?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Phantom, Solflare, Backpack, and all Solana wallets.</p>
            </div>
          </div>
        </section>

        {/* Token Creation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Token Creation</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How long does token creation take?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Under 60 seconds from wallet confirmation to live token.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How much does it cost?</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                <li><span className="text-white font-medium">Devnet:</span> <span className="text-green-400">FREE</span></li>
                <li><span className="text-white font-medium">Mainnet:</span> 0.15-0.60 SOL</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What is a mint address?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">It's the unique identifier for your token on Solana.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I change my token after creation?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Some aspects are permanent (name, symbol, supply). You can update metadata if Update authority is not revoked.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What are the template options?</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                <li><span className="text-white font-medium">Meme Coin:</span> 1B supply, 6 decimals</li>
                <li><span className="text-white font-medium">Utility Token:</span> 10M supply, 6 decimals</li>
                <li><span className="text-white font-medium">Governance DAO:</span> 100M supply, 6 decimals</li>
                <li><span className="text-white font-medium">Simple Token:</span> 1M supply, 9 decimals</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Security</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What are token authorities?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Special permissions that control your token:</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                <li><span className="text-white font-medium">Mint:</span> Create more tokens</li>
                <li><span className="text-white font-medium">Freeze:</span> Freeze accounts</li>
                <li><span className="text-white font-medium">Update:</span> Change metadata</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Should I revoke authorities?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">For serious projects, yes. It builds trust by proving you can't change the token later.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What happens if I revoke authorities?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">You permanently give up control. You cannot:</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                <li>Mint more tokens</li>
                <li>Freeze accounts</li>
                <li>Update metadata</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Wallet & Transactions */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Wallet & Transactions</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Do you store my private keys?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">No. ZRP is <span className="text-white font-medium">non-custodial</span>. We never see or store your private keys.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Why do I need SOL?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">SOL is needed for:</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                <li>Transaction fees</li>
                <li>Account rent</li>
                <li>Platform fees (Mainnet only)</li>
              </ul>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What if my transaction fails?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Check your SOL balance and try again. Failed transactions don't deduct fees.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What network should I use?</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                <li><span className="text-white font-medium">Devnet:</span> For testing (free)</li>
                <li><span className="text-white font-medium">Mainnet:</span> For real tokens (costs SOL)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* After Creation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">After Creation</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How do I view my token?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Go to the <Link href="/tokens" className="text-[#FF2D2D] hover:text-[#B10000] transition">Token Explorer</Link> and find your token.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How do I share my token?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Use the <span className="text-white font-medium">"Share on X"</span> button after creation.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How do I add liquidity?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Use the <Link href="/add-liquidity" className="text-[#FF2D2D] hover:text-[#B10000] transition">Add Liquidity</Link> tool or go directly to Raydium.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How do I airdrop tokens?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Use the <Link href="/airdrop" className="text-[#FF2D2D] hover:text-[#B10000] transition">Airdrop Tool</Link> to send tokens to multiple wallets.</p>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Why isn't my token showing?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Add it manually to your wallet using the mint address.</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Why did my image upload fail?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Check file size (max 5MB) and format (PNG, JPEG, GIF, WebP).</p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Why is my transaction failing?</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                <li>Check SOL balance</li>
                <li>Check network (Devnet/Mainnet)</li>
                <li>Refresh and try again</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Still Have Questions? */}
        <section>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h2>
            <p className="text-[#BDDBDB] text-sm mb-4">
              <Link href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition font-medium">
                Contact Support
              </Link>
              {' '}and we'll help you out.
            </p>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/what-is-zrp" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❓ What is ZRP?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Learn about the platform</p>
            </Link>
            <Link href="/help/create-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 How to Create a Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Step-by-step token creation guide</p>
            </Link>
            <Link href="/help/token-parameters" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">⚙️ Token Parameters Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Understanding name, symbol, supply, and more</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            No code. No limits. Just your idea — live on Solana in seconds.
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
