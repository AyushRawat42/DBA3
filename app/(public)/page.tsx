import Link from "next/link"
import { Hero } from "@/components/hero"
import { HomeImageCarousel } from "@/components/home/home-image-carousel"
import { PageImage } from "@/components/page-image"
import { Card } from "@/components/ui/card"
import { pageImages } from "@/lib/page-images"
import { ArrowRight } from "lucide-react"

const offerings = [
  {
    title: "Aspire Sports Academy",
    description: "Specialized coaching in badminton, swimming, skating, and more for young athletes.",
    href: "/sports-academy",
    image: pageImages.homepage.offerings.sports,
    thumb: pageImages.homepage.offerings.sportsThumb,
    alt: "Young athletes at Aspire Sports Academy",
  },
  {
    title: "Aspire Defence Academy",
    description: "Entrance coaching and interview readiness for NDA, Sainik School, CDS, and defence exams.",
    href: "/defence-academy",
    image: pageImages.homepage.offerings.defence,
    thumb: pageImages.homepage.offerings.defenceThumb,
    alt: "Defence coaching aspirants at Aspire Defence Academy",
  },
]

const programs = [
  {
    title: "Badminton",
    price: "₹2000/month",
    packageLabel: "Monthly coaching package.",
  },
  {
    title: "Air Rifle / Pistol Shooting",
    price: "₹3500/month",
    packageLabel: "Monthly coaching package.",
  },
  {
    title: "25m Pistol Shooting",
    price: "₹5000/month",
    packageLabel: "3 days/week program.",
  },
  {
    title: "Swimming",
    price: "₹2500/month",
    packageLabel: "Monthly coaching package.",
  },
  {
    title: "Roller Skating",
    price: "₹1800/month",
    packageLabel: "Monthly coaching package.",
  },
  {
    title: "Pickleball",
    price: "₹1200/month",
    packageLabel: "Monthly coaching package.",
  },
  {
    title: "Boxing",
    price: "₹1650/month",
    packageLabel: "Monthly coaching package.",
  },
  {
    title: "Cricket",
    price: "Charged per hour",
    packageLabel: "Outdoor turf coaching sessions.",
  },
]

const defencePrograms = [
  {
    title: "NDA / CDS / OTA / AFCAT",
    packageLabel: "Crash course for entrance exam preparation.",
    prices: ["₹25000 for 5 months", "₹6000/month"],
  },
  {
    title: "Sainik School / RIMC / RMS CET",
    packageLabel: "Integrated tutoring for school courses and defence entrance exams.",
    prices: ["₹3150/month"],
  },
  {
    title: "NDA Foundation Course (Classes 11 & 12)",
    packageLabel: "Integrated tutoring for school courses and NDA entrance exam.",
    prices: ["₹3500/month"],
  },
]

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Aspire Academy</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Two academies, one mission: empower the next generation.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Discover premium sports coaching and defence admissions training shaped for athletes, students, and aspirants.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {offerings.map((item) => {
            return (
              <Link key={item.title} href={item.href} className="group">
                <Card className="h-full overflow-hidden border border-border p-0 transition hover:-translate-y-1 hover:shadow-lg">
                  <PageImage
                    src={item.image}
                    alt={item.alt}
                    aspectRatio="16 / 9"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-none"
                  />
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-secondary">
                        <img src={item.thumb} alt={item.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-secondary">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learn more <ArrowRight size={16} />
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="bg-muted/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HomeImageCarousel images={pageImages.homepage.trustGallery} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-1">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Programs</p>
            <h2 className="mt-4 text-3xl font-bold">Top monthly offerings for sports aspirants.</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Choose the program that fits your energy, interests, and training schedule.
            </p>
            <PageImage
              src={pageImages.homepage.programsSports}
              alt="Sports coaching session at Aspire Sports Academy"
              aspectRatio="4 / 3"
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="mt-6 rounded-2xl border border-border shadow-sm"
            />
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {programs.map((program) => (
              <Card key={program.title} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-secondary">{program.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{program.packageLabel}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
                    {program.price}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-1">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Programs</p>
            <h2 className="mt-4 text-3xl font-bold">Comprehensive defence admission courses.</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Prepare for your defence entrance exams with structured courses designed for success.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-start">
              <PageImage
                src={pageImages.homepage.programsDefence}
                alt="Colonel Manoj Singh Raghav, defence mentor at Aspire Defence Academy"
                aspectRatio="3 / 4"
                sizes="(max-width: 768px) 100vw, 16vw"
                className="rounded-2xl border border-border bg-muted/40 shadow-sm"
                imageClassName="object-contain"
              />
              <div className="min-w-0">
                <h3 className="text-2xl font-bold text-secondary sm:text-3xl">Colonel Manoj Singh Raghav</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Brings the experience, discipline, and guidance students need to prepare confidently for SSB interviews. As their mentor, he will help them develop the right mindset, communication, and officer-like qualities required to succeed.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {defencePrograms.map((program) => (
              <Card key={program.title} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-secondary">{program.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{program.packageLabel}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {program.prices.map((price, index) => (
                      <div key={price} className="flex flex-col items-end gap-1">
                        {index > 0 && (
                          <span className="text-xs font-medium text-muted-foreground">or</span>
                        )}
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                          {price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Director's Note</p>
              <h2 className="text-3xl font-bold">Major (Retd) Harish Singh Kundwal</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Major (Retd) Harish Singh Kundwal is the Founder and Director of Aspire Sports Academy and Aspire Defence Academy, Dehradun. A disciplined leader, mentor, and sports promoter, he is dedicated to shaping the youth of India through sports, education, fitness, and defence-oriented training.
                </p>
                <p>
                  With a strong defence background and passion for nation-building, Major Harish Singh Kundwal believes that true success is built on discipline, consistency, physical fitness, mental strength, and leadership. His vision is to create an environment where students and athletes can grow not only as competitors, but also as confident and responsible citizens.
                </p>
                <p>
                  Under his leadership, Aspire Sports Academy has developed into a multi-sports platform that promotes Olympic sports, fitness culture, and professional coaching in disciplines such as shooting, boxing, swimming, cricket, badminton, roller skating, and pickleball. At the same time, Aspire Defence Academy has guided numerous students toward careers in the Armed Forces through NDA, CDS, AFCAT, SSB, and foundation coaching programs.
                </p>
                <p>Major Kundwal is especially known for:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Promoting discipline through sports and defence education</li>
                  <li>Encouraging youth participation in Olympic sports</li>
                  <li>Supporting grassroots athlete development</li>
                  <li>Creating structured training systems for students and players</li>
                  <li>Mentoring young aspirants with leadership and motivational guidance</li>
                  <li>Combining physical fitness with academic and personality development</li>
                </ul>
                <p>His mission is simple yet powerful:</p>
                <p className="font-medium text-foreground">
                  &ldquo;Build strong bodies, disciplined minds, and future leaders for the nation.&rdquo;
                </p>
                <p>
                  Through Aspire Sports Academy and Aspire Defence Academy, Major (Retd) Harish Singh Kundwal continues to inspire young athletes and defence aspirants to dream bigger, work harder, and serve the nation with pride and dedication.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
              <PageImage
                src={pageImages.homepage.director}
                alt="Major (Retd) Harish Singh Kundwal, Founder and Director of Aspire Academy"
                aspectRatio="4 / 5"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-4xl border border-border bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Ready to apply?</p>
              <h2 className="mt-4 text-3xl font-bold">Start your journey with Aspire Academy.</h2>
            </div>
            <div className="space-y-3">
              <Link href="/sports-registration" className="block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-primary/90">
                Join Sports Academy
              </Link>
              <Link href="/coaching-registration" className="block rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-muted">
                Join Defence Academy
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PageImage
                src={pageImages.homepage.cta.sports}
                alt="Aspire Sports Academy training"
                aspectRatio="3 / 2"
                sizes="(max-width: 1024px) 50vw, 15vw"
                className="rounded-2xl border border-border shadow-sm"
              />
              <PageImage
                src={pageImages.homepage.cta.defence}
                alt="Aspire Defence Academy coaching"
                aspectRatio="3 / 2"
                sizes="(max-width: 1024px) 50vw, 15vw"
                className="rounded-2xl border border-border shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
