import React from 'react';
import { Star, Clock, Check, Eye } from 'lucide-react';

export default function PackageExplorer({
  packages,
  activeFilter,
  onFilterChange,
  currency,
  formatPrice,
  onViewPlan,
  onBookTour
}) {
  return (
    <section className="packages-wrapper section-padding" id="packages">
      <div className="container">
        <div className="text-center">
          <span className="section-badge-pill">HANDCRAFTED EXPERIENCES</span>
          <h2 className="section-title">India's Most Loved Tour Itineraries</h2>
          <p className="section-lead-text">
            Transparent pricing, verified luxury stays, chauffeur-driven sanitised vehicles, and top-rated guides.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="category-tab-filters">
          <button
            type="button"
            className={`tab-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All Packages
          </button>
          <button
            type="button"
            className={`tab-filter-btn ${activeFilter === 'north' ? 'active' : ''}`}
            onClick={() => onFilterChange('north')}
          >
            North India
          </button>
          <button
            type="button"
            className={`tab-filter-btn ${activeFilter === 'south' ? 'active' : ''}`}
            onClick={() => onFilterChange('south')}
          >
            South India
          </button>
          <button
            type="button"
            className={`tab-filter-btn ${activeFilter === 'west' ? 'active' : ''}`}
            onClick={() => onFilterChange('west')}
          >
            West India
          </button>
          <button
            type="button"
            className={`tab-filter-btn ${activeFilter === 'east' ? 'active' : ''}`}
            onClick={() => onFilterChange('east')}
          >
            East India
          </button>
        </div>

        {/* Packages Cards Grid */}
        <div className="package-cards-grid">
          {packages && packages.map((pkg) => (
            <div key={pkg.id} className="tour-pkg-card">
              <div className="pkg-media-wrap">
                <img src={pkg.image} alt={pkg.title} loading="lazy" />
                <span className="pkg-duration-badge">
                  <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {pkg.duration}
                </span>
                <span className="pkg-rating-badge">
                  <Star size={13} fill="#d97706" color="#d97706" style={{ display: 'inline', marginRight: '4px' }} />
                  {pkg.rating} ({pkg.reviews})
                </span>
              </div>

              <div className="pkg-content-wrap">
                <span className="pkg-region-name">{pkg.region.toUpperCase()} INDIA</span>
                <h3 className="pkg-title-text">{pkg.title}</h3>

                <div className="pkg-inclusions-row">
                  {pkg.inclusions && pkg.inclusions.slice(0, 3).map((inc, i) => (
                    <span key={i} className="inclusion-chip">
                      <Check size={12} /> {inc}
                    </span>
                  ))}
                </div>

                <p className="pkg-summary-desc">{pkg.highlights}</p>

                <div className="pkg-footer-row">
                  <div className="pkg-price-unit">
                    <small>Starting From</small>
                    <strong>
                      {formatPrice(pkg.priceINR)}
                      <span> / person</span>
                    </strong>
                  </div>

                  <div className="pkg-actions-group">
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ padding: '8px 14px', fontSize: '0.84rem' }}
                      onClick={() => onViewPlan(pkg)}
                    >
                      <Eye size={15} /> Plan
                    </button>
                    <button
                      type="button"
                      className="btn btn-gold"
                      style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                      onClick={() => onBookTour(pkg)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
