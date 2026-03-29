import React, { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../utils/constants';
import FadeIn from '../animations/FadeIn';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email' });
      return;
    }

    const whatsappMessage = encodeURIComponent(
      `Hello, I’d like to contact you.\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    const whatsappLink = `https://wa.me/94725535524?text=${whatsappMessage}`;
    window.open(whatsappLink, '_blank');

    setFormData({ name: '', email: '', message: '' });
    setStatus({ type: 'success', message: 'Message sent!' });
  };

  const socialIcons = { github: Github, linkedin: Linkedin, twitter: Twitter };

  return (
    <section id="contact" className="relative py-24  overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className=" text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Call to Action
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
               Join Globus Today
            </h2>
            <p className="text-black/60 max-w-2xl mx-auto">
              Become part of the Globus ecosystem and explore new opportunities.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <FadeIn delay={100}>
            <div className="bg-black/5 border border-black/10 rounded-2xl p-8 shadow-lg backdrop-blur-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'message'].map((field, idx) => (
                  <div key={idx}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-black/80 mb-2 capitalize"
                    >
                      {field === 'message' ? 'Message' : field}
                    </label>
                    {field !== 'message' ? (
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field === 'email' ? 'your.email@example.com' : `Your ${field}`}
                        className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      />
                    ) : (
                      <textarea
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us what you think in your mind..."
                        className="w-full px-4 py-3 bg-black/5 border border-black/10 rounded-xl text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl transition font-medium bg-black/5"
                >
                  <div className='text-blue-500'>Send Message</div>
                  <MessageCircle className="text-blue-500 w-5 h-5" />
                </button>

                {status.message && (
                  <p
                    className={`mt-2 text-sm ${
                      status.type === 'error' ? 'text-red-500' : 'text-green-400'
                    }`}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={200}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-4">Let's Connect</h3>
                <p className="text-black/80 leading-relaxed">
                  We always open to discussing new Ideas, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-black/5 border border-black/10 rounded-2xl hover:border-primary/30 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-black/20 to-primary/20 rounded-xl">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-black/60 mb-1">Email</p>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-black hover:text-primary font-medium transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-black/5 border border-black/10 rounded-2xl hover:border-primary/30 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-br from-black/20 to-primary/20 rounded-xl">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-black/60 mb-1">Location</p>
                    <p className="text-black font-medium">{PERSONAL_INFO.location}</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4">
                  {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                    const Icon = socialIcons[platform];
                    return Icon ? (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-black/5 rounded-xl border border-black/10 hover:bg-black/20 hover:border-primary/50 hover:scale-105 transition-all duration-300"
                      >
                        <Icon className="w-6 h-6 text-black/80 hover:text-primary transition-colors" />
                      </a>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;