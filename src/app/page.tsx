import Header from "@/components/Layout/Header";
import HeroSection from "@/components/Hero/HeroSection";
import FeaturesSection from "@/components/Features/FeaturesSection";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import PricingSection from "@/components/PricingSection/PricingSection";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <HeroSection />
        <FeaturesSection />
        <Services />
        <Testimonials />
        <PricingSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
