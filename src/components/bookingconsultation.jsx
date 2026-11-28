import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './finddoctorsearch/finddoctorsearch';
import DoctorCard from './DoctorCard';

const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  const getDoctorsDetails = () => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then((res) => res.json())
      .then((data) => {
        if (searchParams.get('speciality')) {
          const filtered = data.filter(
            (doctor) =>
              doctor.speciality.toLowerCase() ===
              searchParams.get('speciality').toLowerCase()
          );
          setFilteredDoctors(filtered);
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
        setDoctors(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredDoctors([]);
      setIsSearched(false);
    } else {
      const filtered = doctors.filter((doctor) =>
        doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearched(true);
      navigate(`/booking-consultation?speciality=${encodeURIComponent(searchText)}`);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
    // Optional: Uncomment if your lab requires redirecting unauthenticated users to Login
    // const authtoken = sessionStorage.getItem("auth-token");
    // if (!authtoken) {
    //   navigate("/login");
    // }
  }, [searchParams]);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearch onSearchSelect={handleSearch} />
        <div className="search-results-container">
          {isSearched ? (
            <center>
              <h2>
                {filteredDoctors.length} doctors are available{' '}
                {searchParams.get('speciality')}
              </h2>
              <h3>
                Book appointments with minimum wait-time & verified doctor
                details
              </h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard
                    className="doctorcard"
                    {...doctor}
                    key={doctor.name}
                  />
                ))
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          ) : (
            ''
          )}
        </div>
      </div>
    </center>
  );
};

export default BookingConsultation;
