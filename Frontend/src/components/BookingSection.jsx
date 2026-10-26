import React, { useState } from 'react';
import { Phone, Mail, Clock, ShieldCheck, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitBooking } from '../services/api';

export default function BookingSection({ onBookingConfirmed }) {
  const [mobileTab, setMobileTab] = useState('form'); // 'form' | 'channels'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: 'North India - Kashmir & Ladakh',
    travelDate: '',
    guests: 2,
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    try {
      const res = await submitBooking({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        packageTitle: formData.destination,
        travelDate: formData.travelDate,
        guests: formData.guests,
        notes: formData.notes
      });

      if (res.success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        if (onBookingConfirmed) {
          onBookingConfirmed(res);
        }

        setFormData({
          name: '',
          phone: '',
          email: '',
          destination: 'North India - Kashmir & Ladakh',
          travelDate: '',
          guests: 2,
          notes: ''
        });
      }
    } catch (err) {
      console.error('Booking submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking-section-wrapper section-padding" id="contact">
      <div className="container">
        {/* Mobile View Toggle Bar (Mobile Screens Only) */}
        <div className="mobile-view-toggle-bar booking-toggle">
          <span className="toggle-label">Booking Mode:</span>
          <div className="toggle-pill-group">
            <button
              type="button"
              className={`toggle-pill-btn ${mobileTab === 'form' ? 'active' : ''}`}
              onClick={() => setMobileTab('form')}
            >
              <Send size={13} />
              <span>Itinerary Form</span>
            </button>
            <button
              type="button"
              className={`toggle-pill-btn ${mobileTab === 'channels' ? 'active' : ''}`}
              onClick={() => setMobileTab('channels')}
            >
              <Phone size={13} />
              <span>Direct Helplines</span>
            </button>
          </div>
        </div>

        <div className="booking-split-panel">
          {/* Left: Contact Info (Visible on desktop + on mobile when 'channels' active) */}
          <div className={`booking-info-pane ${mobileTab === 'form' ? 'hide-on-mobile' : ''}`}>
            <span className="section-badge-pill" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fde047' }}>
              DIRECT REACH
            </span>
            <h2 className="booking-pane-title">
              Let’s Plan Your Next Grand Adventure
            </h2>
            <p className="booking-pane-desc">
              Speak directly with our senior travel curators or send an instant inquiry. We guarantee a detailed itinerary and transparent pricing within 30 minutes.
            </p>

            <div className="booking-contact-channels">
              <div className="channel-line-item">
                <div className="channel-bubble"><Phone size={20} /></div>
                <div className="channel-text-info">
                  <span>Call Directly / 24x7 Helpline:</span>
                  <a href="tel:+919971859687" style={{ color: '#ffffff' }}>
                    <strong>+91 99718 59687</strong>
                  </a>
                </div>
              </div>

              <div className="channel-line-item">
                <div className="channel-bubble" style={{ background: '#25d366', color: '#fff' }}>
                  <i className="fa-brands fa-whatsapp"></i>
                </div>
                <div className="channel-text-info">
                  <span>Instant WhatsApp Desk:</span>
                  <a href="https://wa.me/919971859687?text=Hi%20Gaur%20Travel,%20I%20would%20like%20to%20plan%20a%20tour" target="_blank" rel="noreferrer" style={{ color: '#ffffff' }}>
                    <strong>Chat on +91 99718 59687</strong>
                  </a>
                </div>
              </div>

              <div className="channel-line-item">
                <div className="channel-bubble"><Mail size={20} /></div>
                <div className="channel-text-info">
                  <span>Email Inquiries:</span>
                  <a href="mailto:gaur.tourtravel04@gmail.com" style={{ color: '#ffffff' }}>
                    <strong>gaur.tourtravel04@gmail.com</strong>
                  </a>
                </div>
              </div>

              <div className="channel-line-item">
                <div className="channel-bubble" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff' }}>
                  <i className="fa-brands fa-instagram"></i>
                </div>
                <div className="channel-text-info">
                  <span>Official Instagram:</span>
                  <a href="https://www.instagram.com/gaurtravel04?dlrf=bzZ6czBucG8yeW43" target="_blank" rel="noreferrer" style={{ color: '#fde047' }}>
                    <strong>@gaurtravel04</strong>
                  </a>
                </div>
              </div>

              <div className="channel-line-item">
                <div className="channel-bubble"><Clock size={20} /></div>
                <div className="channel-text-info">
                  <span>Operating Hours:</span>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0, fontSize: '0.9rem' }}>
                    Mon - Sun: 7:00 AM - 11:30 PM (Emergency Assistance: 24/7)
                  </p>
                </div>
              </div>
            </div>

            <div className="booking-trust-guarantee">
              <ShieldCheck size={28} color="#4ade80" />
              <div>
                <strong style={{ display: 'block', fontSize: '0.88rem' }}>100% Privacy &amp; Data Protected</strong>
                <small style={{ color: 'rgba(255, 255, 255, 0.65)' }}>No spam. Your info is never shared with third parties.</small>
              </div>
            </div>
          </div>

          {/* Right: Booking Form (Visible on desktop + on mobile when 'form' active) */}
          <div className={`booking-form-pane ${mobileTab === 'channels' ? 'hide-on-mobile' : ''}`}>
            <h3 className="booking-form-title">
              Request Free Custom Itinerary
            </h3>
            <p className="booking-form-desc">
              Fill out the form below and our team will get back to you promptly.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-two-grid">
                <div className="form-single-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-single-group">
                  <label>Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-two-grid">
                <div className="form-single-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-single-group">
                  <label>Dream Destination *</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  >
                    <option value="North India - Kashmir & Ladakh">North India - Kashmir &amp; Ladakh</option>
                    <option value="West India - Rajasthan & Gwalior">West India - Rajasthan &amp; Gwalior</option>
                    <option value="South India - Kerala & Munnar">South India - Kerala &amp; Munnar</option>
                    <option value="East India - Darjeeling & Sikkim">East India - Darjeeling &amp; Sikkim</option>
                    <option value="Golden Triangle - Delhi, Agra, Jaipur">Golden Triangle - Delhi, Agra, Jaipur</option>
                    <option value="Custom Multi-City Tour">Custom Multi-City Tour</option>
                  </select>
                </div>
              </div>

              <div className="form-two-grid">
                <div className="form-single-group">
                  <label>Tentative Travel Date</label>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  />
                </div>
                <div className="form-single-group">
                  <label>Number of Travelers</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                  >
                    <option value={2}>2 Adults (Couple)</option>
                    <option value={3}>3 to 5 Adults (Family)</option>
                    <option value={1}>Solo Traveler</option>
                    <option value={6}>Group 6+ Travelers</option>
                  </select>
                </div>
              </div>

              <div className="form-single-group">
                <label>Special Preferences / Sightseeing Notes</label>
                <textarea
                  rows="3"
                  placeholder="Preferences like luxury stay, pure veg food, specific fort visits, vehicle type..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold btn-block booking-submit-btn"
              >
                <Send size={18} />
                <span>{loading ? 'Submitting to Backend...' : 'Get Instant Free Quote & Itinerary'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
