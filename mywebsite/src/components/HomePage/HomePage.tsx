
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <h1>Welcome to the Home Page</h1>
      <div className="button-container">
        <button onClick={() => navigate('/weatherApp')}>Go to Weather App</button>
        <button onClick={() => navigate('/somewhere2')}>Go to Website 2</button>
        <button onClick={() => navigate('/somewhere3')}>Go to Website 3</button>
      </div>
    </div>
  );
};

export default HomePage;
