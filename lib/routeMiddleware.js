// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const isManager = req.cookies.get('isManager')?.value === 'true'; // Read isManager cookie
  const pathname = url.pathname;

  // Define routes
  const entryEmpRoutes = [
    '/employees',
    '/employees/update',
    '/shift',
    '/attendance',
    '/attendance/add',
    '/attendance/checkIn',
    '/earnings/single',
  ];

  const managerRoutes = [
    ...entryEmpRoutes, // Managers inherit entry employee access
    '/employees/add',
    '/employees/delete',
    '/shift/add',
    '/shift/update',
    '/shift/delete',
    '/attendance/pay',
    '/attendance/delete',
    '/earnings/all',
  ];

  // Determine allowed routes based on role
  const allowedRoutes = isManager ? managerRoutes : entryEmpRoutes;

  // Redirect to unauthorized if not allowed
  if (!allowedRoutes.includes(pathname)) {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static).*)'], // Exclude API, static files, and Next.js internals
};
