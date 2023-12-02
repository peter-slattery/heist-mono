import { Purchase } from "@heist/common/types"
import { useEffect, useState } from "react"
import { useAuth } from "../auth/AuthContext"
import { formatMoney } from "../utils/formatMoney"

const compoundInterest = (p: number, rate: number, years: number) => {
  return p * Math.pow(Math.E, rate * years)
}

export const useUserPurchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [total, setTotal] = useState<{
    today: number
    atGoal: number
  }>({ today: 0, atGoal: 0 })

  const { api, user } = useAuth()
  useEffect(() => {
    if (!user) return

    api.userPurchasesGet({}).then((res) => {
      const purchases = res.purchases.map((p) => ({
        ...p,
        price: formatMoney(parseFloat(p.price)),
      }))
      setPurchases(purchases)
      const total = res.purchases.reduce((total, purchase) => {
        return total + parseFloat(purchase.price)
      }, 0)
      setTotal({
        today: total,
        atGoal: compoundInterest(total, 0.05, 4),
      })
    })
  }, [user])

  return { purchases, total }
}
