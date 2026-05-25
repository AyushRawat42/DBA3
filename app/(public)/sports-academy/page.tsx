import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Shield, Trophy } from "lucide-react"

const features = [
  { title: "Modern coaching labs", description: "Tailored training for badminton, swimming, roller skating, and more.", icon: Trophy },
  { title: "Performance tracking", description: "Regular skill assessments to help athletes improve quickly.", icon: Zap },
  { title: "Holistic development", description: "Fitness, nutrition, and confidence-building support.", icon: Shield },
]

export default function SportsAcademyPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Sports Academy</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Elite sports coaching for young champions.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-base text-muted-foreground">
            Aspire Sports Academy offers structured coaching, modern facilities, and a performance-driven program to help athletes reach their full potential.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-secondary">{feature.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="bg-muted/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Ready to join the sports program?</h2>
            <p className="mt-4 text-muted-foreground">
              Apply now for coaching in badminton, swimming, skating, shooting, and more. Our admissions team will respond with the program best suited for your goals.
            </p>
          </div>
          <div className="space-y-4">
            <Link href="/sports-registration" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
              Register for Sports Admission
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
