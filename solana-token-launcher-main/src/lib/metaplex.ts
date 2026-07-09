// src/lib/metaplex.ts
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createNft,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  generateSigner,
  keypairIdentity,
  publicKey,
  percentAmount,
} from '@metaplex-foundation/umi';
import { PublicKey } from '@solana/web3.js';
import { getConnection, getPlatformKeypair } from './solana';

function getUmiInstance() {
  const connection = getConnection();
  const platformKeypair = getPlatformKeypair();

  // Convert web3.js Keypair to UMI signer
  const umi = createUmi(connection)
    .use(mplTokenMetadata())
    .use(keypairIdentity(platformKeypair));

  return umi;
}

// ─── Create NFT Collection ──────────────────────────────────────────
export async function createNftCollection(
  name: string,
  symbol: string,
  description: string,
  royaltyBasisPoints: number,
  maxSupply: number,
  metadataUri: string
) {
  console.log('📦 createNftCollection (UMI) called with:');
  console.log('  name:', name);
  console.log('  symbol:', symbol);
  console.log('  royaltyBasisPoints:', royaltyBasisPoints, typeof royaltyBasisPoints);
  console.log('  maxSupply:', maxSupply, typeof maxSupply);
  console.log('  metadataUri:', metadataUri);

  // ── Validate and convert ──
  const sellerFee = Number(royaltyBasisPoints);
  const supply = Number(maxSupply);

  if (!Number.isInteger(sellerFee) || sellerFee < 0 || sellerFee > 10000) {
    throw new Error(`Invalid sellerFeeBasisPoints: ${sellerFee} (must be integer 0-10000)`);
  }
  // UMI uses `null` for unlimited; allow 0 to mean unlimited
  if (!Number.isInteger(supply) || supply < 0) {
    throw new Error(`Invalid maxSupply: ${supply} (must be a non-negative integer)`);
  }

  const umi = getUmiInstance();
  const collectionMint = generateSigner(umi);

  try {
    const result = await createNft(umi, {
      mint: collectionMint,
      name,
      symbol,
      uri: metadataUri,
      sellerFeeBasisPoints: sellerFee,
      maxSupply: supply === 0 ? null : supply, // 0 → unlimited
      isCollection: true,
    }).sendAndConfirm(umi);

    console.log('✅ Collection created:', collectionMint.publicKey.toString());
    // Return an object that mimics the old Metaplex NFT interface
    return {
      mintAddress: collectionMint.publicKey,
      signature: result.signature,
      // Add other fields if needed (e.g., metadata)
    };
  } catch (err) {
    console.error('❌ UMI create error:', err);
    throw err;
  }
}

// ─── Mint NFT from Collection ──────────────────────────────────────
export async function mintNftFromCollection(
  collectionMintAddress: PublicKey,
  owner: PublicKey,
  metadataUri: string,
  name: string,
  symbol: string,
  royaltyBasisPoints?: number
) {
  const umi = getUmiInstance();
  const mint = generateSigner(umi);
  const collection = publicKey(collectionMintAddress.toString());
  const tokenOwner = publicKey(owner.toString());

  const result = await createNft(umi, {
    mint,
    name,
    symbol,
    uri: metadataUri,
    sellerFeeBasisPoints: royaltyBasisPoints || 0,
    collection: {
      address: collection,
      verified: false, // will be verified later (or set to true if you have the authority)
    },
    tokenOwner,
  }).sendAndConfirm(umi);

  console.log('✅ NFT minted:', mint.publicKey.toString());
  return {
    mintAddress: mint.publicKey,
    signature: result.signature,
  };
}
