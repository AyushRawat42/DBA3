import { PageImage } from "@/components/page-image"
import { Card } from "@/components/ui/card"
import { ArrowRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const PHONE = "+918250309184"
const PHONE_DISPLAY = "+91-8250309184"
const EMAIL = "boxing@hartishfoundation.in"
const WHATSAPP_URL = "https://wa.me/918250309184"
const ADDRESS =
  "7XFH+XMH, Mohabbewala, Dehradun, Ashkrodi, Uttarakhand 248002"
const MAPS_QUERY = encodeURIComponent(ADDRESS)
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`

const heroImages = {
  main: {
    src: "/images/contact/DSC02991.jpg",
    alt: "Aspire Academy campus and training grounds in Dehradun",
  },
  accent: {
    src: "/images/contact/DSC02508.jpg",
    alt: "Aspire Academy training session in Dehradun",
  },
} as const

const contactImages = [
  {
    src: "/images/contact/DSC02922.jpg",
    alt: "Aspire Academy campus and coaching facilities",
    layout: "col-span-2 row-span-2",
  },
  {
    src: "/images/contact/DSC02974.jpg",
    alt: "Students training at Aspire Academy",
    layout: "col-span-1 row-span-1",
  },
  {
    src: "/images/contact/DSC02417.jpg",
    alt: "Aspire Academy sports and defence training environment",
    layout: "col-span-1 row-span-1",
  },
] as const

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const contactActions = [
  {
    title: "Call us",
    description: "Speak with admissions for sports or defence coaching.",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE}`,
    icon: Phone,
    cta: "Tap to call",
    accent: "bg-primary",
  },
  {
    title: "Email us",
    description: "Send your enquiry and we will reply with next steps.",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    cta: "Send email",
    accent: "bg-secondary",
  },
  {
    title: "WhatsApp",
    description: "Quick questions? Message us directly on WhatsApp.",
    value: PHONE_DISPLAY,
    href: WHATSAPP_URL,
    icon: WhatsAppIcon,
    cta: "Open chat",
    accent: "bg-[#25D366]",
  },
  {
    title: "Visit us",
    description: "Plan a campus visit or get directions to Aspire Academy.",
    value: ADDRESS,
    href: MAPS_URL,
    icon: MapPin,
    cta: "Get directions",
    accent: "bg-accent text-accent-foreground",
  },
] as const

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-secondary via-secondary to-primary text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-24">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/75">
              Contact hub
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Reach Aspire in one tap.
            </h1>
            <p className="max-w-xl text-lg text-white/85">
              Admissions, training schedules, campus visits, and partnership enquiries — connect
              directly with our team. No forms, no waiting.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Phone", "Email", "WhatsApp", "Directions"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
              <PageImage
                src={heroImages.main.src}
                alt={heroImages.main.alt}
                aspectRatio="4 / 3"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="rounded-3xl"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden w-[38%] overflow-hidden rounded-2xl border border-white/20 shadow-xl sm:block">
              <PageImage
                src={heroImages.accent.src}
                alt={heroImages.accent.alt}
                aspectRatio="3 / 4"
                sizes="20vw"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Direct contact cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Get in touch</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Choose how you want to connect.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every card below is a direct action — call, email, chat, or navigate to our campus.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactActions.map((action) => {
            const Icon = action.icon
            const isExternal = action.href.startsWith("http")

            return (
              <a
                key={action.title}
                href={action.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group block h-full"
              >
                <Card className="h-full border border-border p-0 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                  <div className="flex h-full flex-col p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={cn(
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm transition group-hover:scale-105",
                          action.accent,
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <ArrowRight
                        size={20}
                        className="shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"
                      />
                    </div>
                    <div className="mt-6 flex-1">
                      <h3 className="text-xl font-semibold text-secondary">{action.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{action.description}</p>
                      <p className="mt-4 text-sm font-semibold text-foreground">{action.value}</p>
                    </div>
                    <p className="mt-6 text-sm font-semibold text-primary">{action.cta}</p>
                  </div>
                </Card>
              </a>
            )
          })}
        </div>
      </section>

      {/* Map */}
      <section className="bg-muted/50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Find us</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Aspire Academy, Dehradun</h2>
              <p className="mt-4 text-muted-foreground">{ADDRESS}</p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              <Navigation size={16} />
              Open in Google Maps
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-md">
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
              <iframe
                title="Aspire Academy location on Google Maps"
                src={MAPS_EMBED}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">On campus</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            See the place before you visit.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Training grounds, coaching sessions, and the energy that defines Aspire Academy.
          </p>
        </div>

        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:gap-4 lg:auto-rows-[240px]">
          {contactImages.map((image) => (
            <div
              key={image.src}
              className={cn(
                "overflow-hidden rounded-2xl border border-border shadow-sm transition hover:shadow-md",
                image.layout === "col-span-2 row-span-2" && "col-span-2 row-span-2",
                image.layout === "col-span-1 row-span-1" && "col-span-1 row-span-1",
              )}
            >
              <PageImage
                src={image.src}
                alt={image.alt}
                aspectRatio="auto"
                sizes={
                  image.layout === "col-span-2 row-span-2"
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="h-full rounded-2xl"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Visit & response info */}
      <section className="bg-secondary py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-1">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Visit us</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                We respond fast — because your time matters.
              </h2>
              <p className="mt-4 text-white/75">
                For admissions, training schedules, or quick queries, our team is available by
                phone, email, and WhatsApp.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              <Card className="border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Response time</h3>
                    <p className="mt-2 text-sm text-white/75">
                      WhatsApp and phone enquiries are typically answered within a few hours during
                      working days.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Campus visits</h3>
                    <p className="mt-2 text-sm text-white/75">
                      Call or WhatsApp ahead to schedule a walkthrough of our sports and defence
                      training facilities.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm sm:col-span-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Ready to connect?</h3>
                    <p className="mt-2 text-sm text-white/75">
                      Pick the channel that works best for you — we are here to help.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${PHONE}`}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
                    >
                      <Phone size={16} />
                      Call now
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
