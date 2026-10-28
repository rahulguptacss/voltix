"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Zap, Quote } from "lucide-react";
import { TestimonialsProps } from "../../types";

export default function Testimonials({ data }: TestimonialsProps) {
  const reviews = data.reviews || [];
  const count = reviews.length;

  // Responsive visible cards count
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  // 5 clone sets for unbreakable infinite loop buffer: [clone0, clone1, real, clone3, clone4]
  const extendedReviews =
    count > 0
      ? [...reviews, ...reviews, ...reviews, ...reviews, ...reviews]
      : [];

  // Start in the true middle set of items (base index: count * 2)
  const [currentIndex, setCurrentIndex] = useState(count > 0 ? count * 2 : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Active index for dots and highlight
  // On desktop with 3 cards, the center card is (currentIndex + 1) % count
  // On mobile (1 card), the active card is currentIndex % count
  const activeDot =
    count > 0
      ? visibleCount === 3
        ? (((currentIndex + 1) % count) + count) % count
        : ((currentIndex % count) + count) % count
      : 0;

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const goToDot = (dotIdx: number) => {
    setIsTransitioning(true);
    if (visibleCount === 3) {
      setCurrentIndex(count * 2 + dotIdx - 1);
    } else {
      setCurrentIndex(count * 2 + dotIdx);
    }
  };

  // Seamless infinite loop wrap check
  const handleTransitionEnd = () => {
    if (count === 0) return;

    if (currentIndex >= count * 3) {
      // Wrapped past right buffer, jump back to middle set seamlessly
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - count);
    } else if (currentIndex < count * 2) {
      // Wrapped past left buffer, jump forward to middle set seamlessly
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + count);
    }
  };

  // Safeguard 1: Fallback clamp timer if browser drops transitionend event (e.g. background tab / interrupted animation)
  useEffect(() => {
    if (count <= 0) return;
    if (currentIndex >= count * 3 || currentIndex < count * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) => {
          const offset = ((prev % count) + count) % count;
          return count * 2 + offset;
        });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, count]);

  // Safeguard 2: Re-enable CSS transitions on the next animation frame after seamless jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Safeguard 3: Page Visibility API - pause auto-slide in background tab & safely clamp on return
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
        setIsTransitioning(false);
        setCurrentIndex((prev) => {
          if (count <= 0) return 0;
          const offset = ((prev % count) + count) % count;
          return count * 2 + offset;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [count]);

  // Auto-slide timer: slides physically every 3.5 seconds
  useEffect(() => {
    if (isPaused || count <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, count, handleNext]);

  // Track touch for swipe on mobile
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <section
      id="testimonials"
      className="relative w-full bg-white py-9 sm:py-11 lg:py-13 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2">
            <Zap className="h-4 w-4 fill-blue-600 text-blue-600" />
            <span className="text-[13px] font-bold uppercase tracking-wider text-blue-600">
              {data.subtitle || "TESTIMONIALS"}
            </span>
            <span className="h-[2px] w-8 bg-blue-600" />
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0b1a38] sm:text-4xl">
            {data.title_line1 || "What Our"}{" "}
            <span className="text-blue-600">
              {data.title_highlight || "Clients Say"}
            </span>
          </h2>

          <p className="mt-4 text-base text-slate-600">
            {data.description ||
              "We take pride in delivering safe, reliable and high-quality electrical services. Here's what our valued clients have to say about their experience with us."}
          </p>
        </div>

        {/* Sliding Carousel Viewport */}
        <div
          className="mt-14 w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex"
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
              transition: isTransitioning
                ? "transform 650ms cubic-bezier(0.25, 1, 0.36, 1)"
                : "none",
            }}
          >
            {extendedReviews.map((rawRev, idx) => {
              const rev = rawRev || reviews[idx % count] || reviews[0];
              if (!rev) return null;

              // Highlight the center card on desktop (visibleCount === 3)
              // or the current card on mobile/tablet
              const isFeatured =
                visibleCount === 3
                  ? idx === currentIndex + 1
                  : idx === currentIndex;

              return (
                <div
                  key={idx}
                  style={{ width: `${100 / visibleCount}%` }}
                  className="flex-shrink-0 px-3 py-4"
                >
                  <div
                    onClick={() => {
                      if (visibleCount === 3) {
                        setCurrentIndex(idx - 1);
                      } else {
                        setCurrentIndex(idx);
                      }
                      setIsTransitioning(true);
                    }}
                    className={`cursor-pointer flex flex-col justify-between rounded-2xl bg-white p-7 h-full min-h-[300px] transition-all duration-500 ${
                      isFeatured
                        ? "border-2 border-blue-500 shadow-xl shadow-blue-500/15 scale-[1.02] -translate-y-1 z-10 ring-4 ring-blue-500/10"
                        : "border border-slate-200/90 shadow-sm opacity-85 hover:opacity-100 hover:border-blue-300 hover:shadow-md scale-[0.98]"
                    }`}
                  >
                    <div>
                      {/* Top Quote Icon & 5 Stars */}
                      <div className="flex items-center justify-between">
                        <Quote className="h-8 w-8 text-blue-600 fill-blue-600/10 rotate-180" />
                        <div className="flex items-center gap-1">
                          {Array.from({ length: rev.rating || 5 }).map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="h-4 w-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="mt-5 text-[15px] italic leading-relaxed text-slate-700">
                        "{rev.text}"
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-5">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-[15px] font-bold text-[#0b1a38]">
                          {rev.author}
                        </h4>
                        <span className="text-xs font-medium text-slate-500">
                          {rev.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slider Controls (Arrows & Pagination Dots) */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {reviews.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => goToDot(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  dotIdx === activeDot
                    ? "w-8 bg-blue-600"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
