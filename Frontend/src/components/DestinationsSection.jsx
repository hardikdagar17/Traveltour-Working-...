import React from 'react';
import { ChevronsRight, Crown, Snowflake, Waves, Leaf } from 'lucide-react';

export default function DestinationsSection({ destinations, onSelectRegion, onBookNow }) {
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

        {/* The 4 Regional Cards from Image 1 */}
        <div className="destinations-cards-grid">
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
