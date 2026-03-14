import { NavHeader } from "./components/NavHeader";
import { HeroSection } from "./components/HeroSection";
import { ValueProposition } from "./components/ValueProposition";
import { PricingTiers } from "./components/PricingTiers";
import { ContactSection } from "./components/ContactUs";
import { RecentWorkSection } from "./components/RecentWorkSection";
import { AboutSection } from "./components/AboutSection";
import { AboutMeSection } from "./components/AboutMeSection";
import { Footer } from "./components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 relative transition-colors">

      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

      <NavHeader />

      <HeroSection />

      <AboutSection />

      <ValueProposition />

      <PricingTiers />

      <RecentWorkSection />

      <AboutMeSection />

      <ContactSection />

      <Footer />

    </main>
  );
}
