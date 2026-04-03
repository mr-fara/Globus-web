import React, { useState } from "react";
import FadeIn from "../animations/FadeIn";
import {
  Briefcase,
  HelpCircle,
  Wallet,
  UserPlus,
  Target,
  ChevronDown,
} from "lucide-react";

//////////////////// DATA ////////////////////

const items = [
  {
    icon: Briefcase,
    title: "How globus work",
    text: "Globus brings different participants of the business world into one connected network.",
    Desc: (
      <>
        Manufacturers produce products.<br />
        Partners distribute them.<br />
        Entrepreneurs expand the network.<br /><br />
        This structure creates a simple and organized flow of business activity.
      </>
    ),
  },
  {
    icon: HelpCircle,
    title: "Global Expansion",
    text: "Globus aims to expand its ecosystem across different regions and connect partners internationally.",
    Desc: "This creates a global network for business growth and opportunity.",
  },
  {
    icon: Wallet,
    title: "Earning Methods",
    text: "Within the Globus ecosystem, individuals can participate in various business activities such as:",
    Desc: (
      <>
        Manufacturing.<br />
        Distribution.<br />
        Sales.<br />
        Network development.<br />
        Business collaboration
      </>
    ),
  },
  {
    icon: UserPlus,
    title: "How to Join With Us",
    text: "Be part of a growing network that connects innovators, partners, and entrepreneurs.",
    Desc: (
      <>
        1. Contact Our Team<br />
        Reach out to us and express your interest in joining our ecosystem.<br /><br />
        2. Book Your Interview<br />
        Our team will schedule a quick discussion to understand your goals and how you fit in.<br /><br />
        3. Unlock Your Opportunity<br />
        Once approved, we’ll connect you with the right opportunities to grow and succeed.
      </>
    ),
  },
  {
    icon: Target,
    title: "Vision and Mission",
    text: "Our Vision: To build a global ecosystem that connects talent, production, and business opportunities.",
    Desc: "Our Mission: To support entrepreneurship and create sustainable business opportunities.",
  },
];

//////////////////// ACCORDION ////////////////////

function AccordionItem({ item, open, setOpen, index }) {
  const Icon = item.icon;

  return (
    <div className="border-b border-white/20 last:border-none">
      <button
        onClick={() => setOpen(open === index ? null : index)}
        className="flex justify-between w-full py-4 text-left group relative transition"
      >
        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-xl pointer-events-none"></div>

        <div className="flex gap-4 relative z-10">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/80 text-white backdrop-blur-md shadow-md group-hover:scale-105 transition">
            <Icon size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">{item.text}</p>
          </div>
        </div>

        <ChevronDown
          className={`transition duration-300 ${
            open === index ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Smooth Accordion */}
      <div
        className={`grid transition-all duration-400 ease-in-out ${
          open === index
            ? "grid-rows-[1fr] opacity-100 mt-2"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 pl-14 text-sm text-gray-600 leading-relaxed">
            {item.Desc}
          </div>
        </div>
      </div>
    </div>
  );
}

//////////////////// MAIN ////////////////////

export default function Intro() {
  const [open, setOpen] = useState(null);

  return (
    <section className="relative bg-[#f5f5f7] py-10 px-4 flex justify-center overflow-x-hidden">

      {/* SAFE RESPONSIVE GRADIENT */}
      <div className="pointer-events-none absolute top-[-150px] left-1/2 -translate-x-1/2 w-[120vw] max-w-[600px] h-[500px] bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 opacity-30 blur-[100px]"></div>

      <div className="w-full max-w-6xl space-y-6">

        {/* PROFILE CARD */}
        <FadeIn>
          <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl shadow-lg p-5 md:p-6">

            <h2 className="text-xl font-bold text-gray-900">
              SIA SAHI
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Managing Director – Globus Sri Lanka
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
              SIA SAHI is not just a business leader, but a visionary building a
              people-powered business ecosystem across Sri Lanka and beyond —
              creating opportunities for thousands to grow.
            </p>

            {/* ROLES */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

              <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/30">
                <h4 className="font-semibold text-gray-900">
                  Managing Director - Globus Sri Lanka
                </h4>
                <p className="text-gray-600 mt-1 text-xs">
                  Leading scalable business growth & expansion across multiple sectors.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/30">
                <h4 className="font-semibold text-gray-900">
                  Financial Advisor (Wealth & Growth Strategies)
                </h4>
                <p className="text-gray-600 mt-1 text-xs">
                  Guiding individuals towards financial independence and smart investments.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/30">
                <h4 className="font-semibold text-gray-900">
                  Sales & Business Trainer (People Development Focus)
                </h4>
                <p className="text-gray-600 mt-1 text-xs">
                  Empowering individuals to build skills, income, and leadership.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/30">
                <h4 className="font-semibold text-gray-900">
                  Cashflow Game Trainer (Financial Education)
                </h4>
                <p className="text-gray-600 mt-1 text-xs">
                  Teaching real-world money management and financial intelligence.
                </p>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* HERO */}
        <FadeIn delay={100}>
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/image/direcor.jpg"
              alt="director"
              className="w-full h-[240px] md:h-[420px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent flex flex-col justify-center p-6">
              <div className="gird grid-cols-2">
                <h2 className="text-white text-2xl md:text-4xl font-bold">
                Join the Globus
              </h2>
              <p className="text-gray-200 mt-2 text-sm md:text-base">
                Build your future with us. Grow together and we will support you as an enterpreneur.
              </p>

              <button className="mt-4 w-fit px-5 py-2 rounded-full text-sm font-medium text-black bg-white">
                Become a Partner
              </button>
              </div>
              <div>

              </div>
            </div>
          </div>
        </FadeIn>

        {/* ACCORDION */}
        <FadeIn delay={200}>
          <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl shadow-lg p-4 md:p-6">
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                open={open}
                setOpen={setOpen}
                index={index}
              />
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}