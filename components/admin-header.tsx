"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function AdminHeader() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    })
    router.push("/admin/login")
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
