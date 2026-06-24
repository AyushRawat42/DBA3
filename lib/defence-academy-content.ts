import { imagePath, imageFolders, type GalleryImage } from "@/lib/page-images"

function coachingImage(file: string, alt: string): GalleryImage {
  return { src: imagePath(imageFolders.coaching, file), alt }
}

export const DEFENCE_PRIMARY_CTA = {
  href: "/coaching-registration",
  label: "Apply for Defence Coaching",
} as const

export const defencePrograms = [
  {
    title: "NDA / CDS / OTA / AFCAT",
    price: "₹45000 for 5 months",
    tagline: "Written exam strategy, physical readiness planning, and SSB interview mentorship.",
    highlights: ["Structured syllabus coverage", "Mock tests & doubt sessions", "SSB preparation support"],
  },
  {
    title: "Sainik School / RIMC / RMS CET",
    price: "₹4500/month",
    tagline: "Focused coaching for school entrance exams with interview and medical guidance.",
    highlights: ["Age-appropriate syllabus", "Interview readiness", "Admission pathway support"],
  },
] as const

export const defenceTrustStats = [
  { value: "2", label: "Defence coaching tracks" },
  { value: "Officer-led", label: "Mentor guidance" },
  { value: "Dehradun", label: "Aspire campus" },
] as const

export const defenceHero = {
  primary: coachingImage(
    "DSC02992.jpg",
    "Aspire Defence Academy campus in Dehradun — defence entrance exam coaching",
  ),
  accent: coachingImage(
    "IMG_5126.jpg",
    "Structured classroom coaching at Aspire Defence Academy",
  ),
} as const

export const defenceMentors = [
  {
    name: "Major Harish Singh Kundwal",
    role: "Senior Defence Admissions Mentor",
    description:
      "Guides aspirants through defence entrance preparation with disciplined planning, exam strategy, and the officer-like mindset required for NDA, CDS, and related pathways.",
    image: coachingImage(
      "major-kundwal.jpg",
      "Major Harish Singh Kundwal, senior defence admissions mentor at Aspire Defence Academy",
    ),
  },
  {
    name: "Colonel Manoj Singh Raghav",
    role: "SSB Interview Mentor",
    description:
      "Brings decades of service experience to SSB interview coaching — helping students build communication, leadership presence, and the qualities assessors look for.",
    image: coachingImage(
      "colMSRaghav.jpeg",
      "Colonel Manoj Singh Raghav, SSB interview mentor at Aspire Defence Academy",
    ),
  },
] as const

export const defencePillars = [
  {
    title: "Written exam coaching",
    description: "Focused classes for NDA, CDS, OTA, AFCAT, and school entrance syllabi.",
  },
  {
    title: "SSB & interview training",
    description: "Officer-led guidance on communication, psychology, and interview performance.",
  },
  {
    title: "Structured admission support",
    description: "Clear pathways for Sainik School, RIMC, RMS, and defence academy entry.",
  },
] as const

type DefenceProofImage = GalleryImage & {
  caption: string
  layout: "large" | "standard"
  imageClassName?: string
}

export const defenceProofGallery: DefenceProofImage[] = [
  {
    ...coachingImage(
      "IMG_5126.jpg",
      "Disciplined classroom environment for defence entrance coaching",
    ),
    caption: "Focused classroom sessions",
    layout: "large",
  },
  {
    ...coachingImage(
      "DSC02991.jpg",
      "Students preparing for defence entrance exams at Aspire Defence Academy",
    ),
    caption: "Coached preparation environment",
    layout: "standard",
  },
  {
    ...coachingImage(
      "IMG_5137.jpg",
      "SSB interview guidance led by Aspire Defence Academy mentors",
    ),
    caption: "SSB interview mentorship",
    layout: "standard",
  },
  {
    ...coachingImage(
      "IMG_5135.jpg",
      "Sainik School, RIMC, and RMS entrance exam guidance at Aspire Defence Academy",
    ),
    caption: "School entrance exam pathways",
    layout: "standard",
    imageClassName: "object-contain bg-muted/30",
  },
]
