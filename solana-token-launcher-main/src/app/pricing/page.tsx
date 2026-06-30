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

      {/* Devnet Banner */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-12 text-center">
        <h3 className="text-blue-400 font-bold text-lg mb-2">🧪 Test on Devnet — Completely FREE</h3>
        <p className="text-blue-300/80 text-sm">
          Create tokens on Solana Devnet with zero cost. Perfect for testing before going live.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
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
        </section>

        {/* Optional Features */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Optional Security Features</h2>
          <p className="mb-4">Beyond the base fee, add authority revocations for maximum trust. Each adds <strong className="text-white">0.15 SOL</strong>.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-zinc-400 text-xs">Revoke Mint Authority</p>
              <p className="text-purple-400 font-bold text-lg">+0.15 SOL</p>
              <p className="text-zinc-500 text-xs">Prevents minting more tokens</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-zinc-400 text-xs">Revoke Freeze Authority</p>
              <p className="text-purple-400 font-bold text-lg">+0.15 SOL</p>
              <p className="text-zinc-500 text-xs">Prevents freezing accounts</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-zinc-400 text-xs">Revoke Update Authority</p>
              <p className="text-purple-400 font-bold text-lg">+0.15 SOL</p>
              <p className="text-zinc-500 text-xs">Makes metadata permanent</p>
            </div>
          </div>
          <p className="text-zinc-500 text-xs">Revoke all three for maximum security. <span className="text-white font-medium">Cannot be undone once revoked.</span></p>
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
                <li>Social links included</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-center">Standard Token</h3>
              <div className="text-2xl font-bold text-purple-400 text-center">0.30 SOL</div>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-xs">
                <li>Base fee: 0.15 SOL</li>
                <li>1 revocation: +0.15 SOL</li>
                <li>Social links included</li>
              </ul>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold text-center">Secure Token</h3>
              <div className="text-2xl font-bold text-purple-400 text-center">0.60 SOL</div>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-xs">
                <li>Base fee: 0.15 SOL</li>
                <li>All 3 revocations: +0.45 SOL</li>
                <li>Social links included</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-center">Maximum Possible</h3>
              <div className="text-2xl font-bold text-purple-400 text-center">0.60 SOL</div>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-xs">
                <li>Base fee: 0.15 SOL</li>
                <li>All revocations: +0.45 SOL</li>
                <li>Highest trust & security</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fee Breakdown Table */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Detailed Fee Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="py-3 text-zinc-400 text-xs font-medium">Feature</th>
                  <th className="py-3 text-zinc-400 text-xs font-medium">Cost</th>
                  <th className="py-3 text-zinc-400 text-xs font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-zinc-800">
                  <td className="py-3 text-white">Base Token Creation</td>
                  <td className="py-3 text-purple-400 font-bold">0.15 SOL</td>
                  <td className="py-3 text-zinc-500">Mint account, metadata, initial supply</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 text-white">Revoke Mint Authority</td>
                  <td className="py-3 text-purple-400 font-bold">+0.15 SOL</td>
                  <td className="py-3 text-zinc-500">Prevents creating more tokens</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 text-white">Revoke Freeze Authority</td>
                  <td className="py-3 text-purple-400 font-bold">+0.15 SOL</td>
                  <td className="py-3 text-zinc-500">Prevents freezing token accounts</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-3 text-white">Revoke Update Authority</td>
                  <td className="py-3 text-purple-400 font-bold">+0.15 SOL</td>
                  <td className="py-3 text-zinc-500">Makes metadata permanent & immutable</td>
                </tr>
                <tr className="border-t-2 border-purple-500">
                  <td className="py-3 text-white font-bold">Maximum Total</td>
                  <td className="py-3 text-green-400 font-bold text-lg">0.60 SOL</td>
                  <td className="py-3 text-zinc-500">All features included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Additional Costs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Additional Costs to Consider</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Blockchain Transaction Fees</h3>
              <p className="text-zinc-400 text-sm mt-1">Solana fees are tiny (~0.001 SOL per transaction). Budget ~0.01 SOL for all transactions.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Wallet Balance</h3>
              <p className="text-zinc-400 text-sm mt-1">Have at least <span className="text-white font-medium">0.2 SOL</span> for basic tokens. For all revocations, have at least <span className="text-white font-medium">0.7 SOL</span>.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How much does it cost to create a Solana token?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Base cost is <span className="text-white font-medium">0.15 SOL</span>. Each authority revocation adds <span className="text-white font-medium">0.15 SOL</span>. Max total is <span className="text-white font-medium">0.60 SOL</span>.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Are there any hidden fees?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                No. Every fee is shown in your wallet before you sign. We simulate transactions so you know exactly what you'll pay.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I create a token for free?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Yes! <span className="text-white font-medium">Devnet testing is completely FREE.</span> You only pay when launching on mainnet.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What if the transaction fails?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Your SOL is safe. Failed transactions don't deduct fees. We simulate every transaction before asking for your signature.
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
