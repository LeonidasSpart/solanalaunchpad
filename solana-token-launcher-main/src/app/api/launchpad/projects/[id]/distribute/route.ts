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
    const { network } = await req.json(); // ← get network from request

    const networkName = network || 'devnet';
    const rpcUrl = getRpcUrl(networkName);

    if (!rpcUrl) {
      throw new Error(`RPC_URL not configured for ${networkName}`);
    }

    const connection = new Connection(rpcUrl);

    const projectRes = await query('SELECT * FROM launchpad_projects WHERE id = $1', [projectId]);
    const project = projectRes.rows[0];
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    if (project.status !== 'ended') {
      return NextResponse.json({ error: 'Project is not ended' }, { status: 400 });
    }

    const contributions = await query(
      'SELECT * FROM launchpad_contributions WHERE project_id = $1 AND status = $2 AND network = $3',
      [projectId, 'confirmed', networkName]
    );

    const launchpadKeypair = getLaunchpadKeypair();
    const { blockhash } = await connection.getLatestBlockhash();

    const tx = new Transaction({ feePayer: launchpadKeypair.publicKey, recentBlockhash: blockhash });

    for (const contrib of contributions.rows) {
      const investorPubkey = new PublicKey(contrib.investor_wallet);
      const amount = parseFloat(contrib.amount_sol);
      tx.add(SystemProgram.transfer({
        fromPubkey: launchpadKeypair.publicKey,
        toPubkey: investorPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      }));
    }

    tx.sign(launchpadKeypair);
    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(signature);

    await query(
      "UPDATE launchpad_contributions SET status = 'distributed' WHERE project_id = $1 AND network = $2",
      [projectId, networkName]
    );

    await query(
      "UPDATE launchpad_projects SET status = 'distributed' WHERE id = $1",
      [projectId]
    );

    return NextResponse.json({ success: true, signature, network: networkName });
  } catch (error: any) {
    console.error('❌ Distribution error:', error.message, error.stack);
    return NextResponse.json({ error: 'Distribution failed: ' + error.message }, { status: 500 });
  }
}
