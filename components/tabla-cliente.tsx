"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, History } from "lucide-react"

const mockTransactions = [
  {
    id: 1,
    type: "received",
    amount: "2.5",
    from: "0x1234...5678",
    date: "2024-01-15",
    time: "14:30",
    description: "Pago recibido",
    status: "completado",
  },
  {
    id: 2,
    type: "sent",
    amount: "0.8",
    to: "0x9876...4321",
    date: "2024-01-14",
    time: "09:15",
    description: "Transferencia enviada",
    status: "completado",
  },
  {
    id: 3,
    type: "received",
    amount: "5.0",
    from: "0x5555...7777",
    date: "2024-01-13",
    time: "16:45",
    description: "Depósito",
    status: "completado",
  },
  {
    id: 4,
    type: "sent",
    amount: "1.2",
    to: "0x3333...9999",
    date: "2024-01-12",
    time: "11:20",
    description: "Pago de servicios",
    status: "pendiente",
  },
]

export default function TablaCliente() {
  return (
    <Card className="bg-white shadow-sm border border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-slate-800">Historial de Transacciones</CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            <History className="w-4 h-4 mr-1" />
            Ver todo
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "received" ? "bg-green-100" : "bg-blue-100"
                  }`}
                >
                  {tx.type === "received" ? (
                    <ArrowDownLeft className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{tx.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span>{tx.time}</span>
                    <span>•</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === "completado" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.type === "received" ? "text-green-600" : "text-blue-600"}`}>
                  {tx.type === "received" ? "+" : "-"}
                  {tx.amount} CORE
                </p>
                <p className="text-sm text-slate-500">
                  {tx.type === "received" ? "+" : "-"}${(Number.parseFloat(tx.amount) * 0.85).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
