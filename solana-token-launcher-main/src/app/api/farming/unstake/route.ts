import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getConnection, getPlatformKeypair, getDecimals } from '@/lib/solana';
import { transferLpFromPlatform } from '@/lib/farming';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet, positionId } = await req.json();
    if (!poolId || !userWallet || !positionId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Get position
    const posRes = await query(
      'SELECT * FROM farming_positions WHERE id = $1 AND pool_id = $2 AND user_wallet = $3 AND status = $4',
      [positionId, poolId, userWallet, 'active']
    );
    if (posRes.rows.length === 0) {
      return NextResponse.json({ error: 'No active position' }, { status: 404 });
    }
    const position = posRes.rows[0];

    // Check lock
    if (position.unlocked_at && new Date(position.unlocked_at) > new Date()) {
      return NextResponse.json({ error: 'LP tokens are still locked' }, { status: 400 });
    }

    const poolRes = await query('SELECT * FROM farming_pools WHERE id = $1', [poolId]);
    const pool = poolRes.rows[0];
    const lpMint = new PublicKey(pool.lp_mint);
    const decimals = await getDecimals(lpMint);
    const amount = parseFloat(position.amount);

    const signature = await transferLpFromPlatform(lpMint, new PublicKey(userWallet), amount, decimals);

    // Update position
    await query(
      `UPDATE farming_positions SET status = 'unstaked' WHERE id = $1`,
      [positionId]
    );

    await query(
      'UPDATE farming_pools SET total_staked = total_staked - $1 WHERE id = $2',
      [amount, poolId]
    );

    await query(
      `INSERT INTO farming_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'unstake', $3, $4)`,
      [userWallet, poolId, amount, signature]
    );

    return NextResponse.json({ success: true, signature });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unstake failed' }, { status: 500 });
  }
}
