// src/app/api/launchpad/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const result = await query(
      `SELECT 
        p.*,
        lp.lock_end as lp_lock_end,
        lp.locked as lp_locked,
        lp.pool_address as lp_pool_address_full
       FROM launchpad_projects p
       LEFT JOIN lp_pools lp ON lp.pool_address = p.lp_pool_address
       WHERE p.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 });
  }
}
