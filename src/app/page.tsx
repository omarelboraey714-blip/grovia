import Header from "@/components/Layout/Header";
import HeroSection from "@/components/Hero/HeroSection";
import FeaturesSection from "@/components/Features/FeaturesSection";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import PricingSection from "@/components/PricingSection/PricingSection";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Layout/Footer";

export default async function Home() {
  // توليد clipPaths وdelays لـ PixelImage
  const grid = { rows: 8, cols: 8 }; // نفس الـ customGrid المستخدم في HeroSection
  const total = grid.rows * grid.cols;
  const maxAnimationDelay = 1200; // نفس القيمة الافتراضية في PixelImage
  const delays = Array.from(
    { length: total },
    () => Math.random() * maxAnimationDelay
  );
  const clipPaths = Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / grid.cols);
    const col = index % grid.cols;
    return `polygon(${col * (100 / grid.cols)}% ${row * (100 / grid.rows)}%, ${
      (col + 1) * (100 / grid.cols)
    }% ${row * (100 / grid.rows)}%, ${(col + 1) * (100 / grid.cols)}% ${
      (row + 1) * (100 / grid.rows)
    }%, ${col * (100 / grid.cols)}% ${(row + 1) * (100 / grid.rows)}%)`;
  });

  // توليد rotateAngles وopacities لـ AnimatedTestimonials
  const testimonialCount = 5; // عدد الـ testimonials في AnimatedTestimonials
  const rotateAngles = Array.from({ length: testimonialCount }, () => {
    const angle = Math.floor(Math.random() * 21) - 10; // زوايا بين -10 و10 درجات
    return angle; // هنمرر الزاوية بس، وهنكون الـ transform في AnimatedTestimonials
  });
  const opacities = Array.from({ length: testimonialCount }, (_, index) =>
    index === 0 ? 1 : 0.7
  ); // opacity للعنصر النشط = 1، والباقي = 0.7

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection delays={delays} clipPaths={clipPaths} />
        <FeaturesSection />
        <Services />
        <Testimonials rotateAngles={rotateAngles} opacities={opacities} />
        <PricingSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
