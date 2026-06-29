// src/app/why-zrp/page.tsx
import Link from 'next/link';

export default function WhyZRPPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Why ZRP</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          The Smartest Way to <br className="hidden sm:block" />
          <span className="text-purple-400">Launch Solana Tokens</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          See why creators choose ZRP for launching their Solana tokens. Compare features, pricing, and the complete end-to-end flow.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Most no-code Solana token creators handle the mint. ZRP goes further — it's designed to take you from idea to tradeable token in one session, without jumping between tools. Here's what makes ZRP different.
          </p>
        </section>

        {/* Feature Comparison Table */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-zinc-700">
                  <th className="text-left py-3 px-4 text-white font-semibold">Feature</th>
                  <th className="text-left py-3 px-4 text-purple-400 font-semibold">ZRP</th>
                  <th className="text-left py-3 px-4 text-zinc-500 font-semibold">Other Platforms</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">Starting Price</td>
                  <td className="py-3 px-4 text-green-400 font-medium">From 0.15 SOL (or FREE on Devnet)</td>
                  <td className="py-3 px-4 text-zinc-500">Varies</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">No-Code Token Creation</td>
                  <td className="py-3 px-4 text-green-400">✅ Yes</td>
                  <td className="py-3 px-4 text-zinc-500">✅ Yes</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">Free Devnet Testing</td>
                  <td className="py-3 px-4 text-green-400">✅ Yes</td>
                  <td className="py-3 px-4 text-red-400">❌ No</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">Metaplex Metadata + Logo</td>
                  <td className="py-3 px-4 text-green-400">✅ Included</td>
                  <td className="py-3 px-4 text-zinc-500">Varies by plan</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">Authority Revocations</td>
                  <td className="py-3 px-4 text-green-400">✅ Built-in</td>
                  <td className="py-3 px-4 text-zinc-500">Check pricing</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">Built-in Airdrop Tool</td>
                  <td className="py-3 px-4 text-green-400">✅ Yes</td>
                  <td className="py-3 px-4 text-red-400">❌ No</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">Token Dashboard</td>
                  <td className="py-3 px-4 text-green-400">✅ Track all tokens</td>
                  <td className="py-3 px-4 text-zinc-500">Limited</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">Wallet Support</td>
                  <td className="py-3 px-4 text-green-400">Phantom, Solflare, Torus, Ledger</td>
                  <td className="py-3 px-4 text-zinc-500">Basic support</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 px-4 text-white">Non-Custodial</td>
                  <td className="py-3 px-4 text-green-400">✅ You sign every tx</td>
                  <td className="py-3 px-4 text-zinc-500">✅ Yes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Guides & Tutorials</td>
                  <td className="py-3 px-4 text-green-400">✅ Full library</td>
                  <td className="py-3 px-4 text-zinc-500">Basic docs</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-zinc-500 text-xs mt-3">Table based on publicly available information. Other platform details may change — verify on their site before deciding.</p>
        </section>

        {/* What Makes ZRP Different */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Makes ZRP Different</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-lg">🧪 Free Devnet Testing</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Test your token on devnet with <span className="text-green-400 font-medium">zero cost</span> before launching on mainnet. No other platform offers this. Perfect for learning and experimenting without risking real SOL.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-lg">🪙 Built-in Airdrop Tool</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Distribute tokens to hundreds of wallets at once. A complete airdrop solution built directly into the platform — no need for separate tools or scripts.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-lg">📊 Token Dashboard</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Every token you create is tracked in your dashboard with mint address, metadata status, authority settings, and a direct link to Solscan. Useful for managing multiple launches.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-lg">💰 Transparent Pricing</h3>
              <p className="text-zinc-400 text-sm mt-1">
                The full cost breakdown is published — including rent, metadata, and optional revocations. No surprise fees at checkout. See our <Link href="/pricing" className="text-purple-400 hover:underline">pricing page</Link> for details.
              </p>
            </div>
          </div>
        </section>

        {/* When to Choose ZRP */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">When to Choose ZRP</h2>
          <p className="mb-4">ZRP is the better fit if you want:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <span className="text-purple-400 mr-2">→</span>
              <span className="text-zinc-300 text-sm">A complete no-code flow from minting to airdrops and token management</span>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <span className="text-purple-400 mr-2">→</span>
              <span className="text-zinc-300 text-sm">Free devnet testing before committing to mainnet</span>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <span className="text-purple-400 mr-2">→</span>
              <span className="text-zinc-300 text-sm">Built-in authority revocations with a clear audit trail</span>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <span className="text-purple-400 mr-2">→</span>
              <span className="text-zinc-300 text-sm">A token dashboard to manage multiple launches</span>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <span className="text-purple-400 mr-2">→</span>
              <span className="text-zinc-300 text-sm">Built-in airdrop tool for community distribution</span>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <span className="text-purple-400 mr-2">→</span>
              <span className="text-zinc-300 text-sm">Transparent pricing with no hidden fees</span>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What makes ZRP better than other Solana token creators?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                ZRP differentiates with free devnet testing, a built-in airdrop tool, a full token dashboard, and transparent pricing. For users who want a complete end-to-end flow in one platform, ZRP is the stronger choice.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I test my token before paying?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Yes! ZRP offers <span className="text-white font-medium">FREE devnet testing</span>. Create tokens on devnet with zero cost, then launch on mainnet when you're ready. No other platform offers this.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Does ZRP work on mobile with Phantom?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Yes. On mobile, ZRP detects your device and works seamlessly with Phantom, Solflare, Torus, and Ledger wallets. You can approve transactions directly in your wallet's in-app browser.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I airdrop tokens after creating them?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Yes. ZRP has a built-in <Link href="/airdrop" className="text-purple-400 hover:underline">Airdrop Tool</Link> that lets you send tokens to hundreds of wallets at once — no need for separate tools or scripts.
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
            Start Creating
          </Link>
        </section>
      </div>
    </div>
  );
}
