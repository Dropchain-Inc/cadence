'use client'

import { useState, useMemo } from 'react'

const RESPONSE_OPTIONS = [
  { label: '< 5 min',   multiplier: 0.82 },
  { label: '5–15 min',  multiplier: 0.60 },
  { label: '15–60 min', multiplier: 0.36 },
  { label: '1–4 hrs',   multiplier: 0.18 },
  { label: '4+ hrs',    multiplier: 0.07 },
]

const CADENCE_CONTACT_RATE = 0.82

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${Math.round(n)}`
}

function SliderRow({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string
  hint?: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  display: string
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <div className="text-base font-medium text-stone-800">{label}</div>
          {hint && <div className="text-sm text-stone-400 mt-0.5">{hint}</div>}
        </div>
        <span className="text-lg font-semibold text-stone-900 tabular-nums ml-4 shrink-0">{display}</span>
      </div>
      <div className="relative h-1.5 bg-stone-200 rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-stone-900 rounded-full"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ margin: 0 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-stone-900 rounded-full border-2 border-white shadow-md pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  )
}

export default function Calculator() {
  const [leads, setLeads] = useState(50)
  const [responseIdx, setResponseIdx] = useState(3)
  const [callRate, setCallRate] = useState(65)
  const [avgDeal, setAvgDeal] = useState(12000)
  const [closeRate, setCloseRate] = useState(8)

  const calc = useMemo(() => {
    const speedMult = RESPONSE_OPTIONS[responseIdx].multiplier
    const callFrac = callRate / 100
    const closeFrac = closeRate / 100

    const contactsNow = leads * callFrac * speedMult
    const dealsNow = contactsNow * closeFrac
    const revenueNow = dealsNow * avgDeal

    const contactsCadence = leads * CADENCE_CONTACT_RATE
    const dealsCadence = contactsCadence * closeFrac
    const revenueCadence = dealsCadence * avgDeal

    const monthlyLeak = Math.max(0, revenueCadence - revenueNow)
    const annualLeak = monthlyLeak * 12
    const leadsUncalled = Math.round(leads * (1 - callFrac))

    return {
      dealsNow: dealsNow.toFixed(1),
      dealsCadence: dealsCadence.toFixed(1),
      dealsLost: Math.max(0, dealsCadence - dealsNow).toFixed(1),
      monthlyLeak,
      annualLeak,
      leadsUncalled,
    }
  }, [leads, responseIdx, callRate, avgDeal, closeRate])

  const isHighLeak = calc.annualLeak > 100_000

  return (
    <main className="min-h-screen bg-stone-50 pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="mb-12">
          <div className="mb-3 text-xs font-semibold text-stone-400 uppercase tracking-[0.12em]">
            Revenue Leak Calculator
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-medium text-stone-900 max-w-xl text-balance leading-[1.1] mb-4">
            How much are slow follow-ups costing you?
          </h1>
          <p className="text-stone-500 text-base lg:text-lg leading-relaxed max-w-lg">
            Enter your current numbers. See the revenue walking out the door before your team picks up the phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* Input cards */}
          <div className="space-y-4">

            {/* Monthly leads */}
            <div className="bg-white rounded-2xl p-7 border border-stone-100" style={{ boxShadow: 'var(--shadow-card)' }}>
              <SliderRow
                label="Monthly lead volume"
                hint="Total inbound leads across all sources"
                value={leads}
                min={10}
                max={500}
                step={5}
                onChange={setLeads}
                display={`${leads} leads`}
              />
            </div>

            {/* Response time */}
            <div className="bg-white rounded-2xl p-7 border border-stone-100" style={{ boxShadow: 'var(--shadow-card)' }}>
              <div className="text-base font-medium text-stone-800 mb-1">Average response time to new leads</div>
              <div className="text-sm text-stone-400 mb-4">How fast does your team typically call back?</div>
              <div className="grid grid-cols-5 gap-2">
                {RESPONSE_OPTIONS.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setResponseIdx(i)}
                    className={`py-2.5 px-1 rounded-xl text-xs font-semibold text-center transition-all ${
                      responseIdx === i
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-50 text-stone-500 border border-stone-200 hover:border-stone-400 hover:text-stone-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {responseIdx >= 3 && (
                <p className="mt-4 text-sm text-amber-700 bg-amber-50 rounded-xl px-4 py-2.5 leading-relaxed">
                  At {RESPONSE_OPTIONS[responseIdx].label}, you're reaching roughly{' '}
                  <strong>{Math.round(RESPONSE_OPTIONS[responseIdx].multiplier * 100)}%</strong> of the leads you call —
                  compared to 82% with a sub-2-minute response.
                </p>
              )}
            </div>

            {/* % leads called */}
            <div className="bg-white rounded-2xl p-7 border border-stone-100" style={{ boxShadow: 'var(--shadow-card)' }}>
              <SliderRow
                label="% of leads your team actually calls"
                hint="Industry average is around 52%"
                value={callRate}
                min={10}
                max={100}
                step={5}
                onChange={setCallRate}
                display={`${callRate}%`}
              />
              {callRate < 100 && calc.leadsUncalled > 0 && (
                <p className="mt-4 text-sm text-stone-400 leading-relaxed">
                  <span className="font-semibold text-stone-600">{calc.leadsUncalled} leads/month</span> never receive a
                  call — zero chance of converting them.
                </p>
              )}
            </div>

            {/* Avg deal value */}
            <div className="bg-white rounded-2xl p-7 border border-stone-100" style={{ boxShadow: 'var(--shadow-card)' }}>
              <SliderRow
                label="Average commission per closed deal"
                hint="Your typical gross commission on a transaction"
                value={avgDeal}
                min={3000}
                max={50000}
                step={1000}
                onChange={setAvgDeal}
                display={`$${avgDeal.toLocaleString()}`}
              />
            </div>

            {/* Close rate */}
            <div className="bg-white rounded-2xl p-7 border border-stone-100" style={{ boxShadow: 'var(--shadow-card)' }}>
              <SliderRow
                label="Lead-to-close rate"
                hint="Of the leads you contact and qualify, what % do you close?"
                value={closeRate}
                min={1}
                max={30}
                step={1}
                onChange={setCloseRate}
                display={`${closeRate}%`}
              />
            </div>

            {/* Methodology note */}
            <p className="text-xs text-stone-400 leading-relaxed px-1">
              Model based on MIT/InsideSales research on response-time contact rates and WAV Group Agent Responsiveness Study.
              Cadence contact rate assumes consistent sub-2-minute response on 100% of inbound leads.
            </p>
          </div>

          {/* Results panel */}
          <div className="lg:sticky lg:top-28 space-y-3">
            <div className="bg-stone-900 rounded-2xl p-7">
              <div className="text-xs text-stone-500 font-semibold uppercase tracking-[0.12em] mb-7">
                Your revenue leak
              </div>

              <div className="mb-1 text-stone-500 text-sm">Per year</div>
              <div
                className="font-display text-5xl font-light leading-none mb-5"
                style={{ color: isHighLeak ? '#B8973E' : '#f5f5f4' }}
              >
                {fmt(calc.annualLeak)}
              </div>

              <div className="mb-1 text-stone-500 text-sm">Per month</div>
              <div className="font-display text-2xl font-light text-stone-200 leading-none mb-8">
                {fmt(calc.monthlyLeak)}
              </div>

              <div className="border-t border-stone-800 pt-6 space-y-4">
                {[
                  { label: 'Leads never called',    value: `${calc.leadsUncalled}/mo`, dim: true  },
                  { label: 'Deals closed now',      value: `${calc.dealsNow}/mo`,      dim: false },
                  { label: 'Deals with Cadence',    value: `${calc.dealsCadence}/mo`,  dim: false },
                  { label: 'Deals lost to the gap', value: `${calc.dealsLost}/mo`,     dim: false },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">{row.label}</span>
                    <span className={`text-sm font-semibold tabular-nums ${i === 3 ? 'text-amber-400' : 'text-stone-200'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#demo"
              className="block w-full py-4 bg-stone-900 text-white font-medium text-base rounded-2xl text-center hover:bg-stone-800 transition-colors border border-stone-800"
            >
              Book a Demo — Close This Gap
            </a>

            <a
              href="/"
              className="block w-full py-3.5 text-stone-500 font-medium text-sm rounded-2xl text-center hover:text-stone-700 transition-colors border border-stone-200 bg-white"
            >
              ← Back to Cadence
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
