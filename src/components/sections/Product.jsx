import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ExternalLink,
  Sparkles,
  Leaf,
  ShieldCheck,
  Star,
  ChevronRight,
  Eye,
  ArrowRight,
  Package,
  Filter,
  Grid3X3,
  LayoutList,
} from "lucide-react";
import ProductModal from "../ui/ProductModal";
import { products } from "../../data/products";
import FadeIn from "../animations/FadeIn";

/* ═══════════════════════════════════════════════
   PRICE COUNTER — animates from 0 to value
   ═══════════════════════════════════════════════ */

const PriceCounter = ({ value, className = "" }) => {
  const [count, setCount] = useState("0.00");
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const duration = 1200;
          let start = null;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount((eased * value).toFixed(2));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      LKR {count}
    </span>
  );
};

/* ═══════════════════════════════════════════════
   TRUST BADGE
   ═══════════════════════════════════════════════ */

const TrustBadge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-1.5 rounded-full border border-gray-200/80 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-gray-600 shadow-sm backdrop-blur-sm sm:text-xs">
    <Icon size={13} className="text-gray-500" />
    {label}
  </div>
);

/* ═══════════════════════════════════════════════
   STAR RATING
   ═══════════════════════════════════════════════ */

const StarRating = ({ rating = 0, size = 12 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className={
          i < Math.floor(rating)
            ? "fill-amber-400 text-amber-400"
            : i < rating
            ? "fill-amber-200 text-amber-300"
            : "fill-gray-100 text-gray-200"
        }
      />
    ))}
    {rating > 0 && (
      <span className="ml-1 text-[11px] text-gray-400">{rating}</span>
    )}
  </div>
);

/* ═══════════════════════════════════════════════
   FEATURED PRODUCT CARD
   ═══════════════════════════════════════════════ */

const FeaturedCard = ({ product, onClick }) => (
  <div
    onClick={() => onClick(product)}
    className="
      group relative cursor-pointer
      overflow-hidden rounded-2xl sm:rounded-3xl
      border border-gray-100/80
      bg-white
      shadow-[0_4px_24px_rgba(0,0,0,0.04)]
      transition-all duration-500
      hover:-translate-y-0.5
      hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
      active:scale-[0.995]
    "
  >
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 md:aspect-auto">
        <img
          src={product.img}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 sm:left-4 sm:top-4">
          <span className="rounded-full bg-gray-900/90 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg backdrop-blur-sm sm:text-[11px]">
            ★ Featured
          </span>
          {product.isNew && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-gray-900 shadow-lg backdrop-blur-sm sm:text-[11px]">
              New Arrival
            </span>
          )}
        </div>

        {/* Quick view on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-gray-900 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:text-sm">
            <Eye size={15} />
            Quick View
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 sm:p-5 md:p-6 lg:p-7">
        <div>
          {product.category && (
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 sm:mb-2 sm:text-[11px]">
              {product.category}
            </p>
          )}

          <h3 className="text-base font-semibold leading-snug text-gray-900 sm:text-lg md:text-xl">
            {product.title}
          </h3>

          {product.shortDesc && (
            <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:mt-2 sm:text-sm">
              {product.shortDesc}
            </p>
          )}

          {product.rating && (
            <div className="mt-2.5 sm:mt-3">
              <StarRating rating={product.rating} size={13} />
            </div>
          )}

          {product.benefits && product.benefits.length > 0 && (
            <div className="mt-3 sm:mt-4">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 sm:text-[11px]">
                Key Benefits
              </p>
              <ul className="space-y-1">
                {product.benefits.slice(0, 3).map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-600 sm:text-[13px]"
                  >
                    <div className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-gray-400 sm:mt-[6px] sm:h-1.5 sm:w-1.5" />
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4 sm:mt-5 sm:pt-5">
          <div>
            <p className="text-[10px] font-medium text-gray-400 sm:text-[11px]">
              Price
            </p>
            <p className="text-lg font-semibold text-gray-900 sm:text-xl">
              <PriceCounter value={product.price} />
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
            className="
              flex items-center gap-1.5
              rounded-full bg-gray-900
              px-4 py-2 sm:px-5 sm:py-2.5
              text-xs font-medium text-white
              shadow-md
              transition-all duration-300
              hover:bg-black hover:shadow-lg
              active:scale-95
              sm:text-sm
            "
          >
            View Details
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   SMALL PRODUCT CARD
   ═══════════════════════════════════════════════ */

const ProductCard = ({ product, onClick }) => (
  <div
    onClick={() => onClick(product)}
    className="
      group cursor-pointer
      overflow-hidden rounded-xl sm:rounded-2xl
      border border-gray-100/80
      bg-white
      shadow-[0_2px_16px_rgba(0,0,0,0.03)]
      transition-all duration-500
      hover:-translate-y-0.5
      hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)]
      active:scale-[0.98]
    "
  >
    {/* Image */}
    <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
      <img
        src={product.img}
        alt={product.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {product.isNew && (
        <span className="absolute left-2 top-2 rounded-full bg-gray-900/90 px-2 py-0.5 text-[9px] font-semibold text-white shadow-md backdrop-blur-sm sm:left-2.5 sm:top-2.5 sm:text-[10px]">
          New
        </span>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/5">
        <div className="rounded-full bg-white/95 p-2 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:p-2.5">
          <Eye size={16} className="text-gray-900" />
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-3 sm:p-3.5 md:p-4">
      {product.category && (
        <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-400 sm:text-[10px]">
          {product.category}
        </p>
      )}

      <h3 className="line-clamp-2 text-[12px] font-semibold leading-snug text-gray-900 sm:text-[13px] md:text-sm">
        {product.title}
      </h3>

      {product.rating && (
        <div className="mt-1.5 sm:mt-2">
          <StarRating rating={product.rating} size={10} />
        </div>
      )}

      {/* Price row */}
      <div className="mt-2.5 flex items-center justify-between border-t border-gray-50 pt-2.5 sm:mt-3 sm:pt-3">
        <p className="text-[13px] font-semibold text-gray-900 sm:text-sm md:text-[15px]">
          <PriceCounter value={product.price} />
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(product);
          }}
          className="
            flex h-7 w-7 items-center justify-center
            rounded-full border border-gray-200
            bg-white text-gray-600
            transition-all duration-300
            hover:border-gray-900 hover:bg-gray-900 hover:text-white
            active:scale-90
            sm:h-8 sm:w-8
          "
        >
          <ExternalLink size={12} className="sm:hidden" />
          <ExternalLink size={14} className="hidden sm:block" />
        </button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════ */

const SectionHeader = ({ title, subtitle, count }) => (
  <div className="mb-4 flex items-end justify-between sm:mb-6">
    <div>
      <h3 className="text-base font-semibold text-gray-900 sm:text-lg md:text-xl">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs md:text-sm">
          {subtitle}
        </p>
      )}
    </div>

    {count !== undefined && (
      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-600 sm:text-xs">
        {count} {count === 1 ? "item" : "items"}
      </span>
    )}
  </div>
);

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = products.filter((p) => p.featured);

  const categories = [
    "All",
    ...new Set(products.filter((p) => !p.featured).map((p) => p.category).filter(Boolean)),
  ];

  const normalProducts = products.filter((p) => {
    if (p.featured) return false;
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#f8f9fb] px-4 py-12 sm:px-5 sm:py-14 md:px-6 lg:px-8 lg:py-20"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-violet-100/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 rounded-full bg-amber-50/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ─────── HEADER ─────── */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-14">
          <FadeIn delay={0}>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-sm sm:mb-4">
              <Package size={14} className="text-gray-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-500 sm:text-xs">
                New Collection 2026
              </span>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px] lg:leading-tight">
              Newly Launched
              <span className="block text-gray-400 sm:inline sm:ml-2">
                Products
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={80}>
            <p className="mx-auto mt-2.5 max-w-xl text-[13px] leading-relaxed text-gray-500 sm:mt-3 sm:text-sm md:max-w-2xl md:text-base">
              GLOBUS proudly introduces its latest collection of cosmetics,
              Ayurvedic natural products, and wholesome food items — crafted
              with pure, 100% chemical-free ingredients.
            </p>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-5">
              <TrustBadge icon={Leaf} label="100% Natural" />
              <TrustBadge icon={ShieldCheck} label="Quality Certified" />
              <TrustBadge icon={Sparkles} label="Premium Grade" />
            </div>
          </FadeIn>
        </div>

        {/* ─────── FEATURED ─────── */}
        <FadeIn delay={160}>
          <SectionHeader
            title="Featured Products"
            subtitle="Our most popular and recommended items"
            count={featured.length}
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
            {featured.map((product) => (
              <FeaturedCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
        </FadeIn>

        {/* ─────── CATEGORY FILTER ─────── */}
        <FadeIn delay={200}>
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <SectionHeader
              title="All Products"
              subtitle="Browse our complete product range"
              count={normalProducts.length}
            />

            {/* Filter pills */}
            {categories.length > 2 && (
              <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none sm:mb-5 sm:flex-wrap sm:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`
                      shrink-0 rounded-full px-3.5 py-1.5
                      text-[11px] font-medium
                      transition-all duration-300
                      sm:text-xs
                      ${
                        activeCategory === cat
                          ? "bg-gray-900 text-white shadow-md"
                          : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Product grid */}
            <div
              className="
                grid grid-cols-2 gap-2.5
                sm:gap-3.5
                md:grid-cols-3 md:gap-4
                lg:grid-cols-4 lg:gap-5
              "
            >
              {normalProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>

            {/* Empty state */}
            {normalProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Package size={40} className="mb-3 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">
                  No products found in this category
                </p>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="mt-3 text-xs font-medium text-gray-900 underline underline-offset-4"
                >
                  View all products
                </button>
              </div>
            )}
          </div>
        </FadeIn>


        {/* ─────── BOTTOM CTA ─────── */}
        <FadeIn delay={200}>
          <div
            className="
              mt-8 overflow-hidden rounded-2xl
              bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800
              p-5 text-center
              shadow-[0_20px_60px_rgba(0,0,0,0.15)]
              sm:mt-10 sm:rounded-3xl sm:p-8
              lg:p-10
            "
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 sm:h-12 sm:w-12">
              <Leaf size={20} className="text-white" />
            </div>

            <h3 className="mt-3 text-lg font-semibold text-white sm:mt-4 sm:text-xl md:text-2xl">
              100% Natural & Chemical-Free
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-gray-400 sm:text-sm md:max-w-xl md:text-base">
              Every product is carefully formulated with pure natural
              ingredients. Experience the difference of Ayurvedic quality
              backed by the Globus ecosystem.
            </p>

            <div className="mt-5 flex flex-col items-center justify-center gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
              <a
                href="#products"
                className="
                  inline-flex w-full items-center justify-center gap-2
                  rounded-full bg-white
                  px-5 py-2.5
                  text-xs font-medium text-gray-900
                  shadow-md
                  transition-all duration-300
                  hover:shadow-lg active:scale-95
                  sm:w-auto sm:px-6 sm:py-3 sm:text-sm
                "
              >
                Explore Products
                <ArrowRight size={15} />
              </a>

              <a
                href="https://your-store-url.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex w-full items-center justify-center gap-2
                  rounded-full border border-white/20
                  bg-white/10
                  px-5 py-2.5
                  text-xs font-medium text-white
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:bg-white/15 active:scale-95
                  sm:w-auto sm:px-6 sm:py-3 sm:text-sm
                "
              >
                Visit Store
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ─────── MODAL ─────── */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}