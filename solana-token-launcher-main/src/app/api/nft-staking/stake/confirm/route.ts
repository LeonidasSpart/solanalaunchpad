import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getConnection } from '@/lib/solana';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet, nftMintAddress, txSignature } = await req.json();
    if (!poolId || !userWallet || !nftMintAddress || !txSignature) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const connection = getConnection();
    const confirmation = await connection.confirmTransaction(txSignature, 'confirmed');
    if (confirmation.value.err) {
      return NextResponse.json({ error: 'Transaction failed' }, { status: 400 });
    }

    // Create position
    const poolRes = await query('SELECT * FROM nft_staking_pools WHERE id = $1', [poolId]);
    const pool = poolRes.rows[0];
    const unlockedAt = pool.lock_duration > 0 ? `NOW() + INTERVAL '${pool.lock_duration} seconds'` : null;

    await query(
      `INSERT INTO nft_staking_positions (pool_id, user_wallet, nft_mint_address, staked_at, last_reward_calc, unlocked_at)
       VALUES ($1, $2, $3, NOW(), NOW(), ${unlockedAt ? `NOW() + INTERVAL '${pool.lock_duration} seconds'` : 'NULL'})`,
      [poolId, userWallet, nftMintAddress]
    );

    // Update pool total staked
    await query(
      'UPDATE nft_staking_pools SET total_staked = total_staked + 1 WHERE id = $1',
      [poolId]
    );

    // Log transaction
    await query(
      `INSERT INTO nft_staking_transactions (user_wallet, pool_id, nft_mint_address, type, tx_signature)
       VALUES ($1, $2, $3, 'stake', $4)`,
      [userWallet, poolId, nftMintAddress, txSignature]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to confirm stake' }, { status: 500 });
  }
}
