// src/lib/metaplex.ts
console.log('🔥🔥🔥 Using MPL Core version of metaplex.ts 🔥🔥🔥');

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  generateSigner,
  keypairIdentity,
  publicKey,
  percentAmount,
} from '@metaplex-foundation/umi';
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters';
import { createCollectionV1, createV1, mplCore } from '@metaplex-foundation/mpl-core';
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
  return createUmi(rpcUrl)
    .use(keypairIdentity(fromWeb3JsKeypair(platformKeypair)))
    .use(mplCore());
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
  console.log('📦 createNftCollection (MPL Core) called with:');
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
  const collection = generateSigner(umi);

  try {
    await createCollectionV1(umi, {
      collection,
      name,
      uri: metadataUri,
      plugins: [
        {
          type: 'Royalties',
          data: {
            basisPoints: sellerFee,
            creators: [],
            ruleSet: { type: 'None' },
          },
        },
      ],
    }).sendAndConfirm(umi);

    console.log('✅ Collection created:', collection.publicKey.toString());
    return {
      mintAddress: collection.publicKey,
      signature: 'created',
    };
  } catch (err) {
    console.error('❌ MPL Core create collection error:', err);
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
  const asset = generateSigner(umi);

  try {
    await createV1(umi, {
      asset,
      collection: collectionMintAddress.toString(),
      name,
      uri: metadataUri,
      owner: owner.toString(),
    }).sendAndConfirm(umi);

    console.log('✅ NFT minted:', asset.publicKey.toString());
    return {
      mintAddress: asset.publicKey,
      signature: 'minted',
    };
  } catch (err) {
    console.error('❌ MPL Core mint NFT error:', err);
    throw err;
  }
}
// Rebuild trigger
