// src/app/checklist/page.tsx
import Link from 'next/link';

export default function ChecklistPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Pre-Launch Checklist</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Pre-Launch Checklist <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">for Solana Tokens</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Don't rush your launch. Use this comprehensive checklist to ensure your Solana token is fully prepared before going live — from tokenomics to community building.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">2–4</span>
            <span className="text-[#BDDBDB] ml-2">Weeks prep</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">8</span>
            <span className="text-[#BDDBDB] ml-2">Checklist phases</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">50+</span>
            <span className="text-[#BDDBDB] ml-2">Action items</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">0</span>
            <span className="text-[#BDDBDB] ml-2">Steps to skip</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Launching a Solana token successfully requires careful preparation. Many creators rush to launch without proper planning, leading to missed opportunities, security issues, and failed launches. This comprehensive checklist ensures you're fully prepared.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">📋 How to Use This Checklist</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Use this checklist <span className="text-white font-medium">2–4 weeks</span> before your planned launch date. Check off each item as you complete it. Don't skip steps — each one contributes to your launch's success.
            </p>
          </div>
        </section>

        {/* Phase 1: Token Fundamentals */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
            Token Fundamentals
          </h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Define your token's foundation before creation.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Define token purpose and value proposition</p>
                <p className="text-[#BDDBDB] text-sm">What problem does your token solve? Write this in one clear sentence.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Research target audience</p>
                <p className="text-[#BDDBDB] text-sm">Who will use your token? Understand their needs and preferences.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Choose token name and symbol</p>
                <p className="text-[#BDDBDB] text-sm">Make it memorable, available, and not trademarked.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Design tokenomics</p>
                <p className="text-[#BDDBDB] text-sm">Plan total supply, distribution, and allocation. See our <Link href="/tokenomics" className="text-[#FF2D2D] hover:text-[#B10000] transition">Tokenomics Guide</Link>.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Decide on authority settings</p>
                <p className="text-[#BDDBDB] text-sm">Will you revoke mint, freeze, or update authority? Learn more in our <Link href="/revoke" className="text-[#FF2D2D] hover:text-[#B10000] transition">Revoke Authority Guide</Link>.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Budget for creation and launch costs</p>
                <p className="text-[#BDDBDB] text-sm">Plan for token creation (0.15 SOL minimum), liquidity (10–50+ SOL), and marketing.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Phase 2: Branding & Assets */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
            Branding &amp; Assets
          </h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Create your visual identity and marketing assets.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Design logo (multiple sizes)</p>
                <p className="text-[#BDDBDB] text-sm">Create logo in 512×512, 256×256, and 128×128 pixels. Test on dark and light backgrounds.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Create social media graphics</p>
                <p className="text-[#BDDBDB] text-sm">Banner images for Twitter, Telegram, and Discord. Keep branding consistent.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Write token description</p>
                <p className="text-[#BDDBDB] text-sm">Clear, compelling description explaining your token's purpose. Keep it under 500 characters for metadata.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Prepare website/landing page</p>
                <p className="text-[#BDDBDB] text-sm">At minimum, create a simple page with token info, social links, and contact.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Create social media accounts</p>
                <p className="text-[#BDDBDB] text-sm">Secure Twitter, Telegram, and Discord accounts before launch. Use consistent usernames.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Phase 3: Technical Preparation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
            Technical Preparation
          </h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Set up your technical infrastructure.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Set up Solana wallet</p>
                <p className="text-[#BDDBDB] text-sm">Install a reputable Solana wallet (Phantom, Solflare, Backpack).</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Fund wallet with SOL</p>
                <p className="text-[#BDDBDB] text-sm">Ensure you have enough SOL for creation, liquidity, and transaction fees.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Test wallet functionality</p>
                <p className="text-[#BDDBDB] text-sm">Send a small test transaction to verify everything works correctly.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Prepare token metadata</p>
                <p className="text-[#BDDBDB] text-sm">Have name, symbol, description, logo URL, and social links ready. Double-check all details.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Choose creation platform</p>
                <p className="text-[#BDDBDB] text-sm">Select a reliable platform like ZRP. Test the interface beforehand.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Phase 4: Community Building */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">4</span>
            Community Building
          </h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Build your community foundation before launch.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Create Telegram/Discord</p>
                <p className="text-[#BDDBDB] text-sm">Set up community channels with clear rules and moderation. Start building before launch.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Set up Twitter account</p>
                <p className="text-[#BDDBDB] text-sm">Twitter is essential for crypto launches. Start posting teasers and building followers.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Build initial community</p>
                <p className="text-[#BDDBDB] text-sm">Engage with crypto communities, share your vision, and attract early supporters.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Prepare launch announcements</p>
                <p className="text-[#BDDBDB] text-sm">Write Twitter threads, Telegram announcements, and press releases. Have them ready to go.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Phase 5: Legal & Compliance */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">5</span>
            Legal &amp; Compliance
          </h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Ensure legal compliance for your launch.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Review legal requirements</p>
                <p className="text-[#BDDBDB] text-sm">Understand regulations in your jurisdiction. Tokens are not securities, but clarify this clearly.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Prepare terms of service</p>
                <p className="text-[#BDDBDB] text-sm">Create clear terms for your website/platform. Include disclaimers about token risks.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Create privacy policy</p>
                <p className="text-[#BDDBDB] text-sm">Required if collecting any user data. Be transparent about data usage.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Phase 6: Marketing Preparation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">6</span>
            Marketing Preparation
          </h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Plan your marketing strategy.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Create marketing strategy</p>
                <p className="text-[#BDDBDB] text-sm">Plan your approach across all channels. See our <Link href="/marketing" className="text-[#FF2D2D] hover:text-[#B10000] transition">Marketing Guide</Link>.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Prepare launch day content</p>
                <p className="text-[#BDDBDB] text-sm">Create Twitter threads, graphics, videos, and announcements. Have everything ready.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Schedule social media posts</p>
                <p className="text-[#BDDBDB] text-sm">Use scheduling tools to maintain consistent posting. Plan content for launch week.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Budget for marketing spend</p>
                <p className="text-[#BDDBDB] text-sm">Allocate funds for paid promotion, influencer partnerships, and advertising if needed.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Phase 7: Launch Day Preparation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">7</span>
            Launch Day Preparation
          </h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Final checks for launch day.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Final token details review</p>
                <p className="text-[#BDDBDB] text-sm">Double-check name, symbol, supply, and all metadata. These are permanent.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Test creation process</p>
                <p className="text-[#BDDBDB] text-sm">If possible, do a test run on devnet. Familiarize yourself with the platform.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Prepare launch announcement</p>
                <p className="text-[#BDDBDB] text-sm">Have your announcement ready to post immediately after creation. Include mint address and key info.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Schedule launch time</p>
                <p className="text-[#BDDBDB] text-sm">Choose a time when your community is most active. Consider time zones.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* Phase 8: Post-Launch Planning */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">8</span>
            Post-Launch Planning
          </h2>
          <p className="text-[#BDDBDB] text-sm mb-4">Plan beyond launch day.</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Plan liquidity addition</p>
                <p className="text-[#BDDBDB] text-sm">Decide when and how much liquidity to add. See our <Link href="/add-liquidity" className="text-[#FF2D2D] hover:text-[#B10000] transition">Liquidity Guide</Link>.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Plan community engagement</p>
                <p className="text-[#BDDBDB] text-sm">Schedule regular updates, AMAs, and engagement activities.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Prepare ongoing marketing</p>
                <p className="text-[#BDDBDB] text-sm">Plan content for weeks after launch. Maintain momentum with regular updates.</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <span className="text-[#FF2D2D] text-lg mt-0.5">☐</span>
              <div>
                <p className="text-white font-medium">Set up tracking systems</p>
                <p className="text-[#BDDBDB] text-sm">Monitor token metrics, holder growth, and community engagement.</p>
              </div>
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How long before launch should I start preparing?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Ideally, start preparing <span className="text-white font-medium">2–4 weeks</span> before your planned launch date. This gives you time to build community, create assets, and ensure everything is ready. Rushing a launch often leads to mistakes.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What's the minimum budget for a token launch?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Plan for at least <span className="text-white font-medium">20–100 SOL</span> total, depending on your goals. This includes token creation (0.15 SOL minimum), initial liquidity (10–50 SOL recommended), and basic marketing.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Do I need a website before launch?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                While not strictly required, a website adds credibility. At minimum, create a simple landing page with token details, social links, and a way to contact you. A professional website significantly improves trust.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Should I build community before or after launch?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Build community <span className="text-white font-medium">before</span> launch. Having an engaged community ready on launch day creates immediate momentum. Start building 2–4 weeks before launch through social media and teasers.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Launch */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            No coding required. Live on mainnet in under 60 seconds.
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
