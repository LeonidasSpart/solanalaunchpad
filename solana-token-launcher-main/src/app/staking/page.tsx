// src/app/staking/page.tsx
import Link from 'next/link';

export default function StakingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Staking Guide</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Solana Token Staking: <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">How It Works &amp; Best Practices</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Learn what token staking is, how it works on Solana, and best practices for implementing staking rewards. Understand staking mechanics and reward distribution.
        </p>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Token staking is a mechanism where holders lock their tokens to earn rewards. It incentivizes long-term holding, reduces circulating supply, and can create sustainable value for your token. Understanding staking helps you design better tokenomics.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">⚠️ Staking Requires Development</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Staking requires custom development on Solana. Standard SPL tokens don't have built-in staking capabilities. This guide explains how staking works, what's required to implement it, and best practices for staking programs.
            </p>
          </div>
        </section>

        {/* What is Token Staking */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What is Token Staking?</h2>
          <p>
            Token staking is the process of locking tokens in a smart contract or program to earn rewards. Stakers deposit their tokens for a period and receive rewards, typically in the same token or another token. Staking incentivizes long-term holding and participation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] text-center">
              <p className="text-2xl mb-1">🔒</p>
              <p className="text-white font-semibold text-xs">Token Locking</p>
              <p className="text-[#BDDBDB] text-xs">Tokens are locked in a program</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] text-center">
              <p className="text-2xl mb-1">🎁</p>
              <p className="text-white font-semibold text-xs">Rewards</p>
              <p className="text-[#BDDBDB] text-xs">Stakers earn rewards</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] text-center">
              <p className="text-2xl mb-1">⏳</p>
              <p className="text-white font-semibold text-xs">Time Periods</p>
              <p className="text-[#BDDBDB] text-xs">Lock periods or vesting</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a] text-center">
              <p className="text-2xl mb-1">📉</p>
              <p className="text-white font-semibold text-xs">Reduced Supply</p>
              <p className="text-[#BDDBDB] text-xs">Removed from circulation</p>
            </div>
          </div>
          <p className="mt-3">
            Staking creates incentives for holders to keep tokens rather than sell them. This can reduce selling pressure and create more stable price action. Learn more about <Link href="/tokenomics" className="text-[#FF2D2D] hover:text-[#B10000] transition">tokenomics design</Link> and how staking fits into your economic model.
          </p>
        </section>

        {/* How Staking Works on Solana */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">How Staking Works on Solana</h2>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mb-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">⚠️ Important</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Standard SPL tokens created through no-code platforms <span className="text-white font-medium">don't include staking</span>. Adding staking requires custom development of a Solana program or using an existing staking platform.
            </p>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Staking Program Components</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li><span className="text-white">Staking pool:</span> A program account that holds staked tokens</li>
            <li><span className="text-white">Reward pool:</span> Tokens reserved for distribution as rewards</li>
            <li><span className="text-white">Staking logic:</span> Code that calculates rewards based on amount staked and duration</li>
            <li><span className="text-white">Unstaking mechanism:</span> Process for unlocking tokens after the staking period</li>
          </ul>

          <h3 className="text-white font-semibold mt-4 mb-3">Staking Process</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a]">
              <span className="bg-[#FF2D2D] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">1</span>
              <p className="text-[#BDDBDB] text-sm">User approves token transfer to staking program</p>
            </div>
            <div className="flex items-center gap-3 bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a]">
              <span className="bg-[#FF2D2D] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">2</span>
              <p className="text-[#BDDBDB] text-sm">Tokens are locked in the staking pool</p>
            </div>
            <div className="flex items-center gap-3 bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a]">
              <span className="bg-[#FF2D2D] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">3</span>
              <p className="text-[#BDDBDB] text-sm">Rewards accumulate based on staking amount and duration</p>
            </div>
            <div className="flex items-center gap-3 bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a]">
              <span className="bg-[#FF2D2D] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">4</span>
              <p className="text-[#BDDBDB] text-sm">User can claim rewards periodically</p>
            </div>
            <div className="flex items-center gap-3 bg-[#050505]/40 rounded-lg p-2 border border-[#1a1a1a]">
              <span className="bg-[#FF2D2D] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">5</span>
              <p className="text-[#BDDBDB] text-sm">After lock period, user can unstake and withdraw tokens</p>
            </div>
          </div>
        </section>

        {/* Implementing Staking */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Implementing Staking for Your Token</h2>
          <p className="mb-4">Adding staking to your token requires development work. Here are your options:</p>

          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🛠️ Option 1: Custom Staking Program</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Develop a custom Solana program for staking. Gives you full control over mechanics and rewards. Requires Solana development knowledge or hiring a developer.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-[#FF2D2D]/20 text-[#FF2D2D] px-2 py-0.5 rounded-full">Most flexible</span>
                <span className="text-xs bg-[#FF2D2D]/10 text-[#BDDBDB] px-2 py-0.5 rounded-full">Most complex</span>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">📦 Option 2: Use Existing Staking Platform</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Use an existing staking platform or service that supports your token. Less control but faster to implement.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-[#FF2D2D]/20 text-[#FF2D2D] px-2 py-0.5 rounded-full">Faster to implement</span>
                <span className="text-xs bg-[#FF2D2D]/10 text-[#BDDBDB] px-2 py-0.5 rounded-full">Less control</span>
              </div>
            </div>

            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">🤝 Option 3: Partner with Staking Service</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">Partner with a staking service provider that can implement staking for your token. They handle development and maintenance.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-[#FF2D2D]/20 text-[#FF2D2D] px-2 py-0.5 rounded-full">No development needed</span>
                <span className="text-xs bg-[#FF2D2D]/10 text-[#BDDBDB] px-2 py-0.5 rounded-full">Requires partnership</span>
              </div>
            </div>
          </div>
        </section>

        {/* Staking Rewards and Mechanics */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Staking Rewards and Mechanics</h2>

          <h3 className="text-white font-semibold mt-4 mb-3">Reward Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">🔄 Same Token Rewards</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Stakers earn more of the same token. Requires mint authority or reserved supply.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">💎 Different Token Rewards</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Stakers earn a different token (like SOL). Requires holding the reward token in a pool.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">📊 Percentage-Based</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Rewards calculated as a percentage of staked amount (APY). Common and easy to understand.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a]">
              <p className="text-white font-semibold text-sm">📈 Variable Rates</p>
              <p className="text-[#BDDBDB] text-xs mt-1">Reward rates change based on total staked, time, or other factors. More complex but can balance incentives.</p>
            </div>
          </div>

          <h3 className="text-white font-semibold mt-4 mb-3">Lock Periods</h3>
          <ul className="list-disc pl-5 space-y-1 text-[#BDDBDB] text-sm">
            <li><span className="text-white">No lock:</span> Tokens can be unstaked anytime (flexible but less commitment)</li>
            <li><span className="text-white">Fixed lock:</span> Tokens locked for a specific period (e.g., 30, 60, 90 days)</li>
            <li><span className="text-white">Tiered locks:</span> Longer locks earn higher rewards (incentivizes commitment)</li>
          </ul>
        </section>

        {/* Staking Best Practices */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Staking Best Practices</h2>
          <div className="space-y-3">
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-sm">♻️ Sustainable Rewards</h3>
              <p className="text-[#BDDBDB] text-xs mt-1">Design reward rates that are sustainable long-term. Balance attractive rates with sustainability.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-sm">📋 Clear Terms</h3>
              <p className="text-[#BDDBDB] text-xs mt-1">Clearly communicate staking terms: lock periods, reward rates, unstaking conditions, and risks.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-sm">🔒 Security First</h3>
              <p className="text-[#BDDBDB] text-xs mt-1">Ensure staking programs are secure and audited. Staking involves locking tokens, so security is critical.</p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-3 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold text-sm">💰 Reward Pool Management</h3>
              <p className="text-[#BDDBDB] text-xs mt-1">Plan how to fund and maintain reward pools. Ensure sustainable funding for rewards.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What is token staking on Solana?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Token staking is the process of locking tokens in a smart contract or program to earn rewards. Stakers lock their tokens for a period and receive rewards, typically in the same token or another token. It incentivizes long-term holding and participation.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How does staking work for Solana tokens?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Staking requires a custom Solana program (smart contract) that locks tokens and distributes rewards. Standard SPL tokens don't have built-in staking. You need to develop or use a staking program that handles token locking, reward calculation, and distribution.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Can I add staking to my Solana token?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Yes, but it requires custom development. You'll need to develop a staking program or use an existing staking platform that supports your token. This requires technical knowledge or hiring a developer.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Do I need to keep mint authority for staking rewards?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                If you want to reward stakers with the same token, you'll need mint authority to create new tokens for rewards. However, many projects use different reward tokens (like SOL) or reserve tokens for rewards, which doesn't require mint authority. Plan your reward structure before revoking mint authority.
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
          <Link
            href="/create-mint"
            className="inline-block mt-6 px-8 py-3 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition"
          >
            Create Your Token
          </Link>
        </section>
      </div>
    </div>
  );
}
