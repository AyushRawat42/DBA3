"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Star } from "lucide-react"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Sports Academy", href: "/sports-academy" },
  { label: "Defence Academy", href: "/defence-academy" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
              <img src="/aspire-1.jpeg" alt="Aspire Academy Logo" className="h-full w-full rounded-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-secondary">Aspire Academy</span>
              <span className="text-xs text-muted-foreground">Sports & Defence Admissions</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/sports-registration" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90">
              Sports Admission
            </Link>
            <Link href="/coaching-registration" className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted">
              Coaching Inquiry
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-md p-2 text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="border-t border-border pb-4 pt-3 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 space-y-2">
              <Link
                href="/sports-registration"
                onClick={() => setIsOpen(false)}
                className="block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white text-center transition hover:bg-primary/90"
              >
                Sports Admission
              </Link>
              <Link
                href="/coaching-registration"
                onClick={() => setIsOpen(false)}
                className="block rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground text-center transition hover:bg-muted"
              >
                Coaching Inquiry
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
