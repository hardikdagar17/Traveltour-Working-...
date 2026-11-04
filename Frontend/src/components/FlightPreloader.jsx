import React, { useState, useEffect } from 'react';
import { Plane, Compass } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function FlightPreloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 12) + 8;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
          }, 400);
          return 100;
        }
        return next;
      });
    }, 110);

    return () => clearInterval(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className={`preloader-overlay ${progress === 100 ? 'fade-out' : ''}`}>
      <div className="preloader-box">
        <div className="radar-circle" style={{ position: 'relative' }}>
          <div className="radar-sweep-beam"></div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            pointerEvents: 'none'
          }}>
            <img 
              src={logoImg} 
              alt="Gaur Travel - Safar aapka, saath hamara" 
              style={{ height: '42px', width: 'auto', display: 'block', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))' }} 
            />
          </div>
        </div>

        <div className="preloader-plane-flight">
          <div className="flight-track-line"></div>
          <div className="jet-icon">
            <Plane size={36} />
          </div>
        </div>

        <p className="preloader-tagline">Preparing Your Dream Journey Across India</p>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="preloader-flight-meta">
          <span>Flight: <strong style={{ color: '#fde047' }}>GT-777</strong></span>
          <span>Status: <strong className="blink-status">CLEAR FOR TAKEOFF</strong></span>
          <span style={{ fontWeight: 800 }}>{progress}%</span>
        </div>

        <button
          className="skip-intro-btn"
          onClick={() => {
            setIsVisible(false);
            if (onFinish) onFinish();
          }}
        >
          Skip Intro &rarr;
        </button>
      </div>
    </div>
  );
}
