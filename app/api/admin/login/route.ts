import { NextResponse } from "next/server"
import { z } from "zod"

import { verifyPassword, getStaticAdmin } from "@/lib/auth.server"
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSession,
  getAdminSessionCookieOptions,
} from "@/lib/admin-session.server"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const INVALID_CREDENTIALS_RESPONSE = { error: "Invalid credentials" } as const

function logLoginRejection(reason: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`Admin login rejected: ${reason}`)
  }
}

export async function POST(req: Request) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { email, password } = parsed.data
  const normalizedEmail = email.trim().toLowerCase()

  const admin = getStaticAdmin()
  const adminEmail = admin.email.trim().toLowerCase()

  if (adminEmail !== normalizedEmail) {
    logLoginRejection("email mismatch")
    return NextResponse.json(INVALID_CREDENTIALS_RESPONSE, { status: 401 })
  }

  if (!admin.passwordHash) {
    logLoginRejection("password hash not configured")
    return NextResponse.json(INVALID_CREDENTIALS_RESPONSE, { status: 401 })
  }

  const ok = await verifyPassword(password, admin.passwordHash)
  if (!ok) {
    logLoginRejection("password mismatch")
    return NextResponse.json(INVALID_CREDENTIALS_RESPONSE, { status: 401 })
  }

  const sessionToken = createAdminSession(admin.adminId)
  if (!sessionToken) {
    console.error("Admin login blocked: session secret is not configured")
    return NextResponse.json({ error: "Login is temporarily unavailable" }, { status: 503 })
  }

  const res = NextResponse.json({ ok: true })

  res.cookies.set(
    ADMIN_SESSION_COOKIE,
    sessionToken,
    getAdminSessionCookieOptions(ADMIN_SESSION_MAX_AGE_SECONDS)
  )

  return res
}
