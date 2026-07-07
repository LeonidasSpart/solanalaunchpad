import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST – add wallet to whitelist
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { wallet } = await req.json();
    if (!wallet) return NextResponse.json({ error: 'Wallet required' }, { status: 400 });

    await query(
      'INSERT INTO launchpad_whitelist (project_id, wallet) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [projectId, wallet]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add to whitelist' }, { status: 500 });
  }
}

// DELETE – remove from whitelist
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    const { wallet } = await req.json();
    if (!wallet) return NextResponse.json({ error: 'Wallet required' }, { status: 400 });

    await query(
      'DELETE FROM launchpad_whitelist WHERE project_id = $1 AND wallet = $2',
      [projectId, wallet]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to remove from whitelist' }, { status: 500 });
  }
}
