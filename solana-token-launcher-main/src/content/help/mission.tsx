import Link from 'next/link';

export default function OurMissionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">About ZRP</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Our <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Mission</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Why ZRP exists and what we're building.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Our Vision */}
        <section>
          <div className="bg-[#FF2D2D]/10 border-l-4 border-[#FF2D2D] rounded-r-xl p-6">
            <p className="text-white text-xl font-orbitron font-bold">
              "A world where anyone can create a Solana token in under 60 seconds — no coding required."
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            To democratize Solana token creation by:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🌍 Accessibility</p>
              <p className="text-[#BDDBDB] text-sm mt-1">No-code platform</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💰 Affordability</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Free devnet testing</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 Security</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Non-custodial design</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📚 Education</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Comprehensive guides</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] md:col-span-2">
              <p className="text-white font-semibold">👥 Community</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Open source and community-driven</p>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What We Believe</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">1. Blockchain Should Be Accessible</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Everyone should be able to create tokens, not just developers.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">2. Security is Non-Negotiable</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Non-custodial design ensures you keep control of your assets.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">3. Education Empowers</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Knowledgeable users make better decisions.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">4. Community is Everything</p>
              <p className="text-[#BDDBDB] text-sm mt-1">The community drives innovation and growth.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">5. Open Source Builds Trust</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Transparent code is more trustworthy.</p>
            </div>
          </div>
        </section>

        {/* Why We Built ZRP */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why We Built ZRP</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">The Problem</h3>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mb-4">
            <p className="text-[#BDDBDB] text-sm mb-2">Creating tokens on Solana was:</p>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
              <li>❌ Complex — Required coding knowledge</li>
              <li>❌ Expensive — High developer costs</li>
              <li>❌ Time-consuming — Days of work</li>
              <li>❌ Risk — Easy to make mistakes</li>
            </ul>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Our Solution</h3>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <p className="text-[#BDDBDB] text-sm mb-2">ZRP makes token creation:</p>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
              <li>✅ Simple — No coding required</li>
              <li>✅ Affordable — Free to test</li>
              <li>✅ Fast — Under 60 seconds</li>
              <li>✅ Safe — Non-custodial</li>
            </ul>
          </div>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🌍 1. Accessibility</p>
              <p className="text-[#BDDBDB] text-sm mt-1">We believe blockchain should be for everyone.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔍 2. Transparency</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Open source and honest about everything.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔒 3. Security</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Non-custodial design keeps you safe.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">💡 4. Innovation</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Continuously improving and adding features.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] md:col-span-2">
              <p className="text-white font-semibold">👥 5. Community</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Built by and for the community.</p>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Who We Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🚀 Entrepreneurs</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Launch tokens without hiring developers.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🎨 Creators</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Monetize your community with tokens.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🧪 Developers</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Test ideas quickly on devnet.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📚 Educators</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Teach token creation to students.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] md:col-span-2">
              <p className="text-white font-semibold">🌐 Community</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Build and grow your community.</p>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Join Us</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">How to Get Involved</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Create a token</li>
            <li>✅ Join our community</li>
            <li>✅ Share feedback</li>
            <li>✅ Contribute to open source</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Our Community Channels</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">🐦 X (Twitter):</span>
              <a href="https://x.com/ZRP_AI" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition text-sm">
                @ZRP_AI
              </a>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">💬 Discord:</span>
              <a href="https://discord.gg/W4qS4xkbn" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition text-sm">
                discord.gg/W4qS4xkbn
              </a>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">💻 GitHub:</span>
              <a href="https://github.com/LeonidasSpart/solanalaunchpad" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] transition text-sm">
                github.com/LeonidasSpart/solanalaunchpad
              </a>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/what-is-zrp" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❓ What is ZRP?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Learn about the platform</p>
            </Link>
            <Link href="/help/open-source" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📖 Open Source</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">ZRP is fully open source</p>
            </Link>
            <Link href="/help/community-guidelines" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">👥 Community Guidelines</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Join our community</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Join the Mission</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Be part of the revolution. Create your token today.
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
