'use client'

import {
  AboutSection,
  BonusRatesSection,
  CtaBannerSection,
  EligibilitySection,
  HeroSection,
  OfficeLocationSection,
  ProductsShowcaseSection,
  WhyChoosePliSection,
} from '@/components/home'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Home() {
  // Intersection Observer for scroll animations
  useScrollAnimation()

  return (
    <main className="min-h-screen bg-(--bg-light)">
      {/* 1. Hero Section + Quick Calculator Widget */}
      <HeroSection />

      {/* 2. About & Sovereign Heritage Section */}
      <AboutSection />

      {/* 3. Advantages & Key Features Grid */}
      <WhyChoosePliSection />

      {/* 4. Eligibility Guide Section */}
      <EligibilitySection />

      {/* 5. Complete 12 Products Section (PLI + RPLI) */}
      <ProductsShowcaseSection />

      {/* 6. Official Bonus Rates Comparison Table */}
      <BonusRatesSection />

      {/* 7. Google Business Profile & Live Map Location */}
      <OfficeLocationSection />

      {/* 8. Call to Action Section */}
      <CtaBannerSection />
    </main>
  )
}
