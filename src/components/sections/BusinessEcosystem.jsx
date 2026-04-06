import React, { useEffect, useRef, useState } from "react";
import {
  Factory,
  Package,
  Boxes,
  Store,
  Handshake,
  Rocket,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tick = "/image/tick.png";

/* ---------------- DATA ---------------- */
const nodes = [
  {
    label: "Manufacturers",
    icon: Factory,
    description:
      "Manufacturers provide high-quality products to the Globus ecosystem. They help create the foundation of the business by producing goods that others can distribute and sell.",
    benefits: [
      "Access to a larger market",
      "More business opportunities",
      "Long-term partnerships",
    ],
    offers: [
      "Trusted network",
      "Support for product promotion",
      "Connections with distributors and sellers",
    ],
  },
  {
    label: "Distributors",
    icon: Package,
    description:
      "Distributors move products from manufacturers to different regions. They make sure products reach the right places quickly and efficiently.",
    benefits: [
      "Grow distribution business",
      "Increase sales volume",
    ],
    offers: [
      "Strong supply network",
      "Reliable products",
      "Support to expand into new areas",
    ],
  },
  {
    label: "Dealers",
    icon: Boxes,
    description:
      "Local Dealers make products available in nearby towns and local communities. They act as the bridge between distributors and customers.",
    benefits: [
      "Steady business growth",
      "More local customers",
    ],
    offers: [
      "Business support",
      "Marketing materials",
      "Access to quality products",
    ],
  },
  {
    label: "Partners",
    icon: Store,
    description:
      "Retail Partners sell products directly to customers through shops, stores, or online channels. They help customers find the products they need.",
    benefits: [
      "Better income opportunities",
      "Trusted products to sell",
      "Repeat customers",
    ],
    offers: [
      "Product training",
      "Promotional support",
      "Reliable supply chain",
    ],
  },
  {
    label: "Partners",
    icon: Handshake,
    description:
      "Strategic Partners work together with Globus to create new business opportunities, expand into new markets, and build stronger connections.",
    benefits: [
      "Shared business growth",
      "Stronger business relationships",
      "Access to wider opportunities",
    ],
    offers: [
      "Collaboration",
      "Partnership opportunities",
      "Support for expansion",
    ],
  },
  {
    label: "Entrepreneurs",
    icon: Rocket,
    description:
      "Growth Entrepreneurs build and expand the network by leading teams, finding new opportunities, and helping others succeed.",
    benefits: [
      "Leadership development",
      "Business growth",
      "Higher earning potential",
    ],
    offers: [
      "Training and mentorship",
      "Recognition within the community",
      "Opportunity to grow in the ecosystem",
    ],
  },
];

/* ---------------- HOOK ---------------- */
function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/* ---------------- NODE ---------------- */
function Node({ node, index, visible, onClick }) {
  const Icon = node.icon;

  return (
    <motion.div
      onClick={() => onClick(node)}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 120,
      }}
      whileHover={{ y: -4 }}
      className="flex flex-col items-center text-center cursor-pointer"
    >
      <div className="h-14 w-14 md:h-20 md:w-20 rounded-2xl bg-white border border-gray-200 shadow-[0_6px_20px_rgba(0,0,0,0.05)] flex items-center justify-center">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
      </div>

      <p className="mt-3 text-xs md:text-sm text-gray-700 font-medium">
        {node.label}
      </p>
    </motion.div>
  );
}

/* ---------------- MODAL ---------------- */
function Modal({ data, onClose }) {
  if (!data) return null;
  const Icon = data.icon;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          className="w-full max-w-lg bg-white rounded-t-3xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto"
        >
          {/* HANDLE */}
          <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>

          {/* HEADER */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
              <Icon className="w-7 h-7 text-gray-800" />
            </div>

            <h2 className="text-lg font-semibold text-gray-900">
              {data.label}
            </h2>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* BENEFITS */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Benefits
            </h3>

            <ul className="space-y-2">
              {data.benefits.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <img src={tick} className="w-4 h-4 mt-[2px]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* OFFERS */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              What we offer
            </h3>

            <ul className="space-y-2">
              {data.offers.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <img src={tick} className="w-4 h-4 mt-[2px]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------------- MAIN ---------------- */
export default function BusinessEcosystem() {
  const [ref, visible] = useInView();
  const [active, setActive] = useState(null);

  return (
    <section
      ref={ref}
      className="w-full px-4 py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto text-center">

        {/* TAG */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gray-100 border border-gray-200">
          <Handshake className="w-4 h-4 text-gray-600" />
          <span className="text-xs text-gray-600 font-medium">
            Connected Ecosystem
          </span>
        </div>

        {/* TITLE */}
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight">
          The Globus Business Ecosystem
        </h1>

        {/* DESC */}
        <p className="mt-4 max-w-2xl mx-auto text-sm md:text-lg text-gray-600">
          A unified network connecting every stage of the business journey.
        </p>

        {/* TIMELINE */}
        <div className="relative mt-16">

            {/* LINES */}
          {/* Top line - always visible */}
          <div className="absolute left-[5%] right-[5%] top-7 h-[2px] bg-gray-200" />

          {/* Bottom line - only for small devices */}
          <div className="absolute left-[5%] right-[5%] top-[calc(60%+14px)] h-[2px] bg-gray-200 md:hidden" />

          {/* NODES */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 relative">
            {nodes.map((node, i) => (
              <Node
                key={i}
                node={node}
                index={i}
                visible={visible}
                onClick={setActive}
              />
            ))}
          </div>
        </div>

      </div>

      <Modal data={active} onClose={() => setActive(null)} />
    </section>
  );
}