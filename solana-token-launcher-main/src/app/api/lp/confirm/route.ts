// src/app/api/lp/confirm/route.ts
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
    const body = await req.json();
    const {
      txSignature,
      poolAddress,
      lpMint,
      tokenMint,
      solAmount,
      tokenAmount,
      lockDuration,
      creatorWallet,
    } = body;

    // ─── Validation ──────────────────────────────────────────────
    if (!txSignature || !poolAddress || !lpMint || !tokenMint || !creatorWallet) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidPublicKey(creatorWallet) || !isValidPublicKey(tokenMint)) {
      return NextResponse.json({ error: 'Invalid wallet or token mint address' }, { status: 400 });
    }

    const connection = getConnection();

    // ─── 1. Verify transaction exists and succeeded ──────────────
    const tx = await connection.getTransaction(txSignature, { commitment: 'confirmed' });
    if (!tx || tx.meta?.err) {
      return NextResponse.json({ error: 'Transaction not found or failed' }, { status: 400 });
    }

    // ─── 2. Prevent replay attacks ────────────────────────────────
    const existing = await query(
      'SELECT id FROM lp_pools WHERE pool_address = $1 OR tx_signature = $2',
      [poolAddress, txSignature]
    );
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Pool already created or transaction already used' }, { status: 409 });
    }

    // ─── 3. Calculate lock period ──────────────────────────────────
    const lockStart = new Date();
    const lockEnd = lockDuration
      ? new Date(lockStart.getTime() + lockDuration * 1000)
      : null;

    // ─── 4. Insert into lp_pools ────────────────────────────────────
    await query(
      `INSERT INTO lp_pools 
       (creator_wallet, token_mint, pool_address, lp_mint, sol_amount, token_amount, lock_start, lock_end, locked, tx_signature)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        creatorWallet,
        tokenMint,
        poolAddress,
        lpMint,
        parseFloat(solAmount),
        parseFloat(tokenAmount),
        lockStart,
        lockEnd,
        lockEnd !== null, // locked true if lock_end is set
        txSignature,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Confirm LP error:', error);
    return NextResponse.json({ error: 'Failed to confirm LP' }, { status: 500 });
  }
}
