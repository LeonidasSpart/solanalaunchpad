// src/app/charity/page.tsx
import type { Metadata } from 'next';

// ============================================================
// 🚀 SEO & META TAGS – Optimized for Google & Social Sharing
// ============================================================
export const metadata: Metadata = {
  // --- Primary Meta ---
  title: 'ZRP Cares – 35% of Profits for Orphans, Schools, Hospitals & Climate Relief',
  description:
    'We commit 35% of ZRP platform profits to global causes. No borders. No discrimination. 100% on-chain. Join us in building a better world.',
  keywords:
    'ZRP charity, Solana philanthropy, crypto for good, donate to orphans, build schools, climate relief, Web3 social impact, non-profit crypto',

  // --- Robots & Indexing ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // --- Canonical URL ---
  alternates: {
    canonical: 'https://zrp.one/charity',
  },

  // --- Open Graph (Facebook, LinkedIn, Telegram, Discord) ---
  openGraph: {
    title: 'ZRP Cares – 35% of Profits for Global Good',
    description:
      'Supporting orphans, schools, hospitals, and climate relief. No borders. No religion. All equal. 100% transparent.',
    url: 'https://zrp.one/charity',
    siteName: 'ZRP',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://zrp.one/logo.png', // ✅ Replace with your charity banner if available
        width: 1200,
        height: 630,
        alt: 'ZRP Cares – Building a better world with Solana',
      },
    ],
  },

  // --- Twitter Card (X) ---
  twitter: {
    card: 'summary_large_image',
    title: 'ZRP Cares – 35% of Profits for Orphans, Schools & Climate',
    description: 'We give 35% of profits to global causes. No borders. No discrimination. 100% on-chain.',
    images: ['https://zrp.one/logo.png'], // ✅ Replace with your charity banner
    site: '@ZRP_AI',
    creator: '@ZRP_AI',
  },

  // --- Additional SEO ---
  category: 'Blockchain Charity',
  authors: [{ name: 'ZRP Team' }],
  creator: 'ZRP',
  publisher: 'ZRP',
  applicationName: 'ZRP Launchpad',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // --- Verification (Optional: Google Search Console) ---
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

// ============================================================
// 🧡 PAGE COMPONENT
// ============================================================
export default function CharityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          💚 ZRP Cares
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          35% of ZRP profits go to causes that matter – orphans, schools, hospitals, and climate relief.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Equality Statement */}
        <section className="bg-[#050505]/40 rounded-xl p-6 border border-[#FF2D2D]/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">🌍 Our Promise</h2>
          <p className="text-[#BDDBDB] text-base max-w-2xl mx-auto">
            Our support goes <span className="text-[#FF2D2D] font-semibold">worldwide</span> – 
            no religion, no nationality.
          </p>
          <p className="text-[#BDDBDB] text-base max-w-2xl mx-auto mt-2">
            In front of God, all are equal.
          </p>
          <p className="text-[#BDDBDB] text-sm mt-4 opacity-60">
            Every child deserves education. Every community deserves healthcare. Every climate victim deserves relief.
            We don't ask who they are. We just help.
          </p>
        </section>

        {/* Mission */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Our Commitment</h2>
          <p>
            At ZRP, we believe that building the future of blockchain also means building a better world.
          </p>
          <p className="mt-3">
            That's why we commit <span className="text-[#FF2D2D] font-semibold">35% of all platform profits</span> to four critical areas:
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>🧸 Orphans – Providing care and education for children without families</li>
            <li>🏫 Schools – Building and supporting education worldwide</li>
            <li>🏥 Hospitals – Improving healthcare access and infrastructure</li>
            <li>🌍 Climate Disasters – Relief and recovery for climate-affected communities</li>
          </ul>
          <p className="mt-3 text-[#BDDBDB] text-sm opacity-70">
            We support these causes globally – regardless of religion, nationality, or background.
          </p>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-1">💰 35% of Profits</h3>
              <p className="text-[#BDDBDB] text-sm">Allocated to the ZRP Charity Fund every quarter.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-1">🗳️ Community Votes</h3>
              <p className="text-[#BDDBDB] text-sm">Funds are split equally among the four causes, with community input on specific projects.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-1">🔗 Blockchain Transparency</h3>
              <p className="text-[#BDDBDB] text-sm">Every donation is recorded on-chain – verifiable by anyone.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold mb-1">📆 Quarterly Reports</h3>
              <p className="text-[#BDDBDB] text-sm">Full transparency reports published every quarter.</p>
            </div>
          </div>
        </section>

        {/* Four Causes - Visual Cards */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Where Your Support Goes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <div className="text-4xl mb-2">🧸</div>
              <h3 className="text-white font-semibold">Orphans</h3>
              <p className="text-[#BDDBDB] text-xs">Care, education, and a brighter future for children.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <div className="text-4xl mb-2">🏫</div>
              <h3 className="text-white font-semibold">Schools</h3>
              <p className="text-[#BDDBDB] text-xs">Building and supporting education around the globe.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <div className="text-4xl mb-2">🏥</div>
              <h3 className="text-white font-semibold">Hospitals</h3>
              <p className="text-[#BDDBDB] text-xs">Healthcare access and medical infrastructure.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a] text-center">
              <div className="text-4xl mb-2">🌍</div>
              <h3 className="text-white font-semibold">Climate Relief</h3>
              <p className="text-[#BDDBDB] text-xs">Recovery and resilience for climate-affected communities.</p>
            </div>
          </div>
        </section>

        {/* Current Fund */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Current Charity Fund</h2>
          <div className="bg-[#050505]/40 rounded-xl p-6 border border-[#1a1a1a] text-center">
            <div className="text-4xl font-bold text-[#FF2D2D]">$0 SOL</div>
            <p className="text-[#BDDBDB] text-sm mt-2">First donation coming soon. Stay tuned.</p>
          </div>
        </section>

        {/* Past Donations */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Past Donations</h2>
          <p className="text-[#BDDBDB] text-sm">No donations yet. We're just getting started.</p>
        </section>

        {/* Call to Action */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Every Token Makes a Difference</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            When you launch on ZRP, you're not just building a project – you're building a better world.
          </p>
          <a
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Launch Your Token
          </a>
        </section>
      </div>
    </div>
  );
}
