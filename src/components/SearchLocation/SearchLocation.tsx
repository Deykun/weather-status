import { useEffect, useMemo, useState } from 'react';

import { getDistanceBetweenTwoPointsInKm } from '../../utils/distance';
import { getLocationById } from '../../utils/search';

import IconMarker from '../Icon/IconMarker';
import IconMarkerAlt from '../Icon/IconMarkerAlt';

import Button from '../Button';

import SearchByBrowserGeolocation from './SearchByBrowserGeolocation';
import SearchByTyping from './SearchByTyping';

interface Props {
  closestId: string,
  latitude: number
  longitude: number,
  // setLocation,
}

const SearchLocation = ({
  closestId,
  latitude,
  longitude,
  setLocation,
}: Props) => {
  const [isSettingUp, setIsSettingUp] = useState(true);

  const {
    name,
    province,
    district,
    commune,
    distnceKm,
  } = useMemo(() => {
    const {
      name,
      province,
      district,
      commune,
      latitude: locationLatitude,
      longitude: locationLongitude,
    } = getLocationById(closestId) || {};

    const distnceKm = getDistanceBetweenTwoPointsInKm({
      latitude,
      longitude,
    }, {
      latitude: locationLatitude || latitude,
      longitude: locationLongitude || longitude,
    })

    return {
      name,
      province,
      district,
      commune,
      distnceKm,
    };
  }, [closestId]);

  const handleNewLocation = (location) => {
    setLocation(location)
    setIsSettingUp(false);
  }

  // getLocationById

  const shouldShowEditLocation = isSettingUp || closestId === '';

  return (
    <>
      <header>Weather status</header>
      <main>
        {shouldShowEditLocation ? <>
          <SearchByBrowserGeolocation setNewLocation={handleNewLocation} />
          <div className="or">
            lub
          </div>
          <SearchByTyping closestId={closestId} onClose={() => setIsSettingUp(false)} setNewLocation={handleNewLocation} />
        </> : <Button className="result-button" onClick={() => setIsSettingUp(true)}>
            <h2>
              <IconMarkerAlt />
              <span>
                {name}
                {distnceKm > 1 && <span className="result-distance">{distnceKm.toFixed(2)}km</span>}
              </span>
            </h2>
            <p>
              {province}, {district}, {commune}
            </p>
        </Button>}
      </main>
    </>
  )
}

export default SearchLocation;
