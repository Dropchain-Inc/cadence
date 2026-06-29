import { NextRequest, NextResponse } from 'next/server'
import { createBooking } from '@/lib/google-calendar'

export async function POST(request: NextRequest) {
  let body: { slot?: string; name?: string; email?: string; notes?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { slot, name, email, notes } = body

  if (!slot || !name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const slotDate = new Date(slot)
  if (isNaN(slotDate.getTime()) || slotDate < new Date()) {
    return NextResponse.json({ error: 'Invalid or past slot' }, { status: 400 })
  }

  try {
    const booking = await createBooking(slot, name.trim(), email.trim(), notes?.trim())
    return NextResponse.json({ success: true, ...booking })
  } catch (err) {
    console.error('[book]', err)
    return NextResponse.json({ error: 'Booking failed — please try another time' }, { status: 500 })
  }
}
