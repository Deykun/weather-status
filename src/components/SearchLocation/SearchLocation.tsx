import { useEffect, useMemo, useState } from 'react';

import { getLocationById } from '../../utils/search';

import IconMarker from '../Icon/IconMarker';
import IconMarkerAlt from '../Icon/IconMarkerAlt';

import Button from '../Button';

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

  useEffect(() => {
    setIsSettingUp(false);
  }, [closestId])

  const {
    name,
    province,
    district,
    commune,
  } = useMemo(() => {
    const {
      name,
      province,
      district,
      commune,
    } = getLocationById(closestId) || {};

    return {
      name,
      province,
      district,
      commune,
    };
  }, [closestId]);

  // getLocationById

  const shouldShowEditLocation = isSettingUp || closestId === '';

  return (
    <>
      <header>Weather status</header>
      <main>
        {shouldShowEditLocation ? <>
          <Button>
            <IconMarker />
            <span>Na podstawie lokalizacji</span>
          </Button>
          <div className="or">
            lub
          </div>
          <SearchByTyping closestId={closestId} onClose={() => setIsSettingUp(false)} setLocation={setLocation} />
        </> : <Button className="result-button" onClick={() => setIsSettingUp(true)}>
            <h2>
              <IconMarkerAlt />
              <span>{name}</span>
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
