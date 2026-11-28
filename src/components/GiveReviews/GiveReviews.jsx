
import React, { useState, useEffect } from "react";
import "./GiveReviews.css";

const GiveReviews = ({ doctorName, doctorSpeciality, onSubmit, reviewData }) => {
  const [rating, setRating] = useState(reviewData?.rating || 0);
  const [name, setName] = useState(reviewData?.name || "");
  const [submitted, setSubmitted] = useState(reviewData?.submitted || false);

  const hasGivenReview = reviewData && reviewData.rating > 0;
  const isFormValid = name.trim() !== "" && rating > 0 && !hasGivenReview;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    onSubmit({ doctorName, doctorSpeciality, name, rating: rating, comment: comment });
    setSubmitted(true);
  };

  if (submitted) {
    return (<div>Thank you for your review!</div>);
  }

  return (
    <form onSubmit={handleSubmit} className="give-reviews" data-testid="give-reviews-popup">
      <label>Name: <input value={name} onChange={e => setName(e.target.value)} required/></label>
      <br/>
      <select value={rating} onChange={e => setRating(e.target.value)}>
        <option value={1}>1 star</option>
        <option value={2}>2 stars</option>
        <option value={3}>3 stars</option>
        <option value={4}>4 stars</option>
        <option value={5}>5 stars</option>
      </select>
      <br/>
      <textarea placeholder="Your review"></textarea>
      <br/>
      <button disabled={!isFormValid}>Submit Review</button>
      <button type="button" onClick={() => setRating(0)}>Clear</button>
    </form>
  );
};
export default GiveReviews;

