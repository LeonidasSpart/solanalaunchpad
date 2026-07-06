import Link from 'next/link';

export default function VestingGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Vesting Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Token Vesting: <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">Complete Guide</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Understand how vesting schedules, cliffs, and unlock mechanisms work — and why they're essential for building trust and long‑term value.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">4+</span>
            <span className="text-[#BDDBDB] ml-2">Key components</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">3</span>
            <span className="text-[#BDDBDB] ml-2">Vesting types</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">5</span>
            <span className="text-[#BDDBDB] ml-2">Best practices</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">0</span>
            <span className="text-[#BDDBDB] ml-2">Risks if done right</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">What is Token Vesting?</h2>
          <p className="mb-4">
            Token vesting is the gradual release of cryptocurrency tokens to stakeholders over a predetermined period. 
            Rather than distributing all tokens at once, vesting locks tokens and releases them incrementally based on 
            time elapsed, milestones achieved, or a combination of both.
          </p>
          <p>
            Vesting applies primarily to <span className="text-white font-medium">founders and core team members</span>, 
            <span className="text-white font-medium"> early‑stage investors</span>, and 
            <span className="text-white font-medium"> advisors</span> — ensuring sustained commitment and 
            preventing immediate dumping after launch.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">💡 Why It Matters</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Vesting is one of the strongest trust signals a project can give. It proves that the team is committed 
              to long‑term success, not a quick exit.
            </p>
          </div>
        </section>

        {/* Why Vesting Matters */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Why Vesting Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📊 Supply Management</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Vesting spreads selling pressure over time, allowing natural demand to absorb supply gradually. 
                Projects with weak vesting experience <span className="text-[#FF2D2D]">40‑60% higher price volatility</span>.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🔗 Long‑Term Alignment</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                The standard <span className="text-white">4‑year vesting</span> period for teams mirrors 
                traditional tech equity vesting, creating accountability through extended lock‑in periods.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🛡️ Trust Signal</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Projects with aggressive vesting schedules signal confidence in long‑term value creation. 
                Short vesting periods often indicate founders prioritizing quick exits over sustainable growth.
              </p>
            </div>
          </div>
        </section>

        {/* Key Components */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Key Components of a Vesting Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#050505]/40 rounded-xl p-5 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-lg">🏔️ Cliff Period</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                The waiting period before any tokens unlock. No tokens are released during this time.
              </p>
              <div className="mt-3 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a]">
                <p className="text-xs text-[#BDDBDB] opacity-70">Typical durations:</p>
                <ul className="text-xs text-[#BDDBDB] list-disc list-inside mt-1">
                  <li>Team: 12 months (85% of projects)</li>
                  <li>Investors: 6‑12 months</li>
                  <li>Advisors: 6 months</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-5 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-lg">⏳ Vesting Duration</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                The total period over which tokens fully unlock after the cliff.
              </p>
              <div className="mt-3 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a]">
                <p className="text-xs text-[#BDDBDB] opacity-70">Typical durations:</p>
                <ul className="text-xs text-[#BDDBDB] list-disc list-inside mt-1">
                  <li>Team: 3‑4 years (most common is 4 years)</li>
                  <li>Investors: 2‑3 years</li>
                  <li>Advisors: 12‑24 months</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-5 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-lg">📊 TGE Unlock</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Percentage of tokens available immediately at Token Generation Event (launch).
              </p>
              <div className="mt-3 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a]">
                <p className="text-xs text-[#BDDBDB] opacity-70">Common ranges:</p>
                <ul className="text-xs text-[#BDDBDB] list-disc list-inside mt-1">
                  <li>Conservative: 5‑15%</li>
                  <li>Aggressive: 30‑50%</li>
                  <li className="text-[#FF2D2D]">Unlocks &gt;25% correlate with 72% price decline</li>
                </ul>
              </div>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-5 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-lg">🔄 Vesting Frequency</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                How often tokens unlock after the cliff period ends.
              </p>
              <div className="mt-3 bg-[#050505] rounded-lg p-3 border border-[#1a1a1a]">
                <p className="text-xs text-[#BDDBDB] opacity-70">Common frequencies:</p>
                <ul className="text-xs text-[#BDDBDB] list-disc list-inside mt-1">
                  <li>Daily: Most granular, smoothest release</li>
                  <li>Monthly: Common standard</li>
                  <li>Quarterly: Small periodic bumps</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Vesting */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Types of Vesting Schedules</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📈 Linear Vesting</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Tokens unlock at a constant rate over the vesting period. This is the most common and 
                predictable vesting model.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📉 Cliff + Linear</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                A cliff period (no unlocks) followed by linear vesting. This is the industry standard for team tokens.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📊 Milestone‑Based</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Tokens unlock upon achieving specific milestones (e.g., product launch, user growth). 
                Aligns incentives with performance.
              </p>
            </div>
          </div>
        </section>

        {/* Red Flags */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Red Flags to Avoid</h2>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-5 space-y-2">
            <ul className="list-disc pl-5 text-[#BDDBDB] text-sm space-y-1">
              <li><span className="text-white font-medium">No cliff period</span> — allows immediate selling post‑launch</li>
              <li><span className="text-white font-medium">Vesting duration under 24 months</span> for core team — insufficient commitment</li>
              <li><span className="text-white font-medium">TGE unlock exceeding 30%</span> of total supply — excessive immediate selling pressure</li>
              <li><span className="text-white font-medium">Opaque or missing smart contract</span> implementation — vesting is a promise, not a guarantee</li>
              <li><span className="text-white font-medium">Large unlocks concentrated in short windows</span> — monthly unlocks &gt;5% of circulating supply</li>
            </ul>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Vesting Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <h3 className="text-green-400 font-semibold">✅ Do</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Match industry standards: 4‑year team vesting with 1‑year cliff</li>
                <li>Align vesting across stakeholder groups (team ≥ investors)</li>
                <li>Prioritize smooth unlock curves — avoid large step‑function unlocks</li>
                <li>Implement on‑chain enforcement — deploy audited smart contracts</li>
                <li>Maintain transparency — publish clear documentation of all schedules</li>
              </ul>
            </div>
            <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
              <h3 className="text-[#FF2D2D] font-semibold">❌ Don't</h3>
              <ul className="list-disc pl-5 text-[#BDDBDB] text-sm mt-2 space-y-1">
                <li>Set vesting under 24 months for core team</li>
                <li>Allow immediate unlock for team tokens</li>
                <li>Keep vesting schedules opaque or off‑chain</li>
                <li>Create large unlock cliffs that cause price crashes</li>
                <li>Forget to communicate vesting details to your community</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What is a cliff in vesting?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                A cliff is a period at the beginning of the vesting schedule during which no tokens are released. 
                After the cliff ends, tokens begin to unlock according to the vesting schedule. It ensures that 
                stakeholders are committed for a minimum period before receiving any tokens.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How long should team vesting be?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Industry standard for teams is <span className="text-white font-medium">4 years with a 1‑year cliff</span>. 
                This aligns with traditional tech equity vesting and signals long‑term commitment.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What happens if I revoke mint authority?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Revoking mint authority permanently prevents any new tokens from being created. 
                This is a strong trust signal and is recommended for most projects.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I change a vesting schedule after creation?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Once a vesting schedule is locked on‑chain, it <span className="text-white font-medium">cannot be changed</span>. 
                This is by design — it guarantees that the schedule is immutable and trustworthy.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border-t border-[#1a1a1a] pt-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Create a Vesting Schedule?</h2>
          <p className="text-[#BDDBDB] max-w-xl mx-auto">
            Lock tokens for your team, advisors, or investors and build trust with your community.
          </p>
          <Link
            href="/vesting/create"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Create Vesting Schedule
          </Link>
        </section>
      </div>
    </div>
  );
}
