import { NextRequest, NextResponse } from 'next/server'

const RPC_URLS: Record<string, string> = {
  devnet: process.env.RPC_URL_DEVNET!,
  mainnet: process.env.RPC_URL_MAINNET!,
}

export async function POST(req: NextRequest) {
  const network = req.nextUrl.searchParams.get('network') || 'devnet'
  const rpcUrl = RPC_URLS[network]

  if (!rpcUrl) {
    return NextResponse.json({ error: 'Invalid network' }, { status: 400 })
  }

  const body = await req.json()

  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return NextResponse.json(data)
}
