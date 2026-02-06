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
const fileSchema = z.instanceof(File, { message: "Please upload a file" })

export const eventAthleteRegistrationSchema = z.object({
  ...basePersonalInfoSchema.shape,
  aadhaar: aadhaarSchema,
  educationalQualification: z
    .string()
    .min(1, "Educational qualification is required"),

  photo: fileSchema,
  birthCertificate: fileSchema,
  domicileCertificate: fileSchema,
  boneDensityCertificate: fileSchema,
  medicalCertificate: fileSchema,

  // New fields
  bloodReport: fileSchema,
  hivCertificate: fileSchema,
})

export type EventAthleteRegistrationData = z.infer<
  typeof eventAthleteRegistrationSchema
>
