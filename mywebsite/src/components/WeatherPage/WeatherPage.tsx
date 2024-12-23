import './WeatherPage.css'
import { IoIosSearch } from "react-icons/io";
import wind from '../../assets/weather/wind.png'
import sun from '../../assets/weather/sun.png'
import clouds from '../../assets/weather/clouds.png'
import rain from '../../assets/weather/rain.png'
import humidity from '../../assets/weather/humidity.png'
import snow from '../../assets/weather/snow.png'
import drizzle from '../../assets/weather/drizzle.png'
import { getWeatherData } from "../../services/weather/weatherAPI";
import { useState } from 'react';

interface WeatherData {
  location: string;
  windSpeed: number;
  temperature: number;
  humidity: string;
  icon: string;
}

const WeatherPage = () => {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const iconsCode = {
    "01d": sun,
    "01n": sun,
    "02d": clouds,
    "02n": clouds,
    "03d": clouds,
    "03n": clouds,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  }

  const search = async (city:string) => {
    try{
      const response = await getWeatherData(city);
      const data = response.data;
      console.log(data);
      const icon = iconsCode[data.weather[0].icon as keyof typeof iconsCode] || sun;
      setWeatherData({
        location: data.name,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        icon: icon
      });
    } catch (error) {
      alert("City not found.");
    }
  }

  const searchInfo = () => {
    if(city.trim() === "") {
      alert("Please Enter a city name.");
      return;
    }
    search(city);
  }

  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" placeholder="Search..." value={city} onChange={(e) => setCity(e.target.value)} />
        <IoIosSearch className='search-icon' onClick={searchInfo}/>
      </div>
    <img src={weatherData?.icon} alt="" className="icons"/>
    <p className='temp'>{weatherData?.temperature}&deg;C</p>
    <p className='city'>{weatherData?.location}</p>
    <div className='weather-info'>
      <div className='col'>
        <img src={humidity} alt="" className='icons'/>
        <div> 
          <p>{weatherData?.humidity} %</p>
          <span>Humidity</span>
        </div>
      </div>
      <div className='col'>
        <img src={wind} alt="" className='icons'/>
        <div> 
          <p>{weatherData?.windSpeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  </div>
  )
}
export default WeatherPage
