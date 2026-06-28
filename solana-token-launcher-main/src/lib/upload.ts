import { NFTStorage } from "nft.storage";

const NFT_STORAGE_API_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "";

export async function uploadTokenImage(file: File): Promise<string> {
  if (!NFT_STORAGE_API_KEY) {
    throw new Error("NFT.Storage API key is missing. Check your .env.local file.");
  }

  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const cid = await client.storeBlob(file);
  return `https://ipfs.io/ipfs/${cid}`;
}

export async function uploadMetadata(
  name: string,
  symbol: string,
  description: string,
  imageUrl: string,
  attributes?: any
): Promise<string> {
  if (!NFT_STORAGE_API_KEY) {
    throw new Error("NFT.Storage API key is missing. Check your .env.local file.");
  }

  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const metadata = {
    name,
    symbol,
    description,
    image: imageUrl,
    external_url: "",
    attributes: attributes || [],
    properties: {
      files: [{ uri: imageUrl, type: "image/png" }],
      category: "image",
    },
  };

  const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
  const cid = await client.storeBlob(blob);
  return `https://ipfs.io/ipfs/${cid}`;
}
