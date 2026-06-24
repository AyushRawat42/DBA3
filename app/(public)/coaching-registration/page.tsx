import Link from "next/link"
import { CoachingRegistrationForm } from "@/components/coaching-registration-form"
import { PageImage } from "@/components/page-image"
import { Card } from "@/components/ui/card"
import { defencePillars, defenceTrustStats } from "@/lib/defence-academy-content"
import {
  ArrowDown,
  BookOpen,
  CheckCircle2,
  Clock,
  Shield,
  Users,
} from "lucide-react"

const coachingFormImages = {
  foundation: {
    src: "/images/coaching-form/IMG_5136.png",
    alt: "Aspire Defence Academy NDA foundation coaching — structured preparation from Class 11",
  },
  pathways: {
    src: "/images/coaching-form/Gemini_Generated_Image_fr0pkkfr0pkkfr0p.png",
    alt: "Aspire Defence Academy — Army, Navy, and Air Force entrance exam coaching pathways",
  },
} as const

const enquiryHighlights = [
  "NDA, CDS, OTA, AFCAT & Sainik School pathways",
  "Written exam coaching with SSB interview mentorship",
  "Officer-led guidance from experienced defence mentors",
  "Admissions team responds within 1–2 working days",
] as const

const pillarIcons = [BookOpen, Users, Shield] as const

export default function CoachingRegistrationPage() {
  return (
    <main className="bg-background text-foreground">
      {/* 1. Hero — disciplined enquiry intro */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,31,61,1)_0%,rgba(10,31,61,0.94)_50%,rgba(30,58,95,0.9)_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_90%_10%,rgba(212,175,55,0.7),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
              Defence coaching enquiry · 2026
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Apply for Aspire Defence Coaching
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
              Share your details below and our admissions team will connect you with the right
              coaching path — entrance exam preparation, SSB mentorship, and structured guidance
              for defence careers.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {["NDA & CDS", "Sainik School", "SSB guidance"].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm"
                >
                  <CheckCircle2 size={13} className="text-accent" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="#enquiry-form"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-white/90"
            >
              Start your enquiry
              <ArrowDown size={16} className="animate-bounce" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Form spotlight — focal conversion section */}
      <section
        id="enquiry-form"
        className="scroll-mt-24 border-b border-border bg-linear-to-b from-muted/60 to-background"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
                Coaching admission enquiry
              </p>
              <h2 className="mt-3 text-2xl font-bold text-secondary sm:text-3xl">
                Tell us about the aspirant
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Complete the form and our team will review your enquiry, recommend the right
                program, and contact you with next steps for 2026 admissions.
              </p>

              <ul className="mt-6 space-y-3">
                {enquiryHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-secondary"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 shadow-sm">
                <Clock size={18} className="shrink-0 text-accent" aria-hidden />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Quick response.</span> We
                  typically reply within 1–2 working days.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="mb-4 rounded-xl border border-secondary/10 bg-secondary/5 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  2026 admissions
                </p>
                <p className="mt-1 text-sm font-medium text-secondary">
                  Secure enquiry — your details are reviewed by our admissions team only.
                </p>
              </div>
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-linear-to-br from-secondary/8 via-accent/5 to-transparent blur-2xl"
                  aria-hidden
                />
                <div className="relative shadow-2xl shadow-secondary/15 ring-2 ring-accent/25 ring-offset-2 ring-offset-muted/60 rounded-xl">
                  <CoachingRegistrationForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Supporting trust imagery */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Why enquire now</p>
          <h2 className="mt-4 text-3xl font-bold text-secondary sm:text-4xl">
            Structured defence coaching you can trust
          </h2>
          <p className="mt-4 text-muted-foreground">
            Aspire Defence Academy combines written exam coaching, physical readiness planning, and
            officer-led mentorship — built for serious aspirants and their families.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
            <PageImage
              src={coachingFormImages.foundation.src}
              alt={coachingFormImages.foundation.alt}
              aspectRatio="16 / 10"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-none"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold text-secondary">Foundation to officer pathway</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Early preparation from Class 11 with integrated tuition and NDA-focused coaching —
                so aspirants build discipline and syllabus strength before competitive pressure
                peaks.
              </p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
            <PageImage
              src={coachingFormImages.pathways.src}
              alt={coachingFormImages.pathways.alt}
              aspectRatio="16 / 10"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-none"
              imageClassName="object-contain bg-secondary/5"
            />
            <div className="p-6">
              <h3 className="text-lg font-bold text-secondary">Complete defence career solution</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Army, Navy, and Air Force pathways — with foundation courses, physical training,
                written exam coaching, and SSB mentorship under one disciplined program structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Credibility — mentorship & guidance pillars */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
                Officer-led guidance
              </p>
              <h2 className="mt-4 text-3xl font-bold text-secondary sm:text-4xl">
                What your enquiry unlocks
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every coaching admission enquiry is reviewed with care. We match aspirants to the
                right track — entrance exams, school pathways, or interview preparation — with
                clarity on fees, schedule, and expectations.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {defenceTrustStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-background px-3 py-4 text-center shadow-sm"
                  >
                    <p className="text-lg font-bold text-secondary sm:text-xl">{stat.value}</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {defencePillars.map((pillar, index) => {
                const Icon = pillarIcons[index]
                return (
                  <Card
                    key={pillar.title}
                    className="flex gap-4 border border-border p-5 shadow-sm transition hover:border-secondary/20 hover:shadow-md"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <Icon size={20} aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary">{pillar.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{pillar.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing reinforcement */}
      <section className="bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-accent">
            Ready to begin?
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">
            Submit your coaching enquiry today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Take two minutes to share the aspirant&apos;s details. Our admissions team will guide
            you through program selection, fees, and the next steps for 2026 defence coaching.
          </p>
          <Link
            href="#enquiry-form"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-secondary transition hover:bg-white/90"
          >
            Complete the enquiry form
          </Link>
        </div>
      </section>
    </main>
  )
}
