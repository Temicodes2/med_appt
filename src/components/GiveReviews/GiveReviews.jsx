import React, { useState } from 'react';
import './GiveReviews.css'; // Ensure this matches your CSS filename

function GiveReviews({ onSubmitReview }) {
  // State variables for form inputs and UI feedback
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });

  // Toggle form visibility
  const handleButtonClick = () => {
    setShowForm(true);
  };

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
      setSubmittedMessage(formData);
      
      // Pass the review data up to the parent component (ReviewForm) if provided
      if (onSubmitReview) {
        onSubmitReview(formData);
      }

      // Reset form and hide it after submission
      setFormData({ name: '', review: '', rating: 0 });
      setShowForm(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="give-reviews-container">
      {!showForm ? (
        <button 
          className="btn-primary" 
          onClick={handleButtonClick}
          disabled={!!submittedMessage} // Disables button once a review is submitted
        >
          {submittedMessage ? 'Review Submitted' : 'Click Here'}
        </button>
      ) : (
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
                  &#9733;
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      )}

      {/* Display the submitted review details */}
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
