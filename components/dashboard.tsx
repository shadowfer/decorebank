"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  PiggyBank,
  Eye,
  EyeOff,
  LogOut,
  Send,
  QrCode,
  History,
} from "lucide-react"
import { useWeb3 } from "@/hooks/useWeb3"
import CoreLogo from "./core-logo"
// Importar el componente
import DemoFeatures from "./demo-features"

interface DashboardProps {
  onLogout: () => void
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const { account, balance, disconnect } = useWeb3()
  const [showBalance, setShowBalance] = useState(true)

  const handleLogout = () => {
    disconnect()
    onLogout()
  }

  // También agregar algunos datos más realistas para la demo en las transacciones:
  const transactions = [
    {
      id: 1,
      type: "received",
      amount: "2.5",
      from: "0x1234...5678",
      date: "Hace 2 horas",
      description: "Pago de Juan Pérez",
    },
    { id: 2, type: "sent", amount: "0.8", to: "0x9876...4321", date: "Ayer", description: "Pago a María García" },
    {
      id: 3,
      type: "received",
      amount: "5.0",
      from: "0x5555...7777",
      date: "Hace 3 días",
      description: "Transferencia recibida",
    },
    {
      id: 4,
      type: "sent",
      amount: "1.2",
      to: "0x3333...9999",
      date: "Hace 1 semana",
      description: "Pago de servicios",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-coral-500 to-coral-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CoreLogo size="sm" />
            <div>
              <h1 className="text-xl font-bold">CoreBank</h1>
              <p className="text-coral-100 text-sm">
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "No conectado"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-white hover:bg-white/20 border border-white/30"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-coral-100 text-sm">Saldo disponible</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20 p-1"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{showBalance ? `${balance} CORE` : "••••••"}</div>
            <div className="text-coral-100 text-sm">≈ ${(Number.parseFloat(balance) * 0.85).toFixed(2)} USD</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="p-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button className="bg-gradient-to-br from-coral-400 to-coral-500 hover:from-coral-500 hover:to-coral-600 shadow-lg hover:shadow-xl h-16 flex-col gap-1 text-white font-semibold">
            <Send className="w-6 h-6" />
            <span className="text-sm">Enviar</span>
          </Button>
          <Button className="bg-gradient-to-br from-coral-500 to-coral-400 hover:from-coral-600 hover:to-coral-500 shadow-lg hover:shadow-xl h-16 flex-col gap-1 text-white font-semibold">
            <QrCode className="w-6 h-6" />
            <span className="text-sm">Recibir</span>
          </Button>
        </div>

        {/* Agregar después de los Quick Actions y antes de Services: */}
        <DemoFeatures />

        {/* Services */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-coral-100 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-coral-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Ahorros</h3>
                <p className="text-xs text-gray-500">Gana intereses</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-coral-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-coral-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Préstamos</h3>
                <p className="text-xs text-gray-500">DeFi lending</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Actividad reciente</CardTitle>
              <Button variant="ghost" size="sm" className="text-coral-600 hover:text-coral-700 hover:bg-coral-50">
                <History className="w-4 h-4 mr-1" />
                Ver todo
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-coral-50 to-coral-100 rounded-lg border border-coral-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === "received" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {tx.type === "received" ? (
                      <ArrowDownLeft className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{tx.description}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm ${tx.type === "received" ? "text-green-600" : "text-red-600"}`}>
                    {tx.type === "received" ? "+" : "-"}
                    {tx.amount} CORE
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
