// src/app/api/raydium/create-pool/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PublicKey, Transaction } from '@solana/web3.js';
import { getConnection } from '@/lib/solana';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tokenMint, solAmount, tokenAmount, creator } = body;

    // ─── Validate inputs ──────────────────────────────────────────
    if (!tokenMint || !solAmount || !tokenAmount || !creator) {
      return NextResponse.json(
        { error: 'Missing required fields: tokenMint, solAmount, tokenAmount, creator' },
        { status: 400 }
      );
    }

    const connection = getConnection();

    // ─── Get token decimals ────────────────────────────────────────
    let decimals = 9;
    try {
      const mintInfo = await connection.getParsedAccountInfo(new PublicKey(tokenMint));
      if (!mintInfo.value) {
        return NextResponse.json(
          { error: `Token mint ${tokenMint} not found on-chain` },
          { status: 400 }
        );
      }
      if (mintInfo.value && mintInfo.value.data) {
        const data = mintInfo.value.data as any;
        if (data.parsed && data.parsed.info) {
          decimals = data.parsed.info.decimals || 9;
        }
      }
    } catch (err) {
      return NextResponse.json(
        { error: `Failed to fetch token info: ${err instanceof Error ? err.message : String(err)}` },
        { status: 400 }
      );
    }

    const tokenAmountRaw = tokenAmount * Math.pow(10, decimals);
    const solAmountRaw = solAmount * 1e9;

    // ─── Call Jupiter API ──────────────────────────────────────────
    const jupiterPayload = {
      mintA: tokenMint,
      mintB: 'So11111111111111111111111111111111111111112',
      amountA: tokenAmountRaw,
      amountB: solAmountRaw,
      user: creator,
    };

    console.log('Jupiter payload:', JSON.stringify(jupiterPayload, null, 2));

    const jupiterRes = await fetch('https://quote-api.jup.ag/v6/create-pool', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jupiterPayload),
    });

    const responseText = await jupiterRes.text();
    console.log('Jupiter response status:', jupiterRes.status);
    console.log('Jupiter response body:', responseText);

    if (!jupiterRes.ok) {
      let errorMessage = `Jupiter API error: ${jupiterRes.status}`;
      try {
        const errorJson = JSON.parse(responseText);
        errorMessage += ` - ${errorJson.error || errorJson.message || responseText}`;
      } catch {
        errorMessage += ` - ${responseText}`;
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON response from Jupiter' }, { status: 500 });
    }

    if (!data.transaction) {
      return NextResponse.json(
        { error: 'Jupiter did not return a transaction. Response: ' + JSON.stringify(data) },
        { status: 500 }
      );
    }

    // ─── Deserialize and return ────────────────────────────────────
    const tx = Transaction.from(Buffer.from(data.transaction, 'base64'));
    const serialized = tx.serialize({ requireAllSignatures: false }).toString('base64');

    return NextResponse.json({
      transaction: serialized,
      poolAddress: data.poolAddress,
      lpMint: data.lpMint,
    });
  } catch (error) {
    console.error('Pool creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
