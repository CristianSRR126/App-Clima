import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './App.css'
import AppClima from './components/AppClima'
import Loading from './components/Loading'

function App() {

  const [isBoolean, setIsBoolean] = useState(true)
  const [background, setBackground] = useState(true)
  const [location, setLocation] = useState()
  const [weather, setWeather] = useState()

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
        .then(res => {
          setWeather(res.data)
          setIsBoolean(false)
        })
        .catch(err => console.log(err))

    }

  }, [location])

  useEffect(() => {

    let hour = new Date().getHours()

    if (hour >= 5 && hour <= 18) {
      setBackground(background)
    } else {
      setBackground(!background)
    }

  }, [])

  return (

    <div className={background ? 'morning' : 'night'}>

      {
        isBoolean ? <Loading /> : <AppClima weather={weather} />
      }

    </div>

  )
}

export default App
