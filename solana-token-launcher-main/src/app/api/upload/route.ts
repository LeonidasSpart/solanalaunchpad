import { NextRequest, NextResponse } from 'next/server';
import { NFTStorage } from 'nft.storage';

const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY || '';

export async function POST(request: NextRequest) {
  if (!NFT_STORAGE_API_KEY) {
    return NextResponse.json({ error: 'NFT.Storage API key not configured' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
    const cid = await client.storeBlob(file);

    return NextResponse.json({ 
      url: `https://nftstorage.link/ipfs/${cid}`,
      cid 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
