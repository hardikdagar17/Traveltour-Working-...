import React from 'react';
import { Award, Phone, Mail, Quote } from 'lucide-react';

export default function StorySection({ isAccordion = false }) {
  return (
    <section className={`story-wrapper ${isAccordion ? 'is-in-accordion' : 'section-padding'}`} id={isAccordion ? undefined : 'story'}>
      <div className={isAccordion ? 'accordion-inner-container' : 'container'}>
        <div className="story-two-grid">
          {/* Left: Bio & Philosophy */}
          <div>
            <span className="section-badge-pill">WELCOME TO THE GAUR TRAVEL FAMILY</span>
            <h2 className="section-title">
              Hi, We are <span style={{ color: '#ea580c' }}>Gaur Travel!</span>
            </h2>
            <div className="story-lead-quote">
              ....TRAVEL, ....PASSION, ....LIFESTYLE
            </div>

            <p className="story-p">
              Born out of an uncompromising love for the diverse cultural tapestry of India, <strong>Gaur Travel</strong> was founded to transform ordinary vacations into legendary journeys. From the sun-bleached ramparts of Rajasthan's mighty forts to the quiet morning mist over Kashmir's Dal Lake, we believe travel is not just about visiting places—it is about feeling them deeply.
            </p>

            <p className="story-p">
              Unlike impersonal booking aggregators, we personally inspect every hotel room, hand-pick drivers with flawless safety records, and assign certified local historians who share secrets never found in guidebooks. When you travel with us, you are never just a booking number; you are our honored guest.
            </p>

            <div style={{
              background: '#ffffff',
              borderLeft: '4px solid #f59e0b',
              padding: '20px 24px',
              borderRadius: '0 12px 12px 0',
              boxShadow: 'var(--shadow-sm)',
              marginTop: '24px'
            }}>
              <Quote size={28} color="#f59e0b" style={{ opacity: 0.5, marginBottom: '6px' }} />
              <blockquote style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: '#0f172a', marginBottom: '8px' }}>
                "Our mission is simple: to make Gaur Travel the safest, most inspiring, and cherished tourism platform in India. Nothing else comes close."
              </blockquote>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0284c7' }}>
                — Team Gaur Travel <span style={{ color: '#64748b', fontWeight: 500 }}>(Lead Tour Directors &amp; Curators)</span>
              </div>
            </div>
          </div>

          {/* Right: Audraverse-Inspired Blue Fun Facts Card (Image 2) */}
          <div>
            <div className="audra-facts-card">
              <div className="audra-facts-header">
                <h3>FUN FACTS ABOUT GAUR TRAVEL</h3>
                <Award size={26} />
              </div>

              {/* Mobile Compact 2x3 Stat Grid (Mobile Screens Only) */}
              <div className="mobile-stats-grid">
                <div className="mobile-stat-tile">
                  <strong>100%</strong>
                  <span>Govt. Guides</span>
                </div>
                <div className="mobile-stat-tile">
                  <strong>100%</strong>
                  <span>Luxury Stays</span>
                </div>
                <div className="mobile-stat-tile">
                  <strong>100%</strong>
                  <span>Zero Hidden Fees</span>
                </div>
                <div className="mobile-stat-tile">
                  <strong>24/7</strong>
                  <span>Roadside Care</span>
                </div>
                <div className="mobile-stat-tile">
                  <strong>100%</strong>
                  <span>Custom Tours</span>
                </div>
                <div className="mobile-stat-tile">
                  <strong>15k+</strong>
                  <span>Happy Guests</span>
                </div>
              </div>

              {/* Desktop / Tablet Metric Progress Bars */}
              <div className="desktop-stat-bars">
                <div className="stat-metric-bar">
                  <div className="stat-label-row">
                  <span>Govt. Verified Guides</span>
                  <span>100%</span>
                </div>
                <div className="stat-track-line">
                  <div className="stat-fill-bar" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="stat-metric-bar">
                <div className="stat-label-row">
                  <span>Handpicked Luxury &amp; Heritage Stays</span>
                  <span>100%</span>
                </div>
                <div className="stat-track-line">
                  <div className="stat-fill-bar" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="stat-metric-bar">
                <div className="stat-label-row">
                  <span>Transparent Pricing (Zero Hidden Fees)</span>
                  <span>100%</span>
                </div>
                <div className="stat-track-line">
                  <div className="stat-fill-bar" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="stat-metric-bar">
                <div className="stat-label-row">
                  <span>24/7 Roadside &amp; Emergency Concierge</span>
                  <span>100%</span>
                </div>
                <div className="stat-track-line">
                  <div className="stat-fill-bar" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="stat-metric-bar">
                <div className="stat-label-row">
                  <span>Personalized Customized Itineraries</span>
                  <span>100%</span>
                </div>
                <div className="stat-track-line">
                  <div className="stat-fill-bar" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="stat-metric-bar">
                <div className="stat-label-row">
                  <span>Delighted Happy Travelers</span>
                  <span>15,000+</span>
                </div>
                <div className="stat-track-line">
                  <div className="stat-fill-bar" style={{ width: '98%' }}></div>
                </div>
              </div>
              </div>

              {/* Direct Instant Contact inside Card */}
              <div className="card-contact-footer-strip">
                <div className="footer-strip-col">
                  <Phone size={18} />
                  <div>
                    <small>Call Our Travel Desk</small>
                    <strong>+91 99718 59687</strong>
                  </div>
                </div>
                <div className="footer-strip-col">
                  <Mail size={18} />
                  <div>
                    <small>Official Email</small>
                    <strong>gaur.tourtravel04@gmail.com</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
