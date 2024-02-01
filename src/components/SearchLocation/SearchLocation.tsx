import { useMemo, useState, Dispatch, SetStateAction } from 'react';

import { ILocation } from '../../types';

import { getDistanceBetweenTwoPointsInKm } from '../../utils/distance';
import { getLocationById } from '../../utils/search';

import IconGlobe from '../Icon/IconGlobe';
import IconMarkerAlt from '../Icon/IconMarkerAlt';

import Button from '../Button';

import SearchByBrowserGeolocation from './SearchByBrowserGeolocation';
import SearchByTyping from './SearchByTyping';

interface Props {
  closestId: string,
  latitude: number
  longitude: number,
  setLocation: Dispatch<SetStateAction<ILocation>>
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
  }, [closestId, latitude, longitude]);

  const handleNewLocation = (location: ILocation) => {
    setLocation(location)
    setIsSettingUp(false);
  }

  const shouldShowEditLocation = isSettingUp || closestId === '';

  return (
    <>
      {shouldShowEditLocation ? <>
        <SearchByBrowserGeolocation setNewLocation={handleNewLocation} />
        <div className="or">
          lub
        </div>
        <SearchByTyping closestId={closestId} onClose={() => setIsSettingUp(false)} setNewLocation={handleNewLocation} />
      </> : <Button className="result-button" onClick={() => setIsSettingUp(true)}>
          {distnceKm < 100 ? <>
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
          </> : <>
            <h2>
              <IconGlobe />
              <span>Ziemia</span>
            </h2>
            <p>
              Współrzędne {latitude.toFixed(3)}, {longitude.toFixed(3)}
            </p>
          </>}
      </Button>}
    </>
  )
}

export default SearchLocation;
