import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ILocation } from './types';

import SearchLocation from './components/SearchLocation/SearchLocation';
import WeatherForLocation from './components/WeatherLocation/WeatherLocation';

import './App.scss';

const queryClient = new QueryClient();

function App() {
  const [{
    closestId,
    latitude,
    longitude,
  }, setLocation] = useState<ILocation>({
    closestId: '',
    latitude: 0,
    longitude: 0,
  });

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
