import { useCallback, useEffect, useMemo, useState } from 'react';

import { getClosestLocationToCordinates } from '../../utils/search';

import IconMarker from '../Icon/IconMarker';
import IconMarkerError from '../Icon/IconMarkerError';

import Button from '../Button';

import SearchByTyping from './SearchByTyping';

import './SearchByBrowserGeolocation.scss';

interface Props {
  closestId: string,
  latitude: number
  longitude: number,
  // setLocation,
}

const SearchByBrowserGeolocation = ({
  closestId,
  latitude,
  longitude,
  setNewLocation,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isGeolocating, setIsGeolocating] = useState(false);

  const handleClick = useCallback(() => {
    setIsGeolocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log({
          latitude, longitude,
        });
        const bestId = getClosestLocationToCordinates({
          latitude,
          longitude,
        });

        console.log(bestId);

        setNewLocation({
          closestId: bestId,
          latitude,
          longitude,
        });
        // const x = getDistanceBetweenTwoPointsInKm(la)

        setErrorMessage('');
        setIsGeolocating(false);
      },
      (error) => {
        setIsGeolocating(false);

        const { code } = error;

        switch (code) {
          case GeolocationPositionError.TIMEOUT:
            setErrorMessage('Brak odpowiedzi w wymaganym czasie...');

            break;
          case GeolocationPositionError.PERMISSION_DENIED:
            setErrorMessage('Odmówiono dostępu do lokalizacji, pozwolenie na udostępnienie lokalizacji w lewym górnym rogu.');

            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            setErrorMessage('Nie ustalono lokalizacji');

            break;
        }
      }
   );
  }, []);

  return (
    <>
      {errorMessage && <p className="geolocation-error">
        <IconMarkerError /> <span>{errorMessage}</span>
      </p>}
      <Button onClick={handleClick} isDisabled={isGeolocating} isLoading={isGeolocating}>
        <IconMarker />
        <span>Na podstawie lokalizacji</span>
      </Button>
    </>
  )
}

export default SearchByBrowserGeolocation;