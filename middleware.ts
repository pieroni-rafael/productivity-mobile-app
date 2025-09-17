import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware for BaaS authentication
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/projects', '/settings', '/billing', '/users']
  const authRoutes = ['/login', '/signup', '/forgot-password']
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Get the auth token from cookies
  const token = request.cookies.get('auth-token')?.value

  // TEMPORARY: Auth is disabled for development
  // TODO: Enable these checks when BaaS is connected
  
  // if (isProtectedRoute && !token) {
  //   const url = new URL('/login', request.url)
  //   url.searchParams.set('redirect', pathname)
  //   return NextResponse.redirect(url)
  // }

  // if (isAuthRoute && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}