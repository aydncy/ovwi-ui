import LandingNav from './landing/LandingNav';
import Hero from './landing/Hero';
import Features from './landing/Features';
import DeveloperSection from './landing/DeveloperSection';
import Playground from './landing/Playground';
import ArchitectureDiagram from './landing/ArchitectureDiagram';
import WorkflowProof from './landing/WorkflowProof';
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
      <ArchitectureDiagram />
      <WorkflowProof />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
