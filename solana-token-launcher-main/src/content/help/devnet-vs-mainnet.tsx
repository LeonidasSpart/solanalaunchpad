import Link from 'next/link';

export default function DevnetVsMainnetPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Getting Started</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Devnet vs <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Mainnet</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Understanding the difference between Solana Devnet and Mainnet helps you choose the right network for your needs.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What is Devnet? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What is Devnet?</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            <span className="text-white font-medium">Devnet</span> is a test network for Solana developers. It's designed for testing and experimentation with no real financial risk.
          </p>

          <h3 className="text-white font-semibold mt-4 mb-3">Devnet Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🪙 Free SOL</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Get test SOL from a faucet</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💎 No Real Value</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Tokens have no real monetary value</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🧪 Testing</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Perfect for learning and experimenting</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🛡️ Zero Risk</p>
              <p className="text-[#BDDBDB] text-sm mt-1">No financial loss if you make mistakes</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">How to Get Devnet SOL</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Visit a Solana faucet</p>
                <p className="text-[#BDDBDB] text-sm"><a href="https://faucet.solana.com" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">faucet.solana.com</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Enter your wallet address</p>
                <p className="text-[#BDDBDB] text-sm">Paste your public key</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Request test SOL</p>
                <p className="text-[#BDDBDB] text-sm">Click the request button</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Wait for confirmation</p>
                <p className="text-[#BDDBDB] text-sm">SOL will appear in your wallet</p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Mainnet? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What is Mainnet?</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            <span className="text-white font-medium">Mainnet</span> is the live Solana network where tokens have real value. This is where you deploy production tokens.
          </p>

          <h3 className="text-white font-semibold mt-4 mb-3">Mainnet Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💰 Real SOL</p>
              <p className="text-[#BDDBDB] text-sm mt-1">SOL has real monetary value</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📈 Real Tokens</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Tokens can be traded and have value</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🚀 Production</p>
              <p className="text-[#BDDBDB] text-sm mt-1">For serious projects and launches</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💸 Cost</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Transaction fees cost real SOL</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Mainnet Costs</h3>
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
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Base Token Creation</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Revoke Mint Authority</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Revoke Freeze Authority</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Revoke Update Authority</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#FF2D2D]/10">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm font-medium border border-[#1a1a1a]">Total (All Features)</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">0.60 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Use Each Network */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">When to Use Each Network</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Use Devnet For:</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Learning how to create tokens</li>
            <li>✅ Testing your token before launch</li>
            <li>✅ Experimenting with settings</li>
            <li>✅ No cost exploration</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Use Mainnet For:</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Launching a real project</li>
            <li>✅ Creating tokens with actual value</li>
            <li>✅ Trading on DEXs like Raydium</li>
            <li>✅ Building a community around your token</li>
          </ul>
        </section>

        {/* How to Switch Networks on ZRP */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Switch Networks on ZRP</h2>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Look for the Devnet/Mainnet toggle</p>
                <p className="text-[#BDDBDB] text-sm">Located in the header</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click to switch between networks</p>
                <p className="text-[#BDDBDB] text-sm">Toggle to your desired network</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Your wallet must be on the same network</p>
                <p className="text-[#BDDBDB] text-sm">Match the network in your wallet</p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section>
          <div className="bg-[#FF2D2D]/10 border-l-4 border-[#FF2D2D] rounded-r-xl p-6">
            <h2 className="text-white font-bold text-xl mb-2">⚠️ Important Note</h2>
            <p className="text-[#BDDBDB] text-sm">
              Devnet and Mainnet are <span className="text-white font-semibold">completely separate</span>. Tokens created on Devnet do not exist on Mainnet and cannot be transferred between networks.
            </p>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/create-token-guide" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 How to Create a Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Step-by-step token creation guide</p>
            </Link>
            <Link href="/help/pricing" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">💰 Pricing Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Understand all costs</p>
            </Link>
            <Link href="/help/transaction-signing" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">✍️ Transaction Signing</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How transactions work</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Test for free on Devnet or launch on Mainnet with confidence.
          </p>
          <a
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </a>
        </section>
      </div>
    </div>
  );
}
