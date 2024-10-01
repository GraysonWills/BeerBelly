const MILES_TO_METERS = 1609.34;

// fetchNearbyBreweries: Fetch breweries near a given location using OpenBreweryDB API
export const fetchNearbyBreweries = async (lat, lon, radius = 20) => {
  const radiusInMeters = radius * MILES_TO_METERS;
  const url = `https://api.openbrewerydb.org/breweries?by_dist=${lat},${lon}&per_page=500`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch breweries');
    const breweries = await response.json();
    // Filter out closed breweries
    return breweries.filter(brewery => brewery.brewery_type !== 'closed');
  } catch (error) {
    console.error('Error fetching breweries:', error);
    return [];
  }
};