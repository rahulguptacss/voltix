"use client";

import React from "react";
import { ArrowRight, Users, Briefcase, Box } from "lucide-react";
import { AboutProps } from "../../types";

export default function About({ data }: AboutProps) {
  const stats = data.stats || [
    { value: "5+", label: "Years of Experience", icon: "Users" },
    { value: "500+", label: "Happy Clients", icon: "Briefcase" },
    { value: "1000+", label: "Products Range", icon: "Box" },
  ];

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return (
          <Users
            className="h-6 w-6 sm:h-7 sm:w-7 text-[#0066ff] fill-[#0066ff]"
            strokeWidth={1.5}
          />
        );
      case "Briefcase":
        return (
          <Briefcase
            className="h-6 w-6 sm:h-7 sm:w-7 text-[#0066ff] fill-[#0066ff]"
            strokeWidth={1.5}
          />
        );
      case "Box":
      default:
        return (
          <Box
            className="h-6 w-6 sm:h-7 sm:w-7 text-[#0066ff]"
            strokeWidth={2}
          />
        );
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

  return (
    <section id="about" className="relative w-full bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Image with Blue Framing Backdrop & Dot Matrix */}
          <div className="relative mx-auto w-full max-w-[480px] lg:col-span-6 lg:max-w-none">
            <div className="relative mx-auto max-w-[430px] pl-8 sm:pl-10">
              {/* Decorative 4x6 Dot Matrix on Far Left */}
              <div className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 -z-20 grid grid-cols-4 gap-2 sm:gap-2.5">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#0066ff]"
                  />
                ))}
              </div>

              {/* Blue Framing Backdrop (Extends top-left, along left, and bottom-left) */}
              <div className="absolute left-2 sm:left-2.5 -top-4 -bottom-4 w-[46%] sm:w-[48%] rounded-tl-[36px] rounded-tr-[28px] rounded-bl-[36px] rounded-br-[28px] bg-gradient-to-b from-[#0062ff] via-[#006eff] to-[#0488fe] -z-10 shadow-lg shadow-blue-500/20" />

              {/* Main Photo with Crisp White Border & Rounded Corners */}
              <div className="relative overflow-hidden rounded-[24px] border-[4px] border-white bg-slate-100 shadow-xl shadow-slate-900/15">
                <img
                  src={data.image || "/img/about.webp"}
                  alt="Electrician working on electrical switchboard"
                  className="h-[320px] sm:h-[350px] lg:h-[370px] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Stats */}
          <div className="lg:col-span-6">
            {/* Eyebrow Tag with Horizontal Blue Line */}
            <div className="mb-2 inline-flex items-center gap-3">
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-[#1d356a]">
                {data.subtitle || "ABOUT ELECTROCARE"}
              </span>
              <span className="h-[2px] w-10 rounded-full bg-[#0066ff]" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-black tracking-tight text-[#070e37] sm:text-3xl lg:text-[40px] lg:leading-[1.15]">
              {data.title_line1 || "Your Trusted Partner"}
              <br />
              <span className="text-[#0066ff]">
                {data.title_highlight || "in Electrical Solutions"}
              </span>
            </h2>

            {/* Description */}
            <p className="mt-2.5 max-w-[490px] text-[13.5px] sm:text-[14px] leading-[1.6] text-slate-600">
              {data.description ||
                "Electrocare is a leading supplier of genuine electrical and industrial products from global brands. We provide complete solutions for commercial, industrial and infrastructure projects with a focus on quality, reliability and long-term customer satisfaction."}
            </p>

            {/* 3 Stats Row with Vertical Dividers */}
            <div className="mt-4 sm:mt-5 grid grid-cols-3 max-w-[460px]">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    idx < stats.length - 1
                      ? "border-r border-slate-200/90 pr-3 sm:pr-4"
                      : ""
                  } ${idx > 0 ? "pl-3 sm:pl-4" : ""}`}
                >
                  <div>
                    {getStatIcon(stat.icon)}
                  </div>
                  <span className="mt-1.5 text-xl sm:text-[22px] font-black text-[#0066ff] leading-none tracking-tight">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[11px] sm:text-xs font-medium text-slate-500 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-4 sm:mt-5">
              <a
                href={data.button?.href || "#contact"}
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo(data.button?.href || "#contact");
                }}
                className="inline-flex h-[40px] sm:h-[42px] items-center gap-2 rounded-lg bg-[#0066ff] px-5 sm:px-6 text-[13.5px] font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-[#0052cc] hover:shadow-lg active:scale-95"
              >
                <span>{data.button?.text || "Know More About Us"}</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
