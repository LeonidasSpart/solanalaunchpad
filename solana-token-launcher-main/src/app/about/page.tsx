// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Democratizing Solana <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Token Creation</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          We believe everyone should have access to the tools needed to create and launch tokens on the Solana blockchain.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Mission Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
          <p>
            ZRP was founded to make Solana token creation accessible to everyone. We believe that the power of blockchain technology should not be limited to developers and technical experts.
          </p>
          <p className="mt-3">
            Our platform removes the technical barriers that prevent creators, entrepreneurs, and innovators from bringing their token ideas to life. With our no-code solution, anyone can create professional-grade Solana tokens in minutes.
          </p>
        </section>

        {/* Why Choose ZRP Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Choose ZRP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-1">🚀 No Technical Knowledge Required</h3>
              <p className="text-[#BDDBDB] text-sm">Create tokens without coding or blockchain expertise.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-1">⚡ Test Before You Launch</h3>
              <p className="text-[#BDDBDB] text-sm">Free devnet testing before going live on mainnet.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-1">🛡️ Professional Results</h3>
              <p className="text-[#BDDBDB] text-sm">Enterprise-grade tokens with proper metadata and standards.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-1">💰 Transparent Pricing</h3>
              <p className="text-[#BDDBDB] text-sm">No hidden fees, no subscriptions — just simple, clear pricing.</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-[#BDDBDB] mb-4">The principles that guide everything we build.</p>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold">Accessibility</h3>
              <p className="text-[#BDDBDB]">We believe blockchain technology should be accessible to everyone, regardless of technical background.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold">Security</h3>
              <p className="text-[#BDDBDB]">Security is our top priority. We implement best practices to ensure your tokens are safe and reliable.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold">Transparency</h3>
              <p className="text-[#BDDBDB]">We maintain complete transparency in our pricing, processes, and token creation methods.</p>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Built on Solana</h2>
          <p className="mb-3">
            We chose Solana as our blockchain platform because of its superior performance, low costs, and growing ecosystem. Solana offers:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB]">
            <li>Lightning-fast transaction speeds (65,000 TPS)</li>
            <li>Ultra-low transaction fees (fractions of a penny)</li>
            <li>Energy-efficient proof-of-stake consensus</li>
            <li>Growing ecosystem of DeFi and NFT projects</li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs bg-[#FF2D2D]/20 text-[#FF2D2D] px-3 py-1 rounded-full border border-[#FF2D2D]/20">SPL Token Standard Compliant</span>
            <span className="text-xs bg-[#FF2D2D]/20 text-[#FF2D2D] px-3 py-1 rounded-full border border-[#FF2D2D]/20">Metaplex Metadata Integration</span>
            <span className="text-xs bg-[#FF2D2D]/20 text-[#FF2D2D] px-3 py-1 rounded-full border border-[#FF2D2D]/20">Solana Wallet Support</span>
            <span className="text-xs bg-[#FF2D2D]/20 text-[#FF2D2D] px-3 py-1 rounded-full border border-[#FF2D2D]/20">Solscan Explorer Compatible</span>
          </div>
        </section>

        {/* Impact Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="text-2xl font-bold text-[#FF2D2D]">100+</div>
              <div className="text-[#BDDBDB] text-xs">Tokens Created</div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="text-2xl font-bold text-[#FF2D2D]">99.9%</div>
              <div className="text-[#BDDBDB] text-xs">Success Rate</div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="text-2xl font-bold text-[#FF2D2D]">&lt;60s</div>
              <div className="text-[#BDDBDB] text-xs">Avg Creation Time</div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="text-2xl font-bold text-[#FF2D2D]">24/7</div>
              <div className="text-[#BDDBDB] text-xs">Platform Availability</div>
            </div>
          </div>
        </section>

        {/* ✅ Updated Team Section – Full List */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
          <p className="text-[#BDDBDB] mb-6">
            We're a diverse team of builders, creators, and problem-solvers – united by a shared vision of making Solana accessible to everyone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Leonidas</p>
              <p className="text-[#BDDBDB] text-sm">Owner &amp; Founder</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Tanner</p>
              <p className="text-[#BDDBDB] text-sm">CFO</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Yamina</p>
              <p className="text-[#BDDBDB] text-sm">Community Development</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Olivier</p>
              <p className="text-[#BDDBDB] text-sm">Frontend Engineer</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Guido</p>
              <p className="text-[#BDDBDB] text-sm">Backend Engineer</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Schmid</p>
              <p className="text-[#BDDBDB] text-sm">Network Engineer</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Silvia</p>
              <p className="text-[#BDDBDB] text-sm">Marketing Manager</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Lorena</p>
              <p className="text-[#BDDBDB] text-sm">Design</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">Carol</p>
              <p className="text-[#BDDBDB] text-sm">HR</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Be part of the growing community of creators who are building the future of blockchain.
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
