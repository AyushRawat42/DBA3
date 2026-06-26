import { imagePath, imageFolders, type GalleryImage } from "@/lib/page-images"

function sportsImage(file: string, alt: string): GalleryImage {
  return { src: imagePath(imageFolders.sports, file), alt }
}

export const SPORTS_PRIMARY_CTA = {
  href: "/sports-registration",
  label: "Register for Sports Admission",
} as const

export const sportsPrograms = [
  {
    title: "Badminton",
    price: "₹2000/month",
    tagline: "Court coaching, footwork drills & match play",
    image: sportsImage("DSC02629.jpg", "Badminton coaching at Aspire Sports Academy"),
  },
  {
    title: "10m Air Rifle / Pistol Shooting",
    price: "₹3500/month",
    tagline: "Precision training on a professional indoor range",
    image: sportsImage("DSC02643.jpg", "Air rifle shooting practice at Aspire Sports Academy"),
  },
  {
    title: "Swimming",
    price: "₹2500/month",
    tagline: "Stroke technique, pool fitness & water safety",
    image: sportsImage("DSC02435.jpg", "Swimming coaching at Aspire Sports Academy"),
  },
  {
    title: "Roller Skating",
    price: "₹1800/month",
    tagline: "Balance, agility & coached obstacle training",
    image: sportsImage("DSC02527.jpg", "Roller skating lesson at Aspire Sports Academy"),
  },
  {
    title: "Pickleball",
    price: "₹1200/month",
    tagline: "Fun racket sport for all skill levels",
    image: sportsImage("pckball.jpeg", "Pickleball training at Aspire Sports Academy"),
  },
  {
    title: "Boxing",
    price: "₹1650/month",
    tagline: "Fitness, discipline & coached sparring",
    image: sportsImage("DSC02846.jpg", "Boxing coaching at Aspire Sports Academy"),
  },
  {
    title: "Cricket",
    price: "Charged per hour",
    tagline: "Batting, bowling & fielding on outdoor turf",
    image: sportsImage("DSC02984.jpg", "Cricket practice at Aspire Sports Academy"),
  },
] as const

export const sportsFeatures = [
  {
    title: "Modern coaching labs",
    description: "Tailored training for badminton, swimming, roller skating, and more.",
  },
  {
    title: "Performance tracking",
    description: "Regular skill assessments to help athletes improve quickly.",
  },
  {
    title: "Holistic development",
    description: "Fitness, nutrition, and confidence-building support.",
  },
] as const

export const sportsTrustStats = [
  { value: "7", label: "Sports programs" },
  { value: "₹1200+", label: "Monthly packages from" },
  { value: "Dehradun", label: "Campus location" },
] as const

export const sportsHero = {
  primary: sportsImage("DSC02616.jpg", "Indoor badminton courts at Aspire Sports Academy"),
  accentTop: sportsImage("DSC02465.jpg", "Swimming coaching at Aspire Sports Academy"),
  accentBottom: sportsImage("DSC02732.jpg", "Boxing training at Aspire Sports Academy"),
} as const

export const sportsBenefitsImage = sportsImage(
  "DSC02671.jpg",
  "Professional shooting range coaching at Aspire Sports Academy",
)

export const sportsProofSections = [
  {
    id: "badminton",
    eyebrow: "Court sports",
    title: "Badminton training that builds match-ready athletes",
    description:
      "Dedicated indoor courts, coached rallies, and structured sessions for beginners through competitive players.",
    images: [
      sportsImage("DSC02564.jpg", "Young badminton player training at Aspire Sports Academy"),
    ],
    layout: "single" as const,
  },
  {
    id: "shooting",
    eyebrow: "Precision sports",
    title: "10m air rifle & pistol coaching on a professional range",
    description:
      "Supervised lane training, equipment support, and focus drills in a safe indoor shooting environment.",
    images: [
      sportsImage("DSC02653.jpg", "Competitive air rifle training at Aspire Sports Academy"),
      sportsImage("DSC02637.jpg", "Indoor shooting range at Aspire Sports Academy"),
      sportsImage("DSC02655.jpg", "Youth shooting practice at Aspire Sports Academy"),
      sportsImage("DSC02675.jpg", "Shooting coaching session at Aspire Sports Academy"),
    ],
    layout: "grid" as const,
  },
  {
    id: "swimming",
    eyebrow: "Aquatics",
    title: "Swimming with hands-on coaching in a covered pool",
    description:
      "Stroke correction, water confidence, and fitness training with instructors in the water alongside students.",
    images: [
      sportsImage("DSC02416.jpg", "Indoor swimming pool at Aspire Sports Academy"),
      sportsImage("DSC02437.jpg", "One-on-one swimming lesson at Aspire Sports Academy"),
      sportsImage("DSC02438.jpg", "Swimming stroke demonstration at Aspire Sports Academy"),
    ],
    layout: "grid" as const,
  },
  {
    id: "skating",
    eyebrow: "Movement & agility",
    title: "Roller skating with safety-first, coached progression",
    description:
      "Helmets, pads, obstacle drills, and patient instruction — ideal for young athletes building balance and confidence.",
    images: [
      sportsImage("DSC02511.jpg", "Roller skating class at Aspire Sports Academy"),
      sportsImage("DSC02476.jpg", "Skating team huddle at Aspire Sports Academy"),
      sportsImage("DSC02473.jpg", "Skating coach instructing students at Aspire Sports Academy"),
      sportsImage("DSC02545.jpg", "Youth roller skating practice at Aspire Sports Academy"),
    ],
    layout: "grid" as const,
  },
  {
    id: "boxing",
    eyebrow: "Combat fitness",
    title: "Boxing that builds discipline, stamina & confidence",
    description:
      "Bag work, pad drills, and coached group sessions in a fully equipped boxing gym for youth and teens.",
    images: [
      sportsImage("DSC02686.jpg", "Boxing sparring at Aspire Sports Academy"),
      sportsImage("DSC02819.jpg", "Boxing ring training at Aspire Sports Academy"),
      sportsImage("DSC02853.jpg", "Boxing coach guiding a student at Aspire Sports Academy"),
      sportsImage("DSC02941.jpg", "Girls boxing class at Aspire Sports Academy"),
      sportsImage("DSC02785.jpg", "Group boxing workout at Aspire Sports Academy"),
      sportsImage("DSC02694.jpg", "Youth boxing training at Aspire Sports Academy"),
    ],
    layout: "bento" as const,
  },
] as const

export const sportsPanoramic = sportsImage(
  "DSC02950-HDR.jpg",
  "Outdoor sports turf at Aspire Sports Academy in Dehradun",
)

export const sportsLifeCarousel: GalleryImage[] = [
  sportsImage("DSC02728.jpg", "Boxing class in session at Aspire Sports Academy"),
  sportsImage("DSC02830.jpg", "Boxing ring coaching at Aspire Sports Academy"),
  sportsImage("DSC02882.jpg", "Youth boxing training at Aspire Sports Academy"),
  sportsImage("DSC02634.jpg", "Young boxer at Aspire Sports Academy"),
  sportsImage("DSC02714.jpg", "Boxing pad work at Aspire Sports Academy"),
  sportsImage("DSC02973.jpg", "Outdoor cricket turf training at Aspire Sports Academy"),
  sportsImage("DSC02525.jpg", "Roller skating obstacle training at Aspire Sports Academy"),
]
