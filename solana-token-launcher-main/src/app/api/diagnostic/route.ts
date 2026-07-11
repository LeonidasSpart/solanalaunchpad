import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Buffer } from 'buffer';

export async function GET(req: NextRequest) {
  const results: Record<string, any> = {};
  const errors: string[] = [];

  try {
    // ═══════════════════════════════════════════════════════════════
    // 1. Check PLATFORM_PRIVATE_KEY
    // ═══════════════════════════════════════════════════════════════
    const privateKeyStr = process.env.PLATFORM_PRIVATE_KEY;
    if (!privateKeyStr) {
      errors.push('PLATFORM_PRIVATE_KEY is missing');
    } else {
      const clean = privateKeyStr.replace(/\s/g, '');
      let buffer: Buffer;
      let format: string;

      // Detect format: hex (128 chars) vs base64
      if (clean.length === 128 && /^[0-9a-fA-F]+$/.test(clean)) {
        buffer = Buffer.from(clean, 'hex');
        format = 'hex';
      } else {
        buffer = Buffer.from(clean, 'base64');
        format = 'base64';
      }

      results.platform_private_key_format = format;
      results.platform_private_key_length = buffer.length;
      results.platform_private_key_valid = buffer.length === 64;

      if (buffer.length === 64) {
        const kp = Keypair.fromSecretKey(new Uint8Array(buffer));
        results.derived_public_key = kp.publicKey.toBase58();
      } else {
        errors.push(
          `PLATFORM_PRIVATE_KEY invalid: ${format} decoded to ${buffer.length} bytes (expected 64)`
        );
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 2. Check PLATFORM_PUBLIC_KEY
    // ═══════════════════════════════════════════════════════════════
    const platformPubkey = process.env.PLATFORM_PUBLIC_KEY;
    results.platform_public_key = platformPubkey || 'MISSING';
    if (platformPubkey && results.derived_public_key) {
      results.keys_match = platformPubkey === results.derived_public_key;
      if (!results.keys_match) {
        errors.push(
          'PLATFORM_PUBLIC_KEY does NOT match derived key from PLATFORM_PRIVATE_KEY'
        );
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 3. Check LAUNCHPAD_PRIVATE_KEY / LAUNCHPAD_PUBLIC_KEY
    // ═══════════════════════════════════════════════════════════════
    const launchpadPriv = process.env.LAUNCHPAD_PRIVATE_KEY;
    const launchpadPub = process.env.LAUNCHPAD_PUBLIC_KEY;
    results.launchpad_private_key_present = !!launchpadPriv;
    results.launchpad_public_key = launchpadPub || 'MISSING';

    if (launchpadPriv) {
      const clean = launchpadPriv.replace(/\s/g, '');
      let buffer: Buffer;
      let format: string;

      if (clean.length === 128 && /^[0-9a-fA-F]+$/.test(clean)) {
        buffer = Buffer.from(clean, 'hex');
        format = 'hex';
      } else {
        buffer = Buffer.from(clean, 'base64');
        format = 'base64';
      }

      results.launchpad_private_key_format = format;
      results.launchpad_private_key_length = buffer.length;

      if (buffer.length === 64) {
        const kp = Keypair.fromSecretKey(new Uint8Array(buffer));
        results.launchpad_derived_public_key = kp.publicKey.toBase58();
        if (launchpadPub) {
          results.launchpad_keys_match = launchpadPub === kp.publicKey.toBase58();
        }
      } else {
        errors.push(
          `LAUNCHPAD_PRIVATE_KEY invalid: ${format} decoded to ${buffer.length} bytes (expected 64)`
        );
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 4. Check NEXT_PUBLIC_LAUNCHPAD_PUBLIC_KEY
    // ═══════════════════════════════════════════════════════════════
    const nextPublicLaunchpad = process.env.NEXT_PUBLIC_LAUNCHPAD_PUBLIC_KEY;
    results.next_public_launchpad_public_key = nextPublicLaunchpad || 'MISSING';
    if (nextPublicLaunchpad && results.derived_public_key) {
      results.next_public_matches_platform =
        nextPublicLaunchpad === results.derived_public_key;
      if (!results.next_public_matches_platform) {
        errors.push(
          'NEXT_PUBLIC_LAUNCHPAD_PUBLIC_KEY does NOT match PLATFORM_PRIVATE_KEY derived key'
        );
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 5. Check FEE wallet
    // ═══════════════════════════════════════════════════════════════
    const feeRec = process.env.NEXT_PUBLIC_FEE_REC;
    results.fee_recipient = feeRec || 'MISSING';
    if (feeRec) {
      try {
        new PublicKey(feeRec);
        results.fee_recipient_valid = true;
      } catch {
        errors.push('NEXT_PUBLIC_FEE_REC is not a valid Solana address');
        results.fee_recipient_valid = false;
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 6. Check RPC URLs
    // ═══════════════════════════════════════════════════════════════
    results.rpc_url = process.env.RPC_URL || 'MISSING';
    results.rpc_url_devnet = process.env.RPC_URL_DEVNET || 'MISSING';
    results.rpc_url_mainnet = process.env.RPC_URL_MAINNET || 'MISSING';
    results.next_public_rpc_url = process.env.NEXT_PUBLIC_RPC_URL || 'MISSING';

    // Test RPC_URL (mainnet)
    if (process.env.RPC_URL) {
      try {
        const conn = new Connection(process.env.RPC_URL, 'confirmed');
        const version = await conn.getVersion();
        results.rpc_url_connected = true;
        results.rpc_url_version = version['solana-core'];
      } catch (e: any) {
        results.rpc_url_connected = false;
        results.rpc_url_error = e.message;
        errors.push(`RPC_URL connection failed: ${e.message}`);
      }
    }

    // Test RPC_URL_MAINNET
    if (process.env.RPC_URL_MAINNET) {
      try {
        const conn = new Connection(process.env.RPC_URL_MAINNET, 'confirmed');
        await conn.getVersion();
        results.rpc_url_mainnet_connected = true;
      } catch (e: any) {
        results.rpc_url_mainnet_connected = false;
        errors.push(`RPC_URL_MAINNET connection failed: ${e.message}`);
      }
    }

    // Test RPC_URL_DEVNET
    if (process.env.RPC_URL_DEVNET) {
      try {
        const conn = new Connection(process.env.RPC_URL_DEVNET, 'confirmed');
        await conn.getVersion();
        results.rpc_url_devnet_connected = true;
      } catch (e: any) {
        results.rpc_url_devnet_connected = false;
        errors.push(`RPC_URL_DEVNET connection failed: ${e.message}`);
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 7. Check NEXT_PUBLIC_SOLANA_NETWORK
    // ═══════════════════════════════════════════════════════════════
    results.solana_network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'MISSING';

    // ═══════════════════════════════════════════════════════════════
    // 8. Summary
    // ═══════════════════════════════════════════════════════════════
    results.all_checks_passed = errors.length === 0;
    results.errors = errors;
    results.total_errors = errors.length;

    const status = errors.length === 0 ? 200 : 400;
    return NextResponse.json(results, { status });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Diagnostic failed',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
