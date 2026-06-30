import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionCookieOptions,
  verifyAdminSession,
} from "@/lib/admin-session.server"

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next()
  }

  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  const session = req.cookies.get(ADMIN_SESSION_COOKIE)
  const isAuthenticated = Boolean(session?.value && verifyAdminSession(session.value))

  if (!isAuthenticated) {
    const url = req.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("from", pathname)

    const response = NextResponse.redirect(url)

    if (session?.value) {
      response.cookies.set(ADMIN_SESSION_COOKIE, "", getAdminSessionCookieOptions(0))
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
