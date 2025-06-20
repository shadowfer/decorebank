"use client"

import { useState, useCallback } from "react"

interface Web3State {
  account: string | null
  balance: string
  chainId: number | null
  isConnected: boolean
  isLoading: boolean
}

export function useWeb3() {
  const [state, setState] = useState<Web3State>({
    account: null,
    balance: "0",
    chainId: null,
    isConnected: false,
    isLoading: false,
  })

  const connectWallet = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    // Simular conexión a Core Network
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const demoAccount = "0x" + Math.random().toString(16).substr(2, 40)
    const demoBalance = (Math.random() * 1000 + 100).toFixed(4) // CORE balance

    setState({
      account: demoAccount,
      balance: demoBalance,
      chainId: 1116, // Core Mainnet Chain ID
      isConnected: true,
      isLoading: false,
    })
  }, [])

  const disconnect = useCallback(() => {
    setState({
      account: null,
      balance: "0",
      chainId: null,
      isConnected: false,
      isLoading: false,
    })
  }, [])

  return {
    ...state,
    connectWallet,
    disconnect,
  }
}
