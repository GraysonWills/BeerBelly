import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/InteractiveMap.css';
import { redIcon } from '../utils/mapIcons';
import { tileLayers } from '../utils/mapLayers';
import { useMapFunctions } from '../hooks/useMapFunctions';
import { handleSearch } from '../utils/searchUtils';
import { fetchNearbyBreweries } from '../utils/breweryUtils';
import { createLocationData } from '../utils/LocationData';
import LayersButton from './LayersButton';
import RecenterButton from './RecenterButton';
import SearchBox from './SearchBox';
import LocationPopup from './LocationPopup';
import LocationMarker from './LocationMarker';

const InteractiveMap = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(20);
  const [selectedBreweryType, setSelectedBreweryType] = useState('All');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locations, setLocations] = useState([]);
  const mapRef = useRef(null);

  const filteredLocations = locations.filter(location => {
    const typeMatch = selectedBreweryType === 'All' || location.breweryType === selectedBreweryType;
    return location.distance <= distance && typeMatch;
  });

  // Use filteredLocations instead of locations when rendering markers and passing to LocationPopup  const mapRef = useRef(null);
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

  const handleSearchClick = async () => {
    setIsLoading(true);
    setError(null);
    const result = await handleSearch(address, position, setMarkerPosition, setError);
    if (result && result.position) {
      setAddress(result.address);
      const nearbyBreweries = await fetchNearbyBreweries(result.position[0], result.position[1], distance);
      const locationData = await createLocationData(nearbyBreweries, result.position);
      setLocations(locationData);
      setIsPopupOpen(true);

      if (mapRef.current) {
        const bounds = [result.position, ...locationData.map(l => [l.latitude, l.longitude])];
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
    setIsLoading(false);
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    setIsPopupOpen(true);
    if (mapRef.current) {
      mapRef.current.setView([location.latitude, location.longitude], 15);
    }
  };
  const handleUseMyLocation = () => {
    setAddress("Your Location");
    setMarkerPosition(position);
  };

  const handleClearSearch = () => {
    setAddress('');
  };

  const handleSelectLocation = (location) => {
    if (mapRef.current) {
      mapRef.current.closePopup(); // Close any open popups
      mapRef.current.setView([location.latitude, location.longitude], 15);
      if (markerRefs.current[location.id]) {
        markerRefs.current[location.id].openPopup();
      }
    }
    setSelectedLocation(location);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const markerRefs = useRef({});
    const deselectMarkers = () => {
      setSelectedLocation(null);
      if (mapRef.current) {
        mapRef.current.closePopup();
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
          handleRecenter={handleRecenter}
          deselectMarkers={deselectMarkers}
        />
      </div>
      <LocationPopup 
        locations={filteredLocations}
        selectedLocation={selectedLocation}
        onSelectLocation={handleSelectLocation}
        isOpen={isPopupOpen}
        onOpenChange={setIsPopupOpen}
        distance={distance}
        selectedBreweryType={selectedBreweryType}
        markerPosition={markerPosition}
      />
      {isLoading && <div className="spinner-overlay"><div className="spinner"></div></div>}
      <MapContainer center={position} zoom={1} className="map-container" ref={mapRef} zoomControl={false}>
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
        {filteredLocations.map((location) => (
          <LocationMarker
            key={location.id}
            location={location}
            onClick={handleMarkerClick}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;
