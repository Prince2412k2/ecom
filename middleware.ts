import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/jwt';

export const runtime = 'nodejs';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const user = token ? verifyToken(token) : null;

  // Handle root path redirection
  if (pathname === '/') {
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (user.type === 'Admin' || user.type === 'Super') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
    if (user.type === 'Customer') {
      return NextResponse.redirect(new URL('/products', req.url));
    }
  }

  // Redirect from login page if already logged in
  if (user && pathname.startsWith('/login')) {
    if (user.type === 'Admin' || user.type === 'Super') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
    if (user.type === 'Customer') {
      return NextResponse.redirect(new URL('/products', req.url));
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (user.type !== 'Admin' && user.type !== 'Super') {
      // Not an admin, redirect to home
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Protect user routes from admins
  const userPages = ['/cart', '/profile'];
  if (user && (user.type === 'Admin' || user.type === 'Super') && userPages.some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  // Protect user routes from logged-out users
  if (!user && userPages.some(p => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/api/admins/:path*',
    '/api/products/:path*',
    '/login',
    '/cart/:path*',
    '/profile/:path*',
  ],
};
