"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { HeaderProps } from "../../types";

export default function Header({ data }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const links = data.links || [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Why Us", href: "#why-choose" },
    { name: "Contact", href: "#contact" },
  ];

  // Ultra-smooth scroll handler: zero layout thrashing, pure GPU accelerated
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

          // Hysteresis gap: activate shrink at 45px, expand only when returning to < 15px
          // Eliminates threshold bouncing completely
          setScrolled((prev) => {
            if (!prev && scrollY > 45) return true;
            if (prev && scrollY < 15) return false;
            return prev;
          });

          if (scrollY < 80) {
            setActiveSection("home");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, []);

  // IntersectionObserver for active section spying (100% asynchronous, zero forced reflow)
  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", "")).filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links]);

  const handleNavClick = (href: string) => {
    const wasDrawerOpen = mobileOpen;
    setMobileOpen(false);

    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      setActiveSection(targetId);

      const executeScroll = () => {
        if (targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const headerEl = document.querySelector("header");
          const headerHeight = headerEl ? headerEl.offsetHeight : 62;
          const currentScroll = window.scrollY || window.pageYOffset || 0;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const targetY = elementPosition + currentScroll - headerHeight;

          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: "smooth",
          });
        }
      };

      if (wasDrawerOpen) {
        // Wait 150ms for mobile drawer animation to collapse so page coordinates are 100% accurate
        setTimeout(executeScroll, 150);
      } else {
        executeScroll();
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-250 ease-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-slate-200/80"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between px-4 transition-[height] duration-250 ease-out sm:px-8 ${
            scrolled ? "h-[58px] sm:h-[62px]" : "h-[72px] sm:h-[78px]"
          }`}
        >
          {/* Brand Logo - Loaded from /logo/logo.webp via data.json */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
          >
            <img
              src={data.logo_image || "/logo/logo.webp"}
              alt={data.logo_text || "Electrocare"}
              className={`w-auto max-w-[165px] sm:max-w-none object-contain transition-[height] duration-250 ease-out ${
                scrolled ? "h-9 sm:h-9" : "h-11 sm:h-12"
              }`}
            />
          </a>

        {/* Desktop Navigation */}
        <nav className="hidden h-full items-center gap-6 md:flex lg:gap-8 xl:gap-9">
          {links.map((link) => {
            const sectionTarget = link.href.replace("#", "");
            const isActive = activeSection === sectionTarget;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`group relative flex h-full items-center text-[15px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-[#0066ff] font-bold"
                    : "text-slate-700 hover:text-[#0066ff]"
                }`}
              >
                <span>{link.name}</span>

                {/* Indicator bar: lifted up from bottom border & animated on active + hover */}
                <span
                  className={`absolute left-0 right-0 h-[3px] rounded-full bg-[#0066ff] transition-all duration-200 ease-out origin-center ${
                    scrolled ? "bottom-2" : "bottom-3.5"
                  } ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right CTA Action: Request a Quote Button */}
        <div className="hidden items-center sm:flex">
          {/* Request a Quote Button */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={data.button_link || "#contact"}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(data.button_link || "#contact");
            }}
            className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95 ${
              scrolled ? "h-[38px] px-4 text-[13px]" : "h-[42px] px-5 text-[14px]"
            }`}
          >
            <span>{data.button_text || "Request a Quote"}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center gap-2 sm:hidden">
          <motion.a
            whileTap={{ scale: 0.95 }}
            href={data.button_link || "#contact"}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(data.button_link || "#contact");
            }}
            className={`rounded-lg bg-blue-600 font-bold text-white shadow-sm transition-all duration-300 ${
              scrolled ? "px-2.5 py-1.5 text-[11px]" : "px-3 py-2 text-xs"
            }`}
          >
            Quote
          </motion.a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-all duration-300 hover:bg-slate-50 ${
              scrolled ? "h-8 w-8" : "h-9 w-9"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? (
              <X className={scrolled ? "h-4 w-4" : "h-5 w-5"} />
            ) : (
              <Menu className={scrolled ? "h-4 w-4" : "h-5 w-5"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Framer Motion Animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-y-auto max-h-[calc(100vh-70px)] border-t border-slate-100 bg-white shadow-xl sm:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link, idx) => {
                const sectionTarget = link.href.replace("#", "");
                const isActive = activeSection === sectionTarget;

                return (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ delay: idx * 0.03, duration: 0.18 }}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors cursor-pointer select-none active:bg-blue-100/70 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </motion.a>
                );
              })}

              <div className="pt-3 border-t border-slate-100 mt-2">
                <a
                  href={data.button_link || "#contact"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(data.button_link || "#contact");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25"
                >
                  <span>{data.button_text || "Request a Quote"}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>

    {/* Header Placeholder Spacer: Keeps document flow 100% steady to eliminate layout shift & scroll lag */}
    <div className="h-[72px] sm:h-[78px] w-full shrink-0" aria-hidden="true" />
  </>
  );
}
