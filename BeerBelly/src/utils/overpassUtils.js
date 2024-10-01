export const getOverpassData = async (lat, lon) => {
  const overpassUrl = 'https://overpass-api.de/api/interpreter';
  const query = `
    [out:json];
    node(around:10,${lat},${lon});
    out body;
  `;

  try {
    const response = await fetch(overpassUrl, {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
    });
    const data = await response.json();
    console.log('Overpass data:', data);
    console.log('Overpass response:', response);
    return data.elements[0];
  } catch (error) {
    console.error('Error fetching Overpass data:', error);
    return null;
  }
};