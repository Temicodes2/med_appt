import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindDoctorSearch.css';

const initSpecialties = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda'
];

const FindDoctorSearch = ({ onSearchSelect }) => {
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [specialties] = useState(initSpecialties);
  const navigate = useNavigate();

  const handleDoctorSelect = (specialty) => {
    setSearchDoctor(specialty);
    setDoctorResultHidden(true);
    // Navigate to search-results route with the selected specialty
    navigate(`/booking-consultation?speciality=${encodeURIComponent(specialty)}`);
    if (onSearchSelect) {
      onSearchSelect(specialty);
    }
  };

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              onFocus={() => setDoctorResultHidden(false)}
              onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />
            <div className="findiconimg">
              <i className="fa fa-search"></i>
            </div>
            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {specialties
                .filter((specialty) =>
                  specialty.toLowerCase().includes(searchDoctor.toLowerCase())
                )
                .map((specialty) => (
                  <div
                    className="search-doctor-result-item"
                    key={specialty}
                    onMouseDown={() => handleDoctorSelect(specialty)}
                  >
                    <span>
                      <i className="fa fa-search" style={{ fontSize: '12px' }}></i>
                    </span>
                    <span>{specialty}</span>
                    <span>SPECIALITY</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
