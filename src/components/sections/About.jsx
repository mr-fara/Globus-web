import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

//////////////////// FORMAT ////////////////////

const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M+";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K+";
  return num;
};

//////////////////// COUNTER ////////////////////

const Counter = ({ target }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const start = useRef(null);

  useEffect(() => {
    let observer;

    const animate = (time) => {
      if (!start.current) start.current = time;

      const progress = Math.min((time - start.current) / 1400, 1);

      // smoother Apple-like easing
      const ease = progress * (2 - progress);

      setValue(Math.floor(ease * target));

      if (progress < 1) requestAnimationFrame(animate);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer?.disconnect();
  }, [target]);

  return (
    <h3
      ref={ref}
      className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900"
    >
      {formatNumber(value)}
    </h3>
  );
};

//////////////////// ABOUT ////////////////////

const About = () => {

  // Subtle Apple-like parallax
  const { scrollY } = useScroll();
  const bg1 = useTransform(scrollY, [0, 600], [0, 60]);
  const bg2 = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section className="relative w-full py-12 px-4 flex justify-center bg-[#f5f5f7] overflow-hidden">

      {/* Soft layered light (Apple style depth) */}
      <motion.div
        style={{ y: bg1 }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-300/20 blur-[160px] rounded-full"
      />

      <motion.div
        style={{ y: bg2 }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-300/15 blur-[160px] rounded-full"
      />

      <div className="relative max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6 leading-tight">
            About Globus
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
            Globus helps teams run communication workflows with structure,
            transparency, and speed. Every interaction, decision, and
            collaboration flows inside a unified system.
          </p>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
            By combining automation, analytics, and coordination tools,
            businesses can scale efficiently while delivering consistent,
            high-quality experiences.
          </p>

        </motion.div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8">

          {[
            { value: 1200, label: "Members" },
            { value: 50, label: "Products" },
            { value: 100, label: "Satisfaction" },
            { value: 450000000, label: "Total Earnings" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
              className="group relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >

              {/* subtle inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

              <Counter target={item.value} />

              <p className="text-gray-500 text-sm mt-2 tracking-wide">
                {item.label}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default About;