import React, { useState, useRef, useEffect, useCallback } from "react";
import BranchModal from "../ui/BranchModal";
import { branches } from "../../data/branches";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Building2,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import FadeIn from "../animations/FadeIn";

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════ */

const Counter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    let frameId;
    let startTime;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      // easeOutQuart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          frameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/* ═══════════════════════════════════════════════
   BRANCH CARD
   ═══════════════════════════════════════════════ */

const BranchCard = ({ branch, onSelect, index }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="h-full w-full px-1.5 sm:px-2">
      <div
        className="
          group relative flex h-full flex-col overflow-hidden
          rounded-2xl border border-gray-200/60 bg-white
          shadow-[0_2px_20px_rgba(0,0,0,0.04)]
          transition-all duration-500
          hover:border-gray-300/80
          hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]
          sm:rounded-[20px] md:rounded-3xl
        "
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {/* Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
          )}

          <img
            src={branch.img}
            alt={branch.name}
            onLoad={() => setImgLoaded(true)}
            className={`
              h-full w-full object-cover
              transition-all duration-700
              group-hover:scale-105
              ${imgLoaded ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Branch index badge */}
          <div className="absolute left-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[10px] font-bold text-gray-900 shadow-lg backdrop-blur-sm sm:left-3 sm:top-3 sm:h-8 sm:w-8 sm:text-[11px]">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Location pill */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-lg backdrop-blur-sm sm:bottom-3 sm:left-3 sm:gap-1.5 sm:px-2.5 sm:py-1.5">
            <MapPin className="h-2.5 w-2.5 text-gray-600 sm:h-3 sm:w-3" />
            <span className="text-[9px] font-semibold text-gray-700 sm:text-[10px]">
              {branch.place}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-3 sm:p-4 md:p-5">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-gray-900 sm:text-base md:text-lg">
              {branch.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
              {branch.place}, Sri Lanka
            </p>
          </div>

          <button
            onClick={() => onSelect(branch)}
            className="
              mt-3 flex w-full items-center justify-center gap-1.5
              rounded-xl bg-gray-950 py-2 text-[11px] font-semibold
              text-white shadow-sm
              transition-all duration-300
              hover:bg-black hover:shadow-md
              active:scale-[0.97]
              sm:mt-4 sm:gap-2 sm:rounded-xl sm:py-2.5 sm:text-xs
              md:text-[13px]
            "
          >
            View Details
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN BRANCHES COMPONENT
   ═══════════════════════════════════════════════ */

const Branches = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(1);
  const scrollRef = useRef(null);

  /* ────── RESPONSIVE CARDS PER VIEW ────── */
  const getCardsPerView = useCallback(() => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getCardsPerView]);

  /* ────── SCROLL CONTROLS ────── */
  const scrollToIndex = useCallback(
    (index) => {
      const container = scrollRef.current;
      if (!container) return;
      const cardWidth = container.offsetWidth / cardsPerView;
      container.scrollTo({ left: cardWidth * index, behavior: "smooth" });
      setCurrentIndex(index);
    },
    [cardsPerView]
  );

  const maxIndex = Math.max(0, branches.length - cardsPerView);

  const prevSlide = () => scrollToIndex(Math.max(currentIndex - 1, 0));
  const nextSlide = () => scrollToIndex(Math.min(currentIndex + 1, maxIndex));

  /* ────── SYNC INDEX ON SCROLL ────── */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const cardWidth = container.offsetWidth / cardsPerView;
        const newIndex = Math.round(container.scrollLeft / cardWidth);
        setCurrentIndex(Math.min(newIndex, maxIndex));
      }, 100);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [cardsPerView, maxIndex]);

  const totalDots = maxIndex + 1;

  /* ═══════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════ */
  return (
    <section
      id="branch"
      className="relative w-full overflow-hidden bg-[#f8f9fb] px-4 py-16 sm:px-5 sm:py-20 md:px-6 md:py-24 lg:px-8 lg:py-28"
    >
      {/* Background decorations */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-100/30 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-violet-100/30 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* ══════════════════════════════════════
             LEFT PANEL — Info & Stats
             ══════════════════════════════════════ */}
          <div className="lg:col-span-4 xl:col-span-4">
            <FadeIn delay={0}>
              <div
                className="
                  relative overflow-hidden rounded-2xl border border-gray-200/50
                  bg-gradient-to-br from-[#f5f5f7] to-white
                  p-6
                  shadow-[0_8px_40px_rgba(0,0,0,0.04)]
                  sm:rounded-3xl sm:p-8
                  md:p-10
                  lg:sticky lg:top-24 lg:p-10
                  xl:p-12
                "
              >
                {/* Ambient blurs */}
                <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-blue-400/[0.06] blur-[100px]" />
                <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-purple-400/[0.06] blur-[100px]" />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="mb-4 flex justify-center sm:mb-5">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-gray-200/80 bg-white/90 px-3 py-1 shadow-sm backdrop-blur-sm sm:px-3.5 sm:py-1.5">
                      <Building2 className="h-3 w-3 text-gray-500 sm:h-3.5 sm:w-3.5" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500 sm:text-[11px]">
                        Our Network
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl text-center font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl">
                    Globus <span className="mt-0.5  text-gray-400">  Branches</span>
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-[12px] text-center leading-relaxed text-gray-500 sm:mt-4 sm:text-sm md:text-base lg:text-sm xl:text-base">
                    Globus has rapidly expanded its presence across Sri Lanka,
                    building a strong network of service-based businesses.
                  </p>

                  {/* Divider */}
                  <div className="my-6 h-[2px] w-12 bg-gray-300/80 sm:my-8 sm:w-14" />

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-4 xl:gap-6">
                    {/* Stat 1 */}
                    <div className="rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-4 lg:p-3.5 xl:p-4">
                      <h3 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl">
                        <Counter target={9} suffix="+" />
                      </h3>
                      <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-gray-400 sm:mt-1.5 sm:text-[10px] md:text-[11px]">
                        Active Branches
                      </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur-sm sm:rounded-2xl sm:p-4 lg:p-3.5 xl:p-4">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-emerald-500 sm:h-5 sm:w-5" />
                        <span className="text-xs font-semibold text-emerald-600 sm:text-sm">
                          Growing
                        </span>
                      </div>
                      <p className="mt-1.5 text-[11px] font-medium leading-relaxed text-gray-600 sm:mt-2 sm:text-xs md:text-sm lg:text-xs xl:text-sm">
                        Expanding across Sri Lanka every month
                      </p>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="mt-6 flex items-center gap-2 sm:mt-8">
                    <Sparkles className="h-3 w-3 text-gray-400 sm:h-3.5 sm:w-3.5" />
                    <span className="text-[10px] font-medium text-gray-400 sm:text-[11px]">
                      Trusted by thousands of entrepreneurs
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ══════════════════════════════════════
             RIGHT PANEL — Cards Slider
             ══════════════════════════════════════ */}
          <div className="relative lg:col-span-8 xl:col-span-8">
            <FadeIn delay={150}>
              {/* Section subheader (mobile/tablet) */}
              <div className="mb-4 flex items-center justify-between sm:mb-5 lg:mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">
                    All Locations
                  </h3>
                  <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
                    {branches.length} branches across the island
                  </p>
                </div>

                {/* Desktop arrows in header */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    aria-label="Previous"
                    className="
                      flex h-8 w-8 items-center justify-center rounded-full
                      border border-gray-200 bg-white text-gray-600
                      shadow-sm transition-all duration-300
                      hover:border-gray-300 hover:shadow-md
                      active:scale-95
                      disabled:cursor-not-allowed disabled:opacity-30
                      sm:h-9 sm:w-9 md:h-10 md:w-10
                    "
                  >
                    <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>

                  <button
                    onClick={nextSlide}
                    disabled={currentIndex >= maxIndex}
                    aria-label="Next"
                    className="
                      flex h-8 w-8 items-center justify-center rounded-full
                      border border-gray-200 bg-white text-gray-600
                      shadow-sm transition-all duration-300
                      hover:border-gray-300 hover:shadow-md
                      active:scale-95
                      disabled:cursor-not-allowed disabled:opacity-30
                      sm:h-9 sm:w-9 md:h-10 md:w-10
                    "
                  >
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>

              {/* Slider container */}
              <div className="relative">
                <div
                  ref={scrollRef}
                  className="
                    -mx-1.5 flex overflow-x-auto scroll-smooth
                    snap-x snap-mandatory
                    sm:-mx-2
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                  "
                >
                  {branches.map((branch, i) => (
                    <div
                      key={i}
                      className="
                        w-full shrink-0 snap-start
                        sm:w-1/2
                        lg:w-1/3
                      "
                    >
                      <BranchCard
                        branch={branch}
                        index={i}
                        onSelect={setSelectedBranch}
                      />
                    </div>
                  ))}
                </div>

                
              </div>

              {/* Navigation dots */}
              {totalDots > 1 && (
                <div className="mt-4 flex items-center justify-center gap-1.5 sm:mt-5 md:mt-6">
                  {Array.from({ length: totalDots }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`
                        rounded-full transition-all duration-500
                        ${
                          i === currentIndex
                            ? "h-1.5 w-6 bg-gray-900 sm:h-2 sm:w-7"
                            : "h-1.5 w-1.5 bg-gray-300 hover:bg-gray-400 sm:h-2 sm:w-2"
                        }
                      `}
                    />
                  ))}
                </div>
              )}

              {/* Progress bar (alternative indicator) */}
              <div className="mx-auto mt-3 hidden max-w-[120px] sm:block md:mt-4">
                <div className="h-[2px] w-full rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-gray-900 transition-all duration-500"
                    style={{
                      width: `${((currentIndex + 1) / totalDots) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
         BRANCH MODAL
         ═══════════════════════════════════════════════ */}
      <BranchModal
        branch={selectedBranch}
        onClose={() => setSelectedBranch(null)}
      />
    </section>
  );
};

export default Branches;