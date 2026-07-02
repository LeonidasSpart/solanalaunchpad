import { NextRequest, NextResponse } from 'next/server';
import { NFTStorage } from 'nft.storage';

const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY || '';

function getImageType(imageUrl: string): string {
  const lower = imageUrl.toLowerCase();
  if (lower.endsWith('.gif')) return 'image/gif';
  if (lower.endsWith('.webp')) return 'image/webp';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
  return 'image/png';
}

export async function POST(request: NextRequest) {
  if (!NFT_STORAGE_API_KEY) {
    return NextResponse.json({ error: 'NFT.Storage API key not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { name, symbol, description, imageUrl, externalUrl, socialLinks } = body;

    const metadata: any = {
      name,
      symbol,
      description,
      image: imageUrl,
      external_url: externalUrl || '',
      attributes: [],
      properties: {
        files: [{ uri: imageUrl, type: getImageType(imageUrl) }],
        category: 'image',
      },
    };

    if (socialLinks && Object.keys(socialLinks).length > 0) {
      metadata.properties.socials = socialLinks;
    }

    const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
    const cid = await client.storeBlob(blob);

    return NextResponse.json({ 
      url: `https://nftstorage.link/ipfs/${cid}`,
      cid 
    });
  } catch (error) {
    console.error('Metadata upload error:', error);
    return NextResponse.json({ error: 'Metadata upload failed' }, { status: 500 });
  }
}
