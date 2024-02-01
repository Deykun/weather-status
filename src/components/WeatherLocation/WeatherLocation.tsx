import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { ICordinates, IWeatherStatus } from '../../types';

import { POLISH_DESCRIPTION_BY_SYMBOL_CODE } from './constants';

import './WeatherLocation.scss';

export const getWeatherForCordinates = async ({ latitude, longitude }: ICordinates): Promise<IWeatherStatus | undefined> => {
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
    const [isLoaded, setIsLoaded] = useState(false);

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

    useEffect(() => {
        setIsLoaded(false);
    }, [weatherDescription])

    const onLoad = () => {
        setIsLoaded(true);
    }

    const isSetUp = latitude !== 0 && longitude !== 0;

    if (!isSetUp) {
        return null;
    }

    return (
        <>
            <div className="weather-location">
                {isLoading ? <>Pobieranie pogody...</> : <>
                    <span
                        className={clsx(
                            'weather-location-icon-wrapper', { 
                            'weather-location-icon-wrapper-with-loaded': isLoaded,
                        })}
                    >
                        <img
                            className="weather-location-icon"
                            src={`./weather-icons/${weatherDescription}.svg`}
                            onLoad={onLoad}
                        />
                    </span>
                    <small className="weather-location-status">
                        {POLISH_DESCRIPTION_BY_SYMBOL_CODE[weatherDescription || ''] ?? weatherDescription}
                    </small>
                    <strong className="weather-location-temperature">
                        {temperature}<sup>o</sup>{unitTemperature? unitTemperature[0].toUpperCase() : ''}
                    </strong>
                    <div className="weather-location-data">
                        <p>
                            Opady: {precipation} {unitPrecipitation}
                        </p>
                        <p>
                            Wiatr: {windSpeed} {unitWindSpeed}
                        </p>
                    </div>           
                </>}
            </div>
            {!isLoading && !error && <p className="weather-location-source">Dane dzięki uprzejmości <strong>MET Norway</strong>.</p>}
        </>
    );
};

export default WeatherLocation;
