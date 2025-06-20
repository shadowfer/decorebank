"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Bitcoin,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Repeat,
  DollarSign,
  PiggyBank,
  AlertTriangle,
  LogOut,
  Eye,
  EyeOff,
  ChevronRight,
  Wallet,
  Clock,
} from "lucide-react"
import CoreDAOLogo from "@/components/core-dao-logo"
import Login from "@/components/login"

interface UserData {
  address: string
  mnemonic?: string
  loginMethod: "metamask" | "created_account"
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Estados del dashboard móvil
  const [activeTab, setActiveTab] = useState("home")
  const [showBalance, setShowBalance] = useState(true)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  // Estados para staking y préstamos
  const [stakingAmount, setStakingAmount] = useState("")
  const [borrowAmount, setBorrowAmount] = useState("")
  const [selectedCollateral, setSelectedCollateral] = useState("BTC")

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const savedSession = localStorage.getItem("corebank_session")
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession)
        setUserData(session)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Error loading saved session:", error)
        localStorage.removeItem("corebank_session")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (address: string, mnemonic?: string) => {
    const newUserData: UserData = {
      address,
      mnemonic,
      loginMethod: address === "metamask_connected" ? "metamask" : "created_account",
    }

    localStorage.setItem("corebank_session", JSON.stringify(newUserData))
    setUserData(newUserData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("corebank_session")
    localStorage.removeItem("corebank_wallet")
    setUserData(null)
    setIsLoggedIn(false)
  }

  // Mock data optimizado para el neobank Bitcoin-backed
  const balances = {
    btc: 0.25678901, // Bitcoin holdings
    lstBTC: 0.15234567, // Liquid staked Bitcoin
    usdt: 5420.5, // USDT borrowed/held
    usdc: 2750.25, // USDC borrowed/held
  }

  const stakingData = {
    totalStaked: 0.15234567, // lstBTC staked
    dailyYield: 0.00008234, // Daily yield in BTC
    monthlyYield: 0.00246, // Monthly yield in BTC
    apy: 5.8, // Annual percentage yield
    nextReward: "2h 15m", // Time to next reward
  }

  const loanData = {
    totalBorrowed: 7500, // Total USD borrowed
    availableCredit: 12500, // Available credit based on collateral
    collateralValue: 26800, // USD value of collateral
    ltv: 28, // Current loan-to-value ratio
    interestRate: 4.5, // Current interest rate
    nextPayment: 125.5, // Next payment amount
    paymentDue: "15 days", // Time until payment due
  }

  const recentTransactions = [
    {
      id: 1,
      type: "staking_reward",
      description: "lstBTC Staking Reward",
      amount: "+0.00008234 BTC",
      usdValue: "+$5.52",
      date: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "borrow",
      description: "Borrowed USDT",
      amount: "+2,500 USDT",
      usdValue: "+$2,500.00",
      date: "1 day ago",
      status: "completed",
    },
    {
      id: 3,
      type: "stake",
      description: "BTC → lstBTC",
      amount: "-0.05 BTC",
      usdValue: "-$3,350.00",
      date: "3 days ago",
      status: "completed",
    },
    {
      id: 4,
      type: "repay",
      description: "Loan Repayment",
      amount: "-500 USDT",
      usdValue: "-$500.00",
      date: "1 week ago",
      status: "completed",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatBTC = (amount: number) => {
    return `${amount.toFixed(8)} BTC`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const calculateMaxBorrow = () => {
    const collateralUSD = (balances.btc + balances.lstBTC) * 67000 // Assuming $67k BTC price
    return collateralUSD * 0.75 // 75% LTV max
  }

  // Mostrar loading mientras verifica sesión
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-core-100 flex items-center justify-center">
        <div className="text-gray-700 text-xl">Loading CoreBank...</div>
      </div>
    )
  }

  // Si no está logueado, mostrar login
  if (!isLoggedIn || !userData) {
    return <Login onLogin={handleLogin} />
  }

  // Dashboard móvil principal
  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto relative overflow-hidden">
      {/* Mobile Header */}
      <header className="bg-gradient-to-r from-core-500 to-core-600 text-white p-4 pb-6 safe-area-top">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CoreDAOLogo size="sm" variant="icon" />
            <div>
              <h1 className="text-lg font-bold">CoreBank</h1>
              <p className="text-xs text-core-100">Bitcoin Neobank</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20 p-2"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Total Portfolio Value */}
        <div className="text-center mb-4">
          <div className="text-3xl font-bold mb-1">{showBalance ? formatCurrency(26800) : "••••••"}</div>
          <div className="text-core-100 text-sm">Total Portfolio Value</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-300" />
            <span className="text-green-300 text-xs">+$285.50 (+1.08%) today</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-core-100">Bitcoin Holdings</div>
            <div className="font-semibold">{showBalance ? formatBTC(balances.btc + balances.lstBTC) : "••••••"}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-core-100">Staking Yield</div>
            <div className="font-semibold text-green-300">{stakingData.apy}% APY</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-xs text-core-100">Available Credit</div>
            <div className="font-semibold">{showBalance ? formatCurrency(loanData.availableCredit) : "••••••"}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 -mt-4 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              onClick={() => setSelectedAction("stake")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-14 flex-col gap-1 text-white font-semibold shadow-lg"
            >
              <PiggyBank className="w-5 h-5" />
              <span className="text-sm">Earn Yield</span>
            </Button>
            <Button
              onClick={() => setSelectedAction("borrow")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-14 flex-col gap-1 text-white font-semibold shadow-lg"
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Borrow</span>
            </Button>
          </div>

          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white shadow-sm">
            <TabsTrigger value="home" className="text-xs">
              Home
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="loans" className="text-xs">
              Loans
            </TabsTrigger>
            <TabsTrigger value="activity" className="text-xs">
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4">
            {/* Staking Section */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="w-5 h-5 text-orange-500" />
                    lstBTC Staking
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {stakingData.apy}% APY
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Currently Staked</div>
                    <div className="font-semibold">{formatBTC(stakingData.totalStaked)}</div>
                    <div className="text-xs text-gray-500">{formatCurrency(stakingData.totalStaked * 67000)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Daily Yield</div>
                    <div className="font-semibold text-green-600">+{formatBTC(stakingData.dailyYield)}</div>
                    <div className="text-xs text-gray-500">+{formatCurrency(stakingData.dailyYield * 67000)}</div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-green-800">Next Reward</div>
                      <div className="text-xs text-green-600">Auto-compound in {stakingData.nextReward}</div>
                    </div>
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                </div>

                <Button onClick={() => setSelectedAction("stake")} className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Stake More Bitcoin
                </Button>
              </CardContent>
            </Card>

            {/* Borrowing Section */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                    Stablecoin Loans
                  </div>
                  <Badge variant="outline">{loanData.interestRate}% APR</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Total Borrowed</div>
                    <div className="font-semibold">{formatCurrency(loanData.totalBorrowed)}</div>
                    <div className="text-xs text-gray-500">LTV: {loanData.ltv}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Available Credit</div>
                    <div className="font-semibold text-blue-600">{formatCurrency(loanData.availableCredit)}</div>
                    <div className="text-xs text-gray-500">Max 75% LTV</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Loan Health</span>
                    <span className="text-green-600">Healthy</span>
                  </div>
                  <Progress value={loanData.ltv} className="h-2" />
                  <div className="text-xs text-gray-500">Liquidation at 80% LTV</div>
                </div>

                {loanData.totalBorrowed > 0 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-blue-800">Next Payment</div>
                        <div className="text-xs text-blue-600">
                          {formatCurrency(loanData.nextPayment)} due in {loanData.paymentDue}
                        </div>
                      </div>
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                )}

                <Button onClick={() => setSelectedAction("borrow")} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Borrow Stablecoins
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.slice(0, 3).map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === "staking_reward"
                              ? "bg-green-100"
                              : tx.type === "borrow"
                                ? "bg-blue-100"
                                : tx.type === "stake"
                                  ? "bg-orange-100"
                                  : "bg-red-100"
                          }`}
                        >
                          {tx.type === "staking_reward" && <TrendingUp className="w-4 h-4 text-green-600" />}
                          {tx.type === "borrow" && <ArrowDownLeft className="w-4 h-4 text-blue-600" />}
                          {tx.type === "stake" && <Repeat className="w-4 h-4 text-orange-600" />}
                          {tx.type === "repay" && <ArrowUpRight className="w-4 h-4 text-red-600" />}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{tx.description}</div>
                          <div className="text-xs text-gray-500">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold text-sm ${
                            tx.amount.startsWith("+") ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {tx.amount}
                        </div>
                        <div className="text-xs text-gray-500">{tx.usdValue}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-3 text-core-600" onClick={() => setActiveTab("activity")}>
                  View All Activity
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Asset Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bitcoin className="w-6 h-6 text-orange-500" />
                      <div>
                        <div className="font-semibold">Bitcoin</div>
                        <div className="text-sm text-gray-500">{formatBTC(balances.btc)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(balances.btc * 67000)}</div>
                      <div className="text-sm text-green-600">+2.4%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <PiggyBank className="w-6 h-6 text-green-500" />
                      <div>
                        <div className="font-semibold">lstBTC (Staked)</div>
                        <div className="text-sm text-gray-500">{formatBTC(balances.lstBTC)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(balances.lstBTC * 67000)}</div>
                      <div className="text-sm text-green-600">+{stakingData.apy}% APY</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="font-semibold">Stablecoins</div>
                        <div className="text-sm text-gray-500">USDT + USDC</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(balances.usdt + balances.usdc)}</div>
                      <div className="text-sm text-gray-500">Stable</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+5.8%</div>
                    <div className="text-sm text-gray-600">Staking APY</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">4.5%</div>
                    <div className="text-sm text-gray-600">Borrow Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loans Tab */}
          <TabsContent value="loans" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Loan Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">{formatCurrency(loanData.totalBorrowed)}</div>
                    <div className="text-sm text-gray-600">Total Borrowed</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">{formatCurrency(loanData.collateralValue)}</div>
                    <div className="text-sm text-gray-600">Collateral Value</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Loan-to-Value Ratio</span>
                    <span className="font-semibold">{loanData.ltv}%</span>
                  </div>
                  <Progress value={loanData.ltv} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Safe</span>
                    <span>Liquidation at 80%</span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Payment Due</span>
                  </div>
                  <div className="text-sm text-yellow-700">
                    Next payment of {formatCurrency(loanData.nextPayment)} due in {loanData.paymentDue}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Repay
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Borrow More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Interest Rate Model */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Interest Rate Model</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Rate</span>
                    <Badge variant="outline">{loanData.interestRate}% APR</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Base Rate</span>
                    <span className="text-sm">2.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk Premium</span>
                    <span className="text-sm">2.0%</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Rates adjust automatically based on market conditions and your collateral ratio.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "staking_reward"
                              ? "bg-green-100"
                              : tx.type === "borrow"
                                ? "bg-blue-100"
                                : tx.type === "stake"
                                  ? "bg-orange-100"
                                  : "bg-red-100"
                          }`}
                        >
                          {tx.type === "staking_reward" && <TrendingUp className="w-5 h-5 text-green-600" />}
                          {tx.type === "borrow" && <ArrowDownLeft className="w-5 h-5 text-blue-600" />}
                          {tx.type === "stake" && <Repeat className="w-5 h-5 text-orange-600" />}
                          {tx.type === "repay" && <ArrowUpRight className="w-5 h-5 text-red-600" />}
                        </div>
                        <div>
                          <div className="font-medium">{tx.description}</div>
                          <div className="text-sm text-gray-500">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold ${tx.amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {tx.amount}
                        </div>
                        <div className="text-sm text-gray-500">{tx.usdValue}</div>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Modals */}
      {selectedAction === "stake" && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Stake Bitcoin</h2>
              <Button variant="ghost" onClick={() => setSelectedAction(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Earn {stakingData.apy}% APY</span>
                </div>
                <p className="text-sm text-green-700">
                  Convert your Bitcoin to lstBTC and start earning passive yield automatically.
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">Amount to Stake</Label>
                <div className="mt-1 relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stakingAmount}
                    onChange={(e) => setStakingAmount(e.target.value)}
                    className="pr-16"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">BTC</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Available: {formatBTC(balances.btc)}</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>You'll receive:</span>
                  <span className="font-semibold">{stakingAmount || "0.00"} lstBTC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Daily yield:</span>
                  <span className="text-green-600">
                    +{(((Number(stakingAmount) || 0) * (stakingData.apy / 100)) / 365).toFixed(8)} BTC
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!stakingAmount || Number(stakingAmount) <= 0}
              >
                Stake Bitcoin
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedAction === "borrow" && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Borrow Stablecoins</h2>
              <Button variant="ghost" onClick={() => setSelectedAction(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Borrow at {loanData.interestRate}% APR</span>
                </div>
                <p className="text-sm text-blue-700">
                  Use your Bitcoin as collateral to borrow USDT or USDC instantly.
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium">Collateral Type</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Button
                    variant={selectedCollateral === "BTC" ? "default" : "outline"}
                    onClick={() => setSelectedCollateral("BTC")}
                    className="h-12"
                  >
                    <Bitcoin className="w-4 h-4 mr-2" />
                    Bitcoin
                  </Button>
                  <Button
                    variant={selectedCollateral === "lstBTC" ? "default" : "outline"}
                    onClick={() => setSelectedCollateral("lstBTC")}
                    className="h-12"
                  >
                    <PiggyBank className="w-4 h-4 mr-2" />
                    lstBTC
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Amount to Borrow</Label>
                <div className="mt-1 relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={borrowAmount}
                    onChange={(e) => setBorrowAmount(e.target.value)}
                    className="pr-20"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">USDT</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Max available: {formatCurrency(calculateMaxBorrow())}</div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Collateral required:</span>
                  <span className="font-semibold">{((Number(borrowAmount) || 0) / 67000 / 0.75).toFixed(8)} BTC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>New LTV ratio:</span>
                  <span className="text-blue-600">
                    {(
                      ((loanData.totalBorrowed + (Number(borrowAmount) || 0)) / loanData.collateralValue) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Interest rate:</span>
                  <span>{loanData.interestRate}% APR</span>
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!borrowAmount || Number(borrowAmount) <= 0}
              >
                Borrow Stablecoins
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="grid grid-cols-4 gap-1">
          <Button
            variant={activeTab === "home" ? "default" : "ghost"}
            onClick={() => setActiveTab("home")}
            className="flex-col h-12 text-xs"
          >
            <Wallet className="w-4 h-4" />
            Home
          </Button>
          <Button
            variant={activeTab === "portfolio" ? "default" : "ghost"}
            onClick={() => setActiveTab("portfolio")}
            className="flex-col h-12 text-xs"
          >
            <TrendingUp className="w-4 h-4" />
            Portfolio
          </Button>
          <Button
            variant={activeTab === "loans" ? "default" : "ghost"}
            onClick={() => setActiveTab("loans")}
            className="flex-col h-12 text-xs"
          >
            <CreditCard className="w-4 h-4" />
            Loans
          </Button>
          <Button
            variant={activeTab === "activity" ? "default" : "ghost"}
            onClick={() => setActiveTab("activity")}
            className="flex-col h-12 text-xs"
          >
            <Clock className="w-4 h-4" />
            Activity
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="h-16"></div>
    </div>
  )
}
