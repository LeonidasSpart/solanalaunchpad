// src/app/api/lp/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getConnection } from '@/lib/solana';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // ← FIX: await the promise

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

    // Verify transaction
    const connection = getConnection();
    const tx = await connection.getTransaction(txSignature, { commitment: 'confirmed' });
    if (!tx) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Optional: verify JWT (but we'll rely on the frontend sending creatorWallet)
    // We'll trust the frontend for now.

    if (!creatorWallet) {
      return NextResponse.json({ error: 'Missing creator wallet' }, { status: 400 });
    }

    const lockStart = new Date();
    const lockEnd = lockDuration
      ? new Date(lockStart.getTime() + lockDuration * 1000)
      : null;

    await query(
      `INSERT INTO lp_pools 
       (creator_wallet, token_mint, pool_address, lp_mint, sol_amount, token_amount, lock_start, lock_end, locked)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Confirm LP error:', error);
    return NextResponse.json({ error: 'Failed to confirm LP' }, { status: 500 });
  }
}
