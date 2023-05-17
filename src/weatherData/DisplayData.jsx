import React, { useEffect, useState } from 'react';
import Imagerender from './Imagerender';
import './index.css'

function DisplayData() {

  const [placeName, setPlaceName] = useState('')
  const [setData, setSetData] = useState(false)
  const [country, setCountry] = useState('')
  const [iconOfTemp, setIconOfTemp] = useState('')
  const [visibility, setVisibility] = useState('')
  const [feelsLikeTemp, setFeelsLikeTemp] = useState('')
  const [humidityInside, setHumidityInside] = useState('')
  const [temperatureMax, setTemperatureMax] = useState('')
  const [temperatureMin, setTemperatureMin] = useState('')
  const [temperatureNear, setTemperatureNear] = useState('')
  const [temperatureInF, setTemperatureInF] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [windDegree, setWindDegree] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')
  const [sunRise, setSunRise] = useState()
  const [sunSet, setSunSet] = useState([])

  useEffect(() => {
    let long;
    let lat;
    const api = '3f003c6a73fc8801a7ee82844b0f0230'
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
        fetch(base)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setSetData(true)
            console.log('Data', data);
            const { temp } = data.main;
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const fahrenheit = (temp * 9) / 5 + 32;
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);
            setPlaceName(data.name)
            setCountry(data.sys.country)
            setVisibility(data.visibility)
            setHumidityInside(data.main.humidity)
            setTemperatureMax(data.main.temp_max)
            setTemperatureMin(data.main.temp_min)
            setFeelsLikeTemp(data.main.feels_like)
            setWindSpeed(data.wind.speed)
            setWindDegree(data.wind.deg)
            setTemperatureNear(temp)
            setTemperatureInF(fahrenheit)
            setWeatherDescription(description.charAt(0).toUpperCase() + description.slice(1))
            setIconOfTemp(iconUrl)
            setSunRise(sunriseGMT.getHours() + ":" + sunriseGMT.getMinutes() + ", " + sunriseGMT.toDateString())
            setSunSet(sunsetGMT.getHours() + ":" + sunsetGMT.getMinutes() + ", " + sunsetGMT.toDateString())
          })
          .catch(error => {
            // throw (error);
            console.log('error', error)
          })
      });
    }
  }, []);

  const currentTime = new Date();

  return (
    <div>
      {setData ?
        <div className='centered'>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '30px', textAlign: 'left' }}>
              <p className='mainDate'>{currentTime.toDateString() + ", " + currentTime.getHours() + ":" + currentTime.getMinutes()}</p>
              <h3>{placeName + ", " + country}</h3>
              <div style={{ display: 'flex' }}>
                <img src={iconOfTemp} alt='temp' style={{ width: '50%', height: '100px', alignItems: 'left' }} />
                <p className='imageTemp'>
                  {temperatureNear}°C
                </p>
              </div>
              <h4>Feels like {feelsLikeTemp}°C , with  {weatherDescription}</h4>
              <div style={{ display: 'flex', width: '350px' }}>
                <div className='bottomDetails'>
                  <p>Wind Speed {windSpeed}km/h</p>
                  <p>Wind degree {windDegree}°</p>
                  <p>Visbility : {visibility / 1000}.0km</p>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <p>Humidity is {humidityInside}</p>
                  <p>Max Temp {temperatureMax}°C</p>
                  <p>Min Temp {temperatureMin}°C</p>
                </div>
              </div>
            </div>
            <div>
              <Imagerender />
            </div>
          </div>
        </div>
        :
        <div className='centeredError'>
          <div>
            <div className="blink_me">Allow the permission</div>
            <img className='imageArrow' src='./arrow-left-solid.svg' alt='Arrow up left' />
          </div>
          <h1>Weather is not Available </h1>
          <p>Allow Location in settings or try to reload</p>
          <p>Reset permissions if above steps did not help</p>
        </div>
      }
    </div >
  )
}

export default DisplayData