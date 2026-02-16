export type RegistrationType = "athlete" | "coach" | "academy"

export type DocType =
  | "photo"
  | "birthCertificate"
  | "domicileCertificate"
  | "boneDensityCertificate"
  | "medicalCertificate"
  | "coachingAffidavit"
  | "experiencePdf"

export const REQUIRED_DOCS: Record<RegistrationType, DocType[]> = {
  athlete: [
    "photo",
    "birthCertificate",
    "domicileCertificate",
    "boneDensityCertificate",
    "medicalCertificate",
  ],
  coach: ["photo", "coachingAffidavit"],
  academy: [],
}

export const OPTIONAL_DOCS: Record<RegistrationType, DocType[]> = {
  athlete: [],
  coach: ["experiencePdf"],
  academy: [],
}

// Optional: UI labels (so you don't hardcode text everywhere)
export const DOC_LABELS: Record<DocType, string> = {
  photo: "Passport-size photograph",
  birthCertificate: "Birth certificate (PDF)",
  domicileCertificate: "Domicile certificate (PDF)",
  boneDensityCertificate: "Bone density report (PDF)",
  medicalCertificate: "Medical fitness certificate (PDF)",
  coachingAffidavit: "Coaching affidavit (PDF)",
  experiencePdf: "Experience/achievements (PDF)",
}
