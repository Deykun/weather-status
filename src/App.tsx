import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import SearchLocation from './components/SearchLocation/SearchLocation';
import WeatherForLocation from './components/WeatherLocation/WeatherLocation';

import './App.scss';

const queryClient = new QueryClient();

const CRACOW = {
  latitude: 50.0617,
  longitude: 19.9375,
};

const BARCELONA = {
  latitude: 41.2319,
  longitude: 2.0932,
}

const SEOUL = {
  latitude: 37.3357,
  longitude: 126.5842,
}

const melbourne  = {
  latitude: -37.814,
  longitude: 144.96332,
};

const la  = {
  latitude: 34.0300,
  longitude: 118.15,
};

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
    ...la,
  });

  console.log(closestId);

  return (
    <QueryClientProvider client={queryClient}>
      <>
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
    </QueryClientProvider>
  )
}

export default App
