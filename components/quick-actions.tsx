"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Send, QrCode, PiggyBank, CreditCard, TrendingUp, Shield } from "lucide-react"

export default function QuickActions() {
  return (
    <div className="space-y-6">
      {/* Acciones rápidas */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl h-16 flex-col gap-1 text-white font-semibold">
          <Send className="w-6 h-6" />
          <span className="text-sm">Enviar</span>
        </Button>
        <Button className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-lg hover:shadow-xl h-16 flex-col gap-1 text-white font-semibold">
          <QrCode className="w-6 h-6" />
          <span className="text-sm">Recibir</span>
        </Button>
      </div>

      {/* Servicios */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Ahorros</h3>
              <p className="text-xs text-slate-500">Gana intereses</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Préstamos</h3>
              <p className="text-xs text-slate-500">DeFi lending</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Inversiones</h3>
              <p className="text-xs text-slate-500">Staking CORE</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Seguros</h3>
              <p className="text-xs text-slate-500">Protección DeFi</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
