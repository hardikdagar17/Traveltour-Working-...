import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';

export default function GuidesSpotlight({ guides }) {
  return (
    <section className="guides-wrapper section-padding" id="guides">
      <div className="container">
        <div className="text-center">
          <span className="section-badge-pill">LOCAL STORYTELLERS</span>
          <h2 className="section-title">Meet Our Certified Tour Guides</h2>
          <p className="section-lead-text">
            Each guide is certified by the Ministry of Tourism, police-verified, and fluent in multiple languages.
          </p>
        </div>

        <div className="guides-four-grid">
          {guides && guides.map((guide) => (
            <div key={guide.id} className="guide-spotlight-card">
              <div className="guide-photo-box">
                <img src={guide.avatar} alt={guide.name} loading="lazy" />
                <span className="guide-pill-badge">
                  <ShieldCheck size={13} style={{ display: 'inline', marginRight: '3px' }} /> Certified
                </span>
              </div>

              <div className="guide-info-box">
                <h3>{guide.name}</h3>
                <span className="guide-region-spec">{guide.region}</span>
                <p className="guide-bio-text">{guide.bio}</p>

                <div className="guide-tags-strip">
                  {guide.languages && guide.languages.map((lang, idx) => (
                    <span key={idx}>{lang}</span>
                  ))}
                  <span style={{ background: '#fef3c7', color: '#b45309', fontWeight: 800 }}>
                    ⭐ {guide.rating} ({guide.toursCount}+ Tours)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
