import Link from 'next/link';

export default function ReportingSuspiciousActivityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Security & Trust</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Reporting <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Suspicious Activity</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          If you encounter suspicious activity on ZRP, here's how to report it.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What to Report */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Report</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Suspicious Tokens</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Scam tokens</span>
              <span className="text-white text-sm font-medium">Tokens designed to steal funds</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Impersonation</span>
              <span className="text-white text-sm font-medium">Tokens pretending to be legitimate</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Fake projects</span>
              <span className="text-white text-sm font-medium">Projects with no real value</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Pump and dump</span>
              <span className="text-white text-sm font-medium">Schemes to manipulate price</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Suspicious Behavior</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Phishing</span>
              <span className="text-white text-sm font-medium">Attempting to steal private keys</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Spam</span>
              <span className="text-white text-sm font-medium">Unsolicited promotional messages</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Harassment</span>
              <span className="text-white text-sm font-medium">Abusive or threatening behavior</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Impersonation</span>
              <span className="text-white text-sm font-medium">Pretending to be someone else</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Technical Issues</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Security vulnerability</span>
              <span className="text-white text-sm font-medium">Bug in the platform</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Exploit</span>
              <span className="text-white text-sm font-medium">Something being exploited</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Data breach</span>
              <span className="text-white text-sm font-medium">Potential data exposure</span>
            </div>
          </div>
        </section>

        {/* How to Report */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Report</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Via Website</h3>
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
                <p className="text-[#BDDBDB] text-sm">Provide all relevant details</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Include:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1">
                  <li>Description of the issue</li>
                  <li>Relevant links or screenshots</li>
                  <li>Any additional information</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Via Email</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Email</p>
                <p className="text-[#BDDBDB] text-sm"><a href="mailto:support@zrp.one" className="text-[#FF2D2D] hover:text-[#B10000] transition">support@zrp.one</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Subject line</p>
                <p className="text-[#BDDBDB] text-sm">Security Report: [Brief Description]</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Include all relevant details</p>
                <p className="text-[#BDDBDB] text-sm">As much information as possible</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Via X (Twitter)</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Tag @ZRP_AI</p>
                <p className="text-[#BDDBDB] text-sm">Include the official handle</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Share a brief description</p>
                <p className="text-[#BDDBDB] text-sm">Keep it concise</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Don't share sensitive information publicly</p>
                <p className="text-[#BDDBDB] text-sm">Use DM for private details</p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Include */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Include</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">For Suspicious Tokens</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Token address</span>
              <span className="text-white text-sm font-medium">To identify the token</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Transaction ID</span>
              <span className="text-white text-sm font-medium">If relevant</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Screenshots</span>
              <span className="text-white text-sm font-medium">Visual evidence</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Description</span>
              <span className="text-white text-sm font-medium">What happened</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">For Suspicious Users</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Username/handle</span>
              <span className="text-white text-sm font-medium">To identify the user</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Chat logs</span>
              <span className="text-white text-sm font-medium">Evidence of behavior</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Transaction history</span>
              <span className="text-white text-sm font-medium">If relevant</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Description</span>
              <span className="text-white text-sm font-medium">What happened</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">For Technical Issues</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Steps to reproduce</span>
              <span className="text-white text-sm font-medium">How to replicate</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Error messages</span>
              <span className="text-white text-sm font-medium">What you saw</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Screenshots</span>
              <span className="text-white text-sm font-medium">Visual evidence</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Browser/device</span>
              <span className="text-white text-sm font-medium">Environment details</span>
            </div>
          </div>
        </section>

        {/* What Happens Next */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Happens Next</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Process</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Report is received</p>
                <p className="text-[#BDDBDB] text-sm">We acknowledge your submission</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Team investigates</p>
                <p className="text-[#BDDBDB] text-sm">We look into the issue</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Action is taken if needed</p>
                <p className="text-[#BDDBDB] text-sm">We address the issue</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">You may be contacted for more info</p>
                <p className="text-[#BDDBDB] text-sm">We may need additional details</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Actions</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Removal</span>
              <span className="text-white text-sm font-medium">Suspicious content removed</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Flagging</span>
              <span className="text-white text-sm font-medium">Token flagged as suspicious</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Warning</span>
              <span className="text-white text-sm font-medium">User receives a warning</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Ban</span>
              <span className="text-white text-sm font-medium">User banned from platform</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Investigation</span>
              <span className="text-white text-sm font-medium">Further investigation needed</span>
            </div>
          </div>
        </section>

        {/* Protecting Yourself */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Protecting Yourself</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Before Reporting</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Document everything</li>
            <li>Don't engage with suspicious actors</li>
            <li>Don't share private keys</li>
            <li>Don't send money</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">After Reporting</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Stay vigilant</li>
            <li>Monitor your accounts</li>
            <li>Update your passwords</li>
            <li>Share information with the community</li>
          </ul>
        </section>

        {/* Emergency Situations */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Emergency Situations</h2>

          <div className="space-y-4">
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">If You've Been Scammed</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li><span className="text-white font-medium">Stop</span> all transactions</li>
                <li><span className="text-white font-medium">Document</span> everything</li>
                <li><span className="text-white font-medium">Report</span> to ZRP</li>
                <li><span className="text-white font-medium">Report</span> to relevant authorities</li>
                <li><span className="text-white font-medium">Warn</span> the community</li>
              </ul>
            </div>

            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-white font-semibold">If Your Wallet Is Compromised</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li><span className="text-white font-medium">Immediately</span> move funds to a new wallet</li>
                <li><span className="text-white font-medium">Create</span> a new wallet</li>
                <li><span className="text-white font-medium">Revoke</span> all approvals</li>
                <li><span className="text-white font-medium">Report</span> to ZRP</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Community Responsibility */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Responsibility</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">How You Can Help</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Report suspicious activity</li>
            <li>Warn others in the community</li>
            <li>Share security tips</li>
            <li>Stay informed</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">What to Share</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-white font-semibold">✅ Do Share</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Verified security alerts</li>
                <li>Safety tips</li>
                <li>Best practices</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">❌ Don't Share</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Unverified rumors</li>
                <li>Panic-inducing messages</li>
                <li>Sensitive personal info</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/security-checklist" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">✅ Security Checklist</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete pre-launch checklist</p>
            </Link>
            <Link href="/help/rug-pull" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🛡️ Rug Pull Prevention</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to prevent and identify rug pulls</p>
            </Link>
            <Link href="/help/wallet-security" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Wallet Security Best Practices</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Keep your wallet safe</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Stay Safe on ZRP</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Your security matters. Report suspicious activity and help keep the community safe.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Report Suspicious Activity
          </a>
        </section>
      </div>
    </div>
  );
}
