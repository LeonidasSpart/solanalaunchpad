import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getLaunchpadKeypair } from '@/lib/launchpad';
import { isValidPublicKey } from '@/lib/validate';
import { ratelimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
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

    if (!investorWallet || amountSol === undefined || amountSol === null || !txSignature) {
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
    const now = new Date();
    if (now < new Date(project.start_time) || now > new Date(project.end_time)) {
      return NextResponse.json({ error: 'Sale is not currently active' }, { status: 400 });
    }

    const amount = parseFloat(amountSol);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const raised = parseFloat(project.raised_so_far || '0');
    const remaining = parseFloat(project.hard_cap) - raised;
    if (amount > remaining) {
      return NextResponse.json({ error: `Only ${remaining.toFixed(2)} SOL remaining` }, { status: 400 });
    }

    // ─── 2. Min/max contribution validation ─────────────────────────
    const minAllowed = parseFloat(project.min_contribution || '0');
    if (minAllowed > 0 && amount < minAllowed) {
      return NextResponse.json({ error: `Minimum contribution is ${minAllowed} SOL` }, { status: 400 });
    }
    const maxAllowed = parseFloat(project.max_contribution || '0');
    if (maxAllowed > 0 && amount > maxAllowed) {
      return NextResponse.json({ error: `Maximum contribution is ${maxAllowed} SOL` }, { status: 400 });
    }

    // ─── 3. Whitelist / KYC (optional – keep your existing checks) ──
    // ... (insert your existing whitelist/KYC logic here)

    // ─── 4. Verify transaction on-chain (with retry) ────────────────
    const rpcUrl = process.env.RPC_URL || process.env.RPC_URL_DEVNET;
    if (!rpcUrl) {
      throw new Error('RPC_URL not configured');
    }
    const connection = new Connection(rpcUrl);
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

    // ─── 5. Prevent replay attacks ──────────────────────────────────
    const existing = await query(
      'SELECT id FROM launchpad_contributions WHERE tx_signature = $1',
      [txSignature]
    );
    if (existing.rows.length > 0) {
      console.warn('⚠️ Replay attack attempt:', txSignature);
      return NextResponse.json({ error: 'Transaction already processed' }, { status: 409 });
    }

    // ─── 6. Verify transfer ─────────────────────────────────────────
    const launchpadPubkey = getLaunchpadKeypair().publicKey;
    let transferFound = false;
    let verifiedAmountLamports = 0;

    try {
      const message = tx.transaction.message;
      const accountKeys = message.staticAccountKeys;
      if (!accountKeys || accountKeys.length === 0) {
        throw new Error('No account keys found');
      }

      const launchpadIndex = accountKeys.findIndex(key => key.equals(launchpadPubkey));
      if (launchpadIndex === -1) {
        throw new Error('Launchpad wallet not found in transaction accounts');
      }

      if (tx.meta?.preBalances && tx.meta?.postBalances) {
        verifiedAmountLamports = tx.meta.postBalances[launchpadIndex] - tx.meta.preBalances[launchpadIndex];
        const expectedLamports = Math.round(amount * LAMPORTS_PER_SOL);
        // Allow small tolerance for rent/account changes (within 0.001 SOL)
        const tolerance = 0.001 * LAMPORTS_PER_SOL;
        if (verifiedAmountLamports >= expectedLamports - tolerance && verifiedAmountLamports > 0) {
          transferFound = true;
        }
      }
    } catch (e) {
      console.error('Error parsing transaction:', e);
      return NextResponse.json({ error: 'Transfer verification failed: ' + (e as Error).message }, { status: 400 });
    }

    if (!transferFound) {
      console.warn('⚠️ Transfer amount mismatch. Expected:', amount, 'SOL, received:', verifiedAmountLamports / LAMPORTS_PER_SOL, 'SOL');
      return NextResponse.json({ error: 'Transfer verification failed: amount mismatch' }, { status: 400 });
    }

    // Use the ACTUAL verified amount from the transaction, not user input
    const verifiedAmountSol = verifiedAmountLamports / LAMPORTS_PER_SOL;

    // ─── 7. Store contribution ──────────────────────────────────────
    const result = await query(
      `INSERT INTO launchpad_contributions (project_id, investor_wallet, amount_sol, tx_signature, status)
       VALUES ($1, $2, $3, $4, 'confirmed')
       RETURNING *`,
      [projectId, investorWallet, verifiedAmountSol, txSignature]
    );

    await query(
      `UPDATE launchpad_projects 
       SET raised_so_far = COALESCE(raised_so_far, 0) + $1 
       WHERE id = $2`,
      [verifiedAmountSol, projectId]
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
