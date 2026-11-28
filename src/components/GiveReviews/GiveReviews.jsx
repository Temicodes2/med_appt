import React, { useState } from 'react';
import './GiveReviews.css';

const GiveReviews = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const stars = [5, 4, 3, 2, 1];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a star rating before submitting.');
      return;
    }
    onSubmit({ doctorName, doctorSpeciality, rating, comment });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="give-reviews give-reviews--success">
        <div className="give-reviews__check">&#10003;</div>
        <h3 className="give-reviews__title">Thank you!</h3>
        <p className="give-reviews__message">
          Your review for <strong>{doctorName}</strong> ({doctorSpeciality}) has been submitted.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="give-reviews">
      <div className="give-reviews__header">
        <h3 className="give-reviews__title">Rate your consultation</h3>
        <p className="give-reviews__subtitle">
          Help others choose <strong>{doctorName}</strong> ({doctorSpeciality})
        </p>
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
        <button type="submit" className="give-reviews__btn give-reviews__btn--submit" disabled={rating === 0}>
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default GiveReviews;
