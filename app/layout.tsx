import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aspire Academy | Sports & Defence Admissions",
  description:
    "Aspire Sports Academy and Aspire Defence Academy provide high-impact coaching, admissions guidance, and lead capture for students in Dehradun.",
  generator: "Aspire Academy",
  icons: {
    icon: [
      {
        url: "/aspire-sports-logo.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/aspire-defence-logo.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/aspire-sports-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/aspire-sports-logo.svg",
  },
  openGraph: {
    title: "Aspire Academy",
    description: "Admissions and coaching for Aspire Sports Academy and Aspire Defence Academy",
    locale: "en_IN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={_geist.className}>{children}</body>
    </html>
  )
}
