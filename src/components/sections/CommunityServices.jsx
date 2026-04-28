import React, { useState, useRef, useEffect } from "react";
import FadeIn from "../animations/FadeIn";

const services = [
  {
    id: 1,
    title: "Community Outreach",
    description:
      "We connect with local communities through meaningful service programs, awareness drives, and support initiatives that create real impact.",
    image: "/image/product1.jpeg",
    tag: "Outreach",
  },
  {
    id: 2,
    title: "Educational Support",
    description:
      "From learning assistance to skill-building sessions, we help people grow with access to knowledge, tools, and guidance.",
    image: "/image/product2.jpeg",
    tag: "Education",
  },
  {
    id: 3,
    title: "Volunteer Programs",
    description:
      "We bring together dedicated volunteers who contribute time, care, and energy to strengthen the community around them.",
    image: "/image/product3.jpeg",
    tag: "Volunteers",
  },
  {
    id: 4,
    title: "Health & Wellness",
    description:
      "Our wellness activities promote healthy living through awareness campaigns, support drives, and social care initiatives.",
    image: "/image/product4.jpeg",
    tag: "Wellness",
  },
  {
    id: 5,
    title: "Local Partnerships",
    description:
      "We collaborate with organizations and groups to extend support, share resources, and build long-term positive change.",
    image: "/image/product5.jpeg",
    tag: "Partnerships",
  },
  {
    id: 6,
    title: "Social Impact",
    description:
      "Every project we deliver is focused on making life better for people, families, and the wider community.",
    image: "/image/product6.jpeg",
    tag: "Impact",
  },
];

export default function ShowcasePage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
    setHoveredCard(index);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased selection:bg-[#0071e3]/10 selection:text-[#0071e3]">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.07] sm:h-[900px] sm:w-[900px]"
            style={{
              background: "radial-gradient(circle, #0071e3 0%, transparent 70%)",
              transform: `translate(-50%, ${scrollY * -0.15}px)`,
            }}
          />
          <div
            className="absolute -right-48 top-1/3 h-[400px] w-[400px] rounded-full opacity-[0.04] sm:h-[600px] sm:w-[600px]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          />
        </div>

        <div className="mx-auto max-w-[980px] px-4 pb-8 pt-24 sm:px-8 md:pb-12 md:pt-44 lg:px-4">
          <FadeIn>
            <div className="text-center">

              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#1d1d1f]/[0.08] px-4 py-2 sm:mb-10 sm:gap-2.5 sm:px-5">
                <span className="relative flex h-[5px] w-[5px] sm:h-[6px] sm:w-[6px]">
                  <span className="absolute h-full w-full animate-[ping_2s_ease-in-out_infinite] rounded-full bg-[#34c759] opacity-60" />
                  <span className="relative h-[5px] w-[5px] rounded-full bg-[#3aa0ff] sm:h-[6px] sm:w-[6px]" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1d1d1f]/50 sm:text-[11px] sm:tracking-[0.22em]">
                  Community Services
                </span>
              </div>

              <h1 className="text-[clamp(2.2rem,8vw,6.5rem)] font-bold leading-[1] tracking-[-0.045em] sm:leading-[0.98]">
                More than a community.
              </h1>
              <h2
                className="mt-1 text-[clamp(2.2rem,8vw,6.5rem)] font-bold leading-[1] tracking-[-0.045em] sm:mt-2 sm:leading-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #1d1d1f 0%, #86868b 50%, #d2d2d7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                A place for real support.
              </h2>

              <p className="mx-auto mt-7 max-w-[520px] px-2 text-[15px] leading-[1.65] text-[#86868b] sm:mt-10 sm:px-0 sm:text-[17px] sm:leading-[1.7]">
                We are not a business community. We are a service-driven team committed to helping
                people, supporting organizations, and creating meaningful social impact through care,
                action, and collaboration.
              </p>

              <div className="mt-4 flex justify-center sm:mt-10">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#86868b] sm:text-[10px]">
                    Scroll
                  </span>
                  <div className="h-10 w-[1px] bg-gradient-to-b from-[#86868b]/40 to-transparent sm:h-12">
                    <div className="h-4 w-[1px] animate-[slideDown_2s_ease-in-out_infinite] bg-[#1d1d1f]/60" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mx-auto max-w-[980px] px-4 sm:px-8 lg:px-4">
          <div className="h-[0.5px] bg-[#d2d2d7]/60" />
        </div>
      </section>


      <div className="mx-auto max-w-[980px] px-4 sm:px-8 lg:px-4">
        <div className="h-[0.5px] bg-[#d2d2d7]/60" />
      </div>

      {/* ── SERVICES GRID ── */}
      <section className="mx-auto max-w-[1120px] px-4 py-16 sm:px-8 sm:py-24 md:py-32 lg:px-4">
        <FadeIn>
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#86868b] sm:text-[11px]">
              Services showcase
            </p>
            <h2 className="mt-4 text-[clamp(1.6rem,5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.04em] sm:mt-5">
              A modern view of our
              <br />
              community work.
            </h2>
            <p className="mx-auto mt-5 max-w-[440px] px-2 text-[14px] leading-[1.7] text-[#86868b] sm:mt-6 sm:px-0 sm:text-[15px] sm:leading-[1.75]">
              Replace the image paths with your real community activities to showcase your actual
              impact and engagement.
            </p>
          </div>
        </FadeIn>

        {/* 2-col mobile, 2-col tablet, 3-col desktop */}
        <div className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-14 sm:gap-4 md:mt-16 md:gap-5 xl:grid-cols-3">
          {services.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.08}>
              <div
                className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-700 hover:-translate-y-1 sm:rounded-[24px] md:rounded-[28px] md:hover:-translate-y-1.5"
                style={{
                  boxShadow:
                    hoveredCard === index
                      ? "0 0 0 0.5px rgba(0,0,0,0.08), 0 40px 80px -20px rgba(0,0,0,0.16)"
                      : "0 0 0 0.5px rgba(0,0,0,0.06), 0 12px 40px -10px rgba(0,0,0,0.07)",
                  transition: "all 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {hoveredCard === index && (
                  <div
                    className="pointer-events-none absolute inset-0 z-20 hidden opacity-100 transition-opacity duration-500 md:block"
                    style={{
                      background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.12), transparent 60%)`,
                    }}
                  />
                )}

                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[3/4]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/[0.02] transition-all duration-700 group-hover:from-black/75 group-hover:via-black/25" />

                  <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')" }} />

                  {/* Tag */}
                  <div className="absolute left-2.5 top-2.5 z-10 sm:left-4 sm:top-4 md:left-5 md:top-5">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/80 ring-[0.5px] ring-white/[0.15] backdrop-blur-2xl transition-all duration-500 group-hover:bg-white/15 group-hover:text-white/95 sm:px-3 sm:py-1.5 sm:text-[9px] sm:tracking-[0.2em] md:text-[10px]">
                      {item.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-5 md:p-6 lg:p-7">
                    <h3 className="text-[14px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[18px] sm:tracking-[-0.02em] md:text-[22px] lg:text-[24px]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.5] text-white/60 transition-all duration-500 group-hover:text-white/80 sm:mt-2.5 sm:line-clamp-3 sm:text-[12px] sm:leading-[1.6] md:mt-3 md:text-[13px] md:leading-[1.65]">
                      {item.description}
                    </p>

                    {/* Hover arrow — hidden on small mobile */}
                    <div className="mt-3 hidden overflow-hidden sm:block md:mt-5">
                      <div className="flex items-center gap-2 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="h-[0.5px] w-5 bg-white/40 transition-all duration-700 group-hover:w-8 md:w-6 md:group-hover:w-10" />
                        <svg className="h-2.5 w-2.5 text-white/60 md:h-3 md:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="mx-auto max-w-[980px] px-4 pb-20 pt-4 sm:px-8 sm:pb-32 sm:pt-8 lg:px-4">
        <FadeIn>
          <div className="relative overflow-hidden rounded-[24px] bg-[#1d1d1f] p-8 text-center sm:rounded-[32px] sm:p-14 md:rounded-[36px] md:p-20">

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.4] blur-[60px] sm:h-[400px] sm:w-[400px] sm:blur-[80px]" />
              <div className="absolute bottom-0 right-0 h-[200px] w-[200px] translate-x-1/3 translate-y-1/3 rounded-full bg-white/[0.2] blur-[60px] sm:h-[300px] sm:w-[300px] sm:blur-[80px]" />
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 sm:text-[11px]">
                Our mission
              </p>

              <h2 className="mt-5 text-[clamp(1.6rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.04em] text-white sm:mt-6">
                Clean. Caring.
                <br />
                <span className="text-white/40">Community-led.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-[460px] px-2 text-[14px] leading-[1.7] text-white/40 sm:mt-7 sm:px-0 sm:text-[15px] sm:leading-[1.75]">
                This page presents your social service work in a modern and premium way, designed to
                highlight real impact through visuals and storytelling.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-2.5 sm:mt-12 sm:flex-row sm:gap-3">
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-semibold text-[#1d1d1f] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(255,255,255,0.15)] active:scale-[0.98] sm:px-8 sm:py-4 sm:text-[14px]"
                >
                  Explore Services
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#"
                  id="contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.12] px-6 py-3.5 text-[13px] font-semibold text-white/70 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:text-white active:scale-[0.98] sm:px-8 sm:py-4 sm:text-[14px]"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <style>{`
        @keyframes slideDown {
          0%, 100% { transform: translateY(0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(32px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}