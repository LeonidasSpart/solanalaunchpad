// src/app/api/staking/claim/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { query } from '@/lib/db';
import { getDecimals, getConnection, getPlatformKeypair } from '@/lib/solana';

// Fee percentage (0.05 = 5%)
const FEE_PERCENT = parseFloat(process.env.STAKING_FEE_PERCENT || '0.15');
// Fee wallet: use NEXT_PUBLIC_FEE_REC if set, otherwise platform wallet
const FEE_WALLET_PUBKEY = process.env.NEXT_PUBLIC_FEE_REC || process.env.PLATFORM_PUBLIC_KEY;

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet } = await req.json();

    if (!poolId || !userWallet) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get active position
    const posRes = await query(
      'SELECT * FROM staking_positions WHERE pool_id = $1 AND user_wallet = $2 AND status = $3',
      [poolId, userWallet, 'active']
    );
    if (posRes.rows.length === 0) {
      return NextResponse.json({ error: 'No active position' }, { status: 404 });
    }
    const position = posRes.rows[0];

    // Calculate rewards
    const poolRes = await query('SELECT * FROM staking_pools WHERE id = $1', [poolId]);
    const pool = poolRes.rows[0];
    const now = new Date();
    const lastCalc = new Date(position.last_reward_calc);
    const elapsedHours = (now.getTime() - lastCalc.getTime()) / (1000 * 60 * 60);
    const totalReward = position.amount * (pool.apy / 100) * (elapsedHours / (365.25 * 24));

    if (totalReward <= 0) {
      return NextResponse.json({ error: 'No rewards to claim' }, { status: 400 });
    }

    // --- Fee logic ---
    const fee = totalReward * FEE_PERCENT;
    const userReward = totalReward - fee;

    const mint = new PublicKey(pool.token_mint);
    const decimals = await getDecimals(mint);
    const rawUserReward = Math.floor(userReward * Math.pow(10, decimals));
    const rawFee = Math.floor(fee * Math.pow(10, decimals));

    const platformKeypair = getPlatformKeypair();
    const userPubkey = new PublicKey(userWallet);
    const feeWalletPubkey = new PublicKey(FEE_WALLET_PUBKEY!);
    const userATA = await getAssociatedTokenAddress(mint, userPubkey);
    const platformATA = await getAssociatedTokenAddress(mint, platformKeypair.publicKey);
    const feeATA = await getAssociatedTokenAddress(mint, feeWalletPubkey);

    const connection = getConnection();
    const { blockhash } = await connection.getLatestBlockhash();

    const tx = new Transaction({ feePayer: platformKeypair.publicKey, recentBlockhash: blockhash });

    // 1. Transfer user's reward
    if (rawUserReward > 0) {
      const userIx = createTransferInstruction(
        platformATA,
        userATA,
        platformKeypair.publicKey,
        rawUserReward,
        [],
        TOKEN_PROGRAM_ID
      );
      tx.add(userIx);
    }

    // 2. Transfer platform fee to NEXT_PUBLIC_FEE_REC
    if (rawFee > 0) {
      const feeIx = createTransferInstruction(
        platformATA,
        feeATA,
        platformKeypair.publicKey,
        rawFee,
        [],
        TOKEN_PROGRAM_ID
      );
      tx.add(feeIx);
    }

    tx.sign(platformKeypair);

    // Send raw transaction
    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(signature, 'confirmed');

    // Update position (user reward only)
    await query(
      `UPDATE staking_positions
       SET reward_earned = reward_earned + $1,
           reward_claimed = reward_claimed + $1,
           last_reward_calc = NOW()
       WHERE id = $2`,
      [userReward, position.id]
    );

    // Update pool total rewards paid (includes both user + fee)
    await query(
      'UPDATE staking_pools SET total_rewards_paid = total_rewards_paid + $1 WHERE id = $2',
      [totalReward, poolId]
    );

    // Log transaction (user amount only for clarity)
    await query(
      `INSERT INTO staking_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'claim', $3, $4)`,
      [userWallet, poolId, userReward, signature]
    );

    return NextResponse.json({
      success: true,
      amount: userReward,
      fee: fee,
      signature,
    });
  } catch (error) {
    console.error('Claim error:', error);
    return NextResponse.json({ error: 'Claim failed' }, { status: 500 });
  }
}
