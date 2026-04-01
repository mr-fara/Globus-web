import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  MapPin,
} from "lucide-react";

const BranchModal = ({ branch, onClose }) => {
  if (!branch) return null;

  const ListItem = ({ text }) => (
    <li className="flex items-start gap-2 md:gap-3">
      <img
        src="/image/tick.png"
        alt="icon"
        className="w-[10px] h-[10px] md:w-[14px] md:h-[14px] mt-[4px] opacity-80"
      />
      <span className="text-[11px] md:text-[14px] text-gray-600 leading-relaxed">
        {text}
      </span>
    </li>
  );

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center px-3 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm"
        >
          ✕
        </button>

        {/* MODAL */}
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="
            w-full 
            max-w-[380px] 
            md:max-w-[650px]
            md:max-h-[750px]

            rounded-[28px]

            bg-white/80 backdrop-blur-xl
            border border-white/40

            shadow-[0_20px_60px_rgba(0,0,0,0.12)]

            overflow-hidden
          "
        >
          <div className="p-5 md:p-10">

            {/* TOP */}
            <div className="flex flex-row gap-4 md:gap-8">

              {/* TEXT */}
              <div className="flex-1">
                <h2 className="text-[20px] md:text-[32px] font-semibold text-gray-900 leading-tight">
                  {branch.name}
                </h2>

                <p className="text-[12px] md:text-[15px] text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin size={14} />
                  {branch.subtitle} – {branch.place}
                </p>

                <div className="mt-3 md:mt-5">
                  <p className="text-[15px] md:text-[20px] font-semibold text-gray-900">
                    {branch.owner}
                  </p>

                  <p className="text-[12px] md:text-[15px] text-gray-600 mt-2 leading-relaxed">
                    {branch.description}
                  </p>
                </div>
              </div>

              {/* IMAGE */}
              <div className="relative flex-shrink-0">
                <div className="w-[120px] md:w-[160px] aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-gray-200">
                  <img
                    src={branch.ownerImg}
                    alt="owner"
                    className="w-full h-full object-cover"
                  />
                </div>

                <img
                  src="/image/verified badge.png"
                  alt="Verified"
                  className="absolute bottom-[-22px] right-0 w-[50px] md:w-[85px] opacity-90"
                />
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-8 md:mt-10">

              {/* CARD STYLE */}
              {[
                {
                  title: "Why Choose This",
                  content: branch.whyChoose,
                },
                {
                  title: "Services Available",
                  content: branch.services,
                },
              ].map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 backdrop-blur rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-100 shadow-sm"
                >
                  <h4 className="font-medium text-[13px] md:text-[16px] mb-2 md:mb-3 text-gray-900">
                    {section.title}
                  </h4>

                  <ul className="space-y-1.5">
                    {section.content.map((item, i) => (
                      <ListItem key={i} text={item} />
                    ))}
                  </ul>
                </div>
              ))}

              {/* TIMING */}
              <div className="bg-white/70 backdrop-blur rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-100 shadow-sm">
                <h4 className="font-medium text-[13px] md:text-[16px] mb-2 md:mb-3 text-gray-900">
                  Branch Timing
                </h4>

                <p className="flex items-center gap-2 text-[11px] md:text-[14px] text-gray-600">
                  <Calendar size={14} />
                  {branch.timing.days}
                </p>

                <p className="flex items-center gap-2 text-[11px] md:text-[14px] text-gray-600 mt-1">
                  <Clock size={14} />
                  {branch.timing.hours}
                </p>
              </div>

              {/* HIGHLIGHTS */}
              <div className="bg-white/70 backdrop-blur rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-100 shadow-sm">
                <h4 className="font-medium text-[13px] md:text-[16px] mb-2 md:mb-3 text-gray-900">
                  Branch Highlights
                </h4>

                <ul className="space-y-1.5">
                  {branch.highlights.map((item, i) => (
                    <ListItem key={i} text={item} />
                  ))}
                </ul>
              </div>
            </div>

            {/* FOOTER */}
            <div className="text-center mt-6 md:mt-10">
              <h3 className="text-[14px] md:text-[18px] font-medium text-gray-900">
                Visit for Professional Grooming & Care
              </h3>

              <p className="text-[11px] md:text-[14px] text-gray-500 mt-1">
                Serving the community with style, care, and trust.
              </p>

              <p className="text-[11px] md:text-[14px] mt-3 font-medium text-gray-700">
                Online Booking Experience – Launching Soon
              </p>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BranchModal;