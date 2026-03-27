
import {
  Factory,
  Truck,
  ShoppingCart,
  Network,
  Users,
  Briefcase,
} from "lucide-react";

const methods = [
  { title: "Manufacturing", icon: Factory },
  { title: "Distribution", icon: Truck },
  { title: "Sales", icon: ShoppingCart },
  { title: "Networking", icon: Network },
  { title: "Collaboration", icon: Users },
  { title: "Entrepreneur", icon: Briefcase },
];

const EarningsGrid = () => {
  return (
    <section className="w-full py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* HEADER */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Earning Opportunities
        </h2>

        <p className="mt-4 mb-16 text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Within the Globus ecosystem, individuals can participate in multiple
          business activities and build sustainable income streams.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-3 gap-5 md:gap-8">
          {methods.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center text-center p-5 md:p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* ICON */}
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-600 transition">
                  <Icon
                    size={24}
                    className="text-gray-700 group-hover:text-white transition"
                  />
                </div>

                {/* TITLE */}
                <h3 className="mt-5 text-sm md:text-base font-semibold text-gray-800">
                  {item.title}
                </h3>

                {/* UNDERLINE EFFECT */}
                <div className="mt-3 w-8 h-[2px] bg-gray-200 group-hover:bg-blue-500 transition"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EarningsGrid;