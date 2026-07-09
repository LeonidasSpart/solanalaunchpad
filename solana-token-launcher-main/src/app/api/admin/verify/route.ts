import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Check if JWT_SECRET is set
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: 'Server misconfiguration: JWT_SECRET missing' },
        { status: 500 }
      );
    }

    // Verify token
    jwt.verify(token, secret);

    return NextResponse.json({ message: 'Authorized' }, { status: 200 });
  } catch (error) {
    console.error('JWT verification error:', error);
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}
