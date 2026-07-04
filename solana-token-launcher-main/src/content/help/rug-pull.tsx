import Link from 'next/link';

export default function RugPullPreventionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Security & Trust</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Rug Pull <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Prevention</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Learn how to protect yourself and others from rug pulls – scams where creators abandon projects and take investors' money.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What Is a Rug Pull? */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Is a Rug Pull?</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Rug Pull</span>
              <span className="text-white text-sm font-medium">A scam where creators drain liquidity and disappear</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Common In</span>
              <span className="text-white text-sm font-medium">Memecoins, new projects</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex justify-between items-center">
              <span className="text-[#BDDBDB]">Result</span>
              <span className="text-[#FF2D2D] font-medium">Holders lose their money</span>
            </div>
          </div>
        </section>

        {/* How Rug Pulls Happen */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How Rug Pulls Happen</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">The Process</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Creator creates token</p>
                <p className="text-[#BDDBDB] text-sm">With active authorities (mint, freeze, update)</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Adds liquidity to a DEX</p>
                <p className="text-[#BDDBDB] text-sm">Creates a trading pair</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Attracts investors</p>
                <p className="text-[#BDDBDB] text-sm">Through marketing and hype</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Mints more tokens</p>
                <p className="text-[#BDDBDB] text-sm">If mint authority is still active</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">5</span>
              <div>
                <p className="text-white text-sm font-medium">Removes liquidity</p>
                <p className="text-[#BDDBDB] text-sm">If LP tokens are not burned</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">6</span>
              <div>
                <p className="text-white text-sm font-medium">Disappears with the money</p>
                <p className="text-[#BDDBDB] text-sm">Holders are left with worthless tokens</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Red Flags</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Mint authority not revoked</span>
              <span className="text-[#FF2D2D] text-sm font-medium">Can create unlimited tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">LP tokens not burned</span>
              <span className="text-[#FF2D2D] text-sm font-medium">Can remove liquidity</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Anonymous team</span>
              <span className="text-[#FF2D2D] text-sm font-medium">Can disappear</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">No community</span>
              <span className="text-[#FF2D2D] text-sm font-medium">No real support</span>
            </div>
          </div>
        </section>

        {/* How ZRP Prevents Rug Pulls */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How ZRP Prevents Rug Pulls</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Built-in Protection</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔑 Authority Revocation</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Prevents abuse</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔥 Burn LP Tool</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Locks liquidity</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📖 Open Source</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Code is auditable</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔐 Non-Custodial</p>
              <p className="text-[#BDDBDB] text-sm mt-1">You control your keys</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Best Practices</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Revoke all authorities</span>
              <span className="text-green-400 text-sm font-medium">Prevents abuse</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Burn LP tokens</span>
              <span className="text-green-400 text-sm font-medium">Locks liquidity</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Build community</span>
              <span className="text-green-400 text-sm font-medium">Shows commitment</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Be transparent</span>
              <span className="text-green-400 text-sm font-medium">Builds trust</span>
            </div>
          </div>
        </section>

        {/* How to Spot a Rug Pull */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Spot a Rug Pull</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Red Flags 🚨</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Mint authority is still active</li>
            <li>LP tokens are not burned</li>
            <li>Team is anonymous</li>
            <li>No community engagement</li>
            <li>Promises of guaranteed returns</li>
            <li>Pressure to buy quickly</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Green Flags ✅</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>All authorities revoked</li>
            <li>LP tokens burned</li>
            <li>Known team members</li>
            <li>Active community</li>
            <li>Clear roadmap</li>
            <li>Transparent communication</li>
          </ul>
        </section>

        {/* Protecting Yourself */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Protecting Yourself</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Before Investing</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Check authority status on Solscan</li>
            <li>Check LP tokens — are they burned?</li>
            <li>Research the team — are they known?</li>
            <li>Check community — is it active?</li>
            <li>Read the roadmap — is it realistic?</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">After Investing</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Monitor authority status</li>
            <li>Watch for suspicious activity</li>
            <li>Stay informed about project updates</li>
            <li>Diversify your investments</li>
            <li>Take profits when appropriate</li>
          </ul>
        </section>

        {/* What to Do If You Spot a Rug */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Do If You Spot a Rug</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Document everything</p>
                <p className="text-[#BDDBDB] text-sm">Take screenshots of transactions and communications</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Warn others</p>
                <p className="text-[#BDDBDB] text-sm">Share information on social media and community channels</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Report</p>
                <p className="text-[#BDDBDB] text-sm">To relevant platforms (Solscan, DEX, community moderators)</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Contact</p>
                <p className="text-[#BDDBDB] text-sm">Seek community support and advice</p>
              </div>
            </div>
          </div>
        </section>

        {/* ZRP's Commitment */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">ZRP's Commitment</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">We Help You Stay Safe</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Tools to revoke authorities</li>
            <li>✅ Tools to burn LP tokens</li>
            <li>✅ Security guides</li>
            <li>✅ Transparent platform</li>
            <li>✅ Open source code</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">We Never</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ Control your tokens</li>
            <li>❌ Store your keys</li>
            <li>❌ Hidden fees</li>
            <li>❌ Unfair practices</li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/help/token-authorities" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📖 Token Authorities Explained</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete guide to Mint, Freeze, and Update authorities</p>
            </Link>
            <Link href="/help/security-checklist" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">✅ Security Checklist</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete pre-launch checklist</p>
            </Link>
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security</p>
            </Link>
            <Link href="/help/burn-lp" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔥 Burn LP Tokens</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to burn LP tokens securely</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Build trust and protect your community with ZRP's security tools.
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
