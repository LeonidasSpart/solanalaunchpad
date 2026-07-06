import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getStakingPool, getStakingPosition } from '@/lib/staking';

export async function POST(request: NextRequest) {
  try {
    const { poolId, userWallet, amount } = await request.json();

    if (!poolId || !userWallet || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get pool
    const pool = await getStakingPool(poolId.toString());
    if (!pool) return NextResponse.json({ error: 'Pool not found' }, { status: 404 });

    // Check existing position
    const existing = await getStakingPosition(poolId, userWallet);
    if (existing) {
      // Update existing position
      await query(
        `UPDATE staking_positions
         SET amount = amount + $1, last_reward_calc = NOW()
         WHERE id = $2`,
        [amount, existing.id]
      );
    } else {
      // Create new position
      await query(
        `INSERT INTO staking_positions (pool_id, user_wallet, amount, staked_at, last_reward_calc)
         VALUES ($1, $2, $3, NOW(), NOW())`,
        [poolId, userWallet, amount]
      );
    }

    // Update pool total
    await query(
      `UPDATE staking_pools SET total_staked = total_staked + $1 WHERE id = $2`,
      [amount, poolId]
    );

    // Log transaction
    await query(
      `INSERT INTO staking_transactions (user_wallet, pool_id, type, amount)
       VALUES ($1, $2, 'stake', $3)`,
      [userWallet, poolId, amount]
    );

    return NextResponse.json({ success: true, message: `Staked ${amount} tokens` });
  } catch (error) {
    console.error('Stake error:', error);
    return NextResponse.json({ error: 'Failed to stake' }, { status: 500 });
  }
}
