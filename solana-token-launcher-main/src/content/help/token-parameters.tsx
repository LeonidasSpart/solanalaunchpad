import Link from 'next/link';

export default function TokenParametersExplainedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Creating Tokens</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Token Parameters <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Explained</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Understand the key parameters for creating a Solana token.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Name */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Name</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Max Length</span>
              <span className="text-white font-medium">32 characters</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Examples</span>
              <span className="text-white font-mono text-sm">"Pepe Coin", "Solana Cat"</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Best Practice</span>
              <span className="text-white font-medium">Memorable, relevant, unique</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Tips</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Keep it simple and easy to remember</li>
            <li>Avoid special characters or emojis</li>
            <li>Make it relevant to your project</li>
          </ul>
        </section>

        {/* Symbol (Ticker) */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Symbol (Ticker)</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Max Length</span>
              <span className="text-white font-medium">10 characters</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Examples</span>
              <span className="text-white font-mono text-sm">"PEPE", "CAT", "MPT"</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Best Practice</span>
              <span className="text-white font-medium">3-5 letters, uppercase</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Tips</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Use uppercase letters</li>
            <li>Keep it short (3-5 letters)</li>
            <li>Make it easy to type and remember</li>
          </ul>
        </section>

        {/* Total Supply */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Total Supply</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Type</span>
              <span className="text-white font-medium">Positive integer</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Examples</span>
              <span className="text-white font-mono text-sm">1,000,000,000</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Best Practice</span>
              <span className="text-white font-medium">Depends on token type</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Guidelines by Token Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🎭 Meme Coin</p>
              <p className="text-[#BDDBDB] text-sm mt-1">1,000,000,000</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Large for viral distribution</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">⚡ Utility Token</p>
              <p className="text-[#BDDBDB] text-sm mt-1">10,000,000</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Controlled for tokenomics</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🏛️ Governance DAO</p>
              <p className="text-[#BDDBDB] text-sm mt-1">100,000,000</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Enough for voting weight</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🧪 Simple Token</p>
              <p className="text-[#BDDBDB] text-sm mt-1">1,000,000</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Small for testing</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Considerations</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-yellow-500">⚠️ Too high</span> → Each token has less value</li>
            <li><span className="text-yellow-500">⚠️ Too low</span> → Not enough for distribution</li>
            <li><span className="text-green-400">✅ Fixed supply</span> → Revoke mint authority</li>
          </ul>
        </section>

        {/* Decimals */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Decimals</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Range</span>
              <span className="text-white font-medium">0-9</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Default</span>
              <span className="text-white font-medium">9</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Example</span>
              <span className="text-white font-mono text-sm">6 = 0.000001 divisible</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">0</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Memecoins</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-[#050505] text-[#BDDBDB] text-xs border border-[#1a1a1a] rounded">1,000,000</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">6</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Utility tokens</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-[#050505] text-[#BDDBDB] text-xs border border-[#1a1a1a] rounded">1.000000</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
              <p className="text-white font-semibold text-lg">9</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Standard tokens</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-[#050505] text-[#BDDBDB] text-xs border border-[#1a1a1a] rounded">1.000000001</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">What It Means</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">0 decimals</span> → Only whole numbers</li>
            <li><span className="text-white font-medium">6 decimals</span> → 1,000,000 divisible parts</li>
            <li><span className="text-white font-medium">9 decimals</span> → 1,000,000,000 divisible parts</li>
          </ul>
        </section>

        {/* Network (Devnet/Mainnet) */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Network (Devnet / Mainnet)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-lg">🧪 Devnet</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>✅ Free testing</li>
                <li>✅ No real value</li>
                <li>✅ Experiment freely</li>
              </ul>
              <div className="mt-3 bg-[#050505] rounded-lg p-2 border border-[#1a1a1a]">
                <span className="text-[#BDDBDB] text-xs">Cost: <span className="text-green-400 font-medium">Free</span></span>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold text-lg">🚀 Mainnet</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>✅ Real tokens</li>
                <li>✅ DEX trading</li>
                <li>✅ Community building</li>
              </ul>
              <div className="mt-3 bg-[#050505] rounded-lg p-2 border border-[#1a1a1a]">
                <span className="text-[#BDDBDB] text-xs">Cost: <span className="text-[#FF2D2D] font-medium">0.15-0.60 SOL</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* Authorities */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Authorities</h2>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">✏️ Mint Authority</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">What it does: Allows creating more tokens</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-[#BDDBDB] text-sm">Revoked: Fixed supply</span>
                </div>
                <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex items-center gap-2">
                  <span className="text-yellow-500">🔄</span>
                  <span className="text-[#BDDBDB] text-sm">Kept: Can mint more</span>
                </div>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">❄️ Freeze Authority</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">What it does: Allows freezing accounts</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-[#BDDBDB] text-sm">Revoked: No one can freeze</span>
                </div>
                <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex items-center gap-2">
                  <span className="text-yellow-500">🔄</span>
                  <span className="text-[#BDDBDB] text-sm">Kept: Can freeze accounts</span>
                </div>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔄 Update Authority</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">What it does: Allows changing metadata</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex items-center gap-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-[#BDDBDB] text-sm">Revoked: Metadata is permanent</span>
                </div>
                <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex items-center gap-2">
                  <span className="text-yellow-500">🔄</span>
                  <span className="text-[#BDDBDB] text-sm">Kept: Can update metadata</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/help/create-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 How to Create a Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Step-by-step token creation guide</p>
            </Link>
            <Link href="/help/templates" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📋 Using Templates</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Get started with pre-built templates</p>
            </Link>
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security</p>
            </Link>
            <Link href="/help/authority-revocation" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔑 Authority Revocation</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">When and how to revoke authorities</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Set your parameters and go live in seconds.
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
