import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, Phone, Mail, Clock, Calendar } from "lucide-react";

const BranchModal = ({ branch, onClose }) => {
  if (!branch) return null;

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10"
        >
          ✕
        </button>

        {/* MODAL */}
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 25,
          }}
          className="
            w-full 
            max-w-[340px] 
            md:max-w-[760px]

            mx-auto   /* 🔥 FIXED CENTER */

            bg-white/90 backdrop-blur-xl
            border border-white/40

            rounded-3xl
           

            mb-6 md:mb-0   /* spacing from bottom mobile */
          "
        >

          {/* DRAG HANDLE (mobile style look) */}
          <div className="flex justify-center pt-2 md:hidden">
            <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
          </div>

          <div className="p-4 md:p-10 flex flex-col gap-5 md:gap-8">

            {/* TOP SECTION */}
            <div className="flex items-start gap-4 md:gap-6">

              {/* TEXT */}
              <div className="flex-1">
                <h2 className="text-[18px] md:text-[36px] font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  {branch.name}
                </h2>

                <p className="text-gray-600 text-[12px] md:text-base mt-1 flex items-center gap-1">
                  <MapPin size={14} /> {branch.place}
                </p>

                <p className="text-gray-500 text-[11.5px] md:text-[15px] leading-relaxed mt-2 md:mt-4">
                  {branch.description}
                </p>
              </div>

              {/* IMAGE */}
              <div className="relative flex-shrink-0">
                <div className="w-[90px] md:w-[180px] aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-md md:shadow-lg border border-white/40">
                  <img
                    src={branch.ownerImg || "/image/default-user.png"}
                    alt="Owner"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* glow only desktop */}
                <div className="hidden md:block absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl"></div>
              </div>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">

              {/* BENEFITS */}
              <div className="bg-white/70 backdrop-blur border border-white/40 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm md:shadow-md">
                <h4 className="text-blue-600 font-semibold text-[12px] md:text-sm mb-2 md:mb-3">
                  Benefits
                </h4>

                <ul className="space-y-1 md:space-y-2 text-[11px] md:text-sm text-gray-700">
                  <li className="flex items-center gap-1 md:gap-2">
                    <Check size={12} className="text-green-500" />
                    Trusted Service
                  </li>
                  <li className="flex items-center gap-1 md:gap-2">
                    <Check size={12} className="text-green-500" />
                    Fast Delivery
                  </li>
                  <li className="flex items-center gap-1 md:gap-2">
                    <Check size={12} className="text-green-500" />
                    Customer Support
                  </li>
                </ul>
              </div>

              {/* LOCATION */}
              <div className="bg-white/70 backdrop-blur border border-white/40 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm md:shadow-md">
                <h4 className="text-blue-600 font-semibold text-[12px] md:text-sm mb-2 md:mb-3">
                  Location
                </h4>

                <p className="flex items-center gap-1 md:gap-2 text-gray-700 text-[11px] md:text-sm">
                  <MapPin size={14} /> {branch.place}
                </p>
              </div>

              {/* CONTACT */}
              <div className="bg-white/70 backdrop-blur border border-white/40 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm md:shadow-md">
                <h4 className="text-blue-600 font-semibold text-[12px] md:text-sm mb-2 md:mb-3">
                  Contact
                </h4>

                <div className="space-y-1 md:space-y-2 text-gray-700 text-[11px] md:text-sm">
                  <p className="flex items-center gap-1 md:gap-2">
                    <Phone size={14} /> {branch.mobile}
                  </p>
                  <p className="flex items-center gap-1 md:gap-2">
                    <Mail size={14} /> {branch.email}
                  </p>
                </div>
              </div>

              {/* HOURS */}
              <div className="bg-white/70 backdrop-blur border border-white/40 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm md:shadow-md">
                <h4 className="text-blue-600 font-semibold text-[12px] md:text-sm mb-2 md:mb-3">
                  Open Hours
                </h4>

                <div className="text-gray-700 text-[11px] md:text-sm space-y-1">
                  <p className="flex items-center gap-1 md:gap-2">
                    <Calendar size={14} /> Mon - Sun
                  </p>
                  <p className="flex items-center gap-1 md:gap-2">
                    <Clock size={14} /> 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BranchModal;