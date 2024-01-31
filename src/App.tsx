import { useState } from 'react';

import SearchLocation from './components/SearchLocation/SearchLocation';

import './App.scss'

function App() {
  const [{
    closestId,
    latitude,
    longitude,
  }, setLocation] = useState({
    closestId: '',
    latitude: 0,
    longitude: 0,
  });


  return (
    <>
      <header>Weather status</header>
      <main>
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
