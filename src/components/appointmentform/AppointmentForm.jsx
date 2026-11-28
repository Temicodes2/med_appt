import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:30 AM',
    '02:00 PM',
    '04:00 PM',
    '05:30 PM'
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !appointmentDate || !selectedSlot) {
      alert('Please fill out all fields and select a time slot.');
      return;
    }

    onSubmit({
      name,
      phoneNumber,
      appointmentDate,
      selectedSlot
    });

    // Clear form fields after submission
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setSelectedSlot('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Date of Appointment:</label>
        <input
          type="date"
          id="appointmentDate"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="timeSlot">Book Time Slot:</label>
        <select
          id="timeSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="book-appointment-btn">
        Book Now
      </button>
    </form>
  );
};

export default AppointmentForm;
