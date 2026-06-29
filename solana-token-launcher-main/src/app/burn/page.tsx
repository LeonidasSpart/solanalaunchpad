// src/app/burn/page.tsx
import Link from 'next/link';

export default function BurnPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Burn Mechanism</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          How to Burn Solana Tokens: <br className="hidden sm:block" />
          <span className="text-purple-400">Complete Guide</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Learn what token burning is, why it's used, and how to burn Solana tokens. Understand the effects on supply, price, and tokenomics.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Token burning is the process of permanently removing tokens from circulation. This creates scarcity and can increase the value of remaining tokens. Understanding how burning works helps you design better tokenomics and manage your token's supply.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">⚠️ Permanent Action</p>
            <p className="text-zinc-400 text-sm mt-1">
              Burning tokens is a common practice in tokenomics design. It's used for deflationary mechanisms, buyback programs, and supply management. This guide explains how token burning works on Solana and how to implement it for your token.
            </p>
          </div>
        </section>

        {/* What is Token Burning */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What is Token Burning?</h2>
          <p>
            Token burning is the permanent removal of tokens from circulation by sending them to a burn address. A burn address is a wallet address that no one controls, making it impossible to recover the tokens. Once burned, tokens are permanently removed from the total supply.
          </p>
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-xl p-4 mt-4">
            <p className="text-purple-300 text-sm font-semibold">💡 How It Works on Solana</p>
            <p className="text-zinc-400 text-sm mt-1">
              On Solana, tokens are burned by sending them to the mint address itself or to a dedicated burn address. The SPL Token Program recognizes these addresses and permanently removes the tokens from circulation.
            </p>
          </div>
          <p className="mt-3">
            Burning tokens reduces the total supply, creating scarcity. If demand remains constant while supply decreases, the price per token typically increases. This is why burning is often used as a deflationary mechanism in tokenomics.
          </p>
        </section>

        {/* Why Burn Tokens */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Would You Burn Tokens?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">📉 Deflationary Tokenomics</h3>
              <p className="text-zinc-400 text-sm mt-1">Creates a deflationary mechanism where supply decreases over time, potentially increasing token value.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🔄 Buyback and Burn Programs</h3>
              <p className="text-zinc-400 text-sm mt-1">Projects buy tokens from the market and burn them, rewarding holders by creating scarcity.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🗑️ Removing Unsold Tokens</h3>
              <p className="text-zinc-400 text-sm mt-1">Burn tokens from presales that didn't sell or for purposes no longer needed.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🤝 Signaling Commitment</h3>
              <p className="text-zinc-400 text-sm mt-1">By permanently removing tokens, creators show they're not planning to dump supply, building trust with holders.</p>
            </div>
          </div>
        </section>

        {/* How to Burn */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Burn Solana Tokens</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">Choose a Burn Address</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                The most common burn address is the mint address itself. You can also use a dedicated burn address. The SPL Token Program recognizes tokens sent to these addresses as burned.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">Send Tokens to Burn Address</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Using your Solana wallet, send the tokens you want to burn to the burn address. This is a standard token transfer transaction. The tokens will be permanently removed from circulation.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Verify the Burn</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Check the transaction on a block explorer like Solscan. The tokens should show as sent to the burn address. The total supply will reflect the reduced amount.
              </p>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mt-4">
            <p className="text-red-400 text-sm font-semibold">⚠️ Important Warning</p>
            <p className="text-zinc-400 text-sm mt-1">
              Burning tokens is <span className="text-white font-medium">permanent and irreversible</span>. Make sure you want to permanently remove these tokens before sending them to a burn address. Once burned, they cannot be recovered.
            </p>
          </div>
        </section>

        {/* Effects on Supply and Price */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Effects on Supply and Price</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">📊 Supply Reduction</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Burning tokens permanently reduces the total supply. If you burn 10% of tokens, the remaining supply is 90% of the original. This creates scarcity, which can increase the value of remaining tokens if demand stays constant.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">📈 Price Impact</h3>
              <p className="text-zinc-400 text-sm mt-1">
                The price impact depends on market conditions. If demand remains constant while supply decreases, price typically increases. However, burning alone doesn't guarantee price increases. Market sentiment, utility, and other factors also matter.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">🫂 Holder Benefits</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Burning tokens can benefit holders by creating scarcity and potentially increasing price. However, the benefits depend on the amount burned and market conditions. Small burns may have minimal impact, while large burns can significantly affect price.
              </p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-3">
              <p className="text-yellow-400 text-xs font-semibold">Note on Price Impact</p>
              <p className="text-zinc-400 text-xs mt-1">Burning tokens is not a guarantee of price increases. Market conditions, utility, and other factors also affect price. Burning should be part of a broader <Link href="/tokenomics" className="text-purple-400 hover:underline">tokenomics strategy</Link>.</p>
            </div>
          </div>
        </section>

        {/* Burning Strategies */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Token Burning Strategies</h2>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🔥 One-Time Burns</h3>
              <p className="text-zinc-400 text-xs mt-1">Burn a large amount of tokens once, typically at launch or after a milestone. Common for removing unsold presale tokens.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">📅 Regular Burns</h3>
              <p className="text-zinc-400 text-xs mt-1">Burn tokens on a schedule (weekly, monthly, quarterly). Creates ongoing deflation and builds anticipation.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🔄 Buyback and Burn</h3>
              <p className="text-zinc-400 text-xs mt-1">Use revenue or fees to buy tokens from the market, then burn them. Reduces supply while supporting price.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">What is token burning on Solana?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Token burning is the process of permanently removing tokens from circulation by sending them to a burn address where they cannot be recovered. This reduces the total supply, making remaining tokens more scarce and potentially more valuable.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How do you burn Solana tokens?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Send tokens to a burn address (a wallet address that no one controls). The most common burn address is the mint address itself. Once sent to a burn address, the tokens are permanently removed from circulation.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Why would you burn tokens?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Token burning reduces supply, creating scarcity that can increase the value of remaining tokens. It's used for deflationary tokenomics, to reward holders, to remove tokens from circulation, or to implement buyback and burn programs.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Can burned tokens be recovered?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                No, burned tokens cannot be recovered. Once tokens are sent to a burn address, they are permanently removed from circulation. This is why burning is considered a permanent action. Always verify you want to burn tokens before sending them.
              </p>
            </div>
          </div>
        </section>

        {/* Ready to Create */}
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
