import Link from 'next/link';

export default function BurningLPTokensPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">After Token Creation</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Burning <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">LP Tokens</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Burning LP tokens is the strongest trust signal you can give to your community. It permanently locks liquidity.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What Are LP Tokens? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Are LP Tokens?</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">LP Token</span>
              <span className="text-white text-sm font-medium">Liquidity Provider token</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">What It Does</span>
              <span className="text-white text-sm font-medium">Represents your share of a liquidity pool</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">How You Get It</span>
              <span className="text-white text-sm font-medium">Received when you add liquidity</span>
            </div>
          </div>
        </section>

        {/* Why Burn LP Tokens? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Burn LP Tokens?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💯 Trust Signal</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Proves you can't rug pull</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Permanent Lock</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Liquidity is locked forever</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🤝 Holder Confidence</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Attracts long-term holders</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">✅ Commitment</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Shows you're serious</p>
            </div>
          </div>
        </section>

        {/* What Burning Does */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Burning Does</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">Before</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>You hold LP tokens</li>
                <li>Can withdraw liquidity</li>
                <li>You're in control</li>
              </ul>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">After</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>LP tokens are destroyed</li>
                <li>Liquidity is permanently locked</li>
                <li>No one controls it</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#FF2D2D]/10 border-l-4 border-[#FF2D2D] rounded-r-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">⚠️ Important</p>
            <p className="text-[#BDDBDB] text-sm mt-1">Burning LP tokens is <span className="text-white font-semibold">permanent</span>. You cannot recover them.</p>
          </div>
        </section>

        {/* How to Burn LP Tokens */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Burn LP Tokens</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Get Your LP Tokens</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">First, add liquidity to a DEX to receive LP tokens:</p>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to Raydium</p>
                <p className="text-[#BDDBDB] text-sm"><a href="https://raydium.io" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">raydium.io</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Add liquidity to your token/SOL pool</p>
                <p className="text-[#BDDBDB] text-sm">Provide liquidity on Raydium</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">You receive LP tokens</p>
                <p className="text-[#BDDBDB] text-sm">LP tokens appear in your wallet</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Use ZRP's Burn LP Tool</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to Burn LP Tool</p>
                <p className="text-[#BDDBDB] text-sm">Visit <Link href="/burn-lp" className="text-[#FF2D2D] hover:text-[#B10000] transition">/burn-lp</Link></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Select Wallet"</p>
                <p className="text-[#BDDBDB] text-sm">Connect your wallet</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the connection</p>
                <p className="text-[#BDDBDB] text-sm">Confirm in your wallet</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Select Your LP Token</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Your LP tokens will appear in the list</p>
                <p className="text-[#BDDBDB] text-sm">ZRP detects your LP tokens</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click on the one you want to burn</p>
                <p className="text-[#BDDBDB] text-sm">Select the LP token</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 4: Confirm Burn</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Review the details</p>
                <p className="text-[#BDDBDB] text-sm">Double-check everything</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Burn LP Tokens"</p>
                <p className="text-[#BDDBDB] text-sm">Initiate the burn</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the transaction in your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Confirm the burn</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 5: Verify</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Check your wallet</p>
                <p className="text-[#BDDBDB] text-sm">LP tokens are gone</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Check the pool</p>
                <p className="text-[#BDDBDB] text-sm">Liquidity is locked</p>
              </div>
            </div>
          </div>
        </section>

        {/* When to Burn LP Tokens */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">When to Burn LP Tokens</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Immediately</span>
              <span className="text-white text-sm font-medium">Maximum trust from day one</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">After Testing</span>
              <span className="text-white text-sm font-medium">Once you're confident</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Before Promotion</span>
              <span className="text-white text-sm font-medium">To show commitment</span>
            </div>
          </div>
        </section>

        {/* Benefits of Burning LP */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Benefits of Burning LP</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">For Holders</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ No rug pull risk</li>
            <li>✅ Liquidity is safe</li>
            <li>✅ Price stability</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">For You</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Stronger trust</li>
            <li>✅ Better reputation</li>
            <li>✅ More attracted holders</li>
          </ul>
        </section>

        {/* What You Should Know */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What You Should Know</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
              <p className="text-white font-semibold">🔒 Permanent</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Cannot be undone</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">💯 Trust Signal</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Strongest proof</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🤝 Community</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Attracts serious holders</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/add-liquidity" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">💧 Adding Liquidity</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to add liquidity to your token</p>
            </Link>
            <Link href="/help/liquidity-guide" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📖 Liquidity Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete liquidity guide</p>
            </Link>
            <Link href="/help/security-checklist" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">✅ Security Checklist</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Pre-launch security checklist</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Burn Your LP Tokens?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Build trust with your community. Burn your LP tokens today.
          </p>
          <a
            href="/burn-lp"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Burn LP Tokens
          </a>
        </section>
      </div>
    </div>
  );
}
