import React, { useState, useEffect } from 'react';
import { Plane, Compass, Menu, X, ArrowRight, CalendarDays } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ onOpenBookModal, onScrollToSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`main-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a 
          href="#" 
          className="brand-identity" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          aria-label="Gaur Travels - Safar aapka, saath hamara"
        >
          <img 
            src={logoImg} 
            alt="Gaur Travels - Safar aapka, saath hamara" 
            className="brand-logo-img" 
          />
        </a>

        <div className={`nav-menu-list ${mobileMenuOpen ? 'mobile-active' : ''}`}>
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
            className="btn btn-outline"
            style={{ display: 'none', md: 'inline-flex' }}
            onClick={() => handleNavClick('calculator')}
          >
            <CalendarDays size={16} /> Plan Cost
          </button>
          <button
            className="btn btn-gold"
            onClick={() => onOpenBookModal('General Trip Booking')}
          >
            <span>Book Now</span>
            <ArrowRight size={16} />
          </button>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
