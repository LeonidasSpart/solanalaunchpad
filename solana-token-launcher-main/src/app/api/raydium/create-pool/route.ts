// src/app/api/raydium/create-pool/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PublicKey, Transaction } from '@solana/web3.js';
import { getConnection } from '@/lib/solana';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tokenMint, solAmount, tokenAmount, creator } = body;

    const connection = getConnection();

    // 1. Get token decimals
    const mintInfo = await connection.getParsedAccountInfo(new PublicKey(tokenMint));
    let decimals = 9;
    if (mintInfo.value && mintInfo.value.data) {
      const data = mintInfo.value.data as any;
      if (data.parsed && data.parsed.info) {
        decimals = data.parsed.info.decimals || 9;
      }
    }

    const tokenAmountRaw = tokenAmount * Math.pow(10, decimals);
    const solAmountRaw = solAmount * 1e9;

    // 2. Call Jupiter's create-pool API (creates a Raydium pool)
    const jupiterRes = await fetch('https://quote-api.jup.ag/v6/create-pool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mintA: tokenMint,
        mintB: 'So11111111111111111111111111111111111111112', // WSOL
        amountA: tokenAmountRaw,
        amountB: solAmountRaw,
        user: creator,
      }),
    });

    if (!jupiterRes.ok) {
      const errorText = await jupiterRes.text();
      throw new Error(`Jupiter API error: ${jupiterRes.status} ${errorText}`);
    }

    const data = await jupiterRes.json();
    if (!data.transaction) {
      throw new Error('Jupiter did not return a transaction');
    }

    // 3. Deserialize and serialize back (to keep consistent format)
    const tx = Transaction.from(Buffer.from(data.transaction, 'base64'));
    const serialized = tx.serialize({ requireAllSignatures: false }).toString('base64');

    // 4. Return transaction + pool/lp metadata
    return NextResponse.json({
      transaction: serialized,
      poolAddress: data.poolAddress,
      lpMint: data.lpMint,
    });
  } catch (error) {
    console.error('Pool creation error:', error);
    return NextResponse.json({ error: 'Failed to create pool' }, { status: 500 });
  }
}
