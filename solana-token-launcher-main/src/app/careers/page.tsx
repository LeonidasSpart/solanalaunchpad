// src/app/careers/page.tsx
export default function CareersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🧡 Join ZRP
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Build the future of Solana with purpose.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Mission */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
          <p>
            ZRP is redefining token launches on Solana. We're a complete ecosystem
            with 20+ products, AI tools, a wallet suite, and a 35% charity commitment.
          </p>
          <p className="mt-3">
            We're looking for builders who share our values – openness, self-custody,
            and technology for good.
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔓 Non-Custodial</h3>
              <p className="text-[#BDDBDB] text-sm">Your keys, your tokens. Always.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📖 Open Source</h3>
              <p className="text-[#BDDBDB] text-sm">Transparent and auditable code.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🌍 No Borders</h3>
              <p className="text-[#BDDBDB] text-sm">No discrimination. Just help.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🧡 35% Charity</h3>
              <p className="text-[#BDDBDB] text-sm">Profits go to orphans, schools, hospitals, climate.</p>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Open Positions</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🛠️ Full-Stack Engineer</h3>
              <p className="text-[#BDDBDB] text-sm">Next.js, TypeScript, Solana, Tailwind, Web3</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🎨 Frontend Engineer</h3>
              <p className="text-[#BDDBDB] text-sm">React, Tailwind CSS, Next.js, TypeScript</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">⚙️ Backend Engineer</h3>
              <p className="text-[#BDDBDB] text-sm">Node.js, PostgreSQL, Redis, REST APIs</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🤖 AI Engineer</h3>
              <p className="text-[#BDDBDB] text-sm">Python, OpenAI/DeepSeek APIs, LangChain, LLMs</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🦀 Solana Engineer</h3>
              <p className="text-[#BDDBDB] text-sm">Rust, SPL, Anchor, Solana SDK, Web3</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🎨 UI/UX Designer</h3>
              <p className="text-[#BDDBDB] text-sm">Figma, Design Systems, Web3 Experience</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">💬 Community Manager</h3>
              <p className="text-[#BDDBDB] text-sm">Discord, Telegram, Social Media, Engagement</p>
            </div>
          </div>
        </section>

        {/* Why Join */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Join ZRP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🌍 Remote</h3>
              <p className="text-[#BDDBDB] text-sm">Work from anywhere in the world.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🎯 Purpose-Driven</h3>
              <p className="text-[#BDDBDB] text-sm">35% of profits go to charity.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🚀 Growth</h3>
              <p className="text-[#BDDBDB] text-sm">Grow with ZRP from day one.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📖 Open Source</h3>
              <p className="text-[#BDDBDB] text-sm">Build in the open. Transparent and collaborative.</p>
            </div>
          </div>
        </section>

        {/* Apply */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Build?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Apply now and be part of something bigger.
          </p>
          <a
            href="mailto:careers@zrp.one?subject=Application%20for%20ZRP%20Position"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Apply Now
          </a>
          <p className="text-[#BDDBDB] text-xs mt-3 opacity-60">
            Send your resume and cover letter to careers@zrp.one
          </p>
        </section>
      </div>
    </div>
  );
}
