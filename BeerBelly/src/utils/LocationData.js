import { fetchFoursquareData } from './foursquareUtils';
import { getDistance } from './distanceUtils';

export const createLocationData = async (breweries, searchPosition) => {
  return Promise.all(breweries.map(async (brewery) => {
    const foursquareData = await fetchFoursquareData(brewery.latitude, brewery.longitude, brewery.name);

    const distance = getDistance(
      searchPosition[0],
      searchPosition[1],
      brewery.latitude,
      brewery.longitude
    );

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${brewery.name}, ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`
    )}`;

    return {
      id: brewery.id,
      name: brewery.name,
      address: `${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`,
      latitude: brewery.latitude,
      longitude: brewery.longitude,
      distance: distance,
      googleMapsUrl: googleMapsUrl,
      photos: foursquareData ? foursquareData.photos : [],
      rating: foursquareData ? foursquareData.rating : 'N/A',
      // review: foursquareData && foursquareData.tips.length > 0 ? foursquareData.tips[0].text : 'No review available',
      breweryType: brewery.brewery_type
    };
  }));
};