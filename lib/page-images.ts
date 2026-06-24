export const imageFolders = {
  homepage: "homepage",
  about: "about",
  sports: "sports",
  coaching: "coaching",
} as const

export type GalleryImage = {
  src: string
  alt: string
}

export type ImageFolder = (typeof imageFolders)[keyof typeof imageFolders]

/** Build a public URL for a file under public/images/{folder}. */
export function imagePath(folder: ImageFolder, file: string): string {
  return `/images/${folder}/${encodeURIComponent(file)}`
}

function aboutImage(file: string, alt: string): GalleryImage {
  return { src: imagePath(imageFolders.about, file), alt }
}

export const pageImages = {
  homepage: {
    hero: imagePath(imageFolders.homepage, "DSC02822.jpg"),
    trustGallery: [
      {
        src: imagePath(imageFolders.homepage, "DSC02612.jpg"),
        alt: "Aspire Academy campus and training environment",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02528.jpg"),
        alt: "Students at Aspire Academy in Dehradun",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02956.jpg"),
        alt: "Aspire Academy facilities",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02870.jpg"),
        alt: "Training activities at Aspire Academy",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02429.jpg"),
        alt: "Athletes training at Aspire Academy",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02631.jpg"),
        alt: "Sports coaching at Aspire Academy",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02884.jpg"),
        alt: "Aspire Academy training grounds",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02970.jpg"),
        alt: "Campus life at Aspire Academy in Dehradun",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02416.jpg"),
        alt: "Students at Aspire Academy programs",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02649.jpg"),
        alt: "Aspire Academy coaching environment",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02524.jpg"),
        alt: "Aspire Academy student activities",
      },
      {
        src: imagePath(imageFolders.homepage, "DSC02478.jpg"),
        alt: "Aspire Academy campus overview",
      },
    ],
    offerings: {
      sports: imagePath(imageFolders.sports, "DSC02882.jpg"),
      sportsThumb: "/aspire-sports.jpeg",
      defence: imagePath(imageFolders.homepage, "IMG_5136.png"),
      defenceThumb: "/aspire-defence.jpeg",
    },
    programsSports: imagePath(imageFolders.sports, "DSC02629.jpg"),
    programsDefence: imagePath(imageFolders.homepage, "colMSRaghav.jpeg"),
    director: imagePath(imageFolders.coaching, "major-kundwal.jpg"),
    cta: {
      sports: imagePath(imageFolders.sports, "DSC02830.jpg"),
      defence: imagePath(imageFolders.coaching, "DSC02991.jpg"),
    },
  },
  about: {
    hero: {
      primary: aboutImage("DSC02891.jpg", "Athletes in action at Aspire Academy"),
      accentTop: aboutImage("DSC02699.jpg", "Training intensity at Aspire Academy"),
      accentBottom: aboutImage("DSC02700.jpg", "Student athletes pushing their limits"),
      side: aboutImage("DSC02932.jpg", "Sports energy on the Aspire Academy campus"),
    },
    trainingBento: [
      { ...aboutImage("DSC02430.jpg", "Coaching session at Aspire Academy"), layout: "col-span-2 row-span-2" },
      { ...aboutImage("DSC02611.jpg", "Athletes training together at Aspire"), layout: "col-span-1 row-span-1" },
      { ...aboutImage("DSC02652.jpg", "High-energy sports practice"), layout: "col-span-1 row-span-1" },
      { ...aboutImage("DSC02730.jpg", "On-field training at Aspire Academy"), layout: "col-span-1 row-span-2" },
      { ...aboutImage("DSC02879.jpg", "Sports drills and discipline"), layout: "col-span-1 row-span-1" },
      { ...aboutImage("DSC02921.jpg", "Team training atmosphere"), layout: "col-span-2 row-span-1" },
      { ...aboutImage("DSC02948.jpg", "Active coaching on the grounds"), layout: "col-span-1 row-span-1" },
      { ...aboutImage("DSC02957.jpg", "Athletic development at Aspire"), layout: "col-span-1 row-span-1" },
    ],
    panoramic: aboutImage("DSC02977.jpg", "Panoramic view of Aspire Academy training grounds"),
    studentLife: [
      aboutImage("DSC02626.jpg", "Student life and camaraderie at Aspire"),
      aboutImage("DSC02630.jpg", "Campus moments between training sessions"),
      aboutImage("DSC02788.jpg", "Young athletes building confidence"),
      aboutImage("DSC02794.jpg", "The everyday energy of academy life"),
    ],
    championships: [
      aboutImage("WhatsApp Image 2026-05-29 at 3.32.42 PM.jpeg", "Shooting championship podium winner at Aspire"),
      aboutImage("WhatsApp Image 2026-05-29 at 3.33.40 PM.jpeg", "Uttarakhand State Shooting Championship prize ceremony"),
      aboutImage("DSC02513.jpg", "Competitive shooting excellence"),
      aboutImage("DSC02521.jpg", "Athletes celebrating achievement"),
      aboutImage("DSC02544.jpg", "Championship pride at Aspire Academy"),
    ],
    excellence: {
      defence: aboutImage("IMG_5137.jpg", "Aspire Defence Academy leadership and mentorship"),
      classroom: aboutImage("IMG_5126.jpg", "Focused classroom learning at Aspire Academy"),
      campus: aboutImage("IMG_5129.jpg", "Aspire Academy campus environment"),
      discipline: aboutImage("DSC02447.jpg", "Discipline and focus in training"),
      atmosphere: aboutImage("DSC02840.jpg", "The aspirational spirit of Aspire Academy"),
      growth: aboutImage("DSC02963.jpg", "Moments of growth at Aspire Academy"),
    },
    carousel: [
      aboutImage("DSC02442.jpg", "Training grounds at Aspire Academy"),
      aboutImage("DSC02444.jpg", "Sports facilities in Dehradun"),
      aboutImage("DSC02471.jpg", "Athletes on the move"),
      aboutImage("DSC02621.jpg", "Coaching in progress"),
      aboutImage("DSC02639.jpg", "Student athletes in session"),
      aboutImage("DSC02661.jpg", "Active sports training"),
      aboutImage("DSC02663.jpg", "Academy training environment"),
      aboutImage("DSC02898.jpg", "Energy and movement at Aspire"),
      aboutImage("DSC02797.jpg", "Campus training atmosphere"),
      aboutImage("DSC02992.jpg", "Life at Aspire Academy"),
    ],
  },
} as const

export type BentoImage = GalleryImage & { layout: string }

export function getAboutGalleryAll(): GalleryImage[] {
  const { hero, trainingBento, panoramic, studentLife, championships, excellence, carousel } = pageImages.about
  return [
    hero.primary,
    hero.accentTop,
    hero.accentBottom,
    hero.side,
    ...trainingBento.map(({ src, alt }) => ({ src, alt })),
    panoramic,
    ...studentLife,
    ...championships,
    ...Object.values(excellence),
    ...carousel,
  ]
}
