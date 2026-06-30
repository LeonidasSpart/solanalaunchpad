'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TokenCounter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fetch from Firebase or your database
    // Replace this with actual API call when ready
    async function fetchTokenCount() {
      try {
        const response = await fetch('/api/token-count');
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        // If API fails, show nothing or a placeholder
        console.error('Failed to fetch token count:', error);
        setCount(0);
      }
    }

    fetchTokenCount();
    
    // Refresh every 30 seconds
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

  // Don't show if count is 0 (no real data yet)
  if (count === 0) {
    return (
      <section id="token-counter" className="py-16 bg-gradient-to-b from-black to-zinc-900">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl font-bold text-purple-400 mb-2">New & Growing</div>
            <p className="text-zinc-400 text-lg">Join the early adopters creating on ZRP</p>
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
