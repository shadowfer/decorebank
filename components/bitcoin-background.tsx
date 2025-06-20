"use client"

export default function CoralBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Círculos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-coral-300/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-coral-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-coral-400/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-coral-300/15 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Patrón de puntos */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-8 h-full p-8">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
