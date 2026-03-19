import type { ReactNode } from "react"
import { AdminHeader } from "@/components/admin-header"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
