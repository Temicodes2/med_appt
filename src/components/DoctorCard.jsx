import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css'; // Ensure this matches your CSS filename
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Load existing appointments for this doctor from localStorage on mount
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem(name)) || [];
    setAppointments(storedAppointments);
  }, [name]);

  // Handle booking a new appointment
  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);

    // Save to localStorage for Notification and Reports components
    localStorage.setItem(name, JSON.stringify(updatedAppointments));
    localStorage.setItem(
      'doctorData',
      JSON.stringify({ name, speciality, experience, ratings })
    );

    // Notify other components (like Notification.jsx) that storage updated
    window.dispatchEvent(new Event('storage'));
    setShowModal(false);
  };

  // Handle canceling an existing appointment
  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(updatedAppointments);

    if (updatedAppointments.length === 0) {
      localStorage.removeItem(name);
      localStorage.removeItem('doctorData');
    } else {
      localStorage.setItem(name, JSON.stringify(updatedAppointments));
    }

    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={name} className="doctor-profile-img" />
          ) : (
            <svg
              xmlns="http://w3.org"
              width="46"
              height="46"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          )}
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button
              className={`book-appointment-btn ${
                appointments.length > 0 ? 'cancel-appointment' : ''
              }`}
            >
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onOpen={() => setShowModal(true)}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div
              className="doctorbg"
              style={{ height: '100vh', overflow: 'scroll' }}
            >
              <div>
                <div className="doctor-card-profile-image-container">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt={name}
                      className="doctor-profile-img"
                    />
                  ) : (
                    <svg
                      xmlns="http://w3.org"
                      width="46"
                      height="46"
                      fill="currentColor"
                      className="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  )}
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">
                    {speciality}
                  </div>
                  <div className="doctor-card-detail-experience">
                    {experience} years experience
                  </div>
                  <div className="doctor-card-detail-consultationfees">
                    Ratings: {ratings}
                  </div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date: {appointment.date}</p>
                      <p>Time Slot: {appointment.selectedSlot}</p>
                      <button
                        onClick={() => {
                          handleCancel(appointment.id);
                          close();
                        }}
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={handleFormSubmit}
                />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
