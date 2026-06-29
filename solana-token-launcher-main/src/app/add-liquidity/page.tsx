// src/app/add-liquidity/page.tsx
import Link from 'next/link';

export default function AddLiquidityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Liquidity Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          How to Add Liquidity to <br className="hidden sm:block" />
          <span className="text-purple-400">Your Solana Token</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Complete guide to adding liquidity pools for your Solana token on Raydium, Orca, and other decentralized exchanges. Learn how to enable trading and create a liquid market for your token.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-purple-400 font-bold">5-10 SOL</span>
            <span className="text-zinc-500 ml-2">Small Projects</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-purple-400 font-bold">20-50 SOL</span>
            <span className="text-zinc-500 ml-2">Standard Launch</span>
          </div>
          <div className="bg-zinc-800/50 rounded-xl px-4 py-2 border border-zinc-700">
            <span className="text-purple-400 font-bold">100+ SOL</span>
            <span className="text-zinc-500 ml-2">Serious Projects</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Creating your Solana token is just the beginning. To make it tradeable, you need to add liquidity to a decentralized exchange (DEX). Liquidity allows people to buy and sell your token easily, creating a real market with price discovery.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">⚠️ Essential Step</p>
            <p className="text-zinc-400 text-sm mt-1">
              Without liquidity, your token exists but can't be traded. This guide explains how to add liquidity on popular Solana DEX platforms like Raydium and Orca. After creating your token with ZRP, adding liquidity is the next critical step.
            </p>
          </div>
        </section>

        {/* What is Liquidity */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What is Liquidity and Why Do You Need It?</h2>
          <p className="mb-3">
            Liquidity refers to the ability to buy or sell an asset without significantly affecting its price. In the context of tokens, liquidity comes from liquidity pools — smart contracts that hold pairs of tokens (like your token and SOL) that traders can swap between.
          </p>
          <p className="mb-4">
            When you add liquidity, you're providing both sides of a trading pair. For example, if you add 10,000 of your tokens and 10 SOL, traders can buy your tokens using SOL or sell your tokens for SOL. The pool automatically sets prices based on supply and demand.
          </p>
          <h3 className="text-white font-semibold mt-4 mb-3">Why Liquidity Matters</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li><span className="text-white">Enables Trading:</span> Without liquidity, no one can buy or sell your token</li>
            <li><span className="text-white">Price Discovery:</span> Liquidity pools determine your token's market price</li>
            <li><span className="text-white">Market Confidence:</span> Adequate liquidity shows your project is serious</li>
            <li><span className="text-white">Reduces Slippage:</span> More liquidity means better prices for traders</li>
            <li><span className="text-white">Attracts Investors:</span> Traders prefer tokens with good liquidity</li>
          </ul>
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4 mt-4">
            <p className="text-purple-300 text-sm font-semibold">💡 Best Practice</p>
            <p className="text-zinc-400 text-sm mt-1">Most successful token launches include liquidity from day one. It's part of a complete <Link href="/launch" className="text-purple-400 hover:underline">launch strategy</Link>.</p>
          </div>
        </section>

        {/* How Much Liquidity */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How Much Liquidity Should You Add?</h2>
          <p className="mb-4">The right amount depends on several factors. Too little creates poor UX, too much locks capital unnecessarily.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Factors to Consider</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li><span className="text-white">Token Supply:</span> Larger supply tokens typically need more liquidity.</li>
            <li><span className="text-white">Target Market Cap:</span> For a $100,000 market cap, add 10-20 SOL. For $1 million, consider 50-100+ SOL.</li>
            <li><span className="text-white">Community Size:</span> Larger communities expect more liquidity.</li>
            <li><span className="text-white">Initial Price:</span> Higher prices require more SOL value.</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 text-center">
              <p className="text-zinc-400 text-sm">Small Projects</p>
              <p className="text-2xl font-bold text-white">5-10 SOL</p>
              <p className="text-zinc-500 text-xs">For testing or small communities</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-purple-500/30 text-center">
              <p className="text-zinc-400 text-sm">Standard Launch</p>
              <p className="text-2xl font-bold text-purple-400">20-50 SOL</p>
              <p className="text-zinc-500 text-xs">Most common starting point</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800 text-center">
              <p className="text-zinc-400 text-sm">Serious Projects</p>
              <p className="text-2xl font-bold text-white">100-500+ SOL</p>
              <p className="text-zinc-500 text-xs">For established projects</p>
            </div>
          </div>
          <p className="text-zinc-500 text-xs text-center mt-3">Remember: you need equal value of both your token and SOL.</p>
        </section>

        {/* Choosing a DEX */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Choosing a DEX Platform</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Raydium</h3>
              <p className="text-zinc-400 text-sm mt-1">Best for: New token launches, high volume trading</p>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-sm">
                <li>Most popular DEX on Solana</li>
                <li>Integrated with Serum DEX for order book trading</li>
                <li>Lower fees (0.25% trading fee)</li>
                <li>Easy-to-use interface</li>
              </ul>
              <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-2 mt-2">
                <p className="text-purple-300 text-xs font-medium">✅ Recommended for most new tokens</p>
              </div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Orca</h3>
              <p className="text-zinc-400 text-sm mt-1">Best for: Capital efficiency, advanced features</p>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-sm">
                <li>Concentrated liquidity (like Uniswap V3)</li>
                <li>Better capital efficiency</li>
                <li>Lower slippage for larger trades</li>
                <li>User-friendly interface</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Jupiter</h3>
              <p className="text-zinc-400 text-sm mt-1">Best for: Aggregator, best prices</p>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-zinc-400 text-sm">
                <li>Aggregates liquidity from multiple DEXs</li>
                <li>Finds best prices automatically</li>
                <li>Good for traders seeking best rates</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step-by-Step: Adding Liquidity on Raydium</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">Prepare Your Assets</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Ensure you have both your token and SOL ready. You need equal dollar values of both. Also ensure you have extra SOL for transaction fees.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">Visit Raydium and Connect Wallet</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Go to raydium.io and click "Connect Wallet". Choose your Solana wallet (Phantom, Solflare, Backpack). Approve the connection request.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Navigate to Liquidity Pools</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Click on "Liquidity" in the top navigation. Then click "Create Pool" or "Add Liquidity". For new tokens, you'll be creating the first pool.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <h3 className="text-white font-semibold">Select Your Token Pair</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                The first field should be SOL (or WSOL). The second field is where you'll enter your token's mint address. Paste your token's mint address.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                <h3 className="text-white font-semibold">Set Initial Price</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                This determines your token's market cap. The price is set by the ratio of tokens to SOL in your pool. Calculate your desired starting price carefully.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">6</span>
                <h3 className="text-white font-semibold">Enter Liquidity Amounts</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Enter the amount of SOL you want to add. Raydium will automatically calculate how many tokens you need based on your selected price.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">7</span>
                <h3 className="text-white font-semibold">Approve and Confirm</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Approve token spending in your wallet, then click "Add Liquidity". Review all details, then approve the transaction. It usually confirms within 30-60 seconds.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">8</span>
                <h3 className="text-white font-semibold">Verify Your Pool</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                After confirmation, your liquidity pool is live! You'll receive LP tokens representing your share. Share the pool link with your community.
              </p>
            </div>
          </div>
        </section>

        {/* Managing Your Liquidity */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Managing Your Liquidity Pool</h2>
          <p className="mb-4">After creating your pool, you'll need to manage it. This includes monitoring performance, understanding impermanent loss, and potentially adding or removing liquidity over time.</p>
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400 text-sm font-semibold">⚠️ Understanding Impermanent Loss</p>
            <p className="text-zinc-400 text-sm mt-1">
              Impermanent loss occurs when the price of your token changes relative to SOL. If your token price increases significantly, you'll have less of it when you remove liquidity compared to just holding it. This is "impermanent" because it only becomes a real loss if you remove liquidity.
            </p>
          </div>
          <h3 className="text-white font-semibold mt-4 mb-3">Monitoring Your Pool</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li><span className="text-white">Price Tracking:</span> Monitor your token's price on Raydium</li>
            <li><span className="text-white">Pool Size:</span> Watch your pool's total value locked (TVL)</li>
            <li><span className="text-white">Trading Volume:</span> Higher volume means more trading fees</li>
            <li><span className="text-white">Holder Count:</span> Track how many wallets hold your token</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Best Practices for Liquidity Management</h2>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Start with Adequate Liquidity</h3>
              <p className="text-zinc-400 text-sm mt-1">Don't start with too little liquidity. Inadequate liquidity creates poor trading experience and high slippage.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🔒 Lock Your Liquidity</h3>
              <p className="text-zinc-400 text-sm mt-1">Consider locking your liquidity using services like Pump.fun. This shows commitment and prevents "rug pull" concerns.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Monitor and Adjust</h3>
              <p className="text-zinc-400 text-sm mt-1">Regularly monitor your pool's performance. If trading volume is high but liquidity is low, consider adding more.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Avoid Removing Liquidity Early</h3>
              <p className="text-zinc-400 text-sm mt-1">Removing liquidity shortly after launch looks unprofessional and can kill momentum. Plan to keep liquidity for at least the initial launch period.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How much liquidity should I add?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                A common starting point is 10-20 SOL worth of liquidity, but serious projects often add 50-200 SOL or more. Consider your token's supply and target price when calculating.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What's the difference between Raydium and Orca?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Raydium uses an AMM model and integrates with Serum DEX. Orca uses a concentrated liquidity model. Raydium is more popular for new tokens, while Orca offers better capital efficiency.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can I remove my liquidity later?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Yes, you can remove liquidity at any time. However, you'll receive back tokens based on the current pool ratio, which may differ from your initial deposit due to price changes and impermanent loss.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Should I lock my liquidity?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Locking liquidity is highly recommended for serious projects. It shows commitment and prevents "rug pull" concerns. Many successful projects lock liquidity for 6-12 months or longer.
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
