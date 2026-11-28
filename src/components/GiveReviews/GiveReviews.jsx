import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './GiveReviews.css';

function GiveReviews({ doctorId, clinicId, onSubmitReview }) {
  // State variables for form inputs and UI feedback
  const [isOpen, setIsOpen] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  // Unique storage key based on doctor/report ID to track report-specific review state
  const storageKey = `review_${doctorId || 'default'}`;

  useEffect(() => {
    // Check if a review for this specific report already exists in localStorage
    const savedReview = localStorage.getItem(storageKey);
    if (savedReview) {
      setSubmittedMessage(JSON.parse(savedReview));
    }
  }, [storageKey]);

  // Update state as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle star rating selection
  const handleRatingChange = (starValue) => {
    setFormData({ ...formData, rating: starValue });
  };

  // Validate and submit the review
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      const reviewData = { ...formData, doctorId };
      
      setSubmittedMessage(reviewData);
      
      // Save report-specific review state locally
      localStorage.setItem(storageKey, JSON.stringify(reviewData));

      // Pass the review data up to the parent component if provided
      if (onSubmitReview) {
        onSubmitReview(reviewData);
      }

      // Reset form and close popup
      setFormData({ name: '', review: '', rating: 0 });
      setIsOpen(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="give-reviews-container">
      {/* If review already exists for this report, render disabled "Review Given" control */}
      {submittedMessage ? (
        <button className="btn-primary" disabled style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}>
          Review Given
        </button>
      ) : (
        /* Popup component wrapping the trigger button and the modal form */
        <Popup
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          trigger={
            <button className="btn-primary">
              Click Here
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="modal-container" style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
              <form onSubmit={handleSubmit} className="review-form">
                <h2>Give Your Review</h2>

                {showWarning && (
                  <p className="warning" style={{ color: 'red' }}>
                    Please fill out all fields and select a star rating.
                  </p>
                )}

                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="review">Review:</label>
                  <textarea
                    id="review"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="Share your experience with the doctor..."
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label>Rating:</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        style={{
                          cursor: 'pointer',
                          fontSize: '24px',
                          color: star <= formData.rating ? '#ffc107' : '#e4e5e9',
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <div className="button-group" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button type="submit" className="btn-submit">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setIsOpen(false);
                      close();
                    }}
                    style={{ background: '#dc3545', color: '#white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}
        </Popup>
      )}

      {/* Optional: Display submitted review details if desired */}
      {submittedMessage && (
        <div className="submitted-review-box" style={{ marginTop: '15px' }}>
          <h3>Submitted Message:</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
          <p><strong>Rating:</strong> {'★'.repeat(submittedMessage.rating)}</p>
        </div>
      )}
    </div>
  );
}

export default GiveReviews;
