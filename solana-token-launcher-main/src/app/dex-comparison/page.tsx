// src/app/dex-comparison/page.tsx
import Link from 'next/link';

export default function DexComparisonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">DEX Comparison</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Best DEX for Solana Tokens: <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Complete Platform Comparison</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Compare Raydium, Orca, Jupiter, and other decentralized exchanges for Solana tokens. Find the best DEX for your token launch, trading, and liquidity needs.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Choosing the right decentralized exchange (DEX) for your Solana token is crucial. Different DEXs offer different features, fees, and liquidity models. This comprehensive comparison helps you choose the best platform for your needs.
          </p>
          <p className="mt-3">
            We'll compare Raydium, Orca, Jupiter, and other major Solana DEXs, covering fees, features, listing requirements, and best use cases. Whether you're launching a new token or looking to trade, this guide has you covered.
          </p>
        </section>

        {/* Raydium Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">🟣 Raydium: AMM + Order Book Hybrid</h2>
          <p className="mb-3">Raydium is one of the most popular DEXs on Solana, combining automated market maker (AMM) functionality with Serum's order book. This hybrid approach offers both swap trading and limit orders.</p>

          <h3 className="text-white font-semibold mt-4 mb-2">Key Features</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li>AMM pools with liquidity provision</li>
            <li>Integrated with Serum order book for limit orders</li>
            <li>Farms and staking rewards</li>
            <li>User-friendly interface</li>
            <li>High liquidity for popular tokens</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-2">Fees and Costs</h3>
          <p className="text-[#BDDBDB] text-sm">Raydium charges <span className="text-white font-medium">0.25%</span> trading fee for standard pools. Liquidity providers earn a portion of these fees. Creating a new pool requires providing initial liquidity (typically 10-50+ SOL worth).</p>

          <h3 className="text-white font-semibold mt-4 mb-2">Listing Requirements</h3>
          <p className="text-[#BDDBDB] text-sm">To list on Raydium, you need to create a liquidity pool. This requires providing equal value of your token and SOL. No approval process — anyone can create a pool if they have liquidity. See our <Link href="/add-liquidity" className="text-[#FF2D2D] hover:text-[#B10000] transition">liquidity guide</Link> for details.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-[#FF2D2D] font-semibold text-sm">✅ Pros</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[#BDDBDB] text-xs">
                <li>Easy to list new tokens</li>
                <li>High trading volume</li>
                <li>Good liquidity for popular tokens</li>
                <li>Farms and staking available</li>
                <li>Order book integration</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-[#FF2D2D] font-semibold text-sm">❌ Cons</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[#BDDBDB] text-xs">
                <li>Higher fees than some alternatives</li>
                <li>Requires initial liquidity provision</li>
                <li>Can be competitive for visibility</li>
              </ul>
            </div>
          </div>
          <p className="text-[#FF2D2D] text-xs font-medium mt-3">Best for: New token launches, tokens seeking high visibility, projects wanting farms/staking features.</p>
        </section>

        {/* Orca Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">🐳 Orca: Concentrated Liquidity</h2>
          <p className="mb-3">Orca uses a concentrated liquidity model similar to Uniswap V3, allowing liquidity providers to set price ranges. This creates better capital efficiency and often lower fees.</p>

          <h3 className="text-white font-semibold mt-4 mb-2">Key Features</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li>Concentrated liquidity pools</li>
            <li>Lower fees (0.01-0.3%)</li>
            <li>Better capital efficiency</li>
            <li>Whirlpools for advanced liquidity</li>
            <li>Clean, intuitive interface</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-2">Fees and Costs</h3>
          <p className="text-[#BDDBDB] text-sm">Orca offers tiered fees: <span className="text-white font-medium">0.01%</span> for stablecoin pairs, <span className="text-white font-medium">0.05%</span> for common pairs, and <span className="text-white font-medium">0.3%</span> for exotic pairs. Lower fees make it attractive for high-volume traders.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-[#FF2D2D] font-semibold text-sm">✅ Pros</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[#BDDBDB] text-xs">
                <li>Lower fees than Raydium</li>
                <li>Better capital efficiency</li>
                <li>Concentrated liquidity options</li>
                <li>Good for established tokens</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-[#FF2D2D] font-semibold text-sm">❌ Cons</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[#BDDBDB] text-xs">
                <li>Less volume than Raydium for new tokens</li>
                <li>More complex liquidity management</li>
                <li>Requires understanding of price ranges</li>
              </ul>
            </div>
          </div>
          <p className="text-[#FF2D2D] text-xs font-medium mt-3">Best for: Established tokens, high-volume trading, projects wanting lower fees, experienced liquidity providers.</p>
        </section>

        {/* Jupiter Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">🪐 Jupiter: DEX Aggregator</h2>
          <p className="mb-3">Jupiter is not a standalone DEX but a DEX aggregator. It finds the best prices across all Solana DEXs and routes trades automatically, ensuring users get the best rates.</p>

          <h3 className="text-white font-semibold mt-4 mb-2">Key Features</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li>Aggregates all Solana DEXs</li>
            <li>Automatic best price routing</li>
            <li>No separate listing required</li>
            <li>High liquidity access</li>
            <li>Advanced swap features</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-2">How It Works</h3>
          <p className="text-[#BDDBDB] text-sm">Jupiter doesn't require listing. Once your token has liquidity on any supported DEX (Raydium, Orca, etc.), it automatically appears on Jupiter. The aggregator splits large orders across multiple DEXs for best execution.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-[#FF2D2D] font-semibold text-sm">✅ Pros</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[#BDDBDB] text-xs">
                <li>Best price routing</li>
                <li>No listing required</li>
                <li>Access to all DEX liquidity</li>
                <li>Automatic appearance</li>
                <li>Great for users</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-[#FF2D2D] font-semibold text-sm">❌ Cons</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-[#BDDBDB] text-xs">
                <li>Not a direct listing platform</li>
                <li>Requires liquidity on other DEXs first</li>
                <li>Small additional fee</li>
              </ul>
            </div>
          </div>
          <p className="text-[#FF2D2D] text-xs font-medium mt-3">Best for: All tokens (automatic), users seeking best prices, large trades requiring split routing.</p>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#050505]/40 border-b border-[#1a1a1a]">
                  <th className="text-left py-3 px-4 text-white font-semibold">Feature</th>
                  <th className="text-left py-3 px-4 text-[#FF2D2D] font-semibold">Raydium</th>
                  <th className="text-left py-3 px-4 text-[#FF2D2D] font-semibold">Orca</th>
                  <th className="text-left py-3 px-4 text-[#FF2D2D] font-semibold">Jupiter</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#1a1a1a]">
                  <td className="py-3 px-4 text-white">Type</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">AMM + Order Book</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">Concentrated Liquidity</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">Aggregator</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]">
                  <td className="py-3 px-4 text-white">Trading Fees</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">0.25%</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">0.01-0.3%</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">0.1% + DEX fees</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]">
                  <td className="py-3 px-4 text-white">Listing Difficulty</td>
                  <td className="py-3 px-4 text-[#FF2D2D]">Easy</td>
                  <td className="py-3 px-4 text-[#FF2D2D]">Easy</td>
                  <td className="py-3 px-4 text-[#FF2D2D]">Automatic</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]">
                  <td className="py-3 px-4 text-white">Liquidity Required</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">10-50+ SOL</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">10-50+ SOL</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">None (uses other DEXs)</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]">
                  <td className="py-3 px-4 text-white">Volume (New Tokens)</td>
                  <td className="py-3 px-4 text-[#FF2D2D]">High</td>
                  <td className="py-3 px-4 text-[#BDDBDB]">Medium</td>
                  <td className="py-3 px-4 text-[#FF2D2D]">Very High</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Best For</td>
                  <td className="py-3 px-4 text-[#FF2D2D]">New launches</td>
                  <td className="py-3 px-4 text-[#FF2D2D]">Established tokens</td>
                  <td className="py-3 px-4 text-[#FF2D2D]">All tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Choosing the Right DEX */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Choosing the Right DEX</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-lg">1️⃣ For New Token Launches</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Start with <span className="text-[#FF2D2D] font-medium">Raydium</span>. It's the easiest to list on, has high visibility, and attracts the most volume for new tokens. Once established, consider adding liquidity to Orca for better capital efficiency.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-lg">2️⃣ For Established Tokens</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Use <span className="text-[#FF2D2D] font-medium">Orca</span> for lower fees and better capital efficiency. Consider a multi-DEX strategy with liquidity on both Raydium and Orca for maximum accessibility.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-lg">3️⃣ Multi-DEX Strategy</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">The best approach is listing on multiple DEXs. Start with Raydium, add Orca for efficiency, and your token will automatically appear on Jupiter. This maximizes liquidity and accessibility. See our <Link href="/list-token-dex" className="text-[#FF2D2D] hover:text-[#B10000] transition">DEX listing guide</Link> for details.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Which DEX has the lowest fees for Solana tokens?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                <span className="text-[#FF2D2D] font-medium">Orca</span> typically has the lowest fees at 0.01-0.3% depending on pool type. Raydium charges 0.25% for standard pools. Jupiter, as an aggregator, routes to the best prices but may include additional fees.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Which DEX is easiest to list on?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                <span className="text-[#FF2D2D] font-medium">Raydium</span> is generally the easiest to list on for new tokens. You can create a pool directly if you have liquidity. Orca requires pool creation but is also straightforward. Jupiter doesn't require listing — it aggregates from other DEXs automatically.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I list my token on multiple DEXs?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Yes, you can and should list on multiple DEXs. This increases liquidity, reduces slippage, and improves accessibility. Distribute liquidity across platforms for best results.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What's the difference between Raydium and Orca?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Raydium uses an AMM model integrated with Serum's order book, offering both swap and order book trading. Orca uses concentrated liquidity (similar to Uniswap V3) for better capital efficiency. Raydium is better for new tokens, while Orca offers better rates for established tokens.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Launch */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            No coding required. Live on mainnet in under 60 seconds.
          </p>
          <Link
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </Link>
        </section>
      </div>
    </div>
  );
}
