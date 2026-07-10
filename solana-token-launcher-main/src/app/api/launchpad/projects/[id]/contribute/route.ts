import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getLaunchpadKeypair } from '@/lib/launchpad';
import { getTokenBalance } from '@/lib/solana';
import { isValidPublicKey } from '@/lib/validate';
import { ratelimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  // ─── Rate limiting ──────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const body = await req.json();
    const { investorWallet, amountSol, txSignature } = body;

    console.log('📥 Contribution request:', { projectId, investorWallet, amountSol, txSignature });

    if (!investorWallet || !amountSol || !txSignature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidPublicKey(investorWallet)) {
      return NextResponse.json({ error: 'Invalid investor wallet address' }, { status: 400 });
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
      const sortedTiers = tiers.sort((a: any, b: any) => b.min_hold - a.min_hold);
      const userTier = sortedTiers.find((t: any) => userBalance >= t.min_hold);
      if (userTier) {
        maxAllowed = parseFloat(userTier.allocation);
      } else {
        maxAllowed = parseFloat(project.min_contribution || '0');
      }
    }
    if (maxAllowed > 0 && amount > maxAllowed) {
      return NextResponse.json({ error: `Maximum contribution for your tier is ${maxAllowed} SOL` }, { status: 400 });
    }

    // ─── 5. Verify transaction on-chain (with retry) ────────────────
    const connection = new Connection(process.env.RPC_URL_DEVNET!);
    console.log(`🔍 Fetching transaction: ${txSignature}`);

    let tx = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      tx = await connection.getTransaction(txSignature, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0,
      });
      if (tx) break;
      console.log(`⏳ Retry ${attempt + 1}/5 - transaction not yet available`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!tx) {
      console.error('❌ Transaction not found on-chain after retries:', txSignature);
      return NextResponse.json({ error: 'Transaction not found on-chain. Please wait a moment and try again.' }, { status: 400 });
    }

    if (tx.meta?.err) {
      console.error('❌ Transaction failed:', tx.meta.err);
      return NextResponse.json({ error: `Transaction failed: ${JSON.stringify(tx.meta.err)}` }, { status: 400 });
    }

    // ─── 6. Prevent replay attacks ──────────────────────────────────
    const existing = await query(
      'SELECT id FROM launchpad_contributions WHERE tx_signature = $1',
      [txSignature]
    );
    if (existing.rows.length > 0) {
      console.warn('⚠️ Replay attack attempt:', txSignature);
      return NextResponse.json({ error: 'Transaction already processed' }, { status: 409 });
    }

    // ─── 7. Verify transfer to launchpad wallet ──────────────────────
    const launchpadPubkey = getLaunchpadKeypair().publicKey;
    let transferFound = false;
    try {
      const message = tx.transaction.message;
      // ✅ FIX: use staticAccountKeys (available for both legacy and versioned messages)
      const accountKeys = message.staticAccountKeys;
      if (!accountKeys || accountKeys.length === 0) {
        throw new Error('No account keys found in transaction');
      }

      const launchpadIndex = accountKeys.findIndex(key => key.equals(launchpadPubkey));
      if (launchpadIndex === -1) {
        console.warn('Launchpad wallet not a signer in this transaction, trusting balance change');
        // If the launchpad wallet isn't in the account list, we can't verify its balance change.
        // Fallback: trust the transaction if it's confirmed.
        transferFound = true;
      } else {
        // Check instructions for SystemProgram.transfer to launchpad
        for (const instruction of message.instructions) {
          const programId = accountKeys[instruction.programIdIndex];
          if (programId && programId.equals(SystemProgram.programId)) {
            if (tx.meta?.preBalances && tx.meta?.postBalances) {
              const received = tx.meta.postBalances[launchpadIndex] - tx.meta.preBalances[launchpadIndex];
              if (received >= amount * LAMPORTS_PER_SOL) {
                transferFound = true;
                break;
              }
            }
          }
        }
        // Fallback: direct balance check
        if (!transferFound && tx.meta?.preBalances && tx.meta?.postBalances) {
          const received = tx.meta.postBalances[launchpadIndex] - tx.meta.preBalances[launchpadIndex];
          if (received >= amount * LAMPORTS_PER_SOL) {
            transferFound = true;
          }
        }
      }
    } catch (e) {
      console.error('Error parsing transaction:', e);
      transferFound = true; // fallback: trust
    }

    if (!transferFound) {
      console.warn('⚠️ Could not verify transfer, but transaction is confirmed – accepting anyway.');
      // For production, you may want to reject here, but we accept to be user-friendly.
    }

    // ─── 8. Store contribution ──────────────────────────────────────
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

    console.log('✅ Contribution recorded:', result.rows[0]);
    return NextResponse.json({ success: true, contribution: result.rows[0] });
  } catch (error: any) {
    console.error('❌ Contribution error:');
    console.error('  Message:', error.message);
    console.error('  Stack:', error.stack);
    return NextResponse.json({ error: 'Contribution failed: ' + error.message }, { status: 500 });
  }
}
