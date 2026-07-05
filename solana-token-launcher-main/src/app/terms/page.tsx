import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">About ZRP</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Terms of <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Service</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Please read these terms carefully before using ZRP.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Acceptance of Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
          <p className="text-[#BDDBDB] text-sm">
            By using ZRP, you agree to these terms. If you don't agree, don't use the service.
          </p>
        </section>

        {/* Description of Service */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Description of Service</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">
            ZRP provides a no-code platform for creating SPL tokens on Solana.
          </p>

          <h3 className="text-white font-semibold mt-4 mb-3">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Token creation</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Devnet testing</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Metadata management</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Authority revocation</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] md:col-span-2 flex items-center gap-2">
              <span className="text-green-400">✅</span>
              <span className="text-[#BDDBDB] text-sm">Token management tools</span>
            </div>
          </div>
        </section>

        {/* User Responsibilities */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">You Agree To:</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Provide accurate information</li>
            <li>✅ Comply with laws and regulations</li>
            <li>✅ Not create illegal tokens</li>
            <li>✅ Not infringe intellectual property</li>
            <li>✅ Not promote illegal activities</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">You Are Responsible For:</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Your wallet security</li>
            <li>✅ Your token's compliance</li>
            <li>✅ Your community and users</li>
            <li>✅ Any legal implications</li>
          </ul>
        </section>

        {/* Token Creation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Token Creation</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What We Provide</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Technical platform</li>
            <li>✅ Smart contract interaction</li>
            <li>✅ Metadata storage</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">What We Don't Control</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ Token success or value</li>
            <li>❌ Market conditions</li>
            <li>❌ Third-party actions</li>
          </ul>
        </section>

        {/* Payment Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Fees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold text-lg">🧪 Devnet</p>
              <p className="text-green-400 font-bold text-2xl mt-2">FREE</p>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 text-center">
              <p className="text-white font-semibold text-lg">🚀 Mainnet</p>
              <p className="text-[#FF2D2D] font-bold text-2xl mt-2">0.15–0.60 SOL</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Payment Terms</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Payment required before Mainnet creation</li>
            <li>✅ Fees are non-refundable</li>
            <li>✅ Network fees are included</li>
            <li>✅ No hidden fees</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Your IP</h3>
          <p className="text-[#BDDBDB] text-sm mb-2">You retain ownership of your token's IP:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Name</li>
            <li>Symbol</li>
            <li>Logo</li>
            <li>Description</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Our IP</h3>
          <p className="text-[#BDDBDB] text-sm mb-2">We own the platform IP:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Code</li>
            <li>Design</li>
            <li>Brand</li>
            <li>Content</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">License</h3>
          <p className="text-[#BDDBDB] text-sm mb-2">You grant us a license to:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Store your token data</li>
            <li>Display token information</li>
            <li>Process transactions</li>
          </ul>
        </section>

        {/* Disclaimers */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Disclaimers</h2>

          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mb-4">
            <h3 className="text-white font-semibold">"As Is" Service</h3>
            <p className="text-[#BDDBDB] text-sm mt-2">We provide ZRP "as is" without warranties:</p>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
              <li>❌ No guarantee of success</li>
              <li>❌ No guarantee of value</li>
              <li>❌ No guarantee of availability</li>
            </ul>
          </div>

          <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
            <h3 className="text-white font-semibold">Not Financial Advice</h3>
            <p className="text-[#BDDBDB] text-sm mt-2">We do not provide:</p>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-1 space-y-1">
              <li>❌ Financial advice</li>
              <li>❌ Investment advice</li>
              <li>❌ Trading advice</li>
              <li>❌ Legal advice</li>
            </ul>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">We Are Not Liable For:</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ Loss of profits</li>
            <li>❌ Loss of data</li>
            <li>❌ Loss of value</li>
            <li>❌ Third-party actions</li>
            <li>❌ Market conditions</li>
          </ul>

          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <h3 className="text-white font-semibold">Maximum Liability</h3>
            <p className="text-[#BDDBDB] text-sm mt-1">Our liability is limited to the fees paid.</p>
          </div>
        </section>

        {/* Indemnification */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
          <p className="text-[#BDDBDB] text-sm">
            You agree to defend and hold us harmless from claims arising from your use of ZRP.
          </p>
        </section>

        {/* Prohibited Uses */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Prohibited Uses</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">You May Not:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-[#FF2D2D]">❌</span>
              <span className="text-[#BDDBDB] text-sm">Use for illegal purposes</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-[#FF2D2D]">❌</span>
              <span className="text-[#BDDBDB] text-sm">Violate laws or regulations</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-[#FF2D2D]">❌</span>
              <span className="text-[#BDDBDB] text-sm">Infringe on IP rights</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-[#FF2D2D]">❌</span>
              <span className="text-[#BDDBDB] text-sm">Submit false information</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-2">
              <span className="text-[#FF2D2D]">❌</span>
              <span className="text-[#BDDBDB] text-sm">Spread malware</span>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-center gap-2">
              <span className="text-[#FF2D2D]">❌</span>
              <span className="text-[#BDDBDB] text-sm">Harass or abuse others</span>
            </div>
          </div>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">We May Terminate If:</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ You breach these terms</li>
            <li>✅ You use the platform illegally</li>
            <li>✅ You harm other users</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">You May Terminate:</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Stop using ZRP</li>
            <li>✅ Delete your tokens</li>
          </ul>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
          <p className="text-[#BDDBDB] text-sm">
            These terms are governed by applicable laws.
          </p>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
          <p className="text-[#BDDBDB] text-sm">
            We may update these terms. We'll notify you of material changes.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
          <p className="text-[#BDDBDB] text-sm mb-3">For questions about these terms:</p>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">📧 Email:</span>
              <a href="mailto:support@zrp.one" className="text-[#FF2D2D] hover:text-[#B10000] transition text-sm">
                support@zrp.one
              </a>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">📝 Contact Form:</span>
              <Link href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/privacy" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Privacy Policy</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How we handle your data</p>
            </Link>
            <Link href="/help/what-is-zrp" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❓ What is ZRP?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Learn about the platform</p>
            </Link>
            <Link href="/help/security-settings" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🔒 Security Settings</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Configure your token's security</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Launch your token with confidence.
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
