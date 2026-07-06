import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Connection, PublicKey, Transaction, Keypair } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';

const PLATFORM_PRIVATE_KEY_BASE64 = process.env.PLATFORM_PRIVATE_KEY || '';
const RPC_URL = process.env.RPC_URL_MAINNET || 'https://api.mainnet-beta.solana.com';

export async function POST(request: NextRequest) {
  try {
    const { poolId, userWallet } = await request.json();

    if (!poolId || !userWallet) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get position
    const posRes = await query(
      'SELECT * FROM staking_positions WHERE pool_id = $1 AND user_wallet = $2 AND status = $3',
      [poolId, userWallet, 'active']
    );

    if (posRes.rows.length === 0) {
      return NextResponse.json({ error: 'No active staking position found' }, { status: 404 });
    }

    const position = posRes.rows[0];
    const rewardAmount = Number(position.reward_earned - position.reward_claimed);

    if (rewardAmount <= 0) {
      return NextResponse.json({ error: 'No rewards available to claim' }, { status: 400 });
    }

    // Get pool info
    const poolRes = await query('SELECT * FROM staking_pools WHERE id = $1', [poolId]);
    if (poolRes.rows.length === 0) {
      return NextResponse.json({ error: 'Pool not found' }, { status: 404 });
    }
    const pool = poolRes.rows[0];

    // Load platform wallet
    const privateKeyBase64 = PLATFORM_PRIVATE_KEY_BASE64;
    if (!privateKeyBase64) {
      return NextResponse.json({ error: 'Platform wallet not configured' }, { status: 500 });
    }
    const secretKey = Uint8Array.from(Buffer.from(privateKeyBase64, 'base64'));
    const platformKeypair = Keypair.fromSecretKey(secretKey);

    const connection = new Connection(RPC_URL, 'confirmed');

    // Transfer rewards from platform wallet to user
    const mintPubkey = new PublicKey(pool.token_mint);
    const userPubkey = new PublicKey(userWallet);
    const platformPubkey = platformKeypair.publicKey;

    const platformAta = await getAssociatedTokenAddress(mintPubkey, platformPubkey);
    const userAta = await getAssociatedTokenAddress(mintPubkey, userPubkey);

    const amountInBaseUnits = rewardAmount * Math.pow(10, 9); // Assuming 9 decimals

    const transferIx = createTransferInstruction(
      platformAta,
      userAta,
      platformPubkey,
      amountInBaseUnits,
      [],
      TOKEN_PROGRAM_ID
    );

    const transaction = new Transaction().add(transferIx);
    transaction.feePayer = platformPubkey;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    transaction.sign(platformKeypair);

    const signature = await connection.sendRawTransaction(transaction.serialize());
    await connection.confirmTransaction(signature);

    // Update position
    await query(
      `UPDATE staking_positions
       SET reward_claimed = reward_claimed + $1, last_reward_calc = NOW()
       WHERE id = $2`,
      [rewardAmount, position.id]
    );

    // Update pool rewards paid
    await query(
      `UPDATE staking_pools SET total_rewards_paid = total_rewards_paid + $1 WHERE id = $2`,
      [rewardAmount, poolId]
    );

    // Log transaction
    await query(
      `INSERT INTO staking_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'claim_reward', $3, $4)`,
      [userWallet, poolId, rewardAmount, signature]
    );

    return NextResponse.json({
      success: true,
      signature,
      amount: rewardAmount,
      message: `Claimed ${rewardAmount} rewards successfully!`,
    });
  } catch (error) {
    console.error('Claim rewards error:', error);
    return NextResponse.json({ error: 'Failed to claim rewards' }, { status: 500 });
  }
}
