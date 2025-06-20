"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Copy, Check, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useWalletCreation } from "@/hooks/useWalletCreation"
import CoreBackground from "./core-background"
import CoreDAOLogo from "./core-dao-logo"

interface CreateAccountProps {
  onAccountCreated: (address: string, mnemonic: string) => void
  onBack: () => void
}

export default function CreateAccount({ onAccountCreated, onBack }: CreateAccountProps) {
  const { generateWallet, restoreWallet, saveWallet, isCreating } = useWalletCreation()
  const [step, setStep] = useState<"choice" | "create" | "confirm" | "restore">("choice")
  const [mnemonic, setMnemonic] = useState<string[]>([])
  const [confirmWords, setConfirmWords] = useState<string[]>(Array(12).fill(""))
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [copiedMnemonic, setCopiedMnemonic] = useState(false)
  const [restoreMnemonic, setRestoreMnemonic] = useState("")
  const [address, setAddress] = useState("")

  const handleCreateWallet = async () => {
    try {
      const wallet = await generateWallet()
      setMnemonic(wallet.mnemonic.split(" "))
      setAddress(wallet.address)
      setStep("create")
    } catch (error) {
      alert("Error al crear la wallet Core. Inténtalo de nuevo.")
    }
  }

  const handleRestoreWallet = async () => {
    if (!restoreMnemonic.trim()) {
      alert("Por favor ingresa tu frase semilla")
      return
    }

    try {
      const wallet = await restoreWallet(restoreMnemonic.trim())
      saveWallet(wallet)
      onAccountCreated(wallet.address, wallet.mnemonic)
    } catch (error) {
      alert("Frase semilla inválida. Verifica que sea correcta.")
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic.join(" "))
      setCopiedMnemonic(true)
      setTimeout(() => setCopiedMnemonic(false), 2000)
    } catch (error) {
      console.error("Error copiando al portapapeles:", error)
    }
  }

  const handleConfirmWord = (index: number, word: string) => {
    const newConfirmWords = [...confirmWords]
    newConfirmWords[index] = word
    setConfirmWords(newConfirmWords)
  }

  const handleConfirmMnemonic = () => {
    const isCorrect = confirmWords.every((word, index) => word.toLowerCase() === mnemonic[index].toLowerCase())

    if (isCorrect) {
      const walletData = { address, mnemonic: mnemonic.join(" ") }
      saveWallet(walletData)
      onAccountCreated(address, mnemonic.join(" "))
    } else {
      alert("Las palabras no coinciden. Por favor verifica e inténtalo de nuevo.")
    }
  }

  const isConfirmValid = confirmWords.every((word) => word.trim() !== "")

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-core-100 flex items-center justify-center p-4 relative">
      <CoreBackground />
      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center">
          <CoreDAOLogo size="md" variant="full" className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2 drop-shadow-lg">
            {step === "choice" && "Crear Wallet Core"}
            {step === "create" && "Tu frase semilla"}
            {step === "confirm" && "Confirma tu frase"}
            {step === "restore" && "Restaurar wallet"}
          </h1>
        </div>

        <Button variant="ghost" onClick={onBack} className="text-gray-700 hover:bg-gray-100 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        {step === "choice" && (
          <Card className="bg-white/90 backdrop-blur-lg border-core-200 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-gray-900">¿Qué deseas hacer?</CardTitle>
              <CardDescription className="text-gray-600">
                Crea una nueva wallet para Core Network o restaura una existente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleCreateWallet}
                disabled={isCreating}
                className="w-full bg-gradient-to-r from-core-500 to-core-600 hover:from-core-600 hover:to-core-700 text-white py-3"
              >
                {isCreating ? "Creando wallet Core..." : "Crear nueva wallet Core"}
              </Button>
              <Button
                onClick={() => setStep("restore")}
                variant="outline"
                className="w-full border-core-300 text-core-700 hover:bg-core-50"
              >
                Restaurar wallet existente
              </Button>

              <div className="bg-core-50 p-3 rounded-lg text-center">
                <div className="text-sm text-core-700">
                  <strong>Core Network:</strong> Chain ID 1116
                </div>
                <div className="text-xs text-core-600 mt-1">Compatible con MetaMask y wallets EVM</div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === "create" && (
          <Card className="bg-white/90 backdrop-blur-lg border-core-200 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2 text-yellow-600 mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">¡Muy importante!</span>
              </div>
              <CardTitle className="text-gray-900 text-lg">Guarda tu frase semilla</CardTitle>
              <CardDescription className="text-gray-600">
                Esta frase de 12 palabras es la única forma de recuperar tu wallet Core.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-core-50 rounded-lg p-4 border border-core-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 text-sm">Tu frase semilla Core:</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowMnemonic(!showMnemonic)}
                      className="text-gray-700 hover:bg-core-100 p-1"
                    >
                      {showMnemonic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyToClipboard}
                      className="text-gray-700 hover:bg-core-100 p-1"
                    >
                      {copiedMnemonic ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {mnemonic.map((word, index) => (
                    <div key={index} className="bg-white rounded p-2 text-center border border-core-200">
                      <span className="text-gray-500 text-xs">{index + 1}.</span>
                      <div className="text-gray-900 font-mono text-sm">{showMnemonic ? word : "••••••"}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="border-core-300 data-[state=checked]:bg-core-500"
                />
                <label htmlFor="terms" className="text-gray-700 text-sm leading-relaxed">
                  He guardado mi frase semilla de forma segura y entiendo que es mi responsabilidad mantenerla segura.
                </label>
              </div>

              <Button
                onClick={() => setStep("confirm")}
                disabled={!agreedToTerms}
                className="w-full bg-gradient-to-r from-core-500 to-core-600 hover:from-core-600 hover:to-core-700 text-white py-3"
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "confirm" && (
          <Card className="bg-white/90 backdrop-blur-lg border-core-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-900">Confirma tu frase semilla</CardTitle>
              <CardDescription className="text-gray-600">Ingresa las 12 palabras en el orden correcto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index}>
                    <Label className="text-gray-700 text-xs">{index + 1}.</Label>
                    <Input
                      value={confirmWords[index]}
                      onChange={(e) => handleConfirmWord(index, e.target.value)}
                      className="bg-white border-core-200 text-gray-900 placeholder-gray-400"
                      placeholder="palabra"
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={handleConfirmMnemonic}
                disabled={!isConfirmValid}
                className="w-full bg-gradient-to-r from-core-500 to-core-600 hover:from-core-600 hover:to-core-700 text-white py-3"
              >
                Confirmar y crear wallet Core
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "restore" && (
          <Card className="bg-white/90 backdrop-blur-lg border-core-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-900">Restaurar wallet Core</CardTitle>
              <CardDescription className="text-gray-600">Ingresa tu frase semilla de 12 palabras</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-700">Frase semilla</Label>
                <textarea
                  value={restoreMnemonic}
                  onChange={(e) => setRestoreMnemonic(e.target.value)}
                  placeholder="Ingresa las 12 palabras separadas por espacios"
                  className="w-full h-24 bg-white border border-core-200 rounded-md p-3 text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>

              <Button
                onClick={handleRestoreWallet}
                disabled={!restoreMnemonic.trim()}
                className="w-full bg-gradient-to-r from-core-500 to-core-600 hover:from-core-600 hover:to-core-700 text-white py-3"
              >
                Restaurar wallet Core
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
