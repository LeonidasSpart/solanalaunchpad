// src/app/pricing/page.tsx
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Pricing Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Cost to Create a <br className="hidden sm:block" />
          <span className="text-purple-400">Solana Token</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Complete pricing breakdown for creating Solana tokens. Understand base fees, optional features, and total costs. Transparent pricing with no hidden fees.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Creating a Solana token costs money, but it's surprisingly affordable. This guide breaks down all costs so you know exactly what you'll pay. No surprises, no hidden fees, just transparent pricing.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">💡 Plan Before You Create</p>
            <p className="text-zinc-400 text-sm mt-1">
              Costs vary based on features you choose. Basic tokens cost less. Feature-rich tokens cost more. Understanding the breakdown helps you budget and choose what's right for your project.
            </p>
          </div>
        </section>

        {/* Base Pricing */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Base Token Creation Cost</h2>
          <p className="mb-2">Every Solana token creation has a base cost covering essential minting and metadata setup.</p>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 text-center mb-4">
            <div className="text-4xl font-bold text-purple-400">0.15 SOL</div>
            <p className="text-zinc-400 text-sm mt-1">Base fee — covers token minting and basic metadata</p>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li>Creating the token mint account</li>
            <li>Setting up basic metadata</li>
            <li>Initial token minting</li>
            <li>Platform service fees</li>
          </ul>
          <p className="text-zinc-500 text-xs mt-2">At current SOL prices (around $100-150), this costs roughly <span className="text-white font-medium">$15-22</span>. This is a one-time fee. No recurring charges or subscriptions.</p>
        </section>

        {/* Optional Features */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Optional Feature Costs</h2>
          <p className="mb-4">Beyond the base fee, you can add optional features. You only pay for what you use.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Authority Revocations: 0.05 SOL Each</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-zinc-400 text-xs">Mint Authority</p>
              <p className="text-purple-400 font-bold text-lg">0.05 SOL</p>
              <p className="text-zinc-500 text-xs">Prevents more tokens being minted</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-zinc-400 text-xs">Freeze Authority</p>
              <p className="text-purple-400 font-bold text-lg">0.05 SOL</p>
              <p className="text-zinc-500 text-xs">Prevents token accounts being frozen</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-zinc-400 text-xs">Update Authority</p>
              <p className="text-purple-400 font-bold text-lg">0.05 SOL</p>
              <p className="text-zinc-500 text-xs">Locks metadata forever</p>
            </div>
          </div>
          <p className="text-zinc-500 text-xs">You can revoke one, two, or all three. Revoking all three costs <span className="text-white font-medium">0.15 SOL</span> extra.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Creator Branding: 0.05 SOL</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li>Creator name and bio</li>
            <li>Social media links (X, Telegram, Discord)</li>
            <li>Website links</li>
            <li>Contact information</li>
          </ul>
        </section>

        {/* Total Cost Examples */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Total Cost Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-center">Basic Token</h3>
              <div className="text-2xl font-bold text-purple-400 text-center">0.15 SOL</div>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-xs">
                <li>Base fee: 0.15 SOL</li>
                <li>No authority revocations</li>
                <li>No creator branding</li>
              </ul>
              <p className="text-zinc-500 text-xs text-center mt-2">~$15-22</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-center">Standard Token</h3>
              <div className="text-2xl font-bold text-purple-400 text-center">0.20 SOL</div>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-xs">
                <li>Base fee: 0.15 SOL</li>
                <li>Creator branding: 0.05 SOL</li>
                <li>No authority revocations</li>
              </ul>
              <p className="text-zinc-500 text-xs text-center mt-2">~$20-30</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-center">Secure Token</h3>
              <div className="text-2xl font-bold text-purple-400 text-center">0.30 SOL</div>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-xs">
                <li>Base fee: 0.15 SOL</li>
                <li>All revocations: 0.15 SOL</li>
                <li>No creator branding</li>
              </ul>
              <p className="text-zinc-500 text-xs text-center mt-2">~$30-45</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold text-center">Premium Token</h3>
              <div className="text-2xl font-bold text-purple-400 text-center">0.35 SOL</div>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-xs">
                <li>Base fee: 0.15 SOL</li>
                <li>All revocations: 0.15 SOL</li>
                <li>Creator branding: 0.05 SOL</li>
              </ul>
              <p className="text-zinc-500 text-xs text-center mt-2">~$35-52</p>
            </div>
          </div>
        </section>

        {/* Additional Costs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Additional Costs to Consider</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Blockchain Transaction Fees</h3>
              <p className="text-zinc-400 text-sm mt-1">Each blockchain transaction costs a small fee. Solana transaction fees are tiny, typically less than <span className="text-white font-medium">0.001 SOL</span> per transaction. Budget a small amount (0.01 SOL) for various transactions.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Wallet Balance</h3>
              <p className="text-zinc-400 text-sm mt-1">You need SOL in your wallet to pay fees. For a basic token, have at least <span className="text-white font-medium">0.2 SOL</span>. For premium tokens, have at least <span className="text-white font-medium">0.5 SOL</span>.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Liquidity Pool Costs (Post-Creation)</h3>
              <p className="text-zinc-400 text-sm mt-1">To enable trading, you'll need to add liquidity to a DEX. This requires providing both your token and SOL. Amounts vary based on your goals.</p>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Cost Comparison: Solana vs Other Blockchains</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 text-center">
              <h3 className="text-white font-bold text-lg">⚡ Solana</h3>
              <div className="text-2xl font-bold text-purple-400">0.15 SOL</div>
              <p className="text-zinc-400 text-sm">~$15-22</p>
              <p className="text-zinc-500 text-xs mt-2">Fast, cheap, and reliable. Best value.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
              <h3 className="text-white font-bold text-lg">🟣 Ethereum</h3>
              <div className="text-2xl font-bold text-red-400">$50-500+</div>
              <p className="text-zinc-400 text-sm">Much more expensive</p>
              <p className="text-zinc-500 text-xs mt-2">Gas fees fluctuate wildly. Slow and expensive.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-center border border-zinc-800">
              <h3 className="text-white font-bold text-lg">🔷 Polygon</h3>
              <div className="text-2xl font-bold text-yellow-400">$1-10</div>
              <p className="text-zinc-400 text-sm">Cheaper than Ethereum</p>
              <p className="text-zinc-500 text-xs mt-2">Less established ecosystem. Solana offers better value.</p>
            </div>
          </div>
          <p className="text-zinc-500 text-xs text-center mt-3">Solana's low fees make it ideal for token creation. Professional results without breaking the bank.</p>
        </section>

        {/* DIY vs Platform */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Cost Comparison: DIY vs Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold text-center">🚀 Platform Creation (ZRP)</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400 text-xs">
                <li>Cost: 0.15 SOL base (~$15-22)</li>
                <li>Time: Minutes to complete</li>
                <li>Technical knowledge: None required</li>
                <li>Maintenance: Minimal</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-center">🛠️ Custom Development (DIY)</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400 text-xs">
                <li>Cost: $5,000-$50,000+</li>
                <li>Time: Weeks to months</li>
                <li>Technical knowledge: Solana development required</li>
                <li>Maintenance: Ongoing development and updates</li>
              </ul>
            </div>
          </div>
          <p className="text-zinc-500 text-xs text-center mt-3">For standard SPL tokens, using a platform offers the best value.</p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How much does it cost to create a Solana token?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                The base cost is <span className="text-white font-medium">0.15 SOL</span>. Optional features like authority revocations or creator branding cost extra. Total costs range from 0.15 SOL to 0.35 SOL depending on features chosen.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Are there any hidden fees?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                No. ZRP shows all fees upfront with no hidden charges. Everything is transparent.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I create a token for free?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                You can test on <span className="text-white font-medium">Devnet for FREE</span>. For mainnet, the minimum cost is 0.15 SOL for basic token creation.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Do I pay monthly or just once?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                You pay once when creating the token. No monthly fees, subscriptions, or recurring charges.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Launch */}
        <section className="text-center border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Test for free on devnet, then launch on mainnet in under 60 seconds.
          </p>
          <Link
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </Link>
        </section>
      </div>
    </div>
  );
}
