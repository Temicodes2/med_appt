import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('auth-token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    window.location.href = '/login';
  };

  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="nav__logo" onClick={() => window.location.href = '/'}>
        StayHealthy
        <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: '#3685fb' }} aria-hidden="true">
          <title>Doctor With Stethoscope SVG icon</title>
          <g>
            <g>
              <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
              <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
              <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44...."></path>
            </g>
          </g>
        </svg>
      </div>

      <div className="nav__icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
      </div>

      <ul className={`nav__links ${isMenuOpen ? 'active' : ''}`}>
        <li className="link">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
        </li>
        <li className="link">
          <NavLink to="/booking-consultation" className={({ isActive }) => (isActive ? 'active-link' : '')}>Appointments</NavLink>
        </li>
        <li className="link">
          <NavLink to="/instant-consultation" className={({ isActive }) => (isActive ? 'active-link' : '')}>Instant Consultation</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li className="link">
              <NavLink to="/patient-report" className={({ isActive }) => (isActive ? 'active-link' : '')}>Patient Report</NavLink>
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <a href="/signup"><button className="btn1">Sign Up</button></a>
            </li>
            <li className="link">
              <a href="/login"><button className="btn1">Login</button></a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
