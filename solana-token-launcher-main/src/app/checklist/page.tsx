'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertCircle, 
  Info, 
  Share2, 
  Calendar,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Rocket,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  priority: 'critical' | 'important' | 'nice';
  link?: string;
  linkText?: string;
}

interface Phase {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  icon: React.ReactNode;
  items: ChecklistItem[];
}

// ─── Data ──────────────────────────────────────────────────────────

const phases: Phase[] = [
  {
    id: 'fundamentals',
    title: 'Token Fundamentals',
    description: 'Define your token\'s foundation before creation.',
    estimatedTime: '2–3 days',
    icon: <Rocket className="h-5 w-5 text-[#FF2D2D]" />,
    items: [
      {
        id: 'purpose',
        label: 'Define token purpose and value proposition',
        description: 'What problem does your token solve? Write this in one clear sentence.',
        priority: 'critical',
      },
      {
        id: 'audience',
        label: 'Research target audience',
        description: 'Who will use your token? Understand their needs and preferences.',
        priority: 'important',
      },
      {
        id: 'name',
        label: 'Choose token name and symbol',
        description: 'Make it memorable, available, and not trademarked.',
        priority: 'critical',
      },
      {
        id: 'tokenomics',
        label: 'Design tokenomics',
        description: 'Plan total supply, distribution, and allocation.',
        priority: 'critical',
        link: '/tokenomics',
        linkText: 'Tokenomics Guide',
      },
      {
        id: 'authorities',
        label: 'Decide on authority settings',
        description: 'Will you revoke mint, freeze, or update authority?',
        priority: 'critical',
        link: '/revoke',
        linkText: 'Revoke Authority Guide',
      },
      {
        id: 'budget',
        label: 'Budget for creation and launch costs',
        description: 'Plan for token creation (0.15 SOL minimum), liquidity (10–50+ SOL), and marketing.',
        priority: 'important',
      },
    ],
  },
  {
    id: 'branding',
    title: 'Branding & Assets',
    description: 'Create your visual identity and marketing assets.',
    estimatedTime: '3–5 days',
    icon: <Zap className="h-5 w-5 text-[#FF2D2D]" />,
    items: [
      {
        id: 'logo',
        label: 'Design logo (multiple sizes)',
        description: 'Create logo in 512×512, 256×256, and 128×128 pixels. Test on dark and light backgrounds.',
        priority: 'critical',
      },
      {
        id: 'social-graphics',
        label: 'Create social media graphics',
        description: 'Banner images for Twitter, Telegram, and Discord. Keep branding consistent.',
        priority: 'important',
      },
      {
        id: 'description',
        label: 'Write token description',
        description: 'Clear, compelling description explaining your token\'s purpose. Keep it under 500 characters for metadata.',
        priority: 'critical',
      },
      {
        id: 'website',
        label: 'Prepare website/landing page',
        description: 'At minimum, create a simple page with token info, social links, and contact.',
        priority: 'important',
      },
      {
        id: 'social-accounts',
        label: 'Create social media accounts',
        description: 'Secure Twitter, Telegram, and Discord accounts before launch. Use consistent usernames.',
        priority: 'critical',
      },
    ],
  },
  {
    id: 'technical',
    title: 'Technical Preparation',
    description: 'Set up your technical infrastructure.',
    estimatedTime: '1–2 days',
    icon: <Zap className="h-5 w-5 text-[#FF2D2D]" />,
    items: [
      {
        id: 'wallet',
        label: 'Set up Solana wallet',
        description: 'Install a reputable Solana wallet (Phantom, Solflare, Backpack).',
        priority: 'critical',
      },
      {
        id: 'fund-wallet',
        label: 'Fund wallet with SOL',
        description: 'Ensure you have enough SOL for creation, liquidity, and transaction fees.',
        priority: 'critical',
      },
      {
        id: 'test-wallet',
        label: 'Test wallet functionality',
        description: 'Send a small test transaction to verify everything works correctly.',
        priority: 'important',
      },
      {
        id: 'metadata',
        label: 'Prepare token metadata',
        description: 'Have name, symbol, description, logo URL, and social links ready. Double-check all details.',
        priority: 'critical',
      },
      {
        id: 'platform',
        label: 'Choose creation platform',
        description: 'Select a reliable platform like ZRP. Test the interface beforehand.',
        priority: 'important',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community Building',
    description: 'Build your community foundation before launch.',
    estimatedTime: '2–4 weeks',
    icon: <Users className="h-5 w-5 text-[#FF2D2D]" />,
    items: [
      {
        id: 'telegram-discord',
        label: 'Create Telegram/Discord',
        description: 'Set up community channels with clear rules and moderation. Start building before launch.',
        priority: 'critical',
      },
      {
        id: 'twitter',
        label: 'Set up Twitter account',
        description: 'Twitter is essential for crypto launches. Start posting teasers and building followers.',
        priority: 'critical',
      },
      {
        id: 'initial-community',
        label: 'Build initial community',
        description: 'Engage with crypto communities, share your vision, and attract early supporters.',
        priority: 'important',
      },
      {
        id: 'announcements',
        label: 'Prepare launch announcements',
        description: 'Write Twitter threads, Telegram announcements, and press releases. Have them ready to go.',
        priority: 'important',
      },
    ],
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    description: 'Ensure legal compliance for your launch.',
    estimatedTime: '1–2 days',
    icon: <Shield className="h-5 w-5 text-[#FF2D2D]" />,
    items: [
      {
        id: 'legal-review',
        label: 'Review legal requirements',
        description: 'Understand regulations in your jurisdiction. Tokens are not securities, but clarify this clearly.',
        priority: 'critical',
      },
      {
        id: 'terms',
        label: 'Prepare terms of service',
        description: 'Create clear terms for your website/platform. Include disclaimers about token risks.',
        priority: 'important',
      },
      {
        id: 'privacy',
        label: 'Create privacy policy',
        description: 'Required if collecting any user data. Be transparent about data usage.',
        priority: 'important',
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing Preparation',
    description: 'Plan your marketing strategy.',
    estimatedTime: '1–2 weeks',
    icon: <TrendingUp className="h-5 w-5 text-[#FF2D2D]" />,
    items: [
      {
        id: 'strategy',
        label: 'Create marketing strategy',
        description: 'Plan your approach across all channels.',
        priority: 'critical',
        link: '/marketing',
        linkText: 'Marketing Guide',
      },
      {
        id: 'content',
        label: 'Prepare launch day content',
        description: 'Create Twitter threads, graphics, videos, and announcements. Have everything ready.',
        priority: 'important',
      },
      {
        id: 'schedule',
        label: 'Schedule social media posts',
        description: 'Use scheduling tools to maintain consistent posting. Plan content for launch week.',
        priority: 'important',
      },
      {
        id: 'budget-marketing',
        label: 'Budget for marketing spend',
        description: 'Allocate funds for paid promotion, influencer partnerships, and advertising if needed.',
        priority: 'nice',
      },
    ],
  },
  {
    id: 'launch-day',
    title: 'Launch Day Preparation',
    description: 'Final checks for launch day.',
    estimatedTime: '1 day',
    icon: <Rocket className="h-5 w-5 text-[#FF2D2D]" />,
    items: [
      {
        id: 'final-review',
        label: 'Final token details review',
        description: 'Double-check name, symbol, supply, and all metadata. These are permanent.',
        priority: 'critical',
      },
      {
        id: 'test-process',
        label: 'Test creation process',
        description: 'If possible, do a test run on devnet. Familiarize yourself with the platform.',
        priority: 'important',
      },
      {
        id: 'launch-announcement',
        label: 'Prepare launch announcement',
        description: 'Have your announcement ready to post immediately after creation. Include mint address and key info.',
        priority: 'critical',
      },
      {
        id: 'schedule-launch',
        label: 'Schedule launch time',
        description: 'Choose a time when your community is most active. Consider time zones.',
        priority: 'important',
      },
    ],
  },
  {
    id: 'post-launch',
    title: 'Post-Launch Planning',
    description: 'Plan beyond launch day.',
    estimatedTime: '1 day',
    icon: <AlertCircle className="h-5 w-5 text-[#FF2D2D]" />,
    items: [
      {
        id: 'liquidity',
        label: 'Plan liquidity addition',
        description: 'Decide when and how much liquidity to add.',
        priority: 'critical',
        link: '/add-liquidity',
        linkText: 'Liquidity Guide',
      },
      {
        id: 'community-engagement',
        label: 'Plan community engagement',
        description: 'Schedule regular updates, AMAs, and engagement activities.',
        priority: 'important',
      },
      {
        id: 'ongoing-marketing',
        label: 'Prepare ongoing marketing',
        description: 'Plan content for weeks after launch. Maintain momentum with regular updates.',
        priority: 'important',
      },
      {
        id: 'tracking',
        label: 'Set up tracking systems',
        description: 'Monitor token metrics, holder growth, and community engagement.',
        priority: 'nice',
      },
    ],
  },
];

// ─── Helper ─────────────────────────────────────────────────────────

const priorityLabels = {
  critical: { label: 'Critical', color: 'bg-[#FF2D2D]/20 text-[#FF2D2D] border-[#FF2D2D]/30' },
  important: { label: 'Important', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  nice: { label: 'Nice-to-have', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
};

// ─── Component ─────────────────────────────────────────────────────

export default function ChecklistPage() {
  // ─── State ────────────────────────────────────────────────────────
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [launchDate, setLaunchDate] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  // ─── Load from localStorage ──────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('checklist-progress');
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch {}
    }
    const savedDate = localStorage.getItem('launch-date');
    if (savedDate) {
      setLaunchDate(savedDate);
    }
  }, []);

  // ─── Save to localStorage ────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('checklist-progress', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    if (launchDate) {
      localStorage.setItem('launch-date', launchDate);
    }
  }, [launchDate]);

  // ─── Countdown timer ─────────────────────────────────────────────
  useEffect(() => {
    if (!launchDate) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(launchDate).getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    }, 60000);
    return () => clearInterval(interval);
  }, [launchDate]);

  // ─── Calculate progress ──────────────────────────────────────────
  const totalItems = phases.reduce((acc, p) => acc + p.items.length, 0);
  const completedItems = Object.values(checkedItems).filter(v => v).length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // ─── Handlers ────────────────────────────────────────────────────
  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const shareProgress = () => {
    const text = `🚀 I'm ${progress}% ready to launch my Solana token!\n\n📋 ${completedItems}/${totalItems} checklist items done.\n\nCreate yours at zrp.one/checklist`;
    navigator.clipboard.writeText(text);
    alert('Progress copied to clipboard! Share it with your community.');
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertCircle className="h-4 w-4 text-[#FF2D2D]" />;
      case 'important': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <Info className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <span className="text-[#FF2D2D] text-sm font-semibold uppercase tracking-wider">Pre-Launch Checklist</span>
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
          Pre-Launch Checklist <br className="hidden sm:block" />
          <span className="text-[#FF2D2D]">for Solana Tokens</span>
        </h1>
        <p className="text-[#BDDBDB] text-lg max-w-2xl mx-auto">
          Don't rush your launch. Use this comprehensive checklist to ensure your Solana token is fully prepared before going live — from tokenomics to community building.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">2–4</span>
            <span className="text-[#BDDBDB] ml-2">Weeks prep</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">8</span>
            <span className="text-[#BDDBDB] ml-2">Checklist phases</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">50+</span>
            <span className="text-[#BDDBDB] ml-2">Action items</span>
          </div>
          <div className="bg-[#0D0D0D]/50 rounded-xl px-4 py-2 border border-[#1a1a1a]">
            <span className="text-[#FF2D2D] font-bold">0</span>
            <span className="text-[#BDDBDB] ml-2">Steps to skip</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Share */}
      <div className="bg-[#0D0D0D] rounded-xl p-6 border border-[#1a1a1a] mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#BDDBDB]">Progress</span>
              <span className="text-white font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-2.5">
              <div className="bg-[#FF2D2D] h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <button
            onClick={shareProgress}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#BDDBDB] rounded-lg transition whitespace-nowrap"
          >
            <Share2 className="h-4 w-4" />
            Share Progress
          </button>
        </div>

        {/* Launch Countdown */}
        <div className="mt-4 border-t border-[#1a1a1a] pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Calendar className="h-5 w-5 text-[#FF2D2D]" />
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#BDDBDB] text-sm">Launch Date:</span>
              <input
                type="datetime-local"
                value={launchDate || ''}
                onChange={(e) => setLaunchDate(e.target.value)}
                className="bg-[#050505] border border-[#1a1a1a] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#FF2D2D]"
              />
              {timeLeft && (
                <span className="text-sm text-[#BDDBDB]">
                  ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </span>
              )}
              {launchDate && !timeLeft && (
                <span className="text-sm text-[#FF2D2D]">🚀 Launch day is here!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D0D] rounded-xl p-6 md:p-8 border border-[#1a1a1a] space-y-12 text-[#BDDBDB] text-sm leading-relaxed">
        {/* Introduction */}
        <section>
          <p>
            Launching a Solana token successfully requires careful preparation. Many creators rush to launch without proper planning, leading to missed opportunities, security issues, and failed launches. This comprehensive checklist ensures you're fully prepared.
          </p>
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-xl p-4 mt-4">
            <p className="text-[#FF2D2D] text-sm font-semibold">📋 How to Use This Checklist</p>
            <p className="text-[#BDDBDB] text-sm mt-1">
              Use this checklist <span className="text-white font-medium">2–4 weeks</span> before your planned launch date. Check off each item as you complete it. Don't skip steps — each one contributes to your launch's success.
            </p>
          </div>
        </section>

        {/* Phases */}
        {phases.map((phase) => {
          const phaseItems = phase.items.length;
          const phaseDone = phase.items.filter(item => checkedItems[item.id]).length;
          const phaseProgress = phaseItems > 0 ? Math.round((phaseDone / phaseItems) * 100) : 0;

          return (
            <section key={phase.id} className="border-t border-[#1a1a1a] pt-8 first:border-t-0 first:pt-0">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="bg-[#FF2D2D] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {phases.indexOf(phase) + 1}
                </span>
                {phase.icon}
                {phase.title}
                <span className="ml-auto text-xs font-normal text-[#BDDBDB] opacity-60 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {phase.estimatedTime}
                </span>
              </h2>
              <p className="text-[#BDDBDB] text-sm mb-4">{phase.description}</p>

              {/* Phase progress */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full">
                  <div className="bg-[#FF2D2D] h-1.5 rounded-full transition-all duration-500" style={{ width: `${phaseProgress}%` }} />
                </div>
                <span className="text-xs text-[#BDDBDB] opacity-50">{phaseDone}/{phaseItems}</span>
              </div>

              <ul className="space-y-3">
                {phase.items.map((item) => (
                  <li
                    key={item.id}
                    className={`flex items-start gap-3 bg-[#050505]/40 rounded-xl p-4 border transition ${
                      checkedItems[item.id]
                        ? 'border-[#FF2D2D]/40 bg-[#FF2D2D]/5'
                        : 'border-[#1a1a1a] hover:border-[#FF2D2D]/20'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="mt-0.5 flex-shrink-0 text-[#FF2D2D] focus:outline-none"
                    >
                      {checkedItems[item.id] ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5 opacity-50" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2">
                        <p className={`text-white font-medium ${checkedItems[item.id] ? 'line-through opacity-60' : ''}`}>
                          {item.label}
                        </p>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${priorityLabels[item.priority].color}`}>
                          {getPriorityIcon(item.priority)}
                          {priorityLabels[item.priority].label}
                        </span>
                      </div>
                      <p className="text-[#BDDBDB] text-sm mt-1">{item.description}</p>
                      {item.link && (
                        <Link
                          href={item.link}
                          className="text-[#FF2D2D] hover:text-[#B10000] text-sm font-medium inline-flex items-center gap-1 mt-1 transition"
                        >
                          {item.linkText || 'Learn more'} →
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* FAQ */}
        <section className="border-t border-[#1a1a1a] pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">How long before launch should I start preparing?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Ideally, start preparing <span className="text-white font-medium">2–4 weeks</span> before your planned launch date. This gives you time to build community, create assets, and ensure everything is ready. Rushing a launch often leads to mistakes.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">What's the minimum budget for a token launch?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Plan for at least <span className="text-white font-medium">20–100 SOL</span> total, depending on your goals. This includes token creation (0.15 SOL minimum), initial liquidity (10–50 SOL recommended), and basic marketing.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Do I need a website before launch?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                While not strictly required, a website adds credibility. At minimum, create a simple landing page with token details, social links, and a way to contact you. A professional website significantly improves trust.
              </p>
            </div>
            <div className="bg-[#050505]/40 rounded-xl p-4 border border-[#1a1a1a]">
              <h3 className="text-white font-semibold">Should I build community before or after launch?</h3>
              <p className="text-[#BDDBDB] text-sm mt-1">
                Build community <span className="text-white font-medium">before</span> launch. Having an engaged community ready on launch day creates immediate momentum. Start building 2–4 weeks before launch through social media and teasers.
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
