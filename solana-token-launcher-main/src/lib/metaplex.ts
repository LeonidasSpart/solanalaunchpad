// src/lib/metaplex.ts
console.log('🔥🔥🔥 Using UMI version of metaplex.ts 🔥🔥🔥');

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  generateSigner,
  keypairIdentity,
  publicKey,
  percentAmount,
} from '@metaplex-foundation/umi';
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters';
import { createV1, mintV1, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
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
    .use(keypairIdentity(fromWeb3JsKeypair(platformKeypair)));

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
    // Step 1: Create the mint + metadata + master edition accounts
    await createV1(umi, {
      mint: collectionMint,
      authority: umi.identity,
      name,
      symbol,
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(sellerFee / 100),
      tokenStandard: TokenStandard.NonFungible,
      isCollection: true,
    }).sendAndConfirm(umi);

    // Step 2: Mint the collection NFT token (1 token for the collection itself)
    await mintV1(umi, {
      mint: collectionMint.publicKey,
      authority: umi.identity,
      amount: 1,
      tokenOwner: umi.identity.publicKey,
      tokenStandard: TokenStandard.NonFungible,
    }).sendAndConfirm(umi);

    console.log('✅ Collection created:', collectionMint.publicKey.toString());
    return {
      mintAddress: collectionMint.publicKey,
      signature: 'created', // mintV1 doesn't return a simple signature, fetch from logs if needed
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

  // Step 1: Create the NFT accounts
  await createV1(umi, {
    mint,
    authority: umi.identity,
    name,
    symbol,
    uri: metadataUri,
    sellerFeeBasisPoints: percentAmount((royaltyBasisPoints || 0) / 100),
    tokenStandard: TokenStandard.NonFungible,
    collection: {
      key: collection,
      verified: false,
    },
  }).sendAndConfirm(umi);

  // Step 2: Mint the NFT token to the owner
  await mintV1(umi, {
    mint: mint.publicKey,
    authority: umi.identity,
    amount: 1,
    tokenOwner,
    tokenStandard: TokenStandard.NonFungible,
  }).sendAndConfirm(umi);

  console.log('✅ NFT minted:', mint.publicKey.toString());
  return {
    mintAddress: mint.publicKey,
    signature: 'minted',
  };
}
