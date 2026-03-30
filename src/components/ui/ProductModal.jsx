import React from "react";
import { ExternalLink } from "lucide-react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-[95%] md:w-[800px] max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto relative p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          ×
        </button>

        {/* Modal Content */}
        <div className="md:flex gap-6">
          {/* Left: Product Image */}
          <div className="md:w-1/2">
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/2 flex flex-col justify-between mt-4 md:mt-0">
            <div>
              <h2 className="text-2xl font-bold mb-2">{product.title}</h2>

              {product.benefits && (
                <>
                  <h3 className="font-semibold mt-4 mb-2">Benefits:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {product.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </>
              )}

              <p className="mt-4 text-blue-600 font-bold text-xl">
                LKR {product.price}
              </p>
            </div>

            <button className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;