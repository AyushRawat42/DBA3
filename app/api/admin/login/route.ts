import { NextResponse } from "next/server"
import { z } from "zod"
import { verifyPassword, getStaticAdmin } from "@/lib/auth.server"
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSession,
} from "@/lib/admin-session.server"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

function invalidCredentials(debug?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production" && debug) {
    console.warn("Admin login rejected:", debug)
    return NextResponse.json({ error: "Invalid credentials", debug }, { status: 401 })
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
}

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = schema.parse(body)
  const normalizedEmail = email.trim().toLowerCase()

  const admin = getStaticAdmin()
  const adminEmail = admin.email.trim().toLowerCase()
  const emailMatches = adminEmail === normalizedEmail

  if (!emailMatches) {
    return invalidCredentials({
      reason: "email_mismatch",
      submittedEmail: normalizedEmail,
      configuredEmail: adminEmail,
    })
  }

  const ok = await verifyPassword(password, admin.passwordHash)
  if (!ok) {
    return invalidCredentials({
      reason: "password_mismatch",
      passwordHashConfigured: Boolean(admin.passwordHash),
      passwordHashLength: admin.passwordHash.length,
      passwordHashPrefix: admin.passwordHash.slice(0, 4),
    })
  }

  const sessionToken = createAdminSession(admin.adminId)

  const res = NextResponse.json({ ok: true })

  res.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  })

  return res
}
