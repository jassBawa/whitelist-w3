// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('sessionToken')?.value;
  const { pathname } = req.nextUrl;

  // Redirect to /app if authenticated and visiting /
  if (pathname === '/' && sessionToken) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/app';
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to / if NOT authenticated and visiting /app
  if (pathname.startsWith('/app') && !sessionToken) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  // Protect whitelist API routes
  const isProtectedApi =
    pathname === '/api/whitelist' || pathname.startsWith('/api/whitelist/');

  if (isProtectedApi && !sessionToken) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized: No session token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/app/:path*', '/api/whitelist/:path*', '/api/whitelist'],
};
