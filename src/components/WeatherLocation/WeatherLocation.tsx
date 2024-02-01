import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getDistanceBetweenTwoPointsInKm } from '../../utils/distance';
import { getLocationById } from '../../utils/search';

import IconMarker from '../Icon/IconMarker';
import IconMarkerAlt from '../Icon/IconMarkerAlt';

import Button from '../Button';

import './WeatherLocation.scss';

export const getWeatherForCordinates = async ({ latitude, longitude }) => {
    const isReady = latitude !== 0 && longitude !== 0;
    if (!isReady) {
        return;
    }

    const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`);
    const rawData = await response.json();

    const {
        properties: {
            meta: {
                units: {
                    air_temperature: unitTemperature,
                    precipitation_amount: unitPrecipitation,
                    wind_speed: unitWindSpeed,
                }
            }
        },
    } = rawData;

    const nowData = rawData.properties.timeseries[0].data;

    console.log(nowData);

    const {
        instant: {
            details: {
                air_temperature: temperature,
                wind_speed: windSpeed,
            },
        },
        next_1_hours: {
            summary: {
                symbol_code: weatherDescription,
            },
            details: {
                precipitation_amount: precipation,
            }
        },
    } = nowData;

    const weatherStatus = {
        weatherDescription,
        temperature,
        unitTemperature,
        precipation,
        unitPrecipitation,
        windSpeed,
        unitWindSpeed,
    };

    return weatherStatus;
}

interface Props {
  latitude: number
  longitude: number,
}

const WeatherLocation = ({
  latitude,
  longitude,
}: Props) => {
    const [errorMessage, setErrorMessage] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    const isSetUp = latitude !== 0 && longitude !== 0;

    const {
        isLoading,
        error,
        data,
    } = useQuery({
        queryFn: () => getWeatherForCordinates({
            latitude,
            longitude,
          }),
        queryKey: ['weather', latitude, longitude],
    });

    const {
        weatherDescription,
        temperature,
        unitTemperature,
        precipation,
        unitPrecipitation,
        windSpeed,
        unitWindSpeed,
    } = data ?? {};

    console.log(data);
    console.log(error);

    if (!isSetUp) {
        return null;
    }

    return (
        <div className="weather-location">
            {isLoading ? <>Pobieranie...</> : <>
                <img className="weather-location-icon" src={`./weather-icons/${weatherDescription}.svg`} />
                <small>
                    {weatherDescription}
                </small>
                <strong className="weather-location-temperature">
                    {temperature}<sup>o</sup>{unitTemperature.at(0).toUpperCase()}
                </strong>
                <p>
                    {precipation}{unitPrecipitation}
                </p>
                <p>
                    {windSpeed} {unitWindSpeed}
                </p>            
            </>}
            {errorMessage && <>{errorMessage}</>}
        </div>
    );
};

export default WeatherLocation;
