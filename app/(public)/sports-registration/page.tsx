import Link from "next/link"
import { AthleteRegistrationForm } from "@/components/athlete-registration-form"
import { PageImage } from "@/components/page-image"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, Shield, Trophy, Users, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

const sportsFormImages = {
  heroPrimary: {
    src: "/images/sports-form/DSC02804.jpg",
    alt: "Athletes training with energy at Aspire Sports Academy",
  },
  heroAccent: {
    src: "/images/sports-form/DSC02445.jpg",
    alt: "Coached sports session at Aspire Sports Academy",
  },
  formSupport: {
    src: "/images/sports-form/DSC02638.jpg",
    alt: "Aspire Sports Academy training environment in Dehradun",
  },
  proof: [
    {
      src: "/images/sports-form/DSC02976.jpg",
      alt: "Student athletes in action at Aspire Sports Academy",
      layout: "col-span-2 row-span-2",
    },
    {
      src: "/images/sports-form/DSC02498.jpg",
      alt: "Sports coaching and skill development at Aspire",
      layout: "col-span-1 row-span-1",
    },
    {
      src: "/images/sports-form/DSC02610.jpg",
      alt: "Active training on Aspire Sports Academy grounds",
      layout: "col-span-1 row-span-1",
    },
  ],
} as const

const trustPoints = [
  "7 coached sports programs in Dehradun",
  "Structured monthly training packages",
  "Personalized batch placement after review",
] as const

const benefits = [
  {
    icon: Trophy,
    title: "Champion-grade coaching",
    description: "Expert-led sessions across badminton, shooting, swimming, skating, pickleball, and boxing.",
  },
  {
    icon: Zap,
    title: "Built for active growth",
    description: "Skill drills, fitness, and match play designed to push athletes at every level.",
  },
  {
    icon: Shield,
    title: "Trusted admissions support",
    description: "Our team guides you from enquiry to the right program and batch timing.",
  },
] as const

export default function SportsRegistrationPage() {
  return (
    <main className="bg-background text-foreground">
      {/* 1. Hero — one clear goal, compact so the form stays high */}
      <section className="relative overflow-hidden bg-linear-to-br from-secondary via-secondary to-primary text-white">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-16">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/75">
              Aspire Sports Academy · Admissions 2026
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.1rem] lg:leading-tight">
              Secure your spot. Start training with the best.
            </h1>
            <p className="max-w-xl text-lg text-white/85">
              One short application is all it takes to join structured coaching, modern facilities, and a
              championship-minded academy in Dehradun.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {trustPoints.map((point) => (
                <span
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm"
                >
                  <CheckCircle2 size={14} className="shrink-0 text-primary" aria-hidden />
                  {point}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90"
              >
                Apply now — takes 2 minutes
              </a>
              <span className="inline-flex items-center gap-1.5 text-sm text-white/75">
                <Clock size={15} aria-hidden />
                Admissions team responds within 24–48 hrs
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[5/4] w-full sm:aspect-[6/5]">
              <PageImage
                src={sportsFormImages.heroPrimary.src}
                alt={sportsFormImages.heroPrimary.alt}
                aspectRatio="auto"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="absolute inset-0 rounded-3xl border border-white/20 shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-3 w-[42%] overflow-hidden rounded-2xl border border-white/25 shadow-xl sm:-left-5 sm:w-[38%]">
                <PageImage
                  src={sportsFormImages.heroAccent.src}
                  alt={sportsFormImages.heroAccent.alt}
                  aspectRatio="4 / 5"
                  sizes="22vw"
                  className="rounded-2xl"
                />
              </div>
              <div className="absolute -right-2 top-6 rounded-2xl border border-white/20 bg-secondary/90 px-4 py-3 shadow-xl backdrop-blur-sm sm:-right-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">Now enrolling</p>
                <p className="mt-0.5 text-lg font-bold">Sports admission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Form spotlight — focal point, placed immediately after hero */}
      <section
        id="apply"
        className="relative scroll-mt-24 border-b border-border/60 bg-linear-to-b from-muted/50 to-background"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Your application</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Complete the form below to apply
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Share student details and your preferred sport — we&apos;ll match you with the right coaching program.
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Trust sidebar — desktop only beside form; mobile appears after form */}
            <aside className="order-2 space-y-6 lg:order-1 lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-border/80 shadow-md">
                <PageImage
                  src={sportsFormImages.formSupport.src}
                  alt={sportsFormImages.formSupport.alt}
                  aspectRatio="4 / 3"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="rounded-2xl"
                />
              </div>
              <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold text-secondary">Why families choose Aspire</p>
                <ul className="space-y-3">
                  {[
                    { icon: Users, text: "Coached groups for beginners through competitive athletes" },
                    { icon: Shield, text: "Safe, structured training across six sports disciplines" },
                    { icon: Clock, text: "Flexible batch timings — morning, evening, and weekend" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon size={16} aria-hidden />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Form container — visually dominant */}
            <div className="order-1 lg:order-2 lg:col-span-3">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-px rounded-3xl bg-linear-to-br from-primary/25 via-accent/15 to-secondary/20 opacity-80 blur-[1px]"
                  aria-hidden
                />
                <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-card shadow-2xl shadow-primary/10 ring-1 ring-primary/10">
                  <div className="border-b border-border/70 bg-linear-to-r from-secondary/[0.04] to-primary/[0.06] px-5 py-4 sm:px-7 sm:py-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Step 1 of 1</p>
                        <p className="mt-1 text-sm font-medium text-foreground">Sports admission application</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <span className="relative flex size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                          <span className="relative inline-flex size-2 rounded-full bg-primary" />
                        </span>
                        Open for enrolment
                      </span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-5">
                    <AthleteRegistrationForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Supporting imagery — academy atmosphere & proof */}
      <section className="border-b border-border/60 bg-background py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Life at the academy</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Train where energy meets discipline
            </h2>
            <p className="mt-3 text-muted-foreground">
              Real coaching, real facilities, and a campus built for athletes who want to grow.
            </p>
          </div>

          <div className="mt-10 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[200px]">
            {sportsFormImages.proof.map((image) => (
              <div
                key={image.src}
                className={cn(
                  "overflow-hidden rounded-2xl border border-border/80 shadow-md transition hover:shadow-lg",
                  image.layout,
                )}
              >
                <PageImage
                  src={image.src}
                  alt={image.alt}
                  aspectRatio="auto"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="size-full rounded-2xl"
                  imageClassName="transition duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Short benefits */}
      <section className="bg-muted/40 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Why apply to Aspire Sports Academy</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Everything you need to start — in one admissions journey.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-border/80 bg-card p-6 shadow-sm">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Closing reinforcement — guide back to the form */}
      <section className="bg-secondary py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to join the academy?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Submit your application above and our admissions team will reach out with program details, batch
            options, and next steps.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90"
            >
              Back to application form
            </a>
            <Link
              href="/sports-academy"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Explore programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
