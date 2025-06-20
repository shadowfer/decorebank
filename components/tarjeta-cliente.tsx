"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Copy, Check } from "lucide-react"

interface TarjetaClienteProps {
  userAddress: string
  userMnemonic?: string
  loginMethod: "metamask" | "created_account"
}

export default function TarjetaCliente({ userAddress, userMnemonic, loginMethod }: TarjetaClienteProps) {
  const [showBalance, setShowBalance] = useState(true)
  const [copied, setCopied] = useState(false)

  const mockBalance = "1,234.56"
  const mockCoreBalance = "45.78"

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(userAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error copiando dirección:", error)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Mi Cuenta</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20 p-1"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Saldo principal */}
        <div>
          <p className="text-blue-100 text-sm">Saldo disponible</p>
          <p className="text-3xl font-bold">{showBalance ? `$${mockBalance}` : "••••••"}</p>
          <p className="text-blue-200 text-sm">{showBalance ? `${mockCoreBalance} CORE` : "••••••"}</p>
        </div>

        {/* Información de la cuenta */}
        <div className="space-y-2">
          <div>
            <p className="text-blue-100 text-xs">Método de acceso</p>
            <p className="text-sm font-medium">{loginMethod === "metamask" ? "MetaMask Wallet" : "Cuenta Creada"}</p>
          </div>

          <div>
            <p className="text-blue-100 text-xs">Dirección</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-mono">
                {userAddress === "metamask_connected"
                  ? "Conectado via MetaMask"
                  : `${userAddress.slice(0, 8)}...${userAddress.slice(-6)}`}
              </p>
              {userAddress !== "metamask_connected" && (
                <Button variant="ghost" size="sm" onClick={copyAddress} className="text-white hover:bg-white/20 p-1">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              )}
            </div>
          </div>

          {userMnemonic && (
            <div className="bg-white/10 rounded-lg p-3 mt-3">
              <p className="text-blue-100 text-xs">Estado de la cuenta</p>
              <p className="text-sm">✅ Frase semilla guardada de forma segura</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
