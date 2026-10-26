import React, { useState } from 'react';
import { Star, Clock, Check, Eye, LayoutGrid, Table, ArrowRight } from 'lucide-react';

export default function PackageExplorer({
  packages,
  activeFilter,
  onFilterChange,
  currency,
  formatPrice,
  onViewPlan,
  onBookTour
}) {
  const [mobileView, setMobileView] = useState('table'); // default 'table' on mobile for instant compact view
  const [showAllCardsMobile, setShowAllCardsMobile] = useState(false);

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

        {/* Mobile View Mode Toggle (Mobile Screens Only) */}
        <div className="mobile-view-toggle-bar">
          <span className="toggle-label">Packages View:</span>
          <div className="toggle-pill-group">
            <button
              type="button"
              className={`toggle-pill-btn ${mobileView === 'grid' ? 'active' : ''}`}
              onClick={() => setMobileView('grid')}
            >
              <LayoutGrid size={13} />
              <span>Cards View</span>
            </button>
            <button
              type="button"
              className={`toggle-pill-btn ${mobileView === 'table' ? 'active' : ''}`}
              onClick={() => setMobileView('table')}
            >
              <Table size={13} />
              <span>Comparison Table</span>
            </button>
          </div>
        </div>

        {/* Mobile Packages Comparison Table View */}
        {mobileView === 'table' && (
          <div className="packages-table-wrapper mobile-only-table">
            <table className="compact-packages-table">
              <thead>
                <tr>
                  <th>Tour Package</th>
                  <th>Duration</th>
                  <th>Starting Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {packages && packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td className="pkg-table-title-cell">
                      <strong>{pkg.title}</strong>
                      <span className="pkg-table-region">{pkg.region.toUpperCase()} • ★ {pkg.rating}</span>
                    </td>
                    <td className="pkg-table-duration">
                      <Clock size={12} />
                      <span>{pkg.duration}</span>
                    </td>
                    <td className="pkg-table-price">
                      <strong>{formatPrice(pkg.priceINR)}</strong>
                      <small>/person</small>
                    </td>
                    <td className="pkg-table-action-cell">
                      <div className="pkg-table-btn-stack">
                        <button
                          type="button"
                          className="table-mini-btn outline"
                          onClick={() => onViewPlan(pkg)}
                          aria-label={`View plan for ${pkg.title}`}
                        >
                          Plan
                        </button>
                        <button
                          type="button"
                          className="table-mini-btn gold"
                          onClick={() => onBookTour(pkg)}
                          aria-label={`Book ${pkg.title}`}
                        >
                          Book
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Packages Cards Grid (Desktop + Mobile Cards View) */}
        <div className={`package-cards-grid ${mobileView === 'table' ? 'hide-on-mobile' : ''}`}>
          {packages && (showAllCardsMobile ? packages : packages.slice(0, 3)).map((pkg) => (
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

        {/* Mobile Show More / Show Less Toggle for Cards */}
        {mobileView === 'grid' && packages && packages.length > 3 && (
          <div className="mobile-show-more-card-bar">
            <button
              type="button"
              className="btn btn-outline mobile-show-toggle-btn"
              onClick={() => setShowAllCardsMobile(!showAllCardsMobile)}
            >
              {showAllCardsMobile ? 'Show Top 3 Packages' : `View All (${packages.length}) Packages`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
