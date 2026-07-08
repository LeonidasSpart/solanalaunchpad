import { pinata } from './pinata';

/**
 * Upload JSON metadata to IPFS via Pinata and return the public gateway URL.
 */
export async function uploadMetadata(metadata: Record<string, any>): Promise<string> {
  const result = await pinata.upload.json(metadata);
  return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
}
