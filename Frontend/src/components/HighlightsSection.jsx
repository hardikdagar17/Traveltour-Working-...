import React from 'react';
import { Plane, Hotel, Car, Compass, MapPin, ShieldAlert, PhoneCall } from 'lucide-react';

const HIGHLIGHT_SERVICES = [
  {
    id: 'flights',
    icon: <Plane size={30} />,
    title: 'Air Tickets',
    desc: 'Domestic & international flights at unadvertised corporate partner rates.',
    tag: 'Instant Confirm'
  },
  {
    id: 'hotels',
    icon: <Hotel size={30} />,
    title: 'Hotels',
    desc: 'Heritage Havelis, 5-star resorts, private villas & cozy mountain cottages.',
    tag: 'Verified Hygiene'
  },
  {
    id: 'cabs',
    icon: <Car size={30} />,
    title: 'City Tour',
    desc: 'AC Sedans, luxury Innova Crysta & tempo travellers with polite chauffeurs.',
    tag: 'Chauffeur Driven'
  },
  {
    id: 'guides',
    icon: <Compass size={30} />,
    title: 'Guide',
    desc: 'Govt.-certified multilingual historians bringing monuments alive.',
    tag: 'Govt. Certified'
  },
  {
    id: 'transfers',
    icon: <MapPin size={30} />,
    title: 'Pick & Drop',
    desc: 'Punctual 24/7 airport, railway station & intercity door-to-door transit.',
    tag: 'Zero Wait Time'
  },
  {
    id: 'insurance',
    icon: <ShieldAlert size={30} />,
    title: 'Travel Insurance',
    desc: 'Comprehensive medical, baggage, flight delay & emergency coverage.',
    tag: '100% Peace of Mind'
  }
];

export default function HighlightsSection({ onSelectService }) {
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

        {/* The 6 Iconic Badges from Image 1 */}
        <div className="highlights-six-grid">
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
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '24px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          textAlign: 'left'
        }}>
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '4px' }}>
              Need a personalized combination for your trip?
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.92rem', margin: 0 }}>
              Our senior tour architects can build an all-inclusive custom itinerary in 30 minutes.
            </p>
          </div>
          <a
            href="tel:+919971859687"
            className="btn btn-gold"
            style={{ padding: '12px 24px' }}
          >
            <PhoneCall size={18} />
            <span>Call +91 99718 59687</span>
          </a>
        </div>
      </div>
    </section>
  );
}
