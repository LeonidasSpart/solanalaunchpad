// src/app/community/page.tsx
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Community Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Build a Thriving <br className="hidden sm:block" />
          <span className="text-purple-400">Token Community</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Learn how to build and manage a strong community for your Solana token. From setup to growth, discover strategies for engagement and long-term success.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            A strong community is the foundation of successful token projects. Your community supports you, promotes your token, provides feedback, and creates long-term value. Building genuine community takes time and effort, but it's essential for sustainable success.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">⚠️ Start Before Launch</p>
            <p className="text-zinc-400 text-sm mt-1">
              This guide covers everything you need to build and manage a thriving community for your Solana token. Community building starts <span className="text-white font-medium">before</span> you launch your token and continues indefinitely. Combine community building with effective <Link href="/marketing" className="text-purple-400 hover:underline">marketing</Link> and a solid <Link href="/launch" className="text-purple-400 hover:underline">launch strategy</Link> for maximum impact.
            </p>
          </div>
        </section>

        {/* Why Community Matters */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Community Matters</h2>
          <p className="mb-4">Community is more than just holders. A strong community provides support, feedback, promotion, and long-term sustainability. Tokens without communities struggle to gain traction or maintain value.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-2xl mb-1">📢</p>
              <p className="text-white font-semibold text-xs">Support &amp; Promotion</p>
              <p className="text-zinc-500 text-xs">Organic marketing</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-2xl mb-1">💡</p>
              <p className="text-white font-semibold text-xs">Feedback &amp; Ideas</p>
              <p className="text-zinc-500 text-xs">Valuable project input</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-2xl mb-1">🌐</p>
              <p className="text-white font-semibold text-xs">Network Effects</p>
              <p className="text-zinc-500 text-xs">Growing attraction</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-2xl mb-1">🤝</p>
              <p className="text-white font-semibold text-xs">Long-term Holding</p>
              <p className="text-zinc-500 text-xs">Reduced volatility</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-2xl mb-1">✅</p>
              <p className="text-white font-semibold text-xs">Legitimacy</p>
              <p className="text-zinc-500 text-xs">Shows serious commitment</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800 text-center">
              <p className="text-2xl mb-1">💎</p>
              <p className="text-white font-semibold text-xs">Value Creation</p>
              <p className="text-zinc-500 text-xs">Community contributions</p>
            </div>
          </div>
        </section>

        {/* Setting Up Community Channels */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Setting Up Community Channels</h2>
          <p className="mb-4">Choose the right platforms for your community. Different platforms serve different purposes. Start with the essentials, then expand as you grow.</p>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">💬 Telegram</h3>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-zinc-400 text-sm">
                <li><span className="text-white">Security:</span> Use anti-bot measures, set clear rules, and moderate actively</li>
                <li><span className="text-white">Announcements:</span> Create a separate channel for official updates</li>
                <li><span className="text-white">Active Moderation:</span> Respond to questions and keep discussions productive</li>
              </ul>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🎮 Discord</h3>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-zinc-400 text-sm">
                <li>Announcements: Official updates and news</li>
                <li>General Chat: Community discussion</li>
                <li>Support: Help and technical questions</li>
                <li>Suggestions: Community feedback and ideas</li>
                <li>Off-Topic: Casual conversation</li>
              </ul>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🐦 Twitter / X</h3>
              <p className="text-zinc-400 text-sm mt-1">Essential for announcements and reaching broader audiences. Use it for major updates, milestones, and engagement. See our <Link href="/marketing" className="text-purple-400 hover:underline">marketing guide</Link> for Twitter strategies.</p>
            </div>
          </div>
        </section>

        {/* Community Engagement */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Engagement Strategies</h2>
          <p className="mb-4">Active engagement keeps your community alive and growing. Don't just create channels and disappear. Regular engagement builds relationships and trust.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">📢 Regular Updates</h3>
              <p className="text-zinc-400 text-sm mt-1">Post regular updates even when there's no major news. Share progress, milestones, behind-the-scenes content, and upcoming plans.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">⚡ Quick Responses</h3>
              <p className="text-zinc-400 text-sm mt-1">Respond to questions and comments quickly. Aim to respond within hours, not days. Quick responses show you care.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🎉 Host Events</h3>
              <p className="text-zinc-400 text-sm mt-1">AMAs, contests, giveaways, milestone celebrations, and community challenges. Regular events keep engagement high.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🎁 Provide Value</h3>
              <p className="text-zinc-400 text-sm mt-1">Exclusive updates, early access to features, airdrops, educational content, and direct access to team members.</p>
            </div>
          </div>
        </section>

        {/* Community Growth */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Growth Strategies</h2>
          <p className="mb-4">Growing your community requires a combination of organic growth and strategic promotion. Focus on quality over quantity — engaged members are more valuable than inactive ones.</p>

          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🌱 Organic Growth</h3>
              <p className="text-zinc-400 text-xs mt-1">Word-of-mouth, viral content, partnerships, participation in broader Solana communities, and quality content that people want to share.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">📣 Referral Programs</h3>
              <p className="text-zinc-400 text-xs mt-1">Create referral programs that reward members for bringing new people. Token rewards, exclusive access, or special roles.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🤝 Cross-Community</h3>
              <p className="text-zinc-400 text-xs mt-1">Engage authentically in other Solana communities. Build relationships genuinely. People will discover your project through authentic engagement.</p>
            </div>
          </div>
        </section>

        {/* Mistakes to Avoid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Building Mistakes to Avoid</h2>
          <div className="space-y-3">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Creating Channels Then Disappearing</h3>
              <p className="text-zinc-400 text-xs mt-1">Many projects create channels then abandon them. This kills momentum and shows lack of commitment. Stay active consistently.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Ignoring Questions and Feedback</h3>
              <p className="text-zinc-400 text-xs mt-1">Not responding shows you don't value your community. Respond quickly and show you're listening.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Poor Moderation</h3>
              <p className="text-zinc-400 text-xs mt-1">Letting spam, scams, or toxic behavior go unchecked drives away good members. Moderate actively and enforce rules.</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3">
              <h3 className="text-white font-semibold text-sm">🚫 Over-Promising</h3>
              <p className="text-zinc-400 text-xs mt-1">Making promises you can't keep destroys trust. Be realistic. Under-promise and over-deliver.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How do I build a community for my Solana token?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Build a community by setting up Telegram and Discord channels, establishing clear guidelines, engaging regularly, providing value through updates and exclusive content, hosting events, being transparent, responding quickly, and creating a welcoming environment. Start building before token launch and maintain consistent engagement.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What platforms should I use?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Essential platforms include Telegram for real-time chat, Discord for deeper engagement, Twitter for announcements, and Reddit for broader reach. Start with Telegram and Twitter, then expand to Discord as your community grows.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How do I keep my community engaged?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Post regular updates, respond to questions quickly, host regular events and AMAs, share behind-the-scenes content, celebrate milestones, listen to feedback, create contests, and be authentic and transparent. Consistent engagement is key.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Launch */}
        <section className="text-center border-t border-zinc-800 pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Launch Your Token?</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            No coding required. Live on mainnet in under 60 seconds.
          </p>
          <Link
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </Link>
        </section>
      </div>
    </div>
  );
}
