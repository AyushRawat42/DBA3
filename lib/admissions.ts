import "server-only"

import { cookies } from "next/headers"
import { z, type ZodType } from "zod"

import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session.server"

export const admissionStatuses = ["New", "Contacted", "Qualified", "Closed"] as const
export const formTypes = ["sports", "coaching"] as const

export const admissionStatusSchema = z.enum(admissionStatuses)
export const formTypeSchema = z.enum(formTypes)

export type AdmissionStatus = (typeof admissionStatuses)[number]
export type AdmissionFormType = (typeof formTypes)[number]

export type AdmissionSubmission = {
  PK: string
  SK: "META"
  id: string
  formType: AdmissionFormType
  createdAt: string
  updatedAt: string
  status: AdmissionStatus
  notes: string
  [key: string]: unknown
}

type ParseSubmissionBodyResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "invalid_json" }
  | { ok: false; reason: "invalid_fields"; issues: ReturnType<z.ZodError["flatten"]> }

export async function parseSubmissionBody<T>(
  req: Request,
  schema: ZodType<T>
): Promise<ParseSubmissionBodyResult<T>> {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return { ok: false, reason: "invalid_json" }
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return { ok: false, reason: "invalid_fields", issues: parsed.error.flatten() }
  }

  return { ok: true, data: parsed.data }
}

export function createSubmissionItem(
  id: string,
  formType: AdmissionFormType,
  fields: Record<string, unknown>
) {
  const now = new Date().toISOString()

  return {
    ...toSubmissionKey(id),
    id,
    formType,
    createdAt: now,
    updatedAt: now,
    status: "New" as const,
    notes: "",
    ...fields,
  }
}

export function toSubmissionKey(id: string) {
  return { PK: `SUBMISSION#${id}`, SK: "META" }
}

export function normalizeSubmissionId(value: string | null | undefined) {
  if (!value) {
    return null
  }

  const trimmed = decodeURIComponent(value).trim()
  if (!trimmed) {
    return null
  }

  return trimmed.replace(/^SUBMISSION#/, "")
}

export function normalizeSubmissionItem(item: Record<string, unknown>): Record<string, unknown> {
  const id =
    typeof item.id === "string" && item.id.trim()
      ? item.id.trim()
      : typeof item.PK === "string"
        ? item.PK.replace(/^SUBMISSION#/, "")
        : ""

  return {
    ...item,
    id,
  }
}

export async function requireAdminCookie() {
  const cookieStore = await cookies()
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)

  if (!session?.value) {
    return false
  }

  return verifyAdminSession(session.value)
}
