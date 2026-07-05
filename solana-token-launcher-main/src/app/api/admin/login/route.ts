import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Environment variables – NO FALLBACKS!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;

// Simple in-memory rate limiter (5 attempts per 15 minutes)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: Date } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return { allowed: true };
  }

  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return { allowed: true };
  }

  if (record.count >= 5) {
    return { allowed: false, resetTime: new Date(record.resetTime) };
  }

  record.count += 1;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // 1. Check required environment variables
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
      console.error('❌ Admin login: Missing environment variables');
      return NextResponse.json(
        { error: 'Server misconfiguration' },
        { status: 500 }
      );
    }

    // 2. Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rateResult = checkRateLimit(ip);
    if (!rateResult.allowed) {
      console.warn(`⛔ Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { error: `Too many login attempts. Try again after ${rateResult.resetTime?.toLocaleTimeString()}` },
        { status: 429 }
      );
    }

    // 3. Parse request
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // 4. Check email
    if (email !== ADMIN_EMAIL) {
      console.warn(`❌ Admin login failed (wrong email) from ${ip}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 5. Verify password using bcrypt
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isValid) {
      console.warn(`❌ Admin login failed (wrong password) from ${ip}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // 6. Generate JWT with explicit algorithm and claims
    const token = jwt.sign(
      { 
        email: ADMIN_EMAIL,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
      },
      JWT_SECRET,
      { algorithm: 'HS256' }
    );

    // 7. Set secure HTTP‑only cookie
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log(`✅ Admin login successful from ${ip}`);
    return response;

  } catch (error) {
    console.error('❌ Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
