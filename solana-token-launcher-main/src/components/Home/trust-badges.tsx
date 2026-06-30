'use client';

import { Lock, CheckCircle, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'You control your keys'
  },
  {
    icon: Eye,
    title: 'Open Source',
    description: 'Publicly auditable code'
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
    <section className="py-16 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Built for Trust</h2>
          <p className="text-zinc-400 text-sm">Transparent, secure, and user-controlled</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/50 rounded-xl p-6 text-center border border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-900 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-purple-900/20 mx-auto flex items-center justify-center mb-4 group-hover:bg-purple-900/40 transition">
                  <Icon className="h-7 w-7 text-purple-400" />
                </div>
                <p className="text-white font-semibold text-sm">{badge.title}</p>
                <p className="text-zinc-500 text-xs mt-1">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
