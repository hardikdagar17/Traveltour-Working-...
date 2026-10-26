import React, { useState } from 'react';
import { Star, MessageSquarePlus, Send } from 'lucide-react';
import { postReview } from '../services/api';

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
          <div className="text-center">
            <span className="section-badge-pill">VERIFIED TRAVELERS</span>
            <h2 className="section-title">Stories From Happy Explorers</h2>
            <p className="section-lead-text">
              Over 1,200+ five-star verified ratings across Google &amp; TripAdvisor.
            </p>
          </div>
        )}

        <div className="reviews-grid-display">
          {reviews && reviews.map((rev) => (
            <div key={rev.id} className="review-item-card">
              <div style={{ display: 'flex', gap: '3px', color: '#f59e0b' }}>
                {[...Array(rev.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p className="review-item-text">
                "{rev.comment}"
              </p>

              <div className="reviewer-profile-row">
                <img src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} alt={rev.author} loading="lazy" />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.96rem', color: '#0f172a' }}>{rev.author}</strong>
                  <small style={{ color: '#64748b' }}>{rev.location} • {rev.tour}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '20px' }}>
          {!showForm ? (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setShowForm(true)}
            >
              <MessageSquarePlus size={16} /> Share Your Experience With Gaur Travel
            </button>
          ) : (
            <form onSubmit={handleSubmit} style={{
              maxWidth: '600px',
              margin: '20px auto 0',
              background: '#ffffff',
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
