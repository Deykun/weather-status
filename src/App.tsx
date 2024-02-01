import { useState } from 'react';

import SearchLocation from './components/SearchLocation/SearchLocation';
import WeatherForLocation from './components/WeatherLocation/WeatherLocation';

import './App.scss'

function App() {
  const [{
    closestId,
    latitude,
    longitude,
  }, setLocation] = useState({
    // closestId: '',
    closestId: '16121',
    // latitude: 0,
    // longitude: 0,
    latitude: 50.0617,
    longitude: 19.9375,
  });

  console.log(closestId);

  return (
    <>
      <header>Weather status</header>
      <main>
        <WeatherForLocation latitude={latitude} longitude={longitude} />
        <SearchLocation
          closestId={closestId}
          latitude={latitude}
          longitude={longitude}
          setLocation={setLocation}
        />
      </main>
    </>
  )
}

export default App
