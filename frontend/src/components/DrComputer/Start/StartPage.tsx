import { useNavigate } from 'react-router-dom';
import './StartPage.css';
import image from '../../../assets/drcomputer/logo.png';
import NavBarMain from '../../NavBar/NavBar.tsx';

function StartPage() {
  const logo=image
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <NavBarMain />
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <h1>Welcome !</h1>
      <div className="button-container">
        <button className="nav-button" onClick={() => navigate('/drComputerApp/Login')}>Login</button>
        <button className="nav-button" onClick={() => navigate('/drComputerApp/Register')}>Register</button>
      </div>
    </div>
  );
}

export default StartPage;
