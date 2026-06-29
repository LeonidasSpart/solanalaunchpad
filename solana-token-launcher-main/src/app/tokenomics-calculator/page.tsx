// src/app/tokenomics-calculator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TokenomicsCalculatorPage() {
  // State for calculator inputs
  const [totalSupply, setTotalSupply] = useState<number>(1000000);
  const [targetPrice, setTargetPrice] = useState<number>(0.01);
  const [publicAllocation, setPublicAllocation] = useState<number>(30);
  const [teamAllocation, setTeamAllocation] = useState<number>(15);
  const [treasuryAllocation, setTreasuryAllocation] = useState<number>(25);
  const [liquidityAllocation, setLiquidityAllocation] = useState<number>(20);
  const [communityAllocation, setCommunityAllocation] = useState<number>(10);

  // Derived state
  const [marketCap, setMarketCap] = useState<number>(0);
  const [circulatingSupply, setCirculatingSupply] = useState<number>(0);
  const [allocations, setAllocations] = useState<{ name: string; amount: number; percentage: number }[]>([]);

  // Recalculate when inputs change
  useEffect(() => {
    const total = totalSupply;
    const price = targetPrice;

    // Calculate market cap based on circulating supply
    const circulating = total * ((publicAllocation + liquidityAllocation + communityAllocation) / 100);
    const mc = circulating * price;

    setMarketCap(mc);
    setCirculatingSupply(circulating);

    // Build allocations array
    const allocs = [
      { name: 'Public Launch', amount: total * (publicAllocation / 100), percentage: publicAllocation },
      { name: 'Team & Advisors', amount: total * (teamAllocation / 100), percentage: teamAllocation },
      { name: 'Development & Treasury', amount: total * (treasuryAllocation / 100), percentage: treasuryAllocation },
      { name: 'Liquidity', amount: total * (liquidityAllocation / 100), percentage: liquidityAllocation },
      { name: 'Community Rewards', amount: total * (communityAllocation / 100), percentage: communityAllocation },
    ];
    setAllocations(allocs);
  }, [totalSupply, targetPrice, publicAllocation, teamAllocation, treasuryAllocation, liquidityAllocation, communityAllocation]);

  // Handle slider changes
  const handleSliderChange = (setter: (value: number) => void, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) setter(num);
  };

  // Format number
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Tokenomics Calculator</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Tokenomics Calculator: <br className="hidden sm:block" />
          <span className="text-purple-400">Design Your Token Economics</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Design effective tokenomics for your Solana token. Calculate supply, distribution, market cap, and plan your token economics with this comprehensive calculator and guide.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-8">
        {/* Calculator */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Tokenomics Calculator</h2>

          {/* Supply and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-white text-sm font-medium block mb-2">Total Supply</label>
              <input
                type="number"
                value={totalSupply}
                onChange={(e) => setTotalSupply(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium block mb-2">Target Price (USD)</label>
              <input
                type="number"
                step="0.0001"
                value={targetPrice}
                onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Distribution Allocation */}
          <h3 className="text-lg font-semibold text-white mb-4">Distribution Allocation</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Public Launch</span>
                <span className="text-purple-400 font-medium">{publicAllocation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={publicAllocation}
                onChange={(e) => handleSliderChange(setPublicAllocation, e.target.value)}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Team & Advisors</span>
                <span className="text-purple-400 font-medium">{teamAllocation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={teamAllocation}
                onChange={(e) => handleSliderChange(setTeamAllocation, e.target.value)}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Development & Treasury</span>
                <span className="text-purple-400 font-medium">{treasuryAllocation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={treasuryAllocation}
                onChange={(e) => handleSliderChange(setTreasuryAllocation, e.target.value)}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Liquidity</span>
                <span className="text-purple-400 font-medium">{liquidityAllocation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={liquidityAllocation}
                onChange={(e) => handleSliderChange(setLiquidityAllocation, e.target.value)}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Community Rewards</span>
                <span className="text-purple-400 font-medium">{communityAllocation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={communityAllocation}
                onChange={(e) => handleSliderChange(setCommunityAllocation, e.target.value)}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 bg-black/40 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-4">Calculated Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 rounded-lg p-4 text-center border border-zinc-800">
                <p className="text-zinc-400 text-xs uppercase tracking-wider">Market Cap</p>
                <p className="text-2xl font-bold text-purple-400">${formatNumber(marketCap)}</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-4 text-center border border-zinc-800">
                <p className="text-zinc-400 text-xs uppercase tracking-wider">Circulating Supply</p>
                <p className="text-2xl font-bold text-white">{formatNumber(circulatingSupply)}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {allocations.map((alloc) => (
                <div key={alloc.name} className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">{alloc.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium">{formatNumber(alloc.amount)}</span>
                    <span className="text-purple-400 font-medium w-12 text-right">{alloc.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-4">Understanding Tokenomics Basics</h2>
          <p className="text-zinc-400 text-sm">
            Tokenomics refers to the economic design of your token. It includes total supply, distribution, utility, incentives, and economic flows. Good tokenomics create sustainable value and align incentives between creators, holders, and users.
          </p>

          <h3 className="text-white font-semibold mt-4 mb-2">Key Components</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-sm">
            <li><span className="text-white">Total Supply:</span> The maximum number of tokens that will ever exist</li>
            <li><span className="text-white">Distribution:</span> How tokens are allocated across different stakeholders</li>
            <li><span className="text-white">Utility:</span> What the token is used for and why people need it</li>
            <li><span className="text-white">Vesting:</span> Time-locked releases of tokens to prevent dumping</li>
            <li><span className="text-white">Incentives:</span> Mechanisms that reward desired behaviors</li>
          </ul>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">⚠️ Why Design Matters</p>
            <p className="text-zinc-400 text-sm mt-1">
              Poor tokenomics lead to failed projects. Common failures include: too much supply (inflation), unfair distribution (lack of trust), no utility (no value), and poor vesting (dumping). Well-designed tokenomics create sustainable ecosystems.
            </p>
          </div>

          <div className="mt-4">
            <Link href="/tokenomics" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition">
              Learn more in our comprehensive tokenomics guide →
            </Link>
          </div>
        </div>

        {/* Distribution Strategies */}
        <div className="border-t border-zinc-800 pt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Distribution Strategies</h2>

          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">⚖️ Fair Launch Model</h3>
              <p className="text-zinc-400 text-sm mt-1">All tokens available from launch. No presale, no team allocation. Creates maximum fairness but requires strong initial marketing. Best for community-driven projects.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">💰 Presale Model</h3>
              <p className="text-zinc-400 text-sm mt-1">Sell portion of tokens before launch. Provides funding and builds community. Requires careful planning and legal compliance. See our <Link href="/distribution" className="text-purple-400 hover:underline">distribution guide</Link> for details.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">💧 Liquidity Allocation</h3>
              <p className="text-zinc-400 text-sm mt-1">Typically 20-40% of supply goes to liquidity pools. This ensures trading availability and price stability. Too little creates high slippage, too much can dilute value.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="border-t border-zinc-800 pt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What is a good token supply?</h3>
              <p className="text-zinc-400 text-sm mt-1">Common ranges are 1 million to 1 billion tokens. Smaller supplies create scarcity, larger supplies allow micro-transactions. Most successful tokens use supplies between 1 million and 100 million.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How should I distribute tokens?</h3>
              <p className="text-zinc-400 text-sm mt-1">Common allocations: 20-40% for liquidity, 10-20% for team (vested), 20-30% for community/airdrop, 10-20% for treasury, 10-20% for marketing. Avoid keeping too much (over 50%).</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What percentage should go to liquidity?</h3>
              <p className="text-zinc-400 text-sm mt-1">Typically 20-40% of total supply. Start with 30% as a good baseline to ensure adequate trading liquidity and price stability.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How long should vesting be?</h3>
              <p className="text-zinc-400 text-sm mt-1">Team tokens typically vest over 12-48 months with a 6-12 month cliff. Treasury tokens may vest over 24-60 months. Longer vesting periods show commitment and reduce sell pressure.</p>
            </div>
          </div>
        </div>

        {/* Ready to Launch */}
        <section className="text-center border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            No coding required. Live on mainnet in under 60 seconds.
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
