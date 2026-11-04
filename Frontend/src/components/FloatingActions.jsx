import React, { useState, useEffect } from 'react';
import { Phone, Plane, Sun, Moon } from 'lucide-react';

export default function FloatingActions({ theme = 'light', onToggleTheme }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-widget-stack">
      {/* Theme Switcher Floating Action */}
      {onToggleTheme && (
        <button
          type="button"
          onClick={onToggleTheme}
          className="float-action-circle float-theme-circle"
          aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#0284c7" />}
        </button>
      )}

      {/* WhatsApp Floating Desk */}
      <a
        href="https://wa.me/919971859687?text=Hello%20Gaur%20Travel!%20I%20am%20interested%20in%20planning%20a%20tour%20package."
        target="_blank"
        rel="noreferrer"
        className="float-action-circle float-wa-circle"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Quick Phone Call */}
      <a
        href="tel:+919971859687"
        className="float-action-circle float-phone-circle"
        aria-label="Call Gaur Travel"
      >
        <Phone size={22} />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="float-action-circle float-top-circle"
          aria-label="Scroll to top"
        >
          <Plane size={20} />
        </button>
      )}
    </div>
  );
}
