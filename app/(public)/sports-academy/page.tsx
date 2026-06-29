import Link from "next/link"
import { PageImage } from "@/components/page-image"
import { Card } from "@/components/ui/card"
import { SportsCtaButton } from "@/components/sports-academy/sports-cta-button"
import { SportsMarquee } from "@/components/sports-academy/sports-marquee"
import { SportsLifeCarousel } from "@/components/sports-academy/sports-life-carousel"
import {
  sportsPrograms,
  sportsFeatures,
  sportsTrustStats,
  sportsHero,
  sportsBenefitsImage,
  sportsProofSections,
  sportsPanoramic,
  sportsLifeCarousel,
} from "@/lib/sports-academy-content"
import { Trophy, Zap, Shield, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const featureIcons = [Trophy, Zap, Shield] as const

export default function SportsAcademyPage() {
  return (
    <main className="bg-background text-foreground">
      {/* 1. Hero — value proposition + primary CTA above the fold */}
      <section className="relative overflow-hidden bg-linear-to-br from-secondary via-secondary to-primary text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-20">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/75">Aspire Sports Academy</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
              Train like a champion. Start with the right program today.
            </h1>
            <p className="max-w-xl text-lg text-white/85">
              Structured coaching across seven sports — badminton, shooting, swimming, skating, pickleball, boxing, and
              cricket. Professional facilities, monthly packages, and admissions support in Dehradun.
            </p>
            <div className="flex flex-wrap gap-3">
              {["8 programs", "Monthly packages", "Coached sessions"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm"
                >
                  <CheckCircle2 size={14} className="text-primary" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <SportsCtaButton className="shadow-lg shadow-primary/25" />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Ask Admissions
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[4/3] w-full">
              <PageImage
                src={sportsHero.primary.src}
                alt={sportsHero.primary.alt}
                aspectRatio="4 / 3"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 rounded-3xl border border-white/20 bg-white/10 shadow-2xl"
                imageClassName="object-contain"
              />
              <div className="absolute -left-4 top-8 w-[38%] overflow-hidden rounded-2xl border border-white/20 shadow-xl sm:-left-8 sm:w-[34%]">
                <PageImage
                  src={sportsHero.accentTop.src}
                  alt={sportsHero.accentTop.alt}
                  aspectRatio="3 / 4"
                  sizes="20vw"
                  className="rounded-2xl"
                />
              </div>
              <div className="absolute -right-3 bottom-10 w-[36%] overflow-hidden rounded-2xl border border-white/20 shadow-xl sm:-right-6 sm:w-[32%]">
                <PageImage
                  src={sportsHero.accentBottom.src}
                  alt={sportsHero.accentBottom.alt}
                  aspectRatio="3 / 4"
                  sizes="20vw"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SportsMarquee />

      {/* 2. Programs & monthly packages — core conversion content near the top */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="programs">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Programs & pricing</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Choose your coaching program</h2>
          <p className="mt-4 text-muted-foreground">
            Eight programs. Monthly packages for most — cricket is charged per hour. Pick what fits your goals and register
            in minutes.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sportsPrograms.map((program) => (
            <Card key={program.title} className="overflow-hidden border border-border p-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <PageImage
                src={program.image.src}
                alt={program.image.alt}
                aspectRatio="16 / 10"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="rounded-none"
              />
              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug text-secondary">{program.title}</h3>
                  <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white sm:text-sm">
                    {program.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{program.tagline}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <SportsCtaButton />
          <p className="text-sm text-muted-foreground">Admissions team responds within 1–2 business days.</p>
        </div>
      </section>

      {/* Trust stats bar */}
      <section className="border-y border-border bg-muted/50 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {sportsTrustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-secondary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Benefits / highlights */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Why Aspire Sports</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Coaching built for progress, not just participation</h2>
            <p className="mt-4 text-muted-foreground">
              Every program combines structured sessions, coached feedback, and a training environment designed to help
              young athletes improve with confidence.
            </p>
            <div className="mt-8 grid gap-4">
              {sportsFeatures.map((feature, index) => {
                const Icon = featureIcons[index]
                return (
                  <div key={feature.title} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={20} aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <PageImage
            src={sportsBenefitsImage.src}
            alt={sportsBenefitsImage.alt}
            aspectRatio="3 / 2"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-3xl border border-border bg-muted/40 shadow-lg"
            imageClassName="object-contain"
          />
        </div>
      </section>

      {/* 3. Sports proof sections — real training imagery by discipline */}
      {sportsProofSections.map((section, sectionIndex) => (
        <section
          key={section.id}
          className={cn(
            "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
            sectionIndex % 2 === 1 && "bg-muted/40",
          )}
        >
          <div className="mb-8 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">{section.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{section.title}</h2>
            <p className="mt-4 text-muted-foreground">{section.description}</p>
          </div>

          {section.layout === "single" ? (
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <PageImage
                src={section.images[0].src}
                alt={section.images[0].alt}
                aspectRatio="4 / 5"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-3xl border border-border shadow-md"
              />
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Real coached sessions on dedicated indoor courts — the same environment your child trains in after
                  admission.
                </p>
                <SportsCtaButton />
              </div>
            </div>
          ) : null}

          {section.layout === "grid" ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {section.images.map((image, imageIndex) => (
                <PageImage
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  aspectRatio={imageIndex === 0 ? "4 / 5" : "1 / 1"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={cn(
                    "rounded-2xl border border-border shadow-sm",
                    imageIndex === 0 && "sm:row-span-2 sm:aspect-auto sm:h-full",
                  )}
                />
              ))}
            </div>
          ) : null}

          {section.layout === "bento" ? (
            <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4">
              {section.images.map((image, imageIndex) => (
                <PageImage
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  aspectRatio="auto"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={cn(
                    "h-full rounded-2xl border border-border shadow-sm",
                    imageIndex === 0 && "col-span-2 row-span-2",
                    imageIndex === 3 && "col-span-2 row-span-1",
                  )}
                />
              ))}
            </div>
          ) : null}
        </section>
      ))}

      {/* 5. Mid-page CTA */}
      <section className="bg-secondary py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">Ready to start?</p>
          <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">
            Secure your spot in the program that fits your athlete&apos;s goals
          </h2>
          <p className="max-w-xl text-white/80">
            Tell us which sport you&apos;re interested in — our admissions team will guide you to the right monthly
            package and next steps.
          </p>
          <SportsCtaButton className="shadow-lg shadow-primary/30" />
        </div>
      </section>

      {/* Facility panoramic */}
      <section className="relative w-full">
        <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[21/8]">
          <PageImage
            src={sportsPanoramic.src}
            alt={sportsPanoramic.alt}
            aspectRatio="auto"
            sizes="100vw"
            className="h-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-secondary/85 via-secondary/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="max-w-md text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Our grounds</p>
              <h2 className="mt-3 max-w-lg text-3xl font-bold text-white sm:text-4xl">
                Indoor labs and outdoor turf — training spaces built for variety
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Academy life carousel */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Life at the academy</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Real sessions. Real athletes. Real progress.</h2>
          <p className="mt-4 text-muted-foreground">
            A glimpse into daily training across boxing, skating, swimming, and outdoor sports at Aspire.
          </p>
        </div>
        <SportsLifeCarousel images={sportsLifeCarousel} />
      </section>

      {/* 6. Closing CTA / admissions prompt */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-4xl border border-border bg-white shadow-sm">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-5 p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Admissions open</p>
              <h2 className="text-3xl font-bold sm:text-4xl">Take the first step toward sports admission today</h2>
              <p className="text-muted-foreground">
                Register for badminton, swimming, skating, shooting, pickleball, boxing, or cricket. Our team will contact you
                with program details, schedules, and enrollment steps.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <SportsCtaButton />
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Contact Admissions
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-6 pt-0 lg:p-8 lg:pl-0">
              <PageImage
                src={sportsPrograms[0].image.src}
                alt={sportsPrograms[0].image.alt}
                aspectRatio="1 / 1"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="rounded-2xl border border-border shadow-sm"
              />
              <PageImage
                src={sportsPrograms[2].image.src}
                alt={sportsPrograms[2].image.alt}
                aspectRatio="1 / 1"
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="mt-8 rounded-2xl border border-border shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
