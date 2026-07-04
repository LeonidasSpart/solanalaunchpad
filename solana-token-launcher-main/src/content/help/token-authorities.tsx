import Link from 'next/link';

export default function UnderstandingTokenAuthoritiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Security & Trust</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Understanding <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Token Authorities</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Complete guide to Mint, Freeze, and Update authorities – and how they affect your token's security and trust.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What Are Token Authorities? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Are Token Authorities?</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            Token authorities are special permissions that control your token. When you create a token on Solana, you hold three key authorities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">✏️ Mint Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Who can create more tokens</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">❄️ Freeze Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Who can freeze token accounts</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔄 Update Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Who can change token metadata</p>
            </div>
          </div>
        </section>

        {/* Mint Authority */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Mint Authority</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What It Does</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Controls</span> creating new tokens</li>
            <li><span className="text-white font-medium">Default</span> The token creator (you)</li>
            <li><span className="text-white font-medium">Can Be</span> Revoked permanently</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Why It Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Active</span>
              <span className="text-white text-sm font-medium">You can mint more tokens anytime</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Revoked</span>
              <span className="text-white text-sm font-medium">Supply is fixed forever</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Keep</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Need to mint more later</li>
                <li>Vesting schedules</li>
                <li>Staking rewards</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">🔥 Revoke</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Fixed supply token</li>
                <li>Memecoin</li>
                <li>Community token</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Freeze Authority */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Freeze Authority</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What It Does</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Controls</span> freezing token accounts</li>
            <li><span className="text-white font-medium">Default</span> The token creator (you)</li>
            <li><span className="text-white font-medium">Can Be</span> Revoked permanently</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Why It Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Active</span>
              <span className="text-white text-sm font-medium">You can freeze any account</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Revoked</span>
              <span className="text-white text-sm font-medium">No one can freeze accounts</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Keep</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Compliance requirements</li>
                <li>Security concerns</li>
                <li>Limited use cases</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">🔥 Revoke</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Decentralized project</li>
                <li>Memecoin</li>
                <li>Community token</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Update Authority */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Update Authority</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What It Does</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Controls</span> changing metadata</li>
            <li><span className="text-white font-medium">Default</span> The token creator (you)</li>
            <li><span className="text-white font-medium">Can Be</span> Revoked permanently</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Why It Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Active</span>
              <span className="text-white text-sm font-medium">Can change name, logo, description</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Revoked</span>
              <span className="text-white text-sm font-medium">Metadata is permanent</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Keep</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Planning updates</li>
                <li>Brand evolution</li>
                <li>Testing phase</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">🔥 Revoke</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Finalized project</li>
                <li>Memecoin</li>
                <li>Serious project</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How Authorities Work */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How Authorities Work</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">During Creation</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">You hold all authorities initially</p>
                <p className="text-[#BDDBDB] text-sm">Full control over your token</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">You can choose to revoke any or all</p>
                <p className="text-[#BDDBDB] text-sm">Decide during token creation</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Revocation happens in the same transaction</p>
                <p className="text-[#BDDBDB] text-sm">One-time, permanent decision</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">After Creation</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">You still hold authorities</p>
                <p className="text-[#BDDBDB] text-sm">Unless revoked during creation</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">You can revoke later</p>
                <p className="text-[#BDDBDB] text-sm">At any time after creation</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Revocation is permanent</p>
                <p className="text-[#BDDBDB] text-sm">⚠️ Cannot be undone</p>
              </div>
            </div>
          </div>
        </section>

        {/* Authority Status */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Authority Status</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-white font-semibold">✅ Active Authority</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>You have control</li>
                <li>Can perform actions</li>
                <li>Can revoke anytime</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">❌ Revoked Authority</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>No one has control</li>
                <li>Cannot perform actions</li>
                <li>Permanent status</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Building Trust */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Building Trust</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Trust Signals</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">No authorities revoked</span>
              <span className="text-yellow-500 font-semibold">⚠️ Low trust</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Freeze revoked</span>
              <span className="text-green-400 font-semibold">✅ Medium trust</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Mint + Freeze revoked</span>
              <span className="text-blue-400 font-semibold">✅✅ High trust</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-white font-semibold">All authorities revoked</span>
              <span className="text-[#FF2D2D] font-semibold">✅✅✅ Maximum trust</span>
            </div>
          </div>
        </section>

        {/* Security Implications */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Security Implications</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">If You Keep Authorities</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-white font-medium">✏️ Mint</span>
              <span className="text-[#BDDBDB]">Risk: Could dilute holders</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-white font-medium">❄️ Freeze</span>
              <span className="text-[#BDDBDB]">Risk: Could freeze accounts</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-white font-medium">🔄 Update</span>
              <span className="text-[#BDDBDB]">Risk: Could change token identity</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">If You Revoke Authorities</h3>
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-white font-medium">✏️ Mint</span>
              <span className="text-[#BDDBDB]">Benefit: Supply is fixed</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-white font-medium">❄️ Freeze</span>
              <span className="text-[#BDDBDB]">Benefit: No one can freeze</span>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-white font-medium">🔄 Update</span>
              <span className="text-[#BDDBDB]">Benefit: Identity is locked</span>
            </div>
          </div>
        </section>

        {/* Making the Decision */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Making the Decision</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Questions to Ask</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Will I need to mint more tokens?</li>
            <li>Do I need to freeze accounts for compliance?</li>
            <li>Will I need to update metadata later?</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Recommendation by Token Type</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Token Type</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Mint</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Freeze</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Update</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Meme Coin</td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Utility Token</td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-yellow-500 font-medium">❌ Keep</span></td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Governance DAO</td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-yellow-500 font-medium">❌ Keep</span></td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Simple Token</td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-[#FF2D2D] font-medium">✅ Revoke</span></td>
                  <td className="px-4 py-3 text-sm border border-[#1a1a1a]"><span className="text-yellow-500 font-medium">❌ Keep</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[#BDDBDB] text-xs mt-3 text-center">These are general recommendations. Adjust based on your specific project needs.</p>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/authority-revocation" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔑 Authority Revocation</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">When and how to revoke authorities</p>
            </Link>
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security</p>
            </Link>
            <Link href="/help/security-checklist" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">✅ Security Checklist</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Pre-launch security checklist</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Set your authorities and launch with confidence.
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
