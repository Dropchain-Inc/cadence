'use client'

import { useState, useEffect } from 'react'

type Step = 'date' | 'time' | 'form' | 'submitting' | 'confirmed' | 'error'

interface Booking {
  start: string
  calendarLink: string
}

// Generate the next `count` weekdays starting from tomorrow
function upcomingWeekdays(count: number): Date[] {
  const days: Date[] = []
  const cursor = new Date()
  cursor.setDate(cursor.getDate() + 1)
  while (days.length < count) {
    const dow = cursor.getDay()
    if (dow !== 0 && dow !== 6) days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

function toDateStr(d: Date): string {
  return d.toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })
}

function formatDisplayDate(d: Date) {
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
    day: d.toLocaleDateString('en-US', { day: 'numeric' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
  }
}

function formatTime(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago',
    hour12: true,
  }).format(new Date(iso))
}

function formatFullDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago',
    hour12: true,
  }).format(new Date(iso))
}

export default function BookingWidget() {
  const [step, setStep] = useState<Step>('date')
  const [days] = useState(() => upcomingWeekdays(28))
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [slots, setSlots] = useState<string[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [booking, setBooking] = useState<Booking | null>(null)

  useEffect(() => {
    if (!selectedDate) return
    setSlotsLoading(true)
    setSlotsError(false)
    setSlots([])
    fetch(`/api/availability?date=${selectedDate}`)
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || data.error) {
          console.error('[availability]', data.error)
          setSlotsError(true)
        } else {
          setSlots(data.slots ?? [])
        }
        setSlotsLoading(false)
      })
      .catch(() => {
        setSlotsError(true)
        setSlotsLoading(false)
      })
  }, [selectedDate])

  function selectDate(dateStr: string) {
    setSelectedDate(dateStr)
    setSelectedSlot(null)
    setStep('time')
  }

  function selectSlot(slot: string) {
    setSelectedSlot(slot)
    setStep('form')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedSlot || !name.trim() || !email.trim()) return
    setStep('submitting')
    setSubmitError('')

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot: selectedSlot, name: name.trim(), email: email.trim(), notes: notes.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      setBooking({ start: data.start, calendarLink: data.calendarLink })
      setStep('confirmed')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong')
      setStep('form')
    }
  }

  // ── Confirmed ────────────────────────────────────────────────────────────────
  if (step === 'confirmed' && booking) {
    return (
      <div className="rounded-3xl bg-stone-50 border border-stone-100 p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl font-medium text-stone-900 mb-2">You&apos;re booked.</h3>
        <p className="text-stone-500 text-base mb-1">{formatFullDate(booking.start)} CT</p>
        <p className="text-stone-400 text-sm mb-8">
          A calendar invite has been sent to <span className="text-stone-600 font-medium">{email}</span>.
        </p>
        {booking.calendarLink && (
          <a
            href={booking.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-sm font-semibold rounded-full hover:bg-stone-800 transition-colors"
          >
            Open in Google Calendar
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-stone-200 bg-white overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
      {/* Progress bar */}
      <div className="h-1 bg-stone-100">
        <div
          className="h-full bg-cadence-gold transition-all duration-500"
          style={{ width: step === 'date' ? '20%' : step === 'time' ? '50%' : '85%' }}
        />
      </div>

      <div className="p-8 lg:p-10">

        {/* ── Step: Date ──────────────────────────────────────────────────── */}
        {step === 'date' && (
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-[0.12em] mb-2">Step 1 of 3</p>
            <h3 className="font-display text-2xl font-medium text-stone-900 mb-6">Pick a date</h3>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
              {days.map((d) => {
                const ds = toDateStr(d)
                const { weekday, day, month } = formatDisplayDate(d)
                return (
                  <button
                    key={ds}
                    onClick={() => selectDate(ds)}
                    className="flex flex-col items-center py-3 px-1 rounded-2xl border border-stone-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-150 text-stone-700 group"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-stone-400 group-hover:text-stone-400 mb-1">{weekday}</span>
                    <span className="text-lg font-semibold leading-none mb-0.5">{day}</span>
                    <span className="text-[10px] text-stone-400 group-hover:text-stone-500">{month}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Step: Time ──────────────────────────────────────────────────── */}
        {step === 'time' && (
          <div>
            <button
              onClick={() => setStep('date')}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors mb-4"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-[0.12em] mb-2">Step 2 of 3</p>
            <h3 className="font-display text-2xl font-medium text-stone-900 mb-1">Pick a time</h3>
            <p className="text-sm text-stone-400 mb-6">All times in CT · 20-minute call</p>

            {slotsLoading && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-11 rounded-xl bg-stone-100 animate-pulse" />
                ))}
              </div>
            )}

            {slotsError && (
              <p className="text-sm text-red-500">Couldn&apos;t load availability. Please try again or pick another date.</p>
            )}

            {!slotsLoading && !slotsError && slots.length === 0 && (
              <div className="text-center py-8">
                <p className="text-stone-400 text-sm mb-4">No availability on this day.</p>
                <button
                  onClick={() => setStep('date')}
                  className="text-sm font-medium text-stone-700 underline"
                >
                  Choose another date
                </button>
              </div>
            )}

            {!slotsLoading && slots.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => selectSlot(slot)}
                    className="py-2.5 px-3 rounded-xl border border-stone-200 text-sm font-medium text-stone-700 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-150"
                  >
                    {formatTime(slot)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Step: Form ──────────────────────────────────────────────────── */}
        {(step === 'form' || step === 'submitting') && selectedSlot && (
          <div>
            <button
              onClick={() => setStep('time')}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors mb-4"
              disabled={step === 'submitting'}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-[0.12em] mb-2">Step 3 of 3</p>
            <h3 className="font-display text-2xl font-medium text-stone-900 mb-1">Your info</h3>
            <p className="text-sm text-stone-400 mb-6">
              {formatFullDate(selectedSlot)} CT
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1.5">Full name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 transition-colors"
                    disabled={step === 'submitting'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@brokerage.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 transition-colors"
                    disabled={step === 'submitting'}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-1.5">
                  Team size / context <span className="font-normal text-stone-300">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 4-agent team, ~80 Zillow leads/month, using Follow Up Boss"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-400 transition-colors resize-none"
                  disabled={step === 'submitting'}
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={step === 'submitting' || !name.trim() || !email.trim()}
                className="w-full py-4 bg-stone-900 text-white text-sm font-semibold rounded-full hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {step === 'submitting' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Booking…
                  </>
                ) : (
                  <>
                    Confirm Demo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-xs text-stone-400 text-center">
                A calendar invite will be sent to your email.
              </p>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
