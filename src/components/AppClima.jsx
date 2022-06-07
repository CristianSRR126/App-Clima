import React from 'react'
import '../stylesheets/appClima.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AppClima = () => {

  const [location, setLocation] = useState()
  const [weather, setWeather] = useState()
  const [degress, setDegress] = useState(true)

  useEffect(() => {

    const succes = position => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      setLocation({ lat, lon })
    }

    navigator.geolocation.getCurrentPosition(succes)

  }, [])

  useEffect(() => {

    if (location !== undefined) {

      const key = '8433db8fe7bf43e929874f28bf3e0e4d'
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${key}`

      axios.get(api)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))

    }

  }, [location])

  const toggleToF = () => setDegress(false)
  const toggleToC = () => setDegress(true)

  return (

    <div className='appClima'>

      <span className='country'>{`${weather?.name}, ${weather?.sys.country}`}</span>

      <div className='weather'>

        <span className='button'>

          <button onClick={toggleToF}>F°</button>
          <button onClick={toggleToC}>C°</button>

        </span>

        <span className='temperature'>{degress ? `${(weather?.main.temp - 273.15).toFixed(0)}°C` : `${((((weather?.main.temp - 273.15) * 9) / 5) + 32).toFixed(0)}°F`}</span>

      </div>

      <span className='description'>{weather?.weather[0].description}</span>

      <div className='bubble'>

        <span><i className="bi bi-wind"></i>{(((weather?.wind.speed) * 1 / 1000) * 3600 / 1).toFixed(0)} km/h</span>
        <span><i className="bi bi-cloud"></i>{weather?.clouds.all}%</span>
        <span><i className="bi bi-droplet-half"></i>{weather?.main.humidity}%</span>

      </div>

    </div>

  )
}

export default AppClima