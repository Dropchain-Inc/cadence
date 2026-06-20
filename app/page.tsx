import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import CalendarSection from '@/components/CalendarSection'
import StatsSection from '@/components/StatsSection'
import FeaturesSection from '@/components/FeaturesSection'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CalendarSection />
      <StatsSection />
      <FeaturesSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
