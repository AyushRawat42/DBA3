import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SPORTS_PRIMARY_CTA } from "@/lib/sports-academy-content"

type SportsCtaButtonProps = {
  className?: string
  showArrow?: boolean
  fullWidth?: boolean
}

export function SportsCtaButton({ className, showArrow = true, fullWidth = false }: SportsCtaButtonProps) {
  return (
    <Link
      href={SPORTS_PRIMARY_CTA.href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90",
        fullWidth && "w-full",
        className,
      )}
    >
      {SPORTS_PRIMARY_CTA.label}
      {showArrow ? <ArrowRight size={16} aria-hidden /> : null}
    </Link>
  )
}
