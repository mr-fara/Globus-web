import React, { useEffect, useRef, useState } from "react";
import FadeIn from '../animations/FadeIn';



//////////////////// COUNTER ////////////////////

const Counter = ({ target, suffix = "", duration = 5000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startTime = useRef(null);

  useEffect(() => {
    let observer;

    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;

      const progress = timestamp - startTime.current;
      const percent = Math.min(progress / duration, 1);

      setCount(Math.floor(percent * target));

      if (percent < 1) {
        requestAnimationFrame(animate);
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
    <h3
      ref={ref}
      className="
        text-3xl
        sm:text-4xl
        md:text-5xl
        font-bold
        text-blue-600
      "
    >
      {count}
      {suffix}
    </h3>
  );
};

//////////////////// ABOUT ////////////////////

const About = () => {
  return (
    <section
      id="about"
      className="
        w-full
        h-130
        bg-gray-100
        py-14
        sm:py-16
        md:py-20
        px-4
        sm:px-6
        flex
        justify-center
      "
    >
      <div
        className="
          max-w-7xl
          w-full
          grid
          grid-cols-1
          md:grid-cols-2
          gap-10
          items-center
        "
      >
        {/* LEFT SIDE */}

        <div className="text-center md:text-left">
              <FadeIn delay={0}>
          <h2
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-bold
              mb-4
            "
          >
            About Globus<span className="text-blue-600"></span>
          </h2>
            </FadeIn>
            <FadeIn delay={100}>
          <p
            className="
              text-gray-700
              mb-4
              leading-relaxed
              text-sm
              sm:text-base
            "
          >
            Globus helps teams run communication workflows with structure,
            transparency, and speed. From outreach planning to daily execution,
            every step is visible in one clean operating surface.
          </p>
          <p
            className="
              text-gray-700
              leading-relaxed
              text-sm
              sm:text-base
            "
          >
            We combine automation, analytics, and team coordination tools so
            businesses can scale confidently while keeping customer experience
            smooth and consistent.
          </p>
            </FadeIn>
        </div>

        {/* RIGHT SIDE STATS */}
        
        <div
          className="
            grid
            grid-cols-2
            gap-y-20
            gap-x-6
            sm:gap-x-10
            text-center
          "
        >
            
          <div>
            <Counter target={1200} suffix="+" />
            <p className="text-gray-700 font-bold mt-1 text-sm sm:text-base">
              Members
            </p>
          </div>

          <div>
            <Counter target={50} suffix="+" />
            <p className="text-gray-700 font-bold mt-1 text-sm sm:text-base">
              Products
            </p>
          </div>

          <div>
            <Counter target={100} suffix="%" />
            <p className="text-gray-700 font-bold mt-1 text-sm sm:text-base">
              Satisfaction
            </p>
          </div>

          <div>
            <Counter target={450} suffix="M+" />
            <p className="text-gray-700 font-bold mt-1 text-sm sm:text-base">
              Total Earnings
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;