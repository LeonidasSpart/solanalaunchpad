import Link from 'next/link';

export default function UsingTemplatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Creating Tokens</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Using <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Templates</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Learn about the different token templates available on ZRP to launch your token quickly with best-practice settings.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Why Use Templates? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Use Templates?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">⚡ Faster Launch</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Settings are pre-optimized</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">✅ Best Practices</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Industry-standard configurations</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📚 Less Research</p>
              <p className="text-[#BDDBDB] text-sm mt-1">No need to study tokenomics</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Higher Trust</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Proven settings build confidence</p>
            </div>
          </div>
        </section>

        {/* Template Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Template Comparison</h2>

          {/* Meme Coin */}
          <div className="bg-[#050505]/40 rounded-xl p-5 border border-[#1a1a1a] mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔥</span>
              <h3 className="text-xl font-bold text-white">Meme Coin</h3>
              <span className="px-2 py-0.5 bg-[#FF2D2D]/20 text-[#FF2D2D] text-xs rounded-full font-medium">Viral</span>
            </div>
            <p className="text-[#BDDBDB] text-sm mb-3">Best for: Viral community tokens, memecoins, social experiments</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Supply</span>
                <span className="text-white font-mono text-sm">1,000,000,000</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Decimals</span>
                <span className="text-white font-mono text-sm">6</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Mint Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Freeze Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] md:col-span-2 flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Update Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-lg p-3 mt-3 border border-[#1a1a1a]">
              <p className="text-white text-sm font-medium">Why these settings?</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-xs mt-1 space-y-0.5">
                <li>Large supply for wide distribution</li>
                <li>0 decimals for simplicity</li>
                <li>All authorities revoked for maximum trust</li>
              </ul>
            </div>
          </div>

          {/* Utility Token */}
          <div className="bg-[#050505]/40 rounded-xl p-5 border border-[#1a1a1a] mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">⚙️</span>
              <h3 className="text-xl font-bold text-white">Utility Token</h3>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">Practical</span>
            </div>
            <p className="text-[#BDDBDB] text-sm mb-3">Best for: Project tokens, governance, utility</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Supply</span>
                <span className="text-white font-mono text-sm">10,000,000</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Decimals</span>
                <span className="text-white font-mono text-sm">6</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Mint Authority</span>
                <span className="text-yellow-400 font-medium text-sm">❌ Kept</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Freeze Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] md:col-span-2 flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Update Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-lg p-3 mt-3 border border-[#1a1a1a]">
              <p className="text-white text-sm font-medium">Why these settings?</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-xs mt-1 space-y-0.5">
                <li>Controlled supply for tokenomics</li>
                <li>6 decimals for trading</li>
                <li>Mint authority kept for vesting</li>
                <li>Freeze and Update revoked for trust</li>
              </ul>
            </div>
          </div>

          {/* Governance DAO */}
          <div className="bg-[#050505]/40 rounded-xl p-5 border border-[#1a1a1a] mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏛️</span>
              <h3 className="text-xl font-bold text-white">Governance DAO</h3>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full font-medium">Decentralized</span>
            </div>
            <p className="text-[#BDDBDB] text-sm mb-3">Best for: DAO voting, delegation, governance</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Supply</span>
                <span className="text-white font-mono text-sm">100,000,000</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Decimals</span>
                <span className="text-white font-mono text-sm">6</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Mint Authority</span>
                <span className="text-yellow-400 font-medium text-sm">❌ Kept</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Freeze Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] md:col-span-2 flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Update Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-lg p-3 mt-3 border border-[#1a1a1a]">
              <p className="text-white text-sm font-medium">Why these settings?</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-xs mt-1 space-y-0.5">
                <li>High supply for voting weight</li>
                <li>6 decimals for precision</li>
                <li>Mint authority for future delegation</li>
                <li>Freeze and Update revoked for trust</li>
              </ul>
            </div>
          </div>

          {/* Simple Token */}
          <div className="bg-[#050505]/40 rounded-xl p-5 border border-[#1a1a1a]">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🚀</span>
              <h3 className="text-xl font-bold text-white">Simple Token</h3>
              <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded-full font-medium">Testing</span>
            </div>
            <p className="text-[#BDDBDB] text-sm mb-3">Best for: Testing, private use, experimentation</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Supply</span>
                <span className="text-white font-mono text-sm">1,000,000</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Decimals</span>
                <span className="text-white font-mono text-sm">9</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Mint Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Freeze Authority</span>
                <span className="text-green-400 font-medium text-sm">✅ Revoked</span>
              </div>
              <div className="bg-[#050505] rounded-lg p-2 border border-[#1a1a1a] md:col-span-2 flex justify-between items-center">
                <span className="text-[#BDDBDB] text-sm">Update Authority</span>
                <span className="text-yellow-400 font-medium text-sm">❌ Kept</span>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-lg p-3 mt-3 border border-[#1a1a1a]">
              <p className="text-white text-sm font-medium">Why these settings?</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-xs mt-1 space-y-0.5">
                <li>Small supply for easy testing</li>
                <li>9 decimals for precision</li>
                <li>Update authority kept for flexibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How to Choose */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Choose</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Create a viral memecoin</span>
              <span className="text-[#FF2D2D] font-medium">→ Meme Coin 🔥</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Build a serious project</span>
              <span className="text-[#FF2D2D] font-medium">→ Utility Token ⚙️</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Start a DAO</span>
              <span className="text-[#FF2D2D] font-medium">→ Governance DAO 🏛️</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Test or experiment</span>
              <span className="text-[#FF2D2D] font-medium">→ Simple Token 🚀</span>
            </div>
          </div>
        </section>

        {/* Customization */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Customization</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            All templates can be customized before creating:
          </p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Change supply</span> — Adjust to your needs</li>
            <li><span className="text-white font-medium">Change decimals</span> — Any value between 0-9</li>
            <li><span className="text-white font-medium">Toggle authorities</span> — Revoke or keep any authority</li>
          </ul>
        </section>

        {/* Start from Scratch */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Start from Scratch</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            If none of the templates fit your needs:
          </p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Click <span className="text-white font-medium">"Start from Scratch — Full Customization"</span></li>
            <li>Set all parameters manually</li>
            <li>Complete control over every setting</li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/create-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 How to Create a Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Step-by-step token creation guide</p>
            </Link>
            <Link href="/help/token-parameters" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">⚙️ Token Parameters Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Understanding name, symbol, supply, and more</p>
            </Link>
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Choose a template and go live in seconds.
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
