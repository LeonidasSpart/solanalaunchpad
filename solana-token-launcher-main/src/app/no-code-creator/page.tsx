// src/app/no-code-creator/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No-Code Solana Token Creator | Create Tokens Without Coding | ZRP',
  description: 'Create Solana tokens without writing a single line of code. Free devnet testing, wallet-connected, non-custodial. Launch your SPL token in under 60 seconds.',
  keywords: ['no code solana token', 'create token without coding', 'solana token creator', 'no-code crypto', 'spl token no code', 'solana token launchpad'],
  openGraph: {
    title: 'No-Code Solana Token Creator | ZRP',
    description: 'Create Solana tokens without writing a single line of code. Free devnet testing included.',
    url: 'https://zrp.one/no-code-creator',
    siteName: 'ZRP',
    images: [
      {
        url: 'https://zrp.one/og/no-code-creator.png',
        width: 1200,
        height: 630,
        alt: 'ZRP No-Code Solana Token Creator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'No-Code Solana Token Creator | ZRP',
    description: 'Create Solana tokens without coding. Free devnet testing.',
    images: ['https://zrp.one/og/no-code-creator.png'],
  },
  alternates: {
    canonical: 'https://zrp.one/no-code-creator',
  },
};

// FAQ Schema for Google Rich Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need to know programming to use no-code platforms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. That's the whole point. If you can use a website and fill in forms, you can create tokens. The platform handles all technical work."
      }
    },
    {
      "@type": "Question",
      "name": "Are no-code platforms less secure than coding myself?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reputable platforms like ZRP are just as secure. They don't store your private keys. Transactions happen directly between your wallet and blockchain. Platforms often include safety features that prevent mistakes."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customize my token beyond platform features?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once your token is created, you can interact with it using any tool. But the creation process is limited to platform features. Most projects don't need custom features during creation."
      }
    },
    {
      "@type": "Question",
      "name": "Can I test my token before launching on mainnet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! ZRP offers FREE devnet testing. Create tokens on devnet with zero cost, then launch on mainnet when you're ready. This is a unique feature that most platforms don't offer."
      }
    }
  ]
};

// HowTo Schema for Google Rich Snippets
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Create a Solana Token Without Coding",
  "description": "Create a Solana token in under 60 seconds using ZRP's no-code platform.",
  "image": "https://zrp.one/og/no-code-creator.png",
  "totalTime": "PT1M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "SOL",
    "value": "0.15"
  },
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Solana wallet (Phantom, Solflare, or Ledger)"
    },
    {
      "@type": "HowToSupply",
      "name": "0.15 SOL for mainnet creation (free on devnet)"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "ZRP Token Creator"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Connect Your Wallet",
      "text": "Connect your Solana wallet. ZRP supports Phantom, Solflare, Torus, and Ledger. The platform can't access your funds.",
      "url": "https://zrp.one/no-code-creator#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Fill in Token Details",
      "text": "Enter your token name, symbol, supply, and decimals. The platform validates everything.",
      "url": "https://zrp.one/no-code-creator#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Add Optional Features",
      "text": "Upload a logo, add description, include social links, and choose authority revocation options.",
      "url": "https://zrp.one/no-code-creator#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Review and Confirm",
      "text": "Review everything, check the fee, and click create. Your wallet asks for approval.",
      "url": "https://zrp.one/no-code-creator#step-4"
    }
  ]
};

export default function NoCodeCreatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">No-Code Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          No-Code Solana <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Token Creator</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Create Solana tokens without writing a single line of code. No-code platforms make token creation accessible to everyone, regardless of technical skills.
        </p>

        {/* Value Props */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">✓</span>
            <span className="text-[#BDDBDB] ml-2">No Coding Required</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">✓</span>
            <span className="text-[#BDDBDB] ml-2">Connect Your Wallet</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">✓</span>
            <span className="text-[#BDDBDB] ml-2">Launch in Minutes</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">✓</span>
            <span className="text-[#BDDBDB] ml-2">Test for Free on Devnet</span>
          </div>
        </div>

        {/* Social Proof Badge */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs">
          <span className="bg-[#FF2D2D]/10 text-[#FF2D2D] px-3 py-1 rounded-full border border-[#FF2D2D]/20">
            🔥 13+ tokens created this week
          </span>
          <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full border border-[#22c55e]/20">
            ⚡ Under 60 seconds
          </span>
          <span className="bg-[#3b82f6]/10 text-[#3b82f6] px-3 py-1 rounded-full border border-[#3b82f6]/20">
            🛡️ Non-custodial
          </span>
        </div>

        {/* Ecosystem Trust Bar */}
        <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
          <span className="text-xs text-[#666]">Works with</span>
          <span className="text-[#888] text-xs font-medium">Phantom</span>
          <span className="text-[#333]">•</span>
          <span className="text-[#888] text-xs font-medium">Solflare</span>
          <span className="text-[#333]">•</span>
          <span className="text-[#888] text-xs font-medium">Ledger</span>
          <span className="text-[#333]">•</span>
          <span className="text-[#888] text-xs font-medium">Raydium</span>
          <span className="text-[#333]">•</span>
          <span className="text-[#888] text-xs font-medium">Orca</span>
          <span className="text-[#333]">•</span>
          <span className="text-[#888] text-xs font-medium">Jupiter</span>
        </div>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Creating a Solana token used to require coding skills. You needed to understand blockchain programming, handle complex transactions, and debug errors. Not anymore. No-code platforms changed everything.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">🚀 No-Code = Accessible for Everyone</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              No-code token creators let anyone create tokens. No programming knowledge. No technical expertise. Just fill in forms, click buttons, and your token is live. This guide explains how they work and why they're the best choice for most people.
            </p>
          </div>
        </section>

        {/* What is a No-Code Token Creator */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What is a No-Code Token Creator?</h2>
          <p>
            A no-code token creator is a web platform that handles all the technical work. Instead of writing code, you use a visual interface. Forms, buttons, and dropdowns replace programming languages.
          </p>
          <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] mt-4">
            <p className="text-[#BDDBDB] text-sm">💡 <span className="text-white font-medium">Think of it like</span> building a website with WordPress instead of HTML. You don't need to know HTML to create a website. Similarly, you don't need Solana programming knowledge to create tokens.</p>
          </div>
          <h3 className="text-white font-semibold mt-6 mb-3">How No-Code Platforms Work</h3>
          <p>
            When you use a no-code platform like ZRP, you connect your wallet. The platform can't access your funds. It just facilitates transactions.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-[#BDDBDB] text-sm">
            <li>You fill in a form with your token details (name, symbol, supply, decimals)</li>
            <li>You upload a logo and choose optional features</li>
            <li>The platform validates everything and shows you what will happen</li>
            <li>When you confirm, your wallet asks for approval</li>
            <li>The platform sends the transaction to Solana and your token is created</li>
          </ul>
        </section>

        {/* Benefits of No-Code */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Benefits of No-Code Token Creation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🎯 Accessibility</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Anyone can create tokens. You don't need a computer science degree. If you can use a website, you can create a token.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">⚡ Speed</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Create a token in minutes, not hours or days. Speed matters when you want to launch quickly or test ideas.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🛡️ Safety</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Platforms validate your inputs, warn about permanent decisions, and prevent common mistakes. This protection is invaluable.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">💰 Cost Efficiency</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">No need to hire developers. Just pay the platform fee and create your token — fractions of developer cost.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] md:col-span-2">
              <h3 className="text-white font-semibold">📚 Support and Guidance</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Platforms provide tutorials, guides, FAQs, and support teams to help when you're stuck.</p>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-6 text-center">
          <p className="text-white font-semibold text-lg mb-2">Ready to see how easy it is?</p>
          <p className="text-[#BDDBDB] text-sm mb-4">Create a free test token on devnet — no SOL required. No wallet? <Link href="/guide" className="text-[#FF2D2D] hover:underline">Learn how to set one up</Link>.</p>
          <Link
            href="/create-mint"
            className="inline-block px-6 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Try Devnet Free →
          </Link>
        </div>

        {/* How to Use */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How to Use a No-Code Token Creator</h2>
          <div className="space-y-4">
            <div id="step-1" className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="text-white font-semibold">Connect Your Wallet</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Start by connecting your Solana wallet. ZRP supports Phantom, Solflare, Torus, and Ledger. The platform can't access your funds, just facilitate transactions.
              </p>
            </div>
            <div id="step-2" className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                <h3 className="text-white font-semibold">Fill in Token Details</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Enter your token information: name, symbol, supply, decimals. The platform shows you what each field means. Fill them in carefully — some details can't be changed after creation.
              </p>
            </div>
            <div id="step-3" className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                <h3 className="text-white font-semibold">Add Optional Features</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Upload a logo. Add a description. Include website and social links. Choose authority revocation options. These features make your token more professional and trustworthy.
              </p>
            </div>
            <div id="step-4" className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</span>
                <h3 className="text-white font-semibold">Review and Confirm</h3>
              </div>
              <p className="text-[#BDDBDB] text-sm mt-2 pl-9">
                Review everything carefully. Check the total fee. Make sure all details are correct. When ready, click create. Your wallet will ask for approval. Approve the transaction and wait for confirmation.
              </p>
            </div>
          </div>
        </section>

        {/* Who Should Use */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Who Should Use No-Code Platforms?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">👤 Non-Technical Creators</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">If you don't know how to code, no-code platforms are essential. They're your only practical option. Don't let technical barriers stop your ideas.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">⚡ Fast Launchers</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Need to launch quickly? No-code platforms are fastest. You can go from idea to token in minutes. Perfect for testing concepts or market opportunities.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">💰 Budget-Conscious Projects</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Hiring developers is expensive. No-code platforms cost fractions of developer fees. If budget matters, platforms offer better value with professional results.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🌱 First-Time Creators</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Creating your first token? Start with no-code. Learn the process without technical complexity before deciding if you need custom solutions later.</p>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Limitations of No-Code Platforms</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔧 Limited Customization</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Platforms offer predefined features. You can't add custom functionality. For most projects, this isn't a problem.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔗 Platform Dependency</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">You rely on the platform being available. But once your token is created, it exists independently. You're not locked to the platform forever.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📋 Feature Constraints</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Platforms add features based on common needs. If you need something unusual, it might not be available. But most projects don't need unusual features.</p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">ZRP No-Code vs Coding Yourself</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  <th className="text-left py-3 px-2 text-[#888] font-medium">Factor</th>
                  <th className="text-center py-3 px-2 text-[#FF2D2D] font-bold">ZRP No-Code</th>
                  <th className="text-center py-3 px-2 text-[#888] font-medium">Coding Yourself</th>
                </tr>
              </thead>
              <tbody className="text-[#BDDBDB]">
                <tr className="border-b border-[#1a1a1a]/50">
                  <td className="py-3 px-2">Time to launch</td>
                  <td className="text-center text-white font-medium">Under 60 seconds</td>
                  <td className="text-center">Hours to days</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]/50">
                  <td className="py-3 px-2">Cost</td>
                  <td className="text-center text-white font-medium">0.15 SOL</td>
                  <td className="text-center">$500–5,000+ dev cost</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]/50">
                  <td className="py-3 px-2">Devnet testing</td>
                  <td className="text-center text-white font-medium">✅ Free</td>
                  <td className="text-center">❌ Complex setup</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]/50">
                  <td className="py-3 px-2">Support & guides</td>
                  <td className="text-center text-white font-medium">✅ 43+ articles</td>
                  <td className="text-center">❌ Self-reliant</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]/50">
                  <td className="py-3 px-2">Authority revocation</td>
                  <td className="text-center text-white font-medium">✅ One-click</td>
                  <td className="text-center">❌ Manual coding</td>
                </tr>
                <tr className="border-b border-[#1a1a1a]/50">
                  <td className="py-3 px-2">Airdrop distribution</td>
                  <td className="text-center text-white font-medium">✅ Built-in (100 wallets)</td>
                  <td className="text-center">❌ Build from scratch</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">Liquidity locking</td>
                  <td className="text-center text-white font-medium">✅ One-click burn</td>
                  <td className="text-center">❌ Complex integration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Do I need to know programming to use no-code platforms?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                No. That's the whole point. If you can use a website and fill in forms, you can create tokens. The platform handles all technical work.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Are no-code platforms less secure than coding myself?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Reputable platforms like ZRP are just as secure. They don't store your private keys. Transactions happen directly between your wallet and blockchain. Platforms often include safety features that prevent mistakes.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I customize my token beyond platform features?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Once your token is created, you can interact with it using any tool. But the creation process is limited to platform features. Most projects don't need custom features during creation.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I test my token before launching on mainnet?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Yes! ZRP offers <span className="text-white font-medium">FREE devnet testing</span>. Create tokens on devnet with zero cost, then launch on mainnet when you're ready. This is a unique feature that most platforms don't offer.
              </p>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href="/create-token-guide" className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition group">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">How to Create a Token →</h3>
              <p className="text-[#888] text-xs mt-1">Step-by-step walkthrough</p>
            </Link>
            <Link href="/checklist" className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition group">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">Pre-Launch Checklist →</h3>
              <p className="text-[#888] text-xs mt-1">8-phase interactive guide</p>
            </Link>
            <Link href="/tokenomics-calculator" className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition group">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">Tokenomics Calculator →</h3>
              <p className="text-[#888] text-xs mt-1">Plan supply, price, allocations</p>
            </Link>
            <Link href="/security" className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition group">
              <h3 className="text-white font-semibold group-hover:text-[#FF2D2D] transition">Security Checklist →</h3>
              <p className="text-[#888] text-xs mt-1">Protect your token and community</p>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create Your Token?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            No coding required. Test for free on devnet, then launch on mainnet in under 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link
              href="/create-mint"
              className="inline-block px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
            >
              Create Your Token
            </Link>
            <Link
              href="/guide"
              className="inline-block px-8 py-3 bg-transparent border border-[#333] hover:border-[#BDDBDB] text-[#BDDBDB] font-semibold rounded-xl transition"
            >
              Read Full Guide
            </Link>
          </div>
          <p className="text-[#666] text-xs mt-4">
            Free devnet testing • No hidden fees • Your keys, your tokens
          </p>
        </section>
      </div>
    </div>
  );
}
