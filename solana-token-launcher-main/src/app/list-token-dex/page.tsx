// src/app/list-token-dex/page.tsx
import Link from 'next/link';

export default function ListTokenDexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">DEX Listing Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          How to List Your Token <br className="hidden sm:block" />
          <span className="text-purple-400">on Solana DEXs</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Complete guide to listing your Solana token on decentralized exchanges. Learn how to get your token tradeable on Raydium, Orca, Jupiter, and other platforms.
        </p>
      </div>

      <div className="bg-zinc-900 rounded-xl p-6 md:p-8 border border-zinc-800 space-y-12 text-zinc-300 text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Listing your Solana token on decentralized exchanges (DEXs) makes it tradeable and accessible to the broader crypto community. Unlike centralized exchanges that require applications and approvals, DEX listings are permissionless — you just need to add liquidity.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mt-4">
            <p className="text-yellow-400 text-sm font-semibold">⚠️ Next Step After Creation</p>
            <p className="text-zinc-400 text-sm mt-1">
              This guide explains how to list your token on popular Solana DEXs like Raydium, Orca, and aggregators like Jupiter. Listing is the next step after creating your token and adding liquidity. Combined with a solid <Link href="/launch" className="text-purple-400 hover:underline">launch strategy</Link> and marketing efforts, proper DEX listing maximizes your token's reach and trading potential.
            </p>
          </div>
        </section>

        {/* Overview */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Understanding DEX Listings</h2>
          <p className="mb-4">
            Unlike centralized exchanges, DEXs are permissionless — add liquidity and your token is instantly tradeable. However, just being tradeable doesn't guarantee visibility. Most traders use aggregators like Jupiter that search across multiple DEXs. Getting listed on aggregators and tracking sites increases your token's discoverability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
              <h3 className="text-purple-400 font-semibold text-lg text-center">🔄 DEX (Decentralized Exchange)</h3>
              <ul className="list-disc pl-5 mt-3 space-y-1 text-zinc-300 text-sm">
                <li>Permissionless listing</li>
                <li>Just add liquidity</li>
                <li>No application needed</li>
                <li>Instant availability</li>
                <li>Lower fees</li>
              </ul>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
              <h3 className="text-blue-400 font-semibold text-lg text-center">🏦 CEX (Centralized Exchange)</h3>
              <ul className="list-disc pl-5 mt-3 space-y-1 text-zinc-300 text-sm">
                <li>Requires application</li>
                <li>May require fees</li>
                <li>Review process</li>
                <li>Specific requirements</li>
                <li>Higher volume potential</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Listing on Raydium */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Listing on Raydium</h2>
          <p className="mb-4">Raydium is the most popular DEX on Solana — start here for maximum reach.</p>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">Add Liquidity</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                First, add liquidity to Raydium. This creates a trading pair (typically your token/SOL). See our complete <Link href="/add-liquidity" className="text-purple-400 hover:underline">liquidity guide</Link> for detailed steps. Once liquidity is added, your token is automatically tradeable on Raydium. No application needed.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">Verify Your Token</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                Ensure your token metadata is complete and accurate. This includes name, symbol, logo, and description. Incomplete metadata can hurt visibility and trust. Verify your token on <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Solscan</a> to ensure all information displays correctly.
              </p>
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Share Your Pool Address</h3>
              </div>
              <p className="text-zinc-400 text-sm mt-2 pl-9">
                After creating your liquidity pool, you'll receive a pool address. Share this address with your community so they can trade your token. Include it in your marketing materials and social media.
              </p>
            </div>
          </div>
        </section>

        {/* Listing on Other DEXs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Listing on Other DEXs</h2>
          <p className="mb-4">Listing on multiple DEXs increases visibility and trading options. Most tokens start on Raydium then expand.</p>

          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🐳 Orca</h3>
              <p className="text-zinc-400 text-xs mt-1">Offers concentrated liquidity and better capital efficiency. After establishing on Raydium, consider adding liquidity to Orca for additional exposure. The process is similar — just add liquidity to create a trading pair.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🪐 Jupiter Aggregator</h3>
              <p className="text-zinc-400 text-xs mt-1">Jupiter is a liquidity aggregator, not a direct DEX. It searches across all Solana DEXs to find the best prices. Once your token has liquidity on Raydium or Orca, Jupiter automatically includes it in search results. No manual submission needed.</p>
            </div>
          </div>
        </section>

        {/* Tracking Sites */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Getting Listed on Tracking Sites</h2>
          <p className="mb-4">Token tracking sites like CoinGecko provide visibility and legitimacy that can significantly expand your reach.</p>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">📊 CoinGecko</h3>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-zinc-400 text-xs">
                <li>Have adequate liquidity (typically 10-20 SOL minimum)</li>
                <li>Have active trading volume</li>
                <li>Submit through CoinGecko's token submission form</li>
                <li>Provide accurate token information</li>
                <li>Wait for review (typically 1-2 weeks)</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">📈 CoinMarketCap</h3>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-zinc-400 text-xs">
                <li>Higher liquidity requirements</li>
                <li>Sustained trading volume</li>
                <li>Active community</li>
                <li>Proper project documentation</li>
                <li>May require paid listing fees</li>
              </ul>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Other Tracking Sites</h3>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-zinc-400 text-xs">
                <li><span className="text-white">Solscan:</span> Automatically lists all Solana tokens — no submission needed</li>
                <li><span className="text-white">DexScreener:</span> Lists tokens with liquidity on DEXs — automatic once you add liquidity</li>
                <li><span className="text-white">Birdeye:</span> Solana-specific token tracking with real-time data</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Requirements for Successful Listing</h2>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-sm">
            <li><span className="text-white">Adequate Liquidity:</span> Minimum 10-20 SOL worth of liquidity, though 50+ SOL is better for visibility. See our <Link href="/add-liquidity" className="text-purple-400 hover:underline">liquidity guide</Link> for details.</li>
            <li><span className="text-white">Complete Metadata:</span> Token name, symbol, logo, description, and website. Incomplete metadata hurts visibility.</li>
            <li><span className="text-white">Security Measures:</span> Revoked authorities and locked liquidity build trust. See our <Link href="/security" className="text-purple-400 hover:underline">security guide</Link>.</li>
            <li><span className="text-white">Trading Activity:</span> Active trading volume shows your token is legitimate and in demand.</li>
            <li><span className="text-white">Community Presence:</span> Active community and social media presence improves trust and visibility.</li>
          </ul>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Listing Best Practices</h2>
          <div className="space-y-3">
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🚀 Start with Raydium</h3>
              <p className="text-zinc-400 text-xs mt-1">Raydium has the largest user base and liquidity. Start here, then expand to other DEXs as your token grows.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">🔒 Lock Your Liquidity</h3>
              <p className="text-zinc-400 text-xs mt-1">Locking liquidity shows commitment and prevents rug pull concerns. This builds trust and improves listing chances on tracking sites.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">📋 Complete All Metadata</h3>
              <p className="text-zinc-400 text-xs mt-1">Incomplete metadata hurts visibility. Ensure your token has proper name, symbol, logo, description, and website links.</p>
            </div>
            <div className="bg-black/40 rounded-xl p-3 border border-zinc-800">
              <h3 className="text-white font-semibold text-sm">📢 Promote Your Listing</h3>
              <p className="text-zinc-400 text-xs mt-1">Share your DEX listing links with your community. Include pool addresses in your marketing materials and make it easy for people to find and trade your token.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How do I list my Solana token on a DEX?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                First add liquidity to a platform like Raydium or Orca, ensure your token has proper metadata, and then share your trading pair address. Most DEXs automatically list tokens once liquidity is added. See our <Link href="/add-liquidity" className="text-purple-400 hover:underline">liquidity guide</Link> for step-by-step instructions.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Do I need to pay to list on Solana DEXs?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                No, listing on Solana DEXs like Raydium and Orca is free. You only pay for adding liquidity (which requires SOL and your tokens). However, paid listings on tracking sites like CoinGecko or CoinMarketCap may require fees.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">Which DEX should I list on first?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Raydium is the most popular DEX on Solana and recommended for new tokens. It has the highest liquidity and user base. After establishing on Raydium, you can add liquidity to other DEXs like Orca for additional exposure.
              </p>
            </div>
            <div className="bg-black/40 rounded-xl p-4 border border-zinc-800">
              <h3 className="text-white font-semibold">How long does it take to get listed?</h3>
              <p className="text-zinc-400 text-sm mt-1">
                DEX listings are instant once you add liquidity. For aggregators like Jupiter, inclusion is automatic. Tracking sites like CoinGecko may take 1-2 weeks for review, while CoinMarketCap can take longer and may require fees.
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
