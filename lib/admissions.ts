import "server-only"

import { cookies } from "next/headers"
import { z } from "zod"

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

export function toSubmissionKey(id: string) {
  return { PK: `SUBMISSION#${id}`, SK: "META" }
}

export async function requireAdminCookie() {
  const cookieStore = await cookies()
  const session = cookieStore.get("aspire_admin_session")

  if (!session?.value) {
    return false
  }

  return true
}
