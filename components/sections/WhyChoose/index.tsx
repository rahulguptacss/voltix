"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gem, Truck, Settings, Users, Award } from "lucide-react";
import { WhyChooseProps } from "../../types";

export default function WhyChoose({ data }: WhyChooseProps) {
  const getWhyIcon = (iconName: string) => {
    switch (iconName) {
      case "Gem":
      case "Award":
      case "Diamond":
        return <Gem className="h-5 w-5 sm:h-6 sm:w-6 text-[#0066ff]" strokeWidth={2.3} />;
      case "Truck":
        return <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-[#0066ff]" strokeWidth={2.3} />;
      case "Settings":
      case "Cog":
        return <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-[#0066ff] fill-[#0066ff]" strokeWidth={1.5} />;
      case "Users":
      default:
        return <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#0066ff] fill-[#0066ff]" strokeWidth={1.5} />;
    }
  };

  // Motion variants
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
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="why-choose" className="relative w-full bg-gradient-to-b from-[#f2f7fd] via-[#f7faff] to-[#f2f7fd] border-y border-slate-200/60 py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          {/* Subtitle with green accent line */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5"
          >
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#0b1a38]">
              {data.subtitle || "WHY CHOOSE US"}
            </span>
            <span className="h-[2px] w-12 rounded-full bg-[#10b981]" />
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="mt-2 text-3xl sm:text-4xl lg:text-[38px] font-black tracking-tight text-[#0b1a38] leading-tight"
          >
            {data.title_line1 || "Your Reliable"}{" "}
            <span className="text-[#0066ff]">
              {data.title_highlight || "Electrical Partner"}
            </span>
          </motion.h2>
        </div>

        {/* 4 Cards Grid - 2 per row on mobile, 4 on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4"
        >
          {data.items?.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group relative flex flex-col justify-start rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Soft Blue Circular Icon Badge */}
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#dce9fe] transition-transform duration-300 group-hover:scale-110">
                {getWhyIcon(item.icon)}
              </div>

              {/* Title */}
              <h3 className="mt-3 sm:mt-4 text-[14.5px] sm:text-[17px] font-bold text-[#0b1a38] transition-colors duration-200 group-hover:text-[#0066ff] leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-1.5 sm:mt-2 text-[11.5px] sm:text-[13px] leading-relaxed text-slate-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
