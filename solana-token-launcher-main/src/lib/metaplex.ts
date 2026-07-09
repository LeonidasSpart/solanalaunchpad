// src/lib/metaplex.ts
console.log('🔥🔥🔥 Using UMI version of metaplex.ts 🔥🔥🔥');

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  generateSigner,
  keypairIdentity,
  publicKey,
  percentAmount,
  createSignerFromKeypair,
} from '@metaplex-foundation/umi';
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters';
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey } from '@solana/web3.js';
import { getPlatformKeypair } from './solana';

function getRpcUrl(): string {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  const url = network === 'mainnet'
    ? process.env.RPC_URL_MAINNET
    : process.env.RPC_URL_DEVNET;
  if (!url) throw new Error(`RPC URL for ${network} not set`);
  return url;
}

function getUmiInstance() {
  const rpcUrl = getRpcUrl();
  const platformKeypair = getPlatformKeypair();

  const umi = createUmi(rpcUrl)
    .use(keypairIdentity(fromWeb3JsKeypair(platformKeypair)))
    .use(mplTokenMetadata());

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

  const sellerFee = Number(royaltyBasisPoints);
  const supply = Number(maxSupply);

  if (!Number.isInteger(sellerFee) || sellerFee < 0 || sellerFee > 10000) {
    throw new Error(`Invalid sellerFeeBasisPoints: ${sellerFee} (must be integer 0-10000)`);
  }
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
      sellerFeeBasisPoints: percentAmount(sellerFee / 100),
      maxSupply: supply === 0 ? null : supply,
      isCollection: true,
    }).sendAndConfirm(umi);

    console.log('✅ Collection created:', collectionMint.publicKey.toString());
    return {
      mintAddress: collectionMint.publicKey,
      signature: result.signature,
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
    sellerFeeBasisPoints: percentAmount((royaltyBasisPoints || 0) / 100),
    collection: {
      address: collection,
      verified: false,
    },
    tokenOwner,
  }).sendAndConfirm(umi);

  console.log('✅ NFT minted:', mint.publicKey.toString());
  return {
    mintAddress: mint.publicKey,
    signature: result.signature,
  };
}
