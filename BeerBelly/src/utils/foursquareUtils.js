import { FOURSQUARE_API_KEY } from '../config';
const fetchFoursquareData = async (latitude, longitude) => {
  const apiKey = FOURSQUARE_API_KEY;  // Replace with your actual Foursquare API key
  const apiUrl = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&limit=5`;

  try {
      const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
              'Authorization': apiKey,
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Location Details:', data);
      return data;
  } catch (error) {
      console.error('Error fetching location details:', error);
  }
};

export default fetchFoursquareData;