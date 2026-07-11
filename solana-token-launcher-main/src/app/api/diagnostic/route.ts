import { NextResponse } from 'next/server';

export async function GET() {
  const results: Record<string, any> = {};
  const errors: string[] = [];

  try {
    // Check env vars first (no crypto)
    const hexKey = process.env.PLATFORM_PRIVATE_KEY;
    results.platform_private_key_present = !!hexKey;
    results.platform_private_key_length = hexKey?.length || 0;

    const platformPubkey = process.env.PLATFORM_PUBLIC_KEY;
    results.platform_public_key = platformPubkey || 'MISSING';

    results.fee_recipient = process.env.NEXT_PUBLIC_FEE_REC || 'MISSING';
    results.rpc_url = process.env.RPC_URL || 'MISSING';
    results.solana_network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'MISSING';

    // Only try keypair if hex key looks valid
    if (hexKey && hexKey.length === 128 && /^[0-9a-fA-F]+$/.test(hexKey)) {
      try {
        // Dynamic import to isolate any crash
        const web3 = await import('@solana/web3.js');
        
        // Use built-in Buffer (Node 22 has it globally)
        const secretKey = new Uint8Array(Buffer.from(hexKey, 'hex'));
        results.decoded_key_length = secretKey.length;

        if (secretKey.length === 64) {
          const kp = web3.Keypair.fromSecretKey(secretKey);
          results.derived_public_key = kp.publicKey.toBase58();
          results.keys_match = results.derived_public_key === platformPubkey;
        } else {
          errors.push(`Decoded key length is ${secretKey.length}, expected 64`);
        }
      } catch (e: any) {
        errors.push(`Keypair creation failed: ${e.message}`);
        results.keypair_error = e.message;
      }
    } else if (hexKey) {
      errors.push(`PLATFORM_PRIVATE_KEY has invalid length (${hexKey.length}) or format`);
    } else {
      errors.push('PLATFORM_PRIVATE_KEY is missing');
    }

    // Test RPC
    if (process.env.RPC_URL) {
      try {
        const web3 = await import('@solana/web3.js');
        const conn = new web3.Connection(process.env.RPC_URL);
        const health = await conn.getHealth();
        results.rpc_connected = true;
        results.rpc_health = health;
      } catch (e: any) {
        results.rpc_connected = false;
        errors.push(`RPC failed: ${e.message}`);
      }
    }

    results.errors = errors;
    results.total_errors = errors.length;
    results.all_checks_passed = errors.length === 0;

    return NextResponse.json(results, { status: errors.length ? 400 : 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Diagnostic crashed', message: error.message },
      { status: 500 }
    );
  }
}
