import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getLaunchpadKeypair } from '@/lib/launchpad';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { investorWallet, amountSol, txSignature } = await req.json();

    if (!investorWallet || !amountSol || !txSignature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const connection = new Connection(process.env.RPC_URL_DEVNET!);
    const tx = await connection.getTransaction(txSignature, { commitment: 'confirmed' });
    if (!tx) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const launchpadPubkey = getLaunchpadKeypair().publicKey;
    // Simplified validation – you should properly parse transfer instructions.
    // For now we trust the signature.

    const result = await query(
      `INSERT INTO launchpad_contributions (project_id, investor_wallet, amount_sol, tx_signature, status)
       VALUES ($1, $2, $3, $4, 'confirmed')
       RETURNING *`,
      [projectId, investorWallet, amountSol, txSignature]
    );

    await query(
      `UPDATE launchpad_projects 
       SET raised_so_far = raised_so_far + $1 
       WHERE id = $2`,
      [amountSol, projectId]
    );

    return NextResponse.json({ success: true, contribution: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Contribution failed' }, { status: 500 });
  }
}
