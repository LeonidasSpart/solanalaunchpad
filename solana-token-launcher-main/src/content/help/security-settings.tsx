import Link from 'next/link';

export default function SecuritySettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Creating Tokens</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Security <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Settings</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Learn about the security settings available when creating a token on ZRP to build trust with your holders.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Setting</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">What It Does</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Revoke Mint Authority</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Prevents minting more tokens</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Revoke Freeze Authority</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Prevents freezing accounts</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Revoke Update Authority</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Makes metadata immutable</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Revoke Mint Authority */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Revoke Mint Authority</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What It Does</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Prevents creating more tokens</li>
            <li>Supply becomes fixed</li>
            <li>No inflation possible</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Why It Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📦 Fixed Supply</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Holders know supply won't increase</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💎 Scarcity</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Potential value increase</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🤝 Trust</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Shows commitment to tokenomics</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">When to Use</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Memecoins</li>
            <li>✅ Fixed-supply projects</li>
            <li>✅ When you want maximum trust</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">When NOT to Use</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ When you need vesting</li>
            <li>❌ When you might mint more later</li>
            <li>❌ When you need flexibility</li>
          </ul>
        </section>

        {/* Revoke Freeze Authority */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Revoke Freeze Authority</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What It Does</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Prevents freezing token accounts</li>
            <li>No one can lock holders' tokens</li>
            <li>True decentralization</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Why It Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🛡️ No Freezing</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Holders are safe</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🌍 Decentralized</p>
              <p className="text-[#BDDBDB] text-sm mt-1">No one has special power</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Trust</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Cannot lock accounts</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">When to Use</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ All serious projects</li>
            <li>✅ When you want decentralization</li>
            <li>✅ When building trust</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">When NOT to Use</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ When you need to freeze for compliance</li>
            <li>❌ When you need to freeze for security</li>
          </ul>
        </section>

        {/* Revoke Update Authority */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Revoke Update Authority</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What It Does</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Makes metadata permanent</li>
            <li>Cannot change name, symbol, or logo</li>
            <li>Immutable on-chain data</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Why It Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔐 Permanent</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Identity is locked</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🤝 Trust</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Cannot change token identity</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">👁️ Transparency</p>
              <p className="text-[#BDDBDB] text-sm mt-1">What you see is final</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">When to Use</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ When you're certain of details</li>
            <li>✅ When you want maximum trust</li>
            <li>✅ When branding is final</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">When NOT to Use</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ When you might update metadata</li>
            <li>❌ When you're still testing</li>
            <li>❌ When details might change</li>
          </ul>
        </section>

        {/* Security Tiers */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Security Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🔓 Basic</p>
              <p className="text-[#BDDBDB] text-sm mt-1">0.15 SOL</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-xs mt-2 text-left space-y-1">
                <li>✅ Token creation</li>
                <li>No authorities revoked</li>
                <li className="text-yellow-500">⚠️ Basic trust</li>
              </ul>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🛡️ Standard</p>
              <p className="text-[#BDDBDB] text-sm mt-1">0.30 SOL</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-xs mt-2 text-left space-y-1">
                <li>✅ Token creation</li>
                <li>✅ Freeze authority revoked</li>
                <li className="text-blue-400">🔵 Medium trust</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
              <p className="text-white font-semibold text-lg">🔒 Secure</p>
              <p className="text-[#BDDBDB] text-sm mt-1">0.60 SOL</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-xs mt-2 text-left space-y-1">
                <li>✅ Token creation</li>
                <li>✅ All authorities revoked</li>
                <li className="text-[#FF2D2D]">🔴 Maximum trust</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Recommendations by Token Type */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Recommendations by Token Type</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Token Type</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Recommended Security</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Meme Coin</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">All revoked</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.60 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Utility Token</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Freeze + Update revoked</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.45 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Governance DAO</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Freeze + Update revoked</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.45 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Simple Token</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Mint + Freeze revoked</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.45 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Making the Decision */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Making the Decision</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Questions to Ask</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Do I need to mint more tokens later?</li>
            <li>Do I need to freeze accounts for compliance?</li>
            <li>Do I need to update metadata later?</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Guidelines</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Serious projects</span>
              <span className="text-[#FF2D2D] font-medium">→ Revoke all</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Flexibility needed</span>
              <span className="text-yellow-500 font-medium">→ Keep mint and update</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Maximum trust</span>
              <span className="text-[#FF2D2D] font-medium">→ Revoke all</span>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/help/authority-revocation" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔑 Authority Revocation</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">When and how to revoke authorities</p>
            </Link>
            <Link href="/help/token-authorities" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📖 Token Authorities Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete guide to authorities</p>
            </Link>
            <Link href="/help/security-checklist" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">✅ Security Checklist</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Pre-launch security checklist</p>
            </Link>
            <Link href="/help/pricing" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">💰 Pricing Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Understand the costs</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Choose your security settings and go live with confidence.
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
