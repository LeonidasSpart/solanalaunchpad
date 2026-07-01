// src/app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white text-center mb-4">Privacy Policy</h1>
      <p className="text-[#BDDBDB] text-center mb-2">Your privacy is important to us. Learn how we collect, use, and protect your information.</p>
      <p className="text-[#BDDBDB] text-center text-sm mb-12">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-6 text-[#BDDBDB] text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Information We Collect</h2>
          <p>We collect minimal information necessary to provide our token creation services:</p>
          <h3 className="text-white font-semibold mt-3 mb-2">Information You Provide</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Token details (name, symbol, description, logo)</li>
            <li>Creator information (name, website, social media links)</li>
            <li>Wallet addresses (for payment and token delivery)</li>
            <li>Contact information (if you contact our support team)</li>
          </ul>
          <h3 className="text-white font-semibold mt-3 mb-2">Information We Collect Automatically</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Transaction data (amounts, timestamps, transaction hashes)</li>
            <li>Website usage data (pages visited, time spent)</li>
            <li>Technical information (IP address, browser type, device information)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Create and deploy your Solana tokens</li>
            <li>Process payments and transactions</li>
            <li>Provide customer support</li>
            <li>Improve our services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information. We may share information only in these limited circumstances:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>With your explicit consent</li>
            <li>To comply with legal requirements</li>
            <li>To protect our rights and prevent fraud</li>
            <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Blockchain Transparency</h2>
          <p>Please note that blockchain transactions are public by nature. When you create a token, the following information becomes publicly visible on the Solana blockchain:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Token mint address</li>
            <li>Transaction hashes</li>
            <li>Wallet addresses involved in transactions</li>
            <li>Token metadata (name, symbol, description, logo URL)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Data Security</h2>
          <p>We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Data Retention</h2>
          <p>We retain your information only as long as necessary to provide our services and comply with legal obligations. Transaction data may be retained for accounting and legal purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Cookies and Tracking</h2>
          <p>We use minimal cookies and tracking technologies to improve your experience and analyze website usage. You can control cookie settings through your browser preferences.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Third-Party Services</h2>
          <p>Our website may contain links to third-party services (like Solscan, Raydium, etc.). We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Children's Privacy</h2>
          <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Contact Us</h2>
          <p>If you have any questions about this privacy policy or our data practices, please contact us at <a href="mailto:support@zrp.one" className="text-[#FF2D2D] hover:text-[#B10000] transition">support@zrp.one</a> or through our <a href="/contact" className="text-[#FF2D2D] hover:text-[#B10000] transition">contact page</a>.</p>
        </section>
      </div>
    </div>
  );
}
