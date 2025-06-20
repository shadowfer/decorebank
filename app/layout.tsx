import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import DemoBanner from "@/components/demo-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoreBank - Bitcoin Neobank",
  description: "Bitcoin-backed neobank with Revolut-like interface",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={inter.className}>
        <DemoBanner />
        <div className="pt-10 bg-gray-50 min-h-screen">{children}</div>
      </body>
    </html>
  )
}
