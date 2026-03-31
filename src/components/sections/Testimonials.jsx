import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import FadeIn from "../animations/FadeIn";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const scrollToIndex = (index) => {
    setCurrentIndex(index);

    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: "smooth",
      });
    }
  };

  const nextTestimonial = () => {
    const next = (currentIndex + 1) % testimonials.length;
    scrollToIndex(next);
  };

  const prevTestimonial = () => {
    const prev =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    scrollToIndex(prev);
  };

  const testimonialStats = [
    { value: "100% Setisfaction", label: "The Best Business Community" },
    { value: "The best Opportunity", label: "Life time Business Knowledge" },
    { value: "100% Correct Way to Business", label: "Free Consultation for businesses growth" },
    { value: "100% Success", label: "The Best Way to Success" },
    { value: "100% Success", label: "The Best Way to Success" },
    { value: "100% Success", label: "The Best Way to Success" },
    { value: "100% Success", label: "The Best Way to Success" },
    { value: "100% Setisfaction", label: "The Best Business Community" },
    { value: "The best Opportunity", label: "Life time Business Knowledge" },
    { value: "100% Correct Way to Business", label: "Free Consultation for businesses growth" },
    { value: "100% Success", label: "The Best Way to Success" },
    { value: "100% Success", label: "The Best Way to Success" },
    { value: "100% Success", label: "The Best Way to Success" },
    { value: "100% Success", label: "The Best Way to Success" },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">

      {/* Background blur */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <FadeIn>
          <div className="text-center mb-16">

            <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
              Achievements
            </h2>

            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Community Teams Members
            </h2>

            <p className="text-gray-500 max-w-xl mx-auto">
              Success stories are being created every day. GLOBUS community members are reaching new milestones, building strong businesses, and turning their dreams into reality.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="relative">

            {/* Slider */}
            <div
              ref={sliderRef}
              className="flex overflow-hidden"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="min-w-full px-4"
                >
                  <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">

                    <div className="flex flex-col md:flex-row gap-8">

                      {/* Image */}
                      <div className="md:w-1/3">
                        <div className="relative h-72 rounded-xl overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover transition duration-500 hover:scale-105"
                          />

                          <div className="absolute bottom-4 left-4 right-4 bg-black/20 text-white backdrop-blur-sm rounded-xl p-4">
                            <div className="text-lg font-semibold">
                              {testimonialStats[index]?.value}
                            </div>
                            <div className="text-xs">
                              {testimonialStats[index]?.label}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">

                        <div>
                          <Quote className="text-blue-500 w-8 h-8 mb-4 opacity-70" />

                          <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            “{testimonial.quote}”
                          </p>
                        </div>

                        <div className="flex items-center justify-between">

                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {testimonial.name}
                            </h4>

                            <p className="text-sm text-gray-500">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>

                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/10 shadow-md w-12 h-12 backdrop-blur-sm border border-black/20 rounded-full flex items-center justify-center hover:bg-blue-100 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/10 shadow-md w-12 h-12 backdrop-blur-sm border border-black/20 rounded-full flex items-center justify-center hover:bg-blue-100 transition"
            >
              <ChevronRight />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`transition-all rounded-full ${
                    index === currentIndex
                      ? "w-5 h-1.5 bg-blue-500"
                      : "w-1.5 h-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Testimonials;