import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/solana';

export async function POST(req: NextRequest) {
  try {
    // Dynamic import inside the route (so it's not bundled with the main app)
    const { Raydium } = await import('@raydium-io/raydium-sdk-v2');
    // ... use Raydium
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Raydium SDK failed' }, { status: 500 });
  }
}
