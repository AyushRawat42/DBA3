import Image from "next/image"
import { cn } from "@/lib/utils"

type PageImageProps = {
  src: string
  alt: string
  aspectRatio?: string
  priority?: boolean
  sizes?: string
  className?: string
  imageClassName?: string
}

export function PageImage({
  src,
  alt,
  aspectRatio = "4 / 3",
  priority = false,
  sizes = "100vw",
  className,
  imageClassName,
}: PageImageProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  )
}
