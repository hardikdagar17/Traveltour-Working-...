import React, { useState } from 'react';
import { Award, Users, Star, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';
import StorySection from './StorySection';
import GuidesSpotlight from './GuidesSpotlight';
import ReviewsSection from './ReviewsSection';

export default function MobileTrustHub({ guides, reviews, onNewReviewAdded }) {
  // Collapsed by default on mobile so the page stays ultra-compact
  const [openAccordion, setOpenAccordion] = useState(null); // 'story' | 'guides' | 'reviews' | null

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div className="mobile-trust-hub-wrapper">
      <div className="container">
        <div className="mobile-trust-hub-header">
          <span className="section-badge-pill">
            <Sparkles size={12} /> TRUST &amp; REPUTATION
          </span>
          <h2 className="section-title">Explore Why India Trusts Us</h2>
          <p className="section-lead-text">
            Tap below to inspect our track record, certified local guides, or verified traveler ratings.
          </p>
        </div>

        <div className="mobile-accordion-stack">
          {/* 1. Why Gaur Travel & Track Record */}
          <div className={`mobile-accordion-card ${openAccordion === 'story' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="mobile-acc-trigger-btn"
              onClick={() => toggleAccordion('story')}
              aria-expanded={openAccordion === 'story'}
            >
              <div className="acc-trigger-left">
                <div className="acc-icon-badge gold-badge">
                  <Award size={18} />
                </div>
                <div className="acc-text-wrap">
                  <div className="acc-title-row">
                    <strong>Why Gaur Travel</strong>
                    <span className="acc-mini-pill">99.4% SATISFACTION</span>
                  </div>
                  <span className="acc-subtitle">
                    Founder's note, sanitised fleet &amp; verified track record
                  </span>
                </div>
              </div>
              <div className="acc-trigger-chevron">
                {openAccordion === 'story' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            {openAccordion === 'story' && (
              <div className="mobile-acc-expand-content">
                <StorySection isAccordion={true} />
              </div>
            )}
          </div>

          {/* 2. Certified Tour Guides */}
          <div className={`mobile-accordion-card ${openAccordion === 'guides' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="mobile-acc-trigger-btn"
              onClick={() => toggleAccordion('guides')}
              aria-expanded={openAccordion === 'guides'}
            >
              <div className="acc-trigger-left">
                <div className="acc-icon-badge cyan-badge">
                  <Users size={18} />
                </div>
                <div className="acc-text-wrap">
                  <div className="acc-title-row">
                    <strong>Meet Our Tour Guides</strong>
                    <span className="acc-mini-pill green-pill">GOVT. CERTIFIED</span>
                  </div>
                  <span className="acc-subtitle">
                    Police-verified, multilingual regional historians
                  </span>
                </div>
              </div>
              <div className="acc-trigger-chevron">
                {openAccordion === 'guides' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            {openAccordion === 'guides' && (
              <div className="mobile-acc-expand-content">
                <GuidesSpotlight guides={guides} isAccordion={true} />
              </div>
            )}
          </div>

          {/* 3. Verified Traveler Reviews */}
          <div className={`mobile-accordion-card ${openAccordion === 'reviews' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="mobile-acc-trigger-btn"
              onClick={() => toggleAccordion('reviews')}
              aria-expanded={openAccordion === 'reviews'}
            >
              <div className="acc-trigger-left">
                <div className="acc-icon-badge star-badge">
                  <Star size={18} />
                </div>
                <div className="acc-text-wrap">
                  <div className="acc-title-row">
                    <strong>Traveler Reviews &amp; Ratings</strong>
                    <span className="acc-mini-pill yellow-pill">★ 4.9 (1,200+)</span>
                  </div>
                  <span className="acc-subtitle">
                    Real stories and photos from happy explorers
                  </span>
                </div>
              </div>
              <div className="acc-trigger-chevron">
                {openAccordion === 'reviews' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </button>

            {openAccordion === 'reviews' && (
              <div className="mobile-acc-expand-content">
                <ReviewsSection
                  reviews={reviews}
                  onNewReviewAdded={onNewReviewAdded}
                  isAccordion={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
