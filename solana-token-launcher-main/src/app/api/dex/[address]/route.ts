// src/app/api/dex/[address]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTokenDetail } from '@/lib/dex/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;

    const token = await getTokenDetail(address);
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
