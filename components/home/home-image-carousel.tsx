"use client"

import * as React from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { PageImage } from "@/components/page-image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type CarouselImage = {
  src: string
  alt: string
}

const AUTOPLAY_INTERVAL_MS = 3000

export function HomeImageCarousel({ images }: { images: readonly CarouselImage[] }) {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) return

    const interval = window.setInterval(() => {
      api.scrollNext()
    }, AUTOPLAY_INTERVAL_MS)

    return () => window.clearInterval(interval)
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {images.map((image) => (
          <CarouselItem key={image.src} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
            <PageImage
              src={image.src}
              alt={image.alt}
              aspectRatio="16 / 10"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-2xl border border-border shadow-sm"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 border-border bg-background shadow-sm" />
      <CarouselNext className="right-2 border-border bg-background shadow-sm" />
    </Carousel>
  )
}
