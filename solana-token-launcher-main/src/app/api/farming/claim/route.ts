import { NextRequest, NextResponse } from 'next/server';
import { PublicKey, Transaction } from '@solana/web3.js';  // ← added Transaction
import { query } from '@/lib/db';
import { getConnection, getPlatformKeypair, getDecimals } from '@/lib/solana';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';

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

    // Calculate reward
    const poolRes = await query('SELECT * FROM farming_pools WHERE id = $1', [poolId]);
    const pool = poolRes.rows[0];
    const now = new Date();
    const lastCalc = new Date(position.last_reward_calc);
    const elapsedHours = (now.getTime() - lastCalc.getTime()) / (1000 * 60 * 60);
    const reward = position.amount * (pool.apy / 100) * (elapsedHours / (365.25 * 24));

    if (reward <= 0) {
      return NextResponse.json({ error: 'No rewards to claim' }, { status: 400 });
    }

    const mint = new PublicKey(pool.reward_mint);
    const decimals = await getDecimals(mint);
    const rawReward = Math.floor(reward * Math.pow(10, decimals));

    const platformKeypair = getPlatformKeypair();
    const userPubkey = new PublicKey(userWallet);
    const userAta = await getAssociatedTokenAddress(mint, userPubkey);
    const platformAta = await getAssociatedTokenAddress(mint, platformKeypair.publicKey);

    const connection = getConnection();
    const { blockhash } = await connection.getLatestBlockhash();

    const transferIx = createTransferInstruction(
      platformAta,
      userAta,
      platformKeypair.publicKey,
      rawReward,
      [],
      TOKEN_PROGRAM_ID
    );

    const tx = new Transaction({ feePayer: platformKeypair.publicKey, recentBlockhash: blockhash }).add(transferIx);
    tx.sign(platformKeypair);

    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(signature, 'confirmed');

    // Update position
    await query(
      `UPDATE farming_positions
       SET reward_earned = reward_earned + $1,
           reward_claimed = reward_claimed + $1,
           last_reward_calc = NOW()
       WHERE id = $2`,
      [reward, positionId]
    );

    await query(
      'UPDATE farming_pools SET total_rewards_paid = total_rewards_paid + $1 WHERE id = $2',
      [reward, poolId]
    );

    await query(
      `INSERT INTO farming_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'claim', $3, $4)`,
      [userWallet, poolId, reward, signature]
    );

    return NextResponse.json({ success: true, reward, signature });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Claim failed' }, { status: 500 });
  }
}
