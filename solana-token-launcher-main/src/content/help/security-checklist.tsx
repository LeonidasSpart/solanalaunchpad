import Link from 'next/link';

export default function SecurityChecklistPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Security & Trust</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Security <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Checklist</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Use this checklist to ensure your token is secure and trustworthy before launch.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Token Creation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Token Creation</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Before Creation</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Plan your tokenomics</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Decide on authority revocation</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Prepare token details</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Have enough SOL</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Prepare your logo</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">During Creation</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Verify token details</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Choose correct network</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Select security settings</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm font-medium">Review before confirming</span>
              <span className="text-[#FF2D2D] font-bold">⚠️ CRITICAL</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">After Creation</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Save mint address</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Verify on Solscan</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Check authorities</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Add to wallet</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>
        </section>

        {/* Authority Revocation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Authority Revocation</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Mint Authority</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Decide if to revoke</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Execute revocation</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Verify on Solscan</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Freeze Authority</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Decide if to revoke</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Execute revocation</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Verify on Solscan</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Update Authority</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Decide if to revoke</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Execute revocation</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Verify on Solscan</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>
        </section>

        {/* Liquidity */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Liquidity</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Adding Liquidity</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Choose DEX (Raydium recommended)</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Add adequate liquidity</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Set reasonable price</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Burning LP Tokens</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Get LP tokens</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm font-medium">Burn LP tokens</span>
              <span className="text-[#FF2D2D] font-bold">🔥 CRITICAL</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Verify burn</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>
        </section>

        {/* Community & Trust */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community & Trust</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Building Trust</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Create social media</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Build community</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Share token details</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Be transparent</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Communication</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Share roadmap</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Regular updates</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Engage community</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Respond to questions</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>
        </section>

        {/* Verification */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Verification</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Solscan Verification</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Token appears</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Metadata correct</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Logo shows</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Authorities correct</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Wallet Verification</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Token appears in wallet</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Balance correct</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Logo shows</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>
        </section>

        {/* Final Security Check */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Final Security Check</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Token Details</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Name correct</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Symbol correct</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Supply correct</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Decimals correct</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Security Status</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Mint authority</span>
              <span className="text-green-400">✅ Revoked</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Freeze authority</span>
              <span className="text-green-400">✅ Revoked</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Update authority</span>
              <span className="text-green-400">✅ Revoked</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm font-medium">LP tokens burned</span>
              <span className="text-[#FF2D2D] font-bold">🔥 Verified</span>
            </div>
          </div>
        </section>

        {/* Documentation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Documentation</h2>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Tokenomics</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Whitepaper</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Roadmap</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Team info</span>
              <span className="text-green-400">✅</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB] text-sm">Social links</span>
              <span className="text-green-400">✅</span>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Quick Reference</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">✅ Best Practices</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
                <li>Revoke all authorities</li>
                <li>Burn LP tokens</li>
                <li>Build a community</li>
                <li>Be transparent</li>
                <li>Regular updates</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-white font-semibold mb-2">❌ Red Flags to Avoid</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
                <li>Keeping all authorities</li>
                <li>Not burning LP</li>
                <li>Anonymous team</li>
                <li>No community</li>
                <li>Hidden details</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/help/token-authorities" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📖 Token Authorities Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete guide to Mint, Freeze, and Update authorities</p>
            </Link>
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security settings</p>
            </Link>
            <Link href="/help/rug-pull" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🛡️ Rug Pull Prevention</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to prevent rug pulls</p>
            </Link>
            <Link href="/help/authority-revocation" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔑 Authority Revocation</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">When and how to revoke authorities</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Follow this checklist and go live with confidence.
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
