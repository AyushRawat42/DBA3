import { z } from "zod"

// Shared fields across all forms
const basePersonalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
})

// Aadhaar validation (12 digits)
const aadhaarSchema = z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits")

// Backend-backed uploads: store S3 key, not File object
const uploadedDocSchema = z.string().min(1, "Please upload a file")
const optionalUploadedDocSchema = z.string().min(1).optional()


// ATHLETE FORM SCHEMA
export const athleteRegistrationSchema = z.object({
  ...basePersonalInfoSchema.shape,
  aadhaar: aadhaarSchema,
  educationalQualification: z
    .string()
    .min(1, "Educational qualification is required"),
 photo: uploadedDocSchema,
birthCertificate: uploadedDocSchema,
domicileCertificate: uploadedDocSchema,
boneDensityCertificate: uploadedDocSchema,
medicalCertificate: uploadedDocSchema,

})

export type AthleteRegistrationData = z.infer<typeof athleteRegistrationSchema>

// COACH FORM SCHEMA
export const coachRegistrationSchema = z.object({
  ...basePersonalInfoSchema.shape,
  aadhaar: aadhaarSchema,
  experience: z.string().min(10, "Please provide detailed experience (minimum 10 characters)"),
  experiencePdf: optionalUploadedDocSchema,
photo: uploadedDocSchema,
coachingAffidavit: uploadedDocSchema,

})

export type CoachRegistrationData = z.infer<typeof coachRegistrationSchema>

// ACADEMY FORM SCHEMA
export const academyRegistrationSchema = z.object({
  academyName: z.string().min(2, "Academy name must be at least 2 characters"),
  address: z.string().min(10, "Please provide complete address"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  gstin: z.string().optional(),
  dbaMembershipNumber: z.string().min(1, "DBA membership number is required"),
  membershipStartDate: z.string().min(1, "Membership start date is required"),
})

export type AcademyRegistrationData = z.infer<typeof academyRegistrationSchema>

// Payment amounts
export const REGISTRATION_FEES = {
  athlete: 500,
  coach: 1000,
  academy: 2000,
} as const

// Generate mock transaction ID
export function generateTransactionId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `DBA${timestamp}${random}`.toUpperCase()
}

// Format currency for India
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
