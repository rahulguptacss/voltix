"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Check } from "lucide-react";
import { ContactProps } from "../../types";

export default function Contact({ data }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category) {
      setIsDropdownOpen(true);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        message: "",
      });
    }, 4000);
  };

  const categories = data.form?.categories || [
    "Industrial Panels",
    "Lighting Solutions",
    "Panel Upgrade & Repair",
    "Switch & Socket Repair",
    "AC Electrical Work",
    "CCTV & Security Wiring",
    "Inverter & Generator Setup",
  ];

  return (
    <section id="contact" className="relative w-full overflow-hidden py-10 sm:py-12 lg:py-14">
      {/* Background Image with Twilight Industrial Electric Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${data.background_image || "/img/contact-bg.webp"})`,
        }}
      >
        {/* Blue gradient overlay: solid electric blue on left, fading to transparent in center/right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#003ea8] via-[#004ecc]/90 via-40% to-[#05327a]/40" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Heading & Intro */}
          <div className="text-white lg:col-span-6">
            {/* Subtitle with bright cyan accent line */}
            <div className="mb-2 inline-flex items-center gap-2">
              <span className="text-[12px] font-bold uppercase tracking-wider text-white">
                {data.subtitle || "GET IN TOUCH"}
              </span>
              <span className="h-[2px] w-10 rounded-full bg-[#00d4ff]" />
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-[40px] leading-tight">
              {data.title_line1 || "Let's Build a"}{" "}
              <span className="text-[#00e5ff] block sm:inline">
                {data.title_highlight || "Brighter Tomorrow"}
              </span>
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-xl text-[14.5px] sm:text-[15px] text-blue-50/90 leading-relaxed">
              {data.description ||
                "Share your requirements with us and our team of seasoned electrical experts will help you with tailored solutions, genuine product selection, competitive pricing, and end-to-end technical guidance. From residential wiring to large-scale commercial and industrial setups, we ensure the highest safety standards, prompt response times, and dependable post-installation support for all your project needs."}
            </p>
          </div>

          {/* Right Column: Floating White Message Form Card */}
          <div className="lg:col-span-6">
            <div className="w-full rounded-[22px] bg-white p-5 sm:p-6 lg:p-7 shadow-2xl">
              <h3 className="text-xl sm:text-[22px] font-extrabold text-[#0b1a38]">
                {data.form?.title || "Send Us a Message"}
              </h3>

              {submitted ? (
                <div className="my-6 flex flex-col items-center justify-center rounded-xl bg-green-50 p-6 text-center text-green-800">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                  <h4 className="mt-2 text-base font-bold">Thank You!</h4>
                  <p className="mt-1 text-xs text-green-700">
                    Your enquiry has been received. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[12px] font-bold text-[#0b1a38]">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold text-[#0b1a38]">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Custom Styled Product Interest Dropdown */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[12px] font-bold text-[#0b1a38]">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-blue-500/20"
                      />
                    </div>

                    {/* Custom Styled Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                      <label className="block text-[12px] font-bold text-[#0b1a38]">
                        Product Interest <span className="text-red-500">*</span>
                      </label>

                      {/* Dropdown Trigger Button */}
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className={`mt-1 flex h-[38px] w-full items-center justify-between rounded-lg border bg-white px-3 py-2 text-[13px] transition-all focus:outline-none ${
                          isDropdownOpen
                            ? "border-[#0066ff] ring-1 ring-blue-500/20"
                            : "border-slate-200/90 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`truncate text-left ${
                            formData.category
                              ? "font-medium text-slate-900"
                              : "text-slate-400"
                          }`}
                        >
                          {formData.category || "Select Product Category"}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180 text-[#0066ff]" : ""
                          }`}
                        />
                      </button>

                      {/* Custom Floating Options Menu */}
                      {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-56 overflow-y-auto rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-2xl shadow-blue-500/15">
                          {categories.map((cat, idx) => {
                            const isSelected = formData.category === cat;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, category: cat });
                                  setIsDropdownOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[12.5px] transition-colors ${
                                  isSelected
                                    ? "bg-blue-50 font-bold text-[#0066ff]"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                              >
                                <span className="truncate pr-2">{cat}</span>
                                {isSelected && (
                                  <Check
                                    className="h-3.5 w-3.5 shrink-0 text-[#0066ff]"
                                    strokeWidth={2.5}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label className="block text-[12px] font-bold text-[#0b1a38]">
                      Your Message
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us your requirement..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-blue-500/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-1.5 w-full flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0066ff] hover:bg-[#0052cc] text-[14px] font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {data.form?.button_text || "Submit Enquiry"}
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
