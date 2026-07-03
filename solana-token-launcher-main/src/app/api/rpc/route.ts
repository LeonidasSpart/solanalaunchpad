import { NextRequest, NextResponse } from 'next/server'

const RPC_URLS: Record<string, string> = {
  devnet: process.env.RPC_URL_DEVNET!,
  mainnet: process.env.RPC_URL_MAINNET!,
}

// Fallback RPCs if primary fails
const RPC_FALLBACKS: Record<string, string[]> = {
  devnet: [
    'https://api.devnet.solana.com',
    'https://devnet.hellomoon.io',
    'https://devnet.rpcpool.com',
  ],
  mainnet: [
    'https://api.mainnet-beta.solana.com',
    'https://mainnet.hellomoon.io',
    'https://rpc.ankr.com/solana',
  ],
}

export async function POST(req: NextRequest) {
  const network = req.nextUrl.searchParams.get('network') || 'devnet'
  const primaryRpc = RPC_URLS[network]
  const fallbacks = RPC_FALLBACKS[network] || []
  
  // Try primary RPC first, then fallbacks
  const rpcUrls = primaryRpc ? [primaryRpc, ...fallbacks] : fallbacks
  
  let lastError = null

  for (const rpcUrl of rpcUrls) {
    try {
      const body = await req.json()

      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      })

      if (!response.ok) {
        lastError = new Error(`RPC returned ${response.status}`)
        continue
      }

      const data = await response.json()
      return NextResponse.json(data)
    } catch (error: any) {
      lastError = error
      console.log(`⚠️ RPC failed: ${rpcUrl.substring(0, 50)}... - ${error.message}`)
      continue
    }
  }

  // If all RPCs failed
  console.error('❌ All RPC endpoints failed')
  return NextResponse.json(
    { 
      error: 'All RPC endpoints failed', 
      details: lastError?.message || 'Unknown error',
      network,
    },
    { status: 502 }
  )
}

// Handle GET requests for health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    rpc_devnet: process.env.RPC_URL_DEVNET ? 'configured' : 'missing',
    rpc_mainnet: process.env.RPC_URL_MAINNET ? 'configured' : 'missing',
    fallbacks_devnet: RPC_FALLBACKS.devnet.length,
    fallbacks_mainnet: RPC_FALLBACKS.mainnet.length,
  })
}
