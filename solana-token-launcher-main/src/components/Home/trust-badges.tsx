'use client';

import { Shield, Lock, CheckCircle, Zap } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Audited Smart Contracts',
    description: 'Secure and verified'
  },
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'You control your keys'
  },
  {
    icon: CheckCircle,
    title: 'Metaplex Standard',
    description: 'SPL compliant tokens'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Under 60 seconds'
  }
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-zinc-900/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Trusted by Thousands</h2>
          <p className="text-zinc-400 text-sm">Industry-standard security and compliance</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="bg-black/50 rounded-xl p-6 text-center border border-zinc-800 hover:border-purple-500/50 transition-all hover:scale-105"
              >
                <div className="w-12 h-12 rounded-full bg-purple-900/20 mx-auto flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-purple-400" />
                </div>
                <p className="text-white font-semibold text-sm">{badge.title}</p>
                <p className="text-zinc-500 text-xs mt-1">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
