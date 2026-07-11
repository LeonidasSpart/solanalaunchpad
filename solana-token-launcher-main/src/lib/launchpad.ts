import { Keypair, PublicKey } from '@solana/web3.js';

// ─── Platform Wallet Keypair ─────────────────────────────────────
// Lazy initialization — only creates keypair when first accessed.
// This avoids build-time errors since env vars aren't available during Next.js static generation.

let _platformKeypair: Keypair | null = null;

function initPlatformKeypair(): Keypair {
  const hexKey = process.env.PLATFORM_PRIVATE_KEY || process.env.LAUNCHPAD_PRIVATE_KEY;

  // ── Priority 1: Hex format (128 hex chars = 64 bytes) ──────────
  if (hexKey && hexKey.length === 128 && /^[0-9a-fA-F]+$/.test(hexKey)) {
    try {
      const secretKey = Uint8Array.from(Buffer.from(hexKey, 'hex'));
      if (secretKey.length === 64) {
        return Keypair.fromSecretKey(secretKey);
      }
    } catch (e) {
      console.error('Failed to parse hex platform key:', e);
    }
  }

  // ── Priority 2: Base64 format ──────────────────────────────────
  const b64Key = process.env.PLATFORM_PRIVATE_KEY_BASE64 || process.env.LAUNCHPAD_PRIVATE_KEY_BASE64;
  if (b64Key) {
    try {
      const secretKey = new Uint8Array(Buffer.from(b64Key, 'base64'));
      if (secretKey.length === 64) {
        return Keypair.fromSecretKey(secretKey);
      }
    } catch (e) {
      console.error('Failed to parse base64 platform key:', e);
    }
  }

  // ── Priority 3: JSON array format ──────────────────────────────
  const jsonKey = process.env.PLATFORM_PRIVATE_KEY_JSON || process.env.LAUNCHPAD_PRIVATE_KEY_JSON;
  if (jsonKey) {
    try {
      const arr = JSON.parse(jsonKey);
      if (Array.isArray(arr) && arr.length === 64) {
        return Keypair.fromSecretKey(Uint8Array.from(arr));
      }
    } catch (e) {
      console.error('Failed to parse JSON platform key:', e);
    }
  }

  throw new Error(
    'Platform keypair not configured. ' +
    'Set PLATFORM_PRIVATE_KEY (hex, 128 chars), ' +
    'PLATFORM_PRIVATE_KEY_BASE64 (base64), or ' +
    'PLATFORM_PRIVATE_KEY_JSON (JSON array of 64 numbers).'
  );
}

/** Lazy getter — initializes on first call */
function getPlatformKeypair(): Keypair {
  if (!_platformKeypair) {
    _platformKeypair = initPlatformKeypair();
  }
  return _platformKeypair;
}

// ─── Backward-compatible exports ─────────────────────────────────

/** Returns the platform keypair (lazy init) */
export function getLaunchpadKeypair(): Keypair {
  return getPlatformKeypair();
}

/** Returns the fee recipient public key */
export function getFeeWalletPubkey(): PublicKey {
  const feeRec = process.env.NEXT_PUBLIC_FEE_REC || process.env.NEXT_PUBLIC_FEE_RECIPIENT;
  if (!feeRec) throw new Error('NEXT_PUBLIC_FEE_REC not set');
  return new PublicKey(feeRec);
}

/** Proxy for direct access — lazy initializes on first property access */
export const platformKeypair = new Proxy({} as Keypair, {
  get(_target, prop) {
    const kp = getPlatformKeypair();
    return (kp as any)[prop];
  },
});
