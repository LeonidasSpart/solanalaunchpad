'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, FlaskConical, Code2, Zap, TrendingUp, Users } from 'lucide-react';

interface StatsData {
  count: number;
  successRate: string;
  avgTime: string;
}

export default function TokenCounter() {
  const [stats, setStats] = useState<StatsData>({ count: 0, successRate: '99.9%', avgTime: '<60s' });
  const [isVisible, setIsVisible] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    async function fetchTokenCount() {
      try {
        const response = await fetch('/api/token-count');
        const data = await response.json();
        setStats(prev => ({ ...prev, count: data.count }));
      } catch (error) {
        console.error('Failed to fetch token count:', error);
      }
    }

    fetchTokenCount();
    const interval = setInterval(fetchTokenCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    const element = document.getElementById('token-counter');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animate counter when visible
  useEffect(() => {
    if (!isVisible || stats.count === 0) return;

    const duration = 2000;
    const steps = 60;
    const increment = stats.count / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stats.count) {
        setDisplayCount(stats.count);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stats.count]);

  const hasData = stats.count > 0;

  const badges = [
    { icon: <Zap className="h-4 w-4" />, label: 'Live', sublabel: 'on Mainnet', color: 'text-[#FF2D2D]' },
    { icon: <FlaskConical className="h-4 w-4" />, label: 'Test', sublabel: 'on Devnet', color: 'text-[#FF2D2D]' },
    { icon: <Code2 className="h-4 w-4" />, label: '100%', sublabel: 'No-Code', color: 'text-[#FF2D2D]' },
  ];

  return (
    <section id="token-counter" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2D2D]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 rounded-full px-4 py-1.5 mb-8">
            <Users className="h-3.5 w-3.5 text-[#FF2D2D]" />
            <span className="text-xs font-semibold text-[#FF2D2D] uppercase tracking-wider">Community</span>
          </div>

          {/* Main Counter or Fallback */}
          {hasData ? (
            <div className="mb-8">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#FF2D2D] mb-4 tracking-tight">
                {displayCount.toLocaleString()}+
              </div>
              <p className="text-xl sm:text-2xl text-[#BDDBDB] font-medium">
                Tokens launched on <span className="text-white font-bold">ZRP</span>
              </p>
            </div>
          ) : (
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <Rocket className="h-8 w-8 text-[#FF2D2D]" />
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  New & <span className="text-[#FF2D2D]">Growing</span>
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-[#BDDBDB] max-w-2xl mx-auto">
                Join the early adopters creating on ZRP. Be among the first to launch your token.
              </p>
            </div>
          )}

          {/* Stats Row (shown when data available) */}
          {hasData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="h-5 w-5 text-[#FF2D2D]" />
                  <span className="text-2xl sm:text-3xl font-bold text-white">{stats.successRate}</span>
                </div>
                <div className="text-xs text-[#BDDBDB] uppercase tracking-wider">Success Rate</div>
              </div>
              <div className="w-px h-10 bg-[#1a1a1a] hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stats.avgTime}</div>
                <div className="text-xs text-[#BDDBDB] uppercase tracking-wider">Avg Creation Time</div>
              </div>
              <div className="w-px h-10 bg-[#1a1a1a] hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
                <div className="text-xs text-[#BDDBDB] uppercase tracking-wider">Platform Available</div>
              </div>
            </motion.div>
          )}

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 bg-[#0D0D0D]/50 border border-[#1a1a1a] rounded-xl px-5 py-3 backdrop-blur-sm hover:border-[#FF2D2D]/30 transition-colors"
              >
                <span className={badge.color}>{badge.icon}</span>
                <div className="text-left">
                  <span className={`text-sm font-bold ${badge.color}`}>{badge.label}</span>
                  <span className="text-[#BDDBDB] text-sm ml-1">{badge.sublabel}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
