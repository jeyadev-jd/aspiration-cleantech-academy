import type { Metadata } from "next";
import HeroBanner from "@/components/academy/HeroBanner";
import HeroStats from "@/components/academy/HeroStats";
import About from "@/components/academy/About";
import StaticCourseCatalog from "@/components/academy/StaticCourseCatalog";
import PartnersGrid from "@/components/academy/PartnersGrid";
import WhyChooseUs from "@/components/academy/WhyChooseUs";
import CareerOpportunities from "@/components/academy/CareerOpportunities";
import Testimonials from "@/components/academy/Testimonials";
import Faq from "@/components/academy/Faq";

export const metadata: Metadata = {
  title: "Best HVAC Course in Chennai & Pan India | Aspiration Cleantech Academy",
  description:
    "Aspiration Cleantech Academy offers the best HVAC course in Chennai with pan-India training in entrepreneurship, digital marketing, and sales, backed by Aspiration Cleantech Ventures and in partnership with HVACRedu Inc. Register to begin.",
  keywords: [
    "best HVAC course in Chennai",
    "best HVAC course in India",
    "pan India HVAC training",
    "HVACRedu Inc",
    "Aspiration Cleantech Academy",
  ],
};

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <HeroStats />
      <About />
      <StaticCourseCatalog />
      <PartnersGrid />
      <WhyChooseUs />
      <CareerOpportunities />
      <Testimonials />
      <Faq />
    </main>
  );
}
