import { NextRequest, NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/google-calendar'

export async function GET(request: NextRequest) {
  const date = new URL(request.url).searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
  }

  // Reject past dates
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })
  if (date <= today) {
    return NextResponse.json({ slots: [] })
  }

  // Reject weekends
  const dow = new Date(date + 'T12:00:00Z').getUTCDay()
  if (dow === 0 || dow === 6) {
    return NextResponse.json({ slots: [] })
  }

  try {
    const slots = await getAvailableSlots(date)
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('[availability]', err)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}
