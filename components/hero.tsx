import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { pageImages } from "@/lib/page-images"
import { ArrowRight, Star, Shield, Activity } from "lucide-react"

const heroHighlights = [
  { icon: Star, title: "Sports Programs", description: "Specialized coaching for modern youth sports." },
  { icon: Activity, title: "Defence Prep", description: "Structured classes for defence entrance success." },
  { icon: Shield, title: "Admission Support", description: "Application and interview coaching built-in." },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-primary to-secondary text-white">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_45%)]" />
      <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
              <Shield size={18} />
              Aspire Sports & Defence Admissions
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Join Aspire Academy for high-impact sports coaching, defence preparation, and seamless admissions support.
            </h1>

            <p className="max-w-2xl text-lg text-white/85">
              Our dual academy approach helps young athletes and aspirants build confidence, discipline, and performance through structured programs in Dehradun.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-white/90 font-semibold">
                <Link href="/sports-academy" className="inline-flex items-center gap-2">
                  Explore Sports <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-secondary/90 text-white hover:bg-secondary font-semibold">
                <Link href="/defence-academy" className="inline-flex items-center gap-2">
                  Explore Defence <ArrowRight size={18} />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 pt-8 text-sm text-white/80">
              {[
                { label: "Trusted Coaching", value: "3+ yrs" },
                { label: "Success Rate", value: "Proven" },
                { label: "Admissions Support", value: "24/7" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xl font-semibold text-white">{item.value}</p>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-white/20 shadow-lg"
              style={{ aspectRatio: "4 / 3" }}
            >
              <Image
                src={pageImages.homepage.hero}
                alt="Aspire Academy campus in Dehradun"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {heroHighlights.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
