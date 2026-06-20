const navLinks = ['Product', 'How It Works', 'Pricing', 'Blog', 'Partners', 'Integrations']
const legalLinks = ['Privacy Policy', 'Terms of Service']

export default function Footer() {
  return (
    <footer className="bg-stone-900 border-t border-stone-800">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 bg-stone-700 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-stone-400 rounded-sm" />
              </div>
              <span className="font-sans font-semibold text-stone-100 tracking-tight text-[15px]">Cadence</span>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed max-w-xs">
              Every lead called. Every outcome logged. Every appointment tracked.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {navLinks.map((item) => (
              <a key={item} href="#" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            {legalLinks.map((item) => (
              <a key={item} href="#" className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-stone-600">
            Built for real estate agents, teams, and brokerages.
          </p>
        </div>
      </div>
    </footer>
  )
}
