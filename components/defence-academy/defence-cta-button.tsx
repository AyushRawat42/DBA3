import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { DEFENCE_PRIMARY_CTA } from "@/lib/defence-academy-content"

type DefenceCtaButtonProps = {
  className?: string
  showArrow?: boolean
  fullWidth?: boolean
  variant?: "primary" | "onDark"
}

export function DefenceCtaButton({
  className,
  showArrow = true,
  fullWidth = false,
  variant = "primary",
}: DefenceCtaButtonProps) {
  return (
    <Link
      href={DEFENCE_PRIMARY_CTA.href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition",
        variant === "primary" &&
          "bg-secondary text-white hover:bg-secondary/90",
        variant === "onDark" &&
          "bg-white text-secondary hover:bg-white/90",
        fullWidth && "w-full",
        className,
      )}
    >
      {DEFENCE_PRIMARY_CTA.label}
      {showArrow ? <ArrowRight size={16} aria-hidden /> : null}
    </Link>
  )
}
