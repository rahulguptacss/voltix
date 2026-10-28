import React from "react";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WhyChoose from "@/components/sections/WhyChoose";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { common, pages, sections } from "@/components/types";

export const metadata = {
  title: pages.home.metadata?.title || "Electrocare - Reliable Electrical Solutions",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Hero data={sections.hero} />
        <About data={sections.about} />
        <Services data={sections.services} />
        <Testimonials data={sections.testimonials} />
        <WhyChoose data={sections.why_choose} />
        <Contact data={sections.contact} />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
