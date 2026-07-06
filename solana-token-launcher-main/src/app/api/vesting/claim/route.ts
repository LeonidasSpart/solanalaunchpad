import { NextRequest, NextResponse } from 'next/server';
import { Connection, Keypair } from '@solana/web3.js';
import { query } from '@/lib/db';
import { getClaimableAmount, claimTokens } from '@/lib/vesting';

export async function POST(request: NextRequest) {
  try {
    const { contractId, beneficiary } = await request.json();

    if (!contractId || !beneficiary) {
      return NextResponse.json({ error: 'Missing contract ID or beneficiary' }, { status: 400 });
    }

    // Get contract
    const res = await query('SELECT * FROM vesting_contracts WHERE id = $1', [contractId]);
    if (res.rows.length === 0) return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    const contract = res.rows[0];

    // Check beneficiary
    if (contract.beneficiary_wallet !== beneficiary) {
      return NextResponse.json({ error: 'Not the beneficiary' }, { status: 403 });
    }

    // Load platform wallet
    const privateKeyBase64 = process.env.PLATFORM_PRIVATE_KEY;
    if (!privateKeyBase64) {
      return NextResponse.json({ error: 'Platform wallet not configured' }, { status: 500 });
    }
    const secretKey = Uint8Array.from(Buffer.from(privateKeyBase64, 'base64'));
    const platformKeypair = Keypair.fromSecretKey(secretKey);

    const connection = new Connection(
      process.env.RPC_URL_MAINNET || 'https://api.mainnet-beta.solana.com',
      'confirmed'
    );

    const signature = await claimTokens(contractId, beneficiary, connection, platformKeypair);

    return NextResponse.json({ success: true, signature });
  } catch (error: any) {
    console.error('Claim error:', error);
    return NextResponse.json({ error: error.message || 'Claim failed' }, { status: 500 });
  }
}
