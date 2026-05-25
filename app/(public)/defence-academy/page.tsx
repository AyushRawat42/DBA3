import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, BookOpen, Shield, CheckCircle2 } from "lucide-react"

const services = [
  { title: "NDA / CDS coaching", description: "Focused exam strategy for defence entrance success.", icon: Shield },
  { title: "Interview training", description: "Confidence, communication, and leadership coaching.", icon: BookOpen },
  { title: "Sainik school guidance", description: "Structured preparation for selection and admission interviews.", icon: CheckCircle2 },
]

export default function DefenceAcademyPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Defence Academy</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Structured preparation for defence and entrance success.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground">
            Aspire Defence Academy combines exam coaching with hands-on personality development, interview practice, and fitness planning.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.title} className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                  <Icon size={20} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-secondary">{service.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="bg-muted/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Take the next step for defence entry.</h2>
            <p className="mt-4 text-muted-foreground">
              Join our defence coaching program and get personalized support for written exams, physical fitness, and interview performance.
            </p>
          </div>
          <div className="space-y-4">
            <Link href="/coaching-registration" className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90">
              Start Defence Coaching
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
