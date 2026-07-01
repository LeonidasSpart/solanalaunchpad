// src/app/marketing/page.tsx
import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Marketing Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Solana Token Marketing: <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Complete Promotion Guide</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Learn how to effectively market your Solana token. From pre-launch preparation to community building, discover strategies that drive real engagement and growth.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Creating a great Solana token is only half the battle. Without effective marketing, even the best tokens can struggle to gain traction. Marketing in the crypto space requires understanding the community, building authentic relationships, and creating value that resonates with potential holders.
          </p>
          <p className="mt-3">
            This guide covers everything you need to market your Solana token successfully. From pre-launch preparation to ongoing community management, you'll learn proven strategies used by successful projects. Marketing starts <span className="text-white font-medium">before</span> you create your token and continues long after launch.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">💡 Key Principle</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Whether you're launching a memecoin, utility token, or community project, the marketing principles remain the same. Build genuine connections, provide value, stay transparent, and engage consistently. Combine this with a solid <Link href="/guide" className="text-[#FF2D2D] hover:text-[#B10000] transition">launch strategy</Link> for best results.
            </p>
          </div>
        </section>

        {/* Pre-Launch Marketing */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Pre-Launch Marketing: Building Anticipation</h2>
          <p className="mb-4">The best marketing starts before your token exists. Start at least <span className="text-white font-medium">2–4 weeks</span> before you plan to create your token.</p>

          <h3 className="text-white font-semibold mt-6 mb-3">Establish Your Brand Identity</h3>
          <p className="mb-3">Before marketing, define your brand. What makes your token unique? What's your story? Clear brand identity helps all your marketing efforts stay consistent and effective.</p>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li><span className="text-white">Visual Identity:</span> Create a logo, color scheme, and visual style that's memorable and consistent.</li>
            <li><span className="text-white">Voice and Tone:</span> Decide how you'll communicate. Professional? Friendly? Meme-focused? Be consistent.</li>
            <li><span className="text-white">Unique Value Proposition:</span> What makes your token different? Why should people care?</li>
            <li><span className="text-white">Story:</span> Every successful token has a story. Make it compelling and authentic.</li>
          </ul>

          <h3 className="text-white font-semibold mt-6 mb-3">Create Social Media Accounts</h3>
          <p className="mb-3">Set up your social media accounts before launch. Secure your handles early and start posting regularly.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">🐦 Twitter</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Primary platform for crypto marketing. Start daily posting 2-4 weeks before launch.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">💬 Telegram</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Create your community channel early. Build anticipation with updates and teasers.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">🎮 Discord</p>
              <p className="text-[#BDDBDB] text-xs mt-1">For deeper community engagement. Set up channels for announcements and support.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">🌐 Website</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Even a simple landing page helps. Include your token's purpose and social links.</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-6 mb-3">Teaser Campaign</h3>
          <p>Create excitement with a teaser campaign. Share hints about your token without revealing everything.</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-[#BDDBDB] text-sm">
            <li>Countdown to launch date</li>
            <li>Mystery logo reveals</li>
            <li>Hints about features or partnerships</li>
            <li>Community challenges or contests</li>
            <li>Early access opportunities for followers</li>
          </ul>
        </section>

        {/* Twitter Marketing Strategy */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Twitter Marketing Strategy</h2>
          <p className="mb-4">Twitter is where crypto news breaks and communities gather. A strong presence here is essential for token success.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Content Strategy</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li><span className="text-white">Post Regularly:</span> Aim for 3-5 tweets per day minimum.</li>
            <li><span className="text-white">Use Relevant Hashtags:</span> #Solana, #SPLToken, #DeFi, #Crypto.</li>
            <li><span className="text-white">Engage with Others:</span> Reply to tweets, retweet relevant content, and build relationships.</li>
            <li><span className="text-white">Visual Content:</span> Tweets with images or videos perform better.</li>
            <li><span className="text-white">Threads:</span> Use threads to explain complex topics and tell your story.</li>
          </ul>

          <h3 className="text-white font-semibold mt-6 mb-3">Launch Day Twitter Strategy</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li><span className="text-white">Launch Thread:</span> Create a comprehensive thread explaining your token</li>
            <li><span className="text-white">Pin Important Tweets:</span> Pin your launch announcement and key information</li>
            <li><span className="text-white">Share Links:</span> Include links to your token on Solscan, Raydium, and your website</li>
            <li><span className="text-white">Engage Actively:</span> Respond to every comment and question throughout the day</li>
          </ul>
        </section>

        {/* Community Building */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Building: Telegram and Discord</h2>
          <p className="mb-4">Strong communities are the foundation of successful tokens.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Telegram Community</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li><span className="text-white">Security:</span> Use anti-bot measures, set clear rules, and moderate actively.</li>
            <li><span className="text-white">Announcements:</span> Create a separate channel for official announcements.</li>
            <li><span className="text-white">Active Moderation:</span> Respond to questions and keep discussions on track.</li>
            <li><span className="text-white">Value:</span> Provide exclusive updates and early information.</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Community Engagement Best Practices</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li>Respond to questions within hours, not days</li>
            <li>Share regular updates, even if there's no major news</li>
            <li>Be transparent about challenges and setbacks</li>
            <li>Celebrate community milestones together</li>
            <li>Listen to feedback and show you value community input</li>
          </ul>
        </section>

        {/* Content Strategy */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Content Creation Strategy</h2>
          <p className="mb-4">Consistent, valuable content keeps your community engaged and attracts new members.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Types of Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">📚 Educational</p>
              <p className="text-[#BDDBDB] text-xs mt-1">How-to guides, explainers, and tutorials about Solana.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">📢 Updates & Announcements</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Regular updates about development and milestones.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">🔍 Behind-the-Scenes</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Show your process, team, and what makes your project unique.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">🏆 Community Highlights</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Feature community members and celebrate achievements.</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-6 mb-3">Content Calendar</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li>3-5 Twitter posts per day</li>
            <li>Daily Telegram updates</li>
            <li>Weekly Discord announcements</li>
            <li>Bi-weekly educational content</li>
            <li>Monthly major updates or milestones</li>
          </ul>
        </section>

        {/* Partnerships */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Partnerships and Influencer Marketing</h2>
          <p className="mb-4">Strategic partnerships can amplify your reach — but choose partners carefully.</p>

          <h3 className="text-white font-semibold mt-4 mb-3">Finding the Right Partners</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li>Share similar values and goals</li>
            <li>Have engaged, authentic communities</li>
            <li>Complement (not compete with) your project</li>
            <li>Are reputable and trustworthy</li>
            <li>Have genuine interest in collaboration</li>
          </ul>

          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">⚠️ Red Flags to Avoid</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-[#BDDBDB] text-sm">
              <li>Guaranteed results or follower counts</li>
              <li>Very low engagement rates</li>
              <li>Generic promotional content</li>
              <li>Pressure tactics or urgency</li>
            </ul>
          </div>
        </section>

        {/* Marketing Mistakes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Marketing Mistakes to Avoid</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🚫 Spam and Over-Promotion</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Don't spam communities or constantly promote. Provide value first, promote second.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🎭 Inauthentic Engagement</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Fake engagement (buying followers, bots) is obvious and destroys trust.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📉 Abandoning After Launch</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Many projects market hard before launch then disappear. Maintain consistent marketing.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔇 Ignoring Community</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Don't create communities then ignore them. Active engagement is essential.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How do I market my Solana token effectively?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Build a strong Twitter presence, create an active Telegram/Discord community, engage authentically, leverage partnerships, create valuable content, and maintain transparency. Start before launch and maintain consistent activity.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What social media platforms are best?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Twitter is essential. Telegram is crucial for community building. Discord offers deeper engagement. Focus on Twitter and Telegram first, then expand.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Should I pay for token marketing services?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Start with organic marketing first. Once you have traction, selective paid promotion can amplify your reach. Avoid services that promise guaranteed results.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How long before launch should I start marketing?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Start 2-4 weeks before launch. This gives you time to build anticipation, establish social media presence, and create a pre-launch community.
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
