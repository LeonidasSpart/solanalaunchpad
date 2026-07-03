import { NextRequest, NextResponse } from 'next/server'

// Validate env at module load
const RPC_URLS: Record<string, string> = {
  devnet: process.env.RPC_URL_DEVNET || '',
  mainnet: process.env.RPC_URL_MAINNET || '',
}

if (!RPC_URLS.devnet) console.warn('⚠️ RPC_URL_DEVNET not set, using fallbacks')
if (!RPC_URLS.mainnet) console.warn('⚠️ RPC_URL_MAINNET not set, using fallbacks')

const RPC_FALLBACKS: Record<string, string[]> = {
  devnet: [
    'https://api.devnet.solana.com',
  ],
  mainnet: [
    'https://api.mainnet-beta.solana.com',
  ],
}

// Allowed RPC methods — whitelist only read + safe write methods
const ALLOWED_METHODS = new Set([
  'getBalance',
  'getAccountInfo',
  'getTransaction',
  'getBlockHeight',
  'getLatestBlockhash',
  'getFeeForMessage',
  'getTokenAccountsByOwner',
  'getTokenMetadata',
  'simulateTransaction',
  'getSignatureStatuses',
  'getMinimumBalanceForRentExemption',
  'getSlot',
  'getEpochInfo',
  'getMultipleAccounts',
  'getProgramAccounts',
])

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 100 // per minute per IP
const WINDOW_MS = 60 * 1000

// Clean up expired entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of rateLimit.entries()) {
    if (now > record.resetAt) {
      rateLimit.delete(ip)
    }
  }
}, 5 * 60 * 1000)

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)
  
  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  
  if (record.count >= RATE_LIMIT) return true
  record.count++
  return false
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || req.headers.get('x-real-ip') 
    || 'unknown'
}

function isAllowedMethod(body: any): boolean {
  if (Array.isArray(body)) {
    return body.every((r: any) => ALLOWED_METHODS.has(r.method))
  }
  return ALLOWED_METHODS.has(body?.method)
}

export async function POST(req: NextRequest) {
  // Rate limit check
  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 100 requests per minute.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  // Size limit
  const contentLength = parseInt(req.headers.get('content-length') || '0')
  if (contentLength > 1024 * 1024) { // 1MB max
    return NextResponse.json({ error: 'Request too large' }, { status: 413 })
  }

  // Parse body once, before loop
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  // Method whitelist
  if (!isAllowedMethod(body)) {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 403 }
    )
  }

  const network = req.nextUrl.searchParams.get('network') || 'devnet'
  const primaryRpc = RPC_URLS[network]
  const fallbacks = RPC_FALLBACKS[network] || []
  const rpcUrls = primaryRpc ? [primaryRpc, ...fallbacks] : fallbacks

  if (rpcUrls.length === 0) {
    return NextResponse.json({ error: `No RPC endpoints for ${network}` }, { status: 500 })
  }

  let lastError: Error | null = null

  for (const rpcUrl of rpcUrls) {
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10000),
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

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    rpc_devnet: RPC_URLS.devnet ? 'configured' : 'missing',
    rpc_mainnet: RPC_URLS.mainnet ? 'configured' : 'missing',
    fallbacks_devnet: RPC_FALLBACKS.devnet.length,
    fallbacks_mainnet: RPC_FALLBACKS.mainnet.length,
    rate_limit: `${RATE_LIMIT}/min`,
  })
}
