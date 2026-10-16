import React from 'react';
import { Phone, Mail, ShieldCheck, Globe } from 'lucide-react';

export default function TopBar({ currency, onCurrencyChange }) {
  return (
    <div className="top-bar-wrapper">
      <div className="container top-bar-container">
        <div className="top-contact-links">
          <a href="tel:+919971859687" className="top-link-item">
            <Phone size={15} className="phone-highlight" />
            <span>Call: <strong className="phone-highlight">+91 99718 59687</strong></span>
          </a>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <a href="mailto:gaur.tourtravel04@gmail.com" className="top-link-item">
            <Mail size={15} style={{ color: '#0284c7' }} />
            <span>gaur.tourtravel04@gmail.com</span>
          </a>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <span className="verified-trust-badge">
            <ShieldCheck size={14} /> Ministry of Tourism Certified
          </span>
        </div>

        <div className="top-actions-right">
          <div className="currency-select-box">
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
            <span>FOLLOW US:</span>
            <a href="#" aria-label="Facebook" className="social-icon-btn"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram" className="social-icon-btn"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn" className="social-icon-btn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" aria-label="YouTube" className="social-icon-btn"><i className="fa-brands fa-youtube"></i></a>
            <a
              href="https://wa.me/919971859687?text=Hello%20Gaur%20Travels,%20I%20am%20interested%20in%20planning%20a%20tour!"
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
  );
}
