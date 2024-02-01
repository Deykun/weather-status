export interface ILocation {
    closestId: string,
    latitude: number,
    longitude: number,
}

export interface ICordinates {
    latitude: number,
    longitude: number,
}

export interface IWeatherStatus {
    weatherDescription: string,
    temperature: number,
    unitTemperature: 'celcius' | 'farenheit',
    precipation: number,
    unitPrecipitation: string,
    windSpeed: number,
    unitWindSpeed: string,
}
