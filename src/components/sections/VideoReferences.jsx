import React, { useEffect, useRef, useState, useCallback } from "react";
import FadeIn from "../animations/FadeIn";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Globe,
  Languages,
  MonitorPlay,
  Volume2,
  Subtitles,
  Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   VIDEO DATA
   ═══════════════════════════════════════════════ */

const videos = [
  {
    name: "Tamil",
    videoId: "dQw4w9WgXcQ",
    flag: "🇱🇰",
    subtitle: "தமிழ் விளக்கம்",
    description:
      "Watch the complete Globus introduction explained in Tamil language with detailed walkthrough of all features and earning methods.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "12:45",
    views: "2.4K",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "English",
    videoId: "dQw4w9WgXcQ",
    flag: "🇬🇧",
    subtitle: "English Explanation",
    description:
      "Full platform walkthrough and business model explained in English. Learn about all the features and opportunities available.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "15:20",
    views: "5.1K",
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    name: "Sinhala",
    videoId: "dQw4w9WgXcQ",
    flag: "🇱🇰",
    subtitle: "සිංහල පැහැදිලි කිරීම",
    description:
      "Globus ecosystem and earning methods explained in Sinhala. Complete guide for Sri Lankan users to get started.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "11:30",
    views: "3.8K",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

/* ═══════════════════════════════════════════════
   FEATURE HIGHLIGHTS
   ═══════════════════════════════════════════════ */

const features = [
  {
    icon: Languages,
    title: "Multi-Language",
    desc: "Available in 3 languages",
  },
  {
    icon: MonitorPlay,
    title: "HD Quality",
    desc: "Crystal clear video",
  },
  {
    icon: Volume2,
    title: "Clear Audio",
    desc: "Professional narration",
  },
  {
    icon: Subtitles,
    title: "Subtitles",
    desc: "Easy to follow along",
  },
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export default function VideoReferences() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const startX = useRef(0);
  const isDragging = useRef(false);
  const autoPlayRef = useRef(null);

  /* ────── AUTO SLIDE ────── */
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);

    autoPlayRef.current = setInterval(() => {
      if (!isDragging.current && !activeVideo) {
        setIndex((prev) => (prev + 1) % videos.length);
      }
    }, 6000);
  }, [activeVideo]);

  useEffect(() => {
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [resetAutoPlay]);

  /* ────── SLIDE CONTROLS ────── */
  const goTo = useCallback(
    (newIndex) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setIndex(newIndex);
      resetAutoPlay();
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning, resetAutoPlay]
  );

  const prevSlide = useCallback(
    () => goTo((index - 1 + videos.length) % videos.length),
    [index, goTo]
  );

  const nextSlide = useCallback(
    () => goTo((index + 1) % videos.length),
    [index, goTo]
  );

  /* ────── TOUCH / DRAG ────── */
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

  /* ────── KEYBOARD ────── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape" && activeVideo) setActiveVideo(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prevSlide, nextSlide, activeVideo]);

  /* ────── LOCK SCROLL WHEN MODAL OPEN ────── */
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  const current = videos[index];

  /* ═══════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════ */
  return (
    <section className="relative overflow-hidden bg-[#f8f9fb] px-4 py-10 sm:px-5 sm:py-14 md:px-6 md:py-16 lg:px-8 lg:py-20 xl:py-24">
      {/* Background blurs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-violet-100/40 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/40 blur-3xl sm:h-60 sm:w-60" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ─────── HEADER ─────── */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-14">
          <FadeIn delay={0}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-3 py-1 shadow-sm backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-1.5">
              <Globe size={13} className="text-gray-500 sm:h-3.5 sm:w-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-500 sm:text-[11px] md:text-xs">
                Multi-Language Support
              </span>
            </div>

            <h2 className="text-[22px] font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] lg:leading-tight">
              Video
              <span className="ml-1.5 text-gray-400 sm:ml-2">References</span>
            </h2>
          </FadeIn>

          <FadeIn delay={80}>
            <p className="mx-auto mt-2 max-w-md text-[12px] leading-relaxed text-gray-500 sm:mt-3 sm:max-w-xl sm:text-sm md:max-w-2xl md:text-base">
              Watch our introduction and explanation videos about Globus in
              different languages. Choose your preferred language to understand
              the concept clearly.
            </p>
          </FadeIn>
        </div>

        {/* ─────── MAIN CONTENT ─────── */}
        <FadeIn delay={120}>
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-5 lg:gap-8 xl:gap-10">
            {/* ══════════════════════════════════════
               LEFT: VIDEO PLAYER AREA (3/5 on lg+)
               ══════════════════════════════════════ */}
            <div className="lg:col-span-3">
              <div
                className="relative select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                {/* Main video card */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-100/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:rounded-2xl sm:shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:rounded-3xl">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gray-900">
                    <img
                      src={current.thumbnail}
                      alt={current.name}
                      className="h-full w-full object-cover opacity-80 transition-all duration-700"
                      key={index}
                      draggable={false}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Colored accent overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-30 mix-blend-overlay transition-all duration-700`}
                    />

                    {/* Play button center */}
                    <button
                      onClick={() => setActiveVideo(current.videoId)}
                      className="
                        absolute left-1/2 top-1/2
                        -translate-x-1/2 -translate-y-1/2
                        flex items-center justify-center
                        rounded-full bg-white/95 text-gray-900
                        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                        backdrop-blur-sm
                        transition-all duration-300
                        hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]
                        active:scale-95
                        h-12 w-12
                        sm:h-14 sm:w-14
                        md:h-18 md:w-18
                        lg:h-20 lg:w-20
                      "
                      aria-label="Play video"
                    >
                      <Play
                        className="ml-0.5 fill-gray-900 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8"
                      />
                    </button>

                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:right-3 sm:rounded-lg sm:px-2.5 sm:py-1 sm:text-[11px] md:bottom-4 md:right-4 md:text-xs">
                      {current.duration}
                    </div>

                    {/* Language badge */}
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 shadow-lg backdrop-blur-sm sm:left-3 sm:top-3 sm:gap-1.5 sm:px-3 sm:py-1.5 md:left-4 md:top-4">
                      <span className="text-xs sm:text-sm">{current.flag}</span>
                      <span className="text-[10px] font-semibold text-gray-900 sm:text-[11px] md:text-xs">
                        {current.name}
                      </span>
                    </div>

                    {/* Views badge */}
                    <div className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-sm sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px] md:right-4 md:top-4 md:text-[11px]">
                      {current.views} views
                    </div>
                  </div>

                  {/* Info bar below thumbnail */}
                  <div className="p-3 sm:p-4 md:p-5">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-semibold text-gray-900 sm:text-sm md:text-base lg:text-lg">
                          Globus Introduction — {current.name}
                        </h3>
                        <p className="mt-0.5 text-[10px] text-gray-400 sm:text-[11px] md:text-xs">
                          {current.subtitle}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-gray-500 sm:mt-1.5 sm:text-xs md:text-[13px]">
                          {current.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveVideo(current.videoId)}
                        className="
                          shrink-0 rounded-full bg-gray-900
                          text-white shadow-md
                          transition-all duration-300
                          hover:bg-black hover:shadow-lg
                          active:scale-95
                          px-3 py-1.5 text-[10px] font-medium
                          sm:px-3.5 sm:py-2 sm:text-[11px]
                          md:px-4 md:py-2.5 md:text-xs
                        "
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous video"
                  className="
                    absolute top-[30%] z-20
                    flex items-center justify-center
                    rounded-full border border-gray-200/80
                    bg-white/95 text-gray-700
                    shadow-lg backdrop-blur-sm
                    transition-all duration-300
                    hover:scale-105 hover:shadow-xl
                    active:scale-95
                    -left-1.5 h-8 w-8
                    sm:-left-2.5 sm:h-9 sm:w-9
                    md:-left-4 md:h-10 md:w-10
                    lg:-left-5 lg:h-11 lg:w-11
                  "
                >
                  <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]" />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next video"
                  className="
                    absolute top-[30%] z-20
                    flex items-center justify-center
                    rounded-full border border-gray-200/80
                    bg-white/95 text-gray-700
                    shadow-lg backdrop-blur-sm
                    transition-all duration-300
                    hover:scale-105 hover:shadow-xl
                    active:scale-95
                    -right-1.5 h-8 w-8
                    sm:-right-2.5 sm:h-9 sm:w-9
                    md:-right-4 md:h-10 md:w-10
                    lg:-right-5 lg:h-11 lg:w-11
                  "
                >
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]" />
                </button>

                {/* Dots */}
                <div className="mt-3 flex items-center justify-center gap-1.5 sm:mt-4 md:mt-5">
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to video ${i + 1}`}
                      className={`
                        h-1.5 rounded-full transition-all duration-500
                        sm:h-2
                        ${
                          i === index
                            ? "w-6 bg-gray-900 sm:w-7 md:w-8"
                            : "w-1.5 bg-gray-300 hover:bg-gray-400 sm:w-2"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════
               RIGHT: SIDEBAR (2/5 on lg+)
               ══════════════════════════════════════ */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* ── Language Selector Cards ── */}
                <div>
                  <h3 className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 sm:mb-3 sm:text-xs">
                    <Languages size={13} className="sm:h-3.5 sm:w-3.5" />
                    Available Languages
                  </h3>

                  <div className="flex flex-row gap-2 sm:gap-2.5 lg:flex-col lg:gap-3">
                    {videos.map((video, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        onMouseEnter={() => setHoveredCard(i)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`
                          group/card relative flex-1 overflow-hidden rounded-lg border
                          p-2.5 text-left
                          transition-all duration-300
                          sm:rounded-xl sm:p-3
                          lg:flex-none lg:rounded-2xl lg:p-4
                          ${
                            i === index
                              ? "border-gray-900/20 bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                              : "border-gray-200/80 bg-white text-gray-900 shadow-sm hover:border-gray-300 hover:shadow-md"
                          }
                        `}
                      >
                        <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
                          {/* Flag */}
                          <div
                            className={`
                              flex items-center justify-center rounded-lg
                              text-base
                              h-8 w-8
                              sm:h-9 sm:w-9 sm:text-lg
                              lg:h-11 lg:w-11 lg:rounded-xl lg:text-xl
                              ${
                                i === index
                                  ? "bg-white/15"
                                  : "bg-gray-50"
                              }
                            `}
                          >
                            {video.flag}
                          </div>

                          {/* Text */}
                          <div className="min-w-0 flex-1">
                            <p
                              className={`
                                truncate text-[11px] font-semibold
                                sm:text-xs lg:text-sm
                                ${i === index ? "text-white" : "text-gray-900"}
                              `}
                            >
                              {video.name}
                            </p>
                            <p
                              className={`
                                hidden truncate text-[10px]
                                sm:block sm:text-[11px]
                                ${
                                  i === index
                                    ? "text-white/60"
                                    : "text-gray-400"
                                }
                              `}
                            >
                              {video.duration} • {video.views} views
                            </p>
                          </div>

                          {/* Play indicator */}
                          <div
                            className={`
                              flex items-center justify-center rounded-full
                              h-6 w-6
                              sm:h-7 sm:w-7
                              lg:h-8 lg:w-8
                              transition-all duration-300
                              ${
                                i === index
                                  ? "bg-white/20"
                                  : "bg-gray-100 group-hover/card:bg-gray-200"
                              }
                            `}
                          >
                            {i === index ? (
                              <div className="flex items-center gap-[2px]">
                                <span className="inline-block h-2.5 w-[2px] animate-pulse rounded-full bg-white" />
                                <span className="inline-block h-3.5 w-[2px] animate-pulse rounded-full bg-white [animation-delay:150ms]" />
                                <span className="inline-block h-2 w-[2px] animate-pulse rounded-full bg-white [animation-delay:300ms]" />
                              </div>
                            ) : (
                              <Play className="h-2.5 w-2.5 fill-gray-500 text-gray-500 sm:h-3 sm:w-3" />
                            )}
                          </div>
                        </div>

                        {/* Expanded description - only on lg+ for active */}
                        {i === index && (
                          <p className="mt-2 hidden text-[11px] leading-relaxed text-white/50 lg:line-clamp-2 lg:block lg:text-xs">
                            {video.description}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Feature Highlights ── */}
                <div className="rounded-lg border border-gray-200/80 bg-white p-3 shadow-sm sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-5">
                  <h3 className="mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400 sm:mb-3 sm:text-xs">
                    <Sparkles size={13} className="sm:h-3.5 sm:w-3.5" />
                    Video Features
                  </h3>

                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
                    {features.map((feat, i) => (
                      <div
                        key={i}
                        className="group/feat flex items-center gap-2 rounded-lg bg-gray-50/80 p-2 transition-all duration-300 hover:bg-gray-100/80 sm:rounded-xl sm:p-2.5 lg:gap-2.5 lg:p-3"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-300 group-hover/feat:shadow-md sm:h-8 sm:w-8 lg:h-9 lg:w-9">
                          <feat.icon className="h-3 w-3 text-gray-600 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[10px] font-semibold text-gray-900 sm:text-[11px] lg:text-xs">
                            {feat.title}
                          </p>
                          <p className="hidden truncate text-[9px] text-gray-400 sm:block sm:text-[10px] lg:text-[11px]">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Quick Play All Button ── */}
                <button
                  onClick={() => setActiveVideo(current.videoId)}
                  className="
                    group/play flex w-full items-center justify-center gap-2
                    rounded-lg border border-gray-200/80 bg-white
                    py-2.5 text-[11px] font-semibold text-gray-700
                    shadow-sm transition-all duration-300
                    hover:border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-lg
                    active:scale-[0.98]
                    sm:rounded-xl sm:py-3 sm:text-xs
                    lg:rounded-2xl lg:py-3.5 lg:text-sm
                  "
                >
                  <Play className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
                  Play Current Video
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ═══════════════════════════════════════════════
         VIDEO MODAL
         ═══════════════════════════════════════════════ */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-2 backdrop-blur-xl sm:px-4 md:px-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-xs overflow-hidden rounded-lg shadow-2xl sm:max-w-lg sm:rounded-xl md:max-w-3xl md:rounded-2xl lg:max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
              className="
                absolute right-1.5 top-1.5 z-10
                flex items-center justify-center
                rounded-full bg-white/95 text-gray-900
                shadow-lg
                transition-all duration-300
                hover:scale-105 hover:bg-white
                active:scale-95
                h-7 w-7
                sm:right-2 sm:top-2 sm:h-8 sm:w-8
                md:right-3 md:top-3 md:h-10 md:w-10
              "
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-[18px] md:w-[18px]" />
            </button>

            {/* Video */}
            <div className="aspect-video bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="Video Player"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between bg-gray-900 px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-5 md:py-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm">
                  {videos.find((v) => v.videoId === activeVideo)?.flag}
                </span>
                <span className="text-[10px] font-medium text-white sm:text-[11px] md:text-xs">
                  Globus —{" "}
                  {videos.find((v) => v.videoId === activeVideo)?.name}
                </span>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="text-[10px] font-medium text-gray-400 transition-colors hover:text-white sm:text-[11px] md:text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}