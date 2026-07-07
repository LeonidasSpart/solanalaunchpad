import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getLaunchpadKeypair, getFeeWalletPubkey } from '@/lib/launchpad';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);

    // 1. Get project
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

    // 2. Distribute SOL
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

    // 3. Update project status
    await query(
      `UPDATE launchpad_projects SET status = 'distributed', updated_at = NOW() WHERE id = $1`,
      [projectId]
    );

    // ──────────────────────────────────────────────────────────────
    // 4. Create vesting schedules (reuse existing vesting API)
    // ──────────────────────────────────────────────────────────────
    const vestingRes = await query(
      `SELECT * FROM launchpad_vesting WHERE project_id = $1 AND status = 'pending'`,
      [projectId]
    );

    const vestingResults = [];
    for (const v of vestingRes.rows) {
      try {
        const vestingPayload = {
          token_mint: project.token_mint,
          beneficiary: v.beneficiary_wallet,
          total_amount: parseFloat(v.total_amount),
          cliff_duration: v.cliff_duration,
          vesting_duration: v.vesting_duration,
          release_frequency: v.release_frequency,
          start_time: v.start_time || new Date().toISOString(),
        };

        // Call your existing vesting API (/api/vesting/create)
        const vestingApiUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'}/api/vesting/create`;
        const vestingApiRes = await fetch(vestingApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vestingPayload),
        });

        if (!vestingApiRes.ok) {
          const errData = await vestingApiRes.text();
          console.error(`Vesting API error for ${v.beneficiary_wallet}:`, errData);
          await query(
            `UPDATE launchpad_vesting SET status = 'failed' WHERE id = $1`,
            [v.id]
          );
          vestingResults.push({ beneficiary: v.beneficiary_wallet, status: 'failed' });
        } else {
          const vestingData = await vestingApiRes.json();
          await query(
            `UPDATE launchpad_vesting SET status = 'active', contract_address = $1 WHERE id = $2`,
            [vestingData.contract_address || vestingData.id || null, v.id]
          );
          vestingResults.push({ beneficiary: v.beneficiary_wallet, status: 'active' });
        }
      } catch (err) {
        console.error(`Error creating vesting for ${v.beneficiary_wallet}:`, err);
        await query(
          `UPDATE launchpad_vesting SET status = 'failed' WHERE id = $1`,
          [v.id]
        );
        vestingResults.push({ beneficiary: v.beneficiary_wallet, status: 'failed' });
      }
    }

    return NextResponse.json({
      success: true,
      signature,
      creatorShare,
      platformFee,
      vesting: vestingResults,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Distribution failed' }, { status: 500 });
  }
}
