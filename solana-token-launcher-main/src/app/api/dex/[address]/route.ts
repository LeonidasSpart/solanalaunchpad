import { NextRequest, NextResponse } from 'next/server';
import { getTokenDetail } from '@/lib/dex/client';

export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const token = await getTokenDetail(params.address);
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: token });
  } catch (error) {
    console.error('Token detail error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch token details' },
      { status: 500 }
    );
  }
}
