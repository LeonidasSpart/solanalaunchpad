import { NextRequest, NextResponse } from 'next/server';
import { Connection } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getStakingPool, getStakingPosition } from '@/lib/staking';

export async function POST(request: NextRequest) {
  try {
    const { poolId, userWallet, amount, txSignature } = await request.json();

    // Verify transaction on-chain
    const connection = new Connection(process.env.RPC_URL_DEVNET!);
    const confirmation = await connection.confirmTransaction(txSignature, 'confirmed');
    if (confirmation.value.err) throw new Error('Transaction failed');

    // Now update DB (same as your original code)
    const pool = await getStakingPool(poolId.toString());
    if (!pool) return NextResponse.json({ error: 'Pool not found' }, { status: 404 });

    const existing = await getStakingPosition(poolId, userWallet);
    if (existing) {
      await query(
        `UPDATE staking_positions
         SET amount = amount + $1, last_reward_calc = NOW()
         WHERE id = $2`,
        [amount, existing.id]
      );
    } else {
      await query(
        `INSERT INTO staking_positions (pool_id, user_wallet, amount, staked_at, last_reward_calc)
         VALUES ($1, $2, $3, NOW(), NOW())`,
        [poolId, userWallet, amount]
      );
    }

    await query(
      `UPDATE staking_pools SET total_staked = total_staked + $1 WHERE id = $2`,
      [amount, poolId]
    );

    await query(
      `INSERT INTO staking_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'stake', $3, $4)`,
      [userWallet, poolId, amount, txSignature]
    );

    return NextResponse.json({ success: true, message: `Staked ${amount} tokens` });
  } catch (error) {
    console.error('Stake confirm error:', error);
    return NextResponse.json({ error: 'Failed to confirm stake' }, { status: 500 });
  }
}
