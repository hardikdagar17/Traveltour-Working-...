import React, { useState, useEffect } from 'react';
import { Calculator, MapPin, Calendar, Hotel, Car, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { calculateCost } from '../services/api';

export default function TourCostCalculator({ formatPrice, currency, onWhatsAppBook }) {
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

    const text = `Hello Gaur Travels (+91 99718 59687)!
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

          <div className="calc-two-columns">
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
