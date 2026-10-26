import React from 'react';
import { Phone, Mail, ShieldCheck, Globe } from 'lucide-react';

export default function TopBar({ currency, onCurrencyChange }) {
  return (
    <div className="top-bar-wrapper">
      <div className="container top-bar-container">
        {/* Left Side: Contact & Trust */}
        <div className="top-contact-links">
          <a href="tel:+919971859687" className="top-link-item top-link-phone" aria-label="Call Gaur Travel">
            <span className="top-icon-pill phone-icon-pill">
              <Phone size={13} />
            </span>
            <span className="top-phone-text">
              <span className="top-call-label">Call: </span>
              <strong>+91 99718 59687</strong>
            </span>
          </a>

          <span className="top-bar-divider" aria-hidden="true" />

          <a href="mailto:gaur.tourtravel04@gmail.com" className="top-link-item top-link-email" aria-label="Email Gaur Travel">
            <span className="top-icon-pill mail-icon-pill">
              <Mail size={13} />
            </span>
            <span className="top-email-full">gaur.tourtravel04@gmail.com</span>
            <span className="top-email-short">Email Us</span>
          </a>

          <span className="top-bar-divider" aria-hidden="true" />

          <span className="verified-trust-badge">
            <ShieldCheck size={14} className="shield-icon" />
            <span className="badge-text-full">Ministry of Tourism Certified</span>
            <span className="badge-text-short">Govt. Certified</span>
          </span>
        </div>

        {/* Right Side: Currency & Socials */}
        <div className="top-actions-right">
          <div className="currency-select-box">
            <Globe size={13} className="currency-globe-icon" />
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              aria-label="Currency Selector"
            >
              <option value="INR">₹ INR (India)</option>
              <option value="USD">$ USD (Global)</option>
              <option value="EUR">€ EUR (Europe)</option>
            </select>
          </div>

          <div className="social-strip">
            <span className="social-label">FOLLOW US:</span>
            <div className="social-icons-group">
              <a href="#" aria-label="Facebook" className="social-icon-btn"><i className="fa-brands fa-facebook-f"></i></a>
              <a
                href="https://www.instagram.com/gaurtravel04?dlrf=bzZ6czBucG8yeW43"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Gaur Travel on Instagram"
                className="social-icon-btn"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-icon-btn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="YouTube" className="social-icon-btn"><i className="fa-brands fa-youtube"></i></a>
              <a
                href="https://wa.me/919971859687?text=Hello%20Gaur%20Travel,%20I%20am%20interested%20in%20planning%20a%20tour!"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="social-icon-btn wa-btn"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
