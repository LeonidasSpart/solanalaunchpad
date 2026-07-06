import Link from 'next/link';

export default function StakingGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Staking Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Token Staking: <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Complete Guide</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Learn how staking works, how to earn rewards, and how to choose the best staking strategies for your tokens.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">Earn</span>
            <span className="text-[#BDDBDB] ml-2">Passive income</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">APY</span>
            <span className="text-[#BDDBDB] ml-2">10–50%+</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">5</span>
            <span className="text-[#BDDBDB] ml-2">Best practices</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">0</span>
            <span className="text-[#BDDBDB] ml-2">Hidden fees</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What is Staking */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What is Staking?</h2>
          <p className="mb-4">
            Staking is the process of locking up your cryptocurrency tokens in a smart contract or wallet to support the network 
            or a project's ecosystem, and in return, you earn rewards. It's like earning interest on a savings account, but with crypto.
          </p>
          <p>
            In the context of token projects, staking helps:
            <span className="text-white font-medium"> reduce circulating supply</span>,
            <span className="text-white font-medium"> incentivize long‑term holding</span>, and
            <span className="text-white font-medium"> reward loyal supporters</span>.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">💡 Why Stake?</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Staking turns your idle tokens into an income stream. It's one of the simplest ways to earn passive income in DeFi.
            </p>
          </div>
        </section>

        {/* How Staking Works */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How Staking Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="text-white font-semibold">Lock Tokens</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                You deposit your tokens into a staking pool. They are temporarily locked (or held) in a smart contract.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="text-white font-semibold">Earn Rewards</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                The pool rewards you with additional tokens over time, typically based on an Annual Percentage Yield (APY).
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="text-white font-semibold">Unstake & Claim</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                You can withdraw your staked tokens at any time (if there's no lock) and claim accumulated rewards.
              </p>
            </div>
          </div>
        </section>

        {/* Staking Rewards & APY */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Staking Rewards &amp; APY</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Term</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">APY</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">
                    Annual Percentage Yield – the return you earn over one year, including compounding.
                  </td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">APR</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">
                    Annual Percentage Rate – the return you earn over one year without compounding.
                  </td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Lock Period</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">
                    The minimum time your tokens must stay staked before you can withdraw.
                  </td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Reward Rate</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">
                    The amount of tokens you earn per staked token per unit of time.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Benefits of Staking */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Benefits of Staking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">💰 Passive Income</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Earn rewards on tokens you're already holding. It's like getting interest on your crypto.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📈 Support the Project</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Staking reduces circulating supply and shows your commitment to the project's long-term success.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔒 Price Stability</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                When tokens are locked, they can't be sold, reducing downward price pressure.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🚀 Compound Growth</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Reinvest rewards to earn compound interest and grow your holdings faster.
              </p>
            </div>
          </div>
        </section>

        {/* Risks */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Risks to Consider</h2>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-5 space-y-2">
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
              <li><span className="text-white font-medium">Smart contract risk</span> — bugs or exploits could lead to loss of funds</li>
              <li><span className="text-white font-medium">Lock-up periods</span> — you may not be able to sell during market downturns</li>
              <li><span className="text-white font-medium">Reward token inflation</span> — high rewards can dilute token value</li>
              <li><span className="text-white font-medium">Project risk</span> — if the project fails, your staked tokens could lose value</li>
              <li><span className="text-white font-medium">Impermanent loss</span> (in liquidity staking) — price divergence from the pool ratio</li>
            </ul>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Staking Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-green-400 font-semibold">✅ Do</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Research the project and team before staking</li>
                <li>Diversify across multiple projects to spread risk</li>
                <li>Start with a small amount to test the process</li>
                <li>Monitor APY fluctuations and adjust your strategy</li>
                <li>Claim rewards regularly to compound growth</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-[#FF2D2D] font-semibold">❌ Don't</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Stake tokens you can't afford to lose</li>
                <li>Ignore lock-up periods — you may need liquidity</li>
                <li>Chase high APYs without understanding the risks</li>
                <li>Leave rewards unclaimed for too long (if there's a risk)</li>
                <li>Share your private keys with any platform</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How is staking different from farming?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Staking typically involves locking tokens in a contract to earn rewards. Farming (yield farming) often involves 
                providing liquidity to pools and earning fees + token rewards. Staking is usually simpler and requires less active management.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Is staking safe?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Staking is as safe as the underlying smart contract and the project itself. Always use audited platforms and 
                never stake more than you're willing to lose. ZRP's staking contracts are built with security best practices.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What is a good APY for staking?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                APY varies widely. 10-20% is common for established projects, while newer projects may offer 50-100%+ to attract stakers. 
                Be cautious of unsustainable yields.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I lose my staked tokens?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                You can lose tokens if the smart contract is exploited, if the project collapses, or if you unstake during a market crash 
                and the token price drops. Choose projects with strong security and transparency.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Start Staking?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Earn passive income on your tokens. Browse available pools and start staking today.
          </p>
          <Link
            href="/staking"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Explore Staking Pools
          </Link>
        </section>
      </div>
    </div>
  );
}
