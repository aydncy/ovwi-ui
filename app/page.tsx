import LandingNav from './landing/LandingNav';
import Hero from './landing/Hero';
import Features from './landing/Features';
import DeveloperSection from './landing/DeveloperSection';
import Playground from './landing/Playground';
import Pricing from './landing/Pricing';
import FinalCTA from './landing/FinalCTA';
import Footer from './landing/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <LandingNav />
      <Hero />
      <Features />
      <DeveloperSection />
      <Playground />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
