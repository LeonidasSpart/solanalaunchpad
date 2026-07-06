// src/app/api/staking/stake/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/solana';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet, signature, amount } = await req.json();

    if (!poolId || !userWallet || !signature || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const connection = getConnection();
    const confirmation = await connection.confirmTransaction(signature, 'confirmed');
    if (confirmation.value.err) {
      return NextResponse.json({ error: 'Transaction failed' }, { status: 400 });
    }

    // Update or create position
    const poolResult = await query('SELECT * FROM staking_pools WHERE id = $1', [poolId]);
    const pool = poolResult.rows[0];

    const existing = await query(
      'SELECT * FROM staking_positions WHERE pool_id = $1 AND user_wallet = $2 AND status = $3',
      [poolId, userWallet, 'active']
    );

    if (existing.rows.length > 0) {
      await query(
        `UPDATE staking_positions
         SET amount = amount + $1, last_reward_calc = NOW()
         WHERE id = $2`,
        [amount, existing.rows[0].id]
      );
    } else {
      await query(
        `INSERT INTO staking_positions (pool_id, user_wallet, amount, staked_at, last_reward_calc, unlocked_at)
         VALUES ($1, $2, $3, NOW(), NOW(), NOW() + ($4 * INTERVAL '1 second'))`,
        [poolId, userWallet, amount, pool.lock_duration]
      );
    }

    await query(
      'UPDATE staking_pools SET total_staked = total_staked + $1 WHERE id = $2',
      [amount, poolId]
    );

    await query(
      `INSERT INTO staking_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'stake', $3, $4)`,
      [userWallet, poolId, amount, signature]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Stake confirm error:', error);
    return NextResponse.json({ error: 'Failed to confirm stake' }, { status: 500 });
  }
}
