const words = ["Train", "Compete", "Grow", "Achieve", "Discipline", "Excellence", "Aspire"]

export function AboutMarquee() {
  const sequence = [...words, ...words]

  return (
    <section className="overflow-hidden border-y border-border bg-secondary py-4" aria-hidden>
      <div className="about-marquee-track flex w-max gap-10">
        {sequence.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center gap-10 text-sm font-bold uppercase tracking-[0.35em] text-white/90 sm:text-base"
          >
            {word}
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </div>
    </section>
  )
}
