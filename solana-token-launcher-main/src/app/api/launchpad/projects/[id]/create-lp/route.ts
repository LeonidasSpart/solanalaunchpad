// src/app/api/launchpad/projects/[id]/create-lp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { buildCreatePoolAndLockTransaction } from '@/lib/raydium';
import { getConnection } from '@/lib/solana';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    const body = await req.json();
    const { solAmount, tokenAmount } = body;

    if (!solAmount || !tokenAmount) {
      return NextResponse.json({ error: 'Missing SOL or token amount' }, { status: 400 });
    }

    // 1. Verify authentication
    const auth = req.headers.get('authorization');
    const token = auth?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get project
    const projectRes = await query('SELECT * FROM launchpad_projects WHERE id = $1', [projectId]);
    const project = projectRes.rows[0];
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    if (project.status !== 'distributed' && project.status !== 'ended') {
      return NextResponse.json({ error: 'Project not in a state to create LP' }, { status: 400 });
    }
    if (project.lp_created) {
      return NextResponse.json({ error: 'LP already created' }, { status: 400 });
    }

    // 3. Prepare
    const connection = getConnection();
    const creator = new PublicKey(project.creator_wallet);
    const tokenMint = new PublicKey(project.token_mint);
    const lockWallet = new PublicKey(process.env.PLATFORM_PUBLIC_KEY!); // platform wallet as lock wallet

    // 4. Build transaction (Raydium SDK + lock transfer)
    const { transaction, poolAddress, lpMint } = await buildCreatePoolAndLockTransaction(
      tokenMint,
      solAmount,
      tokenAmount,
      creator,
      lockWallet,
      connection
    );

    // 5. Serialize transaction for frontend signing
    const serialized = transaction.serialize({ requireAllSignatures: false }).toString('base64');

    // 6. Return transaction + pool/lp metadata
    return NextResponse.json({
      transaction: serialized,
      poolAddress: poolAddress.toBase58(),
      lpMint: lpMint.toBase58(),
    });
  } catch (error) {
    console.error('LP creation error:', error);
    return NextResponse.json({ error: 'Failed to create LP' }, { status: 500 });
  }
}
