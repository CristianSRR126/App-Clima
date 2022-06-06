import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import AppClima from './components/AppClima'
import Loading from './components/Loading'

function App() {

  const [isBoolean, setIsBoolean] = useState(true)
  const [background, setBackground] = useState(true)

  useEffect(() => {

    setTimeout(() => {
      setIsBoolean(!isBoolean)
    }, 3000)

  }, [])

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
        isBoolean ? <Loading /> : <AppClima />
      }

    </div>

  )
}

export default App
