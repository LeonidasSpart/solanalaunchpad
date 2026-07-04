import Link from 'next/link';

export default function InsufficientSOLBalancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Troubleshooting</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Insufficient <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">SOL Balance</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Running out of SOL is a common issue. This guide explains why you need SOL and how to get it.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Why You Need SOL */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why You Need SOL</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">On Devnet</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Use</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Amount Needed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Transaction fees</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.000005 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Account rent</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.002 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Network fees</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.001 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#FF2D2D]/10">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm font-medium border border-[#1a1a1a]">Total</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">~0.01 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">On Mainnet</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Use</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Amount Needed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Transaction fees</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.000005 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Account rent</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.002 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Platform fee</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.15-0.45 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Network fees</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">~0.01 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#FF2D2D]/10">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm font-medium border border-[#1a1a1a]">Total</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">0.2-0.6 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Getting SOL */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Getting SOL</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">On Devnet (Free)</h3>

          <h4 className="text-white font-medium mt-3 mb-2">Option 1: Solana Faucet</h4>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to Solana Faucet</p>
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
                <p className="text-white text-sm font-medium">Click "Request Airdrop"</p>
                <p className="text-[#BDDBDB] text-sm">Wait for confirmation</p>
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

          <h4 className="text-white font-medium mt-3 mb-2">Option 2: ZRP Devnet Testing</h4>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Use Devnet on ZRP</li>
            <li>No SOL required</li>
            <li>Token creation is free</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">On Mainnet (Real SOL)</h3>

          <h4 className="text-white font-medium mt-3 mb-2">Option 1: Buy SOL</h4>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Create an account on an exchange</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <a href="https://coinbase.com" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] text-sm transition">Coinbase</a>
                  <span className="text-[#BDDBDB] text-sm">•</span>
                  <a href="https://binance.com" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] text-sm transition">Binance</a>
                  <span className="text-[#BDDBDB] text-sm">•</span>
                  <a href="https://kraken.com" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] text-sm transition">Kraken</a>
                </div>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Buy SOL</p>
                <p className="text-[#BDDBDB] text-sm">Purchase using fiat or other crypto</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Withdraw to your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Send SOL to your wallet address</p>
              </div>
            </div>
          </div>

          <h4 className="text-white font-medium mt-3 mb-2">Option 2: Swap for SOL</h4>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Use Jupiter</p>
                <p className="text-[#BDDBDB] text-sm"><a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">jup.ag</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Swap other tokens for SOL</p>
                <p className="text-[#BDDBDB] text-sm">Trade for SOL</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Receive SOL in your wallet</p>
                <p className="text-[#BDDBDB] text-sm">SOL will appear in your wallet</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Much SOL You Need */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How Much SOL You Need</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Token Creation</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Devnet Testing</span>
              <span className="text-green-400 font-medium">0 SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Mainnet Basic</span>
              <span className="text-white font-medium">0.15 SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Mainnet All Revocations</span>
              <span className="text-white font-medium">0.60 SOL</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Adding Liquidity</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Small Launch</span>
              <span className="text-white font-medium">5-10 SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Standard Launch</span>
              <span className="text-white font-medium">20-50 SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Large Launch</span>
              <span className="text-white font-medium">100+ SOL</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Airdrops</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">10 recipients</span>
              <span className="text-white font-medium">~0.00005 SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">100 recipients</span>
              <span className="text-white font-medium">~0.0005 SOL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">1,000 recipients</span>
              <span className="text-white font-medium">~0.005 SOL</span>
            </div>
          </div>
        </section>

        {/* Checking Your Balance */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Checking Your Balance</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">In Your Wallet</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Phantom</span>
              <span className="text-white text-sm font-medium">Open app → See balance</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Solflare</span>
              <span className="text-white text-sm font-medium">Open app → See balance</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Backpack</span>
              <span className="text-white text-sm font-medium">Open app → See balance</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">On Solscan</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to Solscan</p>
                <p className="text-[#BDDBDB] text-sm"><a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">solscan.io</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Search your wallet address</p>
                <p className="text-[#BDDBDB] text-sm">Paste your public key</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">See your SOL balance</p>
                <p className="text-[#BDDBDB] text-sm">View your current balance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Tips</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">On Devnet</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Use the faucet</li>
            <li>✅ Request test SOL</li>
            <li>✅ No real cost</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">On Mainnet</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Plan ahead</li>
            <li>✅ Budget 0.5-1 SOL</li>
            <li>✅ Always have extra</li>
          </ul>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Troubleshooting</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Faucet Not Working</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solutions:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Try a different faucet:
                    <ul className="list-disc pl-5 mt-1">
                      <li><a href="https://faucet.solana.com" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">Solana Faucet</a></li>
                      <li><a href="https://faucet.helius.dev" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">Helius Faucet</a></li>
                    </ul>
                  </li>
                  <li>Check your wallet address</li>
                  <li>Wait 24 hours (rate limited)</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">SOL Not Showing</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solutions:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Refresh your wallet</li>
                  <li>Check the correct network</li>
                  <li>Wait for confirmation</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Insufficient Balance Error</h3>
              <div className="bg-[#050505]/40 rounded-lg p-3 mt-2 border border-[#1a1a1a]">
                <p className="text-white text-sm font-medium">Solutions:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Check your balance</li>
                  <li>Add more SOL</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/transaction-failed" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❌ Transaction Failed</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Troubleshoot transaction errors</p>
            </Link>
            <Link href="/help/rpc-errors" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔌 RPC Connection Errors</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Fix connection issues</p>
            </Link>
            <Link href="/help/devnet-vs-mainnet" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🧪 Devnet vs Mainnet</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Choose the right network</p>
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
