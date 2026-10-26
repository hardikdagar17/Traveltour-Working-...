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
        <div className="radar-circle">
          <div className="radar-sweep-beam"></div>
        </div>

        <div className="preloader-plane-flight">
          <div className="flight-track-line"></div>
          <div className="jet-icon">
            <Plane size={36} />
          </div>
        </div>

        <div style={{
          display: 'inline-block',
          padding: '6px 14px',
          background: 'rgba(255, 255, 255, 0.96)',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          margin: '0 auto 14px auto'
        }}>
          <img 
            src={logoImg} 
            alt="Gaur Travel - Safar aapka, saath hamara" 
            style={{ height: '48px', width: 'auto', display: 'block', objectFit: 'contain' }} 
          />
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
