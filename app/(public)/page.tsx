import Link from "next/link"
import { Hero } from "@/components/hero"
import { Card } from "@/components/ui/card"
import { ArrowRight, Star, Shield, Target, Users } from "lucide-react"

const offerings = [
  {
    title: "Aspire Sports Academy",
    description: "Specialized coaching in badminton, swimming, skating, and more for young athletes.",
    href: "/sports-academy",
    icon: Target,
  },
  {
    title: "Aspire Defence Academy",
    description: "Entrance coaching and interview readiness for NDA, Sainik School, CDS, and defence exams.",
    href: "/defence-academy",
    icon: Shield,
  },
]

const programs = [
  {
    title: "Badminton",
    price: "₹2000/month",
  },
  {
    title: "Air Rifle / Pistol Shooting",
    price: "₹3500/month",
  },
  {
    title: "Swimming",
    price: "₹2500/month",
  },
  {
    title: "Roller Skating",
    price: "₹1800/month",
  },
  {
    title: "Pickleball",
    price: "₹1200/month",
  },
  {
    title: "Boxing",
    price: "₹1650/month",
  },
]

const trustItems = [
  {
    icon: Users,
    label: "Student Success",
    value: "1000+",
  },
  {
    icon: Star,
    label: "Trusted Coaching",
    value: "10+ Years",
  },
  {
    icon: Shield,
    label: "Exam Readiness",
    value: "95% Pass Rate",
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
            const OfferIcon = item.icon
            return (
              <Link key={item.title} href={item.href} className="group">
                <Card className="h-full overflow-hidden border border-border transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-secondary">
                      <OfferIcon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-secondary">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Learn more <ArrowRight size={16} />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="bg-muted/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {trustItems.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.label} className="p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                    <Icon size={20} />
                  </div>
                  <p className="text-3xl font-bold text-secondary">{item.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Programs</p>
            <h2 className="mt-4 text-3xl font-bold">Top monthly offerings for sports aspirants.</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Choose the program that fits your energy, interests, and training schedule.
            </p>
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {programs.map((program) => (
              <Card key={program.title} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-secondary">{program.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Monthly coaching package.</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{program.price}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Director's Note</p>
              <h2 className="text-3xl font-bold">Major Harish Singh Kundwal</h2>
              <p className="text-muted-foreground">
                With a disciplined background in defence and coaching, Major Kundwal champions a practical admissions path for both sports and defence aspirants. His approach blends performance training, confidence building, and strategic guidance for every student.
              </p>
              <p className="text-sm text-muted-foreground">
                "Aspire Academy is designed to unlock potential through structured coaching, clear planning, and a supportive training environment."
              </p>
            </div>
            <div className="rounded-4xl overflow-hidden border border-border bg-white shadow-sm">
              <img src="/director-portrait.svg" alt="Major Harish Singh Kundwal" className="h-full w-full object-cover" />
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
          </div>
        </div>
      </section>
    </main>
  )
}
