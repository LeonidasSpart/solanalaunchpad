'use client';

import { Wallet, Edit3, CheckCircle, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { icon: Wallet, title: "Connect Wallet", desc: "Use Phantom, Solflare, or any Solana wallet." },
    { icon: Edit3, title: "Add Details", desc: "Name, symbol, supply, logo, and social links." },
    { icon: CheckCircle, title: "Review & Confirm", desc: "Approve the transaction in your wallet." },
    { icon: Rocket, title: "Token Minted", desc: "Your token is live on Solana instantly." },
  ];

  return (
    <section className="py-20 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="text-zinc-400 mt-3">Four simple steps from idea to on-chain token</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center hover:border-purple-500 transition-colors">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-600/10 flex items-center justify-center">
                <step.icon className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
              <p className="text-zinc-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
