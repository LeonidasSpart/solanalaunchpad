import { NFTStorage } from "nft.storage";

// Server-side API key (NOT NEXT_PUBLIC)
// For client-side uploads, use a server API route instead
const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY || "";

// Validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
];
const ALLOWED_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

/**
 * Validate image file before upload
 */
function validateImageFile(file: File): void {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `Image too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. ` +
      `Maximum allowed: ${MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }

  // Check MIME type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type: ${file.type}. ` +
      `Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`
    );
  }

  // Check file extension
  const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(ext)) {
    throw new Error(
      `Invalid file extension: ${ext}. ` +
      `Allowed: ${ALLOWED_IMAGE_EXTENSIONS.join(", ")}`
    );
  }
}

/**
 * Determine image MIME type from file extension
 */
function getImageType(imageUrl: string): string {
  const lower = imageUrl.toLowerCase();
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "image/png";
}

/**
 * Upload token image to IPFS via NFT.Storage
 */
export async function uploadTokenImage(file: File): Promise<string> {
  if (!NFT_STORAGE_API_KEY) {
    throw new Error(
      "NFT.Storage API key is missing. " +
      "Set NFT_STORAGE_API_KEY in your environment variables (server-side only)."
    );
  }

  // Validate before upload
  validateImageFile(file);

  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
  const cid = await client.storeBlob(file);

  // Use nftstorage.link for faster loading (Cloudflare edge cache)
  return `https://nftstorage.link/ipfs/${cid}`;
}

/**
 * Upload token metadata JSON to IPFS
 */
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
    throw new Error(
      "NFT.Storage API key is missing. " +
      "Set NFT_STORAGE_API_KEY in your environment variables (server-side only)."
    );
  }

  const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

  // Build metadata following Metaplex Token Metadata standard
  const metadata: any = {
    name,
    symbol,
    description,
    image: imageUrl,
    external_url: externalUrl || "",
    attributes: attributes || [],
    properties: {
      files: [
        {
          uri: imageUrl,
          type: getImageType(imageUrl),
        },
      ],
      category: "image",
    },
  };

  // Add social links to properties (non-standard but widely supported)
  if (socialLinks && Object.keys(socialLinks).length > 0) {
    metadata.properties.socials = socialLinks;
  }

  const blob = new Blob([JSON.stringify(metadata, null, 2)], {
    type: "application/json",
  });
  const cid = await client.storeBlob(blob);

  return `https://nftstorage.link/ipfs/${cid}`;
}
