// src/app/terms/page.tsx
export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white text-center mb-4">Terms of Service</h1>
      <p className="text-zinc-400 text-center mb-2">Please read these terms carefully before using our token creation services.</p>
      <p className="text-zinc-500 text-center text-sm mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-6 text-zinc-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using ZRP ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Description of Service</h2>
          <p>ZRP provides a no-code platform for creating Solana SPL tokens. Our service allows users to create, deploy, and manage tokens on the Solana blockchain without requiring technical knowledge or coding skills. We support both Solana Devnet (for testing) and Mainnet (for live deployment).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. User Responsibilities</h2>
          <p>As a user of our service, you agree to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Provide accurate and truthful information when creating tokens</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not create tokens for illegal or fraudulent purposes</li>
            <li>Not infringe on intellectual property rights</li>
            <li>Not create tokens that promote hate, violence, or illegal activities</li>
            <li>Use the service in accordance with these terms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Payment Terms</h2>
          <p>Payment terms include:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>All payments are made in SOL (Solana cryptocurrency)</li>
            <li>Payment is required before token creation on Mainnet</li>
            <li>Fees are non-refundable except in cases of technical failure on our part</li>
            <li>We reserve the right to change pricing with notice</li>
            <li>You are responsible for any network fees associated with transactions</li>
            <li>Devnet testing is provided free of charge</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Token Creation and Deployment</h2>
          <p>Regarding token creation:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Tokens can be created on Solana Devnet (testing) or Mainnet (live)</li>
            <li>Once created, tokens cannot be modified (except metadata if update authority is retained)</li>
            <li>We are not responsible for the success or failure of your token</li>
            <li>Token creation is subject to Solana network conditions</li>
            <li>We reserve the right to refuse service for any reason</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Intellectual Property</h2>
          <p>You retain ownership of any intellectual property you provide (logos, names, descriptions). By using our service, you grant us a license to use this information solely for the purpose of creating and deploying your token.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Disclaimers</h2>
          <p>The service is provided "as is" without warranties of any kind. We disclaim:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Any guarantee of token success or value</li>
            <li>Responsibility for market conditions or token performance</li>
            <li>Liability for third-party actions or services</li>
            <li>Any warranty of merchantability or fitness for a particular purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
          <p>In no event shall ZRP be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Indemnification</h2>
          <p>You agree to defend, indemnify, and hold harmless ZRP from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from your use of the service or violation of these terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">10. Prohibited Uses</h2>
          <p>You may not use our service:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">11. Termination</h2>
          <p>We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">12. Governing Law</h2>
          <p>These Terms shall be interpreted and governed by the laws of the jurisdiction in which ZRP operates, without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">13. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">14. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@zrp.one" className="text-purple-400 hover:underline">support@zrp.one</a> or through our <a href="/contact" className="text-purple-400 hover:underline">contact page</a>.</p>
        </section>

        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mt-6">
          <p className="text-red-400 font-semibold text-sm">⚠️ Important Notice</p>
          <p className="text-zinc-400 text-sm mt-1">
            Creating and trading cryptocurrency tokens involves significant risk. The value of tokens can be highly volatile and may result in total loss. This is not financial advice. Please do your own research and consider consulting with a financial advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
