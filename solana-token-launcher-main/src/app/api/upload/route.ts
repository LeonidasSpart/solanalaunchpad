import { NextRequest, NextResponse } from 'next/server';

const PINATA_JWT = process.env.PINATA_JWT || '';
const PINATA_GATEWAY = process.env.PINATA_GATEWAY || 'https://gateway.pinata.cloud';

export async function POST(request: NextRequest) {
  if (!PINATA_JWT) {
    console.error('❌ PINATA_JWT is not configured');
    return NextResponse.json(
      { error: 'Pinata JWT not configured' },
      { status: 500 }
    );
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

    // Upload to Pinata
    const pinataFormData = new FormData();
    pinataFormData.append('file', file);

    // Add metadata for better organization
    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        type: 'token-image',
        uploadedAt: new Date().toISOString(),
      }
    });
    pinataFormData.append('pinataMetadata', metadata);

    // Add options for better gateway support
    const options = JSON.stringify({
      cidVersion: 1,
      wrapWithDirectory: false,
    });
    pinataFormData.append('pinataOptions', options);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
      body: pinataFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Pinata upload failed:', errorText);
      return NextResponse.json(
        { error: 'Pinata upload failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const cid = data.IpfsHash;

    console.log('✅ File uploaded to Pinata:', cid);

    return NextResponse.json({
      url: `${PINATA_GATEWAY}/ipfs/${cid}`,
      IpfsHash: cid,
      success: true,
    });

  } catch (error: any) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
