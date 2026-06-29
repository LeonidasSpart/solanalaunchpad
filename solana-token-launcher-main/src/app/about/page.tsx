// src/app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Democratizing Solana <br className="hidden sm:block" />
          <span className="text-purple-400">Token Creation</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          We believe everyone should have access to the tools needed to create and launch tokens on the Solana blockchain.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
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
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold mb-1">🚀 No Technical Knowledge Required</h3>
              <p className="text-zinc-400 text-sm">Create tokens without coding or blockchain expertise.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold mb-1">⚡ Test Before You Launch</h3>
              <p className="text-zinc-400 text-sm">Free devnet testing before going live on mainnet.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold mb-1">🛡️ Professional Results</h3>
              <p className="text-zinc-400 text-sm">Enterprise-grade tokens with proper metadata and standards.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold mb-1">💰 Transparent Pricing</h3>
              <p className="text-zinc-400 text-sm">No hidden fees, no subscriptions — just simple, clear pricing.</p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-zinc-400 mb-4">The principles that guide everything we build.</p>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-semibold">Accessibility</h3>
              <p className="text-zinc-400">We believe blockchain technology should be accessible to everyone, regardless of technical background.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold">Security</h3>
              <p className="text-zinc-400">Security is our top priority. We implement best practices to ensure your tokens are safe and reliable.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold">Transparency</h3>
              <p className="text-zinc-400">We maintain complete transparency in our pricing, processes, and token creation methods.</p>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Built on Solana</h2>
          <p className="mb-3">
            We chose Solana as our blockchain platform because of its superior performance, low costs, and growing ecosystem. Solana offers:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-400">
            <li>Lightning-fast transaction speeds (65,000 TPS)</li>
            <li>Ultra-low transaction fees (fractions of a penny)</li>
            <li>Energy-efficient proof-of-stake consensus</li>
            <li>Growing ecosystem of DeFi and NFT projects</li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">SPL Token Standard Compliant</span>
            <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">Metaplex Metadata Integration</span>
            <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">Solana Wallet Support</span>
            <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">Solscan Explorer Compatible</span>
          </div>
        </section>

        {/* Impact Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="text-2xl font-bold text-purple-400">100+</div>
              <div className="text-zinc-500 text-xs">Tokens Created</div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-zinc-500 text-xs">Success Rate</div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="text-2xl font-bold text-purple-400">&lt;60s</div>
              <div className="text-zinc-500 text-xs">Avg Creation Time</div>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <div className="text-zinc-500 text-xs">Platform Availability</div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Our Team</h2>
          <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
            <p className="font-semibold text-white">Built by LeonidasSpart</p>
            <p className="text-zinc-400 text-sm mt-1">
              ZRP was created to remove the technical barriers (Rust, CLI, RPC config) that prevented non-developers from launching SPL tokens.
            </p>
            <p className="text-zinc-400 text-sm mt-3">
              The platform is constantly improved based on user feedback, with new guides, features, and tooling added regularly.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Be part of the growing community of creators who are building the future of blockchain.
          </p>
          <a
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </a>
        </section>
      </div>
    </div>
  );
}
