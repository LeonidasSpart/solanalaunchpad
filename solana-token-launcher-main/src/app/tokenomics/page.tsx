// src/app/tokenomics/page.tsx
import Link from 'next/link';

export default function TokenomicsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Tokenomics Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Solana Tokenomics: <br className="hidden sm:block" />
          <span className="text-purple-400">Complete Design Guide</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Learn how to design effective tokenomics for your Solana token. Understand supply, distribution, utility, and economic models for sustainable success.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* What is Tokenomics? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What is Tokenomics?</h2>
          <p>
            Tokenomics is the economic design of your token. It encompasses everything from total supply and distribution to utility and value flows. Good tokenomics create sustainable value and align incentives between creators, holders, and users.
          </p>
          <p className="mt-3">
            Poor tokenomics can doom even great projects. Too much supply, unfair distribution, or lack of utility can prevent your token from gaining traction. This guide explains how to design tokenomics that support long-term success.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">⚠️ Plan Before You Create</p>
            <p className="text-zinc-400 text-sm mt-1">
              Decisions about supply and distribution are permanent. Plan your tokenomics <span className="text-white font-medium">before</span> you create your token. Combine this with our <Link href="/guide" className="text-purple-400 hover:underline">SPL Token Guide</Link> and <Link href="/pricing" className="text-purple-400 hover:underline">cost planning</Link> for complete token economics.
            </p>
          </div>

          <h3 className="text-white font-semibold mt-6 mb-3">Key Components</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-white font-medium">Supply:</span> Total number of tokens, inflation/deflation mechanics, and supply schedule</li>
            <li><span className="text-white font-medium">Distribution:</span> How tokens are allocated across team, community, liquidity, and reserves</li>
            <li><span className="text-white font-medium">Utility:</span> What the token is used for, use cases, and value proposition</li>
            <li><span className="text-white font-medium">Economic Flows:</span> How tokens flow through the ecosystem, rewards, and incentives</li>
            <li><span className="text-white font-medium">Vesting:</span> How locked tokens are released over time</li>
          </ul>
        </section>

        {/* Token Distribution Design */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Token Distribution Design</h2>
          <p className="mb-4">
            How you distribute tokens affects everything — from initial price to long-term sustainability. Fair distribution builds trust, while unfair distribution can kill projects.
          </p>

          <h3 className="text-white font-semibold mt-4 mb-3">Allocation Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold">🚀 Public Launch</p>
              <p className="text-zinc-400 text-sm mt-1">30–50% — Tokens available at launch for community</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold">👥 Team & Advisors</p>
              <p className="text-zinc-400 text-sm mt-1">10–20% — With vesting schedules to align incentives</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold">🏦 Development & Treasury</p>
              <p className="text-zinc-400 text-sm mt-1">20–30% — For future development and partnerships</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold">🎁 Community Rewards</p>
              <p className="text-zinc-400 text-sm mt-1">10–15% — For airdrops, contests, and incentives</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 md:col-span-2">
              <p className="text-white font-semibold">💧 Liquidity</p>
              <p className="text-zinc-400 text-sm mt-1">5–10% — Reserved for DEX liquidity pools</p>
            </div>
          </div>
          <p className="text-zinc-500 text-xs mt-3 text-center">These are general guidelines. Adjust based on your specific project needs.</p>
        </section>

        {/* Economic Models and Incentives */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Economic Models and Incentives</h2>
          <p className="mb-4">
            How tokens flow through your ecosystem affects value. Design economic flows that reward desired behaviors and create sustainable value.
          </p>

          <h3 className="text-white font-semibold mt-4 mb-3">Incentive Design</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="text-white font-medium">Long-term holding:</span> staking rewards, reduced fees</li>
            <li><span className="text-white font-medium">Community participation:</span> rewards for contributions</li>
            <li><span className="text-white font-medium">Liquidity provision:</span> rewards for providing pools</li>
            <li><span className="text-white font-medium">Usage:</span> discounts or benefits for using the token</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Token Flows</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>How tokens are distributed (fair launch, presale)</li>
            <li>How tokens are earned (staking, rewards)</li>
            <li>How tokens are spent (payments, fees, access)</li>
            <li>How tokens are removed (burning, locking, fees)</li>
          </ul>
        </section>

        {/* Vesting Schedules */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Vesting Schedules</h2>
          <p className="mb-4">
            Vesting controls how locked tokens are released over time. This prevents immediate dumps and aligns long-term incentives.
          </p>

          <h3 className="text-white font-semibold mt-4 mb-3">Common Vesting Models</h3>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold">📈 Linear Vesting</p>
              <p className="text-zinc-400 text-sm mt-1">Equal amounts released regularly (e.g., 10% monthly for 10 months)</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold">⛰️ Cliff Vesting</p>
              <p className="text-zinc-400 text-sm mt-1">Nothing released until a date, then regular releases begin</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <p className="text-white font-semibold">⚡ Accelerated Vesting</p>
              <p className="text-zinc-400 text-sm mt-1">Faster releases early, slower later</p>
            </div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4 mt-4">
            <p className="text-purple-300 text-sm font-semibold">💡 Best Practice</p>
            <p className="text-zinc-400 text-sm mt-1">
              Team tokens should always be vested. Common schedules are <span className="text-white font-medium">12–48 months</span> with monthly or quarterly releases. This shows commitment and prevents immediate dumps.
            </p>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Tokenomics Best Practices</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Be Transparent</h3>
              <p className="text-zinc-400 text-sm mt-1">Publish your tokenomics publicly. Explain your reasoning. Transparency builds trust and helps holders understand your token's economics.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Fair Distribution</h3>
              <p className="text-zinc-400 text-sm mt-1">Avoid keeping too much for yourself. Fair distribution builds trust and decentralization.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Create Real Utility</h3>
              <p className="text-zinc-400 text-sm mt-1">Don't rely solely on speculation. Design utility that creates ongoing demand. Utility sustains value long-term.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Vest Team Tokens</h3>
              <p className="text-zinc-400 text-sm mt-1">Always vest team allocations. This aligns incentives and prevents immediate dumps that hurt price and trust.</p>
            </div>
          </div>
        </section>

        {/* Related Concepts */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Related Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/guide" className="group bg-black/40 rounded-xl p-4 border border-zinc-800 hover:border-purple-500/50 transition">
              <h3 className="text-white font-semibold group-hover:text-purple-400 transition">Token Parameters</h3>
              <p className="text-zinc-400 text-sm mt-1">Learn about name, symbol, supply, and decimals — the fundamental parameters that affect your tokenomics.</p>
              <span className="text-purple-400 text-sm mt-2 inline-block">Read Token Parameters Guide →</span>
            </Link>
            <Link href="/guide#distribution" className="group bg-black/40 rounded-xl p-4 border border-zinc-800 hover:border-purple-500/50 transition">
              <h3 className="text-white font-semibold group-hover:text-purple-400 transition">Distribution Strategies</h3>
              <p className="text-zinc-400 text-sm mt-1">Understand how to allocate tokens across team, community, liquidity, and reserves.</p>
              <span className="text-purple-400 text-sm mt-2 inline-block">Read Distribution Guide →</span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What are tokenomics for Solana tokens?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Tokenomics refers to the economic design of your token, including total supply, distribution, utility, incentives, and economic flows. Plan tokenomics before creating your token as many decisions are permanent.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How do I design good tokenomics?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Define clear utility and use cases, set appropriate total supply, allocate tokens fairly, implement vesting schedules, create incentives for long-term holding, ensure adequate liquidity, and maintain transparency.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What is a good token supply for a Solana token?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Common ranges are 1 million to 1 billion tokens. Smaller supplies create scarcity, larger supplies allow micro-transactions. Consider your utility, target market cap, and decimal precision when deciding.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Should I have token inflation or deflation?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Most SPL tokens have a fixed supply. You can implement token burning (deflation) through fees or buybacks, or create new tokens through rewards (if you keep mint authority). Fixed supply is most common.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Launch */}
        <section className="text-center border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            No coding required. Live on mainnet in under 60 seconds.
          </p>
          <a
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </a>
        </section>
      </div>
    </div>
  );
}
