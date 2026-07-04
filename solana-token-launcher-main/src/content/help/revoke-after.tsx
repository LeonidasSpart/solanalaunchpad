import Link from 'next/link';

export default function RevokingAuthoritiesAfterCreationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">After Token Creation</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Revoking Authorities <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">After Creation</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          If you didn't revoke authorities during creation, you can still do it later. This guide shows you how.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* When to Revoke After Creation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">When to Revoke After Creation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🧪 Testing</p>
              <p className="text-[#BDDBDB] text-sm mt-1">You wanted to test first</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔄 Flexibility</p>
              <p className="text-[#BDDBDB] text-sm mt-1">You needed to make changes</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🤝 Ready to Trust</p>
              <p className="text-[#BDDBDB] text-sm mt-1">You're ready to commit</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">✅ Best Practice</p>
              <p className="text-[#BDDBDB] text-sm mt-1">You forgot during creation</p>
            </div>
          </div>
        </section>

        {/* How to Revoke */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Revoke</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Go to Revoke Authority</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Navigate to Revoke Authority</p>
                <p className="text-[#BDDBDB] text-sm">Go to <Link href="/revoke" className="text-[#FF2D2D] hover:text-[#B10000] transition">/revoke</Link></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Select Wallet"</p>
                <p className="text-[#BDDBDB] text-sm">Connect your wallet</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Approve the connection</p>
                <p className="text-[#BDDBDB] text-sm">Confirm in your wallet</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Enter Your Token</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Paste your token's mint address</p>
                <p className="text-[#BDDBDB] text-sm">Copy from your token details</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Check Authority"</p>
                <p className="text-[#BDDBDB] text-sm">Verify token ownership</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Select Authority</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">Choose which authority to revoke:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">✏️ Mint Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Prevents minting more</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">❄️ Freeze Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Prevents freezing accounts</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🔄 Update Authority</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Makes metadata permanent</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 4: Confirm Revocation</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Review the details</p>
                <p className="text-[#BDDBDB] text-sm">Double-check everything</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Revoke"</p>
                <p className="text-[#BDDBDB] text-sm">Initiate the process</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Approve in your wallet</p>
                <p className="text-[#BDDBDB] text-sm">Confirm the transaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Important: It's Permanent! */}
        <section>
          <div className="bg-[#FF2D2D]/10 border-l-4 border-[#FF2D2D] rounded-r-xl p-6">
            <h2 className="text-white font-bold text-xl mb-2">⚠️ Important: It's Permanent!</h2>
            <p className="text-[#BDDBDB] text-sm">
              Revoking is permanent. Once revoked, you can <span className="text-white font-semibold">never</span> get the authority back.
            </p>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Before You Revoke</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Double-check your token details</li>
            <li>✅ Make sure you're ready to commit</li>
            <li>✅ Understand the implications</li>
          </ul>
        </section>

        {/* What Happens After Revoking */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Happens After Revoking</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Mint Revoked</span>
              <span className="text-white text-sm font-medium">Supply is fixed forever</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Freeze Revoked</span>
              <span className="text-white text-sm font-medium">No one can freeze accounts</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Update Revoked</span>
              <span className="text-white text-sm font-medium">Metadata is locked forever</span>
            </div>
          </div>
        </section>

        {/* Verify Revocation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Verify Revocation</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">On Solscan</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to Solscan</p>
                <p className="text-[#BDDBDB] text-sm">Visit <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">solscan.io</a></p>
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
                <p className="text-white text-sm font-medium">Check the authority fields</p>
                <p className="text-[#BDDBDB] text-sm">They should show <span className="text-green-400 font-medium">"Revoked"</span></p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">On ZRP</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to your token's details page</p>
                <p className="text-[#BDDBDB] text-sm">Navigate to your token</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Check the security status</p>
                <p className="text-[#BDDBDB] text-sm">It should show <span className="text-green-400 font-medium">"Revoked"</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Costs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Costs</h2>
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
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.1 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Freeze Authority</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.1 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Update Authority</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.1 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#FF2D2D]/10">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm font-medium border border-[#1a1a1a]">All Three</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">0.3 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Recommended Order */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Recommended Order</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">1</span>
              <span className="text-white text-sm font-medium">Mint Authority</span>
              <span className="text-[#FF2D2D] text-sm font-medium">🔥 Highest Priority</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">2</span>
              <span className="text-white text-sm font-medium">Freeze Authority</span>
              <span className="text-[#BDDBDB] text-sm">Medium Priority</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">3</span>
              <span className="text-white text-sm font-medium">Update Authority</span>
              <span className="text-[#BDDBDB] text-sm">Consider Last</span>
            </div>
          </div>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">💡 Tip</p>
            <p className="text-[#BDDBDB] text-sm mt-1">Start with Mint Authority — it's the most important trust signal for your community.</p>
          </div>
        </section>

        {/* Common Questions */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Common Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I revoke just one authority?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Yes, you can revoke individually. Each authority is independent.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What if I change my mind?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">You can't — revoking is <span className="text-[#FF2D2D] font-semibold">permanent</span>. Once revoked, it's gone forever.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I check if it worked?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Yes, check on Solscan or ZRP's token details page. The authority field will show <span className="text-green-400 font-medium">"Revoked"</span>.</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/authority-revocation" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔑 Authority Revocation Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete guide to revoking authorities</p>
            </Link>
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security</p>
            </Link>
            <Link href="/help/security-checklist" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">✅ Security Checklist</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete pre-launch checklist</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Revoke?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Build trust with your community by revoking authorities today.
          </p>
          <a
            href="/revoke"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Revoke Authority
          </a>
        </section>
      </div>
    </div>
  );
}
