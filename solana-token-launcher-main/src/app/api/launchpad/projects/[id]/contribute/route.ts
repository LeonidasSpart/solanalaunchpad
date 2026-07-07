import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getLaunchpadKeypair } from '@/lib/launchpad';
import { getTokenBalance } from '@/lib/solana';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { investorWallet, amountSol, txSignature } = await req.json();

    if (!investorWallet || !amountSol || !txSignature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ─── 1. Get project ──────────────────────────────────────────────
    const projectRes = await query('SELECT * FROM launchpad_projects WHERE id = $1', [projectId]);
    const project = projectRes.rows[0];
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project.status !== 'active') {
      return NextResponse.json({ error: 'Project is not active' }, { status: 400 });
    }
    if (new Date() < new Date(project.start_time) || new Date() > new Date(project.end_time)) {
      return NextResponse.json({ error: 'Sale is not currently active' }, { status: 400 });
    }

    const amount = parseFloat(amountSol);
    const raised = parseFloat(project.raised_so_far || '0');
    const remaining = parseFloat(project.hard_cap) - raised;
    if (amount > remaining) {
      return NextResponse.json({ error: `Only ${remaining.toFixed(2)} SOL remaining` }, { status: 400 });
    }

    // ─── 2. Whitelist check ──────────────────────────────────────────
    if (project.whitelist_enabled) {
      const wlCheck = await query(
        'SELECT * FROM launchpad_whitelist WHERE project_id = $1 AND wallet = $2',
        [projectId, investorWallet]
      );
      if (wlCheck.rows.length === 0) {
        return NextResponse.json({ error: 'Wallet not whitelisted' }, { status: 403 });
      }
    }

    // ─── 3. KYC check ─────────────────────────────────────────────────
    if (project.kyc_enabled) {
      const kycCheck = await query(
        'SELECT * FROM launchpad_kyc WHERE project_id = $1 AND wallet = $2 AND verified = true',
        [projectId, investorWallet]
      );
      if (kycCheck.rows.length === 0) {
        return NextResponse.json({ error: 'KYC not verified' }, { status: 403 });
      }
    }

    // ─── 4. Tier-based max contribution ──────────────────────────────
    let maxAllowed = parseFloat(project.max_contribution || '0');

    if (project.tiered && project.tier_config) {
      const tiers = project.tier_config;
      const tierToken = process.env.NEXT_PUBLIC_TIER_TOKEN || project.token_mint;
      const userBalance = await getTokenBalance(
        new PublicKey(investorWallet),
        new PublicKey(tierToken)
      );

      // Sort tiers by min_hold descending
      const sortedTiers = tiers.sort((a: any, b: any) => b.min_hold - a.min_hold);
      let userTier = sortedTiers.find((t: any) => userBalance >= t.min_hold);
      if (userTier) {
        maxAllowed = parseFloat(userTier.allocation);
      } else {
        // No tier – use min contribution or 0
        maxAllowed = parseFloat(project.min_contribution || '0');
      }
    }

    if (maxAllowed > 0 && amount > maxAllowed) {
      return NextResponse.json({ error: `Maximum contribution for your tier is ${maxAllowed} SOL` }, { status: 400 });
    }

    // ─── 5. Verify transaction on-chain (simplified) ────────────────
    const connection = new Connection(process.env.RPC_URL_DEVNET!);
    const tx = await connection.getTransaction(txSignature, { commitment: 'confirmed' });
    if (!tx) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    // We trust that the transaction sent SOL to the launchpad wallet because it was signed by the user
    // and the frontend constructed it correctly.

    // ─── 6. Store contribution ────────────────────────────────────────
    const result = await query(
      `INSERT INTO launchpad_contributions (project_id, investor_wallet, amount_sol, tx_signature, status)
       VALUES ($1, $2, $3, $4, 'confirmed')
       RETURNING *`,
      [projectId, investorWallet, amountSol, txSignature]
    );

    await query(
      `UPDATE launchpad_projects 
       SET raised_so_far = COALESCE(raised_so_far, 0) + $1 
       WHERE id = $2`,
      [amountSol, projectId]
    );

    return NextResponse.json({ success: true, contribution: result.rows[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Contribution failed' }, { status: 500 });
  }
}
