// src/app/api/staking/stake/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { query } from '@/lib/db';
import { getDecimals, getConnection } from '@/lib/solana';

export async function POST(req: NextRequest) {
  try {
    const { poolId, userWallet, amount } = await req.json();

    if (!poolId || !userWallet || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const poolResult = await query('SELECT * FROM staking_pools WHERE id = $1 AND is_active = true', [poolId]);
    const pool = poolResult.rows[0];
    if (!pool) return NextResponse.json({ error: 'Pool not found or inactive' }, { status: 404 });

    if (amount < pool.min_stake || amount > pool.max_stake) {
      return NextResponse.json({ error: 'Amount outside limits' }, { status: 400 });
    }

    const mint = new PublicKey(pool.token_mint);
    const decimals = await getDecimals(mint);
    const rawAmount = Math.floor(amount * Math.pow(10, decimals));

    const userPubkey = new PublicKey(userWallet);
    const platformPubkey = new PublicKey(process.env.PLATFORM_PUBLIC_KEY!);

    const userATA = await getAssociatedTokenAddress(mint, userPubkey);
    const platformATA = await getAssociatedTokenAddress(mint, platformPubkey);

    const connection = getConnection();
    const { blockhash } = await connection.getLatestBlockhash();

    const transferIx = createTransferInstruction(
      userATA,
      platformATA,
      userPubkey,
      rawAmount,
      [],
      TOKEN_PROGRAM_ID
    );

    const tx = new Transaction({
      feePayer: userPubkey,
      recentBlockhash: blockhash,
    }).add(transferIx);

    const serialized = tx.serialize({ requireAllSignatures: false }).toString('base64');

    return NextResponse.json({ transaction: serialized });
  } catch (error) {
    console.error('Stake build error:', error);
    return NextResponse.json({ error: 'Failed to build stake transaction' }, { status: 500 });
  }
}
