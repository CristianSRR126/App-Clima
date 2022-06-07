import React from 'react'
import '../stylesheets/appClima.css'
import { useState } from 'react'

const AppClima = ({ weather }) => {

  const [degress, setDegress] = useState(true)

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