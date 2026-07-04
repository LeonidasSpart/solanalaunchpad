import Link from 'next/link';

export default function AffiliateProgramPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Account & Support</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Affiliate <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Program</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Earn SOL by sharing ZRP with others. Our affiliate program is simple and transparent.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">The Process</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Generate your unique referral link</p>
                <p className="text-[#BDDBDB] text-sm">Create your personalized link</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Share the link with others</p>
                <p className="text-[#BDDBDB] text-sm">Promote on social media and communities</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Earn commission when they create tokens</p>
                <p className="text-[#BDDBDB] text-sm">Get paid in SOL</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">What You Earn</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Referral</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">You Earn</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">1 referral</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">15% of their fee</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">10 referrals</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">15% of each fee</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">50 referrals</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">15% of each fee</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Generating Your Link */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Generating Your Link</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 1: Enter Your Wallet</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Go to the Affiliates page</p>
                <p className="text-[#BDDBDB] text-sm">Visit <Link href="/affiliates" className="text-[#FF2D2D] hover:text-[#B10000] transition">/affiliates</Link></p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Enter your Solana wallet address</p>
                <p className="text-[#BDDBDB] text-sm">Paste your public key</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Generate Link"</p>
                <p className="text-[#BDDBDB] text-sm">Create your referral link</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 2: Copy Your Link</h3>
          <div className="bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
            <p className="text-[#BDDBDB] text-sm mb-2">Your unique link will look like:</p>
            <code className="block bg-[#050505] text-[#FF2D2D] font-mono text-sm p-3 rounded-lg border border-[#1a1a1a] break-all">
              https://zrp.one/your-wallet-address
            </code>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Step 3: Share Your Link</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">Share it anywhere:</p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-[#050505]/40 border border-[#1a1a1a] rounded-full text-[#BDDBDB] text-sm">✅ Twitter/X</span>
            <span className="px-3 py-1 bg-[#050505]/40 border border-[#1a1a1a] rounded-full text-[#BDDBDB] text-sm">✅ Discord</span>
            <span className="px-3 py-1 bg-[#050505]/40 border border-[#1a1a1a] rounded-full text-[#BDDBDB] text-sm">✅ Telegram</span>
            <span className="px-3 py-1 bg-[#050505]/40 border border-[#1a1a1a] rounded-full text-[#BDDBDB] text-sm">✅ YouTube</span>
            <span className="px-3 py-1 bg-[#050505]/40 border border-[#1a1a1a] rounded-full text-[#BDDBDB] text-sm">✅ Your website</span>
          </div>
        </section>

        {/* Commission Details */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Commission Details</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Commission Rate</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li><span className="text-white font-medium">15%</span> of the total fee</li>
            <li>Based on full creation fee</li>
            <li>Including add-ons</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Fee Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Plan</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Fee</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Your Commission</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Basic</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.15 SOL</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">0.0225 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">Secure</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.60 SOL</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">0.09 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Example Earnings</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#050505] border border-[#1a1a1a]">
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Referrals</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Fee</th>
                  <th className="px-4 py-3 text-left text-white font-semibold text-sm border border-[#1a1a1a]">Commission</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">1 @ 0.15 SOL</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">0.15 SOL</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">0.0225 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a] bg-[#050505]/20">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">10 @ 0.15 SOL</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">1.50 SOL</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">0.225 SOL</td>
                </tr>
                <tr className="border border-[#1a1a1a]">
                  <td className="px-4 py-3 text-[#BDDBDB] text-sm border border-[#1a1a1a]">50 @ 0.15 SOL</td>
                  <td className="px-4 py-3 text-white text-sm border border-[#1a1a1a]">7.50 SOL</td>
                  <td className="px-4 py-3 text-[#FF2D2D] text-sm font-medium border border-[#1a1a1a]">1.125 SOL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Payment</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">When You Get Paid</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ <span className="text-white font-medium">Immediate</span> — Payout arrives when referral creates their token</li>
            <li>✅ <span className="text-white font-medium">No minimum</span> — Get paid even for one referral</li>
            <li>✅ <span className="text-white font-medium">Direct</span> — Paid to your SOL wallet</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Payout Currency</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ <span className="text-white font-medium">SOL</span> — Paid in Solana (SOL)</li>
            <li>✅ <span className="text-white font-medium">No conversions</span> — Direct to your wallet</li>
          </ul>
        </section>

        {/* No Sign-Up Required */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">No Sign-Up Required</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Why No Sign-Up</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ <span className="text-white font-medium">Simple</span> — No registration needed</li>
            <li>✅ <span className="text-white font-medium">Secure</span> — Your wallet is your ID</li>
            <li>✅ <span className="text-white font-medium">Private</span> — No personal data needed</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">How It Works</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Your wallet address is the affiliate ID</li>
            <li>Commission goes directly to your wallet</li>
            <li>Track referrals through your link</li>
          </ul>
        </section>

        {/* How to Promote */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Promote</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Best Practices</h3>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Twitter/X</span>
              <span className="text-white text-sm font-medium">Share token creation experiences</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Discord</span>
              <span className="text-white text-sm font-medium">Help others and share your link</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">YouTube</span>
              <span className="text-white text-sm font-medium">Create tutorials</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Blog</span>
              <span className="text-white text-sm font-medium">Write about Solana tokens</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Community</span>
              <span className="text-white text-sm font-medium">Be helpful and share resources</span>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">What to Share</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Your referral link</li>
            <li>✅ Benefits of ZRP</li>
            <li>✅ Tutorials and guides</li>
            <li>✅ Your token creation experience</li>
            <li>✅ Community wins</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Content Ideas</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>"How I created my token on ZRP"</li>
            <li>"Why I use ZRP for token creation"</li>
            <li>"Solana token creation made simple"</li>
            <li>"Earn SOL by sharing ZRP"</li>
          </ul>
        </section>

        {/* Terms */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Terms</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">✅ What's Allowed</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Sharing your link anywhere</li>
            <li>Creating content about ZRP</li>
            <li>Helping others learn</li>
            <li>Building community</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">❌ What's Not Allowed</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>Spam</li>
            <li>Misleading marketing</li>
            <li>Fake accounts</li>
            <li>Incentivized sign-ups</li>
          </ul>
        </section>

        {/* Getting Started */}
        <section>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
              <li>✅ Go to <Link href="/affiliates" className="text-[#FF2D2D] hover:text-[#B10000] transition">Affiliates page</Link></li>
              <li>✅ Enter your wallet address</li>
              <li>✅ Generate your link</li>
              <li>✅ Share it</li>
              <li>✅ Earn SOL</li>
            </ul>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/create-token-guide" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🚀 Getting Started</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to create your first token</p>
            </Link>
            <Link href="/help/what-is-zrp" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">❓ What is ZRP?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Learn about the platform</p>
            </Link>
            <Link href="/help/create-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">🪙 Token Creation Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Complete token creation guide</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Start Earning SOL Today</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Share ZRP and earn 15% commission on every token creation.
          </p>
          <a
            href="/affiliates"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Join Affiliate Program
          </a>
        </section>
      </div>
    </div>
  );
}
