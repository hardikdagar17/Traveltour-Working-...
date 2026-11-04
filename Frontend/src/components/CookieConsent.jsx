import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Sliders, Check } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('pending');
  const [settings, setSettings] = useState({
    essential: true,
    preferences: true,
    analytics: true,
    marketing: true
  });

  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const savedStatus = localStorage.getItem('gaur_cookie_consent');
      const savedSettings = localStorage.getItem('gaur_cookie_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      if (savedStatus) {
        setStatus(savedStatus);
      }
      // Always show in opening display on visit
      setVisible(true);
    } catch (e) {}

    const handleScroll = () => {
      if (dismissed) return;
      if (window.scrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  const handleSave = (newSettings, statusType) => {
    setSettings(newSettings);
    setStatus(statusType);
    localStorage.setItem('gaur_cookie_settings', JSON.stringify(newSettings));
    localStorage.setItem('gaur_cookie_consent', statusType);
    setDismissed(true);
    setVisible(false);
    setModalOpen(false);
  };

  const acceptAll = () => {
    handleSave({ essential: true, preferences: true, analytics: true, marketing: true }, 'all_accepted');
  };

  const essentialOnly = () => {
    handleSave({ essential: true, preferences: false, analytics: false, marketing: false }, 'essential_only');
  };

  const saveCustom = () => {
    handleSave(settings, 'custom');
  };

  return (
    <>
      {/* Floating Cookie Banner */}
      {visible && (
        <div className="cookie-consent-box show" role="dialog" aria-label="Cookie consent">
          <button 
            type="button" 
            className="cookie-close-btn" 
            onClick={handleDismiss} 
            aria-label="Close Cookies Notice"
          >
            &times;
          </button>
          <div className="cookie-box-inner">
            <div className="cookie-icon-badge">
              <Cookie className="text-amber" size={24} />
            </div>
            <div className="cookie-text-col">
              <div className="cookie-title-row">
                <h4>We Value Your Travel Privacy 🍪</h4>
                <span className="cookie-guarantee-pill">
                  <ShieldCheck size={12} /> Safe &amp; Verified
                </span>
              </div>
              <p>
                We use cookies to remember your travel preferences, keep verified Google Reviews in sync, and power your VIP booking experience.
              </p>
            </div>
            <div className="cookie-buttons-col">
              <button type="button" className="btn btn-gold btn-cookie-action" onClick={acceptAll}>
                Accept All
              </button>
              <button 
                type="button" 
                className="btn btn-outline btn-cookie-action" 
                onClick={() => { setVisible(false); setModalOpen(true); }}
              >
                <Sliders size={14} style={{ marginRight: '4px' }} /> Customize
              </button>
              <button type="button" className="btn btn-cookie-decline btn-cookie-action" onClick={essentialOnly}>
                Essential Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {modalOpen && (
        <div className="modal-backdrop active" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog modal-md glass-card cookie-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close">&times;</button>
            <div className="cookie-modal-header">
              <div className="cookie-modal-icon">
                <Cookie size={28} className="text-amber" />
              </div>
              <div>
                <h3>Cookie &amp; Privacy Preferences</h3>
                <p>Control the cookies you permit while exploring Gaur Travel.</p>
              </div>
            </div>

            <div className="cookie-modal-body">
              <div className="cookie-pref-item">
                <div className="cookie-pref-info">
                  <h4>Strictly Essential <span className="badge-always-active">Always Active</span></h4>
                  <p>Required for secure reservations, currency calculations, and CSRF security.</p>
                </div>
                <div className="cookie-pref-toggle">
                  <span className="badge-active-pill">Required</span>
                </div>
              </div>

              <div className="cookie-pref-item">
                <div className="cookie-pref-info">
                  <h4>Experience &amp; Region Preferences</h4>
                  <p>Remembers your selected region filter (North/West/South/East) and Light Theme settings.</p>
                </div>
                <div className="cookie-pref-toggle">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.preferences} 
                      onChange={(e) => setSettings({ ...settings, preferences: e.target.checked })} 
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="cookie-pref-item">
                <div className="cookie-pref-info">
                  <h4>Analytics &amp; Google Reviews Sync</h4>
                  <p>Enables automatic live synchronization of reviews from Google (5.0 rating).</p>
                </div>
                <div className="cookie-pref-toggle">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.analytics} 
                      onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })} 
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="cookie-pref-item">
                <div className="cookie-pref-info">
                  <h4>VIP Concierge &amp; WhatsApp Automation</h4>
                  <p>Powers the 20-second automatic VIP reservation sheet and WhatsApp travel quotes.</p>
                </div>
                <div className="cookie-pref-toggle">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.marketing} 
                      onChange={(e) => setSettings({ ...settings, marketing: e.target.checked })} 
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button type="button" className="btn btn-outline btn-sm" onClick={essentialOnly}>
                Essential Only
              </button>
              <button type="button" className="btn btn-gold btn-sm" onClick={acceptAll}>
                Accept All
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={saveCustom}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

