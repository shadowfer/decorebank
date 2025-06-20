"use client"

import { AlertCircle, ExternalLink } from "lucide-react"

export default function DemoBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-core-600 to-core-700 text-white p-2 text-center text-sm z-50">
      <div className="flex items-center justify-center gap-2">
        <AlertCircle className="w-4 h-4" />
        <span>🚀 CoreBank Hackathon Demo | Powered by Core DAO</span>
        <a
          href="https://coredao.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-white hover:text-orange-200 underline"
        >
          <ExternalLink className="w-3 h-3" />
          coredao.org
        </a>
      </div>
    </div>
  )
}
