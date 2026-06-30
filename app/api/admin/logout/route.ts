import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionCookieOptions,
} from "@/lib/admin-session.server"

export async function POST() {
  const cookieStore = await cookies()

  cookieStore.set(ADMIN_SESSION_COOKIE, "", getAdminSessionCookieOptions(0))

  return NextResponse.json({ success: true })
}
