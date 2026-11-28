import React, { useState } from 'react';
import './BookingConsultation.css';
import AppointmentForm from './appointmentform/appointmentform';
import ProfileCard from './ProfileCard/ProfileCard';
import GiveReviews from './GiveReviews/GiveReviews';

const DoctorCard = ({ name, speciality, experience, fee, image, about, phone, email, ...rest }) => {
  const [showForm, setShowForm] = useState(false);
  const [booked, setBooked] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleBooking = (data) => {
    setBooked(true);
    setShowForm(false);
  };

  const handleReviewSubmit = (reviewData) => {
    setReviewSubmitted(true);
    alert(`Thank you for reviewing Dr. ${name}! Rating: ${reviewData.rating} stars`);
  };

  return (
    <div className="doctorcard" {...rest}>
      <ProfileCard
        name={name}
        speciality={speciality}
        experience={experience}
        ratings={fee && fee.split(' ')[0]}
        image={image}
        about={about}
        phone={phone}
        email={email}
      />
      <div className="doctor-actions">
        {!booked && !reviewSubmitted ? (
          <>
            <button className="book-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Close Form' : 'Book Appointment'}
            </button>
            {showForm && (
              <AppointmentForm
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleBooking}
              />
            )}
          </>
        ) : null}
        {booked && !reviewSubmitted && (
          <>
            <p className="booking-confirmed">
              Appointment booked with Dr. {name}! Please leave a review below.
            </p>
            <GiveReviews
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleReviewSubmit}
            />
          </>
        )}
        {reviewSubmitted && (
          <p className="review-thank-you">
            Thank you for your feedback, Dr. {name}'s profile is now updated with your review.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
