import { useNavigate } from 'react-router-dom';
import NavBarMain from '../NavBar/NavBar.tsx';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <NavBarMain />

      <div className="header">
        <h1>Ofek Shpirer</h1>
        <h2>The Website still in progress...(He is new)</h2>
      </div>
      
      <div className="about">
        <p>
          Hi, I'm Ofek Shpirer, a passionate software developer with experience in building 
          web applications using modern technologies. I love solving complex problems, learning new skills, 
          and working on innovative projects.
        </p>
      </div>

      <div className="button-container">
        <button onClick={() => navigate('/weatherApp')}>Go to Weather App</button>
        <button onClick={() => navigate('/drComputerApp')}>Go to DrComputer</button>
        <button onClick={() => navigate('/somewhere3')}>Go to Website 3</button>
      </div>
    </div>
  );
};

export default HomePage;
