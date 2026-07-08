import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getTokenHolders } from '@/lib/helius';

export async function GET(req: NextRequest) {
  // ─── 1. Verify cron secret ──────────────────────────────────────
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // ─── 2. Fetch all tokens from DB ──────────────────────────────
    const tokens = await query('SELECT id, mint_address FROM tokens');
    let processed = 0;

    for (const token of tokens.rows) {
      const mint = token.mint_address;

      // ─── 3. Get holder count (using Helius) ─────────────────────
      const holdersData = await getTokenHolders(mint);

      // ─── 4. Get price (Jupiter, only on mainnet) ────────────────
      let price = 0;
      let marketCap = 0;
      let volume24h = 0;
      if (process.env.NEXT_PUBLIC_SOLANA_NETWORK === 'mainnet') {
        try {
          const res = await fetch(`https://quote-api.jup.ag/v6/price?ids=${mint}`);
          const data = await res.json();
          price = data.data[mint]?.price || 0;
          // You can add marketCap/volume later if available
        } catch {}
      }

      // ─── 5. Insert snapshot ──────────────────────────────────────
      await query(
        `INSERT INTO token_snapshots (token_id, price_usd, market_cap, volume_24h, holder_count, timestamp)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [token.id, price, marketCap, volume24h, holdersData.count]
      );

      processed++;
    }

    return NextResponse.json({ success: true, processed });
  } catch (error) {
    console.error('Analytics cron error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
