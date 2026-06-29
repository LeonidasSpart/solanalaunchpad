// src/app/distribution/page.tsx
import Link from 'next/link';

export default function DistributionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Distribution Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Solana Token <br className="hidden sm:block" />
          <span className="text-purple-400">Distribution Strategies</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Learn effective strategies for distributing your Solana token. Understand fair launches, presales, airdrops, and how to allocate tokens for long-term success.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            How you distribute your Solana token significantly impacts its success. Fair distribution builds trust, attracts holders, and creates a strong community. Poor distribution can lead to centralization, price manipulation, and community distrust.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">⚠️ Plan Before You Create</p>
            <p className="text-zinc-400 text-sm mt-1">
              Distribution planning should happen <span className="text-white font-medium">before</span> you create your token. Combined with a solid <Link href="/launch" className="text-purple-400 hover:underline">launch strategy</Link> and proper <Link href="/pricing" className="text-purple-400 hover:underline">budget planning</Link>, effective distribution sets your token up for long-term success.
            </p>
          </div>
        </section>

        {/* Distribution Methods */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Token Distribution Methods</h2>
          <p className="mb-4">Each distribution approach has distinct trade-offs. Choose the one that best fits your project's goals.</p>

          <div className="space-y-4">
            {/* Fair Launch */}
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-lg">⚖️ Fair Launch</h3>
              <p className="text-zinc-400 text-sm mt-1">Everyone has equal access to your token at launch. No presales, no insider allocations. This is the most decentralized approach and builds maximum trust.</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-green-900/20 rounded-lg p-2 border border-green-500/20">
                  <p className="text-green-400 text-xs font-semibold">Advantages</p>
                  <ul className="list-disc pl-4 text-zinc-400 text-xs space-y-0.5">
                    <li>Maximum decentralization</li>
                    <li>Builds strong community trust</li>
                    <li>True price discovery</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 rounded-lg p-2 border border-red-500/20">
                  <p className="text-red-400 text-xs font-semibold">Disadvantages</p>
                  <ul className="list-disc pl-4 text-zinc-400 text-xs space-y-0.5">
                    <li>No upfront capital raised</li>
                    <li>Requires strong marketing</li>
                    <li>May have slower initial growth</li>
                  </ul>
                </div>
              </div>
              <p className="text-zinc-500 text-xs mt-2">Best for: Community-driven projects, memecoins, projects prioritizing decentralization</p>
            </div>

            {/* Presale */}
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-lg">💰 Presale</h3>
              <p className="text-zinc-400 text-sm mt-1">Early supporters buy tokens before public launch, often at a discount. Raises capital for development, marketing, and liquidity while rewarding early supporters.</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-green-900/20 rounded-lg p-2 border border-green-500/20">
                  <p className="text-green-400 text-xs font-semibold">Advantages</p>
                  <ul className="list-disc pl-4 text-zinc-400 text-xs space-y-0.5">
                    <li>Raises capital for development</li>
                    <li>Rewards early supporters</li>
                    <li>Builds committed holder base</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 rounded-lg p-2 border border-red-500/20">
                  <p className="text-red-400 text-xs font-semibold">Disadvantages</p>
                  <ul className="list-disc pl-4 text-zinc-400 text-xs space-y-0.5">
                    <li>Can be seen as less fair</li>
                    <li>Risk of whale concentration</li>
                    <li>Regulatory considerations</li>
                  </ul>
                </div>
              </div>
              <p className="text-zinc-500 text-xs mt-2">Best for: Projects needing capital, utility tokens, projects with clear roadmaps</p>
            </div>

            {/* Airdrop */}
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold text-lg">🎁 Airdrop</h3>
              <p className="text-zinc-400 text-sm mt-1">Distribute free tokens to community members as rewards for early participation, referrals, or community engagement. Builds community and rewards supporters.</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-green-900/20 rounded-lg p-2 border border-green-500/20">
                  <p className="text-green-400 text-xs font-semibold">Advantages</p>
                  <ul className="list-disc pl-4 text-zinc-400 text-xs space-y-0.5">
                    <li>Builds community engagement</li>
                    <li>Rewards early supporters</li>
                    <li>Creates marketing buzz</li>
                  </ul>
                </div>
                <div className="bg-red-900/20 rounded-lg p-2 border border-red-500/20">
                  <p className="text-red-400 text-xs font-semibold">Disadvantages</p>
                  <ul className="list-disc pl-4 text-zinc-400 text-xs space-y-0.5">
                    <li>May attract airdrop hunters</li>
                    <li>Requires careful targeting</li>
                    <li>Can dilute early holders</li>
                  </ul>
                </div>
              </div>
              <p className="text-zinc-500 text-xs mt-2">Best for: Rewarding communities, promoting engagement, decentralizing ownership</p>
            </div>

            {/* Hybrid Approach */}
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold text-lg">🔄 Hybrid Approach</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Many successful projects combine multiple distribution methods. For example, a small presale, fair launch for most tokens, and airdrops for community rewards. Hybrid approaches balance capital raising, decentralization, and community building.
              </p>
              <p className="text-zinc-500 text-xs mt-2">Best for: Projects wanting to balance capital, decentralization, and community</p>
            </div>
          </div>
        </section>

        {/* Token Allocation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Token Allocation Planning</h2>
          <p className="mb-4">How you allocate your token supply affects long-term success. Transparent allocation builds trust.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Common Allocation Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <p className="text-white font-semibold text-sm">Public Launch</p>
              <p className="text-zinc-400 text-xs">30–50% — Main distribution pool</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <p className="text-white font-semibold text-sm">Team & Advisors</p>
              <p className="text-zinc-400 text-xs">10–20% — Usually vested over time</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <p className="text-white font-semibold text-sm">Development & Treasury</p>
              <p className="text-zinc-400 text-xs">20–30% — For future development</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <p className="text-white font-semibold text-sm">Community Rewards</p>
              <p className="text-zinc-400 text-xs">10–15% — For airdrops, contests, staking</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <p className="text-white font-semibold text-sm">Liquidity</p>
              <p className="text-zinc-400 text-xs">5–10% — For DEX liquidity pools</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <p className="text-white font-semibold text-sm">Partnerships</p>
              <p className="text-zinc-400 text-xs">5–10% — For strategic partnerships</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Transparency Best Practices</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li>Publish allocation percentages publicly</li>
            <li>Explain the purpose of each allocation</li>
            <li>Disclose vesting schedules for locked tokens</li>
            <li>Use smart contracts or timelocks where possible</li>
            <li>Update community if allocations change</li>
          </ul>
        </section>

        {/* Implementing a Fair Launch */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Implementing a Fair Launch</h2>
          <p className="mb-4">Fair launches require strong pre-launch marketing. Here's how to execute one effectively.</p>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Pre-Launch Preparation</h3>
              <ul className="list-disc pl-5 mt-1 text-zinc-400 text-xs space-y-0.5">
                <li>Build social media following on Twitter and Telegram</li>
                <li>Create anticipation with teasers and countdowns</li>
                <li>Establish community channels</li>
                <li>Plan your launch announcement strategy</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Launch Execution</h3>
              <ul className="list-disc pl-5 mt-1 text-zinc-400 text-xs space-y-0.5">
                <li>Announce launch time publicly in advance</li>
                <li>Create your token using ZRP</li>
                <li>Add liquidity to Raydium or another DEX</li>
                <li>Share token address and trading links immediately</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Post-Launch</h3>
              <ul className="list-disc pl-5 mt-1 text-zinc-400 text-xs space-y-0.5">
                <li>Maintain active community engagement</li>
                <li>Celebrate milestones with the community</li>
                <li>Continue development and deliver value</li>
                <li>Build partnerships and expand use cases</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementing a Presale */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Implementing a Presale</h2>
          <p className="mb-4">Careful planning and transparency are essential. Poorly executed presales can permanently damage reputation.</p>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Presale Planning</h3>
              <ul className="list-disc pl-5 mt-1 text-zinc-400 text-xs space-y-0.5">
                <li><span className="text-white">Amount:</span> Decide what percentage of supply to sell (common: 10-30%)</li>
                <li><span className="text-white">Price:</span> Set at a discount to launch price (typically 20-50%)</li>
                <li><span className="text-white">Vesting:</span> Consider vesting to prevent immediate dumps</li>
                <li><span className="text-white">Limits:</span> Set minimum and maximum purchase limits</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Presale Execution</h3>
              <ul className="list-disc pl-5 mt-1 text-zinc-400 text-xs space-y-0.5">
                <li>Announce presale details publicly</li>
                <li>Set clear start and end times</li>
                <li>Use secure, audited smart contracts</li>
                <li>Provide clear instructions for participation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Implementing Airdrops */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Implementing Airdrops</h2>
          <p className="mb-4">Airdrops can effectively reward community members, but require careful targeting to be effective.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Airdrop Targeting</h3>
              <ul className="list-disc pl-5 mt-1 text-zinc-400 text-xs space-y-0.5">
                <li>Early community members and supporters</li>
                <li>Active contributors and promoters</li>
                <li>Referral program participants</li>
                <li>Holders of related tokens or NFTs</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Airdrop Execution</h3>
              <ul className="list-disc pl-5 mt-1 text-zinc-400 text-xs space-y-0.5">
                <li>Verify wallet addresses before distribution</li>
                <li>Set reasonable airdrop amounts</li>
                <li>Announce airdrops to build anticipation</li>
                <li>Consider vesting to prevent immediate dumps</li>
              </ul>
            </div>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-3 mt-3">
            <p className="text-purple-300 text-xs">💡 Use ZRP's built-in <Link href="/airdrop" className="text-purple-400 hover:underline">Airdrop Tool</Link> for seamless distribution.</p>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Distribution Best Practices</h2>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🔍 Be Transparent</h3>
              <p className="text-zinc-400 text-xs mt-1">Publish your allocation plan, explain your reasoning, and update the community on distribution progress.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🐋 Avoid Whale Concentration</h3>
              <p className="text-zinc-400 text-xs mt-1">Use participation limits and fair distribution to prevent a small number of wallets from holding too much.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">📈 Plan for Long-Term</h3>
              <p className="text-zinc-400 text-xs mt-1">Don't distribute everything at launch. Reserve tokens for future development, partnerships, and community growth.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">⏳ Consider Vesting</h3>
              <p className="text-zinc-400 text-xs mt-1">Use vesting schedules for team allocations and presale tokens to align incentives and prevent immediate dumps.</p>
            </div>
          </div>
        </section>

        {/* Mistakes to Avoid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Distribution Mistakes to Avoid</h2>
          <div className="space-y-3">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Keeping Too Much for Yourself</h3>
              <p className="text-zinc-400 text-xs mt-1">Holding 50%+ of supply creates centralization concerns and reduces trust. Distribute tokens widely.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Lack of Transparency</h3>
              <p className="text-zinc-400 text-xs mt-1">Hiding allocation or distribution plans raises red flags. Be transparent about how tokens are distributed.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 No Vesting for Team</h3>
              <p className="text-zinc-400 text-xs mt-1">Team tokens without vesting can be dumped immediately, damaging price and trust. Always vest team allocations.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Poor Presale Execution</h3>
              <p className="text-zinc-400 text-xs mt-1">Unfair presale terms, lack of transparency, or poor execution can permanently damage reputation. Plan carefully.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What is the best way to distribute a Solana token?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                The best distribution method depends on your project goals. Fair launches promote decentralization, presales raise capital, airdrops reward early supporters, and hybrid approaches balance multiple objectives. Most successful projects use a combination of methods.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Should I do a presale or fair launch?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Fair launches are more decentralized and build community trust, while presales raise capital and reward early supporters. Many successful projects combine both: a small presale for capital, then a fair launch for the majority of tokens.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How much of my token supply should I distribute at launch?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Common distribution at launch ranges from 20-50% of total supply. Reserve tokens for liquidity, team (with vesting), future development, and community rewards. Many successful projects distribute 30-40% at launch.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Should I vest team tokens?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Yes, always vest team tokens. Vesting prevents immediate dumps, aligns team incentives with long-term success, and builds trust with the community. Common vesting schedules are 12-48 months with monthly or quarterly releases.
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
