"use client"

import { CoralIcon } from "./coral-icon"

export default function CoreLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-rose-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"></div>
      <CoralIcon className={`${iconSizes[size]} text-white drop-shadow-sm`} />
    </div>
  )
}
