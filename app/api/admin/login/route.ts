import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-constants';
import { hasSameOrigin } from '@/lib/request-origin';
import { createAdminToken, getSessionSecret } from '@/lib/session-token';

export const runtime = 'nodejs';

function safeEqual(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  try {
    getSessionSecret();
  } catch (error) {
    console.error('Admin session configuration is invalid.', error);
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    console.error('Admin credentials are not configured.');
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('username' in body) ||
    !('password' in body) ||
    typeof body.username !== 'string' ||
    typeof body.password !== 'string' ||
    body.username.length > 200 ||
    body.password.length > 200
  ) {
    return NextResponse.json({ error: 'Enter a valid username and password.' }, { status: 400 });
  }

  try {
    const usernameMatches = safeEqual(body.username, username);
    const passwordMatches = safeEqual(body.password, password);
    if (!usernameMatches || !passwordMatches) {
      return NextResponse.json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة.' }, { status: 401 });
    }

    const token = await createAdminToken(username);
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch (error) {
    console.error('Admin login failed.', error);
    return NextResponse.json({ error: 'Unable to sign in.' }, { status: 500 });
  }
}
