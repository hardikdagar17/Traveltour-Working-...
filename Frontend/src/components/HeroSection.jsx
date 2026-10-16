import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Calendar, Users, Search, Check, Sparkles, ChevronLeft, ChevronRight, Phone } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
    tag: 'Kashmir & Himalayas',
    title: 'Snow-Capped Alpine Heavens',
  },
  {
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2000&q=85',
    tag: 'Rajasthan & Gwalior',
    title: 'Centuries of Royal Forts & Palaces',
  },
  {
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85',
    tag: 'Kerala Backwaters',
    title: 'Emerald Lagoons & Serene Houseboats',
  },
  {
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=85',
    tag: 'Darjeeling & Sikkim',
    title: 'Misty Tea Gardens & Mountain Peaks',
  }
];

export default function HeroSection({ onSearchTours }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [searchRegion, setSearchRegion] = useState('any');
  const [searchMonth, setSearchMonth] = useState('any');
  const [searchGuests, setSearchGuests] = useState('couple');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchTours) {
      onSearchTours(searchRegion);
    }
  };

  return (
    <section className="hero-wrapper" id="hero">
      {/* Background Slides */}
      <div className="hero-bg-carousel">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`hero-bg-slide ${idx === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.45), rgba(15, 23, 42, 0.7)), url('${slide.image}')`
            }}
          >
            <div className="hero-slide-chip">{slide.tag}</div>
          </div>
        ))}
      </div>

      <div className="container hero-center-content text-center">
        <div className="hero-badge-tag">
          <Sparkles size={16} /> Rated #1 Tourism &amp; Tour Guide Platform in India
        </div>

        <h1 className="hero-headline">
          <span className="script-text">Welcome to the Wonder</span>
          TRAVEL YOU DREAM
        </h1>

        <p className="hero-subtext">
          Bespoke private tours, certified local historians, chauffeur-driven luxury vehicles, and 24/7 personalized care across North, South, East, and West India.
        </p>

        {/* Live Search Engine Box */}
        <div className="hero-search-box">
          <div className="search-theme-pills">
            <button
              type="button"
              className={`theme-pill-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              <Compass size={15} /> All Destinations
            </button>
            <button
              type="button"
              className={`theme-pill-btn ${activeTab === 'family' ? 'active' : ''}`}
              onClick={() => setActiveTab('family')}
            >
              Family Holidays
            </button>
            <button
              type="button"
              className={`theme-pill-btn ${activeTab === 'honeymoon' ? 'active' : ''}`}
              onClick={() => setActiveTab('honeymoon')}
            >
              Honeymoon Specials
            </button>
            <button
              type="button"
              className={`theme-pill-btn ${activeTab === 'heritage' ? 'active' : ''}`}
              onClick={() => setActiveTab('heritage')}
            >
              Forts &amp; Heritage
            </button>
            <button
              type="button"
              className={`theme-pill-btn ${activeTab === 'hills' ? 'active' : ''}`}
              onClick={() => setActiveTab('hills')}
            >
              Hill Stations &amp; Snow
            </button>
          </div>

          <form onSubmit={handleSearchSubmit}>
            <div className="search-fields-row">
              <div className="search-field-item">
                <label><MapPin size={15} /> Select Destination</label>
                <select
                  value={searchRegion}
                  onChange={(e) => setSearchRegion(e.target.value)}
                >
                  <option value="any">Explore All Regions (India)</option>
                  <option value="north">North India (Kashmir, Ladakh, Manali)</option>
                  <option value="west">West India (Rajasthan, Gwalior Fort, Goa)</option>
                  <option value="south">South India (Kerala, Munnar, Ooty)</option>
                  <option value="east">East India (Darjeeling, Sikkim, Meghalaya)</option>
                </select>
              </div>

              <div className="search-field-item">
                <label><Calendar size={15} /> Month of Travel</label>
                <select
                  value={searchMonth}
                  onChange={(e) => setSearchMonth(e.target.value)}
                >
                  <option value="any">Flexible / Upcoming Months</option>
                  <option value="oct-nov">Oct - Nov 2026 (Festive Season)</option>
                  <option value="dec-jan">Dec - Jan 2027 (Snow &amp; Winter Magic)</option>
                  <option value="feb-mar">Feb - Mar 2027 (Spring Blossoms)</option>
                  <option value="apr-jun">Apr - Jun 2027 (Cool Summer Escapes)</option>
                </select>
              </div>

              <div className="search-field-item">
                <label><Users size={15} /> Travelers</label>
                <select
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                >
                  <option value="couple">2 Adults (Couple / Friends)</option>
                  <option value="family">Family (3 - 5 Members)</option>
                  <option value="solo">Solo Traveler</option>
                  <option value="group">Large Group (6+ Members)</option>
                </select>
              </div>

              <div className="search-field-item">
                <button type="submit" className="btn btn-gold btn-block" style={{ padding: '14px 20px' }}>
                  <Search size={18} />
                  <span>Find My Tour</span>
                </button>
              </div>
            </div>
          </form>

          <div className="hero-guarantee-line">
            <span><Check size={16} /> Best Price Guarantee</span>
            <span><Check size={16} /> Zero Hidden Charges</span>
            <span><Check size={16} /> Govt. Verified Tour Guides</span>
            <span>
              <Phone size={15} /> Instant Desk: <strong className="call-highlight">+91 99718 59687</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
