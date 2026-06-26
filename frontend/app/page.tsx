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
  title: "Aspiration Cleantech Academy | HVAC & Career Training Institute",
  description:
    "Aspiration Cleantech Academy offers practical, job-oriented HVAC, entrepreneurship, digital marketing, and sales training, backed by Aspiration Cleantech Ventures' industrial cleantech expertise. Register to begin.",
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
