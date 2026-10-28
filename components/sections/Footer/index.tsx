"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FooterProps } from "../../types";

export default function Footer({ data }: FooterProps) {
  const renderSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "facebook":
        return (
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.35-1.75 1.75-1.75H17.5V2.2c-.37-.05-1.63-.16-3.1-.16-3.08 0-5.15 1.88-5.15 5.3v2.16H6.5v4h2.75V22h4.75v-8.5z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.4 9.74v-8.37H5.06v8.37z" />
          </svg>
        );
      case "youtube":
        return (
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case "instagram":
      default:
        return (
          <svg
            className="h-3.5 w-3.5 fill-none stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        );
    }
  };

  const getContactIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case "phone":
        return <Phone className="h-4 w-4" strokeWidth={2} />;
      case "mail":
        return <Mail className="h-4 w-4" strokeWidth={2} />;
      case "mappin":
      case "location":
        return <MapPin className="h-4 w-4" strokeWidth={2} />;
      case "clock":
      case "hours":
        return <Clock className="h-4 w-4" strokeWidth={2} />;
      default:
        return <Phone className="h-4 w-4" strokeWidth={2} />;
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
    <footer className="relative w-full bg-[#02132d] text-slate-300">
      {/* Main Footer Container - Compact Height */}
      <div className="mx-auto max-w-[1280px] px-4 pt-9 pb-5 sm:px-8 sm:pt-10 sm:pb-6 lg:pt-10 lg:pb-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Col 1: Brand Logo, Description & Socials */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#home");
              }}
              className="inline-flex items-center transition-opacity duration-150 hover:opacity-95"
            >
              {data.logo_image ? (
                <img
                  src={data.logo_image}
                  alt={data.logo_text || "Voltix"}
                  className="h-11 sm:h-12 md:h-[50px] w-auto object-contain"
                />
              ) : (
                <div className="inline-flex items-center gap-2.5">
                  {/* Electric Blue Bolt with 4-Point Star Sparkle in Center */}
                  <svg
                    viewBox="0 0 36 44"
                    className="h-8 w-auto text-[#0066ff] shrink-0"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 1.5H31L20.5 17.5H33.5L12 43L17.5 22H6.5L15 1.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.5 14.5C20.5 16.5 21.6 17.5 23.5 17.5C21.6 17.5 20.5 18.5 20.5 20.5C20.5 18.5 19.4 17.5 17.5 17.5C19.4 17.5 20.5 16.5 20.5 14.5Z"
                      fill="white"
                    />
                  </svg>

                  <div className="flex flex-col">
                    <span className="text-[20px] sm:text-[22px] font-bold tracking-tight text-white leading-none">
                      {data.logo_text || "Electrocare"}
                    </span>
                    <span className="text-[10.5px] sm:text-[11px] font-medium tracking-normal text-slate-400 mt-0.5 leading-none">
                      {data.logo_subtext || "Electrical Solutions Partner"}
                    </span>
                  </div>
                </div>
              )}
            </a>

            <p className="mt-3 text-[13px] leading-relaxed text-slate-300/80 max-w-[330px]">
              {data.description ||
                "Your trusted partner for electrical and industrial solutions from leading global brands. Quality products, expert support and reliable service."}
            </p>

            {/* Circular Outlined Social Icons */}
            <div className="mt-4 flex items-center gap-2.5">
              {data.socials?.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/80 text-slate-300 transition-all duration-200 hover:border-[#0066ff] hover:bg-[#0066ff] hover:text-white"
                  aria-label={soc.icon}
                >
                  {renderSocialIcon(soc.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 lg:pl-2">
            <h4 className="text-[14.5px] sm:text-[15px] font-bold text-white tracking-normal">
              {data.quick_links_title || "Quick Links"}
            </h4>
            <ul className="mt-3 space-y-2 text-[13px]">
              {data.quick_links?.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        handleScrollTo(link.href);
                      }
                    }}
                    className="text-slate-300/80 transition-colors duration-150 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="lg:col-span-3">
            <h4 className="text-[14.5px] sm:text-[15px] font-bold text-white tracking-normal">
              {data.our_services_title || "Our Services"}
            </h4>
            <ul className="mt-3 space-y-2 text-[13px]">
              {data.our_services?.map((svc, idx) => (
                <li key={idx}>
                  <a
                    href={svc.href}
                    onClick={(e) => {
                      if (svc.href.startsWith("#")) {
                        e.preventDefault();
                        handleScrollTo(svc.href);
                      }
                    }}
                    className="text-slate-300/80 transition-colors duration-150 hover:text-white"
                  >
                    {svc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us - Badges with Theme Colors */}
          <div className="lg:col-span-3">
            <h4 className="text-[14.5px] sm:text-[15px] font-bold text-white tracking-normal">
              {data.contact_title || "Contact Us"}
            </h4>
            <ul className="mt-3.5 space-y-3">
              {(data.contact_items || [
                {
                  icon: "Phone",
                  label: data.contact_labels?.phone || "Call Us",
                  value: data.contact?.phone || "+91 98765 43210",
                  href: `tel:${(data.contact?.phone || "").replace(/[^0-9+]/g, "")}`,
                },
                {
                  icon: "Mail",
                  label: data.contact_labels?.email || "Email Us",
                  value: data.contact?.email || "info@electrocare.in",
                  href: `mailto:${data.contact?.email || ""}`,
                },
                {
                  icon: "MapPin",
                  label: data.contact_labels?.address || "Our Location",
                  value: data.contact?.address || "123 Industrial Area, New Delhi, India - 110001",
                  href: "https://maps.google.com",
                },
              ]).map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {/* Circular Icon Badge in Theme Electric Blue */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0066ff] text-white shadow-md shadow-blue-600/25">
                    {getContactIcon(item.icon)}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11.5px] font-medium text-slate-400 leading-none">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[13px] font-bold text-white hover:text-blue-300 transition-colors leading-snug mt-1"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-[13px] font-bold text-white leading-snug mt-1">
                        {item.value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider Line & Bottom Bar */}
        <div className="mt-7 sm:mt-8 border-t border-[#122847] pt-4 text-center text-[12px] text-slate-400">
          <p>{data.copyright || "Copyright © 2026. All rights reserved. Powered by Lestow"}</p>
        </div>
      </div>
    </footer>
  );
}
