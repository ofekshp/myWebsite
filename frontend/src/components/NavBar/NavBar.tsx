import { useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="navbarMain">
        <div className="navbarButton">
        <button className="HomeBTN" onClick={() => navigate('/')}>Home</button>
        <button className="weatherBTN" onClick={() => navigate('/weatherApp')}>Weather Website</button>
        <button className="drComputerBTN" onClick={() => navigate('/drComputerApp')}>DrComputer Website</button>
        </div>
    </nav>
  );
}

export default NavBar;
