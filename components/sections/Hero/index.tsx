"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, ShieldCheck, Truck, Headset } from "lucide-react";
import { HeroProps } from "../../types";

export default function Hero({ data }: HeroProps) {
  const slide = data.slides?.[0];
  const highlights = data.highlights || [
    {
      icon: "Award",
      line1: "Wide Product Range",
      line2: "from Top Brands",
    },
    {
      icon: "ShieldCheck",
      line1: "Genuine Products",
      line2: "& Assured Quality",
    },
    {
      icon: "Truck",
      line1: "On-Time Delivery",
      line2: "Across India",
    },
    {
      icon: "Headset",
      line1: "Expert Support",
      line2: "& Technical Guidance",
    },
  ];

  const getHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case "Award":
        return (
          <Award
            className="h-5 w-5 sm:h-8 sm:w-8 text-[#0066ff] shrink-0 mt-0.5 sm:mt-0"
            strokeWidth={1.9}
          />
        );
      case "ShieldCheck":
        return (
          <ShieldCheck
            className="h-5 w-5 sm:h-8 sm:w-8 text-[#0066ff] shrink-0 mt-0.5 sm:mt-0"
            strokeWidth={1.9}
          />
        );
      case "Truck":
        return (
          <Truck
            className="h-5 w-5 sm:h-8 sm:w-8 text-[#0066ff] shrink-0 mt-0.5 sm:mt-0"
            strokeWidth={1.9}
          />
        );
      case "Headset":
      case "Headphones":
      default:
        return (
          <Headset
            className="h-5 w-5 sm:h-8 sm:w-8 text-[#0066ff] shrink-0 mt-0.5 sm:mt-0"
            strokeWidth={1.9}
          />
        );
    }
  };

  const handleScrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const yOffset = -80;
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Hero Banner Section (Slightly Reduced Compact Height) */}
      <section
        id="home"
        className="relative w-full overflow-hidden bg-gradient-to-r from-[#e6f3fd] via-[#eaf4fd] to-[#f4f9fe] min-h-[460px] sm:min-h-[500px] lg:h-[calc(82vh-78px)] lg:min-h-[520px] lg:max-h-[620px] flex items-center"
      >
        {/* Right Side Industrial Electrical Equipment Image with Fade Transition */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] xl:w-[64%] overflow-hidden pointer-events-none">
          <motion.img
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={slide?.image || "/hero/hero.webp"}
            alt={slide?.title_line1 || "Electrical Solutions"}
            className="h-full w-full object-cover object-right"
          />

          {/* Desktop Left-to-Right Seamless Gradient Blend into #e6f3fd background */}
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#e6f3fd] from-0% via-[#e6f3fd]/85 via-20% via-[#e6f3fd]/40 via-35% to-transparent to-55%" />
          <div className="absolute inset-y-0 left-0 w-16 hidden lg:block bg-[#e6f3fd]" />

          {/* Mobile Overlay to guarantee 100% Text Readability */}
          <div className="absolute inset-0 block lg:hidden bg-gradient-to-r from-[#e6f3fd]/95 via-[#e6f3fd]/90 to-[#e6f3fd]/75" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-8 sm:py-8 lg:py-8">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow Tag with Horizontal Line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-3 sm:gap-4"
            >
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#0066ff]">
                {slide?.subtitle || "INDUSTRIAL & COMMERCIAL ELECTRICAL SOLUTIONS"}
              </span>
              <span className="h-[2px] w-10 sm:w-14 rounded-full bg-[#0066ff]" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-2.5 sm:mt-3 text-3xl font-black tracking-tight text-[#050a26] sm:text-5xl lg:text-[48px] xl:text-[52px] leading-[1.14]"
            >
              {slide?.title_line1 || "Reliable Electrical"}
              <br />
              {slide?.title_highlight || "Solutions for a"}
              <br />
              <span className="text-[#0066ff]">
                {slide?.title_line2 || "Smarter Tomorrow"}
              </span>
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 sm:mt-4 max-w-[500px] text-[15px] sm:text-[16px] leading-relaxed text-slate-600"
            >
              {slide?.description ||
                "Quality products, expert support and tailored electrical solutions for industrial, commercial and residential projects."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 sm:mt-7 flex flex-wrap items-center gap-4"
            >
              {/* Primary: Explore Solutions */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={slide?.primary_button?.href || "#services"}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(slide?.primary_button?.href || "#services");
                }}
                className="inline-flex h-[46px] items-center gap-2 rounded-lg bg-[#0066ff] px-6 text-[15px] font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-[#0052cc] hover:shadow-lg active:scale-95"
              >
                <span>{slide?.primary_button?.text || "Explore Solutions"}</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </motion.a>

              {/* Secondary: Contact Us */}
              {slide?.secondary_button && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={slide.secondary_button.href || "#contact"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(slide.secondary_button?.href || "#contact");
                  }}
                  className="inline-flex h-[46px] items-center justify-center rounded-lg border-2 border-[#93c5fd] bg-[#e7f3fd] px-7 text-[15px] font-bold text-[#0066ff] transition-all duration-200 hover:bg-blue-100/80 hover:border-blue-400 active:scale-95"
                >
                  <span>{slide.secondary_button.text || "Contact Us"}</span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Strip Underneath Hero - 2 per row on mobile, 4 on desktop */}
      <section className="relative w-full border-y border-slate-100 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1280px] px-3.5 py-4 sm:px-8 sm:py-6 lg:py-7">
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start sm:items-center gap-2 sm:gap-3.5 min-w-0 transition-transform duration-200 hover:-translate-y-0.5"
              >
                {getHighlightIcon(item.icon)}
                <div className="flex flex-col text-[11.5px] xs:text-[12px] sm:text-[14px] lg:text-[15px] font-bold text-[#1e2d4c] leading-[1.25] min-w-0">
                  {item.line1 ? (
                    <>
                      <span className="break-words">{item.line1}</span>
                      <span className="break-words">{item.line2}</span>
                    </>
                  ) : (
                    <span className="break-words">{item.text}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
