export const handleSearch = async (address, position, mapRef, setMarkerPosition, setError) => {
  try {
    let newPosition;
    let fullAddress;
    if (address === "Your Location") {
      newPosition = position;
      fullAddress = "Your Location";
    } else {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data && data[0]) {
        newPosition = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        fullAddress = data[0].display_name;
      } else {
        throw new Error('Address not found or does not exist');
      }
    }
    setMarkerPosition(newPosition);
    
    if (mapRef.current) {
      const detroitPosition = [42.3314, -83.0458];
      const bounds = [newPosition, detroitPosition];
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
    return { position: newPosition, address: fullAddress };
  } catch (error) {
    console.error('Error geocoding address:', error);
    setError(error.message);
    return null;
  }
};