'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, ExternalLink } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('zrp-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('zrp-cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('zrp-cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('zrp-cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1a1a2e]/95 backdrop-blur-xl rounded-2xl border border-[#9945ff]/20 shadow-2xl shadow-black/50 overflow-hidden">
              {!showDetails ? (
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-[#9945ff]/10 border border-[#9945ff]/20 flex items-center justify-center flex-shrink-0">
                      <Cookie className="h-6 w-6 text-[#9945ff]" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#14f195]" />
                        We value your privacy
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        We use cookies to enhance your experience, analyze site traffic, and for marketing purposes.
                        By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                        <a href="/privacy" className="text-[#9945ff] hover:text-[#b279ff] ml-1 inline-flex items-center gap-1 transition-colors">
                          Learn more <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        onClick={handleAcceptAll}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#9945ff] to-[#b279ff] hover:from-[#b279ff] hover:to-[#9945ff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#9945ff]/20 whitespace-nowrap"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={() => setShowDetails(true)}
                        className="px-6 py-2.5 bg-[#0f0f23] hover:bg-[#1a1a2e] text-zinc-300 text-sm font-medium rounded-xl border border-zinc-700 hover:border-zinc-600 transition-all duration-300 whitespace-nowrap"
                      >
                        Customize
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                      <Cookie className="h-5 w-5 text-[#9945ff]" />
                      Cookie Preferences
                    </h3>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 p-4 bg-[#0f0f23] rounded-xl border border-zinc-800/50">
                      <div className="w-10 h-10 rounded-lg bg-[#14f195]/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 text-[#14f195]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium">Necessary</h4>
                          <span className="text-xs text-[#14f195] bg-[#14f195]/10 px-2 py-1 rounded-full">Always on</span>
                        </div>
                        <p className="text-zinc-500 text-sm">
                          Essential cookies required for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#0f0f23] rounded-xl border border-zinc-800/50">
                      <div className="w-10 h-10 rounded-lg bg-[#9945ff]/10 flex items-center justify-center flex-shrink-0">
                        <Cookie className="h-5 w-5 text-[#9945ff]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium">Analytics</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#9945ff]"></div>
                          </label>
                        </div>
                        <p className="text-zinc-500 text-sm">
                          Help us understand how visitors interact with our website by collecting anonymous data.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#0f0f23] rounded-xl border border-zinc-800/50">
                      <div className="w-10 h-10 rounded-lg bg-[#9945ff]/10 flex items-center justify-center flex-shrink-0">
                        <Cookie className="h-5 w-5 text-[#9945ff]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium">Marketing</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#9945ff]"></div>
                          </label>
                        </div>
                        <p className="text-zinc-500 text-sm">
                          Used to deliver personalized advertisements and measure their effectiveness.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-2.5 text-zinc-400 hover:text-white text-sm font-medium rounded-xl border border-zinc-700 hover:border-zinc-600 transition-all duration-300"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={handleAcceptNecessary}
                      className="px-6 py-2.5 bg-[#0f0f23] hover:bg-[#1a1a2e] text-zinc-300 text-sm font-medium rounded-xl border border-zinc-700 hover:border-zinc-600 transition-all duration-300"
                    >
                      Accept Necessary Only
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#9945ff] to-[#b279ff] hover:from-[#b279ff] hover:to-[#9945ff] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#9945ff]/20"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
