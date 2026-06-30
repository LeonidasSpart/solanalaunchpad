'use client';

import { motion } from 'framer-motion';
import { Wallet, Edit3, CheckCircle, Rocket, ArrowRight, Sparkles, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { 
      icon: Wallet, 
      title: 'Connect Wallet', 
      desc: 'Use Phantom, Solflare, Backpack, or any Solana wallet. No seed phrase required.',
      color: 'from-purple-500/20 to-purple-600/5',
      borderColor: 'group-hover:border-purple-500/50',
      iconBg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
      iconColor: 'text-purple-400',
      step: '01'
    },
    { 
      icon: Edit3, 
      title: 'Add Details', 
      desc: 'Name, symbol, supply, logo, and social links. Full branding included free.',
      color: 'from-blue-500/20 to-blue-600/5',
      borderColor: 'group-hover:border-blue-500/50',
      iconBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
      iconColor: 'text-blue-400',
      step: '02'
    },
    { 
      icon: CheckCircle, 
      title: 'Review & Confirm', 
      desc: 'Approve the transaction in your wallet. We simulate first so you know the exact cost.',
      color: 'from-emerald-500/20 to-emerald-600/5',
      borderColor: 'group-hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
      iconColor: 'text-emerald-400',
      step: '03'
    },
    { 
      icon: Rocket, 
      title: 'Token Minted', 
      desc: 'Your token is live on Solana in under 60 seconds. Instant visibility on explorers.',
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'group-hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 group-hover:bg-amber-500/20',
      iconColor: 'text-amber-400',
      step: '04'
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-black relative overflow-hidden scroll-mt-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <Zap className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Easy as 1-2-3-4</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Works</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Four simple steps from idea to on-chain token. No coding, no complexity, no waiting.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative bg-gradient-to-br ${step.color} backdrop-blur-sm rounded-2xl border border-zinc-800/80 ${step.borderColor} p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/5`}
              >
                {/* Step Number */}
                <div className="absolute -top-3 left-6 bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1">
                  <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-purple-400 transition-colors">
                    {step.step}
                  </span>
                </div>

                {/* Connector Arrow (hidden on mobile, last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-zinc-700 group-hover:text-purple-500/50 transition-colors" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${step.iconBg} flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`h-7 w-7 ${step.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                  {step.desc}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${step.color} group-hover:w-1/2 transition-all duration-500 rounded-full`} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-900/20 via-purple-900/10 to-blue-900/20 border border-purple-500/20 rounded-2xl px-8 py-5 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <div className="text-left">
              <div className="text-white font-semibold">Ready to launch?</div>
              <div className="text-sm text-zinc-400">Your token can be live in under 60 seconds</div>
            </div>
            <a 
              href="/create-mint"
              className="ml-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center gap-2"
            >
              Start Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
