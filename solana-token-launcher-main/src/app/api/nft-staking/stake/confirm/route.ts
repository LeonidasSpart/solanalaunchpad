// src/app/api/nft-staking/stake/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getConnection } from '@/lib/solana';
import { isValidPublicKey } from '@/lib/validate';
import { ratelimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // ─── Rate limiting ──────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const { poolId, userWallet, nftMintAddress, txSignature } = await req.json();

    if (!poolId || !userWallet || !nftMintAddress || !txSignature) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // ─── Validate wallet ────────────────────────────────────────────
    if (!isValidPublicKey(userWallet) || !isValidPublicKey(nftMintAddress)) {
      return NextResponse.json({ error: 'Invalid wallet or NFT mint address' }, { status: 400 });
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
      'SELECT id FROM nft_staking_transactions WHERE tx_signature = $1',
      [txSignature]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Transaction already processed' }, { status: 409 });
    }

    // ─── 3. Get pool info ──────────────────────────────────────────
    const poolRes = await query('SELECT * FROM nft_staking_pools WHERE id = $1', [poolId]);
    const pool = poolRes.rows[0];
    if (!pool) {
      return NextResponse.json({ error: 'Pool not found' }, { status: 404 });
    }

    // ─── 4. Check if NFT is already staked ────────────────────────
    const existingPos = await query(
      'SELECT * FROM nft_staking_positions WHERE pool_id = $1 AND nft_mint_address = $2 AND status = $3',
      [poolId, nftMintAddress, 'active']
    );
    if (existingPos.rows.length > 0) {
      return NextResponse.json({ error: 'NFT already staked in this pool' }, { status: 400 });
    }

    // ─── 5. Insert position ────────────────────────────────────────
    await query(
      `INSERT INTO nft_staking_positions
        (pool_id, user_wallet, nft_mint_address, staked_at, last_reward_calc, unlocked_at)
       VALUES ($1, $2, $3, NOW(), NOW(),
               CASE WHEN $4 > 0 THEN NOW() + INTERVAL '1 second' * $4 ELSE NULL END)`,
      [poolId, userWallet, nftMintAddress, pool.lock_duration]
    );

    // ─── 6. Update pool total staked ──────────────────────────────
    await query(
      'UPDATE nft_staking_pools SET total_staked = total_staked + 1 WHERE id = $1',
      [poolId]
    );

    // ─── 7. Log transaction ────────────────────────────────────────
    await query(
      `INSERT INTO nft_staking_transactions
        (user_wallet, pool_id, nft_mint_address, type, tx_signature)
       VALUES ($1, $2, $3, 'stake', $4)`,
      [userWallet, poolId, nftMintAddress, txSignature]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('NFT stake confirm error:', error);
    return NextResponse.json({ error: 'Failed to confirm stake' }, { status: 500 });
  }
}
