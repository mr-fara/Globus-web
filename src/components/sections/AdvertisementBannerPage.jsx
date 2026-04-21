import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    title: "Big Summer Sale",
    subtitle: "Up to 50% OFF on selected products",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "New Tech Arrivals",
    subtitle: "Latest gadgets at unbeatable prices",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Fashion Collection 2026",
    subtitle: "Upgrade your style with premium trends",
    image:
      "https://images.unsplash.com/photo-1520975928316-5f1c6f1c2c8f?auto=format&fit=crop&w=1600&q=80",
  },
];

const AdvertisementSlider = () => {
  const [index, setIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="w-full flex justify-center py-5 bg-gray-100">

      {/* OUTER CARD */}
      <div className="relative w-[95%] md:w-[75%] h-[50vh] rounded-2xl overflow-hidden shadow-2xl bg-black">

        {/* SLIDES */}
        {banners.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              i === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-6">

              <h1 className="text-white text-3xl md:text-5xl font-bold">
                {item.title}
              </h1>

              <p className="text-gray-200 mt-4 text-sm md:text-lg max-w-xl">
                {item.subtitle}
              </p>

            </div>
          </div>
        ))}

        {/* LEFT BUTTON */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition"
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition"
        >
          <ChevronRight size={22} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-5 w-full flex justify-center gap-2">
          {banners.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                i === index
                  ? "bg-white scale-125"
                  : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSlider;