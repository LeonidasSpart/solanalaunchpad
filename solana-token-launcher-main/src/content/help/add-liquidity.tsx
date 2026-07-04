import Link from 'next/link';

export default function AddingLiquidityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">After Token Creation</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Adding <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Liquidity</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          To make your token tradeable, you need to add liquidity on a DEX like Raydium. This guide explains how.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What Is Liquidity? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Is Liquidity?</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Liquidity</span>
              <span className="text-white text-sm font-medium">How easily a token can be traded</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Liquidity Pool</span>
              <span className="text-white text-sm font-medium">A pair of tokens held in a smart contract</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">LP Token</span>
              <span className="text-white text-sm font-medium">Proof of your share in the pool</span>
            </div>
          </div>
        </section>

        {/* Why Add Liquidity? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Add Liquidity?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📊 Enables Trading</p>
              <p className="text-[#BDDBDB] text-sm mt-1">People can buy and sell your token</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📈 Price Discovery</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Market determines the price</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Builds Trust</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Shows you're serious</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">👥 Attracts Holders</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Traders prefer liquid tokens</p>
            </div>
          </div>
        </section>

        {/* How Much Liquidity to Add */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How Much Liquidity to Add</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Small/Testing</span>
              <span className="text-white text-sm font-medium">5-10 SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Standard Launch</span>
              <span className="text-white text-sm font-medium">20-50 SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Serious Project</span>
              <span className="text-white text-sm font-medium">100-500+ SOL</span>
            </div>
          </div>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">💡 Tip</p>
            <p className="text-[#BDDBDB] text-sm mt-1">You need equal value of your token and SOL.</p>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Step-by-Step Guide</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Get Your Token Ready</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Make sure you have enough tokens</li>
            <li>Have SOL for the pair</li>
            <li>Have extra SOL for fees</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Go to Raydium</h3>
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
                <p className="text-white text-sm font-medium">Click "Connect Wallet"</p>
                <p className="text-[#BDDBDB] text-sm">Connect your wallet</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Select your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Choose your wallet</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the connection</p>
                <p className="text-[#BDDBDB] text-sm">Confirm in your wallet</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Navigate to Liquidity</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Click <span className="text-white font-medium">"Liquidity"</span> in the top menu</li>
            <li>Click <span className="text-white font-medium">"Create Pool"</span> or <span className="text-white font-medium">"Add Liquidity"</span></li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 4: Select Your Token</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>First token: <span className="text-white font-medium">SOL</span> (or WSOL)</li>
            <li>Second token: <span className="text-white font-medium">Your token's mint address</span></li>
            <li>Paste your token's mint address</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 5: Set Initial Price</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">The price is determined by the ratio of SOL to tokens:</p>
          <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-sm">
            <span className="text-[#FF2D2D]">Example:</span> 10 SOL + 100,000 tokens = 0.0001 SOL per token
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 6: Add Liquidity</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Enter the amount of SOL</p>
                <p className="text-[#BDDBDB] text-sm">How much SOL you want to add</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Raydium will calculate tokens needed</p>
                <p className="text-[#BDDBDB] text-sm">Automatically calculated</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Add Liquidity"</p>
                <p className="text-[#BDDBDB] text-sm">Submit the transaction</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Approve transactions in your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Confirm in your wallet</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 7: Lock Liquidity (Recommended)</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">Locking liquidity prevents you from removing it:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>After adding liquidity, you receive LP tokens</li>
            <li>Lock these LP tokens using a locking service</li>
            <li>This builds trust with holders</li>
          </ul>
        </section>

        {/* Using ZRP's Add Liquidity Tool */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Using ZRP's Add Liquidity Tool</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Enter Token Mint</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to Add Liquidity</p>
                <p className="text-[#BDDBDB] text-sm">Visit <Link href="/add-liquidity" className="text-[#FF2D2D] hover:text-[#B10000] transition">/add-liquidity</Link></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Enter your token's mint address</p>
                <p className="text-[#BDDBDB] text-sm">Paste your token address</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Set Amounts</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Enter SOL amount</li>
            <li>Enter token amount</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Open Raydium</h3>
          <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
            <span className="text-[#FF2D2D] text-sm font-bold">1</span>
            <div>
              <p className="text-white text-sm font-medium">Click "Add Liquidity on Raydium"</p>
              <p className="text-[#BDDBDB] text-sm">Raydium opens with your token pre-filled</p>
            </div>
          </div>
        </section>

        {/* Common Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Issues</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Insufficient Balance</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Make sure you have enough SOL and tokens.</p>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Transaction Fails</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Check your SOL balance for fees.</p>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Price Too High/Low</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Adjust the ratio of SOL to tokens.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/liquidity-guide" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📖 Liquidity Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete liquidity guide</p>
            </Link>
            <Link href="/help/token-parameters-explained" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">⚙️ Token Parameters Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Understanding token parameters</p>
            </Link>
            <Link href="/help/dex-comparison" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📊 DEX Comparison</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Compare DEX options</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Add liquidity and make your token tradeable today.
          </p>
          <a
            href="/add-liquidity"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Add Liquidity
          </a>
        </section>
      </div>
    </div>
  );
}
