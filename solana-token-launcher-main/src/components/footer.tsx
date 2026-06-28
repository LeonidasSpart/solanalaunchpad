'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const Footer = () => {  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-background border-t border-gray-900 text-black py-8"
    >
      <div className="container mx-auto px-4">
        {/* Official Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Image 
            src="/logo.png" 
            alt="ZRP Logo" 
            width={48} 
            height={48} 
            className="rounded-xl"
            priority
          />
          <span className="text-3xl font-bold tracking-tighter">ZRP</span>
        </div>

        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <p className="text-gray-400">Premium AI experiences, built for the future.</p>
          </div>
          
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              {['Airdrop', 'Create-Mint', 'Tokens'].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-white transition duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-6">
              {/* X */}
              <a 
                href="https://x.com/zrp_ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25l-7.955 9.132L2.25 2.25H5.14l5.75 7.434L18.244 2.25zM21.75 21.75H16.5L10.5 12.75l-1.5-1.93L2.25 21.75h4.14l6.5-8.42 6.86 8.42z"/>
                </svg>
              </a>
              
              {/* Telegram */}
              <a 
                href="https://t.me/AIZRP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 7.2l-1.42 6.7c-.12.53-.44.66-.9.41l-3.85-2.85-1.85 1.78c-.2.2-.37.37-.76.37l.26-3.72 3.35-3.2c.3-.26.15-.4-.15-.15L8.3 13.3l-3.2-1c-.53-.18-.54-.53.11-.7l12.5-4.82c.45-.17.85.1.7.7z"/>
                </svg>
              </a>
              
              {/* Discord */}
              <a 
                href="https://discord.com/invite/W4qS4xkbn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.492c-1.728-1.06-3.58-1.79-5.5-2.21-.15-.03-.3.06-.37.2-.5.85-1.05 1.55-1.6 2.3-.4.55-.85.95-1.4 1.2-.55.25-1.15.3-1.75.15-.6-.15-1.2-.55-1.65-1.15-.45-.6-.95-1.2-1.55-1.75-.1-.1-.25-.15-.4-.15-1.92.42-3.77 1.16-5.5 2.21-.12.07-.2.2-.2.35v1.5c0 .2.1.35.25.45.8.5 1.55 1.05 2.25 1.7.45.4.9.85 1.35 1.35.4.45.75.95 1.05 1.5.3.55.5 1.15.55 1.8.1 1.35-.2 2.7-.9 3.9-.4.7-.95 1.3-1.65 1.7-.25.15-.4.45-.35.75.1.3.35.5.65.5h2c.3 0 .55-.15.65-.45.25-.75.8-1.35 1.45-1.65.65-.3 1.35-.4 2.05-.3.7.1 1.35.45 1.85 1 .5.55.85 1.25.95 2 .1.35.35.6.7.6h2c.3 0 .55-.2.65-.5.1-.3-.05-.6-.3-.8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ZRP. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
