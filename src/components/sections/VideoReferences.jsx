import React from "react";
import FadeIn from '../animations/FadeIn';


export default function VideoReferences() {
  return (
    <section className="py-20 px-4 flex justify-center bg-gray-50">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT COLUMN */}
        <FadeIn delay={0}>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Video References
          </h2>

          <p className="text-gray-600 max-w-md sm:text-justify">
            Watch our introduction and explanation videos about Globus in
            different languages. Choose your preferred language to understand
            the concept clearly and learn how the platform works.
          </p>
        </div>
        </FadeIn>
        {/* RIGHT COLUMN */}
        <FadeIn delay={100}>
        <div className="grid grid-cols-3 gap-4">

          <button className="py-4 rounded-xl text-white font-semibold
          bg-gradient-to-r from-blue-500 to-cyan-400 text-white
          hover:scale-105 transition shadow-md">
            Tamil
          </button>

          <button className="py-4 rounded-xl text-white font-semibold
          bg-gradient-to-r from-blue-500 to-cyan-400 text-white
          hover:scale-105 transition shadow-md">
            English
          </button>

          <button className="py-4 rounded-xl text-white font-semibold
          bg-gradient-to-r from-blue-500 to-cyan-400 text-white
          hover:scale-105 transition shadow-md">
            Sinhala
          </button>

        </div>
        </FadeIn>
      </div>
    </section>
  );
}