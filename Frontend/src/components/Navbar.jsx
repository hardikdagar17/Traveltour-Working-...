import React, { useState, useEffect } from 'react';
import { Plane, Compass, Menu, X, ArrowRight, CalendarDays, Phone, MessageSquare, Globe, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ onOpenBookModal, onScrollToSection, currency = 'INR', onCurrencyChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`main-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <a 
            href="#" 
            className="brand-identity" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            aria-label="Gaur Travel - Safar aapka, saath hamara"
          >
            <img 
              src={logoImg} 
              alt="Gaur Travel - Safar aapka, saath hamara" 
              className="brand-logo-img" 
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="nav-menu-list">
            <a href="#destinations" className="nav-menu-item" onClick={(e) => { e.preventDefault(); handleNavClick('destinations'); }}>Destinations</a>
            <a href="#highlights" className="nav-menu-item" onClick={(e) => { e.preventDefault(); handleNavClick('highlights'); }}>Highlights</a>
            <a href="#packages" className="nav-menu-item" onClick={(e) => { e.preventDefault(); handleNavClick('packages'); }}>Packages</a>
            <a href="#calculator" className="nav-menu-item" onClick={(e) => { e.preventDefault(); handleNavClick('calculator'); }}>Cost Calculator</a>
            <a href="#story" className="nav-menu-item" onClick={(e) => { e.preventDefault(); handleNavClick('story'); }}>Why Us</a>
            <a href="#guides" className="nav-menu-item" onClick={(e) => { e.preventDefault(); handleNavClick('guides'); }}>Our Guides</a>
            <a href="#contact" className="nav-menu-item" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a>
          </div>

          <div className="navbar-cta-group">
            <button
              className="btn btn-gold navbar-book-btn"
              onClick={() => onOpenBookModal('General Trip Booking')}
            >
              <span>Book Now</span>
              <ArrowRight size={15} />
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <img src={logoImg} alt="Gaur Travel" className="drawer-logo" />
          <button
            className="drawer-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-drawer-links">
          <a href="#destinations" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('destinations'); }}>
            <Compass size={18} />
            <span>Destinations</span>
          </a>
          <a href="#highlights" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('highlights'); }}>
            <Plane size={18} />
            <span>Highlights &amp; Services</span>
          </a>
          <a href="#packages" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('packages'); }}>
            <CalendarDays size={18} />
            <span>Tour Packages</span>
          </a>
          <a href="#calculator" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('calculator'); }}>
            <span className="drawer-icon-calc">₹</span>
            <span>Cost Calculator</span>
          </a>
          <a href="#story" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('story'); }}>
            <span className="drawer-icon-star">★</span>
            <span>Why Gaur Travel</span>
          </a>
          <a href="#guides" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('guides'); }}>
            <span className="drawer-icon-guide">🛡️</span>
            <span>Our Certified Guides</span>
          </a>
          <a href="#contact" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>
            <Phone size={18} />
            <span>Contact &amp; Booking</span>
          </a>
        </div>

        {/* Mobile Quick Action Buttons inside drawer */}
        <div className="mobile-drawer-actions">
          <button
            className="btn btn-gold btn-block"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBookModal('Mobile Drawer Booking');
            }}
          >
            <span>Book Tour Now</span>
            <ArrowRight size={16} />
          </button>

          <div className="drawer-quick-contacts">
            <a href="tel:+919971859687" className="drawer-contact-btn phone-btn">
              <Phone size={16} />
              <span>Call +91 99718 59687</span>
            </a>
            <a
              href="https://wa.me/919971859687?text=Hello%20Gaur%20Travel,%20I%20would%20like%20to%20inquire%20about%20a%20tour!"
              target="_blank"
              rel="noreferrer"
              className="drawer-contact-btn wa-btn"
            >
              <i className="fa-brands fa-whatsapp"></i>
              <span>WhatsApp Chat</span>
            </a>
          </div>

          <div className="drawer-footer-utility">
            <div className="drawer-currency-box">
              <Globe size={14} className="currency-globe-icon" />
              <select
                value={currency}
                onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                aria-label="Select Currency"
              >
                <option value="INR">₹ INR (India)</option>
                <option value="USD">$ USD (Global)</option>
                <option value="EUR">€ EUR (Europe)</option>
              </select>
            </div>
            <span className="drawer-trust-tag">
              <ShieldCheck size={14} /> Govt. Certified
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
