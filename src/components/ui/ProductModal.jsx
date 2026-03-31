import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  // ✅ WHATSAPP FUNCTION
  const handleWhatsAppOrder = () => {
    const phoneNumber = "94725535524"; // your number (fixed format)

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

        {/* MODAL */}
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

              <div className="flex-1">
                <h2 className="text-blue-600 text-xl md:text-3xl font-bold">
                  Product Details
                </h2>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {product.title}
                </p>
              </div>

              <div className="w-24 md:w-36 aspect-[3/4] rounded-xl overflow-hidden shadow">
                <img
                  src={product.ownerImg || "/image/owner1.jpeg"}
                  alt="owner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* BENEFITS */}
            {product.benefits && (
              <div>
                <h4 className="text-blue-600 font-semibold mb-2">
                  Benefits
                </h4>

                <ul className="text-sm text-gray-700 space-y-1">
                  {product.benefits.map((b, i) => (
                    <li key={i}>✔ {b}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* PRICE */}
            <div className="text-lg font-semibold text-blue-600">
              Price: LKR {product.price}
            </div>

            {/* ORDER BUTTON */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-semibold hover:scale-105 transition"
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