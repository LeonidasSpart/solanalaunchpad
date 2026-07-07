import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getLaunchpadKeypair, getFeeWalletPubkey } from '@/lib/launchpad';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);

    const projectRes = await query('SELECT * FROM launchpad_projects WHERE id = $1', [projectId]);
    const project = projectRes.rows[0];
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project.status !== 'active' || new Date() < new Date(project.end_time)) {
      return NextResponse.json({ error: 'Sale not ended yet' }, { status: 400 });
    }

    const raised = parseFloat(project.raised_so_far || '0');
    const softCap = parseFloat(project.soft_cap || '0');
    if (softCap > 0 && raised < softCap) {
      return NextResponse.json({ error: 'Soft cap not reached – refunds required' }, { status: 400 });
    }

    const feePercent = parseFloat(project.fee_percentage) / 100;
    const platformFee = raised * feePercent;
    const creatorShare = raised - platformFee;

    const launchpadKeypair = getLaunchpadKeypair();
    const feeWallet = getFeeWalletPubkey();
    const creatorPubkey = new PublicKey(project.creator_wallet);

    const connection = new Connection(process.env.RPC_URL_DEVNET!);
    const { blockhash } = await connection.getLatestBlockhash();

    const tx = new Transaction({ feePayer: launchpadKeypair.publicKey, recentBlockhash: blockhash });

    if (creatorShare > 0) {
      tx.add(SystemProgram.transfer({
        fromPubkey: launchpadKeypair.publicKey,
        toPubkey: creatorPubkey,
        lamports: creatorShare * LAMPORTS_PER_SOL,
      }));
    }

    if (platformFee > 0) {
      tx.add(SystemProgram.transfer({
        fromPubkey: launchpadKeypair.publicKey,
        toPubkey: feeWallet,
        lamports: platformFee * LAMPORTS_PER_SOL,
      }));
    }

    tx.sign(launchpadKeypair);
    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(signature);

    await query(
      `UPDATE launchpad_projects SET status = 'distributed', updated_at = NOW() WHERE id = $1`,
      [projectId]
    );

    return NextResponse.json({
      success: true,
      signature,
      creatorShare,
      platformFee,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Distribution failed' }, { status: 500 });
  }
}
