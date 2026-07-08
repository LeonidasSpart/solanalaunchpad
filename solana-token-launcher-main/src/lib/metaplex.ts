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
  const metaplex = getMetaplexInstance();
  const collectionNft = await metaplex.nfts().create({
    name,
    symbol,
    description,
    sellerFeeBasisPoints: royaltyBasisPoints,
    maxSupply: maxSupply,
    isCollection: true,
    uri: metadataUri,
  });
  return collectionNft;
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
    useExistingCollection: true,
    tokenOwner: owner,
  });
  return nft;
}
