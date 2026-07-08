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
    const confirmation = await connection.confirmTransaction(txSignature, 'confirmed');
    if (confirmation.value.err) {
      return NextResponse.json({ error: 'Transaction failed' }, { status: 400 });
    }

    const poolRes = await query('SELECT * FROM farming_pools WHERE id = $1', [poolId]);
    const pool = poolRes.rows[0];
    const unlockedAt = pool.lock_duration > 0 ? `NOW() + INTERVAL '${pool.lock_duration} seconds'` : null;

    // Check existing position
    const existing = await query(
      'SELECT * FROM farming_positions WHERE pool_id = $1 AND user_wallet = $2 AND status = $3',
      [poolId, userWallet, 'active']
    );
    if (existing.rows.length > 0) {
      await query(
        `UPDATE farming_positions SET amount = amount + $1, last_reward_calc = NOW() WHERE id = $2`,
        [amount, existing.rows[0].id]
      );
    } else {
      await query(
        `INSERT INTO farming_positions (pool_id, user_wallet, amount, staked_at, last_reward_calc, unlocked_at)
         VALUES ($1, $2, $3, NOW(), NOW(), ${unlockedAt ? `NOW() + INTERVAL '${pool.lock_duration} seconds'` : 'NULL'})`,
        [poolId, userWallet, amount]
      );
    }

    // Update pool total staked
    await query('UPDATE farming_pools SET total_staked = total_staked + $1 WHERE id = $2', [amount, poolId]);

    // Log transaction
    await query(
      `INSERT INTO farming_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'stake', $3, $4)`,
      [userWallet, poolId, amount, txSignature]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to confirm stake' }, { status: 500 });
  }
}
