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

    // ─── 1. Fetch the actual transaction ────────────────────────────
    const tx = await connection.getTransaction(signature, {
      commitment: 'confirmed',
    });
    if (!tx || tx.meta?.err) {
      return NextResponse.json({ error: 'Transaction not found or failed' }, { status: 400 });
    }

    // ─── 2. Prevent replay attacks ──────────────────────────────────
    const existing = await query(
      'SELECT id FROM staking_transactions WHERE tx_signature = $1',
      [signature]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Transaction already processed' }, { status: 409 });
    }

    // ─── 3. (Optional) Verify the transaction transferred the correct amount to the platform wallet ───
    // We'll add a more robust check in a future update.

    // ─── 4. Update or create position ───────────────────────────────
    const poolResult = await query('SELECT * FROM staking_pools WHERE id = $1', [poolId]);
    const pool = poolResult.rows[0];

    const existingPos = await query(
      'SELECT * FROM staking_positions WHERE pool_id = $1 AND user_wallet = $2 AND status = $3',
      [poolId, userWallet, 'active']
    );

    if (existingPos.rows.length > 0) {
      await query(
        `UPDATE staking_positions
         SET amount = amount + $1, last_reward_calc = NOW()
         WHERE id = $2`,
        [amount, existingPos.rows[0].id]
      );
    } else {
      // SAFE parameterized SQL with conditional unlocked_at
      await query(
        `INSERT INTO staking_positions
          (pool_id, user_wallet, amount, staked_at, last_reward_calc, unlocked_at)
         VALUES ($1, $2, $3, NOW(), NOW(),
                 CASE WHEN $4 > 0 THEN NOW() + INTERVAL '1 second' * $4 ELSE NULL END)`,
        [poolId, userWallet, amount, pool.lock_duration]
      );
    }

    // ─── 5. Update pool total staked ────────────────────────────────
    await query(
      'UPDATE staking_pools SET total_staked = total_staked + $1 WHERE id = $2',
      [amount, poolId]
    );

    // ─── 6. Log transaction ──────────────────────────────────────────
    await query(
      `INSERT INTO staking_transactions
        (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'stake', $3, $4)`,
      [userWallet, poolId, amount, signature]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Stake confirm error:', error);
    return NextResponse.json({ error: 'Failed to confirm stake' }, { status: 500 });
  }
}
