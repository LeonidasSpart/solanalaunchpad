import Link from 'next/link';

export default function OpenSourcePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">About ZRP</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Open <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Source</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          ZRP is fully open source. Anyone can view, audit, and contribute to the code.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Why Open Source Matters */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Open Source Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">👁️ Transparency</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Code is visible to everyone</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🔒 Security</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Anyone can audit</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🤝 Trust</p>
              <p className="text-[#BDDBDB] text-sm mt-1">No hidden logic</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">👥 Community</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Anyone can contribute</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center md:col-span-2">
              <p className="text-white font-semibold">🚀 Innovation</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Faster development</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Code Availability</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Public repository on GitHub</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Full source code available</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">MIT License — Free to use</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">What You Can Do</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">View the code</p>
                <p className="text-[#BDDBDB] text-sm">Browse the repository</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Audit for security</p>
                <p className="text-[#BDDBDB] text-sm">Review the codebase</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Fork the project</p>
                <p className="text-[#BDDBDB] text-sm">Create your own copy</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Contribute improvements</p>
                <p className="text-[#BDDBDB] text-sm">Submit pull requests</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">5</span>
              <div>
                <p className="text-white text-sm font-medium">Build your own version</p>
                <p className="text-[#BDDBDB] text-sm">Customize and deploy</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Contribute */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Contribute</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">1. Fork the Repository</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to GitHub</p>
                <p className="text-[#BDDBDB] text-sm"><a href="https://github.com/LeonidasSpart/solanalaunchpad" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition">github.com/LeonidasSpart/solanalaunchpad</a></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Fork"</p>
                <p className="text-[#BDDBDB] text-sm">Create your own copy</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Create your own copy</p>
                <p className="text-[#BDDBDB] text-sm">Fork the repository to your account</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">2. Make Changes</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Clone your fork</p>
                <p className="text-[#BDDBDB] text-sm">Download the code locally</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Create a feature branch</p>
                <p className="text-[#BDDBDB] text-sm">Use a descriptive branch name</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Make your changes</p>
                <p className="text-[#BDDBDB] text-sm">Implement your contribution</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Test thoroughly</p>
                <p className="text-[#BDDBDB] text-sm">Ensure everything works</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">3. Submit a Pull Request</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Push your changes</p>
                <p className="text-[#BDDBDB] text-sm">Push to your fork</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Open a Pull Request</p>
                <p className="text-[#BDDBDB] text-sm">Submit to the main repository</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Describe your changes</p>
                <p className="text-[#BDDBDB] text-sm">Include details and reasoning</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Wait for review</p>
                <p className="text-[#BDDBDB] text-sm">Maintainers will review</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contribution Guidelines */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contribution Guidelines</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What We're Looking For</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Bug fixes</li>
            <li>✅ New features</li>
            <li>✅ Documentation improvements</li>
            <li>✅ Performance enhancements</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">What to Avoid</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ Breaking changes</li>
            <li>❌ Unrelated changes</li>
            <li>❌ Poor documentation</li>
            <li>❌ Untested code</li>
          </ul>
        </section>

        {/* Code Quality */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Code Quality</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Standards</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Standard</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Requirement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Language</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">TypeScript</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Style</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">ESLint + Prettier</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Testing</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">Test your changes</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Documentation</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">Update docs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Review Process</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Submit pull request</p>
                <p className="text-[#BDDBDB] text-sm">Open your PR</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Review by maintainers</p>
                <p className="text-[#BDDBDB] text-sm">Team reviews the code</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Feedback and changes</p>
                <p className="text-[#BDDBDB] text-sm">Address any issues</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Merge when approved</p>
                <p className="text-[#BDDBDB] text-sm">Your contribution is merged</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Audits */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Security Audits</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Audit Process</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">Code review</span> — Manual review</li>
            <li><span className="text-white font-medium">Testing</span> — Automated and manual</li>
            <li><span className="text-white font-medium">Community</span> — Public review</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">How to Audit</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>View the code on GitHub</li>
            <li>Clone the repository</li>
            <li>Review the code</li>
            <li>Report issues</li>
          </ul>
        </section>

        {/* License */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">License</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">MIT License</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Free to use — Any purpose</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Free to modify — Any changes</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Free to share — Any distribution</span>
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Get Involved</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Ways to Contribute</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Code — Fix bugs, add features</li>
            <li>✅ Documentation — Improve guides</li>
            <li>✅ Testing — Test and report issues</li>
            <li>✅ Community — Help others</li>
            <li>✅ Feedback — Suggest improvements</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">GitHub Repository</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">🔗 URL:</span>
              <a href="https://github.com/LeonidasSpart/solanalaunchpad" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition text-sm">
                github.com/LeonidasSpart/solanalaunchpad
              </a>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">🐛 Issues:</span>
              <a href="https://github.com/LeonidasSpart/solanalaunchpad/issues" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition text-sm">
                Report bugs
              </a>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">🔄 Pull Requests:</span>
              <a href="https://github.com/LeonidasSpart/solanalaunchpad/pulls" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition text-sm">
                Submit changes
              </a>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/mission" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🎯 Our Mission</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">The vision behind ZRP</p>
            </Link>
            <Link href="/help/what-is-zrp" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❓ What is ZRP?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Learn about the platform</p>
            </Link>
            <Link href="/help/community-guidelines" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">👥 Community Guidelines</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Join our community</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Join the ZRP Community</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            View, audit, and contribute to ZRP on GitHub. Everyone is welcome.
          </p>
          <a
            href="https://github.com/LeonidasSpart/solanalaunchpad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            View on GitHub
          </a>
        </section>
      </div>
    </div>
  );
}
