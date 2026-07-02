import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/lib/pinata";

function getImageType(imageUrl: string): string {
  const lower = imageUrl.toLowerCase();
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "image/png";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, symbol, description, imageUrl, externalUrl, socialLinks } = body;

    const metadata: Record<string, any> = {
      name,
      symbol,
      description,
      image: imageUrl,
      external_url: externalUrl || "",
      attributes: [],
      properties: {
        files: [{ uri: imageUrl, type: getImageType(imageUrl) }],
        category: "image",
      },
    };

    if (socialLinks && Object.keys(socialLinks).length > 0) {
      metadata.properties.socials = socialLinks;
    }

    const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });
    const metadataFile = new File([metadataBlob], "metadata.json", {
      type: "application/json",
    });

    // pinata-web3 syntax: NO .public
    const upload = await pinata.upload.file(metadataFile);

    return NextResponse.json({
      url: `https://${process.env.PINATA_GATEWAY}/ipfs/${upload.IpfsHash}`,
      cid: upload.IpfsHash,
    });
  } catch (error) {
    console.error("Pinata metadata upload error:", error);
    return NextResponse.json(
      { error: "Metadata upload failed" },
      { status: 500 }
    );
  }
}
