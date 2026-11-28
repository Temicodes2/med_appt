import React, { useState, useEffect } from "react";
import "./BookingConsultation.css";
import AppointmentForm from "./appointmentform/appointmentform";
import ProfileCard from "./ProfileCard/ProfileCard";
import GiveReviews from "./GiveReviews/GiveReviews";

const DoctorCard = ({ name, speciality, experience, fee, image, about, phone, email, ...rest }) => {
  const [showForm, setShowForm] = useState(false);
  const [booked, setBooked] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("doctor_appointments_" + name);
    if (stored) {
      try {
        setAppointments(JSON.parse(stored));
      } catch (e) {
        console.warn("Failed to parse appointments from localStorage", e);
      }
    }
  }, [name]);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "doctor_appointments_" + name,
      JSON.stringify(appointments)
    );
  }, [appointments, name]);

  const handleBooking = (data) => {
    setBooked(true);
    setShowForm(false);
    // Add new appointment to state
    const newAppointment = {
      id: Date.now(),
      name: name,
      date: data.appointmentDate,
      slot: data.selectedSlot,
      status: "booked",
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const handleCancel = (appointmentId) => {
    setBooked(false);
    setReviewSubmitted(false);
    setShowForm(false);
    // Remove appointment from localStorage and state
    setAppointments(
      appointments.filter((appt) => appt.id !== appointmentId)
    );
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
        ratings={fee && fee.split(" ")[0]}
        image={image}
        about={about}
        phone={phone}
        email={email}
      />
      <div className="doctor-actions">
        {!booked && !reviewSubmitted ? (
          <>
            <button className="book-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Close Form" : "Book Appointment"}
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
            <button
              className="cancel-btn"
              onClick={() => handleCancel(Date.now())}
            >
              Cancel Appointment
            </button>
          </>
        )}
        {reviewSubmitted && (
          <>
            <p className="review-thank-you">
              Thank you for your feedback, Dr. {name}'s profile is now updated with your review.
            </p>
            <button
              className="cancel-btn"
              onClick={() => handleCancel(Date.now())}
            >
              Cancel Appointment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
