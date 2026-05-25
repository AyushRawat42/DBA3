import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, Award, Handshake, Users } from "lucide-react"

const values = [
  { icon: Award, title: "Excellence", description: "High-performance training built around modern sports and defence readiness." },
  { icon: Users, title: "Personal Growth", description: "Mentorship and confidence-building for every student and athlete." },
  { icon: Handshake, title: "Support", description: "Admissions guidance, career advice, and ongoing coaching support." },
]

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">About Aspire Academy</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">A mission to empower athletes and defence aspirants.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground">
            Aspire Academy blends elite sports coaching with structured defence admissions preparation, helping every student build skill, discipline and a path to success.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <Card key={value.title} className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-secondary">{value.title}</h2>
                <p className="mt-4 text-sm text-muted-foreground">{value.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="bg-muted/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Why Aspire Academy works</h2>
              <p className="mt-4 text-muted-foreground">
                We combine certified trainers, individualized coaching plans, and a nurturing environment that encourages ambition, resilience, and performance.
              </p>
            </div>
            <div className="space-y-4 rounded-4xl border border-border bg-background/80 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Our promise</p>
              <p className="text-base text-muted-foreground">
                Every student receives hands-on support for skill development, exam readiness, and admissions planning in a structured training environment.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                Speak with our admissions team <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
