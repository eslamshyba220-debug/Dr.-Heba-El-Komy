import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-constants';
import { getSessionSecret, verifyAdminToken } from '@/lib/session-token';

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const isLoginApi = request.nextUrl.pathname === '/api/admin/login';
  if (isLoginPage || isLoginApi) return NextResponse.next();

  try {
    getSessionSecret();
  } catch (error) {
    console.error('Admin session configuration is invalid.', error);
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Admin authentication is unavailable.' }, { status: 503 });
    }
    return new NextResponse('Admin authentication is not configured.', { status: 503 });
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (token) {
    try {
      if (await verifyAdminToken(token)) return NextResponse.next();
    } catch {
      // Invalid or expired session cookies are treated as unauthenticated.
    }
  }

  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/admin/login';
  loginUrl.search = '';
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
