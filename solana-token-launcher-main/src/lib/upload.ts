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
  attributes?: any,
  externalUrl?: string,
  socialLinks?: Record<string, string>
): Promise<string> {
  if (!NFT_STORAGE_API_KEY) {
    throw new Error("NFT.Storage API key is missing. Check your .env.local file.");
  }

  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  
  const metadata: any = {
    name,
    symbol,
    description,
    image: imageUrl,
    external_url: externalUrl || "",
    attributes: attributes || [],
    properties: {
      files: [{ uri: imageUrl, type: imageUrl.endsWith('.gif') ? "image/gif" : "image/png" }],
      category: "image",
    },
  };

  // Add social links to properties if provided
  if (socialLinks && Object.keys(socialLinks).length > 0) {
    metadata.properties.socials = socialLinks;
  }

  const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" });
  const cid = await client.storeBlob(blob);
  return `https://ipfs.io/ipfs/${cid}`;
}
