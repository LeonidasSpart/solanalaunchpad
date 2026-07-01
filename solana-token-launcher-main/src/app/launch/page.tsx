// src/app/launch/page.tsx
import Link from 'next/link';

export default function LaunchPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Launch Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Launch Solana Token: <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Complete Strategy Guide</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Learn how to successfully launch your Solana token. From creation to promotion, this guide covers everything you need to make your launch successful.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Launching a Solana token is about more than just creating it. A successful launch requires planning, preparation, and promotion. This guide walks you through the complete process from idea to launch day.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">⚠️ Don't Rush</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Many creators rush to launch without proper preparation. They end up with a token that nobody knows about. Follow these steps to ensure your launch gets attention and builds momentum.
            </p>
          </div>
        </section>

        {/* Pre-Launch Preparation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Pre-Launch Preparation</h2>
          <p className="mb-4">Before you create your token, spend time on preparation. This groundwork makes your launch smoother and more successful.</p>

          <h3 className="text-white font-semibold mt-6 mb-3">Define Your Token's Purpose</h3>
          <p className="mb-2">What problem does your token solve? Why should people care? Clear answers to these questions help you communicate your value.</p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-xl p-4 mb-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">💡 Elevator Pitch</p>
            <p className="text-[#BDDBDB] text-sm mt-1">Write down your token's purpose in one sentence. This becomes your elevator pitch.</p>
          </div>
          <p className="mb-2">Memecoins can be fun, but even they need a hook. What makes yours different? Is it the community? The artwork? The story? Identify what makes your token unique. Not sure whether to go the meme route or build real utility? Read our breakdown of <Link href="/guide" className="text-[#FF2D2D] hover:text-[#B10000] transition">token types</Link> before you decide.</p>

          <h3 className="text-white font-semibold mt-6 mb-3">Plan Your Token Economics</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li><span className="text-white">Total Supply:</span> Research similar projects. Too many tokens can make each one worthless. Too few can limit growth.</li>
            <li><span className="text-white">Distribution:</span> Plan this before launch. Unfair distribution hurts trust. Transparent distribution builds it.</li>
            <li><span className="text-white">Budget:</span> Basic creation costs 0.15 SOL. Optional features add more. Budget for these so you're not surprised on launch day.</li>
          </ul>

          <h3 className="text-white font-semibold mt-6 mb-3">Create Your Branding</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li><span className="text-white">Logo:</span> Design something simple, memorable, and works at different sizes.</li>
            <li><span className="text-white">Description:</span> Explain what your token is in plain English. Avoid jargon.</li>
            <li><span className="text-white">Social Media:</span> Twitter is essential. Create accounts before launch day.</li>
          </ul>
        </section>

        {/* Launch Day Strategy */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Launch Day Strategy</h2>
          <p className="mb-4">Coordinate every step carefully. Once your token is minted, details are permanent — so precision matters.</p>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">Create Your Token</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Use ZRP to create your token. Double-check all details before confirming. Once minted, these details are permanent. Save your mint address immediately — you'll share this everywhere.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">Verify on Block Explorers</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Visit Solscan.io and search for your mint address. Verify all details are correct. Take a screenshot of the verified token page — you'll use this for promotion.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Announce Your Launch</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Post on Twitter immediately. Include your mint address, a link to Solscan, and your token's purpose. Use relevant hashtags like #Solana, #SPLToken, and #Crypto. Create a launch thread for more engagement.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <h3 className="text-white font-semibold">Share in Communities</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Post in relevant Discord servers and Telegram groups. Read the rules first. Don't spam. Use announcement channels. Engage authentically and answer questions.
              </p>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">5</span>
                <h3 className="text-white font-semibold">Add Liquidity</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Consider adding liquidity to a DEX like Raydium. This allows people to buy and sell your token. Without liquidity, your token can't be traded easily. Plan how much liquidity you'll add and when.
              </p>
            </div>
          </div>
        </section>

        {/* After Launch */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">After Launch: Building Momentum</h2>
          <p className="mb-4">Launch day is just the beginning. Sustained promotion and community building determine long-term success.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Stay Active</h3>
          <p className="text-[#BDDBDB] text-sm">Don't disappear after launch. Keep posting updates. Share milestones. Engage with your community. Active creators build stronger communities.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Build Trust</h3>
          <p className="text-[#BDDBDB] text-sm">Consider revoking authorities to show commitment. This proves you can't change the token later. It builds trust with holders. Learn more in our <Link href="/revoke" className="text-[#FF2D2D] hover:text-[#B10000] transition">Revoke Authority guide</Link>.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Track Your Progress</h3>
          <p className="text-[#BDDBDB] text-sm">Monitor your token on Solscan. Watch holder count. Track transactions. This data helps you understand your audience and adjust your strategy.</p>
        </section>

        {/* Launch Mistakes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Launch Mistakes to Avoid</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🚀 Launching Without Preparation</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Don't rush to launch. Take time to prepare your branding, description, and social media. A rushed launch looks unprofessional.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔍 Not Being Transparent</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Be honest about your token's purpose and distribution. Hiding information destroys trust. Transparency builds it.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📉 Abandoning After Launch</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Many creators launch and disappear. This kills momentum. Stay active. Keep building. Long-term commitment shows you're serious.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">When is the best time to launch a token?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Launch when you're fully prepared. Have your branding ready, social media set up, and community engaged. Avoid launching during major market events. Weekday launches often perform better.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Do I need to add liquidity immediately?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Not necessarily. Some tokens launch without liquidity and add it later. However, adding liquidity makes your token tradeable, which many holders expect. Plan your strategy based on your goals.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How much should I spend on promotion?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Start with organic promotion. Twitter, Discord, and Telegram are free. Build a genuine following first. Paid promotion can help later, but only if you have a solid foundation.
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
