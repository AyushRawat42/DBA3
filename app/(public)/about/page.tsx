import Link from "next/link"
import Image from "next/image"
import { AboutMarquee } from "@/components/about/about-marquee"
import { AboutStripCarousel } from "@/components/about/about-strip-carousel"
import { AboutInteractiveImage, AboutLightboxProvider } from "@/components/about/about-lightbox"
import { ArrowRight } from "lucide-react"
import { getAboutGalleryAll, pageImages } from "@/lib/page-images"
import { cn } from "@/lib/utils"

const { hero, trainingBento, panoramic, studentLife, championships, excellence, carousel } = pageImages.about
const galleryAll = getAboutGalleryAll()

const studentLifeCopy = [
  {
    title: "Camaraderie on campus",
    description: "Training together builds bonds that last beyond the field.",
  },
  {
    title: "Between the sessions",
    description: "Every break is part of the rhythm of academy life.",
  },
  {
    title: "Confidence in motion",
    description: "Students grow through repetition, coaching, and belief.",
  },
  {
    title: "Everyday energy",
    description: "Aspire feels alive — focused, ambitious, and in motion.",
  },
]

export default function AboutPage() {
  return (
    <AboutLightboxProvider images={galleryAll}>
      <main className="bg-background text-foreground">
        {/* Hero collage */}
        <section className="relative overflow-hidden bg-linear-to-br from-secondary via-secondary to-primary text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-24">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/75">Life at Aspire</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Where discipline meets momentum.
              </h1>
              <p className="max-w-xl text-lg text-white/85">
                Step inside Aspire Academy — a place built for athletes, aspirants, and students who train with purpose and live with energy.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Sports", "Defence", "Discipline", "Growth"].map((tag) => (
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
              <div className="relative aspect-[4/5] w-full sm:aspect-[5/6]">
                <AboutInteractiveImage
                  image={hero.primary}
                  aspectRatio="auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0 rounded-3xl border border-white/20 shadow-2xl"
                />
                <div className="absolute -left-4 top-8 w-[38%] overflow-hidden rounded-2xl border border-white/20 shadow-xl sm:-left-8 sm:w-[34%]">
                  <AboutInteractiveImage
                    image={hero.accentTop}
                    aspectRatio="3 / 4"
                    sizes="20vw"
                    className="rounded-2xl"
                  />
                </div>
                <div className="absolute -right-3 bottom-10 w-[36%] overflow-hidden rounded-2xl border border-white/20 shadow-xl sm:-right-6 sm:w-[32%]">
                  <AboutInteractiveImage
                    image={hero.accentBottom}
                    aspectRatio="3 / 4"
                    sizes="20vw"
                    className="rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-4 right-12 hidden w-[28%] overflow-hidden rounded-2xl border border-white/20 shadow-lg md:block">
                  <AboutInteractiveImage
                    image={hero.side}
                    aspectRatio="3 / 4"
                    sizes="15vw"
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutMarquee />

        {/* Training bento */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Training in motion</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Built for athletes who show up ready.</h2>
            <p className="mt-4 text-muted-foreground">
              From drills to game-day intensity — every session is designed to push skill, stamina, and spirit.
            </p>
          </div>

          <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:grid-cols-4 md:gap-4 lg:auto-rows-[200px]">
            {trainingBento.map((item) => (
              <AboutInteractiveImage
                key={item.src}
                image={item}
                aspectRatio="auto"
                sizes="(max-width: 768px) 50vw, 25vw"
                className={cn(
                  "h-full rounded-2xl border border-border shadow-sm",
                  item.layout === "col-span-2 row-span-2" && "col-span-2 row-span-2",
                  item.layout === "col-span-1 row-span-2" && "col-span-1 row-span-2",
                  item.layout === "col-span-2 row-span-1" && "col-span-2 row-span-1",
                  item.layout === "col-span-1 row-span-1" && "col-span-1 row-span-1",
                )}
              />
            ))}
          </div>
        </section>

        {/* Panoramic breaker */}
        <section className="relative w-full">
          <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[21/8]">
            <AboutInteractiveImage
              image={panoramic}
              aspectRatio="auto"
              sizes="100vw"
              className="h-full"
              imageClassName="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-secondary/80 via-secondary/20 to-transparent" />
            <div className="pointer-events-none absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="max-w-md text-sm font-semibold uppercase tracking-[0.3em] text-white/80">The grounds</p>
                <h2 className="mt-3 max-w-lg text-3xl font-bold text-white sm:text-4xl">
                  Space to train. Room to grow.
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Student life alternating */}
        <section className="bg-muted/50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Student life</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">More than training — a community in motion.</h2>
            </div>

            <div className="space-y-12 lg:space-y-16">
              {studentLife.map((image, index) => {
                const copy = studentLifeCopy[index]
                const reversed = index % 2 === 1
                return (
                  <div
                    key={image.src}
                    className={cn(
                      "grid items-center gap-8 lg:grid-cols-2 lg:gap-12",
                      reversed && "lg:[&>div:first-child]:order-2",
                    )}
                  >
                    <AboutInteractiveImage
                      image={image}
                      aspectRatio="4 / 3"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="rounded-3xl border border-border shadow-md"
                    />
                    <div className={cn("space-y-4", reversed ? "lg:pr-8" : "lg:pl-8")}>
                      <span className="text-5xl font-bold text-primary/15">{String(index + 1).padStart(2, "0")}</span>
                      <h3 className="text-2xl font-bold text-secondary">{copy.title}</h3>
                      <p className="text-muted-foreground">{copy.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Championships */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Championship moments</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Results earned on the range and beyond.</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Aspire athletes compete with focus — and celebrate with pride.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-4">
            <AboutInteractiveImage
              image={championships[0]}
              aspectRatio="auto"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-full min-h-[280px] rounded-3xl border border-border shadow-md md:col-span-5 md:row-span-2 md:min-h-0"
            />
            <AboutInteractiveImage
              image={championships[1]}
              aspectRatio="16 / 10"
              sizes="(max-width: 768px) 100vw, 55vw"
              className="rounded-2xl border border-border shadow-sm md:col-span-7"
            />
            <div className="grid grid-cols-3 gap-4 md:col-span-7">
              {championships.slice(2).map((image) => (
                <AboutInteractiveImage
                  key={image.src}
                  image={image}
                  aspectRatio="3 / 4"
                  sizes="(max-width: 768px) 33vw, 18vw"
                  className="rounded-2xl border border-border shadow-sm"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Excellence bento */}
        <section className="bg-secondary py-16 text-white lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Discipline & excellence</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Sports energy. Academic focus. Officer-grade discipline.</h2>
              <p className="mt-4 text-white/75">
                Aspire blends world-class coaching with structured learning — preparing students for competition and career paths alike.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-12 md:auto-rows-[180px] lg:auto-rows-[220px]">
              <AboutInteractiveImage
                image={excellence.defence}
                aspectRatio="auto"
                sizes="(max-width: 768px) 100vw, 40vw"
                className="h-full min-h-[260px] rounded-3xl border border-white/10 md:col-span-5 md:row-span-2 md:min-h-0"
                imageClassName="object-cover object-top"
              />
              <AboutInteractiveImage
                image={excellence.classroom}
                aspectRatio="auto"
                sizes="35vw"
                className="h-full rounded-2xl border border-white/10 md:col-span-4"
              />
              <AboutInteractiveImage
                image={excellence.discipline}
                aspectRatio="auto"
                sizes="25vw"
                className="h-full rounded-2xl border border-white/10 md:col-span-3"
              />
              <AboutInteractiveImage
                image={excellence.campus}
                aspectRatio="auto"
                sizes="30vw"
                className="h-full rounded-2xl border border-white/10 md:col-span-4"
              />
              <AboutInteractiveImage
                image={excellence.atmosphere}
                aspectRatio="auto"
                sizes="25vw"
                className="h-full rounded-2xl border border-white/10 md:col-span-3"
              />
              <AboutInteractiveImage
                image={excellence.growth}
                aspectRatio="auto"
                sizes="35vw"
                className="h-full rounded-2xl border border-white/10 md:col-span-5"
              />
            </div>
          </div>
        </section>

        {/* Carousel strip */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-primary/80">Campus gallery</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Swipe through the Aspire atmosphere.</h2>
          </div>
          <AboutStripCarousel images={carousel} />
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={excellence.growth.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              aria-hidden
            />
            <div className="absolute inset-0 bg-secondary/85" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-2xl text-center text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Your chapter starts here</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Ready to train with Aspire?</h2>
              <p className="mt-4 text-white/80">
                Join a community where ambition is coached, discipline is celebrated, and every session moves you forward.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/sports-registration"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  Join Sports Academy <ArrowRight size={16} />
                </Link>
                <Link
                  href="/coaching-registration"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Join Defence Academy <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AboutLightboxProvider>
  )
}
