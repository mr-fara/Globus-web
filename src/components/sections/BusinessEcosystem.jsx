
import FadeIn from "../animations/FadeIn";

const BusinessEcosystem = () => {
  return (
    <section className="w-full py-20 px-4 flex justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl w-full">

        {/* HEADER */}
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Business Ecosystem
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A unified system connecting every role in the business cycle
            </p>
          </div>
        </FadeIn>

        {/* MAIN */}
        <div className="grid md:grid-cols-3 gap-10 items-center">

          {/* LEFT */}
          <div className="space-y-10 text-center md:text-right">
            {[
              {
                title: "Manufacturers",
                desc: "Produce and supply products into the ecosystem",
              },
              {
                title: "Dealers",
                desc: "Manage product availability in local markets",
              },
              {
                title: "Entrepreneurs",
                desc: "Expand and scale the network strategically",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group">
                  <h3 className="font-semibold text-lg group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CENTER */}
          <FadeIn>
            <div className="flex justify-center">

              <div className="relative w-64 h-64 sm:w-72 sm:h-72">

                {/* OUTER GLOW */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl"></div>

                {/* MAIN CIRCLE */}
                <div className="
                  relative
                  w-full h-full rounded-full
                  font-bold text-sm
                  bg-gradient-to-br from-blue-500 to-cyan-400
                  grid grid-cols-2 grid-rows-2
                  overflow-hidden
                  shadow-2xl
                ">

                  {[
                    "Manufacturers",
                    "Distributors",
                    "Dealers",
                    "Retailers",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="
                        flex items-center justify-center
                        text-white text-xs text-center
                        p-2
                        border border-white/20
                        backdrop-blur-md
                        hover:bg-white/10
                        transition
                      "
                    >
                      {item}
                    </div>
                  ))}

                </div>

                {/* CENTER CORE WITH IMAGE */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="
                    w-24 h-24 sm:w-28 sm:h-28
                    bg-white
                    rounded-full
                    flex items-center justify-center
                    shadow-xl
                    border-4 border-white/50
                    overflow-hidden
                    hover:scale-105
                    transition
                  ">
                    <img
                      src="/image/glbs.png"
                      alt="Globus Logo"
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                </div>

              </div>

            </div>
          </FadeIn>

          {/* RIGHT */}
          <div className="space-y-10 text-center md:text-left">
            {[
              {
                title: "Distributors",
                desc: "Ensure smooth product movement across regions",
              },
              {
                title: "Retailers",
                desc: "Deliver products directly to customers",
              },
              {
                title: "Business Partners",
                desc: "Collaborate to create new opportunities",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group">
                  <h3 className="font-semibold text-lg group-hover:text-cyan-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>

        {/* FOOT */}
        <FadeIn delay={300}>
          <p className="text-center text-gray-700 mt-16 max-w-2xl mx-auto leading-relaxed">
            The Globus ecosystem integrates production, distribution, and 
            entrepreneurship into one seamless business network, enabling 
            sustainable growth and opportunity for all participants.
          </p>
        </FadeIn>

      </div>
    </section>
  );
};

export default BusinessEcosystem;