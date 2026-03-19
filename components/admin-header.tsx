"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  const router = useRouter()
  const pathname = usePathname()

  // Don't show header at all on the login page
  if (pathname === "/admin/login") return null
  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    })
    router.push("/")
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <h1 className="text-lg font-semibold">DBA Admin Panel</h1>
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        Logout
      </Button>
    </header>
  )
}
