import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import CalendarSection from '@/components/CalendarSection'
import StatsSection from '@/components/StatsSection'
import FeaturesSection from '@/components/FeaturesSection'
import FAQSection from '@/components/FAQSection'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Cadence',
  applicationCategory: 'BusinessApplication',
  description:
    'Cadence is AI real estate lead follow-up automation. It calls every online and Zillow lead back in under 2 minutes, qualifies leads in your voice and script, books appointments 24/7, and logs every call to your CRM.',
  audience: {
    '@type': 'Audience',
    audienceType: 'Real estate agents, teams, and brokerages',
  },
  offers: { '@type': 'Offer', category: 'Real estate appointment setting software' },
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <CalendarSection />
      <StatsSection />
      <FeaturesSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
