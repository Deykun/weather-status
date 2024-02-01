import { useCallback, useMemo, useState } from 'react';

import useThrottle from '../../hooks/useThrottle';

import {
  getLocationById,
  searchBestLocationByPhrase,
} from '../../utils/search';

import IconCity from '../Icon/IconCity';
import IconVillage from '../Icon/IconVillage';

import Button from '../Button';
import Input from '../Input';

import './SearchByTyping.scss'

const addMatchHighlightToString = (text: string, phrase: string) => {
  let newText = text;
  const regExp = new RegExp(phrase, "ig");

  const matches = newText.match(regExp) || [];

  matches.forEach((match) => {
    newText = newText.replaceAll(match, `<span class="result-match">${match}</span>`);
  });
  
  return newText;
};

interface Props {
  // setLocation: React.ReactNode,
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}


const SearchLocation = ({ setNewLocation, closestId, onClose }: Props) => {
  const [phrase, setPhrase] = useState('');

  const searchPhrase = useThrottle(phrase, 500);

  const searchResult = useMemo(() => {
    return searchBestLocationByPhrase(searchPhrase);
  }, [searchPhrase]);

  const handleSetPickedLocation = useCallback((id: string) => {
    if (closestId === id) {
      onClose();

      return;
    }

    const {
      latitude,
      longitude,
    } = getLocationById(id) || {};

    if (latitude && longitude) {
      setNewLocation(({
        closestId: id,
        latitude,
        longitude,
      }));
    }
  }, [setNewLocation]);

  const handleSetRandomLocation = () => {
    setNewLocation(({
      closestId: '1211',
      latitude: getRandomInt(-20, 40),
      longitude: getRandomInt(0, 80),
    }));
  }

  return (
    <>
        <Button className="result-button" onClick={handleSetRandomLocation}>
          <span>Random location</span>
        </Button>
        <Input placeholder="Wyszukaj miejscowość" value={phrase} onChange={setPhrase}/>
        <ul className="result-results">
          {searchResult.map(({ id, type, name, province, district, commune }) => (
            <li key={id}>
              <Button className="result-button" onClick={() => handleSetPickedLocation(id)}>
                <h2>
                  {type === 'city' ? <IconCity /> : <IconVillage />}
                  <span dangerouslySetInnerHTML={{__html: addMatchHighlightToString(name, searchPhrase) }} />
                </h2>
                <p dangerouslySetInnerHTML={{__html: addMatchHighlightToString(`${province}, ${district}, ${commune}`, searchPhrase) }} />
              </Button>
            </li>
          ))}
        </ul>
    </>
  )
}

export default SearchLocation
