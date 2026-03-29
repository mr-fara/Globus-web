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
  text: "Globus brings different participants of the business world into one connected network.",
  Desc: (
    <>
      Manufacturers produce products.<br />
      Partners distribute them.<br />
      Entrepreneurs expand the network.<br /><br />
      This structure creates a simple and organized flow of business activity.
    </>
  )
},
  {
    icon: HelpCircle,
    title: "Global Expansion",
    text: "Globus aims to expand its ecosystem across different regions and connect partners internationally.",
    Desc: "This creates a global network for business growth and opportunity."
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
  )
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
  )
},
  {
    icon: Target,
    title: "Vision and Mission",
    text: "Our Vision: To build a global ecosystem that connects talent, production, and business opportunities.",
    Desc: "Our Mission: To support entrepreneurship and create sustainable business opportunities."
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
          {item.Desc}
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
            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
                Globus Sri Lanka
            </h2>

            <h3 className="text-1xl md:text-2xl font-bold text-gray-900 mb-4">
                Mr. Sahi (Managing Director – Globus Sri Lanka)
            </h3>

            <p className="text-gray-600 max-w-md mb-6">
              Mr. Sahi is a dynamic business leader and mentor, serving as the Managing Director of Globus Sri Lanka. 
              With strong expertise in financial education, business development, and sales training, he plays a key role 
              in building and expanding the Globus ecosystem.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
               Professional Roles
              </h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Managing Director – Globus Sri Lanka</li>
                <li>• Financial Advisor</li>
                <li>• Sales & Business Trainer</li>
                <li>• Cashflow Game Trainer</li>
              </ul>
            </div>

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