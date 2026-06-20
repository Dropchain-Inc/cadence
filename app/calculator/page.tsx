import Header from '@/components/Header'
import Calculator from './Calculator'

export const metadata = {
  title: 'Revenue Leak Calculator — Cadence',
  description: 'Find out how much slow lead follow-up is costing your real estate business.',
}

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <Calculator />
    </>
  )
}
