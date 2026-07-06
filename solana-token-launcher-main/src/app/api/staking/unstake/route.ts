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

    // Check lock period
    if (position.unlocked_at && new Date(position.unlocked_at) > new Date()) {
      return NextResponse.json({ error: 'Tokens are still locked' }, { status: 400 });
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

    // Transfer tokens from platform wallet back to user
    const mintPubkey = new PublicKey(pool.token_mint);
    const userPubkey = new PublicKey(userWallet);
    const platformPubkey = platformKeypair.publicKey;

    const platformAta = await getAssociatedTokenAddress(mintPubkey, platformPubkey);
    const userAta = await getAssociatedTokenAddress(mintPubkey, userPubkey);

    const amount = Number(position.amount);
    const amountInBaseUnits = amount * Math.pow(10, 9); // Assuming 9 decimals

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
       SET status = 'unstaked', unlocked_at = NOW()
       WHERE id = $1`,
      [position.id]
    );

    // Update pool total staked
    await query(
      `UPDATE staking_pools SET total_staked = total_staked - $1 WHERE id = $2`,
      [amount, poolId]
    );

    // Log transaction
    await query(
      `INSERT INTO staking_transactions (user_wallet, pool_id, type, amount, tx_signature)
       VALUES ($1, $2, 'unstake', $3, $4)`,
      [userWallet, poolId, amount, signature]
    );

    return NextResponse.json({
      success: true,
      signature,
      message: `Unstaked ${amount} tokens successfully!`,
    });
  } catch (error) {
    console.error('Unstake error:', error);
    return NextResponse.json({ error: 'Failed to unstake' }, { status: 500 });
  }
}
