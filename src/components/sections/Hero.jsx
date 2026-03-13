import React from "react";
import FadeIn from '../animations/FadeIn';

const Hero = () => {
  const handleContactClick = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full flex justify-center mt-18 md:mt-18 px-4">
      <div
        className="relative w-full max-w-[1320px] h-[420px] md:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden flex items-end pb-10"
        style={{
          backgroundImage: "url('/image/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900/40"></div>

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-10 md:px-16 max-w-xl md:max-w-2xl text-white">

          {/* Title */}
          <FadeIn delay={0}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 md:mb-1">
            Welcome
          </h1>
        

          {/* Subtitle */}
           
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 md:mb-8">
            Explore the Globus
          </h2>
           </FadeIn>

          {/* Description */}
              <FadeIn delay={100}>
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-semibold leading-relaxed mb-6 md:mb-8">
            Launch faster with a clear control center for support,
            outreach, and analytics. Built for teams that need
            elegant operations at scale.
          </p>
              </FadeIn>

          {/* Button */}
              <FadeIn delay={200}>
          <button
            onClick={handleContactClick}
            className="bg-black text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-black transition duration-300 text-sm md:text-base"
          >
            Join with Us
          </button>
                </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero