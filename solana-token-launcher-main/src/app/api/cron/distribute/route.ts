import { NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getLaunchpadKeypair, getFeeWalletPubkey } from '@/lib/launchpad';

function getRpcUrl(network: string): string {
  if (network === 'mainnet') {
    return process.env.RPC_URL_MAINNET || process.env.RPC_URL || '';
  }
  return process.env.RPC_URL_DEVNET || '';
}

export async function GET(req: Request) {
  const secret = req.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Distribute for both networks
    const networks = ['devnet', 'mainnet'];
    const results = [];

    for (const networkName of networks) {
      const rpcUrl = getRpcUrl(networkName);
      if (!rpcUrl) {
        console.log(`Skipping ${networkName} - no RPC configured`);
        continue;
      }

      const connection = new Connection(rpcUrl);

      const projects = await query(
        "SELECT * FROM launchpad_projects WHERE status = 'ended' AND end_time < NOW()"
      );

      for (const project of projects.rows) {
        const contributions = await query(
          'SELECT * FROM launchpad_contributions WHERE project_id = $1 AND status = $2 AND network = $3',
          [project.id, 'confirmed', networkName]
        );

        if (contributions.rows.length === 0) continue;

        const launchpadKeypair = getLaunchpadKeypair();
        const feeWallet = getFeeWalletPubkey();
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
          [project.id, networkName]
        );

        await query(
          "UPDATE launchpad_projects SET status = 'distributed' WHERE id = $1",
          [project.id]
        );

        results.push({ projectId: project.id, network: networkName, signature });
      }
    }

    return NextResponse.json({ success: true, distributed: results });
  } catch (error: any) {
    console.error('❌ Cron distribution error:', error.message, error.stack);
    return NextResponse.json({ error: 'Distribution failed: ' + error.message }, { status: 500 });
  }
}
