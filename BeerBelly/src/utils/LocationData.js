import { getWikimediaImages } from './wikimediaUtils';

import { getDistance } from './distanceUtils';

export const createLocationData = async (breweries, searchPosition) => {
  return Promise.all(breweries.map(async (brewery) => {
    const images = await getWikimediaImages(brewery.name);
    let foursquareData = null;

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
      image: images && images.length > 0 ? images[0] : null,
      rating: foursquareData ? foursquareData.rating : 'N/A',
      review: foursquareData && foursquareData.tips ? foursquareData.tips[0].text : 'No review available',
      breweryType: brewery.brewery_type
    };
  }));
};
