import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center"
        >
          ✕
        </button>

        {/* MODAL CARD */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="bg-white w-full max-w-[380px] md:max-w-[700px] rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex flex-col gap-6">

            {/* TOP */}
            <div className="flex gap-5 items-start">

              {/* LEFT TEXT */}
              <div className="flex-1">
                <h2 className="text-blue-600 text-xl md:text-3xl font-bold">
                  Product Name
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  (Product from where??)
                </p>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {product.title}
                </p>
              </div>

              {/* RIGHT IMAGE */}
              <div className="w-24 md:w-36 aspect-[3/4] rounded-xl overflow-hidden shadow">
                <img
                  src={product.ownerImg || "/image/owner1.jpeg"}
                  alt="owner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* BOTTOM GRID */}
            <div className="grid grid-cols-2 gap-6">

              {/* BENEFITS */}
              <div>
                <h4 className="text-blue-600 font-semibold mb-2 text-sm md:text-base">
                  Benefits
                </h4>

                <ul className="text-xs md:text-sm text-gray-700 space-y-1">
                  {(product.benefits || []).map((b, i) => (
                    <li key={i}>✔ {b}</li>
                  ))}
                </ul>
              </div>

              {/* STATS */}
              <div className="flex flex-col justify-center items-center text-center">
                <h3 className="text-3xl md:text-5xl font-bold text-blue-600">
                  50
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Total Sold Products
                </p>

                <h3 className="text-3xl md:text-5xl font-bold text-blue-600">
                  24k
                </h3>
                <p className="text-xs text-gray-500">
                  Total Earnings
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold">
              Order Now
            </button>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;