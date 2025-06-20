"use client"

export default function BlueBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-32 h-32 bg-rose-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200/25 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-rose-100/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-pink-100/20 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Patrón de puntos */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-8 h-full p-8">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-rose-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
