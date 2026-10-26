import React from 'react';
import { Globe, Phone, Mail, Plane, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer({ onSelectRegion }) {
  return (
    <footer className="site-footer">
      {/* Top Banner with the 3 points matching Image 1 */}
      <div className="footer-banner-highlight">
        <div className="container footer-highlight-trio">
          <div className="trio-item">
            <Globe size={20} />
            <span>www.gaurtravel.in</span>
          </div>
          <div className="trio-item">
            <Phone size={20} />
            <a href="tel:+919971859687">+91 99718 59687</a>
          </div>
          <div className="trio-item">
            <Mail size={20} />
            <a href="mailto:gaur.tourtravel04@gmail.com">gaur.tourtravel04@gmail.com</a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="container footer-main-columns">
        <div className="footer-four-columns">
          <div>
            <div className="footer-brand-wrap" style={{ marginBottom: '20px' }}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                aria-label="Gaur Travel - Safar aapka, saath hamara"
              >
                <div style={{
                  display: 'inline-block',
                  padding: '8px 14px',
                  background: 'rgba(255, 255, 255, 0.96)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  transition: 'transform 0.25s ease'
                }}>
                  <img 
                    src={logoImg} 
                    alt="Gaur Travel - Safar aapka, saath hamara" 
                    style={{ height: '54px', width: 'auto', display: 'block', objectFit: 'contain' }} 
                  />
                </div>
              </a>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              India's premier tour guide and comprehensive tourism logistics platform. Crafting timeless memories with verified guides, luxury stays, private transit, and 24/7 care.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="#" className="social-icon-btn"><i className="fa-brands fa-facebook-f"></i></a>
              <a
                href="https://www.instagram.com/gaurtravel04?dlrf=bzZ6czBucG8yeW43"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-icon-btn"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="social-icon-btn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" className="social-icon-btn"><i className="fa-brands fa-youtube"></i></a>
              <a href="https://wa.me/919971859687" target="_blank" rel="noreferrer" className="social-icon-btn wa-btn">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="footer-link-group">
            <h4>Destinations</h4>
            <ul>
              <li><a href="#packages" onClick={() => onSelectRegion('north')}>North India (Kashmir &amp; Himachal)</a></li>
              <li><a href="#packages" onClick={() => onSelectRegion('west')}>West India (Rajasthan &amp; Gwalior)</a></li>
              <li><a href="#packages" onClick={() => onSelectRegion('south')}>South India (Kerala &amp; Munnar)</a></li>
              <li><a href="#packages" onClick={() => onSelectRegion('east')}>East India (Darjeeling &amp; Sikkim)</a></li>
            </ul>
          </div>

          <div className="footer-link-group">
            <h4>Highlights</h4>
            <ul>
              <li><a href="#highlights">Air Ticket Bookings</a></li>
              <li><a href="#highlights">Luxury Resort &amp; Hotel Stays</a></li>
              <li><a href="#highlights">City Tours &amp; Chauffeur Cabs</a></li>
              <li><a href="#highlights">Govt. Certified Tour Guides</a></li>
              <li><a href="#highlights">Airport Pick &amp; Drop Transfers</a></li>
              <li><a href="#highlights">Comprehensive Travel Insurance</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px' }}>
              Direct Support
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', marginBottom: '16px' }}>
              Have questions or ready to book? Speak directly with our senior travel coordinator:
            </p>

            <a
              href="tel:+919971859687"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '12px 16px',
                borderRadius: '10px',
                marginBottom: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <Phone size={22} color="#f59e0b" />
              <div>
                <small style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)' }}>Helpline</small>
                <strong style={{ color: '#ffffff', fontSize: '1.05rem' }}>+91 99718 59687</strong>
              </div>
            </a>

            <a
              href="mailto:gaur.tourtravel04@gmail.com"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.88rem'
              }}
            >
              <Mail size={20} color="#f59e0b" />
              <span>gaur.tourtravel04@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copy-subbar">
        <div className="container copy-flex-row">
          <p>&copy; 2026 Gaur Travel. All rights reserved. Crafted with passion for extraordinary journeys.</p>
          <div style={{ display: 'flex', gap: '14px' }}>
            <a href="#story">Privacy Policy</a>
            <span>•</span>
            <a href="#story">Terms of Service</a>
            <span>•</span>
            <a href="#contact">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
