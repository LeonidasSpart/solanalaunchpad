'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TokenCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // In production, fetch from your database
    const stored = localStorage.getItem('tokenCount');
    const initialCount = stored ? parseInt(stored) : 1427;
    setCount(initialCount);
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

  return (
    <section id="token-counter" className="py-16 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl font-bold text-purple-400 mb-2">
            {isVisible ? count.toLocaleString() : '0'}+
          </div>
          <p className="text-zinc-400 text-lg">Tokens launched on ZRP</p>
          <div className="flex justify-center gap-8 mt-6 text-sm text-zinc-500">
            <span>⚡ <span className="text-green-400">Live</span> on Mainnet</span>
            <span>🧪 <span className="text-yellow-400">Test</span> on Devnet</span>
            <span>🪙 <span className="text-purple-400">100%</span> No-Code</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
