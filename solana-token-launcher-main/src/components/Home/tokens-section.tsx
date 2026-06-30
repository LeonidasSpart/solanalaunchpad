'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const tokens = [
  { name: 'SolToken', symbol: 'SOL', description: 'Example token with basic metadata' },
  { name: 'LunaToken', symbol: 'LUNA', description: 'Example token with revoked authorities' },
  { name: 'StarToken', symbol: 'STAR', description: 'Example token with full branding' },
]

const TokensSection = () => {
  return (
    <section className="py-20 sm:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
          Example Tokens
        </h2>
        <p className="mt-4 text-xl text-muted-foreground">
          These are example tokens showing what your token could look like on Solana.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tokens.map((token, index) => (
            <motion.div
              key={token.name}
              className="bg-card rounded-lg shadow-lg overflow-hidden border border-border/50"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-sm">{token.symbol[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{token.name}</h3>
                    <p className="text-sm text-muted-foreground">Symbol: {token.symbol}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{token.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
                  <span>Example</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/tokens">View All Your Tokens</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TokensSection
