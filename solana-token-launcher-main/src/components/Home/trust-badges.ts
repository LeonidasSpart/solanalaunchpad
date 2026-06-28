'use client';

import { motion } from 'framer-motion';
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
    <section className="py-12 bg-zinc-900/30 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                  <IconComponent className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{badge.title}</p>
                  <p className="text-xs text-zinc-500">{badge.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
