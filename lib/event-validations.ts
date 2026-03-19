import { z } from "zod"

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

const aadhaarSchema = z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits")

// Stored as S3 keys (strings) in the backend
const uploadedDocSchema = z.string().min(1, "Please upload a file")

export const eventAthleteRegistrationSchema = z.object({
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

  // New fields
  bloodReport: uploadedDocSchema,
  hivCertificate: uploadedDocSchema,
})

export type EventAthleteRegistrationData = z.infer<
  typeof eventAthleteRegistrationSchema
>
