import React, { useState, useRef, useEffect } from "react";
import BranchModal from "../ui/BranchModal";
import { branches } from "../../data/branches";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "../animations/FadeIn";

//////////////// COUNTER //////////////////

const Counter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const start = useRef(null);

  useEffect(() => {
    let observer;

    const animate = (time) => {
      if (!start.current) start.current = time;

      const progress = time - start.current;
      const percent = Math.min(progress / duration, 1);

      setCount(Math.floor(percent * target));

      if (percent < 1) {
        requestAnimationFrame(animate);
      }
    };

    observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer && observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

//////////////// COMPONENT //////////////////

const Branches = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const scrollRef = useRef(null);

  const getCardsPerView = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth / getCardsPerView();

    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const max = branches.length - getCardsPerView();

    scrollToIndex(Math.min(currentIndex + 1, max));
  };

  const prevSlide = () => {
    scrollToIndex(Math.max(currentIndex - 1, 0));
  };

  return (
    <section id="branch" className="w-full py-28 px-4 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* LEFT SIDE */}

        <div className="relative w-full bg-[#f5f5f7] rounded-[32px] p-10 md:p-16 text-center overflow-hidden border border-gray-200/50 shadow-[0_30px_80px_rgba(0,0,0,0.06)]">

          {/* 🌌 Very Subtle Ambient Background */}
          <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-blue-400/10 blur-[140px] rounded-full" />
          <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-purple-400/10 blur-[140px] rounded-full" />

          {/* Content */}
          <div className="relative z-10">

            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
              Globus Branches
            </h2>

            {/* Description */}
            <p className="mt-6 text-gray-500 text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-light">
              Globus has rapidly expanded its presence across Sri Lanka, building a strong
              network of service-based businesses. Each branch represents trust, quality,
              and our commitment to empowering local entrepreneurs.
            </p>

            {/* Divider */}
            <div className="w-16 h-[3px] bg-gray-400 mx-auto my-10" />

            {/* Stats Section */}
            <div className="grid grid-cols-2 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">

              {/* LEFT STAT */}
              <div className="flex flex-col items-center">
                <h3 className="text-6xl md:text-7xl font-semibold text-gray-900 tracking-tight">
                  <Counter target={9} suffix="+" />
                </h3>
                <p className="text-xs md:text-sm text-gray-700 mt-3 uppercase tracking-[0.15em]">
                  Active Branches
                </p>
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h4 className="text-1xl md:text-2xl font-medium text-gray-900 tracking-tight">
                  Growing Across Sri Lanka
                </h4>
                <p className="text-sm md:text-base text-gray-600 mt-2 font-light">
                  Expanding Every Month
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="md:col-span-3 relative">
          {/* SLIDER */}
          <FadeIn delay={200}>
            <div
              ref={scrollRef}
              className="overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar"
            >
              <div className="flex gap-4">
                {branches.map((b, i) => (
                  <div
                    key={i}
                    className="w-full h-105 sm:w-3xs lg:w-1/3 shrink-0 snap-start"
                  >
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                      <img src={b.img} className="w-120 h-70 rounded-2xl" />

                      <div className="flex items-center justify-between p-4">
                        <div>
                          <h3 className="text-gray-800 font-bold text-lg">
                            {b.name}
                          </h3>

                          <p className="text-sm text-gray-700">{b.place}</p>
                        </div>
                        {/* Button at bottom-right */}
                        <div className="flex items-center justify-center ">
                          <button
                            onClick={() => setSelectedBranch(b)}
                            className=" w-30 h-10  bg-gray-950 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                          
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          {/* ARROWS */}

          {branches.length > getCardsPerView() && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/35 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/35 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition disabled:opacity-30"
              >
                <ChevronRight />
              </button>
            </>
          )}

          {/* ✅ NAVIGATION DOTS */}

          {branches.length > getCardsPerView() && (
            <div className="flex items-center justify-center gap-2 mt-0">
              {Array.from({
                length: Math.max(0, branches.length - getCardsPerView() + 1),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "bg-black w-6 h-1.5"
                      : "bg-gray-400 w-1.5 h-1"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODEL */}
      <BranchModal
        branch={selectedBranch}
        onClose={() => setSelectedBranch(null)}
      />
    </section>
  );
};

export default Branches;
