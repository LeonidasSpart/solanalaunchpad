import Link from 'next/link';

export default function CommunityGuidelinesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Account & Support</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Community <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Guidelines</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          ZRP is built on community. These guidelines help keep our community safe and welcoming.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Core Values */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🤝 Respect</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Treat everyone with respect. Disagreements happen, but personal attacks are not acceptable.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📖 Helpfulness</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Share knowledge and help others. We all started somewhere.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💬 Transparency</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Be honest and transparent. Misleading others is not allowed.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Safety</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Keep the community safe. Report suspicious activity.</p>
            </div>
          </div>
        </section>

        {/* What We Allow */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What We Allow</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">✅ Allowed</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Constructive feedback</li>
            <li>✅ Questions and discussions</li>
            <li>✅ Sharing knowledge</li>
            <li>✅ Reporting issues</li>
            <li>✅ Feature suggestions</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">❌ Not Allowed</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ Spam or promotions</li>
            <li>❌ Scams or fraud</li>
            <li>❌ Harassment or abuse</li>
            <li>❌ Impersonation</li>
            <li>❌ Illegal activities</li>
          </ul>
        </section>

        {/* Code of Conduct */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Code of Conduct</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Be Respectful</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-white font-semibold">✅ Do</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Be kind</li>
                <li>Listen</li>
                <li>Help</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">❌ Don't</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Personal attacks</li>
                <li>Interrupting</li>
                <li>Dismissing</li>
              </ul>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Be Constructive</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-white font-semibold">✅ Do</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Give feedback</li>
                <li>Ask questions</li>
                <li>Share knowledge</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">❌ Don't</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Complain without solutions</li>
                <li>Assume ignorance</li>
                <li>Gatekeeping</li>
              </ul>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Be Honest</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-white font-semibold">✅ Do</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Be transparent</li>
                <li>Admit mistakes</li>
                <li>Share facts</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">❌ Don't</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Mislead others</li>
                <li>Blame others</li>
                <li>Spread rumors</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Community Channels */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Channels</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Discord</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">General</span> — Main chat</li>
            <li><span className="text-white font-medium">Help</span> — Support questions</li>
            <li><span className="text-white font-medium">Showcase</span> — Share your tokens</li>
            <li><span className="text-white font-medium">Announcements</span> — Official news</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">X (Twitter)</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">@ZRP_AI</span> — Official account</li>
            <li><span className="text-white font-medium">#ZRP</span> — Community discussions</li>
            <li><span className="text-white font-medium">Direct Messages</span> — Private inquiries</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Telegram</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Main Group</span> — General chat</li>
            <li><span className="text-white font-medium">Announcements</span> — Official news</li>
          </ul>
        </section>

        {/* What to Share */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Share</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">✅ Do Share</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Your created tokens</li>
                <li>Questions and help requests</li>
                <li>Feedback and suggestions</li>
                <li>Community events</li>
                <li>Success stories</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">❌ Don't Share</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Private keys or seed phrases</li>
                <li>Personal information</li>
                <li>Scams or phishing links</li>
                <li>Unauthorized promotions</li>
                <li>Inappropriate content</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Reporting Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Reporting Issues</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">How to Report</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Discord</span> — @mod or @team</li>
            <li><span className="text-white font-medium">X</span> — @ZRP_AI</li>
            <li><span className="text-white font-medium">Email</span> — <a href="mailto:support@zrp.one" className="text-[#FF2D2D] hover:text-[#B10000] transition">support@zrp.one</a></li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">What to Report</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Rule violations</li>
            <li>Suspicious activity</li>
            <li>Spam or scams</li>
            <li>Harassment</li>
            <li>Security concerns</li>
          </ul>
        </section>

        {/* Consequences */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Consequences</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Violation</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">First</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Second</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Third</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Minor</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm border border-[#1a1a1a]">Warning</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm border border-[#1a1a1a]">Mute</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm border border-[#1a1a1a]">Kick</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Moderate</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm border border-[#1a1a1a]">Warning</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm border border-[#1a1a1a]">Kick</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm border border-[#1a1a1a]">Ban</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Severe</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm border border-[#1a1a1a]">Ban</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm border border-[#1a1a1a]">Ban</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm border border-[#1a1a1a]">Ban</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Being a Good Community Member */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Being a Good Community Member</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">How to Help</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Answer questions</li>
            <li>✅ Share knowledge</li>
            <li>✅ Report issues</li>
            <li>✅ Welcome new members</li>
            <li>✅ Be positive</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">How to Contribute</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Give feedback</li>
            <li>✅ Suggest features</li>
            <li>✅ Report bugs</li>
            <li>✅ Help others</li>
            <li>✅ Share your experience</li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/contact-support" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📞 Contact Support</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Get help from the team</p>
            </Link>
            <Link href="/help/report-a-bug" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🐛 Report a Bug</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Report issues</p>
            </Link>
            <Link href="/help/feature-requests" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">💡 Feature Requests</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Suggest new features</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Join the ZRP Community</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Be part of something bigger. Help us build the future of token creation.
          </p>
          <a
            href="https://discord.gg/W4qS4xkbn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Join Discord
          </a>
        </section>
      </div>
    </div>
  );
}
