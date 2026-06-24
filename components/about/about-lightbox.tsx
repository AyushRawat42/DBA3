"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { GalleryImage } from "@/lib/page-images"

type AboutLightboxContextValue = {
  images: GalleryImage[]
  openAt: (index: number) => void
}

const AboutLightboxContext = React.createContext<AboutLightboxContextValue | null>(null)

export function AboutLightboxProvider({
  images,
  children,
}: {
  images: GalleryImage[]
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)

  const openAt = React.useCallback((nextIndex: number) => {
    setIndex(nextIndex)
    setOpen(true)
  }, [])

  const goPrev = React.useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = React.useCallback(() => {
    setIndex((current) => (current + 1) % images.length)
  }, [images.length])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev()
      if (event.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, goPrev, goNext])

  const active = images[index]

  return (
    <AboutLightboxContext.Provider value={{ images, openAt }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="max-w-5xl border-none bg-secondary p-0 shadow-2xl sm:max-w-6xl"
        >
          <DialogTitle className="sr-only">{active?.alt ?? "Aspire Academy photo"}</DialogTitle>
          {active ? (
            <div className="relative">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-secondary px-4 py-3 text-white sm:px-6">
                <p className="text-sm text-white/80 sm:text-base">{active.alt}</p>
                <p className="shrink-0 text-xs font-semibold uppercase tracking-widest text-white/60">
                  {index + 1} / {images.length}
                </p>
              </div>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </AboutLightboxContext.Provider>
  )
}

type AboutInteractiveImageProps = {
  image: GalleryImage
  aspectRatio?: string
  sizes?: string
  className?: string
  imageClassName?: string
  showExpandHint?: boolean
}

export function AboutInteractiveImage({
  image,
  aspectRatio = "4 / 3",
  sizes = "100vw",
  className,
  imageClassName,
  showExpandHint = true,
}: AboutInteractiveImageProps) {
  const context = React.useContext(AboutLightboxContext)
  const index = context?.images.findIndex((item) => item.src === image.src) ?? -1

  const handleClick = () => {
    if (context && index >= 0) context.openAt(index)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!context || index < 0}
      className={cn(
        "group relative w-full overflow-hidden text-left transition duration-300",
        aspectRatio === "auto" ? "h-full" : "",
        context && index >= 0 && "cursor-zoom-in",
        className,
      )}
      style={aspectRatio !== "auto" ? { aspectRatio } : undefined}
      aria-label={context && index >= 0 ? `View larger: ${image.alt}` : image.alt}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover transition duration-500 group-hover:scale-105",
          imageClassName,
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-secondary/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      {showExpandHint && context && index >= 0 ? (
        <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
          <Expand size={16} />
        </span>
      ) : null}
    </button>
  )
}
