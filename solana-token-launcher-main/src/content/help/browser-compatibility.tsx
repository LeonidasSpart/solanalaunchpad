import Link from 'next/link';

export default function BrowserCompatibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Troubleshooting</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Browser <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Compatibility</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          ZRP works best on modern browsers. This guide covers supported browsers and recommended settings.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Supported Browsers */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Supported Browsers</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Browser</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Support Level</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Chrome</td>
                  <td className="px-4 py-3 text-green-400 text-sm font-medium border border-[#1a1a1a]">✅ Fully supported</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Best experience</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Brave</td>
                  <td className="px-4 py-3 text-green-400 text-sm font-medium border border-[#1a1a1a]">✅ Fully supported</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Works well</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Firefox</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">✅ Good</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">May need updates</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Edge</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">✅ Good</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Chromium-based</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Safari</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">⚠️ Limited</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Some features may not work</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Wallet Compatibility */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Compatibility</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Wallet</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Chrome</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Brave</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Firefox</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Edge</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Safari</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Phantom</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm border border-[#1a1a1a]">⚠️</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Solflare</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm border border-[#1a1a1a]">⚠️</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Backpack</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-green-400 text-sm border border-[#1a1a1a]">✅</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm border border-[#1a1a1a]">⚠️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Recommended Settings */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Recommended Settings</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Chrome</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Update to the latest version</li>
            <li>Enable JavaScript</li>
            <li>Allow pop-ups for ZRP</li>
            <li>Clear cache regularly</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Brave</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Disable Shields for ZRP (if issues)</li>
            <li>Allow fingerprinting</li>
            <li>Enable all features</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Firefox</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Update to latest version</li>
            <li>Allow tracking</li>
            <li>Enable all features</li>
          </ul>
        </section>

        {/* Common Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Issues</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm">
                Error: No wallet found. Please install Phantom, Solflare, or Backpack.
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium">Solution:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Install the wallet extension</li>
                  <li>Refresh the page</li>
                  <li>Try again</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">"Site not loading"</h3>
              <div className="space-y-2 mt-2">
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Blank page</span>
                  <span className="text-white text-xs font-medium">Clear cache</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Slow loading</span>
                  <span className="text-white text-xs font-medium">Check internet</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Errors</span>
                  <span className="text-white text-xs font-medium">Try incognito mode</span>
                </div>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">"Features not working"</h3>
              <div className="space-y-2 mt-2">
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Buttons not working</span>
                  <span className="text-white text-xs font-medium">Refresh page</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Transactions failing</span>
                  <span className="text-white text-xs font-medium">Check wallet</span>
                </div>
                <div className="bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                  <span className="text-[#BDDBDB] text-sm">Display issues</span>
                  <span className="text-white text-xs font-medium">Update browser</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Support */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Mobile Support</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Mobile Browsers</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Chrome Mobile</span>
              <span className="text-green-400 text-sm font-medium">✅ Good</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Safari Mobile</span>
              <span className="text-yellow-500 text-sm font-medium">⚠️ Limited</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Brave Mobile</span>
              <span className="text-green-400 text-sm font-medium">✅ Good</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Mobile Wallets</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Phantom</span>
              <span className="text-green-400 text-sm font-medium">✅ Full</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Solflare</span>
              <span className="text-green-400 text-sm font-medium">✅ Full</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Backpack</span>
              <span className="text-green-400 text-sm font-medium">✅ Full</span>
            </div>
          </div>
        </section>

        {/* Tips for Best Experience */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Tips for Best Experience</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Desktop</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Use Chrome or Brave</li>
            <li>✅ Keep browser updated</li>
            <li>✅ Install wallet extension</li>
            <li>✅ Enable JavaScript</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Mobile</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Use Phantom or Solflare app</li>
            <li>✅ Use in-app browser</li>
            <li>✅ Keep apps updated</li>
          </ul>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Troubleshooting</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Update Browser</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Go to browser settings</li>
            <li>Check for updates</li>
            <li>Install updates</li>
            <li>Restart browser</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Clear Cache</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Go to browser settings</li>
            <li>Clear cache and cookies</li>
            <li>Restart browser</li>
            <li>Try again</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Try Incognito</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Open incognito/private mode</li>
            <li>Go to ZRP</li>
            <li>Connect wallet</li>
            <li>Test functionality</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 4: Try Different Browser</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Install another browser</li>
            <li>Go to ZRP</li>
            <li>Connect wallet</li>
            <li>Test functionality</li>
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
            <Link href="/help/troubleshooting-connection-issues" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔧 Troubleshooting Connection Issues</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Fix common connection problems</p>
            </Link>
            <Link href="/help/supported-wallets" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">💼 Supported Wallets</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">All wallets that work with ZRP</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            With the right browser, you can launch your token in seconds.
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
