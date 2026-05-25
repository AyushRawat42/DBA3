import { z } from "zod"

const PHONE_REGEX = /^[6-9]\d{9}$/

const optionalString = (message: string) =>
  z.preprocess(
    (value) => {
      if (typeof value === "string" && value.trim() === "") {
        return undefined
      }
      return value
    },
    z.string().min(1, message).optional()
  )

const optionalEmail = z.preprocess(
  (value) => {
    if (typeof value === "string" && value.trim() === "") {
      return undefined
    }
    return value
  },
  z.string().email("Invalid email address").optional()
)

const optionalPhone = z.preprocess(
  (value) => {
    if (typeof value === "string" && value.trim() === "") {
      return undefined
    }
    return value
  },
  z.string().regex(PHONE_REGEX, "Invalid Indian mobile number").optional()
)

export const sportsRegistrationSchema = z.object({
  studentFullName: z.string().min(2, "Student full name is required"),
  parentGuardianName: z.string().min(2, "Parent or guardian name is required"),
  mobile: z.string().regex(PHONE_REGEX, "Mobile number must be valid"),
  alternateMobile: optionalPhone,
  email: optionalEmail,
  age: z.number().int().min(3, "Please enter a valid age").max(100, "Please enter a valid age"),
  city: z.string().min(2, "City is required"),
  sportInterestedIn: z.enum([
    "Badminton",
    "Air Rifle / Pistol Shooting",
    "Swimming",
    "Roller Skating",
    "Pickleball",
    "Boxing",
  ]),
  preferredBatchTiming: z.string().min(2, "Please choose a preferred batch or timing"),
  previousExperience: optionalString(""),
  message: optionalString(""),
  consent: z.boolean().refine((value) => value, "You must agree to the terms to continue"),
})

export type SportsRegistrationData = z.infer<typeof sportsRegistrationSchema>

export const coachingRegistrationSchema = z.object({
  studentFullName: z.string().min(2, "Student full name is required"),
  parentGuardianName: z.string().min(2, "Parent or guardian name is required"),
  mobile: z.string().regex(PHONE_REGEX, "Mobile number must be valid"),
  alternateMobile: optionalPhone,
  email: optionalEmail,
  currentClass: z.string().min(1, "Class or current standard is required"),
  city: z.string().min(2, "City is required"),
  courseInterestedIn: z.enum([
    "NDA / CDS / OTA / AFCAT",
    "Sainik School / RIMC / RMS CET",
    "Sports Coaching & Fitness",
  ]),
  schoolName: optionalString(""),
  message: optionalString(""),
  consent: z.boolean().refine((value) => value, "You must agree to the terms to continue"),
})

export type CoachingRegistrationData = z.infer<typeof coachingRegistrationSchema>

const uploadedDocSchema = z.string().min(1, "Please upload a file")

export const athleteRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(PHONE_REGEX, "Invalid Indian mobile number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
  educationalQualification: z.string().min(1, "Educational qualification is required"),
  photo: uploadedDocSchema,
  birthCertificate: uploadedDocSchema,
  domicileCertificate: uploadedDocSchema,
  boneDensityCertificate: uploadedDocSchema,
  medicalCertificate: uploadedDocSchema,
})

export type AthleteRegistrationData = z.infer<typeof athleteRegistrationSchema>

export const coachRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(PHONE_REGEX, "Invalid Indian mobile number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
  experience: z.string().min(10, "Please describe your experience"),
  photo: uploadedDocSchema,
  coachingAffidavit: uploadedDocSchema,
  experiencePdf: z.string().optional(),
})

export type CoachRegistrationData = z.infer<typeof coachRegistrationSchema>

export const academyRegistrationSchema = z.object({
  academyName: z.string().min(2, "Academy name is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(PHONE_REGEX, "Invalid Indian mobile number"),
  address: z.string().min(5, "Address is required"),
  gstin: z.string().optional(),
  dbaMembershipNumber: z.string().min(1, "DBA membership number is required"),
  membershipStartDate: z.string().min(1, "Membership start date is required"),
  academyCertificate: uploadedDocSchema,
})

export type AcademyRegistrationData = z.infer<typeof academyRegistrationSchema>

export const REGISTRATION_FEES = {
  athlete: 500,
  coach: 1000,
  academy: 2500,
} as const

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}
