"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, Zap, Globe, Bitcoin, TrendingUp, DollarSign } from "lucide-react"
import { useWeb3 } from "@/hooks/useWeb3"
import CoreBackground from "./core-background"
import CoreDAOLogo from "./core-dao-logo"
import CreateAccount from "./create-account"
import { useState } from "react"

interface LoginProps {
  onLogin: (address: string, mnemonic?: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const { connectWallet, isLoading } = useWeb3()
  const [showCreateAccount, setShowCreateAccount] = useState(false)

  const handleConnect = async () => {
    await connectWallet()
    onLogin("metamask_connected")
  }

  const handleAccountCreated = (address: string, mnemonic: string) => {
    setShowCreateAccount(false)
    onLogin(address, mnemonic)
  }

  if (showCreateAccount) {
    return <CreateAccount onAccountCreated={handleAccountCreated} onBack={() => setShowCreateAccount(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-core-100 flex flex-col">
      <CoreBackground />

      {/* Mobile-first layout */}
      <div className="flex-1 flex flex-col justify-center px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <CoreDAOLogo size="lg" variant="full" className="justify-center mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-3">CoreBank</h1>
          <p className="text-xl text-gray-600 mb-2">Bitcoin Neobank</p>
          <p className="text-sm text-core-600 font-medium">🚀 Powered by Core DAO • Bitcoin-Secured DeFi</p>
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 gap-4 mb-8 max-w-md mx-auto w-full">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-core-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Earn 5.8% APY</h3>
                <p className="text-sm text-gray-600">Stake Bitcoin, earn yield automatically</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-core-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Borrow at 4.5%</h3>
                <p className="text-sm text-gray-600">Use Bitcoin as collateral for stablecoins</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-core-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Bitcoin-Backed</h3>
                <p className="text-sm text-gray-600">Revolut-like interface, Bitcoin security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-white/95 backdrop-blur-lg border-core-200 shadow-xl max-w-md mx-auto w-full">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-gray-900 text-xl">Get Started</CardTitle>
            <CardDescription className="text-gray-600">Connect your wallet or create a new account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleConnect}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-core-500 to-core-600 hover:from-core-600 hover:to-core-700 text-white py-3 text-lg font-semibold shadow-lg h-12"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Connect MetaMask
                </div>
              )}
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Button
              onClick={() => setShowCreateAccount(true)}
              variant="outline"
              className="w-full border-core-300 text-core-700 hover:bg-core-50 py-3 text-lg font-semibold h-12"
            >
              Create New Wallet
            </Button>

            {/* Features */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 text-gray-700">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm">Bitcoin-secured DeFi protocols</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Instant stablecoin borrowing</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Core Network • Chain ID: 1116</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm mt-6 max-w-md mx-auto">
          <p className="mb-2">
            Need MetaMask?{" "}
            <a
              href="https://metamask.io"
              target="_blank"
              className="text-core-600 underline font-semibold hover:text-core-700"
              rel="noreferrer"
            >
              Download here
            </a>
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <div>Network: Core Mainnet</div>
            <div>RPC: https://rpc.coredao.org</div>
          </div>
        </div>
      </div>
    </div>
  )
}
