'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#4f46e520_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm mb-6 border border-white/10">
            ⚡ NO-CODE SOLANA TOKEN CREATOR
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Create a Solana Token<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              in Under 2 Minutes
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-zinc-400 mb-10">
            No coding required. Mint instantly to your wallet. 
            Secure, fast, and non-custodial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-10 py-7 bg-purple-600 hover:bg-purple-700">
              <Link href="/create-mint">🚀 Create Your Token</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-10 py-7">
              <Link href="#how-it-works">How It Works</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
