import { Keypair } from '@solana/web3.js';

// Platform wallet keypair initialization
let platformKeypair: Keypair;

function initPlatformKeypair(): Keypair {
  // Priority 1: PLATFORM_PRIVATE_KEY env var (hex string, 128 chars)
  const hexKey = process.env.PLATFORM_PRIVATE_KEY || process.env.LAUNCHPAD_PRIVATE_KEY;
  
  if (hexKey && hexKey.length === 128 && /^[0-9a-fA-F]+$/.test(hexKey)) {
    try {
      const secretKey = Uint8Array.from(Buffer.from(hexKey, 'hex'));
      if (secretKey.length === 64) {
        return Keypair.fromSecretKey(secretKey);
      }
    } catch (e) {
      console.error('Failed to parse hex key:', e);
    }
  }
  
  // Priority 2: JSON array format (for backwards compatibility)
  const jsonKey = process.env.PLATFORM_PRIVATE_KEY_JSON || process.env.LAUNCHPAD_PRIVATE_KEY_JSON;
  if (jsonKey) {
    try {
      const arr = JSON.parse(jsonKey);
      if (Array.isArray(arr) && arr.length === 64) {
        return Keypair.fromSecretKey(Uint8Array.from(arr));
      }
    } catch (e) {
      console.error('Failed to parse JSON key:', e);
    }
  }
  
  // Priority 3: Base64 format (for backwards compatibility)
  const b64Key = process.env.PLATFORM_PRIVATE_KEY_BASE64 || process.env.LAUNCHPAD_PRIVATE_KEY_BASE64;
  if (b64Key) {
    try {
      const decoded = Buffer.from(b64Key, 'base64');
      if (decoded.length === 64) {
        return Keypair.fromSecretKey(new Uint8Array(decoded));
      }
    } catch (e) {
      console.error('Failed to parse base64 key:', e);
    }
  }
  
  throw new Error(
    'Platform keypair not configured. Set PLATFORM_PRIVATE_KEY (hex, 128 chars), ' +
    'PLATFORM_PRIVATE_KEY_JSON (JSON array), or PLATFORM_PRIVATE_KEY_BASE64 (base64).'
  );
}

platformKeypair = initPlatformKeypair();

export { platformKeypair };
