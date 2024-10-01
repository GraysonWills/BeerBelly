import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/InteractiveMap.css';
import { redIcon, blueIcon } from '../utils/mapIcons';
import { tileLayers } from '../utils/mapLayers';
import { useMapFunctions } from '../hooks/useMapFunctions';
import { handleSearch } from '../utils/searchUtils';
import { fetchNearbyBreweries } from '../utils/breweryUtils';
import { getDistance } from '../utils/distanceUtils';
import { getWikimediaImages } from '../utils/wikimediaUtils';
import { getFoursquareData } from '../utils/foursquareUtils';
import LayersButton from './LayersButton';
import RecenterButton from './RecenterButton';
import SearchBox from './SearchBox';
import LocationPopup from './LocationPopup';

const InteractiveMap = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [breweries, setBreweries] = useState([]);
  const [distance, setDistance] = useState(20);
  const [selectedBreweryType, setSelectedBreweryType] = useState('All');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const mapRef = useRef(null);
  const {
    currentLayer,
    setCurrentLayer,
    isLayersOpen,
    toggleLayers,
    isMapCentered,
    markerPosition,
    setMarkerPosition,
    position,
    handleRecenter
  } = useMapFunctions(mapRef);

  const handleMarkerClick = (brewery) => {
    setSelectedLocation(brewery);
    setIsPopupOpen(true);
    if (mapRef.current) {
      mapRef.current.setView([brewery.latitude, brewery.longitude], 15);
    }
  };

  const handleSearchClick = async () => {
    setIsLoading(true);
    setError(null);
    const result = await handleSearch(address, position, setMarkerPosition, setError);
    if (result && result.position) {
      setAddress(result.address);
      const nearbyBreweries = await fetchNearbyBreweries(result.position[0], result.position[1], distance);
      setBreweries(nearbyBreweries);
    
      const locationsWithData = await Promise.all(nearbyBreweries.map(async (brewery) => {
        const images = await getWikimediaImages(brewery.name);
        let foursquareData = null;
        try {
          foursquareData = await getFoursquareData(brewery.latitude, brewery.longitude);
        } catch (error) {
          console.error('Error fetching Foursquare data:', error);
        }
        
        return {
          ...brewery,
          image: images && images.length > 0 ? images[0] : null,
          rating: foursquareData ? foursquareData.rating : 'N/A',
          review: foursquareData && foursquareData.tips ? foursquareData.tips[0].text : 'No review available',
        };
      }));

      setSelectedLocations(locationsWithData);
      setIsPopupOpen(true); // Add this line to open the popup

      if (mapRef.current) {
        const bounds = [result.position, ...nearbyBreweries.map(b => [b.latitude, b.longitude])];
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
    setIsLoading(false);
  };

  const handleUseMyLocation = () => {
    setAddress("Your Location");
    setMarkerPosition(position);
  };

  const handleClearSearch = () => {
    setAddress('');
  };

  const filteredBreweries = breweries.filter(brewery => {
    const breweryDistance = getDistance(markerPosition[0], markerPosition[1], brewery.latitude, brewery.longitude);
    const typeMatch = selectedBreweryType === 'All' || brewery.brewery_type === selectedBreweryType;
    return breweryDistance <= distance && typeMatch && brewery.brewery_type !== 'closed';
  });

  const handleSelectLocation = (location) => {
    if (mapRef.current) {
      mapRef.current.setView([location.latitude, location.longitude], 15);
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleRecenterAndDeselect = () => {
    const recentered = handleRecenter();
    if (recentered) {
      setSelectedLocation(null);
      setIsPopupOpen(false);
    }
  };

  return (
    <div className="interactive-map-container">
      <SearchBox
        address={address}
        setAddress={setAddress}
        handleSearch={handleSearchClick}
        handleUseMyLocation={handleUseMyLocation}
        handleClearSearch={handleClearSearch}
        isLoading={isLoading}
        error={error}
        distance={distance}
        setDistance={setDistance}
        selectedBreweryType={selectedBreweryType}
        setSelectedBreweryType={setSelectedBreweryType}
        isPopupOpen={isPopupOpen}
      />
      <div className="controls-container">
        <LayersButton
          isOpen={isLayersOpen}
          toggleLayers={toggleLayers}
          layers={tileLayers}
          setCurrentLayer={setCurrentLayer}
        />
        <RecenterButton
          isMapCentered={isMapCentered}
          handleRecenter={handleRecenterAndDeselect}
        />
      </div>
      <LocationPopup 
        locations={selectedLocations}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
        isSearched={isLoading}
        onOpenChange={setIsPopupOpen}
        distance={distance}
        selectedBreweryType={selectedBreweryType}
        markerPosition={markerPosition}
        isOpen={isPopupOpen}
      />
      <div className="controls-container">
        <LayersButton
          isOpen={isLayersOpen}
          toggleLayers={toggleLayers}
          layers={tileLayers}
          setCurrentLayer={setCurrentLayer}
        />
        <RecenterButton
          isMapCentered={isMapCentered}
          handleRecenter={handleRecenter}
        />
      </div>
      <LocationPopup 
        locations={selectedLocations}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
        isSearched={isLoading}
        onOpenChange={setIsPopupOpen}
        distance={distance}
        selectedBreweryType={selectedBreweryType}
        markerPosition={markerPosition}
        isOpen={isPopupOpen}
      />
      {isLoading && <div className="spinner-overlay"><div className="spinner"></div></div>}
      <MapContainer center={position} zoom={13} className="map-container" ref={mapRef}>
        <TileLayer
          url={tileLayers[currentLayer]}
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markerPosition && (
          <Marker position={markerPosition} icon={redIcon}>
            <Popup>
              <div>
                <strong>{address}</strong>
                <br />
                Searched Location
              </div>
            </Popup>
          </Marker>
        )}
        {filteredBreweries.map((brewery) => {
          const breweryDistance = getDistance(markerPosition[0], markerPosition[1], brewery.latitude, brewery.longitude);
          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${brewery.name}, ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`)}`;
          
          return (
            <Marker 
              key={brewery.id} 
              position={[brewery.latitude, brewery.longitude]} 
              icon={blueIcon}
              eventHandlers={{
                click: () => handleMarkerClick(brewery),
              }}
            >
              <Popup>
                <div>
                  <strong>{brewery.name}</strong>
                  <br />
                  {brewery.street}
                  <br />
                  {brewery.city}, {brewery.state} {brewery.postal_code}
                  <br />
                  Distance: {breweryDistance.toFixed(2)} miles
                  <br />
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Travel Here!</a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  ); 
};

export default InteractiveMap;