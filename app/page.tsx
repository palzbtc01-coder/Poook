import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Platforms } from "@/components/sections/platforms";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { ResellerCta } from "@/components/sections/reseller-cta";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Platforms />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <Faq />
        <ResellerCta />
      </main>
      <Footer />
    </>
  );
}
