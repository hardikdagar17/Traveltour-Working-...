import React, { useState } from 'react';
import { ChevronsRight, Crown, Snowflake, Waves, Leaf, LayoutGrid, Table, ArrowUpRight } from 'lucide-react';

export default function DestinationsSection({ destinations, onSelectRegion, onBookNow }) {
  const [mobileViewMode, setMobileViewMode] = useState('grid'); // 'grid' | 'table'

  const getBadgeIcon = (id) => {
    switch (id) {
      case 'west': return <Crown size={14} />;
      case 'north': return <Snowflake size={14} />;
      case 'south': return <Waves size={14} />;
      case 'east': return <Leaf size={14} />;
      default: return null;
    }
  };

  return (
    <section className="destinations-wrapper section-padding" id="destinations">
      <div className="container text-center">
        <h2 className="vintage-travel-title">TRAVEL YOU DREAM</h2>

        {/* The Cloud / Wave Badge from Image 1 */}
        <div>
          <div className="cloud-badge-ribbon">
            DESTINATIONS
          </div>
        </div>

        <p className="section-lead-text">
          Explore India's four magnificent corners with tailor-made itineraries crafted by true local experts.
        </p>

        {/* Mobile View Toggle: Grid vs Table (Visible on Mobile Screens Only) */}
        <div className="mobile-view-toggle-bar">
          <span className="toggle-label">View Places As:</span>
          <div className="toggle-pill-group">
            <button
              type="button"
              className={`toggle-pill-btn ${mobileViewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setMobileViewMode('grid')}
            >
              <LayoutGrid size={14} />
              <span>2x2 Grid</span>
            </button>
            <button
              type="button"
              className={`toggle-pill-btn ${mobileViewMode === 'table' ? 'active' : ''}`}
              onClick={() => setMobileViewMode('table')}
            >
              <Table size={14} />
              <span>Quick Table</span>
            </button>
          </div>
        </div>

        {/* Table View (Mobile Screens Only when selected) */}
        {mobileViewMode === 'table' && (
          <div className="destinations-table-wrapper mobile-only-table">
            <table className="compact-places-table">
              <thead>
                <tr>
                  <th>Place / Region</th>
                  <th>Top Attractions</th>
                  <th>Tours</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {destinations && destinations.map((dest) => (
                  <tr key={dest.id} onClick={() => onSelectRegion(dest.id)}>
                    <td className="place-col-title">
                      <div className="place-name-flex">
                        <span className="place-badge-icon">{getBadgeIcon(dest.id)}</span>
                        <strong>{dest.name}</strong>
                      </div>
                      <span className="place-subtag">{dest.badge}</span>
                    </td>
                    <td className="place-col-spots">
                      {dest.spots ? dest.spots.slice(0, 3).join(', ') : ''}
                    </td>
                    <td className="place-col-tours">
                      <span className="tour-count-pill">{dest.packagesCount} Tours</span>
                    </td>
                    <td className="place-col-action">
                      <button
                        type="button"
                        className="table-explore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRegion(dest.id);
                        }}
                      >
                        <span>View</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* The 4 Regional Cards Grid (Desktop default + Mobile 2x2 Grid) */}
        <div className={`destinations-cards-grid ${mobileViewMode === 'table' ? 'hide-on-mobile' : ''}`}>
          {destinations && destinations.map((dest) => (
            <div
              key={dest.id}
              className="destination-portrait-card"
              onClick={() => onSelectRegion(dest.id)}
            >
              <div className="card-media-frame">
                <img src={dest.image} alt={dest.name} loading="lazy" />
                <div className="card-hover-overlay">
                  <div className="overlay-badge">
                    {getBadgeIcon(dest.id)} {dest.badge}
                  </div>
                  <div>
                    <p className="overlay-spots-text">
                      {dest.spots ? dest.spots.join(' • ') : ''}
                    </p>
                    <span className="overlay-click-hint">Click to explore curated tours &rarr;</span>
                  </div>
                </div>
              </div>
              <div className="card-name-strip">
                <h3>{dest.name}</h3>
                <span className="sub-itineraries">{dest.packagesCount} Curated Itineraries</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button matching Image 1 */}
        <div style={{ marginTop: '24px' }}>
          <button
            className="btn btn-gold btn-large"
            onClick={onBookNow}
          >
            <span>BOOK NOW</span>
            <span style={{
              background: '#ffffff',
              color: '#ea580c',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '6px'
            }}>
              <ChevronsRight size={18} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
