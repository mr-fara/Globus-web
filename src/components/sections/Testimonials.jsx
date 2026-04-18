import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  Award,
  TrendingUp,
  Users,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { testimonials } from "../../data/testimonials";
import FadeIn from "../animations/FadeIn";

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENT STATS
   ═══════════════════════════════════════════════════════ */

const achievements = [
  {
    icon: Users,
    value: "10,000+",
    label: "Active Members",
    desc: "Growing community worldwide",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    desc: "Members achieving their goals",
  },
  {
    icon: Award,
    value: "500+",
    label: "Achievements",
    desc: "Milestones reached this year",
  },
  {
    icon: Target,
    value: "100%",
    label: "Satisfaction",
    desc: "Community-driven support",
  },
];

/* ═══════════════════════════════════════════════════════
   STAR RATING COMPONENT
   ═══════════════════════════════════════════════════════ */

const StarRating = ({ rating = 5, size = 14 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-100 text-gray-200"
          }
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENT CARD COMPONENT
   ═══════════════════════════════════════════════════════ */

const AchievementCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div
      className="
        group rounded-xl border border-gray-100/80
        bg-white/80 p-3.5 text-center
        shadow-[0_2px_12px_rgba(0,0,0,0.03)]
        backdrop-blur-sm transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]
        sm:rounded-2xl sm:p-5
      "
    >
      <div
        className="
          mx-auto mb-2 flex h-9 w-9 items-center justify-center
          rounded-xl bg-gray-100 text-gray-700
          transition-all duration-300
          group-hover:bg-gray-900 group-hover:text-white
          sm:h-10 sm:w-10
        "
      >
        <Icon size={17} />
      </div>

      <p className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
        {stat.value}
      </p>

      <p className="mt-0.5 text-[10px] font-medium text-gray-900 sm:text-[11px]">
        {stat.label}
      </p>

      <p className="mt-0.5 text-[9px] text-gray-400 sm:text-[10px]">
        {stat.desc}
      </p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   TESTIMONIAL IMAGE COMPONENT
   ═══════════════════════════════════════════════════════ */

const TestimonialImage = ({ current, currentIndex, total, direction }) => {
  return (
    <div className="relative md:col-span-2">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 md:h-full md:min-h-[420px]">
        {/* Main image */}
        <img
          src={current.image}
          alt={current.name}
          key={currentIndex}
          className={`
            h-full w-full object-cover
            transition-all duration-700 ease-out
            ${
              direction > 0
                ? "animate-slideInRight"
                : direction < 0
                ? "animate-slideInLeft"
                : ""
            }
          `}
        />

        {/* Gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/50 via-transparent to-black/10
            md:bg-gradient-to-r md:from-transparent md:to-black/5
          "
        />

        {/* Counter badge */}
        <div
          className="
            absolute left-3 top-3 rounded-full bg-white/95
            px-3 py-1.5 shadow-lg backdrop-blur-sm
            sm:left-4 sm:top-4
          "
        >
          <span className="text-[11px] font-semibold text-gray-900 sm:text-xs">
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Rating badge */}
        <div
          className="
            absolute right-3 top-3 flex items-center gap-1
            rounded-full bg-black/50 px-2.5 py-1
            backdrop-blur-sm
            sm:right-4 sm:top-4
          "
        >
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-medium text-white">
            {current.rating}.0
          </span>
        </div>

        {/* Mobile bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:hidden">
          <div
            className="
              rounded-2xl border border-white/20
              bg-black/30 p-3 backdrop-blur-md
            "
          >
            <h4 className="text-sm font-semibold text-white">
              {current.name}
            </h4>
            <p className="mt-0.5 text-[11px] text-white/80">
              {current.role}
              {current.company && `, ${current.company}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   TESTIMONIAL CONTENT COMPONENT
   ═══════════════════════════════════════════════════════ */

const TestimonialContent = ({ current, currentIndex }) => {
  return (
    <div
      className="
        flex flex-col justify-between
        p-5 sm:p-6 md:col-span-3 md:p-8 lg:p-10
      "
    >
      {/* Top section */}
      <div>
        {/* Quote icon */}
        <div
          className="
            mb-4 flex h-10 w-10 items-center justify-center
            rounded-2xl bg-gray-100
            sm:mb-5 sm:h-11 sm:w-11
          "
        >
          <Quote size={18} className="text-gray-500" />
        </div>

        {/* Quote text */}
        <blockquote
          key={currentIndex}
          className="
            text-base leading-relaxed text-gray-700
            sm:text-lg md:text-xl md:leading-relaxed
          "
        >
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        {/* Star rating */}
        <div className="mt-4 sm:mt-5">
          <StarRating rating={current.rating} size={16} />
        </div>
      </div>

      {/* Author section */}
      <div className="mt-6 border-t border-gray-100 pt-5 sm:mt-8 sm:pt-6">
        <div className="flex items-center justify-between gap-4">
          {/* Author info */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="
                h-10 w-10 shrink-0 overflow-hidden rounded-full
                border-2 border-white shadow-md
                sm:h-12 sm:w-12
              "
            >
              <img
                src={current.image}
                alt={current.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 sm:text-base">
                {current.name}
              </h4>
              <p className="text-[11px] text-gray-500 sm:text-xs">
                {current.role}
                {current.company && (
                  <span className="text-gray-400">
                    {" · "}
                    {current.company}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Verified badge */}
          <div
            className="
              hidden items-center gap-1.5 rounded-full
              border border-gray-200 bg-gray-50
              px-3 py-1.5 sm:flex
            "
          >
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-medium text-gray-600 sm:text-[11px]">
              Verified Member
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   NAVIGATION ARROW COMPONENT
   ═══════════════════════════════════════════════════════ */

const NavArrow = ({ direction, onClick }) => {
  const isLeft = direction === "left";

  return (
    <button
      onClick={onClick}
      aria-label={`${isLeft ? "Previous" : "Next"} testimonial`}
      className={`
        absolute top-1/2 z-20 -translate-y-1/2
        flex h-9 w-9 items-center justify-center
        rounded-full border border-gray-200/80
        bg-white/95 text-gray-700
        shadow-lg backdrop-blur-sm
        transition-all duration-300
        hover:scale-105 hover:shadow-xl active:scale-95
        sm:h-10 sm:w-10 md:h-11 md:w-11
        ${
          isLeft
            ? "-left-1 sm:-left-3 md:-left-5"
            : "-right-1 sm:-right-3 md:-right-5"
        }
      `}
    >
      {isLeft ? (
        <ChevronLeft size={16} className="sm:h-[18px] sm:w-[18px]" />
      ) : (
        <ChevronRight size={16} className="sm:h-[18px] sm:w-[18px]" />
      )}
    </button>
  );
};

/* ═══════════════════════════════════════════════════════
   PREVIEW CARD COMPONENT
   ═══════════════════════════════════════════════════════ */

const PreviewCard = ({ testimonial, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group flex shrink-0 items-center gap-3
        rounded-xl p-2.5 text-left
        transition-all duration-300
        sm:rounded-2xl sm:p-3
        ${
          isActive
            ? "border border-gray-200 bg-white shadow-sm"
            : "border border-transparent bg-white/60 hover:border-gray-100 hover:bg-white hover:shadow-sm"
        }
      `}
    >
      {/* Avatar */}
      <div
        className={`
          h-10 w-10 shrink-0 overflow-hidden rounded-full
          transition-all duration-300
          sm:h-11 sm:w-11
          ${
            isActive
              ? "ring-2 ring-gray-900 ring-offset-2"
              : "ring-1 ring-gray-200"
          }
        `}
      >
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 max-w-[120px] sm:max-w-[140px]">
        <h4 className="truncate text-[11px] font-semibold text-gray-900 sm:text-xs">
          {testimonial.name}
        </h4>
        <p className="truncate text-[9px] text-gray-400 sm:text-[10px]">
          {testimonial.role}
        </p>
        <div className="mt-1">
          <StarRating rating={testimonial.rating} size={9} />
        </div>
      </div>
    </button>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN TESTIMONIALS COMPONENT
   ═══════════════════════════════════════════════════════ */

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);

  const startX = useRef(0);
  const isDragging = useRef(false);
  const autoPlayRef = useRef(null);

  const total = testimonials.length;
  const current = testimonials[currentIndex];

  /* ────────────── AUTO PLAY ────────────── */

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);

    autoPlayRef.current = setInterval(() => {
      if (!isDragging.current) {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % total);
      }
    }, 7000);
  }, [total]);

  useEffect(() => {
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [resetAutoPlay]);

  /* ────────────── NAVIGATION ────────────── */

  const goTo = useCallback(
    (newIndex, dir = 0) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setDirection(dir);
      setCurrentIndex(newIndex);
      resetAutoPlay();
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, resetAutoPlay]
  );

  const prevSlide = useCallback(
    () => goTo((currentIndex - 1 + total) % total, -1),
    [currentIndex, total, goTo]
  );

  const nextSlide = useCallback(
    () => goTo((currentIndex + 1) % total, 1),
    [currentIndex, total, goTo]
  );

  /* ────────────── TOUCH / DRAG ────────────── */

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.clientX;
    if (diff > 80) nextSlide();
    else if (diff < -80) prevSlide();
    isDragging.current = false;
  };

  /* ────────────── KEYBOARD ────────────── */

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prevSlide, nextSlide]);

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <section
      id="testimonials"
      className="
        relative overflow-hidden bg-[#f8f9fb]
        px-4 py-12
        sm:px-5 sm:py-14
        md:px-6
        lg:px-8 lg:py-20
      "
    >
      {/* ── Background Blurs ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-violet-100/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 rounded-full bg-amber-50/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ═════════════════════════════════════════
            SECTION HEADER
            ═════════════════════════════════════════ */}

        <div className="mb-8 text-center sm:mb-10 lg:mb-14">
          <FadeIn delay={0}>
            <div
              className="
                mb-3 inline-flex items-center gap-2
                rounded-full border border-gray-200/80
                bg-white/90 px-4 py-1.5
                shadow-sm backdrop-blur-sm
                sm:mb-4
              "
            >
              <Award size={14} className="text-gray-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 sm:text-xs">
                Community Achievements
              </span>
            </div>

            <h2
              className="
                text-2xl font-semibold tracking-tight text-gray-900
                sm:text-3xl md:text-4xl
                lg:text-[42px] lg:leading-tight
              "
            >
              Trusted by Our
              <span className="ml-2 text-gray-400">Community</span>
            </h2>
          </FadeIn>

          <FadeIn delay={80}>
            <p
              className="
                mx-auto mt-2.5 max-w-xl
                text-[13px] leading-relaxed text-gray-500
                sm:mt-3 sm:text-sm
                md:max-w-2xl md:text-base
              "
            >
              Success stories are being created every day. GLOBUS community
              members are reaching new milestones, building strong businesses,
              and turning their dreams into reality.
            </p>
          </FadeIn>
        </div>

        {/* ═════════════════════════════════════════
            ACHIEVEMENT STATS GRID
            ═════════════════════════════════════════ */}

        <FadeIn delay={100}>
          <div className="mb-8 grid grid-cols-2 gap-2.5 sm:mb-10 sm:grid-cols-4 sm:gap-4">
            {achievements.map((stat, i) => (
              <AchievementCard key={i} stat={stat} />
            ))}
          </div>
        </FadeIn>

        {/* ═════════════════════════════════════════
            TESTIMONIAL SLIDER
            ═════════════════════════════════════════ */}

        <FadeIn delay={150}>
          <div
            className="relative select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {/* Main testimonial card */}
            <div
              className="
                overflow-hidden rounded-2xl
                border border-gray-100/80 bg-white
                shadow-[0_8px_40px_rgba(0,0,0,0.06)]
                sm:rounded-3xl
              "
            >
              <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Image side */}
                <TestimonialImage
                  current={current}
                  currentIndex={currentIndex}
                  total={total}
                  direction={direction}
                />

                {/* Content side */}
                <TestimonialContent
                  current={current}
                  currentIndex={currentIndex}
                />
              </div>
            </div>

            {/* Navigation arrows */}
            <NavArrow direction="left" onClick={prevSlide} />
            <NavArrow direction="right" onClick={nextSlide} />

            {/* Dot indicators */}
            <div className="mt-5 flex items-center justify-center gap-1.5 sm:mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`
                    h-2 rounded-full transition-all duration-500
                    ${
                      i === currentIndex
                        ? "w-7 bg-gray-900 sm:w-8"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ═════════════════════════════════════════
            PREVIEW ROW
            ═════════════════════════════════════════ */}

        <FadeIn delay={200}>
          <div className="mt-8 sm:mt-10">
            {/* Section label */}
            <div className="mb-4 flex items-center justify-between sm:mb-5">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                  More Success Stories
                </h3>
                <p className="mt-0.5 text-[10px] text-gray-400 sm:text-[11px]">
                  Tap to read their experience
                </p>
              </div>

              <span
                className="
                  rounded-full bg-gray-100 px-2.5 py-1
                  text-[10px] font-semibold text-gray-600
                  sm:text-[11px]
                "
              >
                {total} Stories
              </span>
            </div>

            {/* Scrollable preview cards */}
            <div
              className="
                scrollbar-none -mx-4 flex gap-3
                overflow-x-auto px-4 pb-2
                sm:gap-3.5
              "
            >
              {testimonials.map((t, i) => (
                <PreviewCard
                  key={t.id || i}
                  testimonial={t}
                  index={i}
                  isActive={i === currentIndex}
                  onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ═════════════════════════════════════════
            BOTTOM CTA
            ═════════════════════════════════════════ */}

        <FadeIn delay={250}>
          <div
            className="
              mt-8 overflow-hidden rounded-2xl
              bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800
              p-5 text-center
              shadow-[0_20px_60px_rgba(0,0,0,0.15)]
              sm:mt-10 sm:rounded-3xl sm:p-8
              lg:p-10
            "
          >
            {/* Icon */}
            <div
              className="
                mx-auto flex h-11 w-11 items-center justify-center
                rounded-2xl bg-white/10
                sm:h-12 sm:w-12
              "
            >
              <Sparkles size={20} className="text-white" />
            </div>

            {/* Title */}
            <h3
              className="
                mt-3 text-lg font-semibold text-white
                sm:mt-4 sm:text-xl md:text-2xl
              "
            >
              Join Our Growing Community
            </h3>

            {/* Description */}
            <p
              className="
                mx-auto mt-2 max-w-lg
                text-xs leading-relaxed text-gray-400
                sm:text-sm
                md:max-w-xl md:text-base
              "
            >
              Become part of the Globus ecosystem and start building your own
              success story. Thousands of members are already thriving.
            </p>

            {/* Buttons */}
            <div
              className="
                mt-5 flex flex-col items-center justify-center
                gap-2.5
                sm:mt-6 sm:flex-row sm:gap-3
              "
            >
              <a
                href="#contact"
                className="
                  inline-flex w-full items-center justify-center gap-2
                  rounded-full bg-white
                  px-5 py-2.5
                  text-xs font-medium text-gray-900
                  shadow-md
                  transition-all duration-300
                  hover:shadow-lg active:scale-95
                  sm:w-auto sm:px-6 sm:py-3 sm:text-sm
                "
              >
                Get Started
                <ArrowRight size={15} />
              </a>

              <a
                href="#about"
                className="
                  inline-flex w-full items-center justify-center gap-2
                  rounded-full border border-white/20
                  bg-white/10
                  px-5 py-2.5
                  text-xs font-medium text-white
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:bg-white/15 active:scale-95
                  sm:w-auto sm:px-6 sm:py-3 sm:text-sm
                "
              >
                Learn More
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Testimonials;