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
    description: "Watch the complete Globus introduction explained in Tamil language",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "12:45",
    views: "2.4K",
  },
  {
    name: "English",
    videoId: "dQw4w9WgXcQ",
    flag: "🇬🇧",
    subtitle: "English Explanation",
    description: "Full platform walkthrough and business model explained in English",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "15:20",
    views: "5.1K",
  },
  {
    name: "Sinhala",
    videoId: "dQw4w9WgXcQ",
    flag: "🇱🇰",
    subtitle: "සිංහල පැහැදිලි කිරීම",
    description: "Globus ecosystem and earning methods explained in Sinhala",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "11:30",
    views: "3.8K",
  },
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export default function VideoReferences() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const prevSlide = () =>
    goTo((index - 1 + videos.length) % videos.length);

  const nextSlide = () =>
    goTo((index + 1) % videos.length);

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
  }, [index, activeVideo]);

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
    <section className="relative overflow-hidden bg-[#f8f9fb] px-4 py-12 sm:px-5 sm:py-14 md:px-6 lg:px-8 lg:py-20">
      {/* Background blurs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-violet-100/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-50/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ─────── HEADER ─────── */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-14">
          <FadeIn delay={0}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-sm sm:mb-4">
              <Globe size={14} className="text-gray-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 sm:text-xs">
                Multi-Language Support
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] lg:leading-tight">
              Video
              <span className="ml-2 text-gray-400">References</span>
            </h2>
          </FadeIn>

          <FadeIn delay={80}>
            <p className="mx-auto mt-2.5 max-w-xl text-[13px] leading-relaxed text-gray-500 sm:mt-3 sm:text-sm md:max-w-2xl md:text-base">
              Watch our introduction and explanation videos about Globus in
              different languages. Choose your preferred language to understand
              the concept clearly.
            </p>
          </FadeIn>
        </div>

        {/* ─────── MAIN CONTENT ─────── */}
        <FadeIn delay={120}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            {/* ── LEFT: VIDEO PLAYER AREA ── */}
            <div className="lg:col-span-3">
              <div
                className="relative select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              >
                {/* Main video card */}
                <div className="group relative overflow-hidden rounded-2xl border border-gray-100/80 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:rounded-3xl">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-gray-900">
                    <img
                      src={current.thumbnail}
                      alt={current.name}
                      className="h-full w-full object-cover opacity-80 transition-all duration-700"
                      key={index}
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Play button center */}
                    <button
                      onClick={() => setActiveVideo(current.videoId)}
                      className="
                        absolute left-1/2 top-1/2
                        -translate-x-1/2 -translate-y-1/2
                        flex h-14 w-14 items-center justify-center
                        rounded-full bg-white/95 text-gray-900
                        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                        backdrop-blur-sm
                        transition-all duration-300
                        hover:scale-110 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]
                        active:scale-95
                        sm:h-16 sm:w-16 md:h-20 md:w-20
                      "
                    >
                      <Play
                        size={24}
                        className="ml-1 fill-gray-900 sm:h-7 sm:w-7 md:h-8 md:w-8"
                      />
                    </button>

                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 rounded-lg bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm sm:bottom-4 sm:right-4 sm:text-xs">
                      {current.duration}
                    </div>

                    {/* Language badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:left-4 sm:top-4">
                      <span className="text-sm">{current.flag}</span>
                      <span className="text-[11px] font-semibold text-gray-900 sm:text-xs">
                        {current.name}
                      </span>
                    </div>

                    {/* Views badge */}
                    <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white/90 backdrop-blur-sm sm:right-4 sm:top-4 sm:text-[11px]">
                      {current.views} views
                    </div>
                  </div>

                  {/* Info bar below thumbnail */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 sm:text-base md:text-lg">
                          Globus Introduction — {current.name}
                        </h3>
                        <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">
                          {current.subtitle}
                        </p>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500 sm:text-[13px]">
                          {current.description}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveVideo(current.videoId)}
                        className="
                          shrink-0 rounded-full bg-gray-900
                          px-3.5 py-2 text-[11px] font-medium
                          text-white shadow-md
                          transition-all duration-300
                          hover:bg-black hover:shadow-lg
                          active:scale-95
                          sm:px-4 sm:py-2.5 sm:text-xs
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
                  className="
                    absolute -left-2 top-[35%] z-20
                    flex h-9 w-9 items-center justify-center
                    rounded-full border border-gray-200/80
                    bg-white/95 text-gray-700
                    shadow-lg backdrop-blur-sm
                    transition-all duration-300
                    hover:scale-105 hover:shadow-xl
                    active:scale-95
                    sm:-left-3 sm:h-10 sm:w-10
                    md:-left-5 md:h-11 md:w-11
                  "
                >
                  <ChevronLeft size={16} className="sm:h-[18px] sm:w-[18px]" />
                </button>

                <button
                  onClick={nextSlide}
                  className="
                    absolute -right-2 top-[35%] z-20
                    flex h-9 w-9 items-center justify-center
                    rounded-full border border-gray-200/80
                    bg-white/95 text-gray-700
                    shadow-lg backdrop-blur-sm
                    transition-all duration-300
                    hover:scale-105 hover:shadow-xl
                    active:scale-95
                    sm:-right-3 sm:h-10 sm:w-10
                    md:-right-5 md:h-11 md:w-11
                  "
                >
                  <ChevronRight size={16} className="sm:h-[18px] sm:w-[18px]" />
                </button>

                {/* Dots */}
                <div className="mt-4 flex items-center justify-center gap-1.5 sm:mt-5">
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`
                        h-2 rounded-full transition-all duration-500
                        ${
                          i === index
                            ? "w-7 bg-gray-900 sm:w-8"
                            : "w-2 bg-gray-300 hover:bg-gray-400"
                        }
                      `}
                    />
                  ))}
                </div>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3 backdrop-blur-xl sm:px-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="
                absolute right-2 top-2 z-10
                flex h-8 w-8 items-center justify-center
                rounded-full bg-white/95 text-gray-900
                shadow-lg
                transition-all duration-300
                hover:scale-105 hover:bg-white
                active:scale-95
                sm:right-3 sm:top-3 sm:h-10 sm:w-10
              "
            >
              <X size={16} className="sm:h-[18px] sm:w-[18px]" />
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
            <div className="flex items-center justify-between bg-gray-900 px-3 py-2.5 sm:px-5 sm:py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {videos.find((v) => v.videoId === activeVideo)?.flag}
                </span>
                <span className="text-[11px] font-medium text-white sm:text-xs">
                  Globus —{" "}
                  {videos.find((v) => v.videoId === activeVideo)?.name}
                </span>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="text-[11px] font-medium text-gray-400 transition-colors hover:text-white sm:text-xs"
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