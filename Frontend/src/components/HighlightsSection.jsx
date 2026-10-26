import React, { useState } from 'react';
import { Plane, Hotel, Car, Compass, MapPin, ShieldAlert, PhoneCall, LayoutGrid, Table } from 'lucide-react';

const HIGHLIGHT_SERVICES = [
  {
    id: 'flights',
    icon: <Plane size={26} />,
    title: 'Air Tickets',
    desc: 'Domestic & international flights at unadvertised corporate partner rates.',
    tag: 'Instant Confirm'
  },
  {
    id: 'hotels',
    icon: <Hotel size={26} />,
    title: 'Hotels',
    desc: 'Heritage Havelis, 5-star resorts, private villas & cozy mountain cottages.',
    tag: 'Verified Hygiene'
  },
  {
    id: 'cabs',
    icon: <Car size={26} />,
    title: 'City Tour',
    desc: 'AC Sedans, luxury Innova Crysta & tempo travellers with polite chauffeurs.',
    tag: 'Chauffeur Driven'
  },
  {
    id: 'guides',
    icon: <Compass size={26} />,
    title: 'Guide',
    desc: 'Govt.-certified multilingual historians bringing monuments alive.',
    tag: 'Govt. Certified'
  },
  {
    id: 'transfers',
    icon: <MapPin size={26} />,
    title: 'Pick & Drop',
    desc: 'Punctual 24/7 airport, railway station & intercity door-to-door transit.',
    tag: 'Zero Wait Time'
  },
  {
    id: 'insurance',
    icon: <ShieldAlert size={26} />,
    title: 'Travel Insurance',
    desc: 'Comprehensive medical, baggage, flight delay & emergency coverage.',
    tag: '100% Peace of Mind'
  }
];

export default function HighlightsSection({ onSelectService }) {
  const [mobileMode, setMobileMode] = useState('grid'); // 'grid' | 'table'

  return (
    <section className="highlights-wrapper section-padding" id="highlights">
      <div className="container text-center">
        {/* Chalk Divider Header matching Image 1 */}
        <div className="highlights-chalk-header">
          <span className="chalk-line"></span>
          <h2 className="highlights-title-text">HIGHLIGHTS</h2>
          <span className="chalk-line"></span>
        </div>

        <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
          Comprehensive all-in-one travel logistics engineered for comfort and seamless luxury
        </p>

        {/* Mobile View Toggle (Mobile Screens Only) */}
        <div className="mobile-view-toggle-bar highlights-toggle">
          <span className="toggle-label" style={{ color: '#ffffff' }}>Services View:</span>
          <div className="toggle-pill-group">
            <button
              type="button"
              className={`toggle-pill-btn ${mobileMode === 'grid' ? 'active' : ''}`}
              onClick={() => setMobileMode('grid')}
            >
              <LayoutGrid size={13} />
              <span>Compact Grid</span>
            </button>
            <button
              type="button"
              className={`toggle-pill-btn ${mobileMode === 'table' ? 'active' : ''}`}
              onClick={() => setMobileMode('table')}
            >
              <Table size={13} />
              <span>Services Table</span>
            </button>
          </div>
        </div>

        {/* Mobile Services Table View */}
        {mobileMode === 'table' && (
          <div className="services-table-wrapper mobile-only-table">
            <table className="compact-services-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Coverage &amp; Standard</th>
                  <th>Assurance</th>
                </tr>
              </thead>
              <tbody>
                {HIGHLIGHT_SERVICES.map((srv) => (
                  <tr key={srv.id} onClick={() => onSelectService(srv.title)}>
                    <td className="srv-table-name">
                      <span className="srv-table-icon">{srv.icon}</span>
                      <strong>{srv.title}</strong>
                    </td>
                    <td className="srv-table-desc">{srv.desc}</td>
                    <td className="srv-table-tag">
                      <span className="service-mini-tag">{srv.tag}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* The 6 Iconic Badges from Image 1 (Desktop + Mobile Compact 3x2 Grid) */}
        <div className={`highlights-six-grid ${mobileMode === 'table' ? 'hide-on-mobile' : ''}`}>
          {HIGHLIGHT_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="highlight-service-card"
              onClick={() => onSelectService(srv.title)}
            >
              <div className="highlight-icon-bubble">
                {srv.icon}
              </div>
              <h3 className="highlight-card-title">{srv.title}</h3>
              <p className="highlight-card-desc">{srv.desc}</p>
              <span className="service-pill-tag">{srv.tag}</span>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="highlights-banner-box">
          <div>
            <h4 className="highlights-banner-title">
              Need a personalized combination for your trip?
            </h4>
            <p className="highlights-banner-desc">
              Our senior tour architects can build an all-inclusive custom itinerary in 30 minutes.
            </p>
          </div>
          <a
            href="tel:+919971859687"
            className="btn btn-gold highlights-banner-btn"
          >
            <PhoneCall size={18} />
            <span>Call +91 99718 59687</span>
          </a>
        </div>
      </div>
    </section>
  );
}
