import React, { useState } from "react";
import FadeIn from '../animations/FadeIn';
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
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
  },
  {
    icon: HelpCircle,
    title: "What is Globus",
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
  },
  {
    icon: Wallet,
    title: "Earning Methods",
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
  },
  {
    icon: UserPlus,
    title: "How to Join With Us",
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
  },
  {
    icon: Target,
    title: "Vision and Mission",
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
  },
];

//////////////////// ACCORDION ITEM ////////////////////

function AccordionItem({ item, open, setOpen, index }) {
  const Icon = item.icon;

  return (
    <div className="border-b border-gray-200 sm:py-6">

        {/* Background Glow */}
      <button
        onClick={() => setOpen(open === index ? null : index)}
        className="flex items-start justify-between w-full text-left gap-4 group"
      >
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
            <Icon size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1 max-w-lg">
              {item.text}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`transition-transform duration-300 ${
            open === index ? "rotate-180" : ""
          }`}
        />
      </button>

      {open === index && (
        <div className="mt-4 text-sm text-gray-600 pl-14 leading-relaxed">
          This section can contain more detailed explanation about "{item.title}".
          It expands smoothly to maintain a clean and modern interface for
          users exploring Globus information.
        </div>
      )}
    </div>
  );
}

//////////////////// MAIN COMPONENT ////////////////////

export default function Intro() {
  const [open, setOpen] = useState(null);

  return (
    <section id="intro" className=" py-20 px-4 flex justify-center">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <FadeIn delay={0}>
            <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Director of Globus Sri Lanka
            </h2>

            <p className="text-gray-600 max-w-md mb-8">
                Leadership, local expertise, and trusted operational guidance for
                growing teams across Sri Lanka.
            </p>

            {/* DIRECTOR IMAGE */}
            <FadeIn delay={100}>
            <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                src="/image/direcor.jpg"
                alt="Director of Globus Sri Lanka"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
            </div>
            </FadeIn>
            </div>
        </FadeIn>

        {/* RIGHT SIDE */}

        <FadeIn delay={200}>
        <div className="bg-white rounded-2xl shadow-sm p-6">
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
