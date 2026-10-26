import React, { useState, useEffect } from 'react';
import { Calculator, MapPin, Calendar, Hotel, Car, Users, ShieldCheck, CheckCircle2, Table, LayoutGrid, ArrowRight } from 'lucide-react';
import { calculateCost } from '../services/api';

const POPULAR_RATES_MATRIX = [
  {
    id: 'north-6d',
    region: 'North India',
    route: 'Kashmir & Himalayas (6D/5N)',
    coupleINR: 38400,
    familyINR: 64800,
    inclusions: 'Innova + 4-Star + Guide',
    whatsAppMsg: 'Hello Gaur Travel! I want to book North India (Kashmir & Himalayas, 6D/5N).'
  },
  {
    id: 'west-6d',
    region: 'West India',
    route: 'Rajasthan Royal Forts (6D/5N)',
    coupleINR: 36200,
    familyINR: 61400,
    inclusions: 'AC Cab + Heritage Resort + Guide',
    whatsAppMsg: 'Hello Gaur Travel! I want to book West India (Rajasthan Royal Forts, 6D/5N).'
  },
  {
    id: 'south-6d',
    region: 'South India',
    route: 'Kerala Backwaters & Munnar (6D/5N)',
    coupleINR: 39500,
    familyINR: 66200,
    inclusions: 'Houseboat + AC Cab + Guide',
    whatsAppMsg: 'Hello Gaur Travel! I want to book South India (Kerala Backwaters & Munnar, 6D/5N).'
  },
  {
    id: 'east-6d',
    region: 'East India',
    route: 'Darjeeling & Sikkim Hills (6D/5N)',
    coupleINR: 34900,
    familyINR: 58900,
    inclusions: 'Mountain Cab + Hill Resort + Guide',
    whatsAppMsg: 'Hello Gaur Travel! I want to book East India (Darjeeling & Sikkim Hills, 6D/5N).'
  },
  {
    id: 'gt-4d',
    region: 'Golden Triangle',
    route: 'Delhi, Agra & Jaipur (4D/3N)',
    coupleINR: 26500,
    familyINR: 44800,
    inclusions: 'Chauffeur Sedan + 5-Star Stay + Guide',
    whatsAppMsg: 'Hello Gaur Travel! I want to book Golden Triangle (Delhi, Agra & Jaipur, 4D/3N).'
  }
];

export default function TourCostCalculator({ formatPrice, currency, onWhatsAppBook }) {
  const [mobileCalcMode, setMobileCalcMode] = useState('table'); // 'table' | 'custom'
  const [region, setRegion] = useState('north');
  const [duration, setDuration] = useState({ days: 6, nights: 5 });
  const [hotelTier, setHotelTier] = useState('deluxe');
  const [vehicleType, setVehicleType] = useState('suv');
  const [guests, setGuests] = useState(2);
  const [includeGuide, setIncludeGuide] = useState(true);
  const [includeInsurance, setIncludeInsurance] = useState(true);

  const [calculation, setCalculation] = useState({
    totalINR: 38400,
    perPersonINR: 19200,
    breakdown: {
      hotelCost: 21600,
      cabCost: 19000,
      guideCost: 12000,
      insuranceCost: 900,
      tollsAndTaxes: 1800
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchCalc() {
      setLoading(true);
      try {
        const res = await calculateCost({
          region,
          days: duration.days,
          nights: duration.nights,
          hotelTier,
          vehicleType,
          guests,
          includeGuide,
          includeInsurance
        });
        if (isMounted && res.success) {
          setCalculation(res);
        }
      } catch (err) {
        console.error('Calculation error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCalc();
    return () => { isMounted = false; };
  }, [region, duration, hotelTier, vehicleType, guests, includeGuide, includeInsurance]);

  const handleBookEstimate = () => {
    const regionNames = {
      north: 'North India (Himalayas & Kashmir)',
      west: 'West India (Rajasthan & Gwalior Forts)',
      south: 'South India (Kerala Backwaters & Munnar)',
      east: 'East India (Darjeeling & Sikkim Hills)'
    };

    const text = `Hello Gaur Travel (+91 99718 59687)!
I calculated an estimate on your website calculator:
• Region: ${regionNames[region]}
• Duration: ${duration.days} Days / ${duration.nights} Nights
• Travelers: ${guests}
• Hotel Tier: ${hotelTier.toUpperCase()}
• Vehicle: ${vehicleType.toUpperCase()}
• Certified Guide: ${includeGuide ? 'Included' : 'No'}
• Travel Insurance: ${includeInsurance ? 'Included' : 'No'}
• Total Estimate: ₹${calculation.totalINR.toLocaleString()}

Please provide confirmed availability and itinerary options.`;

    window.open(`https://wa.me/919971859687?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBookMatrixRow = (item) => {
    const text = `${item.whatsAppMsg}
• Package: ${item.route}
• Estimated Couple Cost: ${formatPrice(item.coupleINR)}
• Inclusions: ${item.inclusions}
Please share complete details & departure dates!`;

    window.open(`https://wa.me/919971859687?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="calculator-wrapper section-padding" id="calculator">
      <div className="container">
        <div className="calc-frame-card">
          <div className="text-center">
            <span className="section-badge-pill">INSTANT TRANSPARENCY</span>
            <h2 className="section-title">Smart Tour Cost Calculator</h2>
            <p className="section-lead-text">
              Real-time pricing engine connected directly to our logistics backend with zero hidden markups.
            </p>
          </div>

          {/* Mobile View Toggle (Mobile Screens Only) */}
          <div className="mobile-view-toggle-bar">
            <span className="toggle-label">Calculator View:</span>
            <div className="toggle-pill-group">
              <button
                type="button"
                className={`toggle-pill-btn ${mobileCalcMode === 'table' ? 'active' : ''}`}
                onClick={() => setMobileCalcMode('table')}
              >
                <Table size={13} />
                <span>Quick Rates Table</span>
              </button>
              <button
                type="button"
                className={`toggle-pill-btn ${mobileCalcMode === 'custom' ? 'active' : ''}`}
                onClick={() => setMobileCalcMode('custom')}
              >
                <Calculator size={13} />
                <span>Custom Estimator</span>
              </button>
            </div>
          </div>

          {/* Mobile Pre-calculated Rates Table (Mobile Screens Only when selected) */}
          {mobileCalcMode === 'table' && (
            <div className="calc-table-wrapper mobile-only-table">
              <table className="compact-calc-table">
                <thead>
                  <tr>
                    <th>Trip &amp; Route</th>
                    <th>Couple (2p)</th>
                    <th>Family (4p)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {POPULAR_RATES_MATRIX.map((row) => (
                    <tr key={row.id}>
                      <td className="calc-table-route-cell">
                        <strong>{row.region}</strong>
                        <span>{row.route}</span>
                        <small className="calc-table-inc-tag">{row.inclusions}</small>
                      </td>
                      <td className="calc-table-price-cell">
                        <strong>{formatPrice(row.coupleINR)}</strong>
                        <small>all-inclusive</small>
                      </td>
                      <td className="calc-table-price-cell">
                        <strong>{formatPrice(row.familyINR)}</strong>
                        <small>all-inclusive</small>
                      </td>
                      <td className="calc-table-action-cell">
                        <button
                          type="button"
                          className="table-mini-btn gold"
                          onClick={() => handleBookMatrixRow(row)}
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="calc-table-note">
                <ShieldCheck size={14} color="#059669" />
                <span>Includes sanitized AC cab, verified hotel stays, fuel, tolls &amp; driver charges.</span>
              </div>
            </div>
          )}

          <div className={`calc-two-columns ${mobileCalcMode === 'table' ? 'hide-on-mobile' : ''}`}>
            {/* Options Side */}
            <div>
              {/* Step 1: Region */}
              <div className="calc-step-box">
                <h4><MapPin size={18} color="#0284c7" /> 1. Choose Region</h4>
                <div className="options-pill-grid">
                  <button
                    type="button"
                    className={`calc-btn-option ${region === 'north' ? 'selected' : ''}`}
                    onClick={() => setRegion('north')}
                  >
                    North India (Himalayas)
                  </button>
                  <button
                    type="button"
                    className={`calc-btn-option ${region === 'west' ? 'selected' : ''}`}
                    onClick={() => setRegion('west')}
                  >
                    West India (Royal Forts)
                  </button>
                  <button
                    type="button"
                    className={`calc-btn-option ${region === 'south' ? 'selected' : ''}`}
                    onClick={() => setRegion('south')}
                  >
                    South India (Backwaters)
                  </button>
                  <button
                    type="button"
                    className={`calc-btn-option ${region === 'east' ? 'selected' : ''}`}
                    onClick={() => setRegion('east')}
                  >
                    East India (Tea Valleys)
                  </button>
                </div>
              </div>

              {/* Step 2: Duration */}
              <div className="calc-step-box">
                <h4><Calendar size={18} color="#0284c7" /> 2. Trip Duration</h4>
                <div className="options-pill-grid">
                  {[
                    { days: 4, nights: 3, label: '4 Days / 3 Nights' },
                    { days: 6, nights: 5, label: '6 Days / 5 Nights' },
                    { days: 8, nights: 7, label: '8 Days / 7 Nights' },
                    { days: 10, nights: 9, label: '10 Days / 9 Nights' }
                  ].map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`calc-btn-option ${duration.days === d.days ? 'selected' : ''}`}
                      onClick={() => setDuration({ days: d.days, nights: d.nights })}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Hotel Category */}
              <div className="calc-step-box">
                <h4><Hotel size={18} color="#0284c7" /> 3. Hotel Category</h4>
                <div className="options-pill-grid">
                  <button
                    type="button"
                    className={`calc-btn-option ${hotelTier === 'comfort' ? 'selected' : ''}`}
                    onClick={() => setHotelTier('comfort')}
                  >
                    Comfort 3-Star
                  </button>
                  <button
                    type="button"
                    className={`calc-btn-option ${hotelTier === 'deluxe' ? 'selected' : ''}`}
                    onClick={() => setHotelTier('deluxe')}
                  >
                    Deluxe 4-Star Resort
                  </button>
                  <button
                    type="button"
                    className={`calc-btn-option ${hotelTier === 'luxury' ? 'selected' : ''}`}
                    onClick={() => setHotelTier('luxury')}
                  >
                    Luxury 5-Star Heritage
                  </button>
                </div>
              </div>

              {/* Step 4: Vehicle Type */}
              <div className="calc-step-box">
                <h4><Car size={18} color="#0284c7" /> 4. Chauffeur Vehicle</h4>
                <div className="options-pill-grid">
                  <button
                    type="button"
                    className={`calc-btn-option ${vehicleType === 'sedan' ? 'selected' : ''}`}
                    onClick={() => setVehicleType('sedan')}
                  >
                    AC Sedan (Dzire / Etios)
                  </button>
                  <button
                    type="button"
                    className={`calc-btn-option ${vehicleType === 'suv' ? 'selected' : ''}`}
                    onClick={() => setVehicleType('suv')}
                  >
                    SUV (Innova Crysta)
                  </button>
                  <button
                    type="button"
                    className={`calc-btn-option ${vehicleType === 'tempo' ? 'selected' : ''}`}
                    onClick={() => setVehicleType('tempo')}
                  >
                    Luxury Tempo Traveller
                  </button>
                </div>
              </div>

              {/* Step 5: Guests and Addons */}
              <div className="calc-step-box">
                <h4><Users size={18} color="#0284c7" /> 5. Travelers &amp; Guides</h4>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                    Number of Travelers: <strong style={{ color: '#0284c7' }}>{guests}</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10))}
                    style={{ width: '100%', accentColor: '#0284c7' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={includeGuide}
                      onChange={(e) => setIncludeGuide(e.target.checked)}
                      style={{ accentColor: '#0284c7', width: '18px', height: '18px' }}
                    />
                    <span>Govt. Certified Multilingual Tour Guide (+₹2,000/day)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                    <input
                      type="checkbox"
                      checked={includeInsurance}
                      onChange={(e) => setIncludeInsurance(e.target.checked)}
                      style={{ accentColor: '#0284c7', width: '18px', height: '18px' }}
                    />
                    <span>Comprehensive Travel Insurance (+₹450/person)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Summary Panel */}
            <div className="calc-summary-panel">
              <div>
                <span style={{
                  background: 'rgba(74, 222, 128, 0.2)',
                  color: '#4ade80',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 800
                }}>
                  ALL-INCLUSIVE ESTIMATE
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '12px' }}>
                  Estimated Package Cost
                </h3>
                <small style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Total for {guests} Traveler{guests > 1 ? 's' : ''} ({duration.days} Days / {duration.nights} Nights)
                </small>

                <div className="calc-total-big">
                  {formatPrice(calculation.totalINR)}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.92rem' }}>
                  Approx. <strong>{formatPrice(calculation.perPersonINR)}</strong> per person
                </div>

                {/* Breakdown List */}
                <div className="calc-breakdown-list">
                  <div className="calc-break-item">
                    <span>Hotels &amp; Breakfast:</span>
                    <strong>{formatPrice(calculation.breakdown.hotelCost)}</strong>
                  </div>
                  <div className="calc-break-item">
                    <span>Chauffeur &amp; Fuel:</span>
                    <strong>{formatPrice(calculation.breakdown.cabCost)}</strong>
                  </div>
                  <div className="calc-break-item">
                    <span>Certified Guide:</span>
                    <strong>{formatPrice(calculation.breakdown.guideCost)}</strong>
                  </div>
                  <div className="calc-break-item">
                    <span>Insurance &amp; Tolls:</span>
                    <strong>{formatPrice(calculation.breakdown.insuranceCost + calculation.breakdown.tollsAndTaxes)}</strong>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-gold btn-block"
                  style={{ padding: '14px', fontSize: '1rem', marginBottom: '10px' }}
                  onClick={handleBookEstimate}
                >
                  <i className="fa-brands fa-whatsapp"></i> Book Estimate on WhatsApp
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Subject to seasonality. Final confirmation delivered within 30 minutes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
