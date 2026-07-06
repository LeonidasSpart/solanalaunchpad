'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Users, 
  Coins, 
  Gift, 
  Crown, 
  TrendingUp, 
  Zap,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function AffiliateInfoPage() {
  const steps = [
    {
      icon: <LinkIcon className="h-6 w-6 text-[#FF2D2D]" />,
      title: 'Generate Your Link',
      desc: 'Connect your wallet and get your unique referral link in seconds.',
    },
    {
      icon: <Share2 className="h-6 w-6 text-[#FF2D2D]" />,
      title: 'Share It Everywhere',
      desc: 'Post on X, Telegram, Discord, YouTube, or your website.',
    },
    {
      icon: <Users className="h-6 w-6 text-[#FF2D2D]" />,
      title: 'They Create Tokens',
      desc: 'When someone uses your link and creates a token, you earn commission.',
    },
    {
      icon: <Coins className="h-6 w-6 text-[#FF2D2D]" />,
      title: 'Earn SOL Instantly',
      desc: 'Commission is paid directly to your wallet – no minimums, no delays.',
    },
  ];

  const milestones = [
    { target: 5, bonus: '0.05 SOL', label: '🎉 5 referrals' },
    { target: 10, bonus: '0.10 SOL', label: '⭐ 10 referrals' },
    { target: 25, bonus: '0.25 SOL', label: '🏆 25 referrals' },
    { target: 50, bonus: '0.50 SOL', label: '👑 50 referrals' },
    { target: 100, bonus: '1.00 SOL', label: '💎 100 referrals' },
  ];

  const faqs = [
    {
      q: 'How much commission do I earn?',
      a: 'You earn 15% of the total fee on every token created by someone who used your referral link. This includes all optional add-ons (revoking authorities, etc.).',
    },
    {
      q: 'Is there a limit to how many people I can refer?',
      a: 'No. You can refer as many users as you want. The more you share, the more you earn.',
    },
    {
      q: 'When do I get paid?',
      a: 'Commission is paid instantly when the referred user completes their token creation. You can claim your earnings at any time from your affiliate dashboard.',
    },
    {
      q: 'Do I need to sign up?',
      a: 'No. Your Solana wallet address is your affiliate ID. Just connect your wallet and start sharing your link.',
    },
    {
      q: 'Can I see my referrals and earnings?',
      a: 'Yes. Your affiliate dashboard shows total referrals, earnings, unclaimed commission, leaderboard rank, and recent activity.',
    },
    {
      q: 'What happens if a referred user creates multiple tokens?',
      a: 'You earn commission on every token they create, not just the first one. It\'s a recurring reward for life.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF2D2D]/5 via-transparent to-transparent" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#FF2D2D]/10 rounded-full blur-3xl opacity-30" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-6">
              <Zap className="h-4 w-4 text-[#FF2D2D]" />
              <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">
                Earn SOL
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Earn SOL by <br />
              <span className="text-[#FF2D2D]">Sharing ZRP</span>
            </h1>
            <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto mb-8">
              Refer users to ZRP and earn 15% commission on every token they create. 
              No limits, no caps – just endless earning potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/affiliate"
                className="px-8 py-4 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition text-lg flex items-center justify-center gap-2"
              >
                Start Earning SOL <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#how-it-works"
                className="px-8 py-4 bg-[#0D0D0D] hover:bg-[#1a1a1a] text-[#BDDBDB] font-medium rounded-xl transition border border-[#1a1a1a] text-lg"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It <span className="text-[#FF2D2D]">Works</span>
            </h2>
            <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
              Four simple steps to start earning SOL.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-[#0D0D0D] rounded-2xl p-6 border border-[#1a1a1a] text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#FF2D2D]/10 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-[#FF2D2D] mb-1">Step {index + 1}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[#BDDBDB] text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Details */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0D0D0D] rounded-2xl border border-[#1a1a1a] p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Commission <span className="text-[#FF2D2D]">Details</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0" />
                    <span className="text-[#BDDBDB]">15% of the full token creation fee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0" />
                    <span className="text-[#BDDBDB]">Includes all optional add-ons (authority revocations)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0" />
                    <span className="text-[#BDDBDB]">Paid instantly in SOL</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#FF2D2D] flex-shrink-0" />
                    <span className="text-[#BDDBDB]">No minimum payout – claim anytime</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Example Earnings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                    <span className="text-[#BDDBDB]">Basic Token (0.15 SOL)</span>
                    <span className="text-white font-medium">0.0225 SOL</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                    <span className="text-[#BDDBDB]">Secure Token (0.60 SOL)</span>
                    <span className="text-white font-medium">0.09 SOL</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#050505] rounded-xl p-4 border border-[#1a1a1a]">
                    <span className="text-[#BDDBDB]">10 Basic Tokens</span>
                    <span className="text-white font-medium">0.225 SOL</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4">
                    <span className="text-[#BDDBDB]">50 Basic Tokens</span>
                    <span className="text-[#FF2D2D] font-bold">1.125 SOL</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Milestone <span className="text-[#FF2D2D]">Bonuses</span>
            </h2>
            <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
              Unlock extra rewards as you hit referral milestones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-[#0D0D0D] rounded-xl p-5 border border-[#1a1a1a] text-center"
              >
                <div className="text-2xl mb-2">{milestone.label.split(' ')[0]}</div>
                <p className="text-white font-bold text-lg">{milestone.target}</p>
                <p className="text-[#BDDBDB] text-sm">referrals</p>
                <div className="mt-2 inline-block bg-[#FF2D2D]/10 text-[#FF2D2D] text-xs font-semibold px-3 py-1 rounded-full border border-[#FF2D2D]/20">
                  +{milestone.bonus}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0D0D0D] rounded-2xl border border-[#1a1a1a] p-8 text-center"
          >
            <Crown className="h-12 w-12 text-[#FF2D2D] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">Public Leaderboard</h2>
            <p className="text-[#BDDBDB] text-lg max-w-xl mx-auto mb-6">
              See how you rank against other referrers. Top performers get recognized and earn extra rewards.
            </p>
            <Link
              href="/affiliate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-semibold rounded-xl transition border border-[#1a1a1a]"
            >
              View Leaderboard <ExternalLink className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="text-[#FF2D2D]">Questions</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a]"
              >
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-[#BDDBDB] text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#FF2D2D]/20 via-[#FF2D2D]/5 to-transparent rounded-3xl border border-[#FF2D2D]/20 p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start <span className="text-[#FF2D2D]">Earning SOL?</span>
            </h2>
            <p className="text-[#BDDBDB] text-lg max-w-xl mx-auto mb-8">
              Join the ZRP affiliate program today and start earning 15% commission on every token created by your referrals.
            </p>
            <Link
              href="/affiliate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF2D2D] hover:bg-[#B10000] text-white font-semibold rounded-xl transition text-lg shadow-lg shadow-[#FF2D2D]/25"
            >
              Join Now <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Import missing icons
import { LinkIcon, Share2 } from 'lucide-react';
