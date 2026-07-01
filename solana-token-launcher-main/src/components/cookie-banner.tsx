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
            <div className="bg-[#0D0D0D]/95 backdrop-blur-xl rounded-2xl border border-[#FF2D2D]/20 shadow-2xl shadow-black/50 overflow-hidden">
              {!showDetails ? (
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FF2D2D]/10 border border-[#FF2D2D]/20 flex items-center justify-center flex-shrink-0">
                      <Cookie className="h-6 w-6 text-[#FF2D2D]" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#FF2D2D]" />
                        We value your privacy
                      </h3>
                      <p className="text-[#BDDBDB] text-sm leading-relaxed">
                        We use cookies to enhance your experience, analyze site traffic, and for marketing purposes.
                        By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                        <a href="/privacy" className="text-[#FF2D2D] hover:text-[#B10000] ml-1 inline-flex items-center gap-1 transition-colors">
                          Learn more <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        onClick={handleAcceptAll}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#FF2D2D] via-[#1a1a1a] to-[#BDDBDB] hover:from-[#B10000] hover:via-[#0D0D0D] hover:to-[#9a9a9a] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#FF2D2D]/20 whitespace-nowrap"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={() => setShowDetails(true)}
                        className="px-6 py-2.5 bg-[#050505] hover:bg-[#0D0D0D] text-[#BDDBDB] text-sm font-medium rounded-xl border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition-all duration-300 whitespace-nowrap"
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
                      <Cookie className="h-5 w-5 text-[#FF2D2D]" />
                      Cookie Preferences
                    </h3>
                    <button
                      onClick={() => setShowDetails(false)}
                      className="w-8 h-8 rounded-lg bg-[#1a1a1a]/50 flex items-center justify-center text-[#BDDBDB] hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 p-4 bg-[#050505] rounded-xl border border-[#1a1a1a]/50">
                      <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-5 w-5 text-[#FF2D2D]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium">Necessary</h4>
                          <span className="text-xs text-[#FF2D2D] bg-[#FF2D2D]/10 px-2 py-1 rounded-full">Always on</span>
                        </div>
                        <p className="text-[#BDDBDB] text-sm">
                          Essential cookies required for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#050505] rounded-xl border border-[#1a1a1a]/50">
                      <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center flex-shrink-0">
                        <Cookie className="h-5 w-5 text-[#FF2D2D]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium">Analytics</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-[#1a1a1a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#1a1a1a] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF2D2D]"></div>
                          </label>
                        </div>
                        <p className="text-[#BDDBDB] text-sm">
                          Help us understand how visitors interact with our website by collecting anonymous data.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#050505] rounded-xl border border-[#1a1a1a]/50">
                      <div className="w-10 h-10 rounded-lg bg-[#FF2D2D]/10 flex items-center justify-center flex-shrink-0">
                        <Cookie className="h-5 w-5 text-[#FF2D2D]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-medium">Marketing</h4>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-9 h-5 bg-[#1a1a1a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#1a1a1a] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FF2D2D]"></div>
                          </label>
                        </div>
                        <p className="text-[#BDDBDB] text-sm">
                          Used to deliver personalized advertisements and measure their effectiveness.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-2.5 text-[#BDDBDB] hover:text-white text-sm font-medium rounded-xl border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition-all duration-300"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={handleAcceptNecessary}
                      className="px-6 py-2.5 bg-[#050505] hover:bg-[#0D0D0D] text-[#BDDBDB] text-sm font-medium rounded-xl border border-[#1a1a1a] hover:border-[#FF2D2D]/30 transition-all duration-300"
                    >
                      Accept Necessary Only
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#FF2D2D] via-[#1a1a1a] to-[#BDDBDB] hover:from-[#B10000] hover:via-[#0D0D0D] hover:to-[#9a9a9a] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#FF2D2D]/20"
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
