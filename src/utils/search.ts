import polishCitiesAndVillages from 'polskie-miejscowosci';

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

const sortLocations = (phraseLowerCased: string) => (a: ILocation, b: ILocation) => {
    console.log({
        x: a.name.toLocaleLowerCase(),
        phraseLowerCased,
    });

    if (a.name.toLocaleLowerCase() === phraseLowerCased) {
        console.log(phraseLowerCased);
        console.log(phraseLowerCased);
        console.log(phraseLowerCased);
        console.log(phraseLowerCased);
        console.log(phraseLowerCased);
        console.log(phraseLowerCased);

        return -1;
    }

    return 1;
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
