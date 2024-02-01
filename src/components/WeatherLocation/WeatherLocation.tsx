import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getDistanceBetweenTwoPointsInKm } from '../../utils/distance';
import { getLocationById } from '../../utils/search';

import IconMarker from '../Icon/IconMarker';
import IconMarkerAlt from '../Icon/IconMarkerAlt';

import Button from '../Button';

export const getWeatherForCordinates = async ({ latitude, longitude }) => {
    const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);


    return response.json();
}

interface Props {
  latitude: number
  longitude: number,
}

const WeatherLocation = ({
  latitude,
  longitude,
}: Props) => {
    const abortControllerRef = useRef<AbortController | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isSetUp = latitude !== 0 && longitude !== 0;

    useEffect(() => {
        (async () => {
            if (!isSetUp) {
                return;
            }

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
    
            setErrorMessage('');
            setIsLoading(true);

            try {
                const response = await getWeatherForCordinates({ latitude, longitude }, {
                    signal: abortControllerRef.current?.signal,
                });

                console.log(response);
            } catch (error: unknown) {
                if (typeof error === 'object' && error?.name === 'AbortError') {
                    return;
                }

                setErrorMessage('Błąd pobierania');
            } finally {
                setIsLoading(false);
            }
        })();
    }, [isSetUp, latitude, longitude]);

    if (!isSetUp) {
        return null;
    }

    return (
        <div>
            {isLoading && <>Loading...</>}
            {errorMessage && <>{errorMessage}</>}
            <p>Prognoza</p>
        </div>
    );
};

export default WeatherLocation;
