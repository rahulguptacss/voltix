"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Lightbulb,
  LayoutGrid,
  Plug,
  Fan,
  Cpu,
  Cctv,
  BatteryCharging,
  Zap,
} from "lucide-react";
import { ServicesProps } from "../../types";

export default function Services({ data }: ServicesProps) {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return <Home className="h-5 w-5 text-[#0066ff] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />;
      case "Lightbulb":
        return <Lightbulb className="h-5 w-5 text-[#0066ff] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />;
      case "LayoutGrid":
        return <LayoutGrid className="h-5 w-5 text-[#0066ff] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />;
      case "Plug":
        return <Plug className="h-5 w-5 text-[#0066ff] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />;
      case "Fan":
        return <Fan className="h-5 w-5 text-[#0066ff] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />;
      case "Snowflake":
      case "Cpu":
        return <Cpu className="h-5 w-5 text-[#0066ff] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />;
      case "Cctv":
        return <Cctv className="h-5 w-5 text-[#0066ff] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />;
      case "BatteryCharging":
      default:
        return <BatteryCharging className="h-5 w-5 text-[#0066ff] transition-transform duration-300 group-hover:scale-110" strokeWidth={2} />;
    }
  };

  const handleScrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const targetEl = document.getElementById(href.replace("#", ""));
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="services" className="relative w-full bg-gradient-to-b from-[#edf4fc] via-[#f1f6fd] to-[#edf4fc] border-y border-blue-100/60 py-9 sm:py-11 lg:py-13 overflow-hidden">
      {/* Subtle Background Glow Animation */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-50/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5"
          >
            <Zap className="h-4 w-4 fill-[#0066ff] text-[#0066ff]" />
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#0066ff]">
              {data.subtitle || "OUR SERVICES"}
            </span>
            <span className="h-[2px] w-10 sm:w-12 rounded-full bg-[#0066ff]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="mt-3 text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#050a26] leading-tight"
          >
            {data.title_line1 || "Complete"}{" "}
            <span className="text-[#0066ff]">
              {data.title_highlight || "Electrical Solutions"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
            className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-slate-600 max-w-2xl mx-auto"
          >
            {data.description ||
              "We provide a wide range of professional electrical services for residential, commercial and industrial needs, ensuring safety, efficiency and long-lasting performance."}
          </motion.p>
        </div>

        {/* 8 Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 sm:mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.items?.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -7, transition: { duration: 0.25, ease: "easeOut" } }}
              onClick={() => handleScrollTo(item.link || "#contact")}
              className="group relative flex flex-col overflow-hidden rounded-[20px] border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
            >
              {/* Card Image */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* White Card Body with Integrated Notch Tab */}
              <div className="relative flex flex-1 flex-col justify-between bg-white px-5 pt-7 pb-5">
                {/* Notch Tab protruding upwards into image */}
                <div className="absolute -top-[26px] left-4 flex h-[52px] w-[52px] items-center justify-center rounded-t-full bg-white z-10">
                  {/* Left concave fillet */}
                  <span
                    className="pointer-events-none absolute bottom-0 -left-[12px] h-[12px] w-[12px]"
                    style={{
                      background: "radial-gradient(circle at 0 0, transparent 12px, #ffffff 12.5px)",
                    }}
                  />
                  {/* Right concave fillet */}
                  <span
                    className="pointer-events-none absolute bottom-0 -right-[12px] h-[12px] w-[12px]"
                    style={{
                      background: "radial-gradient(circle at 100% 0, transparent 12px, #ffffff 12.5px)",
                    }}
                  />

                  {/* Icon */}
                  <div className="flex items-center justify-center pt-0.5">
                    {getServiceIcon(item.icon)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <h3 className="text-[17px] font-bold text-[#0b1a38] transition-colors duration-200 group-hover:text-[#0066ff] leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-[12.5px] sm:text-[13px] leading-relaxed text-slate-500 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
