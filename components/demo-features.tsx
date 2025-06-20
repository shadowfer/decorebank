"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Coins, TrendingUp, Shield, Zap } from "lucide-react"

export default function DemoFeatures() {
  const features = [
    {
      icon: Coins,
      title: "Pagos Instantáneos",
      description: "Envía y recibe CORE tokens al instante",
      color: "text-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "DeFi Lending",
      description: "Préstamos descentralizados con tasas competitivas",
      color: "text-green-500",
    },
    {
      icon: Shield,
      title: "Seguridad Total",
      description: "Tus fondos protegidos por blockchain",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      title: "Cero Comisiones",
      description: "Sin comisiones ocultas ni sorpresas",
      color: "text-coral-500",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {features.map((feature, index) => (
        <Card key={index} className="bg-white/80 hover:bg-white/90 transition-all duration-300 hover:scale-105">
          <CardContent className="p-3 text-center">
            <feature.icon className={`w-8 h-8 mx-auto mb-2 ${feature.color}`} />
            <h3 className="font-semibold text-sm text-gray-800">{feature.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
