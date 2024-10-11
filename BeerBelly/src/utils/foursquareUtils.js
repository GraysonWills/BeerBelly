import { FOURSQUARE_API_KEY } from '../config';

export const fetchFoursquareData = async (latitude, longitude, name) => {
    const apiKey = FOURSQUARE_API_KEY;
    const searchUrl = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&query=${encodeURIComponent(name)}&limit=1`;

    try {
      const searchResponse = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (!searchResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const searchData = await searchResponse.json();
      if (searchData.results && searchData.results.length > 0) {
        const placeId = searchData.results[0].fsq_id;
        const detailsUrl = `https://api.foursquare.com/v3/places/${placeId}?fields=photos,rating,tips`;

        const detailsResponse = await fetch(detailsUrl, {
          method: 'GET',
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
          }
        });

        if (!detailsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const detailsData = await detailsResponse.json();
        return {
          photos: detailsData.photos || [],
          rating: detailsData.rating || 'N/A',
        //   tips: detailsData.tips || []
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching Foursquare data:', error);
      return null;
    }
};