import { FOURSQUARE_API_KEY } from '../config';

export const getFoursquareData = async (lat, lon) => {
  const url = `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&radius=10&limit=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: FOURSQUARE_API_KEY
      }
    });
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.error('Error fetching Foursquare data:', error);
    return null;
  }
};