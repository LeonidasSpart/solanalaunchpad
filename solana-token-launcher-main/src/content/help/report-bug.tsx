import Link from 'next/link';

export default function ReportABugPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Troubleshooting</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Report <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">a Bug</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Help us improve ZRP by reporting bugs and issues.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* What to Report */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Report</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Types of Bugs</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Technical</span>
              <span className="text-white text-sm font-medium">Code errors, crashes</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">UI/UX</span>
              <span className="text-white text-sm font-medium">Display issues, usability</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Performance</span>
              <span className="text-white text-sm font-medium">Slow loading, lag</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Security</span>
              <span className="text-white text-sm font-medium">Vulnerabilities</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Data</span>
              <span className="text-white text-sm font-medium">Incorrect information</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Examples</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Token creation fails</span>
              <span className="text-white text-sm font-medium">Technical</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Button not working</span>
              <span className="text-white text-sm font-medium">UI/UX</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Page loading slowly</span>
              <span className="text-white text-sm font-medium">Performance</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wrong balance showing</span>
              <span className="text-white text-sm font-medium">Data</span>
            </div>
          </div>
        </section>

        {/* How to Report */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Report</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Option 1: Contact Form</h3>
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
                <p className="text-white text-sm font-medium">Subject</p>
                <p className="text-[#BDDBDB] text-sm">"Bug Report: [Brief Description]"</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Include:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1">
                  <li>What happened</li>
                  <li>What you expected</li>
                  <li>Steps to reproduce</li>
                  <li>Screenshots</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Option 2: X (Twitter)</h3>
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
                <p className="text-white text-sm font-medium">Include "Bug Report:"</p>
                <p className="text-[#BDDBDB] text-sm">Make it clear it's a bug report</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Describe the issue</p>
                <p className="text-[#BDDBDB] text-sm">Be clear and concise</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Add screenshots</p>
                <p className="text-[#BDDBDB] text-sm">Visual evidence helps</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Option 3: Discord</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Join our Discord</p>
                <p className="text-[#BDDBDB] text-sm"><a href="https://discord.gg/W4qS4xkbn" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">discord.gg/W4qS4xkbn</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Post in #bug-reports</p>
                <p className="text-[#BDDBDB] text-sm">Use the dedicated channel</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Describe the issue</p>
                <p className="text-[#BDDBDB] text-sm">Provide all relevant details</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Tag the team</p>
                <p className="text-[#BDDBDB] text-sm">Use @team or @moderators</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Option 4: GitHub</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to our GitHub</p>
                <p className="text-[#BDDBDB] text-sm"><a href="https://github.com/LeonidasSpart/solanalaunchpad" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">github.com/LeonidasSpart/solanalaunchpad</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Open an issue</p>
                <p className="text-[#BDDBDB] text-sm">Create a new issue</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Label it: "bug"</p>
                <p className="text-[#BDDBDB] text-sm">Use the bug label</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Fill in the template</p>
                <p className="text-[#BDDBDB] text-sm">Use the issue template</p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Include */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Include</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Essential Information</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Description</span>
              <span className="text-white text-sm font-medium">What happened</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Steps</span>
              <span className="text-white text-sm font-medium">How to reproduce</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Expected</span>
              <span className="text-white text-sm font-medium">What should have happened</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Actual</span>
              <span className="text-white text-sm font-medium">What actually happened</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Screenshots</span>
              <span className="text-white text-sm font-medium">Visual evidence</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Additional Information</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Browser</span>
              <span className="text-white text-sm font-medium">Chrome, Firefox, etc.</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Version</span>
              <span className="text-white text-sm font-medium">Browser version</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wallet</span>
              <span className="text-white text-sm font-medium">Phantom, Solflare, etc.</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Network</span>
              <span className="text-white text-sm font-medium">Devnet or Mainnet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Device</span>
              <span className="text-white text-sm font-medium">Desktop, mobile, etc.</span>
            </div>
          </div>
        </section>

        {/* Bug Report Template */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Bug Report Template</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Simple Template</h3>
          <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-xs whitespace-pre-wrap">
Bug Report

Description:
[What happened]

Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happened]

Environment:
· Browser: [Chrome 120]
· Wallet: [Phantom]
· Network: [Devnet]

Screenshots:
[Attach screenshot]
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
                <p className="text-white text-sm font-medium">Report received</p>
                <p className="text-[#BDDBDB] text-sm">Team acknowledges</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Investigation</p>
                <p className="text-[#BDDBDB] text-sm">Issue is reviewed</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Priority</p>
                <p className="text-[#BDDBDB] text-sm">Issue is prioritized</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Fix</p>
                <p className="text-[#BDDBDB] text-sm">Issue is fixed</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">5</span>
              <div>
                <p className="text-white text-sm font-medium">Release</p>
                <p className="text-[#BDDBDB] text-sm">Fix is released</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Timeline</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Priority</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Response Time</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Fix Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">Critical</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">1-4 hours</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">1-2 days</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">High</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">4-12 hours</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">2-5 days</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Medium</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">12-24 hours</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">1-2 weeks</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Low</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">24-48 hours</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Next release</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Severity Levels */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Severity Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">🚨 Critical</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Platform down</li>
                <li>Security breach</li>
                <li>Data loss</li>
              </ul>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">⚠️ High</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Major feature broken</li>
                <li>Users affected</li>
                <li>Workaround needed</li>
              </ul>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">ℹ️ Medium</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Minor feature broken</li>
                <li>UI issues</li>
                <li>Performance problems</li>
              </ul>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📝 Low</p>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Cosmetic issues</li>
                <li>Documentation errors</li>
                <li>Minor bugs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Before Reporting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Before Reporting</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Check These First</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Refresh the page</li>
            <li>✅ Clear your cache</li>
            <li>✅ Update your browser</li>
            <li>✅ Try a different browser</li>
            <li>✅ Check if it's already reported</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Search Existing Issues</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Check GitHub issues</li>
            <li>Check Discord</li>
            <li>Check X (Twitter)</li>
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
            <Link href="/help/feature-requests" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">💡 Feature Requests</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Suggest new features</p>
            </Link>
            <Link href="/help/troubleshooting" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔧 Troubleshooting</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Common issues and fixes</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Help Us Improve</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Your bug reports make ZRP better for everyone. Report issues and help us grow.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Report a Bug
          </a>
        </section>
      </div>
    </div>
  );
}
