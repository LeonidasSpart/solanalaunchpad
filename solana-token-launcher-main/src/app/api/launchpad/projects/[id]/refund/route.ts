import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getLaunchpadKeypair } from '@/lib/launchpad';

function getRpcUrl(network: string): string {
  if (network === 'mainnet') {
    return process.env.RPC_URL_MAINNET || process.env.RPC_URL || '';
  }
  return process.env.RPC_URL_DEVNET || '';
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { investorWallet, network } = await req.json(); // ← get network from request

    const networkName = network || 'devnet';
    const rpcUrl = getRpcUrl(networkName);

    if (!rpcUrl) {
      throw new Error(`RPC_URL not configured for ${networkName}`);
    }

    const connection = new Connection(rpcUrl);

    const projectRes = await query('SELECT * FROM launchpad_projects WHERE id = $1', [projectId]);
    const project = projectRes.rows[0];
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    if (project.status !== 'failed') {
      return NextResponse.json({ error: 'Project is not failed – refunds not available' }, { status: 400 });
    }

    const contribRes = await query(
      `SELECT * FROM launchpad_contributions 
       WHERE project_id = $1 AND investor_wallet = $2 AND status = 'confirmed' AND network = $3`,
      [projectId, investorWallet, networkName]
    );
    if (contribRes.rows.length === 0) {
      return NextResponse.json({ error: 'No contribution found for this wallet on ' + networkName }, { status: 404 });
    }
    const contribution = contribRes.rows[0];
    const amountSol = parseFloat(contribution.amount_sol);

    const launchpadKeypair = getLaunchpadKeypair();
    const investorPubkey = new PublicKey(investorWallet);

    const { blockhash } = await connection.getLatestBlockhash();

    const tx = new Transaction({ feePayer: launchpadKeypair.publicKey, recentBlockhash: blockhash });
    tx.add(SystemProgram.transfer({
      fromPubkey: launchpadKeypair.publicKey,
      toPubkey: investorPubkey,
      lamports: amountSol * LAMPORTS_PER_SOL,
    }));
    tx.sign(launchpadKeypair);

    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(signature);

    await query(
      `UPDATE launchpad_contributions SET status = 'refunded' WHERE id = $1`,
      [contribution.id]
    );

    return NextResponse.json({ success: true, signature, network: networkName });
  } catch (error: any) {
    console.error('❌ Refund error:', error.message, error.stack);
    return NextResponse.json({ error: 'Refund failed: ' + error.message }, { status: 500 });
  }
}
