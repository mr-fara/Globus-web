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
    Desc: "Globus is a comprehensive platform designed to streamline communication and collaboration for teams. It offers a suite of tools that facilitate structured workflows, automate routine tasks, and provide insights through analytics. With Globus, teams can coordinate their efforts more effectively, ensuring that projects are completed efficiently and on time. The platform's user-friendly interface and robust features make it an essential tool for any team looking to enhance their productivity and communication."
  },
  {
    icon: HelpCircle,
    title: "What is Globus",
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
    Desc: "Globus is a cutting-edge communication and collaboration platform designed to help teams work more efficiently. It provides a structured operating surface where teams can plan, execute, and track their communication workflows with transparency and speed. With features like automation, analytics, and team coordination tools, Globus enables teams to streamline their processes and achieve better results in less time."
  },
  {
    icon: Wallet,
    title: "Earning Methods",
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
    Desc: "Globus offers various earning methods for users, including referral programs, subscription plans, and premium features. Users can earn rewards by referring new members to the platform, subscribing to advanced features, or participating in special promotions. The platform is designed to incentivize engagement and provide value to its users while fostering a collaborative community."
  },
  {
    icon: UserPlus,
    title: "How to Join With Us",
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
    Desc: "Joining Globus is easy and straightforward. Simply visit our website and click on the 'Sign Up' button. You can create an account using your email address or sign up with your Google or Facebook account for added convenience. Once you've registered, you can start exploring the platform's features and connect with other users to enhance your communication and collaboration experience."
  },
  {
    icon: Target,
    title: "Vision and Mission",
    text: "Leadership, local expertise, and trusted operational guidance for growing teams across Sri Lanka.",
    Desc: "Globus's vision is to revolutionize the way teams communicate and collaborate by providing a seamless, efficient, and transparent platform. Our mission is to empower teams with the tools they need to streamline their workflows, enhance productivity, and achieve their goals with confidence. We are committed to fostering a collaborative environment where businesses can scale confidently while maintaining a smooth and consistent customer experience."
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