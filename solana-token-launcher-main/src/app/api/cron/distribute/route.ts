import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getLaunchpadKeypair, getFeeWalletPubkey } from '@/lib/launchpad';

export async function GET(req: NextRequest) {
  try {
    // Optional: protect with a secret key
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find all projects that are active but ended
    const endedProjects = await query(
      `SELECT * FROM launchpad_projects 
       WHERE status = 'active' AND end_time < NOW()`
    );

    const results = [];
    for (const project of endedProjects.rows) {
      try {
        // Use the existing distribute logic (but we'll call it internally)
        const projectId = project.id;
        const raised = parseFloat(project.raised_so_far || '0');
        const softCap = parseFloat(project.soft_cap || '0');
        if (softCap > 0 && raised < softCap) {
          // Soft cap not met – mark as failed, don't distribute
          await query(
            `UPDATE launchpad_projects SET status = 'failed' WHERE id = $1`,
            [projectId]
          );
          results.push({ projectId, status: 'failed (soft cap not met)' });
          continue;
        }

        // Distribute
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
          `UPDATE launchpad_projects SET status = 'distributed' WHERE id = $1`,
          [projectId]
        );

        // Create vesting schedules (as before)
        const vestingRes = await query(
          `SELECT * FROM launchpad_vesting WHERE project_id = $1 AND status = 'pending'`,
          [projectId]
        );
        for (const v of vestingRes.rows) {
          // Call your existing vesting API
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vesting/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token_mint: project.token_mint,
              beneficiary: v.beneficiary_wallet,
              total_amount: parseFloat(v.total_amount),
              cliff_duration: v.cliff_duration,
              vesting_duration: v.vesting_duration,
              release_frequency: v.release_frequency,
              start_time: v.start_time || new Date().toISOString(),
            }),
          });
          await query(
            `UPDATE launchpad_vesting SET status = 'active' WHERE id = $1`,
            [v.id]
          );
        }

        results.push({ projectId, status: 'distributed', signature });
      } catch (err: any) {
        console.error(`Error distributing project ${project.id}:`, err);
        results.push({ projectId: project.id, status: 'error', error: err.message });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}
