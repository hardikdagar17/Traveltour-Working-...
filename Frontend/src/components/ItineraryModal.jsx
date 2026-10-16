import React from 'react';
import { X, Hotel, Car, Compass, Utensils, Route, Phone } from 'lucide-react';

export default function ItineraryModal({ pkg, isOpen, onClose, formatPrice }) {
  if (!isOpen || !pkg) return null;

  const handleWhatsAppBooking = () => {
    const text = `Hi Gaur Travels (+91 99718 59687)!
I want to book the tour package:
• ${pkg.title} (${pkg.duration})
• Price: ₹${pkg.priceINR ? pkg.priceINR.toLocaleString() : ''} / person

Please share available upcoming departure dates and hotel options.`;

    window.open(`https://wa.me/919971859687?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="modal-overlay-bg" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-cross" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Banner */}
        <div style={{
          position: 'relative',
          padding: '40px 32px 30px',
          color: '#ffffff',
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.95)), url('${pkg.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '24px 24px 0 0'
        }}>
          <span style={{
            background: '#f59e0b',
            color: '#0f172a',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: '999px',
            textTransform: 'uppercase'
          }}>
            {pkg.region.toUpperCase()} INDIA
          </span>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 900, marginTop: '8px', marginBottom: '6px' }}>
            {pkg.title}
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem' }}>
            {pkg.duration} • All-Inclusive Logistics &amp; 24/7 Coordinator Support
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px 32px' }}>
          {/* Specs Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            padding: '14px',
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
              <Hotel size={16} color="#0284c7" /> <span>4/5-Star Stay</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
              <Car size={16} color="#0284c7" /> <span>AC Innova Cab</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
              <Compass size={16} color="#0284c7" /> <span>Govt. Guide</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', fontWeight: 600, color: '#334155' }}>
              <Utensils size={16} color="#0284c7" /> <span>Daily Breakfast</span>
            </div>
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Route size={20} color="#0284c7" /> Day-by-Day Journey Plan
          </h4>

          {/* Timeline */}
          <div className="itinerary-day-list">
            {pkg.itinerary && pkg.itinerary.map((dayPlan, i) => (
              <div key={i} className="day-step-entry">
                <div className="day-step-bullet"></div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase' }}>
                  {dayPlan.day ? `Day ${dayPlan.day}` : `Day ${i + 1}`}
                </div>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px' }}>
                  {dayPlan.title}
                </h5>
                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5 }}>
                  {dayPlan.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Action Strip */}
          <div style={{
            background: '#0f172a',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '24px'
          }}>
            <div>
              <small style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Starting Package Rate:</small>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fde047', margin: 0 }}>
                {formatPrice(pkg.priceINR)} <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 500 }}>/ person</span>
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-gold"
                onClick={handleWhatsAppBooking}
              >
                <i className="fa-brands fa-whatsapp"></i> Reserve on WhatsApp
              </button>
              <a
                href="tel:+919971859687"
                className="btn btn-outline"
                style={{ background: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
              >
                <Phone size={16} /> Call +91 99718 59687
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
