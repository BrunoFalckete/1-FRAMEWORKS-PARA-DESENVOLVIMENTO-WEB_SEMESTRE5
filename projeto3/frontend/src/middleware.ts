import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res: NextResponse) {
  let isPublicRoute = false;
  if (
    req.nextUrl.pathname === '/auth/login' ||
    req.nextUrl.pathname === '/auth/register'
  ) {
    isPublicRoute = true;
  }

  // if the route is not public, check if the user is authenticated
  if (!isPublicRoute) {
    const token = req.cookies.get('token') ?? '';

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // check if the token is valid

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/auth/login', '/auth/register', '/'],
};
