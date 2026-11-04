import React, { useState } from 'react';
import { Star, MessageSquarePlus, Send, ExternalLink } from 'lucide-react';
import { postReview } from '../services/api';

const GOOGLE_REVIEWS_URL = 'https://share.google/P6PcZ0gTCoj0riPn6';

export default function ReviewsSection({ reviews, onNewReviewAdded, isAccordion = false }) {
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [tour, setTour] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !comment) return;
    setSubmitting(true);
    try {
      const res = await postReview({ author, location, tour, rating, comment });
      if (res.success) {
        if (onNewReviewAdded) onNewReviewAdded(res.review);
        setAuthor('');
        setLocation('');
        setTour('');
        setComment('');
        setShowForm(false);
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`reviews-wrapper ${isAccordion ? 'is-in-accordion' : 'section-padding'}`} id={isAccordion ? undefined : 'reviews'}>
      <div className={isAccordion ? 'accordion-inner-container' : 'container'}>
        {!isAccordion && (
          <div className="text-center" style={{ marginBottom: '24px' }}>
            <span className="section-badge-pill">REAL TRAVELER VOICES</span>
            <h2 className="section-title">
              TESTIMONIAL <span style={{ fontFamily: 'Caveat, cursive', color: 'var(--amber-gold, #f59e0b)', fontSize: '1.2em' }}>Our Client Says!</span>
            </h2>
            <p className="section-lead-text">
              Real feedback synced automatically with our official Google Business Profile.
            </p>
          </div>
        )}

        {/* Google Reviews Official Card */}
        <div style={{
          background: 'var(--bg-glass-card, #ffffff)',
          border: '1.5px solid var(--border-light, #e2e8f0)',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <svg viewBox="0 0 48 48" width="38" height="38">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.55 10.78l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '1.4rem', fontWeight: 900 }}>5.0</strong>
                <div style={{ display: 'flex', color: '#f59e0b', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #64748b)' }}>
                Verified Google Business Rating • <strong>Gaur Travel</strong>
              </span>
            </div>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '50px' }}
          >
            <span>Write a Review on Google</span>
            <ExternalLink size={16} />
          </a>
        </div>

        <div className="reviews-grid-display">
          {reviews && reviews.map((rev) => (
            <div key={rev.id} className="review-item-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '3px', color: '#f59e0b' }}>
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{
                  background: 'rgba(66, 133, 244, 0.12)',
                  color: '#1a73e8',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  Google Verified
                </span>
              </div>

              <p className="review-item-text">
                "{rev.comment}"
              </p>

              <div className="reviewer-profile-row">
                <img src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} alt={rev.author} loading="lazy" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.96rem', color: 'var(--text-main, #0f172a)' }}>{rev.author}</strong>
                  <small style={{ color: 'var(--text-muted, #64748b)' }}>
                    {rev.location} • {rev.tour} •{' '}
                    <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8', textDecoration: 'underline' }}>
                      Google ↗
                    </a>
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '20px' }}>
          {!showForm ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ExternalLink size={16} /> View All Reviews on Google Maps
              </a>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowForm(true)}
              >
                <MessageSquarePlus size={16} /> Share Direct Website Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              maxWidth: '600px',
              margin: '20px auto 0',
              background: 'var(--bg-glass-card, #ffffff)',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'left'
            }}>
              <h4 style={{ marginBottom: '14px', fontWeight: 800 }}>Write Your Traveler Review</h4>
              <div className="form-two-grid">
                <div className="form-single-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Vikas Sharma"
                  />
                </div>
                <div className="form-single-group">
                  <label>Your City / Country</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai, India"
                  />
                </div>
              </div>
              <div className="form-two-grid">
                <div className="form-single-group">
                  <label>Tour Package Name</label>
                  <input
                    type="text"
                    value={tour}
                    onChange={(e) => setTour(e.target.value)}
                    placeholder="e.g. Kashmir 6D/5N"
                  />
                </div>
                <div className="form-single-group">
                  <label>Rating (1 - 5)</label>
                  <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  </select>
                </div>
              </div>
              <div className="form-single-group">
                <label>Your Experience *</label>
                <textarea
                  rows="3"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell others how Gaur Travel organized your dream trip..."
                ></textarea>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" disabled={submitting} className="btn btn-primary">
                  <Send size={15} /> {submitting ? 'Submitting...' : 'Post Review'}
                </button>
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
