import React from 'react';
import { X, CheckCircle2, Phone, Calendar, User, Hash } from 'lucide-react';

export default function BookingSuccessModal({ bookingResult, isOpen, onClose }) {
  if (!isOpen || !bookingResult) return null;

  const { bookingRef, booking, whatsappUrl } = bookingResult;

  return (
    <div className="modal-overlay-bg" onClick={onClose}>
      <div className="modal-content-card" style={{ maxWidth: '520px', textAlign: 'center', padding: '36px 32px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-cross" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#dcfce7',
          color: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <CheckCircle2 size={36} />
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
          Booking Inquiry Confirmed!
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '20px' }}>
          Your itinerary request is saved in the Gaur Travels reservation database.
        </p>

        {/* Voucher Badge */}
        <div style={{
          background: '#f8fafc',
          border: '1.5px dashed #0284c7',
          borderRadius: '14px',
          padding: '18px',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>RESERVATION REFERENCE</span>
            <strong style={{ fontSize: '1.2rem', color: '#0284c7', letterSpacing: '1px' }}>{bookingRef}</strong>
          </div>

          {booking && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem', color: '#334155' }}>
              <div><strong>Traveler:</strong> {booking.name} ({booking.phone})</div>
              <div><strong>Package:</strong> {booking.packageTitle}</div>
              {booking.travelDate && <div><strong>Date:</strong> {booking.travelDate}</div>}
              <div><strong>Travelers:</strong> {booking.guests} Guest(s)</div>
            </div>
          )}
        </div>

        <p style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700, marginBottom: '20px' }}>
          ⚡ A Senior Tour Architect will call you on <strong>{booking ? booking.phone : ''}</strong> within 30 minutes!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-gold btn-block"
              style={{ padding: '14px' }}
            >
              <i className="fa-brands fa-whatsapp"></i> Chat With Coordinator On WhatsApp
            </a>
          )}
          <a
            href="tel:+919971859687"
            className="btn btn-outline btn-block"
            style={{ padding: '12px' }}
          >
            <Phone size={16} /> Instant Helpline: +91 99718 59687
          </a>
        </div>
      </div>
    </div>
  );
}
