import Link from 'next/link';

export default function TroubleshootingConnectionIssuesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Troubleshooting</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Troubleshooting <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Connection Issues</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Having trouble connecting your wallet to ZRP? Here's how to fix common issues.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Common Connection Problems */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Connection Problems</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Problem</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Likely Cause</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Wallet not showing</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Extension not detected</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">Refresh page</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Connection fails</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Wallet locked</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">Unlock wallet</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Network mismatch</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Wrong Solana network</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">Switch network</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">RPC error</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Connection timeout</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">Check RPC settings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Fixes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Quick Fixes</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">1. Refresh the Page</h3>
          <p className="text-[#BDDBDB] text-sm mb-2">Sometimes the simplest fix works best:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Press <span className="text-white font-mono">Ctrl+R</span> or <span className="text-white font-mono">Cmd+R</span></li>
            <li>Wait for page to reload</li>
            <li>Try connecting again</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">2. Unlock Your Wallet</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Click the wallet extension icon</li>
            <li>Enter your password</li>
            <li>Try connecting again</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">3. Check Your Network</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Open your wallet</li>
            <li>Check the network (Devnet/Mainnet)</li>
            <li>Match the network on ZRP</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">4. Clear Browser Cache</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Go to browser settings</li>
            <li>Clear cache and cookies</li>
            <li>Restart browser</li>
            <li>Try again</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">5. Try a Different Browser</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Chrome</span>
              <span className="text-green-400 font-medium">✅ Best</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Brave</span>
              <span className="text-green-400 font-medium">✅ Good</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Firefox</span>
              <span className="text-green-400 font-medium">✅ Good</span>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Safari</span>
              <span className="text-yellow-400 font-medium">⚠️ Limited</span>
            </div>
          </div>
        </section>

        {/* Wallet-Specific Fixes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Wallet-Specific Fixes</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Phantom</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Check extension</span> — Is it up to date?</li>
            <li><span className="text-white font-medium">Try incognito</span> — Open Chrome incognito</li>
            <li><span className="text-white font-medium">Disable other extensions</span> — They may conflict</li>
            <li><span className="text-white font-medium">Reinstall</span> — Uninstall then reinstall</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Solflare</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Check settings</span> — Ensure Solflare is active</li>
            <li><span className="text-white font-medium">Browser compatibility</span> — Try Chrome</li>
            <li><span className="text-white font-medium">Clear cache</span> — Clear browser cache</li>
            <li><span className="text-white font-medium">Use the app</span> — Try the mobile app</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Backpack</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Check connection</span> — Is Backpack connected to Solana?</li>
            <li><span className="text-white font-medium">Update app</span> — Make sure you have the latest version</li>
            <li><span className="text-white font-medium">Reconnect</span> — Try reconnecting</li>
          </ul>
        </section>

        {/* Error Messages */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Error Messages</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                No wallet found. Please install Phantom, Solflare, or Backpack.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Install a wallet extension.</p>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Failed to connect to wallet. Please try again.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Check your wallet and try again.</p>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Network mismatch. Please switch to Devnet/Mainnet.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Switch your wallet to the correct network.</p>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Transaction rejected by user.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Approve the transaction in your wallet.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Still Having Issues? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Still Having Issues?</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Try This Checklist</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Wallet installed and unlocked</li>
            <li>✅ Correct network selected</li>
            <li>✅ Browser updated</li>
            <li>✅ Cache cleared</li>
            <li>✅ No other wallet extensions conflicting</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Contact Support</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">If you've tried everything:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><Link href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition">Contact us</Link></li>
            <li>Include:
              <ul className="list-disc pl-5 mt-1">
                <li>Wallet type</li>
                <li>Browser</li>
                <li>Error message</li>
                <li>Steps you've tried</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/connecting-your-wallet" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔗 Connecting Your Wallet</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Step-by-step connection guide</p>
            </Link>
            <Link href="/help/supported-wallets" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">💼 Supported Wallets</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">All wallets that work with ZRP</p>
            </Link>
            <Link href="/help/wallet-security-best-practices" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Wallet Security Best Practices</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Keep your wallet safe</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Once connected, you can launch your token in seconds.
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
