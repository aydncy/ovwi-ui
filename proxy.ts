import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {

  const path = req.nextUrl.pathname
  const admin = req.cookies.get('admin_auth')?.value === '1'

  //  ADMIN PANEL KORUMA
  if (path.startsWith('/admin') || path.startsWith('/founder') || path.startsWith('/investor')) {
    if (!admin) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  //  DASHBOARD (normal user auth)
  if (path.startsWith('/dashboard')) {

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
  matcher: ['/dashboard/:path*','/admin/:path*','/founder/:path*','/investor/:path*']
}
