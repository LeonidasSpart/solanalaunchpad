import Link from 'next/link';

export default function AuthorityRevocationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Creating Tokens</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Authority <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Revocation</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Revoking authorities is one of the most important trust signals you can give to your token holders. This guide explains what it means and why it matters.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What Are Token Authorities? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Are Token Authorities?</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            When you create a token, you hold three special powers called authorities:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">✏️ Mint Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Ability to create more tokens</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">❄️ Freeze Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Ability to freeze token accounts</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🔄 Update Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Ability to change token metadata</p>
            </div>
          </div>
        </section>

        {/* What Does Revoking Mean? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Does Revoking Mean?</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            Revoking means <span className="text-white font-semibold">permanently giving up these powers</span>. Once revoked:
          </p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ You cannot mint more tokens</li>
            <li>❌ You cannot freeze accounts</li>
            <li>❌ You cannot update metadata</li>
          </ul>
          <div className="bg-[#FF2D2D]/10 border-l-4 border-[#FF2D2D] rounded-r-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">⚠️ Important</p>
            <p className="text-[#BDDBDB] text-sm mt-1">Revoking is <span className="text-white font-semibold">permanent</span>. You cannot get these powers back.</p>
          </div>
        </section>

        {/* Why Revoke Authorities? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Revoke Authorities?</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">1. Build Trust</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Mint revoked</span>
              <span className="text-green-400 text-sm font-medium">✅ Supply is fixed</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Freeze revoked</span>
              <span className="text-green-400 text-sm font-medium">✅ No one can freeze holders</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Update revoked</span>
              <span className="text-green-400 text-sm font-medium">✅ Metadata is permanent</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">2. Prove Fixed Supply</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">When you revoke mint authority, you prove that:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Supply cannot increase</li>
            <li>✅ No inflation</li>
            <li>✅ Holders can't be diluted</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">3. Show Decentralization</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">By giving up control, you show that:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ You're not in control</li>
            <li>✅ The token belongs to the community</li>
            <li>✅ No one has special powers</li>
          </ul>
        </section>

        {/* Cost of Revocation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Cost of Revocation</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Authority</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Mint Authority</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Freeze Authority</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Update Authority</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">+0.15 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#FF2D2D]/10">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm font-medium border border-[#1a1a1a]">All Three</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">+0.45 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Revoke */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">When to Revoke</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Revoke Immediately</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Maximum trust from day one</li>
            <li>✅ Done during creation</li>
            <li>✅ Simplest approach</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Revoke Later</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Keep flexibility during testing</li>
            <li>✅ Revoke when ready</li>
            <li>✅ Still builds trust</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Keep Some</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Mint authority kept for vesting</li>
            <li>✅ Update authority kept for flexibility</li>
            <li>✅ Find the right balance</li>
          </ul>
        </section>

        {/* Recommended Settings */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Recommended Settings</h2>
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
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Meme Coin</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Utility Token</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">❌ Keep</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Governance DAO</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">❌ Keep</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Simple Token</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">✅ Revoke</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">❌ Keep</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Revoke */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Revoke</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">During Creation</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Check the boxes for:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1">
                  <li>✅ Revoke Mint Authority</li>
                  <li>✅ Revoke Freeze Authority</li>
                  <li>✅ Revoke Update Authority</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">The revocation happens automatically</p>
                <p className="text-[#BDDBDB] text-sm">When you create the token</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">After Creation</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to the Revoke Authority tool</p>
                <p className="text-[#BDDBDB] text-sm">Visit <Link href="/revoke" className="text-[#FF2D2D] hover:text-[#B10000] transition">/revoke</Link></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Enter your token's mint address</p>
                <p className="text-[#BDDBDB] text-sm">Paste your token address</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Select which authority to revoke</p>
                <p className="text-[#BDDBDB] text-sm">Choose Mint, Freeze, or Update</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Confirm the transaction</p>
                <p className="text-[#BDDBDB] text-sm">Approve in your wallet</p>
              </div>
            </div>
          </div>
        </section>

        {/* Verify Revocation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Verify Revocation</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Check that authorities are revoked by:</p>
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
                <p className="text-white text-sm font-medium">Search for your token</p>
                <p className="text-[#BDDBDB] text-sm">Paste your mint address</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Look at the authority fields</p>
                <p className="text-[#BDDBDB] text-sm">They should show <span className="text-green-400 font-medium">"Revoked"</span> or <span className="text-green-400 font-medium">"None"</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security</p>
            </Link>
            <Link href="/help/understanding-token-authorities" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📖 Token Authorities Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete guide to authorities</p>
            </Link>
            <Link href="/help/revoking-authorities-after-creation" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔑 Revoke Authority Tool</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Revoke authorities after creation</p>
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
