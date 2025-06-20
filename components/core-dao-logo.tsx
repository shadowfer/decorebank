"use client"

interface CoreDAOLogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "full" | "icon"
  className?: string
}

export default function CoreDAOLogo({ size = "md", variant = "full", className = "" }: CoreDAOLogoProps) {
  const sizeClasses = {
    sm: variant === "full" ? "h-8" : "w-8 h-8",
    md: variant === "full" ? "h-12" : "w-12 h-12",
    lg: variant === "full" ? "h-16" : "w-16 h-16",
  }

  if (variant === "icon") {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Core DAO Icon - Simplified version */}
          <circle cx="50" cy="50" r="45" fill="url(#coreGradient)" stroke="#FF6B35" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="#FF6B35" />
          <circle cx="50" cy="50" r="15" fill="white" />
          <circle cx="50" cy="50" r="8" fill="#FF6B35" />

          <defs>
            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8A50" />
              <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={sizeClasses[size]}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="url(#coreGradient)" stroke="#FF6B35" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="#FF6B35" />
          <circle cx="50" cy="50" r="15" fill="white" />
          <circle cx="50" cy="50" r="8" fill="#FF6B35" />

          <defs>
            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8A50" />
              <stop offset="100%" stopColor="#FF6B35" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {variant === "full" && (
        <div className="flex flex-col">
          <span
            className={`font-bold text-gray-900 ${size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-lg"}`}
          >
            Core DAO
          </span>
          <span className={`text-gray-600 ${size === "lg" ? "text-sm" : "text-xs"}`}>Powered by Bitcoin</span>
        </div>
      )}
    </div>
  )
}
