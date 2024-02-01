import polishCitiesAndVillages from 'polskie-miejscowosci';
import { getDistanceBetweenTwoPointsInKm } from './distance';

interface ILocation {
    id: string,
    name: string,
    type: "village" | "city",
    province: string,
    district: string,
    commune: string,
    latitude: number
    longitude: number
}

const {
    cities,
    villages,
} = polishCitiesAndVillages.reduce((stack: {
    cities: ILocation[],
    villages: ILocation[],
}, item) => {
    const location = {
        id: item.Id,
        name: item.Name,
        type: item.Type,
        province: item.Province,
        district: item.District,
        commune: item.Commune.replace('-gmina miejsko-wiejska', '').replace('-gmina wiejska', '').replace('-gmina miejska', ''),
        latitude: item.Latitude,
        longitude: item.Longitude,
    };

    const type = item.Type === 'city' ? 'cities' : 'villages';

    stack[type].push(location);

    return stack;
}, {
    cities: [],
    villages: [],
});

const all = [...cities, ...villages];

export const getLocationById = (id: string) => {
    return all.find(({ id: locationId }) => id === locationId);
};

export const getClosestLocationToCordinates = (cordinateToCompare) => {
    const {
        id,
    } = all.reduce((stack, item) => {
        const distance = getDistanceBetweenTwoPointsInKm(cordinateToCompare, {
            latitude: item.latitude,
            longitude: item.longitude,
        });

        if (distance < stack.distance) {
            stack.id = item.id;
            stack.distance = distance;
        }

        return stack;
    }, {
        id: '',
        distance: 99999,
    });

    return id;
}

const sortLocations = (phraseLowerCased: string) => (a: ILocation, b: ILocation) => {
    const aNameLowerCased = a.name.toLocaleLowerCase();
    const bNameLowerCased = b.name.toLocaleLowerCase();

    if (aNameLowerCased === phraseLowerCased) {
        return -1;
    }

    if (aNameLowerCased.includes(phraseLowerCased) && !bNameLowerCased.includes(phraseLowerCased)) {
        return -1;
    }

    return aNameLowerCased.localeCompare(bNameLowerCased);
};

export const searchBestLocationByPhrase = (phrase: string) => {
    if (phrase.length < 3) {
        return [];
    }

    const phraseLowerCased = phrase.toLocaleLowerCase();
    const shouldOnlyLookUpForCity = phrase.length === 3;

    if (shouldOnlyLookUpForCity) {
        return cities.filter(({ name, district, commune }) => {
            return name.toLocaleLowerCase().includes(phraseLowerCased)
                || district.toLocaleLowerCase().includes(phraseLowerCased)
                || commune.toLocaleLowerCase().includes(phraseLowerCased);
        }).sort(sortLocations(phraseLowerCased));
    }

    return all.filter(({ name, district, commune }) => {
        return name.toLocaleLowerCase().includes(phraseLowerCased)
            || district.toLocaleLowerCase().includes(phraseLowerCased)
            || commune.toLocaleLowerCase().includes(phraseLowerCased);
    }).sort(sortLocations(phraseLowerCased));
};
