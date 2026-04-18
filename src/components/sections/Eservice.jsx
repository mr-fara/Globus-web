import {
  ArrowUpRight,
  Smartphone,
  ShieldCheck,
  Clock3,
  CreditCard,
  Headphones,
  Layers3,
  FileText,
  Truck,
  BellRing,
  CheckCircle2,
} from "lucide-react";

const platformUrl = "https://your-eservices-site.com";

const steps = [
  {
    title: "Sign in",
    desc: "Access your account securely from your phone, tablet, or desktop.",
  },
  {
    title: "Choose a service",
    desc: "Select the task you want to complete, such as requests, payments, or tracking.",
  },
  {
    title: "Complete online",
    desc: "Finish the process digitally and receive updates without unnecessary delays.",
  },
];

const quickBenefits = [
  {
    title: "24/7 access",
    icon: Clock3,
  },
  {
    title: "Secure login",
    icon: ShieldCheck,
  },
  {
    title: "Mobile friendly",
    icon: Smartphone,
  },
];

export default function EServicesPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f8fb] via-white to-[#f7f8fb] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-20 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* HERO */}
        <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/60 bg-white/75 backdrop-blur-2xl shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left content */}
            <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm">
                E-Services
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                Manage services online,
                <span className="block text-gray-500">
                  simply and securely.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                Our E-Services platform helps members, partners, and customers
                complete everyday tasks online — from account access and service
                requests to payments, updates, and support. It is designed to
                save time, reduce manual steps, and make digital access easier
                across the ecosystem.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Access services anytime without visiting a physical branch",
                  "Track requests, updates, and records from one dashboard",
                  "Use a faster, more convenient digital workflow",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-gray-900"
                    />
                    <p className="text-sm text-gray-700 sm:text-[15px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-black hover:shadow-lg sm:w-auto"
                >
                  Visit E-Services
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href="#services"
                  className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3.5 text-sm font-medium text-gray-800 transition-all duration-300 hover:bg-gray-50 hover:shadow-sm sm:w-auto"
                >
                  Explore Features
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {quickBenefits.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white/80 px-4 py-3 shadow-sm"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-900">
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right visual / mockup */}
            <div className="flex items-center justify-center px-5 pb-8 sm:px-8 lg:px-10 lg:py-10">
              <div className="w-full max-w-[390px] rounded-[30px] border border-gray-200 bg-[#111827] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                <div className="rounded-[24px] bg-[#f8fafc] p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Connected platform</p>
                      <h3 className="text-lg font-semibold text-gray-900">
                        E-Services Dashboard
                      </h3>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                      Live
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <p className="text-xs text-gray-500">Today</p>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Open requests</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          03
                        </p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Payments</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Service request
                        </p>
                        <p className="text-xs text-gray-500">
                          Submitted successfully
                        </p>
                      </div>
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                        Done
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Payment status
                        </p>
                        <p className="text-xs text-gray-500">
                          Secure digital transaction
                        </p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        Confirmed
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Support message
                        </p>
                        <p className="text-xs text-gray-500">
                          Response available online
                        </p>
                      </div>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        View
                      </span>
                    </div>
                  </div>

                  <a
                    href={platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-black"
                  >
                    Open platform
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* HOW IT WORKS */}
        <div className="mt-10 rounded-[28px] border border-gray-100 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl sm:mt-12 sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              How it works
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
              The process is simple and designed for convenience across mobile
              and desktop devices.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-gray-50/80 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                  {index + 1}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12">
          <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-6 py-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ready to access the platform?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
              Visit our E-Services website to manage requests, track updates,
              make payments, and use digital services in one place.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-gray-900 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg sm:w-auto"
              >
                Go to E-Services
                <ArrowUpRight size={18} />
              </a>

              <a
                href="#services"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/15 sm:w-auto"
              >
                View Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}