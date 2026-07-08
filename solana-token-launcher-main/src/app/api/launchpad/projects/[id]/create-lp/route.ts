// src/app/api/launchpad/projects/[id]/create-lp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
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

    // 3. Call the internal Raydium API (which uses Jupiter)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';
    const raydiumRes = await fetch(`${baseUrl}/api/raydium/create-pool`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tokenMint: project.token_mint,
        solAmount,
        tokenAmount,
        creator: project.creator_wallet,
      }),
    });

    if (!raydiumRes.ok) {
      const err = await raydiumRes.json();
      throw new Error(err.error || 'Raydium API failed');
    }

    const data = await raydiumRes.json();

    // 4. Return the transaction to the frontend
    return NextResponse.json({
      transaction: data.transaction,
      poolAddress: data.poolAddress,
      lpMint: data.lpMint,
    });
  } catch (error) {
    console.error('LP creation error:', error);
    return NextResponse.json({ error: 'Failed to create LP' }, { status: 500 });
  }
}
