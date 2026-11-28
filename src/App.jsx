import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import BookingConsultation from './components/bookingconsultation';
import InstantConsultation from './components/InstantConsultationBooking/InstantConsultation';
import Setauthtoken from './Setauthtoken';
import PatientReport from './components/PatientReport/PatientReport';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/booking-consultation" element={<BookingConsultation />} />
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        <Route path="/patient-report" element={<PatientReport />} />
        <Route path="/set-authtoken/:authtoken" element={<Setauthtoken />} />
      </Routes>
    </Router>
  );
}

export default App;
