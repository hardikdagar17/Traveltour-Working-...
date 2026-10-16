import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

export default function ScrollPlaneTracker() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-tracker">
      <div className="scroll-tracker-bar" style={{ width: `${scrollPercent}%` }}>
        <div className="scroll-plane-icon">
          <Plane size={18} />
        </div>
      </div>
    </div>
  );
}
