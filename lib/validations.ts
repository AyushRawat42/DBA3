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
  fullName: z.string().min(2, "Student full name is required"),
  parentName: z.string().min(2, "Parent or guardian name is required"),
  mobile: z.string().regex(PHONE_REGEX, "Mobile number must be valid"),
  alternateMobile: optionalPhone,
  email: optionalEmail,
  age: z.number().int().min(3, "Please enter a valid age").max(100, "Please enter a valid age"),
  city: z.string().min(2, "City is required"),
  sport: z.enum([
    "Badminton",
    "Air Rifle / Pistol Shooting",
    "Swimming",
    "Roller Skating",
    "Pickleball",
    "Boxing",
  ]),
  batchTiming: z.string().min(2, "Please choose a preferred batch or timing"),
  experience: optionalString("Please share experience or leave blank"),
  message: optionalString(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
})

export type SportsRegistrationData = z.infer<typeof sportsRegistrationSchema>

export const coachingRegistrationSchema = z.object({
  fullName: z.string().min(2, "Student full name is required"),
  parentName: z.string().min(2, "Parent or guardian name is required"),
  mobile: z.string().regex(PHONE_REGEX, "Mobile number must be valid"),
  alternateMobile: optionalPhone,
  email: optionalEmail,
  classStandard: z.string().min(1, "Class or current standard is required"),
  city: z.string().min(2, "City is required"),
  courseInterestedIn: z.enum([
    "NDA / CDS / OTA / AFCAT",
    "Sainik School / RIMC / RMS CET",
    "Sports Coaching & Fitness",
  ]),
  schoolName: optionalString(""),
  message: optionalString(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms to continue" }),
  }),
})

export type CoachingRegistrationData = z.infer<typeof coachingRegistrationSchema>

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
}
