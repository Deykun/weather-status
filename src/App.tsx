import { useEffect, useMemo, useState } from 'react';
import './App.scss'

import useThrottle from './hooks/useThrottle';

import { searchBestCityByPhrase } from './utils/search';

import IconMarker from './components/Icon/IconMarker';
import Button from './components/Button';
import Input from './components/Input';

import SearchByTyping from './components/SearchByTyping/SearchByTyping';

function App() {
  return (
    <>
      <header>Weather status</header>
      <main>
        <br />
        <br />
        <Button>
          <IconMarker />
          <span>Na podstawie lokalizacji</span>
        </Button>
        <div className="or">
          lub
        </div>
        <SearchByTyping />
      </main>
    </>
  )
}

export default App
