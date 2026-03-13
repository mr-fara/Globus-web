import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection, useScrollSpy } from "../../hook/useScrollSpy.js";
import {NAV_LINKS,} from '../../utils/constants'

const Navbar = () => {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const activeSection = useScrollSpy(NAV_LINKS.map(link => link.id))

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled (window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },  []);
  
    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId);
        setIsMenuOpen(false);
    };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        isScrolled ? "py-3" : "py-3"
      }`}
    >
      <div
        className={`w-[95%] max-w-[1320px] max-h-[50px] flex items-center justify-between px-7 py-3 rounded-3xl border transition-all duration-300 ${
          isScrolled
            ? "bg-white/50 backdrop-blur-md shadow-md border-gray-200"
            : "bg-white border-gray-300"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold text-blue-600"
        >
          Globus
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
                <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-base font-medium transition-all duration-300 ${activeSection === link.id
                         ? 'text-black'
                         : 'text-black/70 hover:text-blue-500'
                    }`}
                >
                    {link.label}
            </button>
         ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            onClick={() => handleNavClick("contact")}
            className="px-6 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full w-[95%] max-w-[1320px] md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "rounded-2xl max-h-96 opacity-100 mt-[-8px]" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                activeSection === link.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => handleNavClick("contact")}
            className="w-full mt-0 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;