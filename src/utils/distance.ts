export type Coordinate = {
    latitude: number;
    longitude: number;
};

export const getDistanceBetweenTwoPointsInKm = (cordA: Coordinate, cordB: Coordinate) => {
    if (cordA.latitude == cordB.latitude && cordA.longitude == cordB.longitude) {
      return 0;
    }
  
    const radlatitude1 = (Math.PI * cordA.latitude) / 180;
    const radlatitude2 = (Math.PI * cordB.latitude) / 180;
  
    const theta = cordA.longitude - cordB.longitude;
    const radtheta = (Math.PI * theta) / 180;
  
    let dist =
      Math.sin(radlatitude1) * Math.sin(radlatitude2) +
      Math.cos(radlatitude1) * Math.cos(radlatitude2) * Math.cos(radtheta);
  
    if (dist > 1) {
      dist = 1;
    }
  
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; //convert miles to km
    
    return dist;
};
