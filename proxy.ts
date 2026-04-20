import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const url = req.nextUrl
  const path = url.pathname

  if (path.startsWith('/dashboard')) {
    const admin = req.cookies.get('admin_auth')?.value === '1'
    if (admin) return NextResponse.next()

    const hasSession =
      req.cookies.get('sb-access-token') ||
      req.cookies.get('sb-refresh-token')

    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
