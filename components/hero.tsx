import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BoxIcon } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-br from-secondary via-secondary to-primary overflow-hidden">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill="white"/></pattern></defs><rect width="1200" height="600" fill="none"/><rect width="1200" height="600" fill="url(%23dots)"/></svg>\')',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-white">
              <BoxIcon size={18} />
              <span className="text-sm font-semibold">Official Boxing Association</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Dehradun <span className="text-accent">Boxing</span> Association
            </h1>

            <p className="text-lg text-white/90 max-w-md">
              Developing champions through excellence in training, competition, and community support. Join us to be
              part of Uttarakhand's vibrant boxing legacy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-accent text-secondary hover:bg-amber-400 font-semibold text-base">
                <Link href="/register" className="inline-flex items-center gap-2">
                  Register Now <ArrowRight size={20} />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100 font-semibold text-base">
                <Link href="/events">View Events</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl font-bold text-accent">500+</p>
                <p className="text-sm text-white/70">Active Athletes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">50+</p>
                <p className="text-sm text-white/70">Annual Events</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">25+</p>
                <p className="text-sm text-white/70">Trained Coaches</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative boxing ring */}
              <div className="aspect-square bg-white/5 rounded-lg border-4 border-accent/30 flex items-center justify-center relative overflow-hidden">
                {/* Inner ring */}
                <div className="absolute inset-4 border-2 border-accent/50 rounded-lg" />
                {/* Center icon */}
                <div className="text-center z-10">
                  <BoxIcon size={80} className="text-accent mx-auto mb-4" />
                  <p className="text-white font-bold text-lg">BOXING</p>
                  <p className="text-white/70 text-sm">Excellence in Motion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" />
    </section>
  )
}
