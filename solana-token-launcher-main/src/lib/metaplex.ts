// src/lib/metaplex.ts
console.log('🔥🔥🔥 Using UMI version of metaplex.ts 🔥🔥🔥');

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  generateSigner,
  keypairIdentity,
  publicKey,
  percentAmount,
} from '@metaplex-foundation/umi';
import { fromWeb3JsKeypair, fromWeb3JsConnection } from '@metaplex-foundation/umi-web3js-adapters';
import { PublicKey } from '@solana/web3.js';
import { getConnection, getPlatformKeypair } from './solana';

let mplModule: any = null;

async function getMpl() {
  if (!mplModule) {
    mplModule = await import('@metaplex-foundation/mpl-token-metadata');
    console.log('📦 mpl-token-metadata loaded, exports:', Object.keys(mplModule));
  }
  return mplModule;
}

async function getUmiInstance() {
  const connection = getConnection();
  const platformKeypair = getPlatformKeypair();
  const mpl = await getMpl();

  // Convert web3.js Connection to UMI-compatible connection
  const umi = createUmi(fromWeb3JsConnection(connection))
    .use(keypairIdentity(fromWeb3JsKeypair(platformKeypair)));

  const plugin = mpl.mplTokenMetadata || mpl.default?.mplTokenMetadata;
  if (plugin) {
    umi.use(plugin());
  } else {
    console.warn('⚠️ mplTokenMetadata plugin not found – attempting without it');
  }

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

  const umi = await getUmiInstance();
  const collectionMint = generateSigner(umi);
  const mpl = await getMpl();

  const createFn = mpl.createNft || mpl.create || mpl.default?.createNft || mpl.default?.create;
  if (!createFn) {
    throw new Error('Cannot find createNft function. Exports: ' + Object.keys(mpl).join(', '));
  }

  try {
    const result = await createFn(umi, {
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
  const umi = await getUmiInstance();
  const mint = generateSigner(umi);
  const collection = publicKey(collectionMintAddress.toString());
  const tokenOwner = publicKey(owner.toString());

  const mpl = await getMpl();
  const createFn = mpl.createNft || mpl.create || mpl.default?.createNft || mpl.default?.create;
  if (!createFn) {
    throw new Error('Cannot find createNft function');
  }

  const result = await createFn(umi, {
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
