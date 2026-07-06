// src/app/api/staking/unstake/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { query } from '@/lib/db';
import { getDecimals, getConnection, getPlatformKeypair } from '@/lib/solana';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet } = await req.json();

    if (!poolId || !userWallet) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch active position
    const posRes = await query(
      'SELECT * FROM staking_positions WHERE pool_id = $1 AND user_wallet = $2 AND status = $3',
      [poolId, userWallet, 'active']
    );
    if (posRes.rows.length === 0) {
      return NextResponse.json({ error: 'No active position found' }, { status: 404 });
    }
    const position = posRes.rows[0];

    // Check lock
    if (position.unlocked_at && new Date(position.unlocked_at) > new Date()) {
      return NextResponse.json({ error: 'Tokens are still locked' }, { status: 400 });
    }

    // Get pool
    const poolRes = await query('SELECT * FROM staking_pools WHERE id = $1', [poolId]);
    const pool = poolRes.rows[0];

    const mint = new PublicKey(pool.token_mint);
    const decimals = await getDecimals(mint);
    const rawAmount = Math.floor(position.amount * Math.pow(10, decimals));

    const platformKeypair = getPlatformKeypair();
    const userPubkey = new PublicKey(userWallet);
    const userATA = await getAssociatedTokenAddress(mint, userPubkey);
    const platformATA = await getAssociatedTokenAddress(mint, platformKeypair.publicKey);

    const connection = getConnection();
    const { blockhash } = await connection.getLatestBlockhash();

    const transferIx = createTransferInstruction(
      platformATA,
      userATA,
      platformKeypair.publicKey,
      rawAmount,
      [],
      TOKEN_PROGRAM_ID
    );

    const tx = new Transaction({ feePayer: platformKeypair.publicKey, recentBlockhash: blockhash }).add(transferIx);
    tx.sign(platformKeypair);

    const signature = await connection.sendTransaction(tx);
    await connection.confirmTransaction(signature, 'confirmed');

    // Update position
    await query(
      `UPDATE staking_positions SET status = 'unstaked' WHERE id = $1`,
      [position.id]
    );

    await query(
      'UPDATE staking_pools SET total_staked = total_staked - $1 WHERE id = $2',
      [position.amount, poolId]
    );

    await query(
      `INSERT INTO staking_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'unstake', $3, $4)`,
      [userWallet, poolId, position.amount, signature]
    );

    return NextResponse.json({ success: true, signature });
  } catch (error) {
    console.error('Unstake error:', error);
    return NextResponse.json({ error: 'Failed to unstake' }, { status: 500 });
  }
}
