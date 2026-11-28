import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const getStarted = () => {
    navigate('/booking-consultation');
  };

  return (
    <section className="hero-section">
      <div className="flex-hero">
        <h1>
          Your Health<br />
          <span className="text-gradient">Our Responsibility</span>
        </h1>
        <div className="blob-cont">
          <div className="blue blob" aria-hidden="true"></div>
        </div>
        <div className="blob-cont">
          <div className="blue1 blob" aria-hidden="true"></div>
        </div>
        <h4>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque at quae
          ducimus. Suscipit omnis quibusdam non cum rem voluptatem!
        </h4>
        <button className="button" onClick={getStarted}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default LandingPage;
