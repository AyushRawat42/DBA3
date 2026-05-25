import { Header } from "@/components/header"
import { SiteFooter } from "@/components/site-footer"
import type { ReactNode } from "react"

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <SiteFooter />
    </>
  )
}
