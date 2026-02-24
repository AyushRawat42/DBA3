import { NextResponse } from "next/server"
import { z } from "zod"
import { cookies } from "next/headers"
import { randomUUID } from "crypto"
import { verifyPassword, getStaticAdmin } from "@/lib/auth.server"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const sessions = new Map<string, string>() // in-memory for now; replace with DB
const admin = getStaticAdmin()
console.log("ADMIN FROM ENV", admin)

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = schema.parse(body)

  const admin = getStaticAdmin()
  if (!admin || admin.email !== email) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  console.log("RAW HASH LENGTH", admin?.passwordHash?.length, admin?.passwordHash)

  const ok = await verifyPassword(password, admin.passwordHash)
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const sessionId = randomUUID()
  sessions.set(sessionId, admin.adminId)

  const res = NextResponse.json({ ok: true })

  res.cookies.set("dba_admin_session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  })

  return res
}

// export sessions so middleware can check later (MVP; replace with real store)
export { sessions }
