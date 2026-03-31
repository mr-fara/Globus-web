import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import ProductModal from "../ui/ProductModal";
import { products } from "../../data/products";
import FadeIn from "../animations/FadeIn";

//////////////////// PRICE COUNTER ////////////////////

const PriceCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const start = useRef(null);
  const duration = 1400;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const animate = (time) => {
            if (!start.current) start.current = time;

            const progress = time - start.current;
            const percent = Math.min(progress / duration, 1);

            setCount((percent * value).toFixed(2));

            if (percent < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      LKR {count}
    </span>
  );
};


//////////////////// FEATURED PRODUCT CARD ////////////////////

const FeaturedCard = ({ product, onSelectProduct }) => {
  return (
    <div className="group grid md:grid-cols-2 gap-6 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.img}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-4">
            {product.title}
          </h3>

          <p className="text-sm font-semibold text-gray-900 mb-2">Benefits</p>

          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
            {product.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mt-6">
          <p className="text-blue-600 font-semibold text-lg">
            <PriceCounter value={product.price} />
          </p>

          <button className="flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-gray-100 transition">
            <ExternalLink size={18} onClick={() => onSelectProduct(product)} />
          </button>
        </div>
      </div>
    </div>
  );
};

//////////////////// SMALL PRODUCT CARD ////////////////////

const ProductCard = ({ product, onSelectProduct }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition duration-300">
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={product.img}
          alt=""
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <p className="text-sm text-gray-800 leading-snug mb-4">{product.title}</p>

      <div className="flex items-center justify-between">
        <p className="text-blue-600 font-semibold">
          <PriceCounter value={product.price} />
        </p>

        <button className="flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-100 transition">
          <ExternalLink size={16} onClick={() => onSelectProduct(product)} />
        </button>
      </div>
    </div>
  );
};

//////////////////// MAIN COMPONENT ////////////////////

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featured = products.filter((p) => p.featured);
  const normal = products.filter((p) => !p.featured);

  return (
    <section
      id="products"
      className="bg-gray-100 py-20 px-4 flex justify-center"
    >
      <div className="max-w-7xl w-full">
        {/* Header */}

        <div className="text-center mb-16">
          <FadeIn delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Newly Launch Products
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              GLOBUS proudly introduces its latest collection of cosmetics,
              Ayurvedic natural products, and wholesome food items all made with
              pure, 100% chemical-free ingredients to bring you beauty,
              wellness, and nutrition the natural way.
            </p>
          </FadeIn>
        </div>

        {/* Featured Products */}
        <FadeIn delay={200}>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {featured.map((product) => (
              <FeaturedCard key={product.id} product={product} onSelectProduct={setSelectedProduct} />
            ))}
          </div>
        </FadeIn>

        {/* Product Grid */}
        <FadeIn delay={300}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
            {normal.map((product) => (
              <ProductCard key={product.id} product={product} onSelectProduct={setSelectedProduct} />
            ))}
          </div>
        </FadeIn>
      </div>
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </section>
  );
}
