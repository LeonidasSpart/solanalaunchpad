import { NextResponse } from 'next/server';
import { getStakingPools } from '@/lib/staking';

export async function GET() {
  try {
    const pools = await getStakingPools();
    return NextResponse.json(pools);
  } catch (error) {
    console.error('Error fetching staking pools:', error);
    return NextResponse.json({ error: 'Failed to fetch pools' }, { status: 500 });
  }
}
