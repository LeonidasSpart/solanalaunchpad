import Link from 'next/link';

export default function RPCConnectionErrorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Troubleshooting</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          RPC Connection <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Errors</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          RPC errors can occur when your app can't connect to the Solana network. This guide explains why and how to fix them.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What Is RPC? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Is RPC?</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">RPC</span>
              <span className="text-white text-sm font-medium">Remote Procedure Call</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Purpose</span>
              <span className="text-white text-sm font-medium">Connects your app to Solana</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Required</span>
              <span className="text-white text-sm font-medium">For all blockchain interactions</span>
            </div>
          </div>
        </section>

        {/* Common RPC Errors */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common RPC Errors</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Connection closed unexpectedly
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Cause:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">RPC endpoint is slow or unavailable.</p>
                <p className="text-white text-sm font-medium mt-2">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Refresh the page</li>
                  <li>Try again later</li>
                  <li>Check your internet</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: 502 Bad Gateway
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Cause:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">The RPC service is having issues.</p>
                <p className="text-white text-sm font-medium mt-2">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Wait a few minutes</li>
                  <li>Try again</li>
                  <li>Contact support if persistent</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Rate limit exceeded
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Cause:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">Too many requests in a short time.</p>
                <p className="text-white text-sm font-medium mt-2">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Wait a few minutes</li>
                  <li>Reduce request frequency</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: Request timed out
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Cause:</p>
                <p className="text-[#BDDBDB] text-sm mt-1">RPC is taking too long to respond.</p>
                <p className="text-white text-sm font-medium mt-2">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Refresh the page</li>
                  <li>Try again</li>
                  <li>Check your connection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why RPC Errors Happen */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why RPC Errors Happen</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">1. Network Congestion</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Solana network is busy</li>
            <li>Too many transactions</li>
            <li>RPC can't keep up</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">2. RPC Provider Issues</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Free tier limits</li>
            <li>Rate limiting</li>
            <li>Provider downtime</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">3. Your Connection</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Slow internet</li>
            <li>Firewall issues</li>
            <li>VPN interference</li>
          </ul>
        </section>

        {/* How to Fix */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Fix</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Quick Fixes</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">1</span>
              <span className="text-white text-sm font-medium">Refresh the page</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">2</span>
              <span className="text-white text-sm font-medium">Wait 30 seconds</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">3</span>
              <span className="text-white text-sm font-medium">Try again</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">4</span>
              <span className="text-white text-sm font-medium">Check internet</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Advanced Fixes</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">1</span>
              <span className="text-white text-sm font-medium">Clear browser cache</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">2</span>
              <span className="text-white text-sm font-medium">Try incognito mode</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">3</span>
              <span className="text-white text-sm font-medium">Use different browser</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">4</span>
              <span className="text-white text-sm font-medium">Check firewall settings</span>
            </div>
          </div>
        </section>

        {/* Prevention Tips */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Prevention Tips</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">1. Use Reliable RPC</h3>
          <p className="text-[#BDDBDB] text-sm mb-2">ZRP uses multiple RPC endpoints:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Helius</li>
            <li>Public Solana RPC</li>
            <li>Fallback providers</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">2. Limit Requests</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Avoid refreshing too often</li>
            <li>Wait between actions</li>
            <li>Let transactions complete</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">3. Stable Connection</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Use a stable internet connection</li>
            <li>Avoid VPNs (if possible)</li>
            <li>Ensure low latency</li>
          </ul>
        </section>

        {/* What ZRP Does */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What ZRP Does</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Multiple RPC Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🔵 Helius</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Primary RPC</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🟢 Public</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Fallback</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🟣 Additional</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Load balancing</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Auto-Fallback</h3>
          <p className="text-[#BDDBDB] text-sm mb-4">If one RPC fails, ZRP automatically tries another.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Retry Logic</h3>
          <p className="text-[#BDDBDB] text-sm">Failed requests are automatically retried.</p>
        </section>

        {/* Common Solutions */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Solutions</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">If Error Persists</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Refresh the page</p>
                <p className="text-[#BDDBDB] text-sm">Start fresh</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Reconnect your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Re-establish connection</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Try a different network</p>
                <p className="text-[#BDDBDB] text-sm">Switch between Devnet/Mainnet</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Wait a few minutes</p>
                <p className="text-[#BDDBDB] text-sm">Network may be congested</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">5</span>
              <div>
                <p className="text-white text-sm font-medium">Contact support</p>
                <p className="text-[#BDDBDB] text-sm">If problem persists</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">For Developers</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Use multiple RPC endpoints</li>
            <li>Implement retry logic</li>
            <li>Add timeouts</li>
            <li>Monitor RPC health</li>
          </ul>
        </section>

        {/* Contact Support */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contact Support</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">If RPC errors persist:</p>
          <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
            <ol className="list-decimal pl-5 text-[#BDDBDB] text-sm space-y-1">
              <li><Link href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition">Contact us</Link></li>
              <li>Include:
                <ul className="list-disc pl-5 mt-1">
                  <li>Error message</li>
                  <li>What you were doing</li>
                  <li>Time of error</li>
                  <li>Browser information</li>
                </ul>
              </li>
            </ol>
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
            <Link href="/help/connection-issues" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔗 Connection Issues</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">General connection troubleshooting</p>
            </Link>
            <Link href="/help/insufficient-sol" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 Insufficient SOL Balance</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">SOL balance issues</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            ZRP handles RPC errors automatically so you can focus on building.
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
