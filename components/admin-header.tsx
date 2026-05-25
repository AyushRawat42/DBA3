"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export function AdminHeader() {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/admin/login") return null

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    })
    router.push("/")
  }

  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-4">
      <div className="flex items-center gap-6">
        <Link href="/admin" className="text-lg font-semibold">
          Aspire Admissions
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">
            Submissions
          </Link>
        </nav>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  )
}
