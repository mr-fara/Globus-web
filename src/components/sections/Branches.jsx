import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from '../animations/FadeIn';

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
      { threshold: 0.5 }
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

//////////////// DATA //////////////////

const branches = [
  {
    name: "Easten",
    place: "South Easten, Srilanka",
    img: "/image/branch 01.jpeg",
  },
  {
    name: "Easten",
    place: "South Easten, Srilanka",
    img: "/image/branch 02.jpeg",
  },
  {
    name: "Easten",
    place: "South Easten, Srilanka",
    img: "/image/branch 03.jpeg",
  },
  {
    name: "Easten",
    place: "South Easten, Srilanka",
    img: "/image/branch 04.jpeg",
  },
  {
    name: "Easten",
    place: "South Easten, Srilanka",
    img: "/image/branch 01.jpeg",
  },
  {
    name: "Easten",
    place: "South Easten, Srilanka",
    img: "/image/branch 02.jpeg",
  },
  {
    name: "Easten",
    place: "South Easten, Srilanka",
    img: "/image/branch 03.jpeg",
  },
  {
    name: "Easten",
    place: "South Easten, Srilanka",
    img: "/image/branch 04.jpeg",
  },
];

//////////////// COMPONENT //////////////////

const Branches = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const getCardsPerView = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth =
      container.offsetWidth / getCardsPerView();

    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const max =
      branches.length - getCardsPerView();

    scrollToIndex(
      Math.min(currentIndex + 1, max)
    );
  };

  const prevSlide = () => {
    scrollToIndex(
      Math.max(currentIndex - 1, 0)
    );
  };

  return (
    <section id='branch' className="w-full py-28 px-4 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* LEFT SIDE */}

        <div className="md:col-span-1 text-center md:text-left">
             <FadeIn delay={0}>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Globus Branches
          </h2>

          <p className="text-gray-700 text-sm md:text-base">
            In just 15 months, GLOBUS has grown rapidly, expanding our presence with multiple service branches across Sri Lanka. This remarkable journey reflects our strong commitment, trust, and customer satisfaction.
          </p>
            </FadeIn>
              <FadeIn delay={100}>
          <div className="mt-4 text-lg font-semibold mt-6">
            Total Branches :{" "}
            <Counter target={18} suffix="+" />
          </div>
            </FadeIn>
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
                  className="w-full h-83 sm:w-3xs lg:w-1/3 shrink-0 snap-start"
                >

                  <div className="bg-white rounded-xl shadow overflow-hidden">

                    <img
                      src={b.img}
                      className="w-120 h-70 rounded-2xl"
                    />

                    <div className="p-3">

                      <h3 className="text-blue-600 font-bold text-lg">
                        {b.name}
                      </h3>

                      <p className="text-sm text-gray-700">
                        Sri-Lankan Branch
                      </p>

                      <p className="text-sm text-gray-700">
                        {b.place}
                      </p>

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
            <div className="flex items-center justify-center gap-2 mt-8">

              {Array.from({
                length: Math.max(
                  0,
                  branches.length - getCardsPerView() + 1
                ),
              }).map((_, index) => (

                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "bg-blue-600 w-6 h-2"
                      : "bg-gray-400 w-2 h-2"
                  }`}
                />

              ))}

            </div>
          )}

        </div>
      </div>

    </section>
  );
};

export default Branches;