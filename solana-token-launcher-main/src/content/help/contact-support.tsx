import Link from 'next/link';

export default function ContactSupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Account & Support</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Contact <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Support</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Need help? The ZRP support team is here to assist you.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* How to Contact Us */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Contact Us</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Contact Form</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to the Contact page</p>
                <p className="text-[#BDDBDB] text-sm">Visit <Link href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition">/contact</Link></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Fill in the form</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Your name</li>
                  <li>Email address</li>
                  <li>Subject</li>
                  <li>Message</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Send Message"</p>
                <p className="text-[#BDDBDB] text-sm">Submit your request</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Email</h3>
          <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-sm mb-2">Send an email to:</p>
            <div className="bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#FF2D2D] text-sm text-center">
              support@zrp.one
            </div>
            <p className="text-[#BDDBDB] text-sm mt-3">Please include:</p>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
              <li>A clear subject line</li>
              <li>Detailed description</li>
              <li>Relevant screenshots</li>
            </ul>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">X (Twitter)</h3>
          <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-sm">Reach out on X:</p>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
              <li><span className="text-white font-medium">Handle:</span> <a href="https://x.com/ZRP_AI" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">@ZRP_AI</a></li>
              <li><span className="text-white font-medium">DM:</span> Open for support</li>
              <li><span className="text-white font-medium">Public:</span> Tag us for quick responses</li>
            </ul>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Discord</h3>
          <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-sm">Join our Discord:</p>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
              <li><span className="text-white font-medium">Link:</span> <a href="https://discord.gg/W4qS4xkbn" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">discord.gg/W4qS4xkbn</a></li>
              <li><span className="text-white font-medium">Support Channel:</span> Get help from the community and team</li>
              <li><span className="text-white font-medium">Direct:</span> DM team members</li>
            </ul>
          </div>
        </section>

        {/* Response Times */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Response Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Channel</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Expected Response</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Email</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">24-48 hours</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Contact Form</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">24-48 hours</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">X / Twitter</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">4-12 hours</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Discord</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">1-24 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* What to Include */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Include</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">For Technical Issues</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Token address</span>
              <span className="text-white text-sm font-medium">To identify the token</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Transaction ID</span>
              <span className="text-white text-sm font-medium">To check the transaction</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Error message</span>
              <span className="text-white text-sm font-medium">Exact error text</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Steps to reproduce</span>
              <span className="text-white text-sm font-medium">How to replicate</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Screenshots</span>
              <span className="text-white text-sm font-medium">Visual evidence</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">For Account Issues</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wallet address</span>
              <span className="text-white text-sm font-medium">To identify your account</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Network</span>
              <span className="text-white text-sm font-medium">Devnet or Mainnet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Issue description</span>
              <span className="text-white text-sm font-medium">What happened</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">For General Questions</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Question</span>
              <span className="text-white text-sm font-medium">Clear, specific question</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Context</span>
              <span className="text-white text-sm font-medium">What you're trying to do</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Background</span>
              <span className="text-white text-sm font-medium">What you've tried</span>
            </div>
          </div>
        </section>

        {/* Before Contacting Us */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Before Contacting Us</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Check These First</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ <Link href="/faq" className="text-[#FF2D2D] hover:text-[#B10000] transition">FAQ</Link> — Common questions</li>
            <li>✅ <Link href="/help" className="text-[#FF2D2D] hover:text-[#B10000] transition">Help Center</Link> — Guides and tutorials</li>
            <li>✅ <Link href="/status" className="text-[#FF2D2D] hover:text-[#B10000] transition">Status Page</Link> — Check platform status</li>
            <li>✅ <a href="https://x.com/ZRP_AI" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">X / Twitter</a> — Latest announcements</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Try These First</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Refresh the page</li>
            <li>✅ Reconnect wallet</li>
            <li>✅ Check SOL balance</li>
            <li>✅ Try again later</li>
          </ul>
        </section>

        {/* What We Can Help With */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What We Can Help With</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">✅ We Can Help With</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Token creation issues</li>
                <li>Wallet connection problems</li>
                <li>Transaction failures</li>
                <li>Technical questions</li>
                <li>Bug reports</li>
                <li>Feature requests</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">❌ We Cannot Help With</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Lost private keys</li>
                <li>Recovering stolen funds</li>
                <li>Investment advice</li>
                <li>Price predictions</li>
                <li>Trading decisions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Reporting Issues */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Reporting Issues</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Bug Reports</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Describe the bug clearly</li>
            <li>Steps to reproduce</li>
            <li>Expected behavior</li>
            <li>Actual behavior</li>
            <li>Screenshots or videos</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Security Issues</h3>
          <p className="text-[#BDDBDB] text-sm mb-2">If you find a security issue:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Do <span className="text-white font-medium">NOT</span> share publicly</li>
            <li><span className="text-white font-medium">Email:</span> <a href="mailto:support@zrp.one" className="text-[#FF2D2D] hover:text-[#B10000] transition">support@zrp.one</a></li>
            <li><span className="text-white font-medium">Subject:</span> Security Issue</li>
          </ul>
        </section>

        {/* Community Support */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Support</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Discord Community</h3>
          <p className="text-[#BDDBDB] text-sm mb-2">Join our Discord for community support:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Help channel</span> — Get help from the community</li>
            <li><span className="text-white font-medium">General chat</span> — Discuss crypto and tokens</li>
            <li><span className="text-white font-medium">Announcements</span> — Latest news</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">X Community</h3>
          <p className="text-[#BDDBDB] text-sm mb-2">Follow us on X:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Announcements</span> — Latest updates</li>
            <li><span className="text-white font-medium">Community</span> — Connect with others</li>
            <li><span className="text-white font-medium">Questions</span> — Ask the community</li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/frequently-asked-questions" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❓ FAQ</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Common questions answered</p>
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
          <h2 className="text-2xl font-bold text-white mb-3">Need Help?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            We're here to help. Reach out and we'll get back to you as soon as possible.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Contact Support
          </a>
        </section>
      </div>
    </div>
  );
}
