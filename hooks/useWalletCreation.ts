"use client"

import { useState } from "react"

interface WalletData {
  address: string
  mnemonic: string
}

export function useWalletCreation() {
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  // Palabras de ejemplo para la demo
  const demoWords = [
    "abandon",
    "ability",
    "able",
    "about",
    "above",
    "absent",
    "absorb",
    "abstract",
    "absurd",
    "abuse",
    "access",
    "accident",
  ]

  const generateWallet = async (): Promise<WalletData> => {
    setIsCreating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const walletData: WalletData = {
      address: "0x" + Math.random().toString(16).substr(2, 40),
      mnemonic: demoWords.join(" "),
    }

    setWallet(walletData)
    setIsCreating(false)
    return walletData
  }

  const restoreWallet = async (mnemonic: string): Promise<WalletData> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (mnemonic.split(" ").length !== 12) {
      throw new Error("Frase semilla inválida")
    }

    const walletData: WalletData = {
      address: "0x" + Math.random().toString(16).substr(2, 40),
      mnemonic: mnemonic,
    }

    setWallet(walletData)
    return walletData
  }

  const saveWallet = (walletData: WalletData) => {
    localStorage.setItem("corebank_wallet", JSON.stringify(walletData))
  }

  return {
    wallet,
    isCreating,
    generateWallet,
    restoreWallet,
    saveWallet,
  }
}
