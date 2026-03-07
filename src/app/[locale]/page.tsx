import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyEmaiSection } from '@/components/sections/WhyEmaiSection';
import { FAQ } from '@/components/sections/FAQ';
import { ContactForm } from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <WhyEmaiSection />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
