import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { SolutionSection } from '@/components/sections/SolutionSection';
import { ConceptSection } from '@/components/sections/ConceptSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { RegionalSection } from '@/components/sections/RegionalSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FAQ } from '@/components/sections/FAQ';
import { ContactForm } from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ConceptSection />
        <UseCasesSection />
        <RegionalSection />
        <StatsSection />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
