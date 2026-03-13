import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import FadeIn from '../animations/FadeIn';

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
      { threshold: 0.5 }
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

//////////////////// PRODUCT DATA ////////////////////

const products = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1200",
    title:
      "Omnichannel routing and automation for customer engagement at scale.",
    benefits: [
      "Keep operations under one smart dashboard",
      "Automate customer workflows",
      "Monitor engagement analytics",
    ],
    price: 60,
    featured: true,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200",
    title:
      "Omnichannel routing and automation for customer engagement at scale.",
    benefits: [
      "Unified communication channels",
      "Smart routing automation",
      "Real‑time performance tracking",
    ],
    price: 60,
    featured: true,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200",
    title:
      "Omnichannel routing and automation for customer engagement at scale.",
    price: 60,
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200",
    title:
      "Omnichannel routing and automation for customer engagement at scale.",
    price: 60,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200",
    title:
      "Omnichannel routing and automation for customer engagement at scale.",
    price: 60,
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200",
    title:
      "Omnichannel routing and automation for customer engagement at scale.",
    price: 60,
  },
];

//////////////////// FEATURED PRODUCT CARD ////////////////////

const FeaturedCard = ({ product }) => {
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
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

//////////////////// SMALL PRODUCT CARD ////////////////////

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition duration-300">
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={product.img}
          alt=""
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <p className="text-sm text-gray-800 leading-snug mb-4">
        {product.title}
      </p>

      <div className="flex items-center justify-between">
        <p className="text-blue-600 font-semibold">
          <PriceCounter value={product.price} />
        </p>

        <button className="flex items-center justify-center w-9 h-9 border rounded-lg hover:bg-gray-100 transition">
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};

//////////////////// MAIN COMPONENT ////////////////////

export default function Product() {
  const featured = products.filter((p) => p.featured);
  const normal = products.filter((p) => !p.featured);

  return (
    <section id="products" className="bg-gray-100 py-20 px-4 flex justify-center">
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
            Explore our core platforms designed to accelerate growth, improve
            reliability, and manage operations through one smart dashboard.
          </p>
          </FadeIn>
        </div>

        {/* Featured Products */}
         <FadeIn delay={200}>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {featured.map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </div>
        </FadeIn>

        {/* Product Grid */}
          <FadeIn delay={300}>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
          {normal.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
