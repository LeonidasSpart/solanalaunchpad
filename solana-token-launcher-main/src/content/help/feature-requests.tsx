import Link from 'next/link';

export default function FeatureRequestsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Account & Support</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Feature <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Requests</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          We're always looking to improve ZRP. Your feedback helps us build better tools.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* How to Submit a Feature Request */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Submit a Feature Request</h2>

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
                <p className="text-[#BDDBDB] text-sm">"Feature Request: [Feature Name]"</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Describe:</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1">
                  <li>What you want</li>
                  <li>Why it's useful</li>
                  <li>How it would work</li>
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
                <p className="text-white text-sm font-medium">Include "Feature Request:"</p>
                <p className="text-[#BDDBDB] text-sm">Make it clear what it is</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Describe your idea</p>
                <p className="text-[#BDDBDB] text-sm">Be clear and concise</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Why it's valuable</p>
                <p className="text-[#BDDBDB] text-sm">Explain the benefit</p>
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
                <p className="text-white text-sm font-medium">Post in #feature-requests</p>
                <p className="text-[#BDDBDB] text-sm">Use the dedicated channel</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Describe your idea</p>
                <p className="text-[#BDDBDB] text-sm">Provide all relevant details</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Discuss with the community</p>
                <p className="text-[#BDDBDB] text-sm">Get feedback and votes</p>
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
                <p className="text-white text-sm font-medium">Label it: "feature-request"</p>
                <p className="text-[#BDDBDB] text-sm">Use the feature request label</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Describe your idea</p>
                <p className="text-[#BDDBDB] text-sm">Provide all relevant details</p>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes a Good Feature Request */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What Makes a Good Feature Request</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Clear Description</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Component</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">What to Include</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">What</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Describe the feature</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Why</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Explain the use case</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">How</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">How it should work</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-white text-sm font-medium border border-[#1a1a1a]">Who</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Who it helps</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Examples</h3>
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-white font-semibold">✅ Good Request</p>
              <div className="bg-[#050505] rounded-lg p-3 mt-2 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-xs whitespace-pre-wrap">
Feature: Token Analytics Dashboard

What: A dashboard showing real-time token metrics
Why: Helps users track their token's performance
How: Connect to Jupiter API for price and volume data
Who: All token creators
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <p className="text-white font-semibold">❌ Bad Request</p>
              <div className="bg-[#050505] rounded-lg p-3 mt-2 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-xs">
Add more features
              </div>
            </div>
          </div>
        </section>

        {/* What We Look For */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What We Look For</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Prioritization Factors</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">User benefit</span>
              <span className="text-white text-sm font-medium">Helps many users</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Implementation cost</span>
              <span className="text-white text-sm font-medium">Time and complexity</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Platform fit</span>
              <span className="text-white text-sm font-medium">Aligns with ZRP's goals</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Impact</span>
              <span className="text-white text-sm font-medium">Improves the experience</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Common Requests</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Feature</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Status</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Token Analytics</td>
                  <td className="px-4 py-3 text-green-400 text-sm font-medium border border-[#1a1a1a]">✅ Added</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Real-time metrics</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Social Sharing</td>
                  <td className="px-4 py-3 text-green-400 text-sm font-medium border border-[#1a1a1a]">✅ Added</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Share on X</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">More Templates</td>
                  <td className="px-4 py-3 text-green-400 text-sm font-medium border border-[#1a1a1a]">✅ Added</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">4 templates available</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Token Staking</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">🟡 Planned</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Future release</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Mobile App</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">🟡 Planned</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Future release</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Feature Request Process */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Feature Request Process</h2>

          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Submit</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Submit your request</li>
                  <li>Clear description</li>
                  <li>Provide examples</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Review</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Team reviews the request</li>
                  <li>Feasibility assessment</li>
                  <li>Priority evaluation</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Update</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>You'll be informed</li>
                  <li>Timeline (if approved)</li>
                  <li>Progress updates</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Release</p>
                <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
                  <li>Feature is built</li>
                  <li>Tested thoroughly</li>
                  <li>Released to users</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community Voting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Voting</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Upvote Features</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Discord</span>
              <span className="text-white text-sm font-medium">React with 👍</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">X (Twitter)</span>
              <span className="text-white text-sm font-medium">Like and retweet</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">GitHub</span>
              <span className="text-white text-sm font-medium">Star issues</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Most Requested</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Feature</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Votes</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Token Staking</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">🔥 50+</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">Planned</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Mobile App</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">🔥 30+</td>
                  <td className="px-4 py-3 text-yellow-500 text-sm font-medium border border-[#1a1a1a]">Planned</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Multi-Chain Support</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-bold border border-[#1a1a1a]">🔥 20+</td>
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Considered</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* What We Won't Build */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What We Won't Build</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Requests We Typically Decline</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ Centralized features</li>
            <li>❌ Custodial solutions</li>
            <li>❌ Unrelated to token creation</li>
            <li>❌ Highly specialized tools</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Why We Decline</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Doesn't align with mission</li>
            <li>Too complex for value</li>
            <li>Outside expertise</li>
            <li>Security concerns</li>
          </ul>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/help/contact-support" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📞 Contact Support</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Get help from the team</p>
            </Link>
            <Link href="/help/report-a-bug" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🐛 Report a Bug</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Report issues</p>
            </Link>
            <Link href="/help/what-is-zrp" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❓ What is ZRP?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Learn about the platform</p>
            </Link>
            <Link href="/help/roadmap" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🗺️ Roadmap</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">What's coming next</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Have a Feature Idea?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Your feedback shapes the future of ZRP. Submit your feature request today.
          </p>
          <a
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Submit a Feature Request
          </a>
        </section>
      </div>
    </div>
  );
}
