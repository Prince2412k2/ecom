import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const user = verifyToken(token);
    if (!user || (user.type !== 'Admin' && user.type !== 'Super')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admins/:path*', '/api/products/:path*'],
};
