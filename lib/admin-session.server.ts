import "server-only"

import { createHmac, timingSafeEqual } from "crypto"
import { adminSessionSecret } from "@/lib/env"

export const ADMIN_SESSION_COOKIE = "aspire_admin_session"
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

export function getAdminSessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  }
}

type AdminSessionPayload = {
  adminId: string
  expiresAt: number
}

function encodePayload(payload: AdminSessionPayload) {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
}

function sign(value: string) {
  return createHmac("sha256", adminSessionSecret).update(value).digest("base64url")
}

export function createAdminSession(adminId: string) {
  if (!adminSessionSecret) {
    return null
  }

  const payload = encodePayload({
    adminId,
    expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000,
  })

  return `${payload}.${sign(payload)}`
}

export function verifyAdminSession(sessionToken: string) {
  if (!adminSessionSecret) {
    return false
  }

  const [payload, signature] = sessionToken.split(".")

  if (!payload || !signature) {
    return false
  }

  const expectedSignature = sign(payload)
  const actual = Buffer.from(signature)
  const expected = Buffer.from(expectedSignature)

  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return false
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSessionPayload
    return typeof session.adminId === "string" && Date.now() < session.expiresAt
  } catch {
    return false
  }
}
