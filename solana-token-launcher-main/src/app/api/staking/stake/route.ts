import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { query } from '@/lib/db';
import { getStakingPool, getStakingPosition } from '@/lib/staking';
import { getDecimals, getPlatformKeypair } from '@/lib/solana';

export async function POST(request: NextRequest) {
  try {
    const { poolId, userWallet, amount } = await request.json();

    if (!poolId || !userWallet || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get pool
    const pool = await getStakingPool(poolId.toString());
    if (!pool) return NextResponse.json({ error: 'Pool not found' }, { status: 404 });

    // 2. Validate min/max
    if (amount < pool.min_stake || amount > pool.max_stake) {
      return NextResponse.json({ error: 'Amount outside pool limits' }, { status: 400 });
    }

    // 3. Build transfer transaction from user → platform
    const mint = new PublicKey(pool.token_mint);
    const decimals = await getDecimals(mint);
    const rawAmount = amount * Math.pow(10, decimals);

    const userATA = await getAssociatedTokenAddress(mint, new PublicKey(userWallet));
    const platformATA = await getAssociatedTokenAddress(mint, new PublicKey(process.env.PLATFORM_PUBLIC_KEY!));

    const connection = new Connection(process.env.RPC_URL_DEVNET!);
    const { blockhash } = await connection.getLatestBlockhash();

    const transferIx = createTransferInstruction(
      userATA,
      platformATA,
      new PublicKey(userWallet),
      rawAmount,
      [],
      TOKEN_PROGRAM_ID
    );

    const tx = new Transaction({ feePayer: new PublicKey(userWallet), recentBlockhash: blockhash }).add(transferIx);

    // 4. Return serialized transaction for frontend to sign
    const serialized = tx.serialize({ requireAllSignatures: false }).toString('base64');

    // 5. (Optional) Store temporary data in session or just return tx + poolId + amount
    // We'll let the frontend call `/confirm` after signing.

    return NextResponse.json({
      transaction: serialized,
      poolId,
      amount,
    });
  } catch (error) {
    console.error('Stake build error:', error);
    return NextResponse.json({ error: 'Failed to build stake transaction' }, { status: 500 });
  }
}
