// src/lib/metaplex.ts
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { getConnection, getPlatformKeypair } from './solana';

export function getMetaplexInstance() {
  const connection = getConnection();
  const platformKeypair = getPlatformKeypair();
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(platformKeypair));
  return metaplex;
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
  console.log('📦 createNftCollection called with:');
  console.log('  name:', name);
  console.log('  symbol:', symbol);
  console.log('  royaltyBasisPoints:', royaltyBasisPoints, typeof royaltyBasisPoints);
  console.log('  maxSupply:', maxSupply, typeof maxSupply);
  console.log('  metadataUri:', metadataUri);

  // ── Force integers and validate ──
  const sellerFee = Number(royaltyBasisPoints);
  const supply = Number(maxSupply);

  if (!Number.isInteger(sellerFee) || sellerFee < 0 || sellerFee > 10000) {
    throw new Error(`Invalid sellerFeeBasisPoints: ${sellerFee} (must be integer 0-10000)`);
  }
  if (!Number.isInteger(supply) || supply <= 0) {
    throw new Error(`Invalid maxSupply: ${supply} (must be a positive integer)`);
  }

  const metaplex = getMetaplexInstance();
  try {
    const collectionNft = await metaplex.nfts().create({
      name,
      symbol,
      uri: metadataUri,
      sellerFeeBasisPoints: sellerFee,
      maxSupply: supply,
      isCollection: true,
    });
    console.log('✅ Collection created:', collectionNft.mintAddress.toBase58());
    return collectionNft;
  } catch (err) {
    console.error('❌ Metaplex create error:', err);
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
  const metaplex = getMetaplexInstance();
  const nft = await metaplex.nfts().create({
    name,
    symbol,
    uri: metadataUri,
    sellerFeeBasisPoints: royaltyBasisPoints || 0,
    collection: collectionMintAddress,
    tokenOwner: owner,
  });
  return nft;
}
