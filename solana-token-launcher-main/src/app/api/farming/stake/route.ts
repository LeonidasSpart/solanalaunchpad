import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getDecimals, getPlatformKeypair } from '@/lib/solana';
import { buildTransferLpTransaction } from '@/lib/farming';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet, amount } = await req.json();
    if (!poolId || !userWallet || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch pool
    const poolRes = await query('SELECT * FROM farming_pools WHERE id = $1 AND is_active = true', [poolId]);
    const pool = poolRes.rows[0];
    if (!pool) {
      return NextResponse.json({ error: 'Pool not found or inactive' }, { status: 404 });
    }

    // Validate min/max
    if (amount < pool.min_stake || (pool.max_stake > 0 && amount > pool.max_stake)) {
      return NextResponse.json({ error: 'Amount outside limits' }, { status: 400 });
    }

    const lpMint = new PublicKey(pool.lp_mint);
    const decimals = await getDecimals(lpMint);
    const userPubkey = new PublicKey(userWallet);
    const platformPubkey = getPlatformKeypair().publicKey;

    // Build transfer transaction (user → platform)
    const tx = await buildTransferLpTransaction(lpMint, userPubkey, platformPubkey, amount, decimals);
    const serialized = tx.serialize({ requireAllSignatures: false }).toString('base64');

    return NextResponse.json({ transaction: serialized });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to build stake transaction' }, { status: 500 });
  }
}
