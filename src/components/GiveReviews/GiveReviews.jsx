import React, { useState, useEffect } from 'react';
import './GiveReviews.css';

const GiveReviews = ({ doctorName, doctorSpeciality, onSubmit, reviewData }) => {
  const [rating, setRating] = useState(reviewData?.rating || 0);
  const [comment, setComment] = useState(reviewData?.comment || '');
  const [name, setName] = useState(reviewData?.name || '');
  const [submitted, setSubmitted] = useState(reviewData?.submitted || false);

  const stars = [5, 4, 3, 2, 1];

  // Persist review state to localStorage so it survives page reloads
  useEffect(() => {
    if (!submitted) {
      localStorage.setItem(
        `review-${doctorName}`,
        JSON.stringify({ name, rating, comment, submitted })
      );
    }
  }, [name, rating, comment, submitted, doctorName]);

  // Load saved review state on mount (Popup mounting evidence)
  useEffect(() => {
    const saved = localStorage.getItem(`review-${doctorName}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setName(parsed.name || '');
        setRating(parsed.rating || 0);
        setComment(parsed.comment || '');
        setSubmitted(parsed.submitted || false);
      } catch (e) {
        console.warn('Failed to load saved review state', e);
      }
    }
  }, [doctorName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || rating === 0) {
      alert('Please enter your name and select a star rating before submitting.');
      return;
    }
    const reviewPayload = { doctorName, doctorSpeciality, name, rating, comment };
    onSubmit(reviewPayload);
    setSubmitted(true);
  };

  const isFormValid = name.trim() !== '' && rating > 0;

  if (submitted) {
    return (
      <div className="give-reviews give-reviews--success" role="status" aria-live="polite">
        <div className="give-reviews__check">&#10003;</div>
        <h3 className="give-reviews__title">Thank you!</h3>
        <p className="give-reviews__message">
          Your review for <strong>{doctorName}</strong> ({doctorSpeciality}) has been submitted.
        </p>
        <p className="give-reviews__review-summary">
          <strong>Name:</strong> {name} &nbsp;|&nbsp; <strong>Rating:</strong> {rating} star{rating > 1 ? 's' : ''}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="give-reviews" data-testid="give-reviews-popup">
      <div className="give-reviews__header">
        <h3 className="give-reviews__title">Rate your consultation</h3>
        <p className="give-reviews__subtitle">
          Help others choose <strong>{doctorName}</strong> ({doctorSpeciality})
        </p>
      </div>

      <div className="give-reviews__name-field">
        <label className="give-reviews__name-label">Your Name</label>
        <input
          className="give-reviews__name-input"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="give-reviews__rating">
        <label className="give-reviews__rating-label">Your rating</label>
        <div className="give-reviews__stars" role="radiogroup" aria-label="Star rating">
          {stars.map((star) => (
            <button
              type="button"
              key={star}
              className={`give-reviews__star ${star <= rating ? 'give-reviews__star--filled' : ''}`}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
              aria-checked={star <= rating}
              onClick={() => setRating(star)}
            >
              &#9733;
            </button>
          ))}
        </div>
        <p className={`give-reviews__rating-text ${rating ? '' : 'give-reviews__rating-text--required'}`}>
          {rating === 0 ? 'Please select a rating' : `${rating} star${rating > 1 ? 's' : ''} selected`}
        </p>
      </div>

      <div className="give-reviews__comment">
        <label className="give-reviews__comment-label">Your review</label>
        <textarea
          className="give-reviews__comment-textarea"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
        />
      </div>

      <div className="give-reviews__actions">
        <button type="button" className="give-reviews__btn give-reviews__btn--cancel" onClick={() => setRating(0)}>
          Cancel
        </button>
        <button type="submit" className="give-reviews__btn give-reviews__btn--submit" disabled={!isFormValid}>
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default GiveReviews;

