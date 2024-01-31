import { useEffect, useMemo, useState } from 'react';

import useThrottle from '../../hooks/useThrottle';

import { searchBestCityByPhrase } from '../../utils/search';

import IconCity from '../Icon/IconCity';
import IconVillage from '../Icon/IconVillage';

// import IconMarker from './components/Icon/IconMarker';
// import Button from './components/Button';
import Button from '../Button';
import Input from '../Input';

import './SearchByTyping.scss'

const addMatchHighlightToString = (text: string, phrase: string) => {
  const regExp = new RegExp(phrase, "ig");
  const replaceMask = `<span class="result-match">${phrase}</span>`;
  
  return text.replace(regExp, replaceMask);
};

const SearchByTyping = () => {
  const [phrase, setPhrase] = useState('');

  const searchPhrase = useThrottle(phrase, 500);

  const searchResult = useMemo(() => {
    return searchBestCityByPhrase(searchPhrase);
  }, [searchPhrase]);

  console.log(searchResult)

  return (
    <>
        <Input placeholder="Wyszukaj miejscowość" value={phrase} onChange={setPhrase}/>
        <ul className="result-results">
          {searchResult.map(({ id, type, name, province, district, commune }) => (
            <li key={id}>
              <Button className="result-button">
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

export default SearchByTyping
