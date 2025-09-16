import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// TODO: Implement Firebase Auth middleware
// This is a basic structure - expand based on your needs

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/projects', '/settings', '/billing', '/users']
  const authRoutes = ['/login', '/signup', '/forgot-password']
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // TODO: Get the Firebase ID token from cookies
  // You'll need to set this cookie when user logs in
  const token = request.cookies.get('firebase-auth-token')?.value

  if (isProtectedRoute && !token) {
    // Redirect to login if accessing protected route without token
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && token) {
    // Redirect to dashboard if accessing auth routes while logged in
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // TODO: Verify token with Firebase Admin SDK
  // This requires an API endpoint since middleware runs on Edge Runtime
  // Example approach:
  // if (token && isProtectedRoute) {
  //   const response = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //   
  //   if (!response.ok) {
  //     return NextResponse.redirect(new URL('/login', request.url))
  //   }
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

// TODO: Alternative approach using Firebase Auth with sessions:
// 1. Create an API route to handle login and set HTTP-only session cookie
// 2. Verify session cookie in middleware
// 3. Refresh session cookie as needed
// See: https://firebase.google.com/docs/auth/admin/manage-cookies