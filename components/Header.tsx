'use client'

import { useState, useEffect } from 'react'
import Logo from './Logo'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/70 shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" aria-label="Cadence home" className="transition-opacity hover:opacity-70">
          <Logo variant="dark" />
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {['Product', 'How It Works', 'Results', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#demo"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-stone-900 text-stone-50 text-sm font-semibold rounded-full hover:bg-stone-800 transition-colors"
        >
          Book a Free Demo
        </a>

        <div className="md:hidden flex items-center gap-2">
          <a
            href="#demo"
            className="inline-flex items-center px-4 py-2 bg-stone-900 text-stone-50 text-xs font-semibold rounded-full hover:bg-stone-800 transition-colors"
          >
            Book Demo
          </a>
          <button className="p-2 text-stone-600" aria-label="Open menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
