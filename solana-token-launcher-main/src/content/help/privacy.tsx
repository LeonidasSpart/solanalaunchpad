import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">About ZRP</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Privacy <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Policy</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we handle your data.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Information We Collect */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">What We Collect</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Wallet Addresses</span>
              <span className="text-white text-sm font-medium">Public keys used for transactions</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Token Information</span>
              <span className="text-white text-sm font-medium">Name, symbol, supply, logo</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Creator Info</span>
              <span className="text-white text-sm font-medium">Name, website, social links</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Transaction Data</span>
              <span className="text-white text-sm font-medium">Amounts, timestamps, hashes</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Usage Data</span>
              <span className="text-white text-sm font-medium">Pages visited, actions taken</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">What We DON'T Collect</h3>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
              <li>❌ Private keys</li>
              <li>❌ Seed phrases</li>
              <li>❌ Passwords</li>
              <li>❌ Personal contact info (unless provided)</li>
              <li>❌ Financial information</li>
            </ul>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Uses</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Token Creation</span>
              <span className="text-white text-sm font-medium">Create your tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Transaction Processing</span>
              <span className="text-white text-sm font-medium">Handle payments</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Platform Improvement</span>
              <span className="text-white text-sm font-medium">Analyze usage</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Support</span>
              <span className="text-white text-sm font-medium">Provide customer support</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Compliance</span>
              <span className="text-white text-sm font-medium">Legal obligations</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Legal Basis</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Performance of contract — Token creation</li>
            <li>✅ Legitimate interests — Platform improvement</li>
            <li>✅ Consent — For non-essential data</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
            <h3 className="text-white font-semibold">We Never Sell Your Data</h3>
            <p className="text-[#BDDBDB] text-sm mt-1">❌ We do NOT sell your personal information.</p>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">We Share With:</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Pinata</span>
              <span className="text-white text-sm font-medium">IPFS storage</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Helius</span>
              <span className="text-white text-sm font-medium">RPC infrastructure</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Railway</span>
              <span className="text-white text-sm font-medium">Hosting</span>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Security Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🔒 Encryption</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Data encrypted in transit</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🔐 Secure APIs</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Protected endpoints</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🛡️ Access Control</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Limited access</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">How We Protect You</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Non-custodial design</li>
            <li>✅ No private key storage</li>
            <li>✅ Secure infrastructure</li>
          </ul>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">How Long We Keep Data</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Token Data</span>
              <span className="text-white text-sm font-medium">Indefinitely (on-chain)</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Transaction Data</span>
              <span className="text-white text-sm font-medium">For legal compliance</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Usage Data</span>
              <span className="text-white text-sm font-medium">As needed for improvement</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Your Rights</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Access your data</li>
            <li>✅ Request deletion</li>
            <li>✅ Opt out of marketing</li>
          </ul>
        </section>

        {/* Cookies and Tracking */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">We Use:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">🍪 Essential</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Platform functionality</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <p className="text-white font-semibold">📊 Analytics</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Performance tracking</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">You Can:</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Control cookie settings</li>
            <li>✅ Opt out of non-essential cookies</li>
            <li>✅ Clear cookies anytime</li>
          </ul>
        </section>

        {/* Third-Party Services */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Services We Use</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Pinata</span>
              <span className="text-white text-sm font-medium">IPFS storage</span>
              <a href="https://pinata.cloud/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] text-sm transition">Privacy Policy →</a>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Helius</span>
              <span className="text-white text-sm font-medium">RPC</span>
              <a href="https://helius.xyz/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] text-sm transition">Privacy Policy →</a>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Railway</span>
              <span className="text-white text-sm font-medium">Hosting</span>
              <a href="https://railway.app/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FF2D2D] hover:text-[#B10000] text-sm transition">Privacy Policy →</a>
            </div>
          </div>
        </section>

        {/* Children's Privacy */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>❌ We do not collect data from children under 13</li>
            <li>❌ Our services are not intended for children</li>
          </ul>
        </section>

        {/* Changes to This Policy */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">We may update this policy. We'll notify you of changes by:</p>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Posting the new policy</li>
            <li>Updating the "Last updated" date</li>
            <li>Informing users of material changes</li>
          </ul>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-[#BDDBDB] text-sm mb-4">If you have privacy questions:</p>
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
            <Link href="/help/terms" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📜 Terms of Service</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Read our terms and conditions</p>
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
            Your privacy is protected. Launch with confidence.
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
