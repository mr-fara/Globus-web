import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const phoneNumber = "94725535524";

    const message = `Hello, I want to order this product:

Name: ${product.title}
Price: LKR ${product.price}

Please provide more details.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 bg-white/80 backdrop-blur rounded-full shadow-sm flex items-center justify-center"
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
            md:max-w-[700px]

            rounded-[28px]

            bg-white/80 backdrop-blur-xl
            border border-white/40

            shadow-[0_20px_60px_rgba(0,0,0,0.12)]

            p-6 md:p-8
          "
        >
          <div className="flex flex-col gap-6">

            {/* TOP */}
            <div className="flex gap-5 items-start">

              {/* TEXT */}
              <div className="flex-1">
                <h2 className="text-gray-900 text-lg md:text-2xl font-semibold">
                  Product Details
                </h2>

                <p className="text-gray-600 text-sm md:text-base mt-3 leading-relaxed">
                  {product.title}
                </p>
              </div>

              {/* IMAGE */}
              <div className="w-24 md:w-36 aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={product.ownerImg || "/image/owner1.jpeg"}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* BENEFITS */}
            {product.benefits && (
              <div>
                <h4 className="text-gray-900 font-medium mb-2 text-sm md:text-base">
                  Benefits
                </h4>

                <ul className="text-sm text-gray-600 space-y-1.5">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-[2px]">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* PRICE */}
            <div className="text-base md:text-lg font-semibold text-gray-900">
              LKR {product.price}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleWhatsAppOrder}
              className="
                w-full py-3 rounded-full 
                bg-black text-white 
                font-medium

                hover:bg-gray-900
                active:scale-[0.98]

                transition-all duration-200
              "
            >
              Order via WhatsApp
            </button>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;