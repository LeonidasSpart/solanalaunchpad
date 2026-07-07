import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const projectId = parseInt(id);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Admin authorization (simple token)
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await query(
      `UPDATE launchpad_projects 
       SET status = 'active', updated_at = NOW() 
       WHERE id = $1 AND status = 'pending'
       RETURNING *`,
      [projectId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Project not found or not pending' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to approve project' }, { status: 500 });
  }
}
