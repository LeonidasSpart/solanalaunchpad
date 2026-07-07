import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';

// ─── JWT Verification Helper ──────────────────────────────────────
async function verifyAdminToken(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) return false;

  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  try {
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // 1. Verify JWT
    const isAdmin = await verifyAdminToken(req);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get project ID
    const { id } = await context.params;
    const projectId = parseInt(id);
    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // 3. Reject the project (only if pending)
    const result = await query(
      `UPDATE launchpad_projects 
       SET status = 'rejected', updated_at = NOW() 
       WHERE id = $1 AND status = 'pending'
       RETURNING *`,
      [projectId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Project not found or not pending' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Reject error:', error);
    return NextResponse.json({ error: 'Failed to reject project' }, { status: 500 });
  }
}
