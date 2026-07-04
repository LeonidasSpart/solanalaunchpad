import Link from 'next/link';

export default function AirdropDistributionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">After Token Creation</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Airdrop <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Distribution</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Airdrops are a great way to distribute tokens to your community. ZRP makes it easy.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What Is an Airdrop? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Is an Airdrop?</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Airdrop</span>
              <span className="text-white text-sm font-medium">Free distribution of tokens to multiple wallets</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Recipients</span>
              <span className="text-white text-sm font-medium">Wallets that receive tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Distribution</span>
              <span className="text-white text-sm font-medium">Sending tokens to all recipients</span>
            </div>
          </div>
        </section>

        {/* Why Airdrop? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Airdrop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">👥 Build Community</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Get tokens to supporters</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">⭐ Reward Early Users</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Incentivize early adoption</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🌍 Decentralize</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Spread tokens widely</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📢 Create Buzz</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Generate excitement</p>
            </div>
          </div>
        </section>

        {/* Using ZRP's Airdrop Tool */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Using ZRP's Airdrop Tool</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Connect Your Wallet</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to Airdrop Tool</p>
                <p className="text-[#BDDBDB] text-sm">Visit <Link href="/airdrop" className="text-[#FF2D2D] hover:text-[#B10000] transition">/airdrop</Link></p>
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

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Enter Token Details</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Mint Address</p>
                <p className="text-[#BDDBDB] text-sm">Your token's address</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Amount Per Wallet</p>
                <p className="text-[#BDDBDB] text-sm">Tokens per recipient</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Add Wallet Addresses</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">You can add wallet addresses by:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Pasting a list (one per line)</li>
            <li>Uploading a CSV file</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 4: Review Summary</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">The tool will show:</p>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Recipients</span>
              <span className="text-white text-sm font-medium">Number of wallets</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Per Wallet</span>
              <span className="text-white text-sm font-medium">Tokens each receives</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Total</span>
              <span className="text-white text-sm font-medium">Total tokens being sent</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 5: Send Airdrop</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Send Airdrop"</p>
                <p className="text-[#BDDBDB] text-sm">Initiate the distribution</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the transaction in your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Confirm in your wallet</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Wait for confirmation</p>
                <p className="text-[#BDDBDB] text-sm">Tokens are sent to recipients</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preparing Wallet Lists */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Preparing Wallet Lists</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Format</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">Each wallet address on a new line:</p>
          <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-xs whitespace-pre-wrap">
BJMofY12nKLjnZ3RSn8RKXEUMcwHWuxYf6Hnsc2ozvp3
9uKJ7Z7TqFzXfnNPTtNFLfzvKjp8Zrx9tNPbqk9yRwjD
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Upload CSV</h3>
          <p className="text-[#BDDBDB] text-sm">Create a CSV file with one address per row.</p>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Best Practices</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Verify addresses</span>
              <span className="text-white text-sm font-medium">Avoid losing tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Start small</span>
              <span className="text-white text-sm font-medium">Test with a few wallets first</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Monitor transactions</span>
              <span className="text-white text-sm font-medium">Check for failures</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Communicate</span>
              <span className="text-white text-sm font-medium">Tell recipients about the airdrop</span>
            </div>
          </div>
        </section>

        {/* Costs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Costs</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Item</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">SOL Fees</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.000005 SOL per transaction</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Token Transfer</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">No additional cost</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Fee Example</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Recipients</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Estimated SOL Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">10</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.00005 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">100</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.0005 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">1,000</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.005 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Airdrop Strategies */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Airdrop Strategies</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Community Rewards</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Airdrop to early supporters</li>
            <li>✅ Reward active community members</li>
            <li>✅ Incentivize referrals</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Fair Launch</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Distribute tokens widely</li>
            <li>✅ Prevent concentration</li>
            <li>✅ Build trust</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Marketing Campaigns</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Airdrop to targeted wallets</li>
            <li>✅ Generate buzz</li>
            <li>✅ Increase awareness</li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/distribution" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📊 Distribution Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete distribution guide</p>
            </Link>
            <Link href="/help/community-guide" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">👥 Community Building</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Build your community</p>
            </Link>
            <Link href="/help/marketing" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📢 Marketing Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Promote your token effectively</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Distribute Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Airdrop your tokens and grow your community today.
          </p>
          <a
            href="/airdrop"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Start Airdrop
          </a>
        </section>
      </div>
    </div>
  );
}
