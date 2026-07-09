// src/app/api/farming/stake/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getConnection } from '@/lib/solana';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet, amount, txSignature } = await req.json();
    if (!poolId || !userWallet || !amount || !txSignature) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const connection = getConnection();

    // ─── 1. Verify transaction exists and succeeded ──────────────
    const tx = await connection.getTransaction(txSignature, {
      commitment: 'confirmed',
    });
    if (!tx || tx.meta?.err) {
      return NextResponse.json({ error: 'Transaction not found or failed' }, { status: 400 });
    }

    // ─── 2. Prevent replay attacks ────────────────────────────────
    const existing = await query(
      'SELECT id FROM farming_transactions WHERE tx_signature = $1',
      [txSignature]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Transaction already processed' }, { status: 409 });
    }

    // ─── 3. Get pool info ──────────────────────────────────────────
    const poolRes = await query('SELECT * FROM farming_pools WHERE id = $1', [poolId]);
    const pool = poolRes.rows[0];

    // ─── 4. Check existing position ────────────────────────────────
    const existingPos = await query(
      'SELECT * FROM farming_positions WHERE pool_id = $1 AND user_wallet = $2 AND status = $3',
      [poolId, userWallet, 'active']
    );

    // ─── 5. Insert or update position – SAFE parameterized SQL ────
    if (existingPos.rows.length > 0) {
      await query(
        `UPDATE farming_positions
         SET amount = amount + $1, last_reward_calc = NOW()
         WHERE id = $2`,
        [amount, existingPos.rows[0].id]
      );
    } else {
      // Use CASE in SQL to avoid string interpolation
      await query(
        `INSERT INTO farming_positions
          (pool_id, user_wallet, amount, staked_at, last_reward_calc, unlocked_at)
         VALUES ($1, $2, $3, NOW(), NOW(),
                 CASE WHEN $4 > 0 THEN NOW() + INTERVAL '1 second' * $4 ELSE NULL END)`,
        [poolId, userWallet, amount, pool.lock_duration]
      );
    }

    // ─── 6. Update pool total staked ──────────────────────────────
    await query(
      'UPDATE farming_pools SET total_staked = total_staked + $1 WHERE id = $2',
      [amount, poolId]
    );

    // ─── 7. Log transaction ────────────────────────────────────────
    await query(
      `INSERT INTO farming_transactions
        (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'stake', $3, $4)`,
      [userWallet, poolId, amount, txSignature]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Stake confirm error:', error);
    return NextResponse.json({ error: 'Failed to confirm stake' }, { status: 500 });
  }
}
