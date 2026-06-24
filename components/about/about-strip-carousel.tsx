"use client"

import * as React from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { AboutInteractiveImage } from "@/components/about/about-lightbox"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { GalleryImage } from "@/lib/page-images"

const AUTOPLAY_INTERVAL_MS = 3500

export function AboutStripCarousel({ images }: { images: readonly GalleryImage[] }) {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) return
    const interval = window.setInterval(() => api.scrollNext(), AUTOPLAY_INTERVAL_MS)
    return () => window.clearInterval(interval)
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="w-full"
    >
      <CarouselContent className="-ml-3 md:-ml-4">
        {images.map((image) => (
          <CarouselItem key={image.src} className="basis-[85%] pl-3 sm:basis-[55%] md:basis-[40%] lg:basis-[28%] md:pl-4">
            <AboutInteractiveImage
              image={image}
              aspectRatio="3 / 4"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 28vw"
              className="rounded-2xl border border-border shadow-md"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 border-border bg-background shadow-sm" />
      <CarouselNext className="right-2 border-border bg-background shadow-sm" />
    </Carousel>
  )
}
