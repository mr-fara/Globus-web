import React, { useEffect, useRef, useState } from "react";
import FadeIn from "../animations/FadeIn";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function VideoReferences() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [index, setIndex] = useState(0);

  const containerRef = useRef(null);
  const scrollY = useRef(0);
  const rafRef = useRef(null);

  const startX = useRef(0);
  const isDragging = useRef(false);

  const videos = [
    { name: "Tamil", videoId: "dQw4w9WgXcQ" },
    { name: "English", videoId: "dQw4w9WgXcQ" },
    { name: "Sinhala", videoId: "dQw4w9WgXcQ" },
  ];

  /* ---------------- AUTO SLIDER ---------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current) {
        setIndex((prev) => (prev + 1) % videos.length);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- PARALLAX ENGINE ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.setProperty(
              "--scroll",
              scrollY.current
            );
          }
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- SWIPE ---------------- */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
  };

  /* ---------------- DRAG ---------------- */
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

  /* ---------------- SLIDER CONTROLS ---------------- */
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % videos.length);
  };

  /* ---------------- UI ---------------- */
  return (
    <section
      ref={containerRef}
      className="relative py-18 px-2 flex justify-center bg-gray-50 overflow-hidden"
    >
      {/* 🌌 PARALLAX BACKGROUND */}
      <div
        className="absolute top-[-180px] left-[-180px] w-[500px] h-[500px] rounded-full blur-3xl bg-blue-300 opacity-30"
        style={{
          transform: "translateY(calc(var(--scroll) * 0.08px))",
        }}
      />

      <div
        className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] rounded-full blur-3xl bg-purple-300 opacity-30"
        style={{
          transform: "translateY(calc(var(--scroll) * -0.06px))",
        }}
      />

      <div className="max-w-7xl w-full grid lg:grid-cols-2 items-center">
        
        {/* LEFT CONTENT */}
        <FadeIn delay={0}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Video References
            </h2>

            <p className="text-gray-600 max-w-md text-justify">
              Watch our introduction and explanation videos about Globus in
              different languages. Choose your preferred language to understand
              the concept clearly and learn how the platform works.
            </p>
          </div>
        </FadeIn>

        {/* RIGHT SLIDER */}
        <FadeIn delay={100}>
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            {/* NAV BUTTONS */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                         w-11 h-11 rounded-full
                         bg-white/40 backdrop-blur-xl
                         border border-white/30
                         shadow-lg
                         flex items-center justify-center
                         hover:scale-110 active:scale-95 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                         w-11 h-11 rounded-full
                         bg-white/40 backdrop-blur-xl
                         border border-white/30
                         shadow-lg
                         flex items-center justify-center
                         hover:scale-110 active:scale-95 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>

            {/* SLIDER */}
            <div className="relative h-[460px] md:h-[400px] overflow-hidden rounded-[28px]">

              {videos.map((item, i) => {
                const offset = i - index;

                return (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
                    style={{
                      transform: `
                        translateX(${offset * 100}%)
                        scale(${i === index ? 1 : 0.9})
                        translateY(calc(var(--scroll) * ${i === index ? 0.02 : 0.01}px))
                      `,
                      opacity: i === index ? 1 : 0.35,
                    }}
                  >
                    {/* GLASS CARD */}
                    <div
                      onClick={() => setActiveVideo(item.videoId)}
                      className="w-[85%] md:w-[65%]
                                 rounded-[28px] p-8 text-center
                                 bg-white/40 backdrop-blur-2xl
                                 border border-white/30
                                 shadow-[0_25px_80px_rgba(0,0,0,0.12)]
                                 hover:scale-105 transition cursor-pointer"
                    >
                      <div className="text-4xl mb-3">🎥</div>

                      <h3 className="text-xl font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-2">
                        Tap to watch video
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DOT NAV */}
            <div className="flex justify-center mt-7 gap-2">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300
                    ${i === index ? "w-8 bg-gray-900" : "w-2.5 bg-gray-300"}
                  `}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 🎥 VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 px-4">

          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl">

            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
            >
              ✕
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}