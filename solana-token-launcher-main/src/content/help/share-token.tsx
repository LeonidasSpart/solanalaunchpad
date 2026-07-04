import Link from 'next/link';

export default function SharingYourTokenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">After Token Creation</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Sharing Your <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Token</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          After creating your token, sharing it is essential for building a community. ZRP makes it easy.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Share on X (Twitter) */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Share on X (Twitter)</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">One-Click Sharing</h3>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Share on X"</p>
                <p className="text-[#BDDBDB] text-sm">After creating your token</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">A pre-filled tweet opens</p>
                <div className="mt-2 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-xs whitespace-pre-wrap">
                  🚀 I just launched $SYMBOL on @ZRP_AI!{' '}
                  {'\n'}Create your own Solana token in 60 seconds → zrp.one
                  {'\n\n'}#Solana #SPLToken #Crypto
                </div>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Add your own message</p>
                <p className="text-[#BDDBDB] text-sm">Personalize the tweet</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">4</span>
              <div>
                <p className="text-white text-sm font-medium">Click "Post"</p>
                <p className="text-[#BDDBDB] text-sm">Your token is live on X!</p>
              </div>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Custom Tweets</h3>
          <p className="text-[#BDDBDB] text-sm mb-3">Try these variations:</p>

          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">📢 Announcement</p>
              <div className="mt-2 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-xs whitespace-pre-wrap">
                🎉 Excited to announce $SYMBOL is now live on Solana!{' '}
                {'\n'}Created with @ZRP_AI in under 60 seconds.
                {'\n\n'}Check it out: https://zrp.one
                {'\n'}#Solana #Crypto
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">👥 Community</p>
              <div className="mt-2 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-xs whitespace-pre-wrap">
                🚀 $SYMBOL is here! Join the community and be part of something special.
                {'\n\n'}Built on Solana with @ZRP_AI.
                {'\n\n'}#Solana #Crypto
              </div>
            </div>
          </div>
        </section>

        {/* Share on Telegram */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Share on Telegram</h2>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Copy your token's mint address</p>
                <p className="text-[#BDDBDB] text-sm">Get it from the token details</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Go to your Telegram group</p>
                <p className="text-[#BDDBDB] text-sm">Navigate to your community</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Share</p>
                <div className="mt-2 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a] font-mono text-[#BDDBDB] text-xs whitespace-pre-wrap">
                  🎉 $SYMBOL is live!{' '}
                  {'\n'}Mint Address: [your_mint_address]{' '}
                  {'\n'}View: https://solscan.io/address/[your_mint_address]{' '}
                  {'\n'}Created with @ZRP_AI
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Share on Discord */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Share on Discord</h2>
          <div className="space-y-2">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">1</span>
              <div>
                <p className="text-white text-sm font-medium">Copy your token's mint address</p>
                <p className="text-[#BDDBDB] text-sm">Get it from the token details</p>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">2</span>
              <div>
                <p className="text-white text-sm font-medium">Go to your Discord server</p>
                <p className="text-[#BDDBDB] text-sm">Navigate to the appropriate channel</p>
              </div>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-3 flex items-start gap-3">
              <span className="text-[#FF2D2D] text-sm font-bold">3</span>
              <div>
                <p className="text-white text-sm font-medium">Share</p>
                <p className="text-[#BDDBDB] text-sm">Share your token details with the community</p>
              </div>
            </div>
          </div>
        </section>

        {/* Share Your Token Link */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Share Your Token Link</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Token Details Link</h3>
          <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
            <span className="text-[#BDDBDB] text-sm">Share the direct link to your token:</span>
            <code className="text-[#FF2D2D] text-sm font-mono bg-[#050505] px-3 py-1 rounded border border-[#1a1a1a]">
              https://zrp.one/tokens/[your_mint_address]
            </code>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Solscan Link</h3>
          <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] flex items-center gap-3">
            <span className="text-[#BDDBDB] text-sm">Share the Solscan link:</span>
            <code className="text-[#FF2D2D] text-sm font-mono bg-[#050505] px-3 py-1 rounded border border-[#1a1a1a]">
              https://solscan.io/address/[your_mint_address]
            </code>
          </div>
        </section>

        {/* Community Building Tips */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Community Building Tips</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Post regularly</span>
              <span className="text-white text-sm font-medium">Keep engagement high</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Share updates</span>
              <span className="text-white text-sm font-medium">Show progress</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Engage with comments</span>
              <span className="text-white text-sm font-medium">Build relationships</span>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] flex justify-between items-center">
              <span className="text-[#BDDBDB]">Create a community</span>
              <span className="text-white text-sm font-medium">Telegram or Discord</span>
            </div>
          </div>
        </section>

        {/* Social Media Strategy */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Social Media Strategy</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Before Launch</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Create social media accounts</li>
            <li>✅ Build a following</li>
            <li>✅ Tease the launch</li>
            <li>✅ Announce the launch date</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">During Launch</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Post the announcement</li>
            <li>✅ Share the mint address</li>
            <li>✅ Engage with responders</li>
            <li>✅ Pin important tweets</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">After Launch</h3>
          <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
            <li>✅ Post regular updates</li>
            <li>✅ Celebrate milestones</li>
            <li>✅ Share community posts</li>
            <li>✅ Keep engagement high</li>
          </ul>
        </section>

        {/* What to Share */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What to Share</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔗 Token address</p>
              <p className="text-[#BDDBDB] text-sm mt-1">So people can find it</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🔍 Solscan link</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Verification</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🏷️ ZRP link</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Platform credibility</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <p className="text-white font-semibold">🖼️ Logo</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Visual recognition</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] md:col-span-2">
              <p className="text-white font-semibold">🗺️ Roadmap</p>
              <p className="text-[#BDDBDB] text-sm mt-1">Future plans</p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/help/view-token" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">👀 Viewing Your Token</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">How to find and view your token</p>
            </Link>
            <Link href="/help/community-guide" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">👥 Building a Community</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Grow your community</p>
            </Link>
            <Link href="/help/marketing" className="group bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/50 transition">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">📢 Marketing Guide</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Promote your token effectively</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Launch your token and start sharing with the world.
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
