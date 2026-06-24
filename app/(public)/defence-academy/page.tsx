import Link from "next/link"
import { PageImage } from "@/components/page-image"
import { Card } from "@/components/ui/card"
import { DefenceCtaButton } from "@/components/defence-academy/defence-cta-button"
import {
  defencePrograms,
  defenceTrustStats,
  defenceHero,
  defenceMentors,
  defencePillars,
  defenceProofGallery,
} from "@/lib/defence-academy-content"
import { BookOpen, CheckCircle2, Shield, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const pillarIcons = [BookOpen, Users, Shield] as const

export default function DefenceAcademyPage() {
  return (
    <main className="bg-background text-foreground">
      {/* 1. Hero — value proposition + primary CTA above the fold */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,31,61,1)_0%,rgba(10,31,61,0.92)_45%,rgba(30,58,95,0.88)_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.6),transparent_50%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-20">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
              Aspire Defence Academy · 2026 Admissions
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.15rem] lg:leading-tight">
              Officer-led defence entrance exam coaching you can trust.
            </h1>
            <p className="max-w-xl text-lg text-white/85">
              Structured preparation for NDA, CDS, OTA, AFCAT, and Sainik School entrance — with written exam coaching,
              SSB interview mentorship, and disciplined guidance from experienced defence leaders.
            </p>
            <div className="flex flex-wrap gap-3">
              {["NDA & CDS", "SSB interviews", "Sainik School"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm"
                >
                  <CheckCircle2 size={14} className="text-accent" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <DefenceCtaButton variant="onDark" className="shadow-lg shadow-black/20" />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Speak with Admissions
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
              <PageImage
                src={defenceHero.primary.src}
                alt={defenceHero.primary.alt}
                aspectRatio="auto"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 rounded-2xl border border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 w-[42%] overflow-hidden rounded-xl border border-white/15 shadow-xl sm:-left-6 sm:w-[38%]">
                <PageImage
                  src={defenceHero.accent.src}
                  alt={defenceHero.accent.alt}
                  aspectRatio="4 / 3"
                  sizes="20vw"
                  className="rounded-xl"
                />
              </div>
              <div className="absolute -right-2 top-6 rounded-xl border border-accent/30 bg-secondary/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:-right-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Campus</p>
                <p className="mt-0.5 text-sm font-bold text-white">Dehradun</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Programs & fees — core conversion content near the top */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="programs">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Programs & fees</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Defence coaching programs for 2026</h2>
          <p className="mt-4 text-muted-foreground">
            Two clear coaching tracks — entrance exam preparation for defence academies and school-level defence
            pathways. Fees are transparent so you can plan with confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {defencePrograms.map((program) => (
            <Card
              key={program.title}
              className="overflow-hidden border border-border p-0 shadow-sm transition hover:shadow-md"
            >
              <div className="border-b border-border bg-secondary/5 px-6 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-secondary sm:text-2xl">{program.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{program.tagline}</p>
                  </div>
                  <span className="shrink-0 self-start rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-white">
                    {program.price}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 px-6 py-5">
                {program.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-secondary" aria-hidden />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <DefenceCtaButton />
          <p className="text-sm text-muted-foreground">Admissions team responds within 1–2 business days.</p>
        </div>
      </section>

      {/* Trust stats bar */}
      <section className="border-y border-border bg-muted/40 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {defenceTrustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-secondary sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coaching pillars */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">What we prepare you for</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Complete defence entrance preparation</h2>
          <p className="mt-4 text-muted-foreground">
            From written exams to SSB interviews — structured coaching designed for aspirants who take defence seriously.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {defencePillars.map((pillar, index) => {
            const Icon = pillarIcons[index]
            return (
              <Card key={pillar.title} className="border border-border p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Icon size={20} aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-secondary">{pillar.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 3. Mentor / leadership section */}
      <section className="bg-secondary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Mentor-led coaching</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Guidance from experienced defence leaders</h2>
            <p className="mt-4 text-white/80">
              Aspire Defence Academy is built on officer-led mentorship — not generic classroom coaching. Your
              preparation is shaped by leaders who understand what defence selection demands.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {defenceMentors.map((mentor) => (
              <div
                key={mentor.name}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="grid sm:grid-cols-[minmax(0,11rem)_1fr] lg:grid-cols-1 xl:grid-cols-[minmax(0,13rem)_1fr]">
                  <PageImage
                    src={mentor.image.src}
                    alt={mentor.image.alt}
                    aspectRatio="3 / 4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="rounded-none sm:min-h-full lg:aspect-[16/10] xl:aspect-auto xl:min-h-full"
                    imageClassName={mentor.name.includes("Colonel") ? "object-contain bg-white/5" : "object-cover"}
                  />
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{mentor.role}</p>
                    <h3 className="mt-3 text-2xl font-bold">{mentor.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/85">{mentor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Coaching atmosphere / gallery / proof */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">On campus</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A disciplined coaching environment</h2>
          <p className="mt-4 text-muted-foreground">
            Real classrooms, a dedicated defence academy campus, and mentor-led SSB guidance — the setting where your
            preparation takes shape.
          </p>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:gap-4">
          {defenceProofGallery.map((item) => (
            <figure
              key={item.src}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border shadow-sm",
                item.layout === "large" && "col-span-2 row-span-2",
              )}
            >
              <PageImage
                src={item.src}
                alt={item.alt}
                aspectRatio="auto"
                sizes={
                  item.layout === "large"
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 50vw, 33vw"
                }
                className="h-full min-h-[200px]"
                imageClassName={cn("transition duration-500 group-hover:scale-[1.02]", item.imageClassName)}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-secondary/90 to-transparent px-4 py-4 text-sm font-semibold text-white">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 5. Mid-page CTA */}
      <section className="border-y border-border bg-muted/50 py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">2026 admissions</p>
          <h2 className="max-w-2xl text-3xl font-bold text-secondary sm:text-4xl">
            Start your defence entrance preparation with a clear plan
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Tell us which exam you are preparing for — our team will guide you to the right program, fee structure, and
            next steps for admission.
          </p>
          <DefenceCtaButton />
        </div>
      </section>

      {/* 6. Closing admissions / inquiry CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-2 lg:items-stretch">
            <div className="space-y-5 p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Take the next step</p>
              <h2 className="text-3xl font-bold text-secondary sm:text-4xl">
                Apply for Aspire Defence Academy coaching
              </h2>
              <p className="text-muted-foreground">
                Join a mentor-led program for NDA, CDS, Sainik School, and defence entrance success. Share your details
                and our admissions team will connect you with the right coaching path.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <DefenceCtaButton />
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  Contact Admissions
                </Link>
              </div>
            </div>
            <div className="relative min-h-[240px] lg:min-h-0">
              <PageImage
                src={defenceHero.primary.src}
                alt="Aspire Defence Academy — defence coaching campus"
                aspectRatio="auto"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full min-h-[240px] rounded-none"
              />
              <div className="absolute inset-0 bg-linear-to-r from-white via-white/20 to-transparent lg:from-white/90" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
