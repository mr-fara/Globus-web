import { useEffect } from "react";
import {
  Factory,
  Truck,
  ShoppingCart,
  MonitorSmartphone,
  UsersRound,
  BriefcaseBusiness,
} from "lucide-react";

const methods = [
  {
    title: "Manufacturing",
    desc: "Produce quality products for the ecosystem",
    icon: Factory,
  },
  {
    title: "Distribution",
    desc: "Move products efficiently across regions",
    icon: Truck,
  },
  {
    title: "Sales",
    desc: "Deliver products and create customer value",
    icon: ShoppingCart,
  },
  {
    title: "E-Services",
    desc: "Provide digital and online services",
    icon: MonitorSmartphone,
  },
  {
    title: "Collaboration",
    desc: "Work together and grow collectively",
    icon: UsersRound,
  },
  {
    title: "Entrepreneur",
    desc: "Build, lead, and scale your own business",
    icon: BriefcaseBusiness,
  },
];

export default function EarningsGrid() {

  /* 🌌 PARALLAX SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll",
        window.scrollY
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-14 px-3 sm:px-4 bg-gradient-to-b from-gray-50 to-white">

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

      {/* MAIN CONTAINER */}
      <div className="relative max-w-6xl mx-auto rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-4 py-8 sm:px-6 md:px-10 md:py-10">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-[26px] sm:text-[34px] md:text-[46px] font-semibold text-gray-900 tracking-tight">
            Earning Opportunities
          </h2>

          <p className="mt-3 text-[13px] sm:text-[15px] md:text-[17px] leading-relaxed text-gray-600">
            Within the Globus ecosystem, individuals can participate in multiple
            business activities and build sustainable income streams.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-8 md:mt-10 grid grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {methods.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white/80 backdrop-blur-md
                  rounded-[20px]
                  border border-gray-100
                  shadow-[0_6px_20px_rgba(0,0,0,0.06)]
                  px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-7
                  flex flex-col items-center text-center
                  transition-all duration-300
                  hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]
                "
              >
                {/* ICON */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <Icon
                    size={window.innerWidth < 640 ? 20 : 26}
                    className="text-gray-800"
                    strokeWidth={2}
                  />
                </div>

                {/* TITLE */}
                <h3 className="mt-4 text-[12px] sm:text-[17px] md:text-[19px] font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="mt-2 text-[10px] sm:text-[14px] md:text-[15px] text-gray-500 leading-snug max-w-[220px]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}