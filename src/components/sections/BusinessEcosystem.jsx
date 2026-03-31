import FadeIn from "../animations/FadeIn";
import { useState, useEffect } from "react";

const BusinessEcosystem = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ecosystemRoles = {
    left: [
      {
        id: "manufacturers",
        title: "Manufacturers",
        desc: "Produce and supply products into the ecosystem",
        icon: "🏭",
        color: "from-blue-500 to-blue-600",
      },
      {
        id: "dealers",
        title: "Dealers",
        desc: "Manage product availability in local markets",
        icon: "📦",
        color: "from-indigo-500 to-indigo-600",
      },
      {
        id: "entrepreneurs",
        title: "Entrepreneurs",
        desc: "Expand and scale the network strategically",
        icon: "🚀",
        color: "from-purple-500 to-purple-600",
      },
    ],
    right: [
      {
        id: "distributors",
        title: "Distributors",
        desc: "Ensure smooth product movement across regions",
        icon: "🚚",
        color: "from-cyan-500 to-cyan-600",
      },
      {
        id: "retailers",
        title: "Retailers",
        desc: "Deliver products directly to customers",
        icon: "🏪",
        color: "from-teal-500 to-teal-600",
      },
      {
        id: "partners",
        title: "Business Partners",
        desc: "Collaborate to create new opportunities",
        icon: "🤝",
        color: "from-emerald-500 to-emerald-600",
      },
    ],
  };

  const centerRoles = [
    "Manufacturers",
    "Distributors",
    "Dealers",
    "Retailers",
  ];
  
  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* HEADER - Enhanced */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-block mb-1">
              <span className="text-sm font-semibold uppercase tracking-wide">
                Connected Ecosystem
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Business Ecosystem
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A unified system connecting every role in the business cycle
            </p>
          </div>
        </FadeIn>

        {/* MAIN - Mobile Optimized Layout */}
        {isMobile ? (
          // Mobile Layout - Card-based with interactive elements
          <div className="space-y-12">
            {/* Central Hub - Enhanced for Mobile */}
            <FadeIn>
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-xl animate-pulse"></div>
                  <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-2xl p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400">
                      <div className="grid grid-cols-2 grid-rows-2 h-full">
                        {centerRoles.map((role, i) => (
                          <div
                            key={i}
                            onClick={() => setActiveRole(role)}
                            className="flex items-center justify-center text-white text-xs text-center p-2 border border-white/20 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 cursor-pointer hover:bg-white/20"
                          >
                            <span className="font-medium">{role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white/50 overflow-hidden hover:scale-110 transition-transform duration-300">
                        <img
                          src="/image/glbs.png"
                          alt="Globus Logo"
                          className="w-14 h-14 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Mobile Cards - Interactive Roles */}
            <div className="space-y-4">
              {[...ecosystemRoles.left, ...ecosystemRoles.right].map((role, idx) => (
                <FadeIn key={role.id} delay={idx * 100}>
                  <div
                    className={`group relative bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      activeRole === role.title ? "ring-2 ring-blue-500 scale-[1.02]" : ""
                    }`}
                    onClick={() => setActiveRole(role.title)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                    <div className="relative flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center text-2xl shadow-md`}>
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                          {role.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">{role.desc}</p>
                      </div>
                      <div className="text-gray-300 group-hover:text-blue-500 transition-colors">
                        →
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        ) : (
          // Desktop Layout - Original Grid Layout Enhanced
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-center">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              {ecosystemRoles.left.map((role, i) => (
                <FadeIn key={role.id} delay={i * 100}>
                  <div className="group text-right">
                    <div className="relative inline-block">
                      <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                      <div className="relative">
                        <div className="flex items-center justify-end gap-3 mb-2">
                          <span className="text-2xl">{role.icon}</span>
                          <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
                            {role.title}
                          </h3>
                        </div>
                        <p className="text-gray-500 text-sm">{role.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* CENTER - Enhanced Interactive Circle */}
            <FadeIn>
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-2xl p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400">
                      <div className="grid grid-cols-2 grid-rows-2 h-full">
                        {centerRoles.map((role, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center text-white text-sm font-medium text-center p-3 border border-white/20 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 cursor-pointer hover:bg-white/20"
                          >
                            {role}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white/50 overflow-hidden hover:scale-110 transition-transform duration-300">
                        <img
                          src="/image/glbs.png"
                          alt="Globus Logo"
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {ecosystemRoles.right.map((role, i) => (
                <FadeIn key={role.id} delay={i * 100}>
                  <div className="group text-left">
                    <div className="relative inline-block w-full">
                      <div className={`absolute inset-0 bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-xl text-gray-800 group-hover:text-cyan-600 transition-colors">
                            {role.title}
                          </h3>
                          <span className="text-2xl">{role.icon}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{role.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* FOOTER - Modern Statistics Section */}
        <FadeIn delay={300}>
          <div className="mt-16 md:mt-20">
            {/* Decorative Divider */}
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>

            

            {/* Description Text */}
            <div className="text-center">
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
                The Globus ecosystem integrates production, distribution, and 
                entrepreneurship into one seamless business network, enabling 
                sustainable growth and opportunity for all participants.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default BusinessEcosystem;