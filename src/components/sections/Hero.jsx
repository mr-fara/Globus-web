import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const handleContactClick = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExploreClick = () => {
    // Navigate properly instead of file path
    window.location.href = "/business-ecosystem";
  };

  return (
    <section className="w-full flex justify-center px-4 py-18 md:py-16">

      <div
        className="relative w-full max-w-[1400px] h-[520px] md:h-[620px] lg:h-[700px] rounded-[30px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.25)] flex items-center"
        style={{
          backgroundImage: "url('/image/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/35 to-black/20"></div>

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-12 md:px-20 max-w-3xl text-white">

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight"
          >
            Building Opportunities.
          </motion.h1>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white/90"
          >
            Empowering People. Transforming Businesses.
          </motion.h2>

          {/* H3 Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed"
          >
            A people-powered ecosystem creating growth, income, and business
            opportunities across Sri Lanka and beyond.
            <br /><br />
            Globus connects individuals, businesses, and opportunities into one powerful ecosystem—helping people grow, earn, and build their future.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >

            <div className="grid grid-cols-2 gap-4">
              {/* Primary Button */}
            <button
              onClick={handleContactClick}
              className="px-6 py-3 rounded-full bg-white text-black text-sm md:text-base font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Become a Partner
            </button>

            {/* Secondary Button */}
            <button
              onClick={handleExploreClick}
              className="px-6 py-3 rounded-full border border-white/40 text-white text-sm md:text-base font-medium backdrop-blur-md bg-white/10 hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Opportunities
            </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;